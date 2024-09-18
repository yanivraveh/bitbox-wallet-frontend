import FormField from "./template";

const Input = ({label, disabled, ...rest}) => {
    return (
        <FormField
        label={label}>
            <input
                disabled={disabled}
                className="text-secondary"
                {...rest}
            />
        </FormField>
    )
}

export default Input;
