import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { VerifySuperAdminService } from 'src/modules/verify_super_admin/verify_super_admin.service';
import { SuperAdminDto } from '../DTO/super-admin.dto';
import { SuperAdminTokenDto } from '../DTO/super-admin.jwt.dto';
import { SuperAdminGuard } from '../guards/super-admin.guard';
import { AuthService } from '../services/super-admin.service';

@Controller('api/super-admin')
export class SuperAdminController {
   constructor(private readonly AuthService: AuthService, private readonly VerifySuperAdminService: VerifySuperAdminService) { }
   @Post("signin")
   generateUrl(@Body() SuperAdminDto: SuperAdminDto) {
      return this.AuthService.signin(SuperAdminDto.email);
   }
   @Get("verify")
   @UseGuards(SuperAdminGuard)
   adminVerification(@Body() TokenDto: SuperAdminTokenDto, @Request() req: any) {
      return this.VerifySuperAdminService.verifySuperAdmin(req.SuperAdmin);
   }
   @Get("/me")
   Me(@Request() req: any) {
      return this.VerifySuperAdminService.me();
   }
}
