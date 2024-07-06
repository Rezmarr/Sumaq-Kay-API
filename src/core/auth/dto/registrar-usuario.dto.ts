import { IsNotEmpty, IsString } from "class-validator";

export class RegistrarUsuarioRequest {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    apellidoPaterno: string;

    @IsString()
    @IsNotEmpty()
    apellidoMaterno: string;

    @IsString()
    @IsNotEmpty()
    rol: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}