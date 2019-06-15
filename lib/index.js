// Library Modules
global.fetch = require("node-fetch");

// Fixer.io API
const fixerAPI = 'YOUR_FIXERIO_API_HERE';

// => Async: gets the current exchange rate, base is EURO
const fetchExchangeRate = async (from, to) => {
    try {
        const response = await fetch(`http://data.fixer.io/api/latest?access_key=${fixerAPI}&format=1`);
        const data = await response.json();
        const euro = 1 / data.rates[from];
        return euro * data.rates[to];
    } catch (e) {
        throw new Error(`Something went wrong. Please check arguments.`);
    }
};

// => Async: gets all supported countries for the currency being queried
const fetchCountries = async (currency) => {
    try {
        const response = await fetch(`https://restcountries.eu/rest/v2/currency/${currency}`);
        const data = await response.json();
        return data.map(country => country.name).join(', ');
    } catch (e) {
        throw new Error(`Something went wrong. Please check argument.`);
    }
};

// => Async: main function to convert the amount to the target-currency
const konvert = async (from, to, amount) => {
    // Force typecast to avoid errors
    const f = String(from);
    const t = String(to);
    const a = Number(amount);

    try {
        const rate = await fetchExchangeRate(f, t);
        return (a * rate).toFixed(2);
    } catch (e) {
        throw new Error(e);
    }
};

// => Async: main function to get all supported countries for currency being queried
const konvertCountries = async (currency) => {
    // Force typecast to avoid errors
    const c = String(currency);

    try {
        return await fetchCountries(c);
    } catch (e) {
        throw new Error(e);
    }
};

module.exports = {
    konvert,
    konvertCountries,
};
