import { Injectable } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwConstans } from 'src/constans/jwt.constans';

@Injectable()
export class UtilsService {

    constructor(private jwtSvc: JwtService) {}
    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }
   
    async checkPassword(password: string, encryptedPassword: string): Promise<Boolean> {
        return await bcrypt.compareSync (password, encryptedPassword);
    }

    async generateJWT (payload: any): Promise<string> {
        var jwt = await this.jwtSvc.signAsync(payload, {secret: jwConstans.secret});
         return jwt;
    }

    async getPayload(jwt: string): Promise<any> {
        var payload = await this.jwtSvc.verifyAsync(jwt, {secret: jwConstans.secret});
        const {iat, exp, ...data} = payload;

        return data;

    }

}
