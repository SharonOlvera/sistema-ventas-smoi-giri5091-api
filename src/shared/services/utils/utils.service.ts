import { Injectable } from '@nestjs/common';
import { RESPONSE_PASSTHROUGH_METADATA } from '@nestjs/common/constants';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilsService{
    constructor(private jwt: JwtService) {}

    async hashPassword(password: string): Promise<string>{
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(password, salt);
    }
    
    async checkPassword(
    plain: string,
    hash: string
  ): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }

  async generateJWT(payload: any): Promise<string> {
    return this.jwt.sign(payload);
  }
}
