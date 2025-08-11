import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './animal.entity.js';
import { CreateAnimalDto } from './dto/create-animal.dto.js';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private animalsRepository: Repository<Animal>,
  ) {}

  async create(createAnimalDto: CreateAnimalDto): Promise<Animal> {
    const animal = this.animalsRepository.create({
      ...createAnimalDto,
      birthDate: new Date(createAnimalDto.birthDate),
    });
    return this.animalsRepository.save(animal);
  }

  async findAll(): Promise<Animal[]> {
    return this.animalsRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Animal> {
    return this.animalsRepository.findOne({ where: { id } });
  }

  async update(id: string, updateData: Partial<CreateAnimalDto>): Promise<Animal> {
    await this.animalsRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.animalsRepository.delete(id);
  }

  // TODO: Add advanced filtering, search, pagination
  // TODO: Add health record management
  // TODO: Add weight tracking
}