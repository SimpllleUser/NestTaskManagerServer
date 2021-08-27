import { Experience, Skill } from '../resume.model';

export class CreateResumeDto {
  readonly fullName: string;
  readonly position: string;
  readonly skills: Skill[];
  readonly languages: Skill[];
  readonly experience: Experience[];
  readonly studies: Experience[];
  readonly additionalInformation: string;
}
