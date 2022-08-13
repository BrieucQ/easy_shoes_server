import { Field, ID, InputType, ObjectType } from 'type-graphql';
import {Entity,Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn} from 'typeorm'

@Entity()
@ObjectType()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID, { nullable: true })
    id!: number;

    @Column()
    @Field(() => String)
    firstName?: string;

    @Column()
    @Field(() => String)
    lastName?: string;

    @Column()
    @Field(() => String)
    email!: string;

    @Column()
    @Field(() => String)
    phone!: string;

    @Column()
    @Field(() => String)
    password!: string;

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
    firstName!: string;

    @Field()
    lastName!: string;
    
    @Field()
    email!: string;
    
    @Field()
    phone!: string;
    
    @Field()
    password!: string;
}