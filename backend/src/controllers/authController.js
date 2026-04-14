const prisma = require('../prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ✅ REGISTER
exports.register = async (req, res) => {
    try {
        const { name, email, password, organizationName, role } = req.body;

        // 🔒 hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        let org;

        // ✅ check if org exists
        org = await prisma.organization.findFirst({
            where: { name: organizationName }
        });

        // ✅ create org if not exists
        if (!org) {
            org = await prisma.organization.create({
                data: {
                    name: organizationName
                }
            });
        }

        const safeRole = role?.toUpperCase() === "ADMIN" ? "ADMIN" : "MEMBER";

const user = await prisma.user.create({
    data: {
        email,
        password: hashedPassword,
        role: safeRole,
        organizationId: org.id
    }
});
        

        // ✅ generate token
        const token = jwt.sign(
            {
                userId: user.id,
                orgId: user.organizationId,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            {
                userId: user.id,
                orgId: user.organizationId,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};