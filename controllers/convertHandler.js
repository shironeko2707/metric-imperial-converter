function ConvertHandler() {
  
  this.getNum = function(input) {
    let strRegEx = /\.?[0-9]+(\.[0-9]+?)?(\/\.?[0-9]+(\.[0-9]+?)?)?/g;
    let result = input.match(strRegEx);
    
    if( result === null){
      return 1;
    }
    if (result.length > 1 ){
      return {"error" : "invalid number"}
    }
  const divideArr = result[0].split('/');
    if(divideArr.length === 2){
      return parseFloat(divideArr[0]) / parseFloat(divideArr[1])
    }
    return result[0] != undefined? parseFloat(result[0]): { "error": "invalid number"};
  };
  this.getUnit = function(input) {
    let strRegEx = /[a-z]+/ig;
    let result = input.match(strRegEx);
    if (result === null){
      return {"error":"no unit given"}
    }
   return result[0];
  };
  
  this.getReturnUnit = function(initUnit) {
    const CONVERT_TO = {
      gal : 'L',
      L : 'gal',
      mi : 'km',
      km : 'mi',
      lbs :'kg',
      kg :'lbs'
      
    };
    return (CONVERT_TO[initUnit.toLowerCase()] === undefined) ? {"error":"invalid unit"} : CONVERT_TO[initUnit.toLowerCase()];
   
  };

  this.spellOutUnit = function(unit) {
    const UNIT_STRINGS = {
      km: 'kilometers',
      L: 'liters',
      l: 'liters',
      gal: 'gallons',
      mi: 'miles',
      kg: 'kilograms',
      lbs: 'pounds'
    }
    return UNIT_STRINGS[unit.toLowerCase()];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.785410;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;

    if(initUnit.toLowerCase() === 'gal'){
      result = galToL * initNum ; 
    } else if(initUnit.toLowerCase() === 'l'){
      result = parseFloat(initNum) / galToL ; 
    } else if(initUnit.toLowerCase() === 'lbs'){
      result = lbsToKg * parseFloat(initNum) ;
    } else if(initUnit.toLowerCase() === 'kg'){
      result = parseFloat(initNum) / lbsToKg ; 
    } else if(initUnit.toLowerCase() === 'mi'){
      result = miToKm * parseFloat(initNum) ;
    } else if(initUnit.toLowerCase() === 'km'){
      result = parseFloat(initNum) / miToKm ;
    } else {
      return 'invalid unit';
    }    
    return Math.round(result * 100000) / 100000;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    if(returnUnit.error){
      return 'invalid unit'
    }

    let result = initNum +' '+ this.spellOutUnit(initUnit) +' converts to '+ (returnNum).toFixed(5) +' '+ this.spellOutUnit(returnUnit);
    
    return result;
  };
  
}

module.exports = ConvertHandler;