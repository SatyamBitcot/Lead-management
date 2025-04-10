import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  hello(): string {
    return 'NestJS GraphQL on Vercel 🚀';
  }

  @Query(() => String)
  ping(): string {
    return 'pong is working on GraphQL 🏓';
  }
}
