
// 获取localStorage
export const getCache = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

//存储localStorage
export const setCache = (name, content) => {
    if (!name) return;
    if (typeof content != 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

//删除localStorage
export const removeCache = (name) => {
    if (!name) return;
    window.localStorage.removeItem(name);
}