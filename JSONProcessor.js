import eval_query from "./lib/interpreter.js"
import { getValueFromObj, getLastKey } from "./lib/utils.js";

export default class Jproc {
    constructor(data) {
        this.data = data;
        this.paramArr = [];
        this.query = "";
    }
    neededParams(paramArr) {
        if (paramArr.length) {
            this.paramArr = paramArr;
        }
    }
    setQuery(query) {
        if (query.length) {
            this.query = query;
        }
    }
    exec_query() {
        var resultArr = [];
        if (!this.query.length && !this.paramArr.length) {
            throw new Error("No query or parameter found");
        } else if (!this.query.length) {
            let parms = this.paramArr;
            this.data.forEach(function(obj) {
                var resultObj = {};
                for (var i = 0; i < parms.length; i++) {
                    resultObj[getLastKey(parms[i])] = getValueFromObj(obj, parms[i]);
                }
                resultArr.push(resultObj);
            });
        } else if (!this.paramArr.length) {
            let queryStr = this.query;
            this.data.forEach(function(obj) {
                let result = eval_query(obj, queryStr);
                if (result) {
                    resultArr.push(obj);
                }
            });
        } else {
            let queryStr = this.query;
            let parms = this.paramArr;

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
        }
        return resultArr;
    }
}
