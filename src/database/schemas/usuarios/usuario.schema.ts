import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema({
    collection: 'usuarios',
})
export class Usuario extends Document {
    @Prop({
        required: true,
        type: String,
    })
    nombre: string;

    @Prop({
        required: true,
        type: String,
    })
    apellidoPaterno: string;

    @Prop({
        required: true,
        type: String,
    })
    apellidoMaterno: string;

    @Prop({
        required: true,
        type: String,
    })
    rol: string;

    @Prop({
        required: true,
        type: String,
    })
    email: string;

    @Prop({
        required: true,
        type: String,
    })
    password: string;

    @Prop({
        type: String,
        length: 36,
        default: uuidv4,
        index: { unique: true }
    })
    publicKey: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);