import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';

interface JwtPayload {
    userId: string
  }
  
export const customAuthChecker = async (
    { root, args, context, info },
) => {
    const userRepo = getRepository(User);
    const userJwt = context.token;
    try {
        const decoded = jwt.verify(userJwt, 'test') as JwtPayload;
        if(!decoded?.userId) {
            return false;
        }

        const user = await userRepo.findOne(decoded.userId);
        if(!user) {
            return false;
        }

        context.user = user;
        return true;
    } catch (err) {
        return false;
    }
};