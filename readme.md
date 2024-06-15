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


## Example usage 1:

Jproc uses 'where' like query structure, where in the left hand side of the 'where' clause you will define the field names that 
you want to be included in the output array and on the right hand side you will define the actual query.
You need to use '.' to access the subfields.

```javascript

import Jproc from "jproc";

let data = [
    {
        name: 'name_1',
        age: 18,
        details: {
            id: 'hvnakds2342349',
            location: 'London',
            company: "xyz",
        }
    },
    {
        name: 'name_2',
        age: 20,
        details: {
            id: 'iuefibe8362873287',
            location: 'London',
            company: "abc",
        }
    },
    {
        name: 'name_3',
        age: 19,
        details: {
            id: 'iwhiuvwi766579',
            location: 'New York',
            company: "xyz",
        }
    },
    {
        name: 'name_4',
        age: 25,
        details: {
            id: 'wuwcuwey652362',
            location: 'New York',
            company: "pqr",
        }
    }
]

let queryObj = new Jproc(data);

let query_str = "name details.id details.company details.location where (age >= 20 || (age > 18 && details.company = 'xyz')) && (details.location = 'London' || details.location = 'New York')";

console.log(queryObj.queryParser(query_str));
```

## Output

```
[
  {
    name: 'name_2',
    id: 'iuefibe8362873287',
    company: 'abc',
    location: 'London'
  },
  {
    name: 'name_3',
    id: 'iwhiuvwi766579',
    company: 'xyz',
    location: 'New York'
  },
  {
    name: 'name_4',
    id: 'wuwcuwey652362',
    company: 'pqr',
    location: 'New York'
  }
]
```

## Example usage 2:

You can omit the 'where' part as well, in that case just provide the query and it will return that result array.

```javascript

import Jproc from "jproc";

let data = [
    {
        name: 'name_1',
        age: 18,
        details: {
            id: 'hvnakds2342349',
            location: 'London',
            company: "xyz",
            keywords: ['test1', 'test2', 'test3'],
        }
    },
    {
        name: 'name_2',
        age: 20,
        details: {
            id: 'iuefibe8362873287',
            location: 'London',
            company: "abc",
            keywords: ['test1', 'test2', 'test3'],
        }
    },
    {
        name: 'name_3',
        age: 19,
        details: {
            id: 'iwhiuvwi766579',
            location: 'New York',
            company: "xyz",
            keywords: ['test1', 'test2', 'test3'],
        }
    },
    {
        name: 'name_4',
        age: 25,
        details: {
            id: 'wuwcuwey652362',
            location: 'Iraq',
            company: "pqr",
            keywords: ['test1', 'test2', 'test3'],
        }
    }
]

let queryObj = new Jproc(data);
let query_str = "(age >= 20 || (age > 18 && details.company = 'xyz')) && (details.location = 'London' || details.location = 'New York')";
console.log(JSON.stringify(queryObj.queryParser(query_str)));

```

## Output
```json
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
```
