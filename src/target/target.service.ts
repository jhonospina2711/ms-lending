import { BadRequestException, Injectable } from '@nestjs/common';
import { createTargetDto } from './dtos/createTarget.dto';
import {
  ERROR_CREATE_TARGET,
  ERROR_GET_ALL_TARGET,
  ERROR_GET_DATA_TARGET,
  ERROR_GET_ID_TARGET,
  ERROR_UPDATE_TARGET,
} from 'src/common/constans/string';
import { PrismaService } from 'src/prisma/prisma.service';
import { success } from 'src/common/httpResponse.interface';
import { updateTargetDto } from './dtos/updateTarget.dto';
import { Target } from '@prisma/client';

@Injectable()
export class TargetService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTarget(target: createTargetDto): Promise<{
    success: boolean;
    data: any;
  }> {
    try {
      const confTarget = await this.prismaService.target.create({
        data: target,
      });
      const response = {
        success: true,
        data: `Se inserto el target ${confTarget.name}`,
      };
      return success(response.data, response.success);
    } catch (error) {
      throw new BadRequestException(ERROR_CREATE_TARGET);
    }
  }

  async updateTarget(
    target: string,
    payload: updateTargetDto,
  ): Promise<
    | {
        success: boolean;
        data: any;
      }
    | BadRequestException
  > {
    try {
      const id = await this.findOneTarget(target);
      if (id != null) {
        const data = await this.getDataUpdateTarget(payload);
        const updatedTarget = await this.prismaService.target.updateMany({
          where: {
            id: id.id,
          },
          data,
        });
        const response = {
          success: true,
          data: `Se actualizo el target ${target}`,
        };
        if (updatedTarget.count === 1) {
          return success(response.data, response.success);
        }
      }
      return new BadRequestException(
        `Error no se encontro el Id ${id} registrado en BD`,
      );
    } catch (error) {
      throw new BadRequestException(`${ERROR_UPDATE_TARGET} ${error}`);
    }
  }

  async findOneTarget(name: string): Promise<{
    id: number;
  }> {
    try {
      const findOneTarget = await this.prismaService.target.findUnique({
        where: {
          name: name,
        },
        select: {
          id: true,
        },
      });
      return findOneTarget;
    } catch (error) {
      throw new BadRequestException(ERROR_GET_ID_TARGET);
    }
  }

  async findOneTargetReturnAll(name: string): Promise<Target> {
    try {
      const findOneTarget = await this.prismaService.target.findUnique({
        where: {
          name: name,
        },
      });
      return findOneTarget;
    } catch (error) {
      throw new BadRequestException(ERROR_GET_ID_TARGET);
    }
  }

  async getDataUpdateTarget(payload: updateTargetDto): Promise<any> {
    try {
      const {
        name,
        min_cant,
        max_cant,
        min_amount_total,
        max_amount_total,
        rate,
        max,
      } = payload;
      let data = {};
      if (name != undefined) {
        data = {
          ...data,
          name: name,
        };
      }
      if (min_cant != undefined) {
        data = {
          ...data,
          min_cant: min_cant,
        };
      }
      if (max_cant != undefined) {
        data = {
          ...data,
          max_cant: max_cant,
        };
      }
      if (min_amount_total != undefined) {
        data = {
          ...data,
          min_amount_total: min_amount_total,
        };
      }
      if (max_amount_total != undefined) {
        data = {
          ...data,
          max_amount_total: max_amount_total,
        };
      }
      if (rate != undefined) {
        data = {
          ...data,
          rate: rate,
        };
      }
      if (max != undefined) {
        data = {
          ...data,
          max: max,
        };
      }
      return data;
    } catch (error) {
      throw new BadRequestException(ERROR_GET_DATA_TARGET);
    }
  }

  async findAll(): Promise<{
    success: boolean;
    data: any;
  }> {
    try {
      const findAllTarget = await this.prismaService.target.findMany();
      const response = {
        success: true,
        data: findAllTarget,
      };
      return success(response.data, response.success);
    } catch (error) {
      throw new BadRequestException(ERROR_GET_ALL_TARGET);
    }
  }
}
