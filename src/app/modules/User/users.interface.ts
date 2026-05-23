
export enum IRole {
    contributor = 'contributor',
    maintainer = 'maintainer'
}

export interface Iusers {
    id: number,
    name: string,
    email: string,
    password: string,
    role: IRole
}