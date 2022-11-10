import { randomUUID } from "crypto";
import fs from 'fs';
import path from "path";
import { json } from "stream/consumers";
import { IRepository } from "./interface";

export class InMemoryRepository<Type extends GenericEntity> implements IRepository<Type> {
  private entities: Array<Type> = [];
  private readonly dbFilePath = path.resolve(__dirname, '../../../db.json');
  private readonly fileEncoding = 'utf8';

  constructor(private readonly makeType: (entity: Object) => Type) {}

  async list(): Promise<Type[]> {
    await this.load();
    return this.entities;
  }

  async get(entityId: number | string): Promise<Type | undefined> {
    await this.load();
    return this.entities.find((entity) => {
      return entity.getId() === entityId;
    });
  }

  async search(filter: Object): Promise<Type[]> {
    await this.load();
    return this.entities.filter((entity) => {
      for (const [key, value] of Object.entries(filter)) {
        if (!entity[key] || entity[key] !== value) {
          return false;
        }
      }

      return true;
    });
  }

  async persist(entity: Type): Promise<Type> {
    await this.load();
    
    entity.setId(randomUUID());
    this.entities.push(entity);

    await this.commit();

    return entity;
  }

  async remove(entityId: number | string): Promise<void> {
    await this.load();

    const index = this.entities.findIndex((entity) => {
      return entity.getId() === entityId;
    });

    this.entities.splice(index, 1);
    
    await this.commit();
  }

  // TODO: persist data apart for each repository
  private async commit() {
    try {
      const data = JSON.stringify(this.entities.filter((entity: Type) => !!entity?.getId()));
      await fs.promises.writeFile(this.dbFilePath, data, { encoding: this.fileEncoding, flag: 'w' });
    } catch(e) {
      throw e;
    }
  }

  // TODO: persist data apart for each repository and read from there
  private async load() {
    try {
      const data = await fs.promises.readFile(this.dbFilePath, { encoding: this.fileEncoding, flag: 'a+' });
      const jsonData = data.trim() ? JSON.parse(data.trim()) : [];
      this.entities = jsonData.filter((entity: Object) => !!entity).map(this.makeType);
    } catch(e) {
      throw e;
    }
  }
}

interface GenericEntity {
  getId: () => string | number;
  setId: (id: string | number) => void;
}
