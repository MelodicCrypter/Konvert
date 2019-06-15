## Konvert 
&nbsp;

Konvert is a node module for fetching latest currency conversion. It can also get which countries the user can spend the target-currency.
    
    
## Installation
`npm i konvert`
<br>
<br>
or
<br>
<br>
`yarn add konvert`

## Usage
##### Require konvert module.

`const {konvert, konvertCountries} = require('konvert');`

<br>
<br>

##### Getting the current currency conversion.

<br>

// convert 20 pounds to Philippine peso

`konvert('GBP', 'PHP', 20)`

&nbsp;&nbsp;&nbsp;`.then(amount => console.log(amount));`

<br>
<br>

##### Getting all supported countries for the target-currency

<br>

// get all countries that support pounds

`konvertCountries('GBP')`

&nbsp;&nbsp;&nbsp;`.then(countries => console.log(countries));`

