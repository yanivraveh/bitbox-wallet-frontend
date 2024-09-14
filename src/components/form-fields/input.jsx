import FormField from "./template";

const Input = ({label, value, ...rest}) => {
    return (
        <FormField
        label={label}>
            <input
                className="text-secondary"
                {...rest}
            />
        </FormField>
    )
}

export default Input;
