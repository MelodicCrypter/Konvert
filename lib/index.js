// Library Modules
global.fetch = require("node-fetch");

// Fixer.io API
const fixerAPI = 'YOUR_FIXERIO_API_HERE';

// NON-ASYNC ================================================================================================
// Non-Async: using fetch to get the current exchange rate, base is EURO
const fetchExchangeRate = (from, to) => {
    return fetch(`http://data.fixer.io/api/latest?access_key=${fixerAPI}&format=1`)
        .then(resp => resp.json())
        .then(data => {
            const euro = 1 / data.rates[from];
            return euro * data.rates[to];
        })
        .catch(e => `Something went wrong. Please check arguments.`);
};

// Non-Async: using fetch to get the countries that supports the currency being queried
const fetchCountries = (currency) => {
    return fetch(`https://restcountries.eu/rest/v2/currency/${currency}`)
        .then(resp => resp.json())
        .then(data => data.map(country => country.name).join(', '))
        .catch(e => `Something went wrong. Please check argument.`);
};

// Main function to convert the amount to the target-currency
const konvert = (from, to , amount) => {
    // Force typecast to avoid errors
    const f = String(from);
    const t = String(to);
    const a = Number(amount);

    return fetchExchangeRate(f, t)
        .then((rate) => (a * rate).toFixed(2));
};

// Main function to get all supported countries for currency being queried
const konvertCountries = (currency) => {
    // Force typecast to avoid errors
    const c = String(currency);

    return fetchCountries(c).then(data => data);
};

// ASYNC =====================================================================================================
// Async: gets the current exchange rate, base is EURO
const fetchExchangeRateAsync = async (from, to) => {
    try {
        const response = await fetch(`http://data.fixer.io/api/latest?access_key=${fixerAPI}&format=1`);
        const data = await response.json();
        const euro = 1 / data.rates[from];
        return euro * data.rates[to];
    } catch (e) {
        throw new Error(`Something went wrong. Please check arguments.`);
    }
};

// Async: gets all supported countries for the currency being queried
const fetchCountriesAsync = async (currency) => {
    try {
        const response = await fetch(`https://restcountries.eu/rest/v2/currency/${currency}`);
        const data = await response.json();
        return data.map(country => country.name).join(', ');
    } catch (e) {
        throw new Error(`Something went wrong. Please check argument.`);
    }
};

// Async: main function to convert the amount to the target-currency
const konvertAsync = async (from, to, amount) => {
    // Force typecast to avoid errors
    const f = String(from);
    const t = String(to);
    const a = Number(amount);

    try {
        const rate = await fetchExchangeRateAsync(f, t);
        return (a * rate).toFixed(2);
    } catch (e) {
        throw new Error(`Something went wrong. Please check arguments`);
    }
};

// Async: main function to get all supported countries for currency being queried
const konvertCountriesAsync = async (currency) => {
    // Force typecast to avoid errors
    const c = String(currency);

    try {
        return await fetchCountriesAsync(c);
    } catch (e) {
        throw new Error(`Something went wrong. Please check argument.`);
    }
};

module.exports = {
    konvert,
    konvertCountries,
    konvertAsync,
    konvertCountriesAsync,
};
