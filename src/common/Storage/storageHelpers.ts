export const getJson = (key: string) => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
}

export const setJson = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const removeJson = (key: string) => {
    localStorage.removeItem(key)
}
    