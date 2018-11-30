export const TOKEN_KEY = "acess_token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null || sessionStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => {
    if(localStorage.getItem(TOKEN_KEY) === null){
        sessionStorage.getItem(TOKEN_KEY)
    }else{
        localStorage.getItem(TOKEN_KEY)
    }
}
export const loginLocal = token => {
    localStorage.setItem(TOKEN_KEY, token);
};
export const loginSession = token => {
    sessionStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
};