export class CreateTaskDto {
  readonly title: string;
  readonly description: string;
  readonly userId: number;
  readonly projectId: number;
}
