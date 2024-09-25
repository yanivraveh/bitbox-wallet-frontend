import { useEffect, useState, useRef } from "react";

import { Link, useNavigate } from 'react-router-dom';

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

    const popupRef = useRef(null);
    
    const [locks, setLocks] = useState([]);
    const [balance, setBalance] = useState({ total: 0, locked: 0 });

    useEffect(() => {
        (async function fetchData() {
            const balanceRes = await api.getBalance();
            setBalance(balanceRes.data);

            const locksRes = await api.getLocks();
            setLocks(locksRes.data);

            const hasReady = locksRes.data.find(item => item.status == LOCK_STATUS.ready);            
            hasReady && popupRef.current.success();
        })();
    }, []);

    const [transactions, setTransactions] = useState([]);
    
    return (
        <MainContainer>
            <div id="dashboard">
                <BalancePanel isDashboard />

                <MainBodyContainer className="gap-16">
                    {balance.locked > 0 && (
                        <Panel
                            title="Active Locks"
                            data={locks}
                        />
                    )}

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
