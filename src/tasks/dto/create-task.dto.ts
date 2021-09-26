export class CreateTaskDto {
  title: string;
  description: string;
  authorId: number;
  typeId: number;
  priorityId: number;
  executorId: number;
}
