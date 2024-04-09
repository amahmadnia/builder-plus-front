export type UserTypeActionType = {
    id: number;
    feature: number;
    type: 'view' | 'edit' | 'delete' | 'add' | 'share';
    permission: 'self' | 'all_users' | 'main_users';
}