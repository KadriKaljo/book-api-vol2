import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.config.js';

export const authenticateToken = async (request, response, next) => {
    try {
        const token = request.headers.authorization?.replace('Bearer ', ''); // võtab tokeni headerist
    
    
        if (!token) {
            return response.status(401).json({ 
                message: 'Unauthorized' 
            });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({ where: { id: payload.id } }); // võtab prisma, läheb otsib andmebaasist useri, kus id on sama, mis on payload'st

        request.user = {
            id: user.id,
            email: user.email
        }; 

        next();

    } catch (exception) {
        next(exception); 
    }
};