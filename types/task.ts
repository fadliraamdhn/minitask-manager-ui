export type TaskStatus = "Inprogress" | "Complete";

export interface Task {
    id: number
    title: string
    description: string
    status: TaskStatus
}

export interface TaskCreate {
    title: string;
    description: string;
}