import { Model } from 'sequelize-typescript';
interface PriorityCreationAttrs {
    name: string;
    value: number;
}
export declare class TaskPriority extends Model<TaskPriority, PriorityCreationAttrs> {
    id: number;
    name: string;
    value: number;
}
export {};
