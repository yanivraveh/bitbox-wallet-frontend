import { BalancePanel, Button, Icon, Input } from "../../components";
import MainBodyContainer from "../../components/containers/main-body-container";
import { useState } from "react";

const LockPage = () => {
    // define object that holds form data
    const [model, setMoel] = useState({});

    /**
     * Handles form inputs value change event.
     * 
     * @param {Event} e input value change event object
     * @param {string} key name of the input wich  value has changed
     */
    const onInputValueChange = (e, key) => {        
        setMoel({
            ...model,
            [key]: e.target.value,
        });
    }

    return (
        <MainBodyContainer>
            <BalancePanel />

            <div className="padding-top-16">
                <Icon
                    name="currency_exchange_rounded"
                    text="Currency exchange"
                    textClassName="text-secondary"
                    size={56}
                />

                <div className="gap-4 flex-column padding-top-16">
                    <Input
                        label="Counterparty"
                        value={model.counterParty}
                        onChange={e => onInputValueChange(e, 'counterParty')}
                    />

                    <Input
                        label="Counterparty wallet ID"
                        value={model.counterPartyWalletId}
                        onChange={e => onInputValueChange(e, 'counterPartyWalletId')}
                    />

                    <Input
                        label="Description"
                        value={model.description}
                        onChange={e => onInputValueChange(e, 'description')}
                    />

                    <Input
                        label="Amount"
                        value={model.amount}
                        type="number"
                        onChange={e => onInputValueChange(e, 'amount')}
                    />

                    <Input
                        label="Time for lock"
                        value={model.time}
                        type="number"
                        onChange={e => onInputValueChange(e, 'time')}
                    />

                    <Button
                        text="Create lock"
                    />
                </div>
            </div>
        </MainBodyContainer>
    );
}

export default LockPage;
