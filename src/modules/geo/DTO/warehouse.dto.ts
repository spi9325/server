import { IsNotEmpty, IsString } from "class-validator";

export class Warehouse {

    @IsNotEmpty()
    @IsString()
    type:string

    @IsNotEmpty()
    @IsString()
    lat: string;

    @IsNotEmpty()
    @IsString()
    log: string;
}
