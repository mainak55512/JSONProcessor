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
    queryParser() {
        var resultArr = [];
        if (!this.query.length) {
            throw "Query statement not found";
        } else {
            let queryStr = this.query;
            let parms = this.paramArr;

            this.data.forEach(function(obj) {
                let result = eval_query(obj, queryStr);
                if (result) {
                    if (parms.length) {
                        var resultObj = {};
                        for (var i = 0; i < parms.length; i++) {
                            resultObj[getLastKey(parms[i])] = getValueFromObj(obj, parms[i]);
                        }
                        resultArr.push(resultObj);
                    } else {
                        resultArr.push(obj);
                    }
                }
            });
        }

        return resultArr;
    }

}
