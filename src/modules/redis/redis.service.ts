import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { driverType } from './types/driverTypes';
import { locationType } from './types/redisLocations';
import { sendDataToKafkaType } from '../geo/types/sendData-toKafka';

@Injectable()
export class RedisService implements OnModuleInit {

  private client: Redis;

  async onModuleInit() {

    this.client = new Redis(process.env.REDIS_CLIENT!);

    this.client.on("connect", () => {
      console.log("Upstash Redis connected");
    });

    this.client.on("error", (err) => {
      console.log("Redis error:", err);
    });
  }


  async storeDriverLocation(data: sendDataToKafkaType,) {
    const key = data.partnerEmail || data.superAdmin;
    const whichUser = data.superAdmin ? "superAdmin" : "partnerEmail";
  
    const value = {
      [whichUser]:key,
      type: data.type ? data.type : "rider",
      latitude:data.latitude,
      longitude:data.longitude
    };
    
    await this.client.set(key!, JSON.stringify(value));

  }

  // thiss is for data read function
  async getDriverLocation() {
//  const data:any = await this.client.flushdb()

    let locations:locationType[] = [];

    const key = await this.client.keys("*");
    for(let item of key){
      const data:any = await this.client.get(item)
      locations.push(JSON.parse(data))
    }
    return locations;
  }

}