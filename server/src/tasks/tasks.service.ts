import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>
  ) {}

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
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
}
