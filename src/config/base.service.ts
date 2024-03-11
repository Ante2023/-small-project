import { EntityTarget, Repository, ObjectLiteral } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ConfigServer } from "./config";

//Esta clase permite exe e inicializar el crud del reposiorio
//BaseService<T>  es una clase Generica, exe c/entidad que recibe en T. Serán != objetos o entidades
// a su vez. las entidades en T, extienden de BaseEntity, todos sus datos/funciones miembros
export class BaseService<T extends BaseEntity> extends ConfigServer {
  //BaseService (generico) resuele los modulos desde cada entidad T como user, paurchase, customer, etc
  public execRepository!: Promise<Repository<T>>; // atributo
  constructor(private getEntity: EntityTarget<T>) {
    super();
    this.execRepository = this.initRepository(getEntity);
  }

  //función que inicializa el repositorio
  // async initRepository<T extends BaseEntity>(
  //   e: EntityTarget<T>
  // ): Promise<Repository<T>> {
    async initRepository<T extends ObjectLiteral>(e: EntityTarget<T>): Promise<Repository<T>> {
    const getConn = await this.dbConnect();
    return getConn.getRepository(e);
  }
}
