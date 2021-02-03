const path = require('path')
const express = require('express')
const ContestantService = require('./contestant-service')
const { join } = require('path')

const contestantRouter = express.Router()
const jsonParser = express.json()

const serializeContestant = contestant => ({
    contestant_id: contestant.contestant_id,
    contestant_name: contestant.contestant_name,
    age: contestant.age,
    hometown: contestant.hometown,
    job: contestant.job,
    eliminated: contestant.eliminated,
    assigned_season: contestant.assigned_season,
    contestant_image: contestant.contestant_image,
})

contestantRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        ContestantService.getAllContestants(knexInstance)
            .then(contestant => {
                res.json(contestant.map(serializeContestant))
            })
            .catch(next)
    })

contestantRouter
    .route('/season/:assigned_season')
    .get((req, res, next) => {
        ContestantService.getBySeason(
            req.app.get('db'),
            req.params.assigned_season
        )
            .then(contestant => {
                if (contestant.length === 0) {
                    return res.status(404).json({
                        error: {message: `No contestants match your search`}
                    })
                }
                res.json(contestant.map(serializeContestant))
            })
            .catch(next)
    })


contestantRouter
    .route('/age/:age')
    .get((req, res, next) => {
        ContestantService.getByAge(
            req.app.get('db'),
            req.params.age
        )
            .then(contestant => {
                if (contestant.length === 0) {
                    return res.status(404).json({
                        error: {message: `No contestants match your search`}
                    })
                }
                res.json(contestant.map(serializeContestant))
            })
            .catch(next)
    })

contestantRouter
    .route('/eliminated/:eliminated')
    .get((req, res, next) => {
        ContestantService.getByWeekEliminated(
            req.app.get('db'),
            req.params.eliminated
        )
            .then(contestant => {
                if (contestant.length === 0) {
                    return res.status(404).json({
                        error: {message: `No contestants match your search`}
                    })
                }
                res.json(contestant.map(serializeContestant))
            })
            .catch(next)
    })

contestantRouter
    .route('/name/:contestant_name')
    .get((req, res, next) => {
        ContestantService.getByName(
            req.app.get('db'),
            req.params.contestant_name
        )
            .then(contestant => {
                if (contestant.length === 0) {
                    return res.status(404).json({
                        error: {message: `No contestants match your search`}
                    })
                }
                res.json(contestant.map(serializeContestant))
            })
            .catch(next)
    })

contestantRouter
    .route('/job/:job')
    .get((req, res, next) => {
        ContestantService.getByJob(
            req.app.get('db'),
            req.params.job
        )
            .then(contestant => {
                if(contestant.length === 0) {
                    return res.status(404).json({
                        error: {message: `No contestants match your search`}
                    })
                }
                res.json(contestant.map(serializeContestant))
            })
            .catch(next)
    })

contestantRouter
    .route('/hometown/:hometown')
    .get((req, res, next) => {
        ContestantService.getByHometown(
            req.app.get('db'),
            req.params.hometown
        )
            .then(contestant => {
                if(contestant.length === 0) {
                    return res.status(404).json({
                        error: {message: `No contestants match your search`}
                    })
                }
                res.json(contestant.map(serializeContestant))
            })
            .catch(next)
    })
    
    module.exports = contestantRouter