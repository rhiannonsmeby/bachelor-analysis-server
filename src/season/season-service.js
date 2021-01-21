const SeasonService = {
    getAllSeasons(knex) {
        return knex.select('*').from('season')
    },
    getByShowAndId(knex, show, season_id) {
        return knex
            .from('season')
            .select('*')
            .where('show', show)
            .andWhere('season_id', season_id)
            .first()
    },
}

module.exports = SeasonService