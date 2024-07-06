import { Injectable } from '@nestjs/common';
import { CheckoutRequest, CheckoutResponse } from './dto/checkout.dto';
import { VentaRepository } from 'src/database/repositories/ventas/venta.repository';
import { ResponseAPI } from 'src/common/interfaces/response-API.interface';

@Injectable()
export class VentasService {

    constructor(
        private readonly ventaRepository: VentaRepository,
    ) { }

    async checkout(request: CheckoutRequest): Promise<ResponseAPI> {
        const venta = await this.ventaRepository.crear(request);

        return {
            message: 'Venta creada correctamente',
            data: venta.publicKey,
        };
    }

    async obtenerVenta(publicKey: string): Promise<ResponseAPI<CheckoutResponse>> {

        const venta = await this.ventaRepository.obtenerPorPublickey(publicKey);

        const response: CheckoutResponse = {
            publicKey: venta.publicKey,
            direccion: venta.direccion,
            telefono: venta.telefono,
            productos: venta.productos,
            envio: venta.envio,
            fecha: venta.fecha,
        };

        return {
            message: 'Recibo obtenido correctamente',
            data: response,
        };
    }
}
