import { Jproc } from "./JSONProcessor.js";
import fs from "fs";
let data = JSON.parse(fs.readFileSync("./test.json"));

var jproc = new Jproc(data);
var query = "id name language version where language='Galician' && version > 2.5";
console.log(jproc.queryParser(query));
