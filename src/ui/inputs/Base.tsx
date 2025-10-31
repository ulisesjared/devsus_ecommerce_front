import { getIn, useField } from 'formik'
import type { FC, InputHTMLAttributes } from 'react';

const Base: FC<InputHTMLAttributes<HTMLInputElement>> = ({ name, className, maxLength = 45, ...props }) => {

    const [field, meta] = useField(name);
    const value = getIn(meta.value, name ?? "")
    const error = getIn(meta.touched, name ?? "") && getIn(meta.error, name ?? "")

    return (<div>
        <input
            name={name}
            onChange={field.onChange}
            onBlur={field.onBlur}
            value={value}
            className={`${className}`}
            maxLength={maxLength}
            {...props}
        />
        {error && <span className="text-danger-light dark:text-danger-dark">{error}</span>}
    </div>
    )
}

export default Base