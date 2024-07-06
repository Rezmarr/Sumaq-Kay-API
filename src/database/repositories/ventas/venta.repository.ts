import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CheckoutRequest } from "src/core/ventas/dto/checkout.dto";
import { Venta, VentaDocument } from "src/database/schemas/ventas/venta.schema";

@Injectable()
export class VentaRepository {
    constructor(
        @InjectModel(Venta.name)
        private readonly model: Model<VentaDocument>,
    ) { }

    public obtenerTodos(clienteId: string) {
        return this.model.find({ cliente: clienteId }).select('-_id -__v').exec();
    }

    public obtenerPorPublickey(publicKey: string) {
        return this.model.findOne({ publicKey })
            .populate('productos.producto', '-__v')
            .select('-__v')
            .exec();
    }

    public crear(data: CheckoutRequest) {
        return new this.model(data).save();
    }

}