
/**
 * Number of decimal digita to display
 */
export const digits = 2;

/**
 * Round the number to a preciese decimal digits.
 * 
 * @param {number} num the number to be rounded
 * @returns {number}
 */
export const roundNumber = (num) => {
    const number = parseFloat(num) || 0;
    return Number( number.toFixed(digits) );
}

/**
 * Round the number and adds thousands comma to it.
 * 
 * @param {number} num
 * @returns {string}
 */
export const formatNumber = (num) => {
    const number = roundNumber(num);
    return number.toLocaleString('en', {minimumFractionDigits: digits});
}

/**
 * Round the number, then add thousands comma to it, then add currency ISO code.
 * 
 * @param {number} num
 * @returns {string}
 */
export const formatCurrency = (num) => {
    const number = formatNumber(num);
    return `${number} ILS`;
}

/**
 * Add currency symbol to number.
 * 
 * @param {int} num number to format in currency
 * @returns {string}
 */
export const formatCurrencySymbol = (num) => {
    const number = roundNumber(num);
    return `₪${number}`;
}

/**
 * list of locks types
 */
export const lockTypes = [
    {
        id: 1,
        name: 'Money lock',
    },
    {
        id: 2,
        name: 'Plane ticket lock'
    },
];

/**
 * Types of locks
 */
export const LOCK_TYPE = {
    money: 1,
    ticket: 2,
};

/**
 * Statuses of locks
 */
export const LOCK_STATUS = {
    waiting: 1,
    ready: 2,
};
