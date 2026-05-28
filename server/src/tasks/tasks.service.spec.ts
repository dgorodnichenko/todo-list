import { getRepositoryToken } from "@nestjs/typeorm";
import { TasksService } from "./tasks.service";
import { Task } from "./entity/task.entity";
import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from "@nestjs/common";

const mockTasksRepository = {
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  findOneBy: jest.fn(),
};

const mockTasks = [
  {
    id: '1',
    title: 'Make test task',
    description: "Make frontend and backend",
    isCompleted: false,
    createdAt: new Date(),
  },
];

describe('TasksService', () => {
  let tasksService: TasksService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTasksRepository,
        },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);

    jest.clearAllMocks();
  });

  it('should return all tasks', async () => {
    mockTasksRepository.find.mockResolvedValue(mockTasks);
    await expect(tasksService.findAll()).resolves.toEqual(mockTasks);
    expect(mockTasksRepository.find).toHaveBeenCalled();
  });

  it('should create a task', async () => {
    const createdTask: Task = {
      id: '2',
      title: 'Make shopping',
      description: 'Buy something',
      isCompleted: false,
      createdAt: new Date(),
    };

    mockTasksRepository.create.mockReturnValue(createdTask);
    mockTasksRepository.save.mockResolvedValue(createdTask);

    await expect(
      tasksService.create({
        title: 'Make shopping',
        description: 'Buy something',
      }),
    ).resolves.toEqual(createdTask);

    expect(mockTasksRepository.create).toHaveBeenCalledWith({
      title: 'Make shopping',
      description: 'Buy something',
    });

    expect(mockTasksRepository.save).toHaveBeenCalledWith(createdTask);
  });

  it('should remove a task', async () => {
    const taskId = '1';
    mockTasksRepository.delete.mockResolvedValue({ affected: 1 });
    await expect(tasksService.remove(taskId)).resolves.toBeUndefined();
    expect(mockTasksRepository.delete).toHaveBeenCalledWith(taskId);
  });

  it('should throw NotFoundException when task does not exist', async () => {
    const taskId = '55';
    mockTasksRepository.delete.mockResolvedValue({ affected: 0 });
    await expect(tasksService.remove(taskId)).rejects.toThrow(NotFoundException);
    expect(mockTasksRepository.delete).toHaveBeenCalledWith(taskId);
  });

  it('should update a task', async () => {
    const task = {
      id: '1',
      title: 'Old title',
      description: 'Old description',
      isCompleted: false,
      createdAt: new Date(),
    };

    const updatedTask = {
      ...task,
      title: 'New title',
      description: 'New description',
    };

    mockTasksRepository.findOneBy.mockResolvedValue(task);
    mockTasksRepository.save.mockResolvedValue(updatedTask);

    await expect(
      tasksService.update(task.id, {
        title: 'New title',
        description: 'New description',
      }),
    ).resolves.toEqual(updatedTask);

    expect(mockTasksRepository.findOneBy).toHaveBeenCalledWith({ id: task.id });
    expect(mockTasksRepository.save).toHaveBeenCalledWith(updatedTask);
  });

  it('should throw NotFoundException when updating missing task', async () => {
    const taskId = '55';

    mockTasksRepository.findOneBy.mockResolvedValue(null);

    await expect(
      tasksService.update(taskId, {
        title: 'New title',
      }),
    ).rejects.toThrow(NotFoundException);

    expect(mockTasksRepository.findOneBy).toHaveBeenCalledWith({ id: taskId });
  });

  it('should throw BadRequestException when update payload is empty', async () => {
    const taskId = '1';

    await expect(tasksService.update(taskId, {})).rejects.toThrow(BadRequestException);

    expect(mockTasksRepository.findOneBy).not.toHaveBeenCalled();
    expect(mockTasksRepository.save).not.toHaveBeenCalled();
  });
});