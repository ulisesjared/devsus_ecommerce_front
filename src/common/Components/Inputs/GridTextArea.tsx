
export const GridTextArea: React.FC<{
    id: string
    label: string
    handleChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    handleBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
    value: string | undefined,
    error?: string | false | undefined,
    type?: string
    className?: string,
    rows?: number
}> = ({
    id,
    label,
    handleChange,
    handleBlur,
    value,
    error,
    rows = 4,
    ...props
}) => {
  return (
    <>
        <label id={`label_${id}`} htmlFor={id} className={`text-sm text-gray-800 text-end`}>
            {label}
        </label>
        <div className='flex flex-row items-center w-full gap-2'>
            <textarea
               className={`fancy-scroll base-textarea max-w-64 ${error ? 'input-invalid' : 'input-valid'}`}
               id={id}
               name={id}
               onChange={handleChange}
               onBlur={handleBlur}
               value={value}
               onWheel={(e) => (e.target as HTMLTextAreaElement).blur()}
               rows={rows}
               {...props}
            />
         </div>
         {error && <p className='text-xs font-medium text-red-500 '>{error.toString()}</p>}
    </>
  )
}
