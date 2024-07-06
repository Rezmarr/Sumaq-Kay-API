import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ProductosModule } from './core/productos/productos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RouterMiddleware } from './common/config';
import { AuthModule } from './core/auth/auth.module';
import { RecomendacionesModule } from './core/recomendaciones/recomendaciones.module';
import { VentasModule } from './core/ventas/ventas.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    ProductosModule,
    AuthModule,
    RecomendacionesModule,
    VentasModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RouterMiddleware).forRoutes('*');
  }
}
