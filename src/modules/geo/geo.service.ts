import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { partnerPayload } from './types/payload-partner';
import { KafkaService } from '../kafka/kafka.service';
import { sendDataToKafka } from './types/sendData-toKafka';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class GeoService {
    constructor(private kafkaService: KafkaService, private RedisService:RedisService) {}

    getLocation(lat:string, log:string, req:partnerPayload){
        try {
            const sendData:sendDataToKafka = {
                partnerEmail: req.partner.email,
                latitude: lat,
                longitude: log
            } 

            return this.kafkaService.sendLocation(sendData);
             
        } catch (error) {
            throw new InternalServerErrorException("internal server error"); 
        }
    }
    // getting loc and sending to super-admin for disply in map
    async getPartnerLocation(){
        try {
            const data = await this.RedisService.getDriverLocation()
            return data;
        } catch (error) {
            throw new InternalServerErrorException("internal server error"); 
        }
    }
}
