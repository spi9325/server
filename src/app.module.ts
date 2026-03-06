import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { jwtConstants } from './modules/super-admin/constants';
import { VerifySuperAdminModule } from './modules/verify_super_admin/verify_super_admin.module';
import { SuperAdminModule } from './modules/super-admin/super-admin.module';

@Module({
  imports: [
    SuperAdminModule,
    ConfigModule.forRoot(),
    VerifySuperAdminModule,
    MongooseModule.forRoot(`${process.env.NODE_ENV == "development" ? "mongodb://localhost:27017/admin" : process.env.DATABASE_URL}`),
    JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: process.env.NODE_ENV == "development" ? '10d' : Number(process.env.JWT_EXPIRES_IN) },
        }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
