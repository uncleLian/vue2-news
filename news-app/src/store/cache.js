
// 获取localStorage
export const getStore = name => {
	if (!name) return;
	return window.sessionStorage.getItem(name);
}

 //存储localStorage
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.sessionStorage.setItem(name, content);
}