import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnimalsService } from '../src/livestock/animals.service.js';
import { Animal } from '../src/livestock/animal.entity.js';
import { CreateAnimalDto } from '../src/livestock/dto/create-animal.dto.js';

describe('AnimalsService', () => {
  let service: AnimalsService;
  let repository: Repository<Animal>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnimalsService,
        {
          provide: getRepositoryToken(Animal),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AnimalsService>(AnimalsService);
    repository = module.get<Repository<Animal>>(getRepositoryToken(Animal));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an animal', async () => {
      const createAnimalDto: CreateAnimalDto = {
        name: 'Bessie',
        species: 'Cattle',
        breed: 'Holstein',
        birthDate: '2020-01-15',
        gender: 'Female',
      };

      const mockAnimal = {
        id: 'uuid-123',
        ...createAnimalDto,
        birthDate: new Date(createAnimalDto.birthDate),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRepository.create.mockReturnValue(mockAnimal);
      mockRepository.save.mockResolvedValue(mockAnimal);

      const result = await service.create(createAnimalDto);

      expect(mockRepository.create).toHaveBeenCalledWith({
        ...createAnimalDto,
        birthDate: new Date(createAnimalDto.birthDate),
      });
      expect(mockRepository.save).toHaveBeenCalledWith(mockAnimal);
      expect(result).toEqual(mockAnimal);
    });
  });

  describe('findAll', () => {
    it('should return an array of animals', async () => {
      const mockAnimals = [
        { id: '1', name: 'Bessie', species: 'Cattle' },
        { id: '2', name: 'Charlie', species: 'Pig' },
      ];

      mockRepository.find.mockResolvedValue(mockAnimals);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalledWith({
        order: { createdAt: 'DESC' },
      });
      expect(result).toEqual(mockAnimals);
    });
  });

  // TODO: Add more comprehensive tests
  // TODO: Add integration tests
  // TODO: Add e2e tests
});