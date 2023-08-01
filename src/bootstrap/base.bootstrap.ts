import { DataSource } from 'typeorm'
// Design Pattern: Facade -> Definicion de firma
export abstract class Bootstrap {
   abstract initialize(): Promise<string | Error | DataSource>
}
