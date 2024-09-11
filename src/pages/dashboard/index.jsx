import { useEffect, useState } from "react";

import styled from "styled-components";

import MainContainer from "../../components/containers/mainContainer";
import { Divider, Icon } from "../../components";
import { formatCurrency } from "../../helpers";
import api from "../../api";
import MainBodyContainer from "../../components/containers/main-body-container";

/**
 * Horizontal layout for actions icons
 */
const IconsContainer = styled.div`
    display: flex;
    gap: 48px;
    padding: 0 48px;
    justify-content: space-evenly;
`;

/**
 * Vertical layout for icon item
 */
const IconContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    & img {
        cursor: pointer
    }
`;

/**
 * Clickable component composed of an icon and a text
 * 
 * @param {string} name icon name 
 * @param {string} text icon text/title
 * @returns {ReactNode}
 */
const IconItem = ({name, text, ...rest}) => {
    return (
        <IconContainer className="gap-8">
            <Icon
                name={name}
                {...rest}
            />

            <div className="body2 padding-hor-8">{text}</div>
        </IconContainer>
    );
}

/**
 * Renders a panel that displays and describe list of data
 */
const Panel = ({title, data}) => {    
    return (
        <div className="temp gap-10 padding-16">
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

    // fetch balance from api
    const [balance, setBalance] = useState({
        total: 0,
        locked: 0,
    });
    useEffect(() => {
        (async function fetchData() {
            const res = await api.getBalance();                        
            setBalance(res.data);
        })();
    }, []);

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
            <div className="dashboard-panel gap-10 padding-16">
                <div className="body1 text-gray">
                    Total
                </div>

                <h1>{formatCurrency(balance?.total)}</h1>

                <div className="body2">
                    Locked: &emsp; <span className="font-weight-500">{formatCurrency(balance?.locked)}</span>
                </div>

                <Divider />

                <IconsContainer>
                    <IconItem
                        name="plus_rounded"
                        text="Fund"
                        onClick={e => console.log(e)}
                    />

                    <IconItem name="minus_rounded" text="Defund" />

                    <IconItem name="lock_rounded" text="Lock" />

                    <IconItem name="transfer_rounded" text="Transfer" />
                </IconsContainer>
            </div>

            <MainBodyContainer>
                <Panel
                    title="Active Locks"
                    data={locks}
                />

                <Panel
                    title="Recent Transactions"
                    data={transactions}
                />
            </MainBodyContainer>
        </MainContainer>        
    );
}

export default DashboardPage;
