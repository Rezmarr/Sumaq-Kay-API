import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsDate, IsDefined, IsMongoId, IsNotEmpty, IsNumber, IsString, Validate, ValidateNested } from "class-validator";
import { Producto } from "src/database/schemas/productos/producto.schema";

export class ProductosCheckout {
    @IsDefined()
    @IsNumber()
    readonly cantidad: number;

    @IsDefined()
    @IsNumber()
    readonly precioTotal: number;

    @IsNotEmpty()
    @IsMongoId()
    readonly producto: Producto;
}

export class CheckoutRequest {
    @IsNotEmpty()
    @IsString()
    readonly direccion: string;

    @IsDefined()
    @IsNumber()
    readonly telefono: number;

    @IsDefined()
    @IsArray()
    @ArrayNotEmpty()
    @Type(() => ProductosCheckout)
    @ValidateNested({ each: true })
    readonly productos: ProductosCheckout[];

    @IsDefined()
    @IsNumber()
    readonly envio: number;

    @IsNotEmpty()
    @IsMongoId()
    readonly cliente: string;

    @IsDefined()
    @IsDate()
    readonly fecha: Date;
}

export class CheckoutResponse {
    @IsDefined()
    @IsString()
    readonly publicKey: string;

    @IsDefined()
    @IsString()
    readonly direccion: string;

    @IsDefined()
    @IsNumber()
    readonly telefono: number;

    @IsDefined()
    @IsArray()
    @ArrayNotEmpty()
    @Type(() => ProductosCheckout)
    @ValidateNested({ each: true })
    readonly productos: ProductosCheckout[];

    @IsDefined()
    @IsNumber()
    readonly envio: number;

    @IsDefined()
    @IsDate()
    readonly fecha: Date;
}