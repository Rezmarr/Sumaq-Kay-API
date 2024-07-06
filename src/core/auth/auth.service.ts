import { Injectable, Logger } from '@nestjs/common';
import { AuthRepository } from 'src/database/repositories/auth/auth.repository';
import { RegistrarUsuarioRequest } from './dto/registrar-usuario.dto';
import { ResponseAPI } from 'src/common/interfaces/response-API.interface';
import { TipoRepuestaEnum } from 'src/common/enums/tipo-respuesta.enum';
import { LoginRequest, LoginResponse, UsuarioInfo } from './dto/login.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService
    ) { }

    async registro(request: RegistrarUsuarioRequest): Promise<ResponseAPI> {
        this.logger.log('Comprobando si el usuario ya existe');
        const usuario = await this.authRepository.obtenerPorEmail(request.email);

        if (usuario) {
            return {
                message: 'El usuario ya existe',
                tipoRespuesta: TipoRepuestaEnum.Error,
            }
        }

        this.logger.log('Registrando usuario');
        const encryptedPassword = await bcrypt.hash(request.password, 10);
        request.password = encryptedPassword;
        const response = await this.authRepository.crear(request);
        this.logger.log('Usuario registrado');

        const usuarioData = await this.authRepository.obtenerPorPublickey(response.publicKey);

        return {
            message: 'Usuario registrado correctamente',
            tipoRespuesta: TipoRepuestaEnum.Success,
            data: usuarioData,
        }
    }

    async login(request: LoginRequest): Promise<ResponseAPI<LoginResponse>> {

        this.logger.log('Comprobando si el usuario existe');
        const usuario = await this.authRepository.obtenerConPassword(request.email);

        if (!usuario) {
            return {
                message: 'El usuario no existe',
                tipoRespuesta: TipoRepuestaEnum.Error,
            }
        }

        this.logger.log('Comprobando si la contraseña es correcta');
        const validPassword = await bcrypt.compare(request.password, usuario.password);
        
        if (!validPassword) {
            return {
                message: 'Contraseña incorrecta',
                tipoRespuesta: TipoRepuestaEnum.Error,
            }
        }

        const userForToken = {
            id: usuario._id,
            email: usuario.email,
        }

        const token = await this.jwtService.signAsync(userForToken, { secret: process.env.SECRET, expiresIn: '24h' });

        const usuarioResponse: LoginResponse = {
            usuario: {
                id: usuario._id as string,
                nombre: usuario.nombre,
                apellidoPaterno: usuario.apellidoPaterno,
                apellidoMaterno: usuario.apellidoMaterno,
                token,
            }
        }

        return {
            message: 'Login correcto',
            tipoRespuesta: TipoRepuestaEnum.Success,
            data: usuarioResponse,
        }
    }

    async logout(): Promise<ResponseAPI> {
        return {
            message: 'Logout correcto',
            tipoRespuesta: TipoRepuestaEnum.Success,
        }
    }
}
