
// TODO: Create a singleton for this class;
export default class KeyStore {
    constructor() {
        this.tokenName = 'oAuthToken';
        this.userId = 'oAuthTuserId';
        this.userName = 'oAuthTusername';
        this.scope = 'oAuthTscope';
    }

    save(record) {
        try {
            const {
                token, userId, userName, scope,
            } = record;
            localStorage.setItem(this.tokenName, token);
            localStorage.setItem(this.userId, userId);
            localStorage.setItem(this.userName, userName);
            localStorage.setItem(this.scope, scope);
            return true;
        } catch (e) {
            return false;
        }
    }

    clear() {
        localStorage.removeItem(this.tokenName);
        localStorage.removeItem(this.userId);
        localStorage.removeItem(this.userName);
        localStorage.removeItem(this.scope);
    }

    getToken() {
        return localStorage.getItem(this.tokenName);
    }

    getScope() {
        return localStorage.getItem(this.scope);
    }

    hasPermission(scope) {
        return this.getScope() === scope;
    }

    getUserId() {
        return parseInt(localStorage.getItem(this.userId), 10);
    }

    getUsername() {
        return localStorage.getItem(this.userName);
    }

    exists() {
        return !!this.getToken();
    }
}
