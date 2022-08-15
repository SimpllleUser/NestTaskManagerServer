import { Model } from 'sequelize-typescript';
interface TypeCreationAttrs {
    name: string;
    value: number;
}
export declare class TaskType extends Model<TaskType, TypeCreationAttrs> {
    id: number;
    name: string;
    value: number;
}
export {};
