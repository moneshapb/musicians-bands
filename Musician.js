const {Sequelize, sequelize} = require('./db');

// TODO - define the Musician model
let Musician = sequelize.define('musician', {
    name: {
        type: Sequelize.STRING,
    },
    instrument: {
        type: Sequelize.STRING,
    }
});

module.exports = {
    Musician
};