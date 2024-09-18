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
  return Number(number.toFixed(digits));
};

/**
 * Round the number and adds thousands comma to it.
 *
 * @param {number} num
 * @returns {string}
 */
export const formatNumber = (num) => {
  const number = roundNumber(num);
  return number.toLocaleString("en", { minimumFractionDigits: digits });
};

/**
 * Round the number, then add thousands comma to it, then add currency ISO code.
 *
 * @param {number} num
 * @returns {string}
 */
export const formatCurrency = (num) => {
  const number = formatNumber(num);
  return `${number} ILS`;
};

/**
 * Add currency symbol to number.
 *
 * @param {int} num number to format in currency
 * @returns {string}
 */
export const formatCurrencySymbol = (num) => {
  const number = roundNumber(num);
  return `₪${number}`;
};

/**
 * list of locks types
 */
export const lockTypes = [
  {
    id: 1,
    name: "Currency exchange lock",
  },
  {
    id: 2,
    name: "Ticket lock",
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

/**
 * Available
 */
export const pspIds = [
  {
      id: 'a60cb438-5379-4b7e-8d8e-6ab3f8d45187',
      name: 'BitBox',
  },
  {
      id: '099f4083-fef6-4ab0-b282-12dc7837bce2',
      name: 'FoxPay',
  }
];

/**
 * Available ticket genders
 */
export const genders = [
  {
    id: 'M',
    name: 'Male',
  },
  {
    id: 'F',
    name: 'Female',
  }
];

/**
 * Available ticket ages
 */
export const ages = [
  {
    id: 'A',
    name: 'Adult',
  },
  {
    id: 'C',
    name: 'Child',
  }
];
