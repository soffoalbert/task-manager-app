import * as yargs from 'yargs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TaskService } from './task/application/task-service';

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
        const newUser = await taskService.add(title, description, 'not_completed');
        console.log('Task added:', newUser);
      },
    })
    .command({
      command: 'complete <id>',
      describe: 'Complete a task',
      handler: async (argv) => {
        const { id } = argv;
        const updatedUser = await taskService.complete(id);
        console.log('Task completed:', updatedUser);
      },
    })
    .command({
      command: 'delete <id>',
      describe: 'Delete a task',
      handler: async (argv) => {
        const { id } = argv;
        await taskService.removeTask(id);
        console.log('Task deleted');
      },
    })
    .strictCommands()
    .help().argv;
}
bootstrap();
