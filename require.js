const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const anjali = require('./routes/anjali');
const rainfalls = require('./routes/rainfalls');
const soilanalysis = require('./routes/soilanalysis');
const fertilizers = require('./routes/fertilizers');
const temperature = require('./routes/temperature');
const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended :  true}));
app.use(bodyparser.json());

app.use('/anjali', anjali);
app.use('/soilanalysis', soilanalysis);
app.use('/rainfalls', rainfalls);
app.use('/fertilizers',fertilizers);
app.use('./temperature', temperature);
module.exports = app;