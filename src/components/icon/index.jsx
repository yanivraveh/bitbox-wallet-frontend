import styled from "styled-components";

/**
 * Available icons. should match one of the images inside src/assets/icons
 */
const names = ['logo', 'plus_rounded', 'divider', 'lock_rounded', 'minus_rounded', 'lock',
    'transfer_rounded', 'currency_exchange_rounded', 'success_rounded', 'plane_rounded'];

/**
 * Vertical layout for icon item
 */
const IconContainer = styled.a`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
`;

/**
 * Renders an icon component
 * 
 * @param {string} name name of the icon 
 * @returns {Component}
 */
const Icon = ({name, text, size, width, height, textClassName, ...rest}) => {
    // check that name property is present
    if (!name) {
        throw new Error("Icon name is required");
    }

    if (!names.includes(name)) {
        throw new Error(`Icon name is not among available names: [${names.join(', ')}]`);
    }

    const iconSize = size || 40;

    return (
        <IconContainer className="gap-8" {...rest}>
            <img
                src={`src/assets/icons/${name}.svg`}
                width={width || iconSize}
                height={height || iconSize}
                {...rest}
            />

            {
                text && <div className={`body2 ${textClassName || ''}`.trim()}>{text}</div>
            }
        </IconContainer>
    );
}

export default Icon;
