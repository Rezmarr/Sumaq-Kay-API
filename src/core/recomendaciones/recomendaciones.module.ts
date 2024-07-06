import { Module } from '@nestjs/common';
import { RecomendacionesController } from './recomendaciones.controller';
import { RecomendacionesService } from './recomendaciones.service';
import { ProductoRepository } from 'src/database/repositories/productos/producto.repository';
import { Producto, ProductoSchema } from 'src/database/schemas/productos/producto.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Producto.name, schema: ProductoSchema }
    ])
  ],
  controllers: [RecomendacionesController],
  providers: [RecomendacionesService, ProductoRepository]
})
export class RecomendacionesModule {}
