import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { ERROR_GET_USER, ERROR_SAVE_USER } from 'src/common/constans/string';
import {
  responseError,
  responseSuccess,
} from 'src/common/httpResponse.interface';
import { PrismaService } from '../../libs/prisma/src/prisma.service';
import { createUserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createNewUser(payload: createUserDto): Promise<
    | {
        status: boolean;
        message: string;
      }
    | {
        status: boolean;
        data: any;
      }
  > {
    try {
      const validateUserRegister = await this.validateUserRegister(
        payload.document,
      );

      if (validateUserRegister) {
        const response = {
          status: false,
          message: `El usuario identificado con documento No: ${payload.document}, !Se encuentra registrado!`,
        };

        return responseError(response.message, response.status);
      }
      const {
        documentTypeId,
        document,
        name,
        last_name,
        email,
        cel_phone,
        birth_date,
      } = payload;

      const dataUser = {
        documentTypeId: documentTypeId,
        document: document,
        name: name,
        last_name: last_name,
        email: email,
        cel_phone: cel_phone,
        birth_date: new Date(birth_date),
      };
      const newUser = await this.saveNewUser(dataUser);
      const response = {
        success: true,
        data: {
          id: newUser['id'],
          documentTypeId: Number(newUser['documentTypeId']),
          document: newUser['document'],
          name: newUser['name'],
          last_name: newUser['last_name'],
          email: newUser['email'],
          cel_phone: newUser['cel_phone'],
          birth_date: newUser['birth_date'],
        },
      };
      return responseSuccess(response.data, response.success);
    } catch (error) {
      throw new BadRequestException(ERROR_SAVE_USER);
    }
  }

  async validateUserRegister(document: string): Promise<boolean> {
    try {
      const existBD = await this.prismaService.user.count({
        where: {
          document: document,
        },
      });
      if (existBD === 1) {
        return true;
      }
      return false;
    } catch (error) {
      throw new BadRequestException(ERROR_GET_USER);
    }
  }

  async saveNewUser(
    payload: createUserDto,
  ): Promise<User | BadRequestException> {
    try {
      const user = await this.prismaService.user.create({
        data: payload,
      });

      if (user) {
        return user;
      }
      return new BadRequestException(
        `Error guardando en bd el usuario con los siguientes datos: ${user}`,
      );
    } catch (error) {
      throw new BadRequestException(ERROR_SAVE_USER);
    }
  }
}
