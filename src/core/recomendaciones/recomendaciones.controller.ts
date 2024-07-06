import { Body, Controller, Post } from '@nestjs/common';
import { RecomendacionesService } from './recomendaciones.service';
import { request } from 'http';

@Controller('recomendaciones')
export class RecomendacionesController {
    constructor(
        private readonly recomendacionesService: RecomendacionesService,
    ) { }

    @Post()
    obtenerRecomendaciones(
        @Body()
        request: any,
    ): Promise<any> {
        return this.recomendacionesService.obtenerRecomendaciones(request);
    }
}
