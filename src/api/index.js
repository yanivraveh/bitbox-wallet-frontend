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
 * Get the wallet id
 * 
 * @returns {string}
 */
const getWalletId = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_DEMO_URL}buyer`);
        return response.data.replace(/"/g, '');
    } catch (error) {
        console.error('Failed to get wallet id', error);
    }
}


/**
 * Wallet ID
 */
let walletId = await getWalletId();

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
        // set auto properties
        data.id = generateRandomId();
        data.endDate = moment(data.endDate).unix() * 1000;

        return request.post(`${walletId}/lock`, data);
           
        // return new Promise((resolve, reject) => {
        //     try {
        //         if (!data) return reject('Data is empty');

        //         // read locks from local storage
        //         let locks = localStorage.locks
        //         locks = locks ? JSON.parse(locks) : [];

        //         // save lock to storage
        //         data.id = generateRandomId();
        //         locks.push(data);
        //         localStorage.locks = JSON.stringify(locks);

        //         // read lock requests from local storage
        //         let lockRequests = localStorage.lockRequests
        //         lockRequests = lockRequests ? JSON.parse(lockRequests) : [];

        //         // remove lock request after creating lock
        //         lockRequests = lockRequests.filter(item => item.id != data.lockRequestId);
        //         localStorage.lockRequests = JSON.stringify(lockRequests);

        //         resolve(data);
        //     } catch (error) {
        //         reject(error);
        //     }
        // });
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
    async getLocks() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await request.get(`${walletId}/locks`);
                const { data } = response;

                if (!Array.isArray(data)) {
                    console.error('Received data is not an array:', data);
                    resolve({ data: [] });
                    return;
                }

                const processedData = data.map(item => {
                    const processedItem = { ...item };
                    processedItem.description = processedItem.recipientId;

                    let duration = moment.unix(processedItem.endDate / 1000).diff(moment(), 'd');
                    duration = duration < 0 ? 0 : duration;

                    processedItem.value = `${formatCurrencySymbol(processedItem.amount)} / ${duration} days`;
                    return processedItem;
                });

                resolve({ data: processedData });
            } catch (error) {
                console.error('Error fetching locks:', error);
                reject(error);
            }
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
     * GET: Get lock by id.
     * 
     * @param {string} id lock id
     * @returns {Promise<object>}
     */
    getLockById(id) {
        // return request.get(`${walletId}/locks/${id}`);
        return new Promise((resolve, reject) => {
            try {
                if (!id) return reject('Id is empty');

                // read locks from local storage
                let locks = localStorage.locks
                locks = locks ? JSON.parse(locks) : [];

                // find lock by id
                const lock = locks.find(item => item.id == id);
                console.log(`getLockById(${id}):: lock: `, lock);
                
                if (!lock) return reject(`Lock with id:${id} not found`);

                lock.description = lockTypes.find(lockType => lockType.id == lock.type)?.name;

                let duration = moment.unix(lock.endDate).diff(moment(), 'd');

                lock.value = lock.status == LOCK_STATUS.waiting ?
                `${formatCurrencySymbol(lock.amount)} / ${duration} days` :`${formatCurrencySymbol(lock.amount)} / Ready` ;

                resolve({
                    data: lock,
                });
            } catch (error) {
                reject(error);
            }
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
