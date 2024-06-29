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


//------------------------------------ Example 1 ----------------------------------------

// Optionally you can set which parameters you want in the resultant array form the original json object.
jObj.neededParams(["name", "details.id"]);

// Set query for the jproc object, if no query is set using setQuery() method, then it will return resultant array 
// with the fields specified by neededParams() method. If no parameter or query specified, then it will throw error.
jObj.setQuery("(age >= 20 || (age > 18 && details.company = 'xyz')) && (details.location = 'London' || details.location = 'New York')");

// Finally call exec_query() method to execute the query.
console.log(JSON.stringify(jObj.exec_query()));

/*
 It matches the condition and returns the fields specified in the neededParams() method called before.
 output:
 --------
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
*/
// ----------------------------------- End of Example 1 -------------------------------------


// -------------------------------------- Example 2 -----------------------------------------

// use clearParams() method to clear the parameters set by the neededParams() method.
jObj.clearParams();

console.log(JSON.stringify(jObj.exec_query()));

/*
 It will match the condition and return all the fields form the json object as we have cleared the parameters set for the jproc object.
 Output:
 -------
 [
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
  }
]
*/
// ------------------------------- End of Example 2 ---------------------------------


// ------------------------------- Example 3 ----------------------------------------

jObj.neededParams(["name", "details.id", "details.location"]);

// Use clearQuery() method to clear existing query for the jproc object.
jObj.clearQuery();

console.log(JSON.stringify(jObj.exec_query()));

/*
 It doesn't match the condition as we have cleared the query and returns the fields form all the json elements for the array
 that are specified in the neededParams() method before.
Output:
-------
[
  {
    "name": "name_1",
    "id": "hvnakds2342349",
    "location": "London"
  },
  {
    "name": "name_2",
    "id": "iuefibe8362873287",
    "location": "London"
  },
  {
    "name": "name_3",
    "id": "iwhiuvwi766579",
    "location": "New York"
  },
  {
    "name": "name_4",
    "id": "wuwcuwey652362",
    "location": "Iraq"
  }
]
*/
// ------------------------------ End of Example 3 ---------------------------------


// ------------------------------ Example 4 ----------------------------------------

jObj.clearQuery();
jObj.clearParams();

console.log(JSON.stringify(jObj.exec_query()));

/*
This will throw error as we have cleared both parameters and query.
*/
// ------------------------------ End of Example 4 ---------------------------------

```
