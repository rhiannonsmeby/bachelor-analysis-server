const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const {makeSeasonArray} = require('./season.fixtures')

describe('Season Endpoints', () => {
    let db;

    before('Make the knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        });
        app.set('db', db);
    });

    after('disconnect from the database', () => db.destroy());

    before('clean the table', () => db.raw('TRUNCATE season RESTART IDENTITY CASCADE'));

    afterEach('cleanup season', () => db.raw('TRUNCATE season RESTART IDENTITY CASCADE'));

    describe('GET /api/season', () => {
        context('given there are seasons in the table', () => {
            const testSeason = makeSeasonArray();

            beforeEach('insert season', () => {
                        return db
                        .into('season')
                        .insert(testSeason)
            });

            it('returns 200 and all seasons', () => {
                return supertest(app)
                    .get('/api/season')
                    .expect(200, testSeason);
            });
        });
    });

    describe('GET /api/season/:season_id', () => {
        context('given the season is not in the database', () => {
            it('returns 404 and an error for the season', () => {
                const testId = 200;

                return supertest(app) 
                    .get(`/api/season/${testId}`)
                    .expect(404)
                    .expect({
                        error: {message: `No seasons match your search`}
                    });
            });
        });

        context('given the season is in the database', () => {
            const testId= makeSeasonArray();

            beforeEach('insert season', () => {
                const testId = 2;
                const expectedSeason = testSeason[testId - 1];

                return supertest(app)
                    .get(`/api/season/${testId}`)
                    .expect(200, expectedSeason);
            });
        });
    })

})