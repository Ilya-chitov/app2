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
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'tag',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'species',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'breed',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    // TODO: Add upcoming domain tables:
    // - inventory_items (id, name, description, unit, stock_level, reorder_point, created_at, updated_at)
    // - inventory_transactions (id, item_id, type, quantity, unit_cost, total_cost, notes, created_at)
    // - finance_transactions (id, type, category, amount, description, date, created_at, updated_at)
    // - finance_budgets (id, category, amount, period, start_date, end_date, created_at, updated_at)
    // - animal_events (id, animal_id, event_type, date, notes, created_at, updated_at)
    // - reproduction (id, dam_id, sire_id, breeding_date, expected_date, actual_date, outcome, notes)
    // - genealogy (id, animal_id, parent_id, relationship_type, created_at)
    // - user_profiles (id, firebase_uid, email, name, role, subscription_id, created_at, updated_at)
    // - subscriptions (id, plan_name, features, price, billing_cycle, created_at, updated_at)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('animals');
  }
}
