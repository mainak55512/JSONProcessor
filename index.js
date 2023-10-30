function jproc(file, query) {
    var file_location = "./" + file;
    data = require(file_location);
    console.log(queryParser(data, query));
}

function queryParser(data, query) {
    st1 = query.split("where")[1].trim();
    parms = query.split("where")[0].trim().split(" ");
    st2 = st1.replaceAll("=", "==").replaceAll("<==","<=").replaceAll(">==",">=").replaceAll("and", "&&").replaceAll("or", "||");
    args = st2.split(" ");

    queryStr = "return " + args.map(function (e) {
        if (e !== '&&' && e !== '||') {
            if (e[0] === "(") {
                return "(this.obj." + e.toString().substring(1, e.length);
            }
            return "this.obj." + e.toString();
        }
        else if (e === '&&' || e === '||') {
            return e;
        }
    }).join(" ").toString();

    var resultArr = [];

    data.forEach(function (obj) {
        this.obj = obj;
        var result = Function(queryStr)();
        if (result) {
            var resultObj = {};
            for (var i = 0; i < parms.length; i++) {
                if (parms[i].includes(".")) {
                    this.resultObj = resultObj;
                    parms_arr = parms[i].split(".");
                    Function("this.resultObj." + parms_arr[parms_arr.length-1] + "= this.obj." + parms[i])();
                }
                else {
                    resultObj[parms[i]] = this.obj[parms[i]];
                }

            }
            resultArr.push(resultObj);
        }
    });
    return resultArr;
}


var query = "id name language version where (language='Sindhi' or language='Galician') and version<4";

jproc("test.json", query)