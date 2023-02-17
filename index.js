const {Band} = require('./Band')
const {Musician} = require('./Musician')
const {Song} = require('./Song')
const {Sequelize, sequelize} = require('./db');
const {NUMBER, belongsToMany} = require('sequelize');


Band.hasMany(Musician);
Musician.belongsTo(Band);

Band.belongsToMany(Song, {through: 'band_song'});
Song.belongsToMany(Band, {through: 'band_song'});






module.exports = {
    Band,
    Musician
};
