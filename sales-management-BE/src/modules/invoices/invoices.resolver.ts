import { Resolver, Query, Mutation, Args, Float } from '@nestjs/graphql';
import { InvoiceService } from './invoices.service';
import { Invoice, InvoiceStatus } from '../../entities/invoice.entity';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice.input';

@Resolver(() => Invoice)
export class InvoiceResolver {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Query(() => [Invoice])
  async getAllInvoices(): Promise<Invoice[]> {
    return this.invoiceService.findAll();
  }

  @Query(() => [Invoice])
  async getInvoicesByStatus(@Args('status', { type: () => InvoiceStatus }) status: InvoiceStatus): Promise<Invoice[]> {
    return this.invoiceService.findByStatus(status);
  }

  @Query(() => [Invoice])
  async getOverdueInvoices(): Promise<Invoice[]> {
    return this.invoiceService.findOverdue();
  }

  @Query(() => [Invoice])
  async getInvoicesByMonth(
    @Args('year') year: number,
    @Args('month') month: number,
  ): Promise<Invoice[]> {
    return this.invoiceService.findByMonth(year, month);
  }

  @Query(() => [Invoice])
  async getInvoicesByCustomer(@Args('customerId') customerId: string): Promise<Invoice[]> {
    return this.invoiceService.findByCustomer(customerId);
  }

  @Query(() => [Invoice])
  async getInvoicesByJob(@Args('jobId') jobId: string): Promise<Invoice[]> {
    return this.invoiceService.findByJob(jobId);
  }

  @Query(() => Float)
  async getTotalOutstanding(): Promise<number> {
    return this.invoiceService.calculateTotalOutstanding();
  }

  @Query(() => Float)
  async getTotalPaidThisMonth(): Promise<number> {
    return this.invoiceService.calculateTotalPaidThisMonth();
  }

  @Query(() => Invoice)
  async getInvoice(@Args('id') id: string): Promise<Invoice> {
    return this.invoiceService.findOne(id);
  }

  @Mutation(() => Invoice)
  async createInvoice(
    @Args('createInvoiceInput') createInvoiceInput: CreateInvoiceInput,
  ): Promise<Invoice> {
    return this.invoiceService.createInvoice(createInvoiceInput);
  }

  @Mutation(() => Invoice)
  async updateInvoice(
    @Args('id') id: string,
    @Args('updateInvoiceInput') updateInvoiceInput: UpdateInvoiceInput,
  ): Promise<Invoice> {
    return this.invoiceService.updateInvoice(id, updateInvoiceInput);
  }

  @Mutation(() => Invoice)
  async updateInvoiceStatus(
    @Args('id') id: string,
    @Args('status') status: InvoiceStatus,
  ): Promise<Invoice> {
    return this.invoiceService.updateStatus(id, status);
  }

  @Mutation(() => Invoice)
  async markInvoiceAsSynced(@Args('id') id: string): Promise<Invoice> {
    return this.invoiceService.markAsSynced(id);
  }

  @Mutation(() => Boolean)
  async deleteInvoice(@Args('id') id: string): Promise<boolean> {
    return this.invoiceService.deleteInvoice(id);
  }
}
