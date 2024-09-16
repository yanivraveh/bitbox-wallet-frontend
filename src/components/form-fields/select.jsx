import FormField from "./template";

const Select = ({label, options, ...rest}) => {
    return (
        <FormField
        label={label}>
            <select
            className="text-secondary"
            {...rest}>
                <option value="" key={0}>--Select--</option>

                {
                    options?.map((item, index) => <option value={item.id} key={index + 1}>{item.name}</option>)
                }
            </select>
        </FormField>
    )
}

export default Select;
