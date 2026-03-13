import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Super_Admin_Middleware } from './common/middleware/super-admin.middleware';
import { jwtConstants } from './modules/super-admin/constants';
import { SuperAdminModule } from './modules/super-admin/super-admin.module';
import { VerifySuperAdminModule } from './modules/verify_super_admin/verify_super_admin.module';
import { GeoModule } from './modules/geo/geo.module';

@Module({
  imports: [
    SuperAdminModule,
    GeoModule,
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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Super_Admin_Middleware)
    .exclude(
        { path: "api/super-admin/signin", method: RequestMethod.ALL },
        { path: "api/super-admin/verify", method: RequestMethod.ALL },
        { path: "api/super-admin/logout", method: RequestMethod.ALL },
        { path: "api/geo/sendlocation", method: RequestMethod.ALL },
        { path: "api/geo/get-location", method: RequestMethod.ALL },
      )
      .forRoutes("*");
  }
}
