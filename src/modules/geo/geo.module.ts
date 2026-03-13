import { Module } from '@nestjs/common';
import { GeoService } from './geo.service';
import { GeoController } from './geo.controller';
import { KafkaModule } from '../kafka/kafka.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports:[KafkaModule,RedisModule],
  providers: [GeoService],
  controllers: [GeoController]
})
export class GeoModule {}
