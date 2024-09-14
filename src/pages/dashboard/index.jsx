import { useEffect, useState } from "react";

import MainContainer from "../../components/containers/mainContainer";
import MainBodyContainer from "../../components/containers/main-body-container";
import { Icon, BalancePanel } from "../../components";

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
                    data?.map((item, index) => <div key={index} name="list-item">
                        <div name="description" className="gap-8">
                            <Icon name="lock_rounded" />

                            <div className="body1 text-secondary">{item.description}</div>
                        </div>

                        <div className="body1 text-secondary">{item.value}</div>
                    </div>)
                }
            </div>
        </div>
    );
}

const DashboardPage = () => {
    // fetch locks from api
    const [locks, setLocks] = useState([
        {
            description: 'Money lock',
            value: '₪100 / 30 days',
        },
        {
            description: 'Money lock',
            value: '₪100 / 30 days',
        },
        {
            description: 'Money lock',
            value: '₪100 / 30 days',
        },
    ]);
    // useEffect(() => {
    //     (async function fetchData() {
    //         const res = await api.getLocks();                        
    //         setLocks(res.data);
    //     })();
    // }, []);

    // fetch transactions from api
    const [transactions, setTransactions] = useState([]);
    // useEffect(() => {
    //     (async function fetchData() {
    //         const res = await api.getTransactions();                        
    //         setTransactions(res.data);
    //     })();
    // }, []);

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
