import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { createUserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('newUser')
  @ApiBody({
    type: createUserDto,
    examples: {
      one: {
        summary: 'Ejemplo Json de un nuevo usuario',
        value: {
          documentTypeId: 'Identificador del tipo de documento Ej: 1',
          document: 'Documento de identididad del usuario EJ: "1130595250"',
          name: 'Nombres del usuario Ej: "Jhon Gabriel"',
          last_name: 'Apellidos del usuario Ej: "Ospina Orozco"',
          email:
            'Correo electronico del usuario Ej: "jhonospina2711@gmail.com"',
          cel_phone: 'Número de celular Ej: "3185839956"',
          birth_date: 'Fecha de nacimiento Ej: "1987/07/11"',
        },
      },
    },
  })
  @ApiOperation({
    summary: 'Api para insertar un nuevo usuario',
    description: 'Esta api permite el registro de un nuevo usuario',
  })
  async createNewUser(@Body() payload: createUserDto) {
    try {
      return this.userService.createNewUser(payload);
    } catch (error) {
      throw new HttpException(`Se presento el siguiente error: ${error}`, 400);
    }
  }
}
