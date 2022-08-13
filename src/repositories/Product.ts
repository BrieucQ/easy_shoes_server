import { getRepository } from "typeorm";
import { Product } from "../entities/Product";

export class ProductRepository {
    private static repository = getRepository(Product);

    public static async createProduct(Product: Partial<Product>): Promise<Product> {
        return await this.repository.create(Product).save();
    }

    // public static async updateProduct(Product: Partial<Product>): Promise<Product> {
    //     const existingItem = await this.repository.findOne(Product.id);
    //     Object.assign(existingItem, Product);
    //     return await existingItem.save();
    // }

    public static async getAllProducts(): Promise<Product[]> {
        return await this.repository.find();
    }

    // public static async getAllActiveProducts(): Promise<Product[]> {
    //     return await this.repository.find({ state: 'active' });
    // }

    public static async getProduct(ProductId: number): Promise<Product | null> {
        return await this.repository.findOne(ProductId);
    }

    // public static async getProductByEmail(email: string): Promise<Product | null> {
    //     return await this.repository.findOne({ email });
    // }
}