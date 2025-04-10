import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThan } from 'typeorm';
import { Invoice, InvoiceStatus } from '../../entities/invoice.entity';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice.input';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
  ) {}

  // Create a new invoice
  async createInvoice(createInvoiceInput: CreateInvoiceInput): Promise<Invoice> {
    try {
      // Check if invoice number already exists
      const existingInvoice = await this.invoiceRepository.findOne({
        where: { invoiceNumber: createInvoiceInput.invoiceNumber },
      });

      if (existingInvoice) {
        throw new BadRequestException('Invoice number already exists');
      }

      const newInvoice = this.invoiceRepository.create(createInvoiceInput);
      return this.invoiceRepository.save(newInvoice);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Find all invoices
  async findAll(): Promise<Invoice[]> {
    return this.invoiceRepository.find({
      relations: ['customer', 'job'],
    });
  }

  // Find invoices by status
  async findByStatus(status: InvoiceStatus): Promise<Invoice[]> {
    return this.invoiceRepository.find({
      where: { status },
      relations: ['customer', 'job'],
    });
  }

  // Find overdue invoices
  async findOverdue(): Promise<Invoice[]> {
    const today = new Date();
    
    return this.invoiceRepository.find({
      where: {
        status: InvoiceStatus.PENDING,
        dueDate: LessThan(today),
      },
      relations: ['customer', 'job'],
    });
  }

  // Find invoices for a specific month
  async findByMonth(year: number, month: number): Promise<Invoice[]> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    
    return this.invoiceRepository.find({
      where: {
        issueDate: Between(startDate, endDate),
      },
      relations: ['customer', 'job'],
    });
  }

  // Find invoices by customer
  async findByCustomer(customerId: string): Promise<Invoice[]> {
    return this.invoiceRepository.find({
      where: { customerId },
      relations: ['customer', 'job'],
    });
  }

  // Find invoices by job
  async findByJob(jobId: string): Promise<Invoice[]> {
    return this.invoiceRepository.find({
      where: { jobId },
      relations: ['customer', 'job'],
    });
  }

  // Calculate total outstanding amount
  async calculateTotalOutstanding(): Promise<number> {
    const pendingInvoices = await this.invoiceRepository.find({
      where: { status: InvoiceStatus.PENDING },
    });
    
    return pendingInvoices.reduce((total, invoice) => total + Number(invoice.amount), 0);
  }

  // Calculate total paid this month
  async calculateTotalPaidThisMonth(): Promise<number> {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    const paidInvoices = await this.invoiceRepository.find({
      where: {
        status: InvoiceStatus.PAID,
        issueDate: Between(startOfMonth, endOfMonth),
      },
    });
    
    return paidInvoices.reduce((total, invoice) => total + Number(invoice.amount), 0);
  }

  // Find a invoice by ID
  async findOne(id: string): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOne({
      where: { id },
      relations: ['customer', 'job'],
    });
    
    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }
    
    return invoice;
  }

  // Update an invoice
  async updateInvoice(id: string, updateInvoiceInput: UpdateInvoiceInput): Promise<Invoice> {
    try {
      const invoice = await this.findOne(id);
      
      // If invoice number is being updated, check if it's already in use
      if (updateInvoiceInput.invoiceNumber && updateInvoiceInput.invoiceNumber !== invoice.invoiceNumber) {
        const existingInvoice = await this.invoiceRepository.findOne({
          where: { invoiceNumber: updateInvoiceInput.invoiceNumber },
        });
        
        if (existingInvoice && existingInvoice.id !== id) {
          throw new BadRequestException('Invoice number already exists');
        }
      }
      
      Object.assign(invoice, updateInvoiceInput);
      return this.invoiceRepository.save(invoice);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Update invoice status
  async updateStatus(id: string, status: InvoiceStatus): Promise<Invoice> {
    const invoice = await this.findOne(id);
    invoice.status = status;
    return this.invoiceRepository.save(invoice);
  }

  // Mark invoice as synced with QuickBooks
  async markAsSynced(id: string): Promise<Invoice> {
    const invoice = await this.findOne(id);
    invoice.quickbooksSynced = true;
    return this.invoiceRepository.save(invoice);
  }

  // Delete an invoice
  async deleteInvoice(id: string): Promise<boolean> {
    try {
      const invoice = await this.findOne(id);
      await this.invoiceRepository.remove(invoice);
      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
