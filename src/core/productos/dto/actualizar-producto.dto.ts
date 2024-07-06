import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ActualizarProductoRequest {
    @IsString()
    @IsNotEmpty()
    publicKey: string;

    @IsString()
    @IsOptional()
    nombre?: string;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsNumber()
    @IsOptional()
    precio?: number;

    @IsNumber()
    @IsOptional()
    stock?: number;

    @IsString()
    @IsOptional()
    fotoUrl?: string;
}