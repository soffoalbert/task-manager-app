import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { AppModule } from '../src/app.module';
import { TaskService } from '../src/task/application/task-service';
import { Task } from '../src/task/infrastructure/persistence/entities/task.entity';
import { TaskRepository } from '../src/task/application/ports/task.repository';
import { TaskRepositoryImpl } from '../src/task/infrastructure/persistence/repositories/task.repository';

describe('TaskService (e2e)', () => {
  let service: TaskService;
  let repository: Repository<Task>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule.register({
          driver: 'orm',
        }),
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    await service.query(`DELETE FROM task;`);
  });

  afterEach(async () => {
    await service.query(`DELETE FROM task;`);
  });

  describe('add and findAll tasks', () => {
    it('should add a task and retrieve it', async () => {
      await service.add('Test Task', 'Test Description', 'not_complete');
      const tasks = await service.findAll();
      expect(tasks).toHaveLength(1);
      expect(tasks[0].title).toEqual('Test Task');
      expect(tasks[0].description).toEqual('Test Description');
      expect(tasks[0].status.value).toEqual('not_complete');
    });
  });

  describe('removeTask', () => {
    it('should remove a task successfully', async () => {
      // First, add a task to remove
      const task = await service.add(
        'Task to Remove',
        'Remove this task',
        'not_complete',
      );
      expect(await service.findAll()).toHaveLength(1); // Ensure the task is added

      // Now, remove the task
      await service.removeTask(task.id);
      expect(await service.findAll()).toHaveLength(0); // Ensure the task is removed
    });

    it('should not throw an error if the task does not exist', async () => {
      await expect(service.removeTask(999)).resolves.not.toThrow(); // Assuming 999 is an unlikely ID
    });
  });

  describe('completeTask', () => {
    it('should mark task as COMPLETED', async () => {
      // Add a task to edit
      const task = await service.add(
        'Task to Edit',
        'Edit this task',
        'not_complete',
      );
      const editedTitle = 'Edited Task Title';
      const editedDescription = 'Edited description';
      const editedStatus = TaskStatus.COMPLETED;

      // Edit the task
      const editedTask = await service.editTask(
        task.id,
        editedTitle,
        editedDescription,
        editedStatus,
      );
      expect(editedTask.title).toEqual(editedTitle);
      expect(editedTask.description).toEqual(editedDescription);
      expect(editedTask.status).toEqual(editedStatus);
    });

    it('should throw an error if the task does not exist', async () => {
      const nonExistentTaskId = 999; // Assuming 999 is an unlikely ID
      await expect(
        service.editTask(
          nonExistentTaskId,
          'Title',
          'Description',
          TaskStatus.COMPLETED,
        ),
      ).rejects.toThrowError(`task #${nonExistentTaskId} does not exist`);
    });

    it('should throw an error if the status is invalid', async () => {
      // Add a task to attempt to edit with an invalid status
      const task = await service.add(
        'Task to Misedit',
        'This task will fail editing',
        TaskStatus.NOT_COMPLETED,
      );
      const invalidStatus = 'INVALID_STATUS'; // Simulate an invalid status

      await expect(
        service.editTask(task.id, 'Title', 'Description', invalidStatus as any),
      ).rejects.toThrowError(
        'The Task status must be a valid TaskStatus value.',
      );
    });
  });
});
