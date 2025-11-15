module.exports.userAuth = async (req, res, next) => {
    try {
        let token = null;

        // Read token from cookie
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        // Read token from Authorization header
        else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const isBlacklisted = await blacklisttokenModel.findOne({ token });

        if (isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;
        next();

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
