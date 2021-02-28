import {PermissionType} from "./permission.type";

export type PermissionsType = {
    user: PermissionType;
    project: PermissionType;
    task: PermissionType;
}