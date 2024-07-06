import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from 'src/database/schemas/usuarios/usuario.schema';
import { AuthRepository } from 'src/database/repositories/auth/auth.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Usuario.name, schema: UsuarioSchema }
    ]),
    JwtModule
  ],
  controllers: [AuthController],
  providers: [AuthService, ...[AuthRepository]]
})
export class AuthModule {}
