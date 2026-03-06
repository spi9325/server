import { IsJWT, IsNotEmpty } from "class-validator";

export class SuperAdminTokenDto {
    @IsJWT()
    @IsNotEmpty()
    Token: string;
}
