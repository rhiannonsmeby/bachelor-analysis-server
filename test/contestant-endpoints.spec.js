const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const {makeContestantArray} = require('./contestant.fixtures');
const {makeSeasonArray} = require('./season.fixtures')

describe('Contestant Endpoints', () => {
    let db;

    before('Make the knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        });
        app.set('db', db);
    });

    after('disconnect from the database', () => db.destroy());

    before('clean the table', () => db.raw('TRUNCATE contestant RESTART IDENTITY CASCADE'));

    afterEach('cleanup season', () => db.raw('TRUNCATE contestant RESTART IDENTITY CASCADE'));

    describe('GET /api/contestant', () => {
        context('given there are contestants in the table', () => {
            const testContestant = makeContestantArray();

            beforeEach('insert contestant', () => {
                        return db
                        .into('contestant')
                        .insert(testContestant)
            });

            it('returns 200 and all contestants', () => {
                return supertest(app)
                    .get('/api/contestant')
                    .expect(200, testContestant);
            });
        });
    });

    describe('GET api/contestant/name/:contestant_name', () => {
        context('given the contestant is not in the database', () => {
            it('returns 404 and an error for the contestant', () => {
                const testName = 'Not A Name';

                return supertest(app) 
                    .get(`/api/contestant/name/${testName}`)
                    .expect(404)
                    .expect({
                        error: {message: `No contestants match your search`}
                    });
            });
        });

        context('given the contestant is in the database', () => {
            const testContestant= makeContestantArray();

            beforeEach('insert contestant', () => {
                const testName = 'Jack Jill';
                const expectedContestant = testContestant['Jack Jill'];

                return supertest(app)
                    .get(`/api/contestant/name/${testName}`)
                    .expect(200, expectedContestant);
            });
        });
    });

    describe('GET api/contestant/season/:assigned_season', () => {
        context('given the assigned season is not in the database', () => {
            it('returns 404 and an error for the contestant', () => {
                const testSeason = 2;

                return supertest(app) 
                    .get(`/api/contestant/season/${testSeason}`)
                    .expect(404)
                    .expect({
                        error: {message: `No contestants match your search`}
                    });
            });
        });

        context('given the contestant is in the database', () => {
            const testContestant= makeContestantArray();

            beforeEach('insert contestant', () => {
                const testSeason = 200;
                const expectedContestant = testContestant[testSeason - 1];

                return supertest(app)
                    .get(`/api/contestant/season/${testSeason}`)
                    .expect(200, expectedContestant);
            });
        });
    });

    describe('GET api/contestant/eliminated/:eliminated', () => {
        context('given the week eliminated is not in the database', () => {
            it('returns 404 and an error for the contestant', () => {
                const testWeekEliminated = 'Last';

                return supertest(app) 
                    .get(`/api/contestant/eliminated/${testWeekEliminated}`)
                    .expect(404)
                    .expect({
                        error: {message: `No contestants match your search`}
                    });
            });
        });

        context('given the contestant is in the database', () => {
            const testContestant= makeContestantArray();

            beforeEach('insert contestant', () => {
                const testWeekEliminated = 'Winner';
                const expectedContestant = testContestant[testWeekEliminated];

                return supertest(app)
                    .get(`/api/contestant/eliminated/${testWeekEliminated}`)
                    .expect(200, expectedContestant);
            });
        });
    });

    describe('GET api/contestant/age/:age', () => {
        context('given the age is not in the database', () => {
            it('returns 404 and an error for the contestant', () => {
                const testAge = 89;

                return supertest(app) 
                    .get(`/api/contestant/age/${testAge}`)
                    .expect(404)
                    .expect({
                        error: {message: `No contestants match your search`}
                    });
            });
        });

        context('given the contestant is in the database', () => {
            const testContestant= makeContestantArray();

            beforeEach('insert contestant', () => {
                const testAge = 23;
                const expectedContestant = testContestant[testAge];

                return supertest(app)
                    .get(`/api/contestant/age/${testAge}`)
                    .expect(200, expectedContestant);
            });
        });
    });
    describe('GET api/contestant/job/:job', () => {
        context('given the assigned job is not in the database', () => {
            it('returns 404 and an error for the contestant', () => {
                const testJob = 'Reddit Poster';

                return supertest(app) 
                    .get(`/api/contestant/job/${testJob}`)
                    .expect(404)
                    .expect({
                        error: {message: `No contestants match your search`}
                    });
            });
        });

        context('given the contestant is in the database', () => {
            const testContestant= makeContestantArray();

            beforeEach('insert contestant', () => {
                const testJob = 'Registered Nurse';
                const expectedContestant = testContestant[testJob];

                return supertest(app)
                    .get(`/api/contestant/job/${testSeason}`)
                    .expect(200, expectedContestant);
            });
        });
    });

    describe('GET api/contestant/hometown/:hometown', () => {
        context('given the hometown is not in the database', () => {
            it('returns 404 and an error for the contestant', () => {
                const testHometown = 'NotAPlace';

                return supertest(app) 
                    .get(`/api/contestant/hometown/${testHometown}`)
                    .expect(404)
                    .expect({
                        error: {message: `No contestants match your search`}
                    });
            });
        });

        context('given the contestant is in the database', () => {
            const testContestant= makeContestantArray();

            beforeEach('insert contestant', () => {
                const testHometown = 'Texas';
                const expectedContestant = testContestant[testHometown];

                return supertest(app)
                    .get(`/api/contestant/hometown/${testHometown}`)
                    .expect(200, expectedContestant);
            });
        });
    });
})