import FormField from "./template";

const Input = ({label, ...rest}) => {
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
