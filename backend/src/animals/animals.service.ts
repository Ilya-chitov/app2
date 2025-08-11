import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { CreateAnimalDto } from './dto/create-animal.dto';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private animalsRepository: Repository<Animal>,
  ) {}

  async findAll(): Promise<Animal[]> {
    return this.animalsRepository.find();
  }

  async create(createAnimalDto: CreateAnimalDto): Promise<Animal> {
    const animal = this.animalsRepository.create(createAnimalDto);
    return this.animalsRepository.save(animal);
  }
}
