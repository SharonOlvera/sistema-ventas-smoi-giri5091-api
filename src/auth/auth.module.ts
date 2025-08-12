import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

// Módulo global que exporta PrismaService (ver más abajo)
import { PrismaModule } from 'src/prisma/prisma.module';

// src/auth/auth.module.ts
@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'mi-secreto',
      signOptions: { expiresIn: '1h' }
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule], // ← ¡aquí!
})
export class AuthModule {}
