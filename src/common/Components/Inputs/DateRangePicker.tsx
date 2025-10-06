import { type FC } from 'react'
import DateInput from './DateInput'
import type { FormikProps } from 'formik'

interface DateRangePickerProps {
    formik: FormikProps<any>,
    startId: string,
    endId: string
}

const DateRangePicker: FC<DateRangePickerProps> = ({ formik, startId, endId }) => {
    return (
        <div className='flex gap-2'>
            <DateInput id={startId} label="Fecha Inicial" formik={formik} />
            <DateInput id={endId} label="Fecha Final" formik={formik} />
        </div>
    )
}

export default DateRangePicker