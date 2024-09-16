import { useLocation, useNavigate } from 'react-router-dom';

import { BalancePanel, Button, Icon, Input, Select, Popup } from "../../components";
import MainBodyContainer from "../../components/containers/main-body-container";
import { lockTypes } from '../../helpers';
import api from '../../api';
import { useState } from 'react';

const LockPage = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const { state } = location || {}; // Optional chaining in case there's no state
    const { lockRequest } = state || {}; // Extracting data from state


    const [model] = useState({
        ...lockRequest,
        lockRequestId: lockRequest?.id
    });
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const closePopup = () => setIsPopupOpen(false);
    const openPopup = () => setIsPopupOpen(true);


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
            <button onClick={openPopup}>Open Popup</button>

            <Popup
                isOpen={isPopupOpen}
                onClose={closePopup}
                iconName="lock_rounded"
                text="Are you sure you want to create a lock?"
                buttons={[
                    { text: 'Detailed', onClick: () => alert('Detailed clicked!') },
                    { text: 'Cancel', onClick: closePopup }
                ]}
            />

            <div className="padding-top-16">
                <Icon
                    name="currency_exchange_rounded"
                    text="Currency exchange"
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
