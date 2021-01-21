const path = require('path')
const express = require('express')
const SeasonService = require('./season-service')
const { join } = require('path')
const { ifError } = require('assert')

const seasonRouter = express.Router()
const jsonParser = express.json()

const serializeSeason = season => ({
    show: season.show,
    season_id: season.season_id,
    season_name: season.season_name,
    date_aired: season.date_aired,
    lead_name: season.lead_name,
    lead_2: season.lead_2,
    proposal: season.proposal,
    still_together: season.still_together
})

seasonRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        SeasonService.getAllSeasons(knexInstance)
            .then(season => {
                res.json(season.map(serializeSeason))
            })
            .catch(next)
    })

seasonRouter
    .route('/:show/:season_id')
    .all((req, res, next) => {
        SeasonService.getByShowAndId(
            req.app.get('db'),
            req.params.show,
            req.params.season_id
        )
            .then(season => {
                if (!season) {
                    return res.status(404).json({
                        error: {message: `Sorry, no shows match your search :/`}
                    })
                }
                res.season = season
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeSeason(res.season))
        console.log(serializeSeason(res.season))
    })

// seasonRouter
//     .route('/:season_id')
//     .all((req, res, next) => {
//         SeasonService.getById(
//             req.app.get('db'),
//             req.params.season_id
//         )
//             .then(season => {
//                 if (!season) {
//                     return res.status(404).json({
//                         error: {message: `Sorry, there is no data for that season :(`}
//                     })
//                 }
//                 res.season = season
//                 next()
//             })
//             .catch(next)
//     })
//     .get((req, res, next) => {
//         res.json(serializeSeason(res.season))
//     })
    module.exports = seasonRouter