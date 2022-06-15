import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskGuard } from './task.guard';
import { ValidationPipe } from '../pipes/validation.pipe';
import { JwtAuthGuard } from '../auth/jwt-auth-guards';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @UseGuards(TaskGuard)
  @Post()
  createTask(@Body() dto: CreateTaskDto) {
    return this.taskService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getTask(@Param('id') id: number) {
    return this.taskService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/author/:id')
  getAllByAuthor(@Param('id') userId: number) {
    return this.taskService.findAllByAuthor(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/project/:id')
  getAllByProject(@Param('id') projectId: number) {
    return this.taskService.findAllByProject(projectId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
