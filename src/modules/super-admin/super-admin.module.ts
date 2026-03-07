import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { VerifySuperAdminModule } from 'src/modules/verify_super_admin/verify_super_admin.module';
import { jwtConstants } from './constants';
import { SuperAdminController } from './controller/super-admin.controller';
import { jwtSchema, JwtSchemaModel } from './schema/super-admin-jwt.schema';
import { superAdminSchema, SuperAdminSchemaModel } from './schema/super-auth.schema';
import { AuthService } from './services/super-admin.service';

@Module({
  imports:[
    VerifySuperAdminModule,
    MongooseModule.forFeature([
      { name: SuperAdminSchemaModel.name, schema: superAdminSchema },
      { name: JwtSchemaModel.name, schema: jwtSchema },
    ]),
    JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '10d' },
    }),
  ],
  controllers: [SuperAdminController],
  providers: [AuthService]
})
export class SuperAdminModule {}
