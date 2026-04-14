const jwt = require('jsonwebtoken');

module.exports = (user) => {
    return jwt.sign(
        {
            userId: user.id,
            orgId: user.organizationId,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
};