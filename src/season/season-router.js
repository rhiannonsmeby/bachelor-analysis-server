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
    .route('/:show')
    .all((req, res, next) => {
        SeasonService.getSeasonsByShow(
            req.app.get('db'),
            req.params.show
        )
            .then(season => {
                if (season.length === 0) {
                    return res.status(404).json({
                        error: {message: `No seasons match your search`}
                    })
                }
                res.season = season
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(res.season.map(serializeSeason))
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
                if (season.length === 0) {
                    return res.status(404).json({
                        error: {message: `No seasons match your search`}
                    })
                }
                res.season = season
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeSeason(res.season))
    })

    module.exports = seasonRouter