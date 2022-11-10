export interface IRepository<Type> {
  id?: number | string;
  list: () => Promise<Type[]>;
  get: (id: number | string) => Promise<Type>;
  search: (filter: Object) => Promise<Type[]>;
  persist: (entity: Type) => Promise<Type>;
  remove: (id: number | string) => Promise<void>;
}