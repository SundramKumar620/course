import jwt from 'jsonwebtoken';

export const userMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                message: 'Access token required' 
            });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.USER_JWT_SECRET);
        
        if (!decoded || !decoded.id) {
            return res.status(401).json({ 
                message: 'Invalid token' 
            });
        }

        req.userId = decoded.id;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                message: 'Invalid token' 
            });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                message: 'Token expired' 
            });
        }
        
        return res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
};
