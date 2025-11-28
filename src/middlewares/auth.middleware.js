import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.config.js';

export const authenticateToken = async (request, response, next) => {
    try {
        const token = request.headers.authorization?.replace('Bearer ', ''); // võtab tokeni headerist
                                                                             // bearer on tokeni aluseks
    
        if (!token) {
            return response.status(401).json({ // kui pole tokeni, siis 401 error
                message: 'Unauthorized' 
            });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET); // kontrollib, kas token on õige, salavõti on env'st
        const user = await prisma.user.findUnique({ where: { id: payload.id } }); // võtab prisma, läheb otsib andmebaasist useri, kus id on sama, mis on payload'st
        request.user = { id: user.id, email: user.email }; // lisab useri id ja email request.user'i
        next(); // jätkab tööd
    } catch (exception) {
        next(exception); // kui tekib tõrge, siis jätkab tööd
    }
};