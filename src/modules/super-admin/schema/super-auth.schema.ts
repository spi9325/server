import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SuperAdminDocument = HydratedDocument<SuperAdminSchemaModel>;

@Schema()
export class SuperAdminSchemaModel {
    @Prop({
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    })
    email: string;
}

export const superAdminSchema = SchemaFactory.createForClass(SuperAdminSchemaModel);