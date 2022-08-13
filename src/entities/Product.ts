import { Field, ID, InputType, ObjectType } from 'type-graphql';
import {Entity,Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn} from 'typeorm'

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
