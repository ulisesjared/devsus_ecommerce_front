import { Icons } from "../../../Constants/Icons"

const SelectIcon: React.FC<{ cancel?: boolean, drop?: boolean }> = ({ cancel, drop }) => {
    if (cancel) {
        return <Icons.Close size="20px" className='pointer-events-none' />
    }
    if (drop) {
        return <Icons.Up size="15px" className='pointer-events-none' />
    }
    return <Icons.Down size="15px" className='pointer-events-none' />
}

export default SelectIcon