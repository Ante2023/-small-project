import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { PurchaseEntity } from "../../purchase/entities/purchase.entity";

@Entity({ name: "customer" })
export class CustomerEntity extends BaseEntity {
  @Column() // por defecto toma ese nombre y que es no null
  address!: string;

  @Column() // por defecto toma ese nombre y que es no null
  dni!: number;

  // FK "user_id" que se crea en la DB y hace referencia a la clase UserEntity desde user.customer
  @OneToOne(() => UserEntity, (user) => user.customer) //tabla.campo
  @JoinColumn({ name: "user_id" })
  // user es un atributo de esta clase y de tipo UserEntity
  user!: UserEntity;

  @OneToMany(() => PurchaseEntity, (purchase) => purchase.customer)
  purchases!: PurchaseEntity[];
}
