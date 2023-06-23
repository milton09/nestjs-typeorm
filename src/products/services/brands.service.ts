import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {

  constructor(@InjectRepository(Brand) private brandsRepo: Repository<Brand>){}
  
  findAll() {
    return this.brandsRepo.find();
  }

  findOne(id: number) {

    const product = this.brandsRepo.findOne(id);
    
    if (!product) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return product;
  }

  create(data: CreateBrandDto) {
    const newBrand = this.brandsRepo.create(data);
    return this.brandsRepo.save(newBrand);
  }

  async update(id: number, changes: UpdateBrandDto) {

    const brand = await this.findOne(id);
    this.brandsRepo.merge(brand, changes);
    return this.brandsRepo.save(brand);
  }


  async remove(id: number) {

    const brand = await this.findOne(id);
    return this.brandsRepo.delete(id);
  }
}
