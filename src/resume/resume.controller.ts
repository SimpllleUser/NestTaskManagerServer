import { Body, Controller, Post } from '@nestjs/common';
import { CreateRoleDto } from '../roles/dto/create-role.dto';
import { CreateResumeDto } from './dto/create-resume.dto';
import { ResumeService } from './resume.service';

@Controller('resume')
export class ResumeController {
  constructor(private resumeService: ResumeService) {}

  @Post()
  create(@Body() dto: CreateResumeDto) {
    return this.resumeService.create(dto);
  }
}
