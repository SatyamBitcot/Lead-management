import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { CustomerModule } from './modules/customers/customers.module';
import { JobModule } from './modules/jobs/jobs.module';
import { InvoiceModule } from './modules/invoices/invoices.module';
import { MaterialModule } from './modules/materials/materials.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const typeOrmConfig = configService.get('typeorm');
        return {
          ...typeOrmConfig,
          entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        };
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      playground: true,
    }),
    AuthModule,
    UsersModule,
    CustomerModule,
    JobModule,
    InvoiceModule,
    MaterialModule,
  ],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule {}