// eslint-disable-next-line react-refresh/only-export-components
//封装和token相关的方法 存 取 删
const TOKEN = "token"
function setToken (params) {
    return localStorage.setItem(TOKEN,params)
}

function getToken () {
    return localStorage.getItem(TOKEN)
}

function removeToken () {
    return localStorage.removeItem(TOKEN)
}

export {
    removeToken,
    getToken, 
    setToken
}