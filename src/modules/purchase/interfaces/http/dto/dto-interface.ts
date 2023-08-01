// Design Patterns: Facade
// Design Patterns: Singleton
export abstract class DTO<Properties, DTO> {
   abstract execute(data: Properties): DTO
}
