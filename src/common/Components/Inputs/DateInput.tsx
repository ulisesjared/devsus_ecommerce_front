import React, { useRef } from 'react'
import DatePicker, { type ReactDatePickerCustomHeaderProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Icons } from '../../Constants/Icons';
import type { DateInputProps } from './interfaces/DateInputInterface';
import { es } from "date-fns/locale";
import { getIn } from 'formik';

const range = (start: number, end: number, step: number) => {
   const length = Math.floor((end - start) / step) + 1;
   return Array.from({ length }, (_, i) => start + i * step);
};
const years = range(1900, (new Date().getFullYear()) + 1, 1);
const months = [
   "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
   "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const DateInput: React.FC<DateInputProps> = ({ id, label, formik, theme = 'light', ...props }) => {

   const ref = useRef(null)

   const { values, setFieldValue, errors, touched, handleBlur } = formik
   const value = getIn(values, id)
   const error = getIn(touched, id) && getIn(errors, id)

   const handleChange = (date: Date | null) => {
      if (!date) return;
      setFieldValue(id, date)
   }

   return (
      <div className='z-20 flex flex-col max-w-64'>
         <label id={`label_${id}`} htmlFor={id} className={`text-sm pb-0.5 ${theme === 'dark' ? "text-gray-200" : "text-gray-800"}`}>{label}</label>
         <DatePicker
            ref={ref}
            className={`base-input max-w-64 ${error ? 'input-invalid' : 'input-valid'}`}
            id={id}
            name={id}
            dateFormat={"MMMM d, yyyy"}
            locale={es}
            onChange={handleChange}
            onBlur={handleBlur}
            selected={value}
            autoComplete='off'
            renderCustomHeader={(props) => <CustomHeader{...props} />}
            {...props}
         />
         {error && <p className='text-xs font-medium text-red-500 '>{error.toString()}</p>}
      </div>
   )
}

const CustomHeader: React.FC<ReactDatePickerCustomHeaderProps> = ({
   date,
   changeYear,
   changeMonth,
   decreaseMonth,
   increaseMonth,
   prevMonthButtonDisabled,
   nextMonthButtonDisabled,
}) => (
   <div className='flex items-center justify-center gap-1'
   >
      <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
         <Icons.Left />
      </button>
      <select value={new Date(date).getFullYear()}
         onChange={({ target: { value } }) => changeYear(parseInt(value))}
      >
         {years.map((option) => (
            <option key={option} value={option}>
               {option}
            </option>
         ))}
      </select>

      <select value={months[new Date(date).getMonth()]}
         onChange={({ target: { value } }) =>
            changeMonth(months.indexOf(value))
         }
      >
         {months.map((option) => (
            <option key={option} value={option}>
               {option}
            </option>
         ))}
      </select>

      <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
         <Icons.Right />
      </button>
   </div>
)

export default DateInput