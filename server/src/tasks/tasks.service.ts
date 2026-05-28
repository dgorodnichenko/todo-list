import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>
  ) {}

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find({
        take: 100,
        order: {
          createdAt: 'DESC'
        }
    });
  }

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create({
      title: createTaskDto.title,
      description: createTaskDto.description
    });

    return this.tasksRepository.save(task);
  }

  async remove(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
        throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    if (Object.keys(updateTaskDto).length === 0) {
      throw new BadRequestException('At least one field must be provided');
    }

    const task = await this.tasksRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException(`Task with id "${id}" was not found`);
    }

    Object.assign(task, updateTaskDto);
    return this.tasksRepository.save(task);
  }
}
