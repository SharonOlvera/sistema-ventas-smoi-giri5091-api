import { Module } from '@nestjs/common';
import { TareasModule } from './tareas/tareas.module';
import { UtilsService } from './shared/services/utils/utils.service';
import {JwtService} from '@nestjs/jwt';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [TareasModule, UsuariosModule],
  controllers: [],
  providers: [JwtService, UtilsService],
})
export class AppModule {}
