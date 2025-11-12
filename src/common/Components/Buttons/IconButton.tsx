import { buttonSize, getStyle } from './utils';
import { Icons } from '../../Constants/Icons';
import type { ButtonSizeKey } from './utils';
interface propTypes extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    size:ButtonSizeKey,
    label?:string,
    Icon?:any,
    className?:string
}

const IconButton = ({
    size = 'sm',
    label = '',
    Icon=Icons.PhotoPlus,
    className = '',
    ...props
}:propTypes) => {

    const s = getStyle(size) ?? buttonSize.sm;

    return (
        <button
            className={`flex items-center rounded-md ${s.base} ${className}`}
            {...props}
        >
            {/* Icon inherits its size from the map */}
            <Icon className={s.icon} />
            <span className={s.text}>{label}</span>
        </button>
    );
};

// IconButton.propTypes = {
//     size: PropTypes.oneOf(['sm', 'smPlus', 'md', 'mdPlus', 'lg', 'lgPlus']),
//     label: PropTypes.string,
//     Icon: PropTypes.any,
//     className: PropTypes.string,
// };

export default IconButton;