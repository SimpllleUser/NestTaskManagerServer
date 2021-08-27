import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ResumeDocument = Resume & Document;

@Schema()
export class Resume {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
