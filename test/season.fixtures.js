function makeSeasonArray() {
    return [
        {
            season_id: 27,
            show: 'Bachelorette',
            season_name: 7,
            date_aired: '2007',
            lead_name: 'Tony Davis',
            lead_2: null,
            proposal: 'Yes',
            still_together: 'Yes'
        },
        {
            season_id: 3,
            show: 'Bachelor',
            season_name: 3,
            date_aired: '2008',
            lead_name: 'Hillary Duff',
            lead_2: 'Hannah Montana',
            proposal: 'Yes',
            still_together: 'No'
        },
        {
            season_id: 13,
            show: 'Bachelor',
            season_name: 13,
            date_aired: '2014',
            lead_name: 'Jackson Ave',
            lead_2: null,
            proposal: 'No',
            still_together: 'No'
        },
    ];
}

module.exports = {
    makeSeasonArray
}