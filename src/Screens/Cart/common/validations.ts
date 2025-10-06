import * as Yup from 'yup';
import type { ICartProduct } from './interfaces';

export const cartValidationSchema = Yup.object().shape({
    presentations: Yup.object().test(
        'quantity',
        'Al menos un producto debe tener una cantidad',
        (presentations: { [key: string]: ICartProduct }) =>
            Object.entries(presentations ?? {})?.some(
                (entry) => !!entry[1].quantity
            )
    )
})