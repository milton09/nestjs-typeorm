import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

  constructor(@InjectRepository(Category) private categoriesRepo: Repository<Category>){}
  
  async findAll() {
    return await this.categoriesRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoriesRepo.findOne(id);

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  create(data: CreateCategoryDto) {
    
    const newCategory = this.categoriesRepo.create(data);
    return this.categoriesRepo.save(newCategory);
  }

  async update(id: number, changes: UpdateCategoryDto) {
    
    const category = await this.findOne(id);
    this.categoriesRepo.merge(category, changes);
    return this.categoriesRepo.save(category);

  }

  async remove(id: number) {

    const category = await this.categoriesRepo.findOne(id);
    return this.categoriesRepo.delete(id);
  }
}
