import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { JwtAuthGuard } from '../auth/jwt-auth-guards';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Project } from './project.model';
@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ summary: 'Create project' })
  @ApiResponse({ status: 200, type: Project })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @ApiOperation({ summary: 'Get projects by author' })
  @ApiResponse({ status: 200, type: [Project] })
  @Get('/author/:id')
  findAllByAuthor(@Param('id') id: number) {
    return this.projectService.findAllByAuthor(id);
  }

  @ApiOperation({ summary: 'Get project by id' })
  @ApiResponse({ status: 200, type: Project })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.projectService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update project' })
  @ApiResponse({ status: 200, type: Project })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }

  @Patch(':projectId/users')
  addUser(
    @Param('projectId') projectId: number,
    @Body() body: {  userIds: number[] },
  ) {
    return this.projectService.addUsers(projectId, body);
  }
  @Delete(':projectId/users')
  deleteUser(
    @Param('projectId') projectId: number,
    @Body() body: {  userIds: number[] },
  ) {
    return this.projectService.deleteUsers(projectId, body);
  }

  @Get('statuses/all')
  getProjectStatuses() {
    return this.projectService.getAllStatuses();
  }
}
