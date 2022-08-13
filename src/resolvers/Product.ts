import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { Product, ProductInput } from '../entities/Product';
import { ProductRepository } from '../repositories/Product';

@Resolver()
export class ProductResolver {
    private productRepo = getRepository(Product);

    @Query(returns => [Product])
    async getProducts(): Promise<Product[]> {
        return await this.productRepo.find();
    }

    @Query(() => Product)
    async getOneProduct(@Arg('id', () => Int) id: number): Promise<Product | null> {
        return await this.productRepo.findOne(id);
    }

    @Mutation(() => Product)
    async createProduct(@Arg('productData', () => ProductInput) productData: ProductInput): Promise<Product> {
        try {
            const newProduct = this.productRepo.create({
                productName: productData.productName,
                description: productData.description,
                price: productData.price,
                quantity: productData.quantity,
                picture: productData.picture,
            }).save();
            console.log('Product added successfully');
            return newProduct;
        } catch (error) {
            throw new Error(error);
        }

    }


    @Mutation(() => Boolean)
    async deleteProduct(@Arg('id', () => Int) id: number):Promise<Boolean> {
        try {
            await Product.delete(id);
            return true;
        } catch (error) {
            return false;
        }
    }

}