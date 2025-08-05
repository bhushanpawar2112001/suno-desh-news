import { Controller, Post } from '@nestjs/common';
import { SeedService } from './seed-data';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  async seedDatabase() {
    await this.seedService.seedData();
    return { message: 'Database seeded successfully!' };
  }
} 