
BEGIN;

INSERT INTO season (season_id, show, season_name, date_aired, lead_name, lead_2, proposal, still_together)
VALUES
(1, 'bachelor', 1, '2002', 'Alex Michel', null, 'No' , 'No'),
(2, 'bachelor', 2, '2002', 'Aaron Buerge', null, 'Yes', 'No'),
(5, 'bachelor', 5, '2004', 'Jesse Palmer', null, 'No', 'No'),
(9, 'bachelor', 9, '2006', 'Lorenzo Borghese', null, 'No', 'No'),
(10, 'bachelor', 10, '2007', 'Andrew Baldwin', null, 'Yes', 'No'),
(11, 'bachelor', 11, '2007', 'Brad Womack', null, 'No', 'No'),
(12, 'bachelor', 12, '2008', 'Matt Grant', null, 'Yes', 'No'),
(13, 'bachelor', 13, '2009', 'Jason Mesnick', null, 'Yes', 'No'),
(14, 'bachelor', 14, '2010', 'Jake Pavelka', null, 'Yes', 'No'),
(15, 'bachelor', 15, '2011', 'Brad Womack', null, 'Yes', 'No'),
(16, 'bachelor', 16, '2012', 'Ben Flajnik', null, 'Yes', 'No'),
(17, 'bachelor', 17, '2013', 'Sean Lowe', null, 'Yes', 'Yes'),
(18, 'bachelor', 18, '2014', 'Juan Pablo Galavis', null, 'No', 'No'),
(19, 'bachelor', 19, '2015', 'Chris Soules', null, 'Yes', 'No'),
(20, 'bachelor', 20, '2016', 'Ben Higgins', null, 'Yes', 'No'),
(21, 'bachelor', 21, '2017', 'Nick Viall', null, 'Yes', 'No'),
(22, 'bachelor', 22, '2018', 'Arie Luyendyk Jr.', null, 'Yes', 'No'),
(23, 'bachelor', 23, '2019', 'Colton Underwood', null, 'No', 'No'),
(24, 'bachelor', 24, '2020' , 'Peter Weber' , null, 'Yes' , 'No'),
(25, 'bachelor', 25, '2021', 'Matt James', null, null, null),
(3, 'bachelorette', 1, '2003', 'Trista Rehn', null, 'Yes', 'Yes'),
(4, 'bachelorette', 2, '2004', 'Meredith Phillips', null, 'Yes', 'No'),
(6, 'bachelorette', 3, '2005', 'Jen Schefft', null, 'Yes', 'No'),
(7, 'bachelorette', 4, '2008', 'DeAnna Pappas', null, 'Yes', 'No'),
(8, 'bachelorette', 5, '2009', 'Jillian Harris', null, 'Yes', 'No'),
(26, 'bachelorette', 6, '2010', 'Ali Fedotowsky', null, 'Yes', 'No'),
(27, 'bachelorette', 7, '2011', 'Ashley Hebert', null, 'Yes', 'No'),
(28, 'bachelorette', 8, '2012', 'Emily Maynard', null, 'Yes', 'No'),
(29, 'bachelorette', 9, '2013', 'Desiree Hartsock', null, 'Yes', 'Yes'),
(30, 'bachelorette', 10, '2014', 'Andi Dorfman', null, 'Yes', 'No'),
(31, 'bachelorette', 11, '2015', 'Kaitlyn Bristowe', null, 'No', 'No'),
(32, 'bachelorette', 12, '2016', 'JoJo Fletcher', null, 'Yes', 'Yes'),
(33, 'bachelorette', 13, '2017','Rachel Lindsay', null, 'Yes', 'Yes'),
(34, 'bachelorette', 14, '2018', 'Becca Kufrin', null, 'Yes', 'No'),
(35, 'bachelorette', 15, '2019', 'Hannah Brown', null, 'Yes', 'No'),
(36, 'bachelorette', 16, '2020', 'Clare Crawley', 'Tayshia Adams', 'Yes', 'Yes');

COMMIT;