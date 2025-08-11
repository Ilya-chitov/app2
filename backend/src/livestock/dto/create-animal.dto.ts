import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  name: string;

  @IsString()
  species: string;

  @IsString()
  breed: string;

  @IsDateString()
  birthDate: string;

  @IsString()
  gender: string;

  @IsOptional()
  @IsString()
  motherId?: string;

  @IsOptional()
  @IsString()
  fatherId?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  status?: string;
}