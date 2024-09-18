
import { useState, useRef } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { BalancePanel, Button, Icon, Input, Select, Popup } from "../../components";
import MainBodyContainer from "../../components/containers/main-body-container";
import { ages, genders, pspIds, LOCK_TYPE, lockTypes } from '../../helpers';
import api from '../../api';
import moment from 'moment';

const LockPage = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const { state } = location || {}; // Optional chaining in case there's no state
    const { lockRequest } = state || {}; // Extracting data from state

    const [model, setMoel] = useState({
        ...lockRequest,
        lockRequestId: lockRequest?.id || '',
        type: LOCK_TYPE.ticket,
        walletId: '',
        amount: '',
        endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
        name: 'Yaniv Raveh',
        gender: 'M',
        recipientId: '',
        recipientPspId: pspIds[0].id,
        status: 'OPEN',
        lockType:'THREE_PARTY',
    });

    const iconName = model.type == LOCK_TYPE.money ? 'currency_exchange_rounded' : 'plane_rounded';
    const lockName = lockTypes.find(item => item.id == model.type)?.name || '';

    /**
     * Popup component inner object reference
     */
    const popupRef = useRef(null);

    /**
     * Handles form inputs value change event.
     * 
     * @param {Event} e input value change event object
     * @param {string} key name of the input wich  value has changed
     */
    const onInputValueChange = (e, key) => {   
        let value = e.target.value;

        // convert value to number
        if (['type', 'amount'].includes(key)) {
            value = Number(value)
        }        
         
        setMoel({
            ...model,
            [key]: value,
        });
    }

    /**
     * Handles form submit. create new lock.
     * 
     * @param {Event} e submit button click event
     */
    const OnSubmit = async (e) => {
        const res = await popupRef.current.save();
        if (!res) {
            return;
        }

        const data = {...model};
        api.createLock(data).then(res => {
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
                        label="Wallet ID"
                        value={model.walletId}
                        onChange={e => onInputValueChange(e, 'walletId')}
                    />

                    <Input
                        label="Recepient ID"
                        value={model.recipientId}
                        onChange={e => onInputValueChange(e, 'recipientId')}
                    />

                    <Select
                        label="Recepient Psp ID"
                        options={pspIds}
                        value={model.recipientPspId}
                        onChange={e => onInputValueChange(e, 'recipientPspId')}
                    />

                    <Select
                        label="Lock type"
                        options={lockTypes}
                        value={model.type}
                        onChange={e => onInputValueChange(e, 'type')}
                    />

                    <Input
                        label="Amount"
                        value={model.amount}
                        type="number"
                        onChange={e => onInputValueChange(e, 'amount')}
                    />

                    <Input
                        label="End date"
                        value={model.endDate}
                        type="date"
                        onChange={e => onInputValueChange(e, 'endDate')}
                    />

                    <Input
                        label="Name"
                        value={model.name}
                        onChange={e => onInputValueChange(e, 'name')}
                    />

                    <Select
                        label="Gender"
                        options={genders}
                        value={model.gender}
                        onChange={e => onInputValueChange(e, 'gender')}
                    />

                    <Select
                        label="Age"
                        options={ages}
                        value={model.age}
                        onChange={e => onInputValueChange(e, 'age')}
                    />

                    <Button
                        text="Create lock"
                        onClick={OnSubmit}
                    />
                </form>
            </div>

            <Popup
                ref={popupRef}
            />
        </MainBodyContainer>
    );
}

export default LockPage;
