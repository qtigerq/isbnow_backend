const pgp = require('pg-promise')();

const db = pgp({
    user: 'postgres',
    password: 'odiseia',
    host: 'localhost',
    port: 5432,
    database: 'postgres'
})

/*//DADOS PARA O BANCO VIA HEROKU
const db = pgp({
    user: 'noatiezqkiyoup',
    password: '6806740ce79273ca07c973f9374902b4702d8efbeb307da925fe2bb282e6d507',
    host: 'ec2-52-207-74-100.compute-1.amazonaws.com',
    port: 5432,
    database: 'd75g511sc2bs86'
})*/

module.exports = db;