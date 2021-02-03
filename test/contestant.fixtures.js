function makeContestantArray() {
    return [
        {
            contestant_id: 1,
            contestant_name: 'Jane Doe',
            age: 23,
            hometown: 'Iowa City, Iowa',
            job: 'Registered Nurse',
            eliminated:'Week 6',
            assigned_season: 13,
            contestant_image: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg'
        },
        {
            contestant_id: 2,
            contestant_name: 'Jack Jill',
            age: 31,
            hometown: 'Austin, Texas',
            job: 'Hedge Fund Analyst',
            eliminated: 'Winner',
            assigned_season: 3,
            contestant_image: 'https://tamarkinauctions.frb.io/assets/site-files/Dan-Tamarkin_2.jpeg'
        },
        {
            contestant_id: 3,
            contestant_name: 'Harrison Pita',
            age: 26,
            hometown: 'Albany, New York',
            job: 'La Croix Flavor Tester',
            eliminated: 'Week 2',
            assigned_season: 27,
            contestant_image: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg'
        },
    ];
}

module.exports = {
    makeContestantArray
}