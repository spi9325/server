import { Module } from '@nestjs/common';
import { VerifySuperAdminService } from './verify_super_admin.service';

@Module({
  providers: [VerifySuperAdminService],
  exports:[VerifySuperAdminService],
})
export class VerifySuperAdminModule {}
