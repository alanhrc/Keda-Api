import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateProducts1607175686899 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'integer',
            generationStrategy: 'increment',
            isGenerated: true,
            isPrimary: true,
            isUnique: true,
            unsigned: true,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'internal_code',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'number_code',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'specific_code',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'observation',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sector',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'company',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'isActive',
            type: 'boolean',
            default: true,
          },
          {
            name: 'quantity',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
