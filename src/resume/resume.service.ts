import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Resume, ResumeDocument } from './resume.model';
import { Model } from 'mongoose';
import { CreateResumeDto } from './dto/create-resume.dto';

@Injectable()
export class ResumeService {
  constructor(
    @InjectModel(Resume.name) private resumeModel: Model<ResumeDocument>,
  ) {}

  async create(createDto: CreateResumeDto): Promise<Resume> {
    const resume = new this.resumeModel(createDto);
    return await resume.save();
  }
}
