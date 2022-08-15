import { Model } from 'sequelize-typescript';
export declare class ProjectTask extends Model<ProjectTask> {
    id: number;
    taskId: number;
    projectId: number;
}
