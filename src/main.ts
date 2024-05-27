import * as yargs from 'yargs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TaskService } from './task/application/task-service';
import { TaskStatus } from './task/domain/value-objects/task-status';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule.register({ 
    driver: 'orm'
  }));
  const taskService = app.get(TaskService);

  yargs
    .command({
      command: 'list',
      describe: 'List all tasks',
      handler: async () => {
        const users = await taskService.findAll();
        console.log(users);
      },
    })
    .command({
      command: 'add <title> <description>',
      describe: 'Add a new task',
      handler: async (argv) => {
        const { title, description } = argv;
        const newUser = await taskService.add(title, description, TaskStatus.NOT_COMPLETED);
        console.log('Task added:', newUser);
      },
    })
    .command({
      command: 'complete <id>',
      describe: 'complete a task',
      handler: async (argv) => {
        const { id, newTitle, newDescription, newStatus } = argv;
        const updatedUser = await taskService.editTask(id,  newTitle, newDescription, newStatus);
        console.log('User updated:', updatedUser);
      },
    })
    .command({
      command: 'delete <id>',
      describe: 'Delete a task',
      handler: async (argv) => {
        const { id } = argv;
        await taskService.removeTask(id);
        console.log('User deleted');
      },
    })
    .strictCommands()
    .help().argv;
}
bootstrap();
