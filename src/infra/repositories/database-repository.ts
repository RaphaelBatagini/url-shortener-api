import { getConnection, Repository } from "typeorm";
import { IRepository } from "./interface";

export class DatabaseRepository<Type extends GenericEntity, Model extends GenericModel> implements IRepository<Type> {
  constructor(
    private readonly repository: Repository<Model>,
    private readonly modelToTypeConverter: ModelToTypeConverter<Model, Type>,
    private readonly typeToModelConverter: TypeToModelConverter<Type, Model>,
  ) {}

  async list(): Promise<Type[]> {
    const models = await this.repository.find();
    return models.map(model => this.modelToTypeConverter(model));
  }

  async get(entityId: number | string): Promise<Type | undefined> {
    const model = await this.repository.findOne(entityId);
    return this.modelToTypeConverter(model);
  }

  async search(filter: Object): Promise<Type[]> {
    const models = await this.repository.find({ where: filter });
    return models.map(model => this.modelToTypeConverter(model));
  }

  async persist(entity: Type): Promise<Type> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    const model = this.typeToModelConverter(entity);
    await queryRunner.manager.save(model);
    entity.setId(model.id);

    return entity;
  }

  async remove(entityId: number | string): Promise<void> {
    const model = await this.repository.findOne(entityId);
    await this.repository.remove(model);
  }
}

interface GenericEntity {
  getId: () => string | number;
  setId: (id: string | number) => void;
}

interface GenericModel {
  id?: string | number;
}

interface ModelToTypeConverter<Model, Type> {
  (model: Model): Type;
}

interface TypeToModelConverter<Type, Model> {
  (entity: Type): Model;
}
