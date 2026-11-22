import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalasModule } from './salas/salas.module.js';
import { GenerosModule } from './generos/generos.module.js';
import { ClientesModule } from './clientes/clientes.module.js';
import { PeliculasModule } from './peliculas/peliculas.module.js';
import { FuncionesModule } from './funciones/funciones.module.js';
import { BoletosModule } from './boletos/boletos.module.js';
import { AuthModule } from './auth/auth.module.js';
import { Usuario } from './auth/entities/usuario.entity.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: Number(config.get<number>('DB_PORT', 5432)),
        username: config.get<string>('DB_USERNAME', 'postgres'),
        password: config.get<string>('DB_PASSWORD', ''),
        database: config.get<string>('DB_DATABASE', 'sistema_cine_taw'),
        autoLoadEntities: true,
        entities: [Usuario],
        synchronize: true,
      }),
    }),
    SalasModule,
    GenerosModule,
    ClientesModule,
    PeliculasModule,
    FuncionesModule,
    BoletosModule,
    AuthModule,
  ],
})
export class AppModule {}