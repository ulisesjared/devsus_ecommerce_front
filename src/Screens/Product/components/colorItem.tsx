import { useState } from "react";
import TrashButton from "../../../common/Components/Buttons/TrashButton";
import GenericModal from "../../../common/Components/Modals/GenericModal";

const ColorItem: React.FC<{
    value: string;
    onClick?: () => void | undefined,
    needsConfirmation?: boolean,
    onErrase?: () => void | undefined,
    focused?: boolean,
    className?: string,
    style?: React.CSSProperties,
    color?:string,

}> = ({
    value,
    onClick = () => { },
    needsConfirmation = false,
    onErrase,
    focused = false,
    className = "",
    style,
    color

}) => {

        const [showConfirmation, setShowConfirmation] = useState(false);

        return (
            <div >
                <GenericModal
                    visible={showConfirmation}
                    title="¿Deseas descartar la información?"
                    content={<div className="p-2 total-center">Se perderá la informacón permanente</div>}
                    close={() => setShowConfirmation(false)}
                    actions={[
                        { label: "Cancelar", onClick: () => setShowConfirmation(false) },
                        { label: "Descartar", onClick: () => { setShowConfirmation(false); onClick && onClick() }, style: 'danger' }
                    ]}
                />
                <div className="relative flex items-center w-full">
                    <button
                        onClick={() => needsConfirmation ? setShowConfirmation(true) : onClick && onClick()}
                        style={style}
                        className={`${focused ? "bg-white shadow-sm" : "hover:bg-slate-100"} h-10 w-full px-3 rounded-md  overflow-hidden ${className}`}
                    >
                        <div className='flex items-center space-x-2'>
                            <span className="font-semibold text-start">{value}</span>
                            <div className="w-5 h-5 rounded-full border" style={{ background: color }}></div>
                        </div>
                    </button>
                    <div className="absolute right-2 flex gap-2">
                        {onErrase && focused && (
                            <TrashButton
                                confirmationNeeded={true}
                                tooltip="Eliminar Color"
                                onPress={onErrase}
                                className='size-6'
                                confirmationTitle='Eliminar información'
                                confirmationButtonLabel="Eliminar"
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }

export default ColorItem