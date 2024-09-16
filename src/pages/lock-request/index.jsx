import { useNavigate } from 'react-router-dom';

import { Select, Button, Input } from "../../components";
import MainBodyContainer from "../../components/containers/main-body-container";
import { useState } from "react";
import { lockTypes } from "../../helpers";
import api from "../../api";

const LockRequestPage = () => {
    const navigate = useNavigate();

    // define object that holds form data
    const [model, setMoel] = useState({
        senderId: '',
        recepientId: '',
        recipientPspId: '',
        type: '',
        amount: '',
        endDate: '',
    });

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
     * Handles form submit. create new lock request.
     * 
     * @param {Event} e submit button click event
     */
    const OnSubmit = e => {
        api.createLockRequest(model).then(res => {
            alert('Save succeeded');
            navigate('/');
        })
        .catch(err => console.error(err));
    }

    return (
        <MainBodyContainer>
            <form className="gap-4 flex-column padding-top-16">
                <Input
                    label="Sender ID"
                    value={model.senderId}
                    onChange={e => onInputValueChange(e, 'senderId')}
                />

                <Input
                    label="Recepient ID"
                    value={model.recepientId}
                    onChange={e => onInputValueChange(e, 'recepientId')}
                />

                <Input
                    label="Recepient Psp ID"
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

                <Button
                    text="Create lock request"
                    onClick={OnSubmit}
                />
            </form>
        </MainBodyContainer>
    );
}

export default LockRequestPage;
