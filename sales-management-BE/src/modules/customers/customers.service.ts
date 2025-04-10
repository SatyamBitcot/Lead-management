import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer, CustomerType, CustomerStatus } from '../../entities/customer.entity';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async createCustomer(createCustomerInput: CreateCustomerInput): Promise<Customer> {
    try {
      // Check if customer with this email already exists
      const existingCustomer = await this.findByEmail(createCustomerInput.email);
      if (existingCustomer) {
        throw new BadRequestException('Email is already in use by another customer');
      }

      const customer = this.customerRepository.create(createCustomerInput);
      return await this.customerRepository.save(customer);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ 
      where: { id },
      relations: ['jobs'] 
    });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async updateCustomer(id: string, updateCustomerInput: UpdateCustomerInput): Promise<Customer> {
    try {
      const customer = await this.findOne(id);
      
      // If email is being updated, check if it's already in use
      if (updateCustomerInput.email && updateCustomerInput.email !== customer.email) {
        const existingCustomer = await this.findByEmail(updateCustomerInput.email);
        if (existingCustomer && existingCustomer.id !== id) {
          throw new BadRequestException('Email is already in use by another customer');
        }
      }
      
      Object.assign(customer, updateCustomerInput);
      return await this.customerRepository.save(customer);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteCustomer(id: string): Promise<boolean> {
    try {
      const customer = await this.findOne(id);
      await this.customerRepository.remove(customer);
      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateStatus(id: string, status: CustomerStatus): Promise<Customer> {
    const customer = await this.findOne(id);
    customer.status = status;
    return await this.customerRepository.save(customer);
  }

  async updateType(id: string, customerType: CustomerType): Promise<Customer> {
    const customer = await this.findOne(id);
    customer.customerType = customerType;
    return await this.customerRepository.save(customer);
  }

  async findActive(): Promise<Customer[]> {
    return this.customerRepository.find({
      where: { status: CustomerStatus.ACTIVE }
    });
  }

  async findInactive(): Promise<Customer[]> {
    return this.customerRepository.find({
      where: { status: CustomerStatus.INACTIVE }
    });
  }

  async findByEmail(email: string): Promise<Customer> {
    return this.customerRepository.findOne({
      where: { email }
    });
  }
}
