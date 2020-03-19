const {Sequelize, DataTypes} = require('sequelize');
const {sequelize} = require('./../config/db');


const Model = Sequelize.Model;

class Movie extends Model {};

Movie.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize, 
    modelName: 'Movie', 

    //Set a custom table name
    //frezzeTableName: true,
    //tableName: 'Movies'
});

//Movie.sync();

module.exports = {Movie};