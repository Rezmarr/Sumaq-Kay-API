import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument, Types } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import { Usuario } from "../usuarios/usuario.schema";
import { Producto } from "../productos/producto.schema";

export type VentaDocument = HydratedDocument<Venta>;

@Schema({
    collection: 'ventas',
})
export class Venta extends Document {
    @Prop({
        required: true,
        type: String,
    })
    direccion: string;

    @Prop({
        required: true,
        type: Number,
    })
    telefono: number;

    @Prop({
        required: true,
        type: Number,
    })
    envio: number;

    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: Usuario.name,
    })
    cliente: Usuario;

    @Prop({
        required: true,
        type: [{
            cantidad: Number,
            precioTotal: Number,
            producto: { type: Types.ObjectId, ref: Producto.name }
        }],
    })
    productos: {
        cantidad: number,
        precioTotal: number,
        producto: Producto,
    }[];

    @Prop({
        required: true,
        type: Date,
    })
    fecha: Date;

    @Prop({
        type: String,
        length: 36,
        default: uuidv4,
        index: { unique: true }
    })
    publicKey: string;
}

export const VentaSchema = SchemaFactory.createForClass(Venta);