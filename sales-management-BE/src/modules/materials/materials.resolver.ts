import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { MaterialService } from './materials.service';
import { Material } from '../../entities/material.entity';
import { CreateMaterialInput } from './dto/create-material.input';
import { UpdateMaterialInput } from './dto/update-material.input';

@Resolver(() => Material)
export class MaterialResolver {
  constructor(private readonly materialService: MaterialService) {}

  @Query(() => [Material])
  async getAllMaterials(): Promise<Material[]> {
    return this.materialService.findAll();
  }

  @Query(() => [Material])
  async getLowStockMaterials(): Promise<Material[]> {
    return this.materialService.findLowStock();
  }

  @Query(() => [Material])
  async getMaterialsByCategory(@Args('category') category: string): Promise<Material[]> {
    return this.materialService.findByCategory(category);
  }

  @Query(() => Material)
  async getMaterial(@Args('id') id: string): Promise<Material> {
    return this.materialService.findOne(id);
  }

  @Query(() => Material)
  async getMaterialByMaterialId(@Args('materialId') materialId: string): Promise<Material> {
    return this.materialService.findByMaterialId(materialId);
  }

  @Mutation(() => Material)
  async createMaterial(
    @Args('createMaterialInput') createMaterialInput: CreateMaterialInput,
  ): Promise<Material> {
    return this.materialService.createMaterial(createMaterialInput);
  }

  @Mutation(() => Material)
  async updateMaterial(
    @Args('id') id: string,
    @Args('updateMaterialInput') updateMaterialInput: UpdateMaterialInput,
  ): Promise<Material> {
    return this.materialService.updateMaterial(id, updateMaterialInput);
  }

  @Mutation(() => Material)
  async updateMaterialStock(
    @Args('id') id: string,
    @Args('quantity', { type: () => Int }) quantity: number,
  ): Promise<Material> {
    return this.materialService.updateStock(id, quantity);
  }

  @Mutation(() => Boolean)
  async deleteMaterial(@Args('id') id: string): Promise<boolean> {
    return this.materialService.deleteMaterial(id);
  }
}
