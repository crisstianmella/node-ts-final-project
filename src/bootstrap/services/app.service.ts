import { DB_CONFIG } from '../interfaces/dbConfig.interface'

export class AppService {
   static get PORT(): number {
      return +process.env.PORT || 3000
   }

   static get DBConfig(): DB_CONFIG {
      return {
         host: process.env.DB_HOST || 'localhost',
         port: +process.env.DB_PORT || 3308,
         // TODO: Cambiar al ejecutar el script 'yarn run dev'
         //entities: [process.env.DB_ENTITIES || 'src/**/*.entity.ts'],
         // TODO: Cambiar al ejecutar el script 'yarn run build' y luego 'yarn run prod'
         entities: [process.env.DB_ENTITIES || 'dist/**/*.entity.js'],
         username: process.env.DB_USER || 'adminUser',
         password: process.env.DB_PASS || 'proyectofinal12345',
         database: process.env.DB_NAME || 'db_store',
         synchronize: process.env.DB_SYNC === 'true' ? true : true,
         logging: process.env.DB_LOGG === 'true' ? true : false,
      }
   }
}
