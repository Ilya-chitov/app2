import { Controller, Get, Post, Body } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { Animal } from './entities/animal.entity';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Get()
  async findAll(): Promise<Animal[]> {
    return this.animalsService.findAll();
  }

  @Post()
  async create(@Body() createAnimalDto: CreateAnimalDto): Promise<Animal> {
    // TODO: Add auth guard when implemented
    return this.animalsService.create(createAnimalDto);
  }
}
