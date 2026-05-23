

export enum IssueType {
    feature_request = 'feature_request',
    bug = 'bug'
}
export enum IssuStatus {
    open = 'open',
    in_progress = 'in_progress',
    resolved = 'resolved'
}
export interface Tissue {

    id: number,
    title: string,
    description: string,
    type: IssueType,
    status: IssuStatus,
    reporter_id : number
}