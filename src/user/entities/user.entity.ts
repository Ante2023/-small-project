import { Column, Entity, OneToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { CustomerEntity } from "../../customer/entities/customer.entity";

@Entity({ name: "user" })
export class UserEntity extends BaseEntity {
  @Column() // por defecto toma ese nombre y que es no null
  name!: string;

  @Column({ length: 100 }) // por defecto toma ese nombre y que es no null
  lastname!: string;

  @Column() // por defecto toma ese nombre y que es no null
  username!: string; // ! indica que no será null

  @Column() // por defecto toma ese nombre y que es no null
  email!: string;

  // @Column({nullable:true}) // por defecto toma ese nombre y que es no null
  // jobPosition?:string; // ? que sea opcional por el null

  @Column() // por defecto toma ese nombre y que es no null
  password!: string;

  @Column() // por defecto toma ese nombre y que es no null
  city!: string;

  // @Column({ nullable: true })
  // numberPhone?: number;

  @Column()
  province!: string;

  // llamo a CustomerEntity y lo uso (customerEntity)=> uustomer.user
  @OneToOne(() => CustomerEntity, (customer) => customer.user)
  customer!: CustomerEntity;
}
