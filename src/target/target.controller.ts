import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { createTargetDto } from './dtos/createTarget.dto';
import { updateTargetDto } from './dtos/updateTarget.dto';
import { TargetService } from './target.service';

@ApiTags('Target')
@Controller('v1/target')
export class TargetController {
  constructor(private readonly targetService: TargetService) {}

  @Post('newTarget')
  @ApiBody({
    type: createTargetDto,
    examples: {
      one: {
        summary: 'Ejemplo Json registrar nuevo target',
        value: {
          name: 'Nombre target, valores por defecto: [NEW,FREQUENT,PREMIUM]',
          min_cant:
            'Es la cantidad mínima de préstamos pedidos en el último año.',
          max_cant:
            'Es la cantidad máxima de préstamos pedidos en el último año.',
          min_amount_total:
            'Es el volumen mínimo de préstamo tomado en el último año.',
          max_amount_total:
            'Es el volumen máximo de préstamo tomado en el último año.',
          rate: 'Tasa de interés (en formato decimal).',
          max: 'Cantidad máxima a solicitar por préstamo',
        },
      },
    },
  })
  @ApiOperation({
    summary: 'Api para insertar nuevo target',
    description: 'Inserta en base de datos un nuevo target',
  })
  async createTarget(@Body() payload: createTargetDto): Promise<{
    success: boolean;
    data: any;
  }> {
    try {
      return await this.targetService.createTarget(payload);
    } catch (error) {
      throw new HttpException(`Se presento el siguiente error: ${error}`, 400);
    }
  }

  @Put(':name')
  @ApiBody({
    type: updateTargetDto,
    examples: {
      one: {
        summary: 'Ejemplo Json actualización de un target',
        value: {
          name: 'Actualizar el nombre del target, el nombre es unico en la BD',
          min_cant:
            'Valor actualiar de la cantidad mínima de préstamos pedidos en el último año.',
          max_cant:
            'Valor actualizar de la cantidad máxima de préstamos pedidos en el último año.',
          min_amount_total:
            'Valor actualizar del volumen mínimo de préstamo tomado en el último año.',
          max_amount_total:
            'Valor actualizar del volumen máximo de préstamo tomado en el último año.',
          rate: 'Valor actualizar la tasa de interés (en formato decimal).',
          max: 'Valor actualizar de la Cantidad máxima a solicitar por préstamo',
        },
      },
    },
  })
  @ApiOperation({
    summary: 'Api para actualizar el target',
    description: 'Actualiza los datos del target',
  })
  async updateTarget(
    @Param('name') name: string,
    @Body() payload: updateTargetDto,
  ): Promise<
    | BadRequestException
    | {
        success: boolean;
        data: any;
      }
  > {
    try {
      return await this.targetService.updateTarget(name, payload);
    } catch (error) {
      throw new HttpException(`Se presento el siguiente error: ${error}`, 400);
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Api obtiene todos los target',
    description: 'Obtiene de BD el listado de todos los target',
  })
  async getAllTarget(): Promise<{
    success: boolean;
    data: any;
  }> {
    try {
      return this.targetService.findAll();
    } catch (error) {
      throw new HttpException(`Se presentoel siguiente error: ${error}`, 400);
    }
  }
}
