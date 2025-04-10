import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CustomersService } from './customers.service';
import { Customer, CustomerType, CustomerStatus } from '../../entities/customer.entity';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(private readonly customersService: CustomersService) {}

  @Query(() => [Customer])
  async getAllCustomers(): Promise<Customer[]> {
    return this.customersService.findAll();
  }

  @Query(() => [Customer])
  async getActiveCustomers(): Promise<Customer[]> {
    return this.customersService.findActive();
  }

  @Query(() => [Customer])
  async getInactiveCustomers(): Promise<Customer[]> {
    return this.customersService.findInactive();
  }

  @Query(() => Customer)
async getCustomer(@Args('id', { type: () => ID }) id: string): Promise<Customer> {
  return this.customersService.findOne(id);
}


  @Mutation(() => Customer)
  async createCustomer(
    @Args('createCustomerInput') createCustomerInput: CreateCustomerInput,
  ): Promise<Customer> {
    return this.customersService.createCustomer(createCustomerInput);
  }

  @Mutation(() => Customer)
  async updateCustomer(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput,
  ): Promise<Customer> {
    return this.customersService.updateCustomer(id, updateCustomerInput);
  }

  @Mutation(() => Boolean)
  async deleteCustomer(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.customersService.deleteCustomer(id);
  }

  @Mutation(() => Customer)
  async updateCustomerStatus(
    @Args('id', { type: () => ID }) id: string,
    @Args('status', { type: () => CustomerStatus }) status: CustomerStatus,
  ): Promise<Customer> {
    return this.customersService.updateStatus(id, status);
  }

  @Mutation(() => Customer)
  async updateCustomerType(
    @Args('id', { type: () => ID }) id: string,
    @Args('customerType', { type: () => CustomerType }) customerType: CustomerType,
  ): Promise<Customer> {
    return this.customersService.updateType(id, customerType);
  }

  @Query(() => Customer)
  async viewCustomerProfile(@Args('id', { type: () => ID }) id: string): Promise<Customer> {
    return this.customersService.findOne(id);
  }
}
