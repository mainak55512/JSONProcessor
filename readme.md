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
```javascript
import Jproc from 'jproc';

let data = [
    {
        "name": "name_1",
        "place": "place_1",
        "age": 18,
    },
    {
        "name": "name_2",
        "place": "place_2",
        "age": 25,
    },
    {
        "name": "name_3",
        "place": "place_1",
        "age": 5,
    },
    {
        "name": "name_4",
        "place": "place_3",
        "age": 10,
    },
    ...
];

let filtered = new Jproc(data);
console.log(filtered.queryParser("name where age >= 18 && ( place = 'place_1' || place = 'place_3' )"));
```

## Output

```json
[ { name: 'name_1' } ]
```

## Example usage 2:
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

console.log(queryObj.queryParser(quwry_str));

```

## Output
```json
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
