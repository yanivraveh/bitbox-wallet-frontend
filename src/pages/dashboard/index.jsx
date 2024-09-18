import { useEffect, useState } from "react";

import { Link, useNavigate } from 'react-router-dom';

import MainContainer from "../../components/containers/mainContainer";
import MainBodyContainer from "../../components/containers/main-body-container";
import { Icon, BalancePanel } from "../../components";
import api from "../../api";
import { formatCurrency, formatCurrencySymbol, LOCK_STATUS } from "../../helpers";

/**
 * Renders a panel that displays and describe list of data
 */
const Panel = ({title, data}) => {    
    return (
        <div className="data-panel gap-10 padding-16">
            <div name="header">
                <div className="body2 text-gray">{title || ''}</div>
            </div>

            <div name="list">
                {
                    data?.map((item, index) => {
                        const className = `body1 text-secondary ${item.status == LOCK_STATUS.ready ? 'text-green' : ''}`;

                        return (<div key={index} name="list-item">
                           
                                <div name="description" className="gap-8">
                                    <Icon name="lock_rounded" size={32} />
                                    <Link to={{
                                     pathname: `/lock/${item.id}`,
                                     state: { lock: "hello" },
                                    }}>

                                        <div className="body1 text-secondary">{item.description}</div>
                                    </Link>
                                </div>
                            <div className={className}>{item.value}</div>
                        </div>);
                    })
                }
            </div>
        </div>
    );
}

const DashboardPage = () => {
    const navigate = useNavigate();
    
    // fetch locks from api
    const [locks, setLocks] = useState([]);
    useEffect(() => {
        (async function fetchData() {
            const res = await api.getLocks();                        
            setLocks(res.data);
        })();
    }, []);

    // fetch transactions from api
    const [transactions, setTransactions] = useState([]);
    // useEffect(() => {
    //     (async function fetchData() {
    //         const res = await api.getTransactions();                        
    //         setTransactions(res.data);
    //     })();
    // }, []);

    useEffect(() => {
        // Set the interval to perform the task every 5 seconds
        const interval = setInterval(() => {
            (async function fetchData() {
                try {
                    const res = await api.getLatestLockRequest(); 
                    const record = res.data;       
                    if (record) {
                        // Navigate to '/lock' and pass data via state
                        confirm(`A request came from ${record.senderId} for the amount of ${formatCurrency(record.amount)}`)
                        && navigate('/lock', { state: { lockRequest: record } });
                    }
                } catch (error) {
                    console.error(error);    
                }
            })();
        }, 5000);

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, []); // Empty dependency array ensures the interval is set up only once

    return (
        <MainContainer>
            <div id="dashboard">
                <BalancePanel isDashboard />

                <MainBodyContainer className="gap-16">
                    <Panel
                        title="Active Locks"
                        data={locks}
                    />

                    <Panel
                        title="Recent Transactions"
                        data={transactions}
                    />
                </MainBodyContainer>
            </div>
        </MainContainer>        
    );
}

export default DashboardPage;
