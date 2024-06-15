import eval_query from "./lib/interpreter.js"
import { getValueFromObj, getLastKey } from "./lib/utils.js";

export default class Jproc {
    constructor(data) {
        this.data = data;
    }
    queryParser(query) {
        var resultArr = [];
        if (query.indexOf("where") > 0) {
            let queryStr = query.split("where")[1].trim();
            let parms = query.split("where")[0].trim().split(" ");

            this.data.forEach(function(obj) {
                let result = eval_query(obj, queryStr);
                if (result) {
                    var resultObj = {};
                    for (var i = 0; i < parms.length; i++) {
                        resultObj[getLastKey(parms[i])] = getValueFromObj(obj, parms[i]);
                    }
                    resultArr.push(resultObj);
                }
            });
        } else {
            let queryStr = query;
            this.data.forEach(function(obj) {
                let result = eval_query(obj, queryStr);
                if (result) {
                    resultArr.push(obj);
                }
            });
        }

        return resultArr;
    }

}
