import React, { useState } from 'react'
import GenericModal from './GenericModal'
import SelectTable from '../Tables/SelectTable'

interface IModalSelect {
    children?: React.ReactNode,
    title?: string,
    placeholder?: string,
    options?: any[],
    columns: any[],
    onSelect: (option: any) => void
}

const ModalSelect: React.FC<IModalSelect> = ({
    children,
    title = "Seleccionar",
    placeholder = "Seleccionar",
    options,
    columns,
    onSelect
}) => {

    const [selected, setSelected] = useState<string[]>([])
    const [visible, setVisible] = useState(false)
    const close = () => {
        setVisible(false)
        setSelected([])
    }

    return (
        <>
            <GenericModal
                fullScreen
                title={title}
                visible={visible}
                close={close}
                content={<div className='flex-1 py-2'>
                    <SelectTable
                        multiple={false}
                        theme='light'
                        data={options}
                        selectedItems={selected}
                        setSelectedItems={setSelected}
                        columns={columns}
                    />
                </div>
                }
                actions={[
                    {
                        label: 'Seleccionar',
                        onClick: () => {
                            close()
                            onSelect(selected[0])
                        },
                        disabled: selected.length === 0,
                        style: 'action'
                    }
                ]}
            />
            {!children && <div>
                <button className='btn btn-action-border w-full h-10' onClick={() => setVisible(true)}>
                    {placeholder}
                </button>
            </div>}
            {children}
        </>
    )
}

export default ModalSelect