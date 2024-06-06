# Jproc

Jproc is a json query tool written in JavaScript.


## Installation

```
npm install jproc
```
or,
```
npm i jproc
```


## Example usage
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

```
[ { name: 'name_1' } ]
```

