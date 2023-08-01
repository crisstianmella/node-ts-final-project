// Generics Typescript
export interface IEntity<Properties, PropertiesUpdate> {
   properties: () => Properties
   delete: () => void
   update: (flieds: PropertiesUpdate) => void
}
