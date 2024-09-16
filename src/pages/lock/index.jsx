
import { useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { BalancePanel, Button, Icon, Input, Select, Popup } from "../../components";
import MainBodyContainer from "../../components/containers/main-body-container";
import { LOCK_TYPE, lockTypes } from '../../helpers';
import api from '../../api';

const LockPage = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const { state } = location || {}; // Optional chaining in case there's no state
    const { lockRequest } = state || {}; // Extracting data from state


    const [model] = useState({
        ...lockRequest,
        lockRequestId: lockRequest?.id
    });

    const iconName = model.type == LOCK_TYPE.money ? 'currency_exchange_rounded' : 'plane_rounded';
    const lockName = lockTypes.find(item => item.id == model.type)?.name || '';
    console.log(model);
    

    /**
     * Handles form submit. create new lock.
     * 
     * @param {Event} e submit button click event
     */
    const OnSubmit = e => {
        api.createLock(model).then(res => {
            alert('Save succeeded');
            navigate('/');
        })
        .catch(err => console.error(err));
    }

    return (
        <MainBodyContainer>
            <BalancePanel />

            <div className="padding-top-16">
                <Icon
                    name={iconName}
                    text={lockName}
                    textClassName="text-secondary"
                    size={56}
                />

                <form className="gap-4 flex-column padding-top-16">
                    <Input
                        label="Sender ID"
                        defaultValue={model.senderId}
                        readOnly
                    />

                    <Input
                        label="Recepient ID"
                        defaultValue={model.recepientId}
                        readOnly
                    />

                    <Input
                        label="Recepient Psp ID"
                        defaultValue={model.recipientPspId}
                        readOnly
                    />

                    <Select
                        label="Lock type"
                        options={lockTypes}
                        defaultValue={model.type}
                        readOnly
                    />

                    <Input
                        label="Amount"
                        defaultValue={model.amount}
                        type="number"
                        readOnly
                    />

                    <Input
                        label="Time for lock"
                        defaultValue={model.duration}
                        readOnly
                    />

                    <Button
                        text="Create lock"
                        onClick={OnSubmit}
                    />
                </form>
            </div>
        </MainBodyContainer>
    );
}

export default LockPage;
