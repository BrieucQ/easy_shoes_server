import { Field, ID, InputType, ObjectType } from 'type-graphql';
import {Entity,Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToMany} from 'typeorm'
import { Order } from './Order';

@Entity()
@ObjectType()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID, { nullable: true })
    id!: number;

    @Column()
    @Field(() => String)
    productName?: string;

    @Column()
    @Field(() => String)
    description?: string;

    @Column()
    @Field(() => String)
    picture!: string;

    @Column()
    @Field(() => Number)
    quantity!: number;

    @Column()
    @Field(() => Number)
    price!: number;

    @ManyToMany(() => Order, order => order.products)
    @Field(() => [Order])
    orders: Order[];

    @CreateDateColumn()
    @Field(() => String)
    createdAt!: Date;

    @UpdateDateColumn()
    @Field(() => String)
    updatedAt!: Date;
}

// Input type for Product
@InputType()
export class ProductInput {
    @Field()
    productName!: string;

    @Field()
    description!: string;
    
    @Field()
    picture!: string;
    
    @Field()
    quantity!: number;
    
    @Field()
    price!: number;
}
