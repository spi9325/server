import { IsNotEmpty, IsString } from "class-validator";

export class LocationDto {
    @IsNotEmpty()
    @IsString()
    lat: string;

    @IsNotEmpty()
    @IsString()
    log: string;
}
