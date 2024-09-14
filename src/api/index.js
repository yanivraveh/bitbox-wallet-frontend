import axios from "axios";

/**
 * Wallet ID
 */
let walletId = localStorage.walletId || '';

/**
 * Http request instance
 */
const request = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

/**
 * Set the wallet id value for the  api uri
 * 
 * @param {string} value wallet id value
 */
export const setWalletId = (value) => {
    walletId = value;
    localStorage.setItem('walletId', value);
}

export default {        
    /**
     * POST: Create new wallet.
     * 
     * @returns {Promise}
     */
    createWallet() {
        return request.post();
    },

    /**
     * GET: Get wallet balance.
     * 
     * @returns {Promise}
     */
    getBalance() {
        return request.get(`${walletId}/balance`)
    },

    /**
     * GET: Get locks.
     * 
     * @returns {Promise}
     */
    getLocks() {
        return request.get(`${walletId}/locks`)
    },

    /**
     * GET: Get transactions.
     * 
     * @returns {Promise}
     */
    getTransactions() {
        return request.get(`${walletId}/transactions`)
    },
}
