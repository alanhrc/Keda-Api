import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreatePhotos1607365755918 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'photos',
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
            name: 'product_id',
            type: 'integer',
          },
          {
            name: 'path',
            type: 'varchar',
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
        foreignKeys: [
          {
            name: 'PhotoProduct',
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            columnNames: ['product_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('photos');
  }
}
