import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export type ProductoDocument = HydratedDocument<Producto>;

@Schema({
    collection: 'productos',
})
export class Producto extends Document {
    @Prop({
        required: true,
        type: String,
    })
    nombre: string;

    @Prop({
        required: true,
        type: String,
        maxlength: 500,
    })
    descripcion: string;

    @Prop({
        required: true,
        type: Number,
    })
    precio: number;

    @Prop({
        required: true,
        type: Number,
    })
    stock: number;

    @Prop({
        type: String,
        length: 36,
        default: uuidv4,
        index: { unique: true }
    })
    publicKey: string;

    @Prop({
        type: Boolean,
        default: true,
    })
    activo: boolean;

    @Prop({
        required: true,
        type: String,
    })
    fotoUrl: string;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);