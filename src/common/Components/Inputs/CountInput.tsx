import React from 'react'
import { getIn, type FormikProps } from 'formik'
import type { ICart } from '../../../Screens/Cart/common/interfaces'
import { Icons } from '../../Constants/Icons'
import { onlyAllowNumbers } from '../../Constants/handlers'

interface ICountInput {
    id: string,
    formik?: FormikProps<ICart>
}

const MAX_COUNT = 99

const CountInput: React.FC<ICountInput> = ({ id, formik }) => {

    const currentValue = getIn(formik?.values, id) ?? 0

    const handleCountChange = (value: number) => {
        const newValue = Math.min(Math.max(Number(currentValue) + value, 0), MAX_COUNT)
        formik?.setFieldValue(id, newValue)
    }

    return (
        <div className='flex items-center'>
            <button disabled={currentValue === 0}
                className="btn-action size-8 btn-circle total-center"
                onClick={() => handleCountChange(-1)}
            >
                {currentValue === 1 ?
                    <Icons.Trash size="18px" /> :
                    <Icons.Minus size="18px" />
                }
            </button>
            <input
                name={id}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                className='font-semibold w-8 text-center outline-none'
                value={currentValue}
                onKeyDown={onlyAllowNumbers}
                onFocus={(e) => e.target.select()}
                type="number"
                onWheel={(e) => (e.target as HTMLInputElement).blur()}
            />
            <button
                className="btn-action size-8 btn-circle total-center"
                onClick={() => handleCountChange(1)}
            >
                <Icons.Plus size="18px" />
            </button>
        </div>
    )
}

export default CountInput