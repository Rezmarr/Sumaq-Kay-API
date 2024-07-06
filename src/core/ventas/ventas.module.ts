import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VentasController } from './ventas.controller';
import { VentasService } from './ventas.service';
import { Venta, VentaSchema } from 'src/database/schemas/ventas/venta.schema';
import { VentaRepository } from 'src/database/repositories/ventas/venta.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Venta.name, schema: VentaSchema }
    ])
  ],
  controllers: [VentasController],
  providers: [VentasService, VentaRepository]
})
export class VentasModule {}
