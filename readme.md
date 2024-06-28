# Jproc

Jproc is a light-weight simple json array query tool written in JavaScript.


## Installation

```
npm install jproc
```
or,
```
npm i jproc
```
## Sample data.json

```json
[
    {
        "name": "name_1",
        "age": 18,
        "details": {
            "id": "hvnakds2342349",
            "location": "London",
            "company": "xyz",
            "keywords": [
                "test1",
                "test2",
                "test3"
            ]
        }
    },
    {
        "name": "name_2",
        "age": 20,
        "details": {
            "id": "iuefibe8362873287",
            "location": "London",
            "company": "abc",
            "keywords": [
                "test1",
                "test2",
                "test3"
            ]
        }
    },
    {
        "name": "name_3",
        "age": 19,
        "details": {
            "id": "iwhiuvwi766579",
            "location": "New York",
            "company": "xyz",
            "keywords": [
                "test1",
                "test2",
                "test3"
            ]
        }
    },
    {
        "name": "name_4",
        "age": 25,
        "details": {
            "id": "wuwcuwey652362",
            "location": "Iraq",
            "company": "pqr",
            "keywords": [
                "test1",
                "test2",
                "test3"
            ]
        }
    }
]

```

## Example usage:

```javascript
import Jproc from "jproc";
import fs from "fs";

let data = JSON.parse(fs.readFileSync("./data.json"));


// Initialize Jproc object with json data.
let jObj = new Jproc(data);

// Optionally you can set which parameters you want in the resultant array form the original json object.
jObj.neededParams(["name", "details.id"]);

// Set query for the jproc object, this is mandatory otherwise it will throw exception
jObj.setQuery("(age >= 20 || (age > 18 && details.company = 'xyz')) && (details.location = 'London' || details.location = 'New York')");

// Finally call queryParser() method to execute the query. This will return a resultant array with the parameters 
// defined by the neededParams() method. If nothing defined by the neededParams() method, it will return all the
// fields form the json object.
console.log(jObj.queryParser());

```

## Output

```json
[
    {
        "name": "name_2",
        "id": "iuefibe8362873287"
    },
    {
        "name": "name_3",
        "id": "iwhiuvwi766579"
    }
]
```
