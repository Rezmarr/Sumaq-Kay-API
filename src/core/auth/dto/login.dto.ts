import { IsNotEmpty, IsString } from "class-validator";

export class LoginRequest {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export interface UsuarioInfo {
    id: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    token: string;
  }

export interface LoginResponse {
    usuario: UsuarioInfo;
}