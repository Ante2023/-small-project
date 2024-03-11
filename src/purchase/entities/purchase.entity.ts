import { Column, Entity, JoinColumn, ManyToOne,OneToMany} from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { CustomerEntity } from "../../customer/entities/customer.entity";
import { PurchaseProductEntity } from "./purchases-products.entity";

@Entity({name:"purchase"})
export class PurchaseEntity extends BaseEntity{
    @Column() // por defecto toma ese nombre y que es no null
    status!: string; 

    @Column({length:100}) // por defecto toma ese nombre y que es no null
    paymentMethod!:string;

    // llamo a CustomerEntity y lo uso (customerEntity)=> uustomer.user

    @ManyToOne(()=>CustomerEntity,(customer)=>customer.purchases) //tabla.campo para un array
    @JoinColumn({name:"customer_id"})
    // user es un atributo de esta clase y de tipo UserEntity
    customer!:CustomerEntity

    @OneToMany(()=>PurchaseProductEntity,(purchaseProduct)=>purchaseProduct.purchase)
    purchaseProduct!:PurchaseProductEntity[]
}