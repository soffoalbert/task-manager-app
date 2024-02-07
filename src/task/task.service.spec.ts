import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task, TaskStatus } from './entities/task.entity';
import { DataSource, Repository } from 'typeorm';
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
  preload: jest.fn(),
});

describe('TaskService', () => {
  let service: TaskService;
  let repository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(Task),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);

    repository = module.get<MockRepository>(getRepositoryToken(Task));
  });

  describe('add', () => {
    it('should successfully add a task', async () => {
      const task: Task = {
        id: 1,
        title: 'Test Task',
        description: 'Test Desc',
        status: TaskStatus.COMPLETED,
      };
      repository.create.mockReturnValue(task);
      repository.save.mockResolvedValue(task);

      expect(
        await service.add('Test Task', 'Test Desc', TaskStatus.COMPLETED),
      ).toEqual(task);
      expect(repository.create).toHaveBeenCalledWith({
        title: 'Test Task',
        description: 'Test Desc',
        status: TaskStatus.COMPLETED,
      });
      expect(repository.save).toHaveBeenCalledWith(task);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const taskArray: Task[] = [
        {
          id: 1,
          title: 'Test Task',
          description: 'Test Desc',
          status: TaskStatus.COMPLETED,
        },
      ];
      repository.find.mockResolvedValue(taskArray);

      expect(await service.findAll()).toEqual(taskArray);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('removeTask', () => {
    it('should call the delete method on the repository with the correct id', async () => {
      const taskId = 1;
      repository.delete.mockResolvedValue({ affected: 1 }); // Simulate successful deletion

      await service.removeTask(taskId);

      expect(repository.delete).toHaveBeenCalledWith(taskId);
    });
  });

  describe('editTask', () => {
    it('should successfully edit and save a task', async () => {
      const task = new Task();
      task.id = 1;
      task.title = 'Original Title';
      task.description = 'Original Description';
      task.status = TaskStatus.NOT_COMPLETED;

      const updatedTask = {
        id: 1,
        status: TaskStatus.COMPLETED,
      };

      repository.preload.mockResolvedValue(updatedTask);
      repository.save.mockResolvedValue(updatedTask);

      const result = await service.complete(
        1
      );

      expect(result).toEqual(updatedTask);
      expect(repository.preload).toHaveBeenCalledWith(updatedTask);
      expect(repository.save).toHaveBeenCalledWith(updatedTask);
    });

    it('should throw an error if the task does not exist', async () => {
      repository.preload.mockResolvedValue(undefined); // Simulate task not found

      await expect(
        service.complete(
          99
        ),
      ).rejects.toThrow(`task #99 does not exist`);
    });
  });
});
