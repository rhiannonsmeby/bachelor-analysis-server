const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');
const { makeSummaryArray } = require('./summary.fixtures');

describe.only('Summary Endpoints', () => {
    let db;

    before('Make the knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        });
        app.set('db', db);
    });

    after('disconnect from the database', () => db.destroy());

    before('clean the table', () => db.raw('TRUNCATE summary RESTART IDENTITY CASCADE'));

    afterEach('cleanup summary', () => db.raw('TRUNCATE summary RESTART IDENTITY CASCADE'));

    describe('GET /api/summary', () => {
        context('given there are no summaries in the database', () => {
            it('returns a 200 and an empty array', () => {
                return supertest(app)
                    .get('/api/summary')
                    .expect(200, []);
            })
        })

        context('given there are summaries in the database', () => {
            const testSummary = makeSummaryArray();

            beforeEach('add summary', () => {
                return db
                    .into('summary')
                    .insert(testSummary)
            });

            it('returns a 200 and all summaries', () => {
                return supertest(app)
                    .get('/api/summary')
                    .expect(200, testSummary);
            });
        });
    });

    describe('GET api/summary/:summary_id', () => {
        context('when there are no summaries in the database', () => {
            it('returns a 404 and an error for the note', () => {
                const testId = 4000;

                return supertest(app)
                    .get(`/api/summary/${testId}`)
                    .expect(404)
                    .expect({
                        error: { message: 'Summary does not exist' }
                    });
            });
        });
    });

    describe('POST /api/summary', () => {
        const testSummary = makeSummaryArray();

        beforeEach('Add Summary', () => {
            return db.into('summary')
                .insert(testSummary);
        });

        it('returns a 201 when new summary is added', () => {
            const newSummary = {
                content: 'Test Content',
                caption: 'Test Caption...'
            }
            return supertest(app)
                .post('/api/summary')
                .send(newSummary)
                .expect(201)
                .expect(res => {
                    expect(res.body.content).to.eql(newSummary.content);
                    expect(res.body.caption).to.eql(newSummary.caption);
                    expect(res.body).to.have.property('summary_id');
                    expect(res.headers.location).to.eql(`/${res.body.summary_id}`)
                })
                .then(postRes => {
                    return supertest(app)
                        .get(`/api/summary/${postRes.body.summary_id}`)
                        .expect(postRes.body);
                });
        });

        const requiredFields = ['content', 'caption'];
        requiredFields.forEach(field => {
            const newSummary = {
                content: 'please ignore',
                caption: 'please ignore too'
            };

            it(`responds with a 400 and an error message when the '${field}' is missing`, () => {
                delete newSummary[field];

                return supertest(app)
                    .post('/api/summary')
                    .send(newSummary)
                    .expect(400, {
                        error: { message: `Missing '${field}' in request body` }
                    });
            });
        });
    });

    describe('DELETE /api/summary/:summary_id', () => {
        context('When there are no summaries in the database', () => {
            it('returns a 404 and associate error', () => {
                const testId = 20000;
                return supertest(app)
                    .delete(`/api/summary/${testId}`)
                    .expect(404)
                    .expect({
                        error: { message: 'Summary does not exist' }
                    });
            });
        });

        context('When there are summaries in the database', () => {

            beforeEach('add summary to database', () => {
                const testSummary = makeSummaryArray();
                return db.into('summary')
                    .insert(testSummary);
            });

            it('returns a 204 and the summary is not in a get request', () => {
                const testSummary = makeSummaryArray();
                const idToRemove = 2;
                const expectedArray = testSummary.filter(summary => summary.summary_id  !== idToRemove);

                return supertest(app)
                    .delete(`/api/summary/${idToRemove}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/summary`)
                            .expect(200, expectedArray)
                    );
            });
        });
    });
});