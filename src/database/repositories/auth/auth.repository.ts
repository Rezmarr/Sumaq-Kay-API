import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Producto, ProductoDocument } from "../../schemas/productos/producto.schema";
import { Model } from "mongoose";
import { ActualizarProductoRequest } from "src/core/productos/dto/actualizar-producto.dto";
import { CrearProductoRequest } from "src/core/productos/dto/crear-producto.dto";
import { Usuario, UsuarioDocument } from "src/database/schemas/usuarios/usuario.schema";
import { RegistrarUsuarioRequest } from "src/core/auth/dto/registrar-usuario.dto";

@Injectable()
export class AuthRepository {
    constructor(
        @InjectModel(Usuario.name)
        private readonly model: Model<UsuarioDocument>,
    ) { }

    public obtenerTodos() {
        return this.model.find().select('-__v -password').exec();
    }

    public obtenerPorPublickey(publicKey: string) {
        return this.model.findOne({ publicKey }).select('-__v -password').exec();
    }

    public obtenerPorEmail(email: string) {
        return this.model.findOne({ email }).select('-__v -password').exec();
    }

    public obtenerConPassword(email: string) {
        return this.model.findOne({email}).select('-__v').exec();
    }

    public crear(data: RegistrarUsuarioRequest) {
        return new this.model(data).save();
    }

    public obtenerPorId(id: string) {
        return this.model.findById(id).select('-__v -password').exec();
    }
}