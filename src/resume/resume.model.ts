import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ResumeDocument = Resume & Document;

export type Skill = {
  name: string;
  level: number;
};

export type Experience = {
  name: string;
  dateForm: Date;
  dateTo: Date;
  description: string;
};

@Schema()
export class Resume {
  @Prop()
  fullName: string;

  @Prop()
  position: string;

  @Prop()
  skills: Skill[];

  @Prop()
  languages: Skill[];

  @Prop()
  experience: Experience[];

  @Prop()
  studies: Experience[];

  @Prop()
  additionalInformation: string;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
