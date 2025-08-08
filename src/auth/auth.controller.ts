import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UtilsService } from "src/shared/services/utils/utils.service";
import { AuthDto } from "src/shared/dto/auth.dto";



@Controller('auth')
export class AuthController{
    constructor(private authSvc: AuthService,
                private utilsSvc: UtilsService){}

    @Post()
    @HttpCode(HttpStatus.OK)
    async iniciarSesion(@Body() data:AuthDto) {
        //
        const {username, password} = data;
        //
        const usuario= await this.authSvc.obtenerUsuario(username);
        //
        if (!usuario){
            throw new UnauthorizedException('El usuario y/o contraseña es incorrecto');
        }
        //
        if (await this.utilsSvc.checkPassword(password, usuario.password)) {
            //
            const { password, fechaRegistro, ...payload } = usuario;
            const jwt = await this.utilsSvc.generateJWT(payload);

            return {token:jwt};

        } else {
            //
            throw new UnauthorizedException('El usuario y/o contraseña es incorrecto');
        }

    }
}