import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { SuperAdminSchemaModel } from "./super-auth.schema";

export type JwtDocument = HydratedDocument<JwtSchemaModel>;

@Schema()
export class JwtSchemaModel {
   @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: SuperAdminSchemaModel.name,
    required: true,
    unique: true,               
    index: true
  })
  user: mongoose.Types.ObjectId;

    @Prop({
        required: true,
        unique: true,
    })
    jwt: string;
}

export const jwtSchema = SchemaFactory.createForClass(JwtSchemaModel);