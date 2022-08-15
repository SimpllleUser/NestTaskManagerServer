import { Model } from 'sequelize-typescript';
export declare class ProjectTeam extends Model<ProjectTeam> {
    id: number;
    userId: number;
    projectId: number;
}
