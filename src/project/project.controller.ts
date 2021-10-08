import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get('/author/:id')
  findAllByAuthor(@Param('id') id: number) {
    return this.projectService.findAllByAuthor(id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.projectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }

  @Patch(':projectId/user/:userId')
  addUser(
    @Param('projectId') projectId: number,
    @Param('userId') userId: number,
  ) {
    return this.projectService.addUser(projectId, userId);
  }
  @Delete(':projectId/user/:userId')
  deleteUser(
    @Param('projectId') projectId: number,
    @Param('userId') userId: number,
  ) {
    return this.projectService.deleteUser(projectId, userId);
  }
}
