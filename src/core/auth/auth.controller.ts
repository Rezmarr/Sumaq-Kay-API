import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrarUsuarioRequest } from './dto/registrar-usuario.dto';
import { LoginRequest } from './dto/login.dto';
import { ResponseAPI } from 'src/common/interfaces/response-API.interface';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('registro')
    registro(
        @Body()
        request: RegistrarUsuarioRequest,
    ): Promise<ResponseAPI> {
        return this.authService.registro(request);
    }

    @Post('login')
    login(
        @Body()
        request: LoginRequest,
    ): Promise<ResponseAPI> {
        return this.authService.login(request);
    }

    @Post('logout')
    logout(): Promise<ResponseAPI> {
        return this.authService.logout();
    }
}
