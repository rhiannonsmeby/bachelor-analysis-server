const ContestantService = {
    getAllContestants(knex) {
        return knex.select('*').from('contestant')
    },
    getBySeason(knex, assigned_season) {
        return knex
            .select('*')
            .from('contestant')
            .where('assigned_season', assigned_season)
    },
    getByAge(knex, age) {
        return knex
            .select('*')
            .from('contestant')
            .where('age', age)
    },
    getByWeekEliminated(knex, eliminated) {
        return knex
            .select('*')
            .from('contestant')
            .where('eliminated', 'ILIKE', `%${eliminated}%`)
    },
    getByName(knex, contestant_name) {
        return knex
            .select('*')
            .from('contestant')
            .where('contestant_name', 'ILIKE', `%${contestant_name}%`)
    },
    getByJob(knex, job) {
        return knex
            .select('*')
            .from('contestant')
            .where('job', 'ILIKE', `%${job}%`)
    },
    getByHometown(knex, hometown) {
        return knex
            .select('*')
            .from('contestant')
            .where('hometown', 'ILIKE', `%${hometown}%`)
    },
}

module.exports = ContestantService