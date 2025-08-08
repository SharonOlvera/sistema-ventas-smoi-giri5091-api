import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { UtilsService } from 'src/shared/services/utils/utils.service';
import {JwtService} from '@nestjs/jwt';

@Module({
  providers: [AuthService,PrismaService,JwtService, UtilsService]
})
export class AuthModule {}
