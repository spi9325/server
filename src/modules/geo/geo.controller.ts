import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { GeoService } from './geo.service';
import { LocationDto } from './DTO/location.dto';
import { PartnerGuard } from './guards/partner.guard';
import { Warehouse } from './DTO/warehouse.dto';
import { SuperAdminGuard } from 'src/common/guard/superAdmin.guard';

@Controller('api/geo')
export class GeoController {
    constructor(private readonly GeoService:GeoService){}

    @Post("send-location")
    @UseGuards(PartnerGuard)
    location(@Body() LocationDto:LocationDto,@Req() req:any,@Res({ passthrough: true }) res: any) {
        return this.GeoService.getLocation(LocationDto.lat,LocationDto.log, req);
    }
    @Get("get-location")
    @UseGuards(PartnerGuard)
    getlocation(@Res({ passthrough: true }) res: any) {
       return this.GeoService.getPartnerLocation();
    }
    @Post("add-warehouse")
    @UseGuards(SuperAdminGuard)
    addWarehouse(@Body() Warehouse:Warehouse,@Req() req:any,@Res({ passthrough: true }) res: any) {
       return this.GeoService.addWarehouse(Warehouse,req);
    }
}
