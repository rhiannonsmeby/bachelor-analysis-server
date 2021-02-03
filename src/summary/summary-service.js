const SummaryService = {
    getAllSummary(knex) {
        return knex.select('*').from('summary')
    },
    insertSummary(knex, newSummary) {
        return knex
            .insert(newSummary)
            .into('summary')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, summary_id) {
        return knex
            .from('summary')
            .select('*')
            .where('summary_id', summary_id)
            .first()
    },
    deleteSummary(knex, summary_id) {
        return knex('summary')
            .from('summary')
            .where({summary_id})
            .delete()
    },
    updateSummary(knex, summary_id, updateSummary) {
        return knex('summary')
            .from('summary')
            .where({summary_id})
            .update(updateSummary)
    },
}

module.exports = SummaryService