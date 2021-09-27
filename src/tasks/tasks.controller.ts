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
import { Roles } from '../auth/roles-auth.decorator';
import { TaskGuard } from './task.guard';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @UsePipes(ValidationPipe)
  @UseGuards(TaskGuard)
  @Post()
  createTask(@Body() dto: CreateTaskDto) {
    return this.taskService.create(dto);
  }
  @Get('/:id')
  getTask(@Param('id') id: number) {
    return this.taskService.findOne(id);
  }

  @Get('/author/:id')
  getAllByAuthor(@Param('id') userId: number) {
    return this.taskService.findAllByAuthor(userId);
  }
  @Get('/project/:id')
  getAllByProject(@Param('id') projectId: number) {
    return this.taskService.findAllByProject(projectId);
  }

  @Patch('/:id')
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
