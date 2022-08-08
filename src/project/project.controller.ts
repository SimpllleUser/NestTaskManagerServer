import { CreateProjectCommentDto } from './project-comment/dto/create-project-comment.dto';
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
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { JwtAuthGuard } from '../auth/jwt-auth-guards';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Project } from './project.model';
import { User } from 'src/user/users.model';
import { ProjectComment } from './project-comment/project-comment.model';
import { ProjectStatus } from './project-status/project-status.model';
@ApiTags('Project')
@UseGuards(JwtAuthGuard)
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
  
  @ApiOperation({ summary: 'Get projects by author' })
  @ApiResponse({ status: 200, type: [Project] })
  @Get('/all/by-user/:id')
  findAllByAvailable(@Param('id') id: number) {
    return this.projectService.findAllAvailableForUser(id);
  }

  @ApiOperation({ summary: 'Get project by id' })
  @ApiResponse({ status: 200, type: Project })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.projectService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update project' })
  @ApiResponse({ status: 200, type: Project })
  // @UsePipes(ValidationPipe)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }

  @ApiOperation({ summary: 'Added users list' })
  @ApiResponse({ status: 200, type: [User] })
  @Patch(':projectId/users')
  addUsers(
    @Param('projectId') projectId: number,
    @Body() body: { userIds: number[] },
  ) {
    return this.projectService.addUsers(projectId, body);
  }

  @ApiOperation({ summary: 'Deleted users list' })
  @ApiResponse({ status: 200, type: [User] })
  @Delete(':projectId/users')
  deleteUsers(
    @Param('projectId') projectId: number,
    @Body() body: { userIds: number[] },
  ) {
    return this.projectService.deleteUsers(projectId, body);
  }

  @ApiOperation({ summary: 'Added user to ptoject' })
  @ApiResponse({ status: 200, type: User })
  @Patch(':projectId/user/:userId')
  addUser(
    @Param('projectId') projectId: number,
    @Param('userId') userId: number,
  ) {
    return this.projectService.addUser(projectId, userId);
  }

  @ApiOperation({ summary: 'Deleted user to ptoject' })
  @ApiResponse({ status: 200, type: User })
  @Delete(':projectId/user/:userId')
  deleteUser(
    @Param('projectId') projectId: number,
    @Param('userId') userId: number,
  ) {
    return this.projectService.deleteUser(projectId, userId);
  }

  @ApiOperation({ summary: 'Add comment to project' })
  @ApiResponse({ status: 200, type: ProjectComment })
  @Patch('/comment/add')
  addComment(@Body() comment: CreateProjectCommentDto) {
    return this.projectService.addComment(comment);
  }

  @ApiOperation({ summary: 'Get all comments' })
  @ApiResponse({ status: 200, type: [ProjectComment] })
  @Get(':projectId/comment/all')
  getComments( @Param('projectId') projectId: number,) {
    return this.projectService.getComments(projectId);
  }

  @ApiOperation({ summary: 'Get all statuses' })
  @ApiResponse({ status: 200, type: [ProjectStatus] })
  @Get('statuses/all')
  getProjectStatuses() {
    return this.projectService.getAllStatuses();
  }
}
