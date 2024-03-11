import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { CategoryEntity } from "../../category/entities/category.entity";
import { PurchaseProductEntity } from "../../purchase/entities/purchases-products.entity";

@Entity({ name: "product" })
export class ProductEntity extends BaseEntity {
  @Column() // por defecto toma ese nombre y que es no null
  productName!: string;
  @Column()
  description!: string;
  @Column()
  price!: number;

    //category.products matchea con el atributo en CategoryEntity
    @ManyToOne(() => CategoryEntity, (category) => category.products)
    @JoinColumn({ name: "category_id" })
    category!: CategoryEntity;

    @OneToMany(
      () => PurchaseProductEntity,
      (purchaseProduct) => purchaseProduct.product
    )
    purchaseProduct!: PurchaseProductEntity[];
}
