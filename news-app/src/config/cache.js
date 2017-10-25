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

export const get_local_cache = name => {
    if (!name) return
    return window.localStorage.getItem(name)
}

export const set_local_cache = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
}

export const remove_local_cache = (name) => {
    if (!name) return
    window.localStorage.removeItem(name)
}
