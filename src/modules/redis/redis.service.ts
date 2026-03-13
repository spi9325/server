import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { driverType } from './types/driverTypes';
import { locationType } from './types/redisLocations';

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


  async storeDriverLocation(data: driverType) {
    const key = data.partnerEmail;

    const value = {
      partnerEmail:key,
      type:"rider",
      latitude:data.latitude,
      longitude:data.longitude
    };
    await this.client.set(key, JSON.stringify(value));

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