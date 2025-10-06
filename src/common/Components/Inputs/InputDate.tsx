import type { FC } from "react"

export const InputDate: FC<{
    value?: string,
    name: string,
    label: string,
    type?: React.HTMLInputTypeAttribute,
    onChange: (e: React.ChangeEvent<any>) => void,
    onBlur: (e: React.ChangeEvent<any>) => void
}> = ({ value, name, label, type = 'time', onChange, onBlur }) => {
    return (
        <div className="w-full">
            <h1 className="text-gray-800 text-sm">{label}</h1>
            <input
                type={type}
                className="base-input w-full"
                value={value}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
            />
        </div>
    )
}
