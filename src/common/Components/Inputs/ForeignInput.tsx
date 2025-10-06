import React, { useRef, useState } from 'react'
import Loader from '../Loader/Loader'
import type { MaterialCategory } from '../../Interfaces/MaterialCategory'
import { Icons } from '../../Constants/Icons'

function formatOptsList(responseList: MaterialCategory[]) {
    return responseList?.map(o => ({
        label: o.name,
        value: o.id
    })) || []
}

interface ForeingInputProps {
    label: string
    id: string
    formik: any
    showErrors?: boolean
    useQueryProvider: any
}

const ForeignInput: React.FC<ForeingInputProps> = ({
    label,
    id,
    formik,
    showErrors = true,
    useQueryProvider,
    ...props
}) => {


    const [objName, setObjName] = useState('')
    const { data, status, CreateMutator, DeleteMutator } = useQueryProvider()

    const options = formatOptsList(
        data?.filter((o: MaterialCategory) =>
            o.name.toLowerCase().includes(objName.toLowerCase()))
    ) || []

    const handleCreate = async (data: string) => {
        await CreateMutator.mutateAsync({ name: data }).then((newObj: MaterialCategory) => {
            formik.setFieldValue(id, newObj.id)
        })
    }

    const handleDelete = async (id: string) => {
        await DeleteMutator.mutateAsync(id).then(() => {
            if (id === formik?.values[id]) {
                formik.setFieldValue(id, null)
                setObjName('')
            }
        })
    }

    const [showOpts, setShowOpts] = useState(false)
    const inptRef = useRef<HTMLInputElement>(null)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value
        setObjName(val)
    }

    const handleOptClick = (opt: string) => {
        formik?.setFieldValue(id, opt)
    }

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowOpts(false)
        setObjName('')
        formik?.handleBlur(e)
    }

    const errors = formik?.errors[id] && formik?.touched[id] ? formik?.errors[id] : null
    const value = options.find(opt => opt.value === formik?.values[id])?.label

    const loading = CreateMutator.isPending || DeleteMutator.isPending

    return (
        <>
            <label htmlFor={id} className='text-sm pb-0.5 text-gray-800 text-end'>{label}</label>
            <div className='relative flex'>
                <div className='relative flex items-center justify-center max-w-64'>
                    <input ref={inptRef}
                        id={id}
                        name={id}
                        onChange={handleChange}
                        readOnly={(value) ? true : false}
                        value={value || objName}
                        onBlur={handleBlur}
                        onFocus={() => setShowOpts(true)}
                        autoComplete='off'
                        className={`base-input w-full ${(errors && !loading) ? 'input-invalid' : 'input-valid'}`}
                        disabled={loading}
                        {...props}
                    />
                    {/* Inpt Arrow / Clear */}
                    <div className='absolute flex right-2'>
                        {(value) ?
                            <button type="button"
                                onClick={() => formik?.setFieldValue(id, null)}
                                className='btn-primary size-8 total-center'>
                                <Icons.Close size="23px" />
                            </button>
                            :
                            <button
                                type="button"
                                onClick={() => inptRef?.current?.focus()}
                                className='btn-primary size-8 total-center'>
                                {showOpts ? <Icons.Up size="15px" /> : <Icons.Down size="15px" />}
                            </button>
                        }
                    </div>
                    {loading && <Loader className='absolute' />}
                </div>
                {/* List of Options */}
                {showOpts && <div className="options-scroll fancy-scroll">
                    {status === 'pending' ? <Loader className='mt-3 mb-2' /> : <div className='flex flex-col w-full h-full'>
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className={`flex items-center justify-between duration-200 cursor-pointer ${option.value === formik?.values[id] ? "hidden" : ""}`}>
                                {/* Option */}
                                <button
                                    className='flex-1 px-4 py-2 text-start hover:bg-gray-100'
                                    onMouseDown={() => handleOptClick(option.value)}>
                                    {option.label}
                                </button>
                                {/* Trash */}
                                <button
                                    className={`btn-primary size-8 total-center `}
                                    onMouseDown={() => handleDelete(option.value)}>
                                    <Icons.Trash size="15px" />
                                </button>
                            </div>
                        ))}
                        {/* New options */}
                        {objName && options.every(o => o.label !== objName) && <div className='sticky bottom-0 w-full p-2 bg-white shadow-md rounded-b-md'>
                            <button className='px-4 py-1 bg-gray-200 rounded-md'
                                onMouseDown={() => handleCreate(objName)}>
                                {`Crear: ${objName}`}
                            </button>
                        </div>
                        }
                    </div>}
                </div>
                }
                {/* Errors */}
                {(errors && !loading) && <p className='text-xs font-medium text-red-500 total-center px-2'>{errors.toString()}</p>}
            </div >
        </>
    )
}

export default ForeignInput