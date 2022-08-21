import { Field, Float, ID, InputType, Int, ObjectType } from 'type-graphql';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, ManyToMany, JoinTable, PrimaryColumn, Double } from 'typeorm'
import { Product } from './Product';
import { User } from './User';

@Entity()
@ObjectType()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID, { nullable: true })
    id!: number;

    @ManyToOne(() => User, user => user.orders)
    @Field(() => User)
    user: User;

    @ManyToMany(() => Product, product => product.orders)
    @JoinTable({
        name: 'order_has_products', // table name for the junction table of this relation
    })
    @Field(() => [Product])
    products: Product[];

    @Column({ nullable: false, type: "float", default: 0.0 })
    @Field(() => Float)
    totalPrice: number;

    @CreateDateColumn()
    @Field(() => String)
    createdAt!: Date;
}

@Entity("order_has_products")
export class OrderHasProducts extends BaseEntity {
    @Column()
    @Field(() => Int)
    quantity: number;

    @PrimaryColumn()
    @Field(() => ID)
    orderId: number;

    @PrimaryColumn()
    @Field(() => ID)
    productId: number;
}
