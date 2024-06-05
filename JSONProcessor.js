import eval_query from "./lib/interpreter.js"

export default class Jproc {
    constructor(data) {
        this.data = data;
    }
    queryParser(query) {
        let queryStr = query.split("where")[1].trim();
        let parms = query.split("where")[0].trim().split(" ");

        var resultArr = [];
        this.data.forEach(function(obj) {
            //var result = Function(queryStr)();
            var result = eval_query(obj, queryStr);
            if (result) {
                var resultObj = {};
                for (var i = 0; i < parms.length; i++) {
                    resultObj[parms[i]] = obj[parms[i]];
                }
                resultArr.push(resultObj);
            }
        });
        return resultArr;
    }
}


