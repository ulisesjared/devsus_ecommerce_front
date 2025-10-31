import { useNumericInput } from "./helpers/eventHandlers";
import { In } from "./index";
import type { FC, InputHTMLAttributes } from "react";

interface NumProps {
    allowDecimals?: boolean,
    allowNegative?: boolean,
    maxIntegerDigits?: number,
    maxFractionDigits?: number,
    decimalSeparator?: "." | ",";
}

const Num: FC<InputHTMLAttributes<HTMLInputElement> & NumProps> = ({
    name,
    allowDecimals = true,
    allowNegative = false,
    maxIntegerDigits = 9,
    maxFractionDigits = 2,
    decimalSeparator = ".",
    ...props
}) => {
    const intHandlers = useNumericInput({
        allowDecimal: allowDecimals,
        allowNegative: allowNegative,
        maxIntegerDigits: maxIntegerDigits,
        maxFractionDigits: maxFractionDigits,
        decimalSeparator: decimalSeparator
    });

    return (
        <In.Base
            type="number"
            name={name}
            {...intHandlers}
            {...props}
        />
    )
}

export default Num