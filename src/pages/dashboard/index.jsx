import { useEffect, useState, useRef } from "react";

import { useNavigate } from 'react-router-dom';

import MainContainer from "../../components/containers/mainContainer";
import MainBodyContainer from "../../components/containers/main-body-container";
import { Icon, BalancePanel, Popup } from "../../components";
import api from "../../api";
import { formatCurrency, formatCurrencySymbol, LOCK_STATUS, LOCK_TYPE } from "../../helpers";
import styled from "styled-components";

const LockIconContainer = styled.div`
    position: absolute;
    bottom: 0;
    right: -2px;
`;

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
                        const iconName = item.type == LOCK_TYPE.money ? 'currency_exchange_rounded' : 'plane_rounded';

                        return (<div key={index} name="list-item">
                            <div name="description" className="gap-8">
                                <div style={{position: 'relative'}}>
                                    <Icon name={iconName} size={32} />

                                    {
                                        item.status == LOCK_STATUS.waiting &&
                                        <LockIconContainer>
                                            <Icon name="lock" width={10.73} height={13.93} />
                                        </LockIconContainer>
                                    }
                                </div>

                                <div className="body1 text-secondary">{item.description}</div>
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

    /**
     * Popup component inner object reference
     */
    const popupRef = useRef(null);
    
    // fetch locks from api
    const [locks, setLocks] = useState([]);
    useEffect(() => {
        (async function fetchData() {
            const res = await api.getLocks();                        
            setLocks(res.data);

            const hasReady = res.data.find(item => item.status == LOCK_STATUS.ready);            
            hasReady && popupRef.current.success();
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

    // show lock request notifications
    useEffect(() => {
        // Set the interval to perform the task every 5 seconds
        const interval = setInterval(() => {
            (async function fetchData() {
                try {
                    const res = await api.getLatestLockRequest(); 
                    const record = res.data;       
                    if (record && !popupRef?.current?.isVisible()) {                        
                        // Navigate to '/lock' and pass data via state
                        const  title = `A request came from "${record.senderId}" for the amount of ${formatCurrency(record.amount)}`;
                        const res = await popupRef?.current?.confirmation({
                            iconName: 'lock_rounded',
                            okBtnText: 'Detailed',
                            title
                        });                        
                        res && navigate('/lock', { state: { lockRequest: record } });
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

            <Popup
                ref={popupRef}
                iconName="lock_rounded"
                okBtnText='Detailed'
            />
        </MainContainer>        
    );
}

export default DashboardPage;
