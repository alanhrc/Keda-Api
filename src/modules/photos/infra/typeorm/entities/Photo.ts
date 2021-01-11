import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import uploadConfig from '@config/upload';

import { Expose, Exclude } from 'class-transformer';

import Product from '@modules/products/infra/typeorm/entities/Product';

@Entity('photos')
class Photo {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  path: string;

  @Column()
  product_id: string;

  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Product, product => product.photos)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Expose({ name: 'url' })
  getAvatarUrl(): string | null {
    if (!this.id) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.path}`;

      case 's3':
        return `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${this.path}`;

      default:
        return null;
    }
  }
}

export default Photo;
