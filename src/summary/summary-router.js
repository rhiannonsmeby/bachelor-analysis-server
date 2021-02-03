const path = require('path')
const express = require('express')
const SummaryService = require('./summary-service')
const { v4: uuid } = require('uuid');

const summaryRouter = express.Router()
const jsonParser = express.json()

const serializeSummary = summary => ({
    summary_id: summary.summary_id,
    content: summary.content,
    caption: summary.caption
})

summaryRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        SummaryService.getAllSummary(knexInstance)
            .then(summary => {
                res.json(summary.map(serializeSummary))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const knexInstance = req.app.get('db')
        const {content, caption} = req.body
        const newSummary = {content, caption}

        for (const [key, value] of Object.entries(newSummary)) {
            if (value == null) {
              return res.status(400).json({
                error: { message: `Missing '${key}' in request body` }
              })
            }
        }
        
        SummaryService.insertSummary(knexInstance, newSummary)
            .then(summary => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/summary/${summary.summary_id}`))
                    .json(serializeSummary(summary))
            })
            .catch(next)
    
    })
    summaryRouter
        .route('/:summary_id')
        .all((req, res, next) => {
            SummaryService.getById(
                req.app.get('db'),
                req.params.summary_id
            )
                .then(summary => {
                    if (!summary) {
                        return res.status(404).json({
                            error: {message: `Summary does not exist`}
                        })
                    }
                    res.summary = summary
                    next()
                })
                .catch(next)
        })
        .get((req, res, next) => {
            res.json(serializeSummary(res.summary))
        })
        .delete((req, res, next) => {
            SummaryService.deleteSummary(
                req.app.get('db'),
                req.params.summary_id
            )
                .then((numRowsAffected) => {
                    res.status(204).end()
                })
                .catch(next)
        })
        .patch(jsonParser, (req, res, next) => {
            const {caption} = req.body
            const summaryToUpdate = {caption}

            const numberOfValues = Object.values(summaryToUpdate).filter(Boolean).length
            if (numberOfValues === 0) {
                return res.status(400).json({
                    error: {
                        message: `Request body must contain 'caption'`
                    }
                })
            }

            SummaryService.updateSummary(
                req.app.get('db'),
                req.params.summary_id,
                summaryToUpdate
            )
                .then(numRowsAffected => {
                    res.status(204).end()
                })
                .catch(next)
        })

        module.exports = summaryRouter