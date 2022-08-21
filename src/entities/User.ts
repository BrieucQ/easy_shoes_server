import { Field, ID, InputType, ObjectType } from 'type-graphql';
import {Entity,Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToOne, JoinColumn, OneToMany} from 'typeorm'
import { Adress } from './Adress';
import { Order } from './Order';

@Entity()
@ObjectType()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID, { nullable: true })
    id: number;

    @Column()
    @Field(() => String)
    firstName?: string;

    @Column()
    @Field(() => String)
    lastName?: string;

    @Column()
    @Field(() => String)
    email: string;

    @Column()
    @Field(() => String)
    phone: string;

    @Column()
    @Field(() => String)
    password: string;

    @Column( {default: 'MEMBER'})
    @Field(() => String)
    role?: string;
    
    @OneToOne(() => Adress, adress => adress.id)
    @JoinColumn()
    @Field(() => Adress)
    adress: Adress;

    @OneToMany(() => Order, order => order.user)
    @Field(() => [Order])
    orders: Order[];

    @CreateDateColumn()
    @Field(() => String)
    createdAt!: string;

    @UpdateDateColumn()
    @Field(() => String)
    updatedAt!: Date;
}

// Input type for user
@InputType()
export class UserInput {
    @Field()
    firstName: string;

    @Field()
    lastName: string;
    
    @Field()
    email: string;
    
    @Field()
    phone: string;
    
    @Field()
    password: string;

    @Field()
    role?: string;
}