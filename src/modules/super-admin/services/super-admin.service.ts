import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtSchemaModel } from '../schema/super-admin-jwt.schema';
import { VerifySuperAdminService } from 'src/modules/verify_super_admin/verify_super_admin.service';
import { findAdmin } from 'src/modules/super-admin/repository/super-admin';
import { SuperAdminSchemaModel } from '../schema/super-auth.schema';

@Injectable()
export class AuthService {
    constructor(private readonly VerifySuperAdminService: VerifySuperAdminService,
        @InjectModel(SuperAdminSchemaModel.name) private SuperAdminSchemaModel: Model<SuperAdminSchemaModel>,
        @InjectModel(JwtSchemaModel.name) private JwtSchemaModel: Model<JwtSchemaModel>,
        public jwtService: JwtService) { }


    async signin(email: string) {

        const existAdmin = await findAdmin(this.SuperAdminSchemaModel, email);
        
        if (existAdmin) {
            const payload = { adminId: existAdmin._id, email: existAdmin.email };
            const Token = await this.jwtService.signAsync(payload);
            const storeJwt = await this.JwtSchemaModel.findOneAndUpdate(
                { user: existAdmin._id },              
                { jwt: Token },                
                {
                    upsert: true,                
                    setDefaultsOnInsert: true    
                }
            );
            
            if (storeJwt) {
                const res = await this.VerifySuperAdminService.sendVerificationEmail(email, Token);
                if(res){
                    return { message: "verification email sent successfully", statusCode: 200 }
                } else {
                    return { message: "something went wrong", statusCode: 500 }
                }
            }
        } else {
            return { message: "super-admin not exist..", statusCode: 404 }
        }
    }
}

