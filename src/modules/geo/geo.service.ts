import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { partnerPayload, superAdminPayload } from './types/payload-partner';
import { KafkaService } from '../kafka/kafka.service';
import { RedisService } from '../redis/redis.service';
import { sendDataToKafkaType } from './types/sendData-toKafka';
import { Warehouse } from './DTO/warehouse.dto';

@Injectable()
export class GeoService {
    constructor(private kafkaService: KafkaService, private RedisService:RedisService) {}

    getLocation(lat:string, log:string, req:partnerPayload){
        try {
            const sendData:sendDataToKafkaType = {
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

    async addWarehouse(Warehouse:Warehouse,req:superAdminPayload){
        try {
            const sendData = {
                superAdmin: req.SuperAdmin.email,
                type:Warehouse.type,
                latitude: Warehouse.lat,
                longitude: Warehouse.log
            } 
            
           
            return this.kafkaService.sendLocation(sendData)
        } catch (error) {
            throw new InternalServerErrorException("internal server error"); 
        }
    }
}
