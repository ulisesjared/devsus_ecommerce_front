import { Icons } from "../../Constants/Icons";

const SelectedItem: React.FC<{
    value: string;
    onErrase: () => void | undefined,
    className?: string,
    style?: React.CSSProperties,

}> = ({
    value,
    onErrase,
    className = "",
    style

}) => {
        return (
            <div style={style} className={`bg-white rounded-md shadow-sm overflow-hidden ${className}`}>
                <div className={`flex relative items-center h-10`}>
                    <p className='font-semibold flex-1 pl-3'>
                        {value}
                    </p>
                    {onErrase && <button
                        onClick={onErrase}
                        className='btn-primary size-8 total-center absolute right-1'>
                        <Icons.Close size="20px" />
                    </button>}
                </div>
            </div>
        )
    }

export default SelectedItem