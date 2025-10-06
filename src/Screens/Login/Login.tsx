import { useFormik } from "formik";
import { useEffect, useState, useRef } from "react";
import Input from "../../common/Components/Inputs/Input";
import type { LoginData } from "../../common/Interfaces/LoginInterface";
import ReCAPTCHA from "react-google-recaptcha";
import LoadingPage from "../../common/Components/Pages/LoadingPage";
import useSession from "../../common/hooks/SessionProvider";
import { INIT_VALUES, loginValidationSchema } from "./common/constants";

const SITE_KEY = import.meta.env.VITE_SITE_KEY_RECAPTCHA;

export const Login = () => {

    const captchaRef = useRef<ReCAPTCHA>(null)

    const { login, loginStatus } = useSession();

    const [captchaToken, setCaptchaToken] = useState<string | null | undefined>(undefined);

    const formik = useFormik({
        initialValues: INIT_VALUES,
        validationSchema: loginValidationSchema,
        onSubmit: async (values: LoginData) => {
            login({ ...values, recaptcha_token: captchaToken })
            setCaptchaToken(undefined)
            if (captchaRef.current) captchaRef.current.reset();
        },
    });

    const { handleSubmit } = formik

    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                event.preventDefault()
                handleSubmit()
            }
        }
        window.addEventListener('keydown', handleKeydown)
        return () => {
            window.removeEventListener('keydown', handleKeydown)
        }
    }, [handleSubmit])

    const loading = [loginStatus].includes('pending')

    if (loading) return <LoadingPage message="Validando información" />

    return (
        <div className="size-full appear">
            <div className="w-full h-screen p-5 rounded-l-2xl total-center">
                <div className="w-[28rem]  bg-white rounded-lg p-8 gap-5 shadow-lg">
                    <h2 className="text-xl font-bold text-center">Inicia Sesión</h2>
                    <form onSubmit={handleSubmit} className="size-full total-center flex-col gap-6">
                        <Input
                            label="Usuario"
                            id="email"
                            formik={formik}
                            type="text"
                        />
                        <Input
                            label="Contraseña"
                            id="password"
                            formik={formik}
                            type="password"
                        />
                        <div className='flex justify-center'>
                            <ReCAPTCHA
                                ref={captchaRef}
                                sitekey={SITE_KEY}
                                onChange={(token) => setCaptchaToken(token)}
                                theme='light'
                                size='normal'

                            />
                        </div>
                        <button type="submit" className="btn-action w-full h-10 mt-3">INGRESAR</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
