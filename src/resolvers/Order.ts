import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { Order } from '../entities/Order';

@Resolver()
export class OrderResolver {
    private orderRepo = getRepository(Order);

    @Query(() => [Order])
    async getOrders(): Promise<Order[]> {
        return await this.orderRepo.find();
    }

    @Query(() => Order)
    async getOneOrder(@Arg('id', () => Int) id: number): Promise<Order | null> {
        return await this.orderRepo.findOne(id);
    }

    // add product to order and update order total price and quantity 
    @Mutation(() => Order)
    async addProductToOrder(@Arg('orderData', () => Order) orderData: Order): Promise<Order | null> {
        try {
            const existingOrder = await this.orderRepo.findOne(orderData.id);
            
            return null;
        } catch (error) {
            throw new Error(error);
        }
    }

    @Mutation(() => Order)
    async createOrder(@Arg('orderData', () => Order) orderData: Order): Promise<Order> {
        // create new order and connect it to user and products 
        try {
           
            console.log('Order added successfully');
        return await this.orderRepo.create(orderData).save();
        } catch (error) {
            throw new Error(error);
        }

    }
}