import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { TasksService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskGuard } from './task.guard';
import { ValidationPipe } from '../pipes/validation.pipe';
import { JwtAuthGuard } from '../auth/jwt-auth-guards';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Task } from './task.model';
import { TaskStatus } from 'src/task-status/task-status.model';
import { TaskStatusService } from 'src/task-status/task-status.service';
import { TaskPriority } from 'src/task-priority/task-priority.model';
import { TaskType } from 'src/task-type/task-type.model';
import { NotFoundInterceptor } from 'src/interceptor/not-found.interceptor';
import { AllException } from 'src/filters/all-exceptions.filter';
import { CreateTaskCommentDto } from './task-comment/dto/create-task-comment.dto';

@ApiTags('Tasks')
@UseGuards(JwtAuthGuard)
@UseInterceptors(NotFoundInterceptor)
@UseFilters(new AllException())
@Controller('tasks')
export class TasksController {
  constructor(
    private taskService: TasksService,
    private taskStatusService: TaskStatusService,
  ) {}

  @ApiOperation({ summary: 'Create task' })
  @ApiResponse({ status: 200, type: [Task] })
  
  @UsePipes(ValidationPipe)
  @UseGuards(TaskGuard)
  @Post()
  createTask(@Body() dto: CreateTaskDto) {
    return this.taskService.create(dto);
  }

  @ApiOperation({ summary: 'Get task' })
  @ApiResponse({ status: 200, type: [Task] })
  
  @Get('/:id')
  getTask(@Param('id') id: number) {
    return this.taskService.findOne(id);
  }

  @ApiOperation({ summary: 'Get task by author' })
  @ApiResponse({ status: 200, type: [Task] })
  
  @Get('/author/:id')
  getAllByAuthor(@Param('id') userId: number) {
    return this.taskService.findAllByAuthor(userId);
  }

  @ApiOperation({ summary: 'Get task from project' })
  @ApiResponse({ status: 200, type: [Task] })
  
  @Get('/project/:id')
  getAllByProject(@Param('id') projectId: number) {
    return this.taskService.findAllByProject(projectId);
  }

  @ApiOperation({ summary: 'Update task' })
  @ApiResponse({ status: 200, type: Task })
  
  @Patch('/:id')
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }

  @ApiOperation({ summary: 'Task statuses' })
  @ApiResponse({ status: 200, type: [TaskStatus] })
  @Get('/statuses/all')
  getStatuses() {
    return this.taskStatusService.findAll();
  }

  @ApiOperation({ summary: 'Task priorities' })
  @ApiResponse({ status: 200, type: [TaskPriority] })
  
  @Get('/priorities/all')
  getPiorities() {
    return this.taskService.getAllPriorities();
  }

  @ApiOperation({ summary: 'Task types' })
  @ApiResponse({ status: 200, type: [TaskType] })
  
  @Get('/types/all')
  getAllTypes() {
    return this.taskService.getAllTypes();
  }

  @Patch('/comment/add')
  addComment(@Body() comment: CreateTaskCommentDto) {
    return this.taskService.addComment(comment);
  }
  @Get(':taskId/comment/add')
  getComments(@Param('taskId') taskId: number) {
    return this.taskService.getComments(taskId);
  }
}
