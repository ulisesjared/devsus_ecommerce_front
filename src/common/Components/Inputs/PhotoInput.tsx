import React, { type FC, useEffect, useState } from 'react'
import { Icons } from '../../Constants/Icons'

const PhotoInput: FC<{
    id: string
    value: string | File | undefined
    error: string | false | undefined
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void

}> = ({ id, value, onChange, error }) => {

    const [urlOrFile, setUrlOrFile] = useState<any>(null);

    useEffect(() => {
        const photoFile = value;

        if (photoFile) {
            if (typeof photoFile === 'string') {
                setUrlOrFile(photoFile);
            } else if (photoFile instanceof File) {
                setUrlOrFile(URL.createObjectURL(photoFile));
            }
        }
        else {
            setUrlOrFile(null);
        }

        return () => {
            if (urlOrFile && typeof urlOrFile === 'object') {
                URL.revokeObjectURL(urlOrFile);
            }
        };
    }, [value]);

    return (
        <div className='size-40 relative'>

            {urlOrFile ? <img className='size-full object-cover rounded-full' alt=""
                src={urlOrFile}
            /> : <div className={`bg-slate-50 shadow-inner size-full rounded-full total-center ${error ? 'border-2 border-red-500' : 'border-2 border-slate-200'}`}>
                <Icons.PhotoOff size="40px" className={`${error ? "text-red-500" : "text-slate-400 "}`} />
            </div>}

            <input
                type="file"
                id={id}
                name={id}
                accept="image/*"
                onChange={onChange}
                className='hidden'
            />

            <label className='absolute bottom-0 right-0 ' htmlFor={id}>
                <div className='size-8 rounded-full bg-white border-blue-500 border total-center text-blue-500 hover:bg-blue-500 hover:text-white duration-150 transition-colors cursor-pointer active:opacity-75'>
                    <Icons.Upload />
                </div>
            </label>

        </div>
    )
}

export default PhotoInput