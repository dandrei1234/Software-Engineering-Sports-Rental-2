const bcrypt = require('bcrypt');

const saltRounds = 10;
exports.pool = null;

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const [rows] = await exports.pool.execute('SELECT fullname AS name, email, role, password FROM users_tbl WHERE email=?', [email]);

        if (!rows[0]) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, rows[0].password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.status(200).json({
            message: "Login successful",
            name: rows[0].name,
            role: rows[0].role
        });

        console.log(rows[0].role);

    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ message: "Internal server error", details: error.message });
    }
};

exports.signUp = async (req, res) => {
    const { name, email, password } = req.body;
    console.log("Ran");
    console.log("Name: " + name);
    console.log("Email: " + email);
    console.log("Password: " + password);

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Incomplete user information" });
    }

    // Make name consistent by trimming and lowering case for checks and insertion
    const cleanedName = name.trim().toLowerCase();

    try {
        // Check if email exists
        const [emailCheck] = await exports.pool.execute(
            'SELECT COUNT(email) AS count FROM users_tbl WHERE email=?',
            [email]
        );

        if (emailCheck[0].count > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Check if fullname exists (using cleanedName for consistent check)
        const [nameCheck] = await exports.pool.execute(
            'SELECT COUNT(fullname) AS count FROM users_tbl WHERE fullname=?',
            [cleanedName]
        );

        if (nameCheck[0].count > 0) {
            return res.status(400).json({ message: "Name already exists" });
        }

        // Hash password securely
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert new user with role and status defaults (adjust if your DB requires these)
        await exports.pool.execute(
            `INSERT INTO users_tbl 
            (fullname, email, password, role, status) 
            VALUES (?, ?, ?, 'student', 'active')`,
            [cleanedName, email, hashedPassword]
        );

        res.status(201).json({ message: "User was signed up successfully!" });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Error signing up user", details: error.message });
    }
};