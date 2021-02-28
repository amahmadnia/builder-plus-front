export const LOGOUT = '[auth reducer] Logout Action';
export type LogoutTypeAction = { type: typeof LOGOUT }

export function logoutAction(): LogoutTypeAction {
    localStorage.removeItem('auth_data');
    localStorage.removeItem('project');
    return {
        type: LOGOUT
    }
}