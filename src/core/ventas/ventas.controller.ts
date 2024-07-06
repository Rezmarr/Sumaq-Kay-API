import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { CheckoutRequest, CheckoutResponse } from './dto/checkout.dto';
import { ResponseAPI } from 'src/common/interfaces/response-API.interface';

@Controller('checkout')
export class VentasController {
    constructor(
        private readonly ventasService: VentasService,
    ) { }

    @Post()
    async checkout(
        @Body()
        request: CheckoutRequest
    ): Promise<ResponseAPI> {
        return this.ventasService.checkout(request);
    }

    @Get(':publicKey')
    async obtenerVenta(
        @Param('publicKey')
        publicKey: string
    ): Promise<ResponseAPI<CheckoutResponse>> {
        return this.ventasService.obtenerVenta(publicKey);
    }
}
