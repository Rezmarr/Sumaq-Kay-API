import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { Producto, ProductoSchema } from 'src/database/schemas/productos/producto.schema';
import { ProductoRepository } from 'src/database/repositories/productos/producto.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Producto.name, schema: ProductoSchema }
    ])
  ],
  providers: [ProductosService, ...[ProductoRepository]],
  controllers: [ProductosController]
})
export class ProductosModule {}
