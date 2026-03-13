import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Partitioners } from 'kafkajs';
import { sendDataToKafka } from '../geo/types/sendData-toKafka';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class KafkaService implements OnModuleInit {
  constructor(private readonly RedisService: RedisService) { }
  private kafka = new Kafka({
    clientId: 'geo',
    brokers: ['localhost:9092'],
  });

  public producer = this.kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
  });
  public consumer = this.kafka.consumer({ groupId: 'tracking-group' });

  async onModuleInit() {
    await this.producer.connect();
    await this.consumer.connect();
    // consumer function calling ============
    await this.startConsumer();
  }

  // iam using this Fn for adding data to kafka.....

  async sendLocation(data: sendDataToKafka) {
    await this.producer.send({
      topic: 'driver-location',
      messages: [
        {
          key: data.partnerEmail,
          value: JSON.stringify(data),
        },
      ],
    });
    return {success:true, message:"location cordinates added"}
  }

  // this is consumer function 
  async startConsumer() {
    await this.consumer.subscribe({
      topic: 'driver-location',
      fromBeginning: true,
    });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {

        const value = message.value?.toString();

        if (!value) return;

        const data = JSON.parse(value);
        this.RedisService.storeDriverLocation(data)
        
      },
    });
  }
}