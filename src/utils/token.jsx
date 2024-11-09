// eslint-disable-next-line react-refresh/only-export-components
const TOKEN = "token"
function setToken (params) {
    return localStorage.setItem(TOKEN,params)
}

function getToken () {
    return localStorage.getItem(TOKEN)
}

function removeToken (params) {
    return localStorage.removeItem(TOKEN,params)
}

export {
    removeToken,
    getToken, 
    setToken
}