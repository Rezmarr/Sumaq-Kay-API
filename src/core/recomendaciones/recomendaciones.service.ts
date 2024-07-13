import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { TipoRepuestaEnum } from 'src/common/enums/tipo-respuesta.enum';
import { ProductoRepository } from 'src/database/repositories/productos/producto.repository';
import { Producto } from 'src/database/schemas/productos/producto.schema';

@Injectable()
export class RecomendacionesService {

    constructor(
        private readonly productoRepository: ProductoRepository,
    ) { }

    private genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    private model = this.genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
    });

    private generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 100,
        responseMimeType: "text/plain",
    };

    async obtenerRecomendaciones(request: any): Promise<any> {

        const data: Producto[] = await this.productoRepository.obtenerTodos();

        const chatSession = this.model.startChat({
            generationConfig: this.generationConfig,
            history: [
                {
                    role: "user",
                    parts: [{ text: "Eres un cliente en una página web de ropa que busca asesoría sobre qué comprar, no te salgas del rol." }],
                },
                {
                    role: "model",
                    parts: [
                        { text: "No respondas con asteriscos, no trates de colocar negritas." },
                        { text: "Eres un asesor de venta de ropa en una tienda online llamada Sumaq Kay, no te salgas del rol y no te salgas del tema." },
                        { text: `En la web tenemos estos productos, recomienda solo dos que se asemejen a lo que el cliente busca. Solo indicales el producto y por qué deberían comprarlo basado en su preferencia. Solo recomienda lo que está incluido en estos productos: ${JSON.stringify(data)}` }
                    ],
                },
            ],
        });

        const resultObject = await chatSession.sendMessage(request.mensaje);
        const textResponse = resultObject.response.candidates[0].content.parts[0].text.replace(/\*/g, '');

        // const recomendaciones = data.filter(item => {
        //     const itemWords = item.descripcion.split(' ').map(word => word.toLowerCase());
        //     const textResponseWords = textResponse.split(' ').map(word => word.toLowerCase());
        //     return textResponse.includes(item.nombre) || itemWords.some(word => textResponseWords.includes(word));
        // });

        // const recomendaciones = data.filter(item => {
        //     return item.nombre.toLowerCase().split(' ').some(word => textResponse.toLowerCase().includes(word));
        // })

        const recomendaciones = data.filter(item => {
            return textResponse.toLowerCase().includes(item.nombre.toLowerCase());
        });

        return {
            message: 'Respuesta obtenida',
            tipoRespuesta: TipoRepuestaEnum.Success,
            data: {
                recomendaciones,
                respuesta: textResponse
            },
        }
    }
}
