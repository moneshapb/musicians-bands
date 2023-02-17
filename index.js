const { NUMBER, BelongsToMany } = require("sequelize");
const { Band } = require("./Band");
const { sequelize } = require("./db");
const { Musician } = require("./Musician");
const { Song } = require("./Song");

Musician.belongsTo(Band);
Band.hasMany(Musician);

Band.belongsToMany(Song, { through: "band_song" });
Song.belongsToMany(Band, { through: "band_song" });



module.exports = {
    Band,
    Musician,
    Song
}
