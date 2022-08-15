import { Model } from 'sequelize-typescript';
interface TypeCreationAttrs {
    name: string;
    value: number;
}
export declare class ProjectStatus extends Model<ProjectStatus, TypeCreationAttrs> {
    id: number;
    name: string;
    value: number;
}
export {};
