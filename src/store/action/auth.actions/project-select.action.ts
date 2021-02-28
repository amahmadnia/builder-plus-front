export const PROJECT_SELECT = '[auth reducer] Project Select';
export type ProjectSelectActionType = { type: typeof PROJECT_SELECT, payload: number }

export function projectSelectAction(project: number): ProjectSelectActionType {
    localStorage.setItem('project', project.toString())
    return {
        type: PROJECT_SELECT,
        payload: project,
    }
}