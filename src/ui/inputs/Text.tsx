import { In } from "./index";

type FormValues = { name: string };

const Text = ({ name, ...props }: FormValues) => {

    return (
        <In.Base
            type="text"
            name={name}
            {...props}
        />
    )
}

export default Text