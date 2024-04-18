import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { Task } from '../domain/task';
import { TaskService } from './task-service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { Roles } from './iam/authorization/role.decorator';
import { Role } from '../infrastructure/persistence/entities/role.enum';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async addTask(task: CreateTaskDTO): Promise<Task> {
    return this.taskService.add(task.title, task.description);
  }

  @Patch(':id')
  async updateTask(
    @Param('id') id,
    @Body() taskDto: UpdateTaskDTO,
  ): Promise<Task> {
    console.log(taskDto);
    const task: Task = this.toDomain(taskDto, id);
    return this.taskService.updateTask(task, id);
  }

  @Roles(Role.Admin)
  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<void> {
    return this.taskService.removeTask(id);
  }

  @Post(':id/complete')
  async completeTask(@Param('id') id: number): Promise<Task> {
    return this.taskService.complete(id);
  }

  toDomain(task: UpdateTaskDTO, id: number) {
    console.log(task);
    return new Task(id, task.title, task.description);
  }
}
