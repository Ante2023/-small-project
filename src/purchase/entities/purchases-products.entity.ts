import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { ProductEntity } from "../../product/entities/producto.entity";
import { PurchaseEntity } from "./purchase.entity";
//del nombre del file, Reemplaso - por _
@Entity({ name: "purchases_products" })
export class PurchaseProductEntity extends BaseEntity {
  @Column() // por defecto toma ese nombre y que es no null
  quantityProduct!: number;

  @Column() // por defecto toma ese nombre y que es no null
  totalPrice!: number;

  @ManyToOne(() => PurchaseEntity, (purchase) => purchase.purchaseProduct) //tabla.campo para un array
  @JoinColumn({ name: "purchase_id" })
  purchase!: PurchaseEntity;

  @ManyToOne(() => ProductEntity, (product) => product.purchaseProduct) //tabla.campo para un array
  @JoinColumn({ name: "product_id" })
  product!: ProductEntity; // user es un atributo de esta clase y de tipo UserEntity
}
