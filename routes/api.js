'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  app.get('/api/convert/', (req,res) => {
    console.log(req.query);
    let convertHandler = new ConvertHandler();
    const numIn = convertHandler.getNum(req.query.input);
    const unitIn = convertHandler.getUnit(req.query.input);
    const numOut = convertHandler.convert(numIn, unitIn);
    const unitOut = convertHandler.getReturnUnit(unitIn);
    let returnDict = {};

    if(unitOut.error != undefined && numIn.error != undefined){
      returnDict = { "error": "invalid number and unit"}
    } else if(unitOut.error != undefined){
      returnDict = unitOut;
    } else if(numIn.error != undefined){
      returnDict = numIn;
    } else {
      returnDict = {
        initNum: numIn,
        initUnit: (unitIn === 'l' || unitIn ==='L') ? unitIn.toUpperCase() : unitIn.toLowerCase(), 
        returnNum: numOut, 
        returnUnit: (unitOut === 'l' || unitOut === 'L') ? unitOut.toUpperCase() : unitOut.toLowerCase(),
        string: convertHandler.getString(numIn, unitIn, numOut, unitOut)
      } 
    }
        
    res.json(returnDict);
  });
};