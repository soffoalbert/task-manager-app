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
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateTaskType } from './swagger/update-task-swagger.type';
import { CreateTaskType } from './swagger/create-task-swagger.type';
import { Auth } from './iam/auth.decorator';
import { AuthType } from './iam/auth-type.enum';

@Auth(AuthType.Bearer)
@ApiBearerAuth()
@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CreateTaskType })
  @ApiCreatedResponse({ description: 'Task created' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async addTask(@Body() task: CreateTaskDTO): Promise<Task> {
    return this.taskService.add(task.title, task.description);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiBody({ type: UpdateTaskType })
  @ApiOkResponse({ description: 'Task updated' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async updateTask(
    @Param('id') id,
    @Body() taskDto: UpdateTaskDTO,
  ): Promise<Task> {
    const task: Task = this.toDomain(taskDto, id);
    return this.taskService.updateTask(task, id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiOkResponse({ description: 'Tasks found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Roles(Role.Admin)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiOkResponse({ description: 'Task deleted' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async deleteTask(@Param('id') id: number): Promise<void> {
    return this.taskService.removeTask(id);
  }

  @Post(':id/complete')
  @ApiOperation({ summary: 'Mark a task as complete by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiOkResponse({ description: 'Task completed' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async completeTask(@Param('id') id: number): Promise<Task> {
    return this.taskService.complete(id);
  }

  toDomain(task: UpdateTaskDTO, id: number) {
    return new Task(id, task.title, task.description);
  }
}
