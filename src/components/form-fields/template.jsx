import styled from "styled-components";

// const Container = styled.div`
//     bord
// `;

/**
 * General template/frame for all form field components.
 * eg input, dropdown, autocomplete, ...etc.
 */
const FormField = ({children, label}) => {
    return (
        <label className="form-field gap-8 padding-16">
            <div className="description1 text-gray">
                {label}
            </div>

            {children}
        </label>
    );
}

export default FormField;
