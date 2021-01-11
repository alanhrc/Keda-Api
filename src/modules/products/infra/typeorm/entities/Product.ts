import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Photo from '@modules/photos/infra/typeorm/entities/Photo';

import uploadConfig from '@config/upload';

import { Expose } from 'class-transformer';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  description: string;

  @Column()
  internal_code: string;

  @Column()
  number_code: string;

  @Column()
  specific_code: string;

  @Column()
  observation: string;

  @Column()
  sector: string;

  @Column()
  company: string;

  @Column('int4')
  quantity: number;

  @Column('bool')
  isActive: boolean;

  @Column('bool')
  released: boolean;

  @Column()
  photo_profile: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Photo, photo => photo.product)
  photos: Photo[];

  @Expose({ name: 'photo_profile' })
  getAvatarUrl(): string | null {
    if (!this.photo_profile) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.photo_profile}`;

      case 's3':
        return `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${this.photo_profile}`;

      default:
        return null;
    }
  }
}

export default Product;
