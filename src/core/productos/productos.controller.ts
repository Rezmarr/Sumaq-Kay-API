import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { request } from 'http';
import { ResponseAPI } from 'src/common/interfaces/response-API.interface';
import { CrearProductoRequest } from './dto/crear-producto.dto';
import { ActualizarProductoRequest } from './dto/actualizar-producto.dto';

@Controller('productos')
export class ProductosController {
    constructor(
        private readonly productosService: ProductosService,
    ) {}

    @Get()
    obtenerProductos(): Promise<ResponseAPI> {
        return this.productosService.obtenerProductos();
    }

    @Get(':publicKey')
    obtenerProducto(
        @Param('publicKey')
        publicKey: string,
    ): Promise<ResponseAPI> {
        return this.productosService.obtenerProducto(publicKey);
    }

    @Post()
    crearProducto(
        @Body()
        request: CrearProductoRequest,
    ): Promise<ResponseAPI> {
        return this.productosService.crearProducto(request);
    }

    @Patch()
    actualizarProducto(
        @Body()
        request: ActualizarProductoRequest,
    ): Promise<ResponseAPI> {
        return this.productosService.actualizarProducto(request);
    }

    @Patch(':publicKey')
    eliminarProducto(
        @Param('publicKey')
        publicKey: string,
    ): Promise<ResponseAPI> {
        return this.productosService.eliminarProducto(publicKey);
    }
}
