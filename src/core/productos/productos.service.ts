import { Injectable, Logger } from '@nestjs/common';
import { TipoRepuestaEnum } from 'src/common/enums/tipo-respuesta.enum';
import { ResponseAPI } from 'src/common/interfaces/response-API.interface';

import { CrearProductoRequest } from './dto/crear-producto.dto';
import { ActualizarProductoRequest } from './dto/actualizar-producto.dto';
import { ProductoRepository } from 'src/database/repositories/productos/producto.repository';

@Injectable()
export class ProductosService {
    private readonly logger = new Logger(ProductosService.name);

    constructor(
        private readonly productoRepository: ProductoRepository,
    ) { }

    async obtenerProductos(): Promise<ResponseAPI> {
        this.logger.log('Obteniendo productos');
        const productos = await this.productoRepository.obtenerTodos();
        this.logger.log('Productos obtenidos');

        return {
            message: 'Productos obtenidos correctamente',
            tipoRespuesta: TipoRepuestaEnum.Success,
            data: productos,
        }
    }

    async obtenerProducto(publicKey: string): Promise<ResponseAPI> {
        this.logger.log('Obteniendo producto');
        const producto = await this.productoRepository.obtenerPorPublickey(publicKey);
        this.logger.log('Producto obtenido');

        return {
            message: 'Producto obtenido correctamente',
            tipoRespuesta: TipoRepuestaEnum.Success,
            data: producto,
        }
    }

    async crearProducto(request: CrearProductoRequest): Promise<ResponseAPI> {
        this.logger.log('Creando producto');
        await this.productoRepository.crear(request);
        this.logger.log('Producto creado');

        return {
            message: 'Producto registrado correctamente',
            tipoRespuesta: TipoRepuestaEnum.Success,
        };
    }

    async actualizarProducto(request: ActualizarProductoRequest): Promise<ResponseAPI> {
        this.logger.log('Actualizando producto');
        await this.productoRepository.actualizar(request);
        this.logger.log('Producto actualizado');

        return {
            message: 'Producto actualizado correctamente',
            tipoRespuesta: TipoRepuestaEnum.Success,
        }
    }

    async eliminarProducto(publicKey: string) {
        this.logger.log('Eliminando producto');
        await this.productoRepository.eliminar(publicKey);
        this.logger.log('Producto eliminado');

        return {
            message: 'Producto eliminado correctamente',
            tipoRespuesta: TipoRepuestaEnum.Success,
        }
    }
}
