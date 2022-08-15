import { Model } from 'sequelize-typescript';
interface TypeCreationAttrs {
    name: string;
    value: number;
}
export declare class TaskStatus extends Model<TaskStatus, TypeCreationAttrs> {
    id: number;
    name: string;
    value: number;
}
export {};
