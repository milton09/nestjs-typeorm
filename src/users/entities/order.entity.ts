import { User } from './user.entity';
import { Product } from './../../products/entities/product.entity';

import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Order {

  date: Date;
  user: User;
  products: Product[];
  
}
