import { useState, useEffect } from "react";

import styled from "styled-components";

import { formatCurrency } from "../../helpers";
import { Divider, Icon } from "..";
import api from "../../api";

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
 * 
 * @param {boolean} isDashboard whether to show icons (fund,defund,..etc). default false
 * @returns {ReactNode}
 */
const BalancePanel = ({isDashboard}) => {
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

    return (
        <div className="balance-panel">
            <div className="content gap-10">
                <div className="body1 text-gray" name="total">
                    Total
                </div>

                <h1 className="text-gray" name="balance">{formatCurrency(balance?.total)}</h1>

                <div className="body2 text-secondary" name="locked">
                    <span>Locked:</span> &emsp; <span className="font-weight-500">{formatCurrency(balance?.locked)}</span>
                </div>

                {
                    isDashboard &&
                    <>
                        <Divider />

                        <IconsContainer>
                            <Icon name="plus_rounded" text="Fund" href="./fund" />

                            <Icon name="minus_rounded" text="Defund" href="./defund" />

                            <Icon name="lock_rounded" text="Lock" href="./lock-request" />

                            <Icon name="transfer_rounded" text="Transfer" href="./transfer" />
                        </IconsContainer>
                    </>
                }
            </div>
        </div>
    );
}

export default BalancePanel;
