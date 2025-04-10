import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from '../../entities/material.entity';
import { CreateMaterialInput } from './dto/create-material.input';
import { UpdateMaterialInput } from './dto/update-material.input';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
  ) {}

  // Create a new material
  async createMaterial(createMaterialInput: CreateMaterialInput): Promise<Material> {
    try {
      // Check if material ID already exists
      const existingMaterial = await this.materialRepository.findOne({
        where: { materialId: createMaterialInput.materialId },
      });

      if (existingMaterial) {
        throw new BadRequestException('Material ID already exists');
      }

      // Automatically set lowStock flag based on stock level
      if (createMaterialInput.stockLevel <= createMaterialInput.minimumStock) {
        createMaterialInput.lowStock = true;
      }

      const newMaterial = this.materialRepository.create(createMaterialInput);
      return this.materialRepository.save(newMaterial);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Find all materials
  async findAll(): Promise<Material[]> {
    return this.materialRepository.find();
  }

  // Find materials with low stock
  async findLowStock(): Promise<Material[]> {
    return this.materialRepository.find({
      where: { lowStock: true },
    });
  }

  // Find materials by category
  async findByCategory(category: string): Promise<Material[]> {
    return this.materialRepository.find({
      where: { category: category as any },
    });
  }

  // Find a material by ID
  async findOne(id: string): Promise<Material> {
    const material = await this.materialRepository.findOne({
      where: { id },
    });
    
    if (!material) {
      throw new NotFoundException('Material not found');
    }
    
    return material;
  }

  // Find a material by material ID
  async findByMaterialId(materialId: string): Promise<Material> {
    const material = await this.materialRepository.findOne({
      where: { materialId },
    });
    
    if (!material) {
      throw new NotFoundException('Material not found');
    }
    
    return material;
  }

  // Update a material
  async updateMaterial(id: string, updateMaterialInput: UpdateMaterialInput): Promise<Material> {
    try {
      const material = await this.findOne(id);
      
      // If stock level is updated, check if we need to update the lowStock flag
      if (updateMaterialInput.stockLevel !== undefined) {
        const minimumStock = updateMaterialInput.minimumStock !== undefined 
          ? updateMaterialInput.minimumStock 
          : material.minimumStock;
        
        updateMaterialInput.lowStock = updateMaterialInput.stockLevel <= minimumStock;
      }
      
      Object.assign(material, updateMaterialInput);
      return this.materialRepository.save(material);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Update stock level
  async updateStock(id: string, quantity: number): Promise<Material> {
    const material = await this.findOne(id);
    
    // Prevent negative stock
    if (material.stockLevel + quantity < 0) {
      throw new BadRequestException('Cannot reduce stock below zero');
    }
    
    material.stockLevel += quantity;
    material.lowStock = material.stockLevel <= material.minimumStock;
    
    return this.materialRepository.save(material);
  }

  // Delete a material
  async deleteMaterial(id: string): Promise<boolean> {
    try {
      const material = await this.findOne(id);
      await this.materialRepository.remove(material);
      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
