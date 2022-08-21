import { Field, ID, InputType, ObjectType } from 'type-graphql';
import {Entity,Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToOne} from 'typeorm'
import { User } from './User';

@Entity()
@ObjectType()
export class Adress extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID, { nullable: true })
    id!: number;
    
    @Column()
    @Field(() => String)
    street!: string;
    
    @Column()
    @Field(() => String)
    city!: string;
    
    @Column()
    @Field(() => String)
    country!: string;
    
    @Column()
    @Field(() => String)
    postcode!: string;

    @OneToOne(() => User, user => user.adress)
    @Field(() => User)
    user: User;
    
    @CreateDateColumn()
    @Field(() => String)
    createdAt: Date;
    
    @UpdateDateColumn()
    @Field(() => String)
    updatedAt: Date;
}