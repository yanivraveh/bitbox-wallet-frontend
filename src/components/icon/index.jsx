/**
 * Available icons. should match one of the images inside src/assets/icons
 */
const names = ['plus_rounded', 'divider', 'lock_rounded', 'minus_rounded', 'transfer_rounded'];

/**
 * Renders an icon component
 * 
 * @param {string} name name of the icon 
 * @returns {Component}
 */
const Icon = ({name, ...rest}) => {
    // check that name property is present
    if (!name) {
        throw new Error("Icon name is required");
    }

    if (!names.includes(name)) {
        throw new Error(`Icon name is not among available names: [${names.join(', ')}]`);
    }

    return (
        <img
            src={`src/assets/icons/${name}.svg`}
            width={40}
            height={40}
            alt="?"
            {...rest}
        />
    );
}

export default Icon;
