const {Client} = require('pg');
const config = require('../configs/db.json');
const fs = require('fs');
const path = require('path');

const currentFileName = path.basename(__filename);

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const client = new Client(dbConfig);

client.connect();


const db = {
    client
};

fs.readdirSync(__dirname)
.filter(fName => /.js$/.test(fName) && fName !== currentFileName)
.forEach(fName => {
    const absPathToFile = path.resolve(__dirname, fName);
    const Model = require(absPathToFile);
    Model.client = client;
    db[Model.name] = Model;
})




process.on('beforeExit', () => {
    client.end();
})


module.exports = db;