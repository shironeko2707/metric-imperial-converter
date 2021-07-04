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
    const COVERT_TO = {
      gal : 'L',
      L : 'gal',
      mi : 'km',
      km : 'mi',
      lbs :'kg',
      kg :'lbs'
      
    }
    let result;
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
