import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddPhotoProfileFieldToProducts1610366854169 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
          'products',
          new TableColumn({
            name: 'photo_profile',
            type: 'varchar',
            isNullable: true,
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('products', 'photo_profile');
      }

}
