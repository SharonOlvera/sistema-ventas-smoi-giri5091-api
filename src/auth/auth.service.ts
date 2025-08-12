import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) {}
    // Sustituye findUnique por findFirst para no depender de <username> como campo @unique
  async obtenerUsuario(username: string) {
    const user = await this.prisma.usuario.findFirst({
      where: { username },
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  // Para login, valida credenciales y retorna token
  async login(username: string, pass: string) {
    const user = await this.obtenerUsuario(username);
    const valid = await bcrypt.compare(pass, user.password);
    if (!valid) {
      throw new NotFoundException('Credenciales inválidas');
    }
    const payload = { sub: user.cveUsuario, username: user.username };
    return { access_token: this.jwtService.sign(payload) };
  }

  // Registro de nuevos usuarios
  async register(dto: {
    nombre: string;
    apellidos: string;
    correo: string;
    username: string;
    password: string;
  }) {
    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.usuario.create({
      data: { ...dto, password: hash },
    });
    // Retorna el usuario sin la contraseña
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;
    return rest;
  }
}
