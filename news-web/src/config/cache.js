export const getCache = name => {
    if (!name) return
    return window.sessionStorage.getItem(name)
}
export const setCache = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    window.sessionStorage.setItem(name, content)
}
export const removeCache = (name) => {
    if (!name) return
    window.sessionStorage.removeItem(name)
}
