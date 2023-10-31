var  {Jproc} = require("./JSONProcessor");
var data = require("./test.json");

var jproc = new Jproc(data);
var query = "id name language version where language='Galician' and version<1.5";
console.log(jproc.queryParser(query));