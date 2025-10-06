
const allowedKeys = [
    'Backspace',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
    'Tab',
    'Home',
    'End',
];

export const onlyAllowNumbers = (e: React.KeyboardEvent<HTMLInputElement>) => {

    if (
        allowedKeys.includes(e.key) ||
        (e.ctrlKey && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase()))
    ) {
        return; // allow editing/navigation keys and copy-paste stuff
    }

    if (!/^\d$/.test(e.key)) {
        e.preventDefault();
    }


};

export const onlyAllowDecimals = (e: React.KeyboardEvent<HTMLInputElement>) => {

    if (
        allowedKeys.includes(e.key) ||
        (e.ctrlKey && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase()))
    ) {
        return; // allow editing/navigation keys and copy-paste stuff
    }

    if (!/^\d$/.test(e.key) && e.key !== '.') {
        e.preventDefault();
    }

    if (e.key === '.' && (e.target as HTMLInputElement).value.includes('.')) {
        e.preventDefault();
    }
}