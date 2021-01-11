import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddReleasedFieldToProducts1610364236489 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
          'products',
          new TableColumn({
            name: 'released',
            type: 'boolean',
            default: false,
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('products', 'released');
      }

}
