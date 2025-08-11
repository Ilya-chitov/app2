import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAnimalsTable1710000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'animals',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'species',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'breed',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'birthDate',
            type: 'date',
          },
          {
            name: 'gender',
            type: 'varchar',
            length: '20',
          },
          {
            name: 'motherId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'fatherId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'notes',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar',
            length: '50',
            default: "'active'",
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
        indices: [
          {
            name: 'IDX_ANIMAL_SPECIES',
            columnNames: ['species'],
          },
          {
            name: 'IDX_ANIMAL_STATUS',
            columnNames: ['status'],
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('animals');
  }
}