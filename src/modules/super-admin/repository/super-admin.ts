import { Model } from "mongoose";
import { SuperAdminDto } from "src/modules/super-admin/DTO/super-admin.dto";
import { SuperAdminDocument, SuperAdminSchemaModel } from "src/modules/super-admin/schema/super-auth.schema";


export async function findAdmin(SuperAdminSchemaModel: Model<SuperAdminSchemaModel> ,email:SuperAdminDto["email"]): Promise<SuperAdminDocument | null> {
    const existAdmin = await SuperAdminSchemaModel.findOne({
            email: email,
    });
    return existAdmin;
}