import axios from "axios";
import moment from "moment";
import { formatCurrencySymbol, LOCK_STATUS, lockTypes } from "../helpers";
/**
 * Imitate api response time
 */
const TIMEOUT = 1000;

/**
 * Generate a random uuid string.
 * 
 * @returns {string}
 */
const generateRandomId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

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
     * 
     * @param {object} data lock data
     * @returns {Promise}
     */
    createLock(data) {        
        return new Promise((resolve, reject) => {
            try {
                if (!data) return reject('Data is empty');

                // read locks from local storage
                let locks = localStorage.locks
                locks = locks ? JSON.parse(locks) : [];

                // save lock to storage
                data.id = generateRandomId();
                locks.push(data);
                localStorage.locks = JSON.stringify(locks);

                // read lock requests from local storage
                let lockRequests = localStorage.lockRequests
                lockRequests = lockRequests ? JSON.parse(lockRequests) : [];

                // remove lock request after creating lock
                lockRequests = lockRequests.filter(item => item.id != data.lockRequestId);
                localStorage.lockRequests = JSON.stringify(lockRequests);

                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    },

    /**
     * 
     * @param {object} data lock request data
     * @returns {Promise}
     */
    createLockRequest(data) {
        return new Promise((resolve,  reject) => {
            try {
                if (!data) return reject('Data is empty');

                // read records from local storage
                let records = localStorage.lockRequests
                records = records ? JSON.parse(records) : [];

                // set auto properties
                data.id = generateRandomId();
                data.status = 1;
                data.endDate = moment(data.endDate).unix();

                // save record to local storage
                records.push(data);
                localStorage.lockRequests = JSON.stringify(records);
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    },

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
        // return request.get(`${walletId}/locks`);

        // read locks from local storage
        let data = localStorage.locks
        data = data ? JSON.parse(data) : [];

        data.map(item => {
            item.description = lockTypes.find(lockType => lockType.id == item.type)?.name;

            let duration = moment.unix(item.endDate).diff(moment(), 'd');
            duration = duration < 0 ? 0 : duration;

            item.value = item.status == LOCK_STATUS.waiting ?
            `${formatCurrencySymbol(item.amount)} / ${duration} days` :`${formatCurrencySymbol(item.amount)} / Ready` ;
        });

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    data,
                });
            }, TIMEOUT);
        });
    },

    /**
     * Fetch the newest lock request
     * 
     * @returns {Promise<object>}
     */
    getLatestLockRequest() {
        return new Promise(resolve => {
            setTimeout(() => {
                // read records from local storage
                let records = localStorage.lockRequests
                records = records ? JSON.parse(records) : [];
                
                const record = records.at(-1) || null;
                if (record) {
                    let duration = moment.unix(record.endDate).diff(moment(), 'd');
                    duration = duration < 0 ? 0 : duration;
                    record.duration = `${duration} days`;
                }
                resolve({
                    data: record,
                });
            }, TIMEOUT);
        });
    },

    /**
     * GET: Get transactions.
     * 
     * @returns {Promise}
     */
    getTransactions() {
        // return request.get(`${walletId}/transactions`)
        return new Promise(resolve => {
            const data = [];
            setTimeout(() => {
                resolve({
                    data
                })
            }, TIMEOUT);
        });
    },
}
