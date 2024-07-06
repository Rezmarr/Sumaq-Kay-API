import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Producto, ProductoDocument } from "../../schemas/productos/producto.schema";
import { Model } from "mongoose";
import { ActualizarProductoRequest } from "src/core/productos/dto/actualizar-producto.dto";
import { CrearProductoRequest } from "src/core/productos/dto/crear-producto.dto";

@Injectable()
export class ProductoRepository {
    constructor(
        @InjectModel(Producto.name)
        private readonly model: Model<ProductoDocument>,
    ) { }

    public obtenerTodos() {
        return this.model.find({ activo: true }).select('-__v').exec();
    }

    public obtenerPorPublickey(publicKey: string) {
        return this.model.findOne({ publicKey }).select('-__v').exec();
    }

    public crear(data: CrearProductoRequest) {
        return new this.model(data).save();
    }

    public actualizar(data: ActualizarProductoRequest) {
        return this.model.findOneAndUpdate({ publicKey: data.publicKey }, data, { new: true }).exec();
    }

    public eliminar(publicKey: string) {
        return this.model.findOneAndUpdate({ publicKey }, { activo: false }, { new: true }).exec();
    }
}