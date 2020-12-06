import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
