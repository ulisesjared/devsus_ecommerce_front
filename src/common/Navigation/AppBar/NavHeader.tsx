import type { FC } from "react"
import Button from "../../Components/Buttons/Button"
import { Icons } from "../../Constants/Icons"
import { useNavigate } from "react-router-dom"

export const NavHeader: FC<{ isOpen: boolean, toggleOpen: () => void }> = ({ isOpen, toggleOpen }) => {
    const navigate = useNavigate()
    return (
        <div className={`flex items-center justify-between relative px-2 w-full h-12 bg-white sm:hidden`}>
            <Button className="btn btn-primary size-10" onClick={toggleOpen} needsConfirmation={false}>
                {isOpen ? <Icons.BackResponsive size="22px" /> : <Icons.Menu size="22px" />}
            </Button>

            <Button className="btn btn-primary size-10" onClick={() => navigate('/profile')} needsConfirmation={false}>
                <Icons.User size="22px" />
            </Button>
        </div >
    )
}