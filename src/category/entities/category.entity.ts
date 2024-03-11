import { Column, Entity, OneToMany} from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { ProductEntity } from "../../product/entities/producto.entity";

@Entity({name:"category"})
export class CategoryEntity extends BaseEntity{
    @Column() // por defecto toma ese nombre y que es no null
    categoryName!: string; 

    @OneToMany(()=>ProductEntity,(product)=>product.category)
    products!:ProductEntity[]
}