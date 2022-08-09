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
import { ProjectAvailable } from './ProjectAvailable.guard';
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
  @UseGuards(ProjectAvailable)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.projectService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update project' })
  @ApiResponse({ status: 200, type: Project })
  @UseGuards(ProjectAvailable)
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
  @UseGuards(ProjectAvailable)
  @Patch(':id/users')
  addUsers(
    @Param('id') id: number,
    @Body() body: { userIds: number[] },
  ) {
    return this.projectService.addUsers(id, body);
  }

  @ApiOperation({ summary: 'Deleted users list' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(ProjectAvailable)
  @Delete(':id/users')
  deleteUsers(
    @Param('id') id: number,
    @Body() body: { userIds: number[] },
  ) {
    return this.projectService.deleteUsers(id, body);
  }

  @ApiOperation({ summary: 'Added user to ptoject' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(ProjectAvailable)
  @Patch(':id/user/:userId')
  addUser(
    @Param('id') id: number,
    @Param('userId') userId: number,
  ) {
    return this.projectService.addUser(id, userId);
  }

  @ApiOperation({ summary: 'Deleted user to ptoject' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(ProjectAvailable)
  @Delete(':id/user/:userId')
  deleteUser(
    @Param('id') id: number,
    @Param('userId') userId: number,
  ) {
    return this.projectService.deleteUser(id, userId);
  }

  @ApiOperation({ summary: 'Add comment to project' })
  @ApiResponse({ status: 200, type: ProjectComment })
  @UseGuards(ProjectAvailable)
  @Patch('/comment/add')
  addComment(@Body() comment: CreateProjectCommentDto) {
    return this.projectService.addComment(comment);
  }

  @ApiOperation({ summary: 'Get all comments' })
  @ApiResponse({ status: 200, type: [ProjectComment] })
  @UseGuards(ProjectAvailable)
  @Get(':id/comment/all')
  getComments( @Param('id') id: number,) {
    return this.projectService.getComments(id);
  }

  @ApiOperation({ summary: 'Get all statuses' })
  @ApiResponse({ status: 200, type: [ProjectStatus] })
  @Get('statuses/all')
  getProjectStatuses() {
    return this.projectService.getAllStatuses();
  }
  
  @ApiOperation({ summary: 'Get all users by project' })
  @ApiResponse({ status: 200, type: [ProjectStatus] })
  @UseGuards(ProjectAvailable)
  @Get(':id/users/all')
  getUsersByProject(@Param('id') id: number) {
    return this.projectService.getUsersByProject(id);
  }
}
