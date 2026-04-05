const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.pool = null;

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    try {
        const [rows] = await exports.pool.execute(
            'SELECT userID, fullname AS name, email, role, password FROM users_tbl WHERE email=?', 
            [email.toLowerCase()]
        );
        if (!rows[0] || !(await bcrypt.compare(password, rows[0].password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        res.status(200).json({ message: "Login successful", id: rows[0].userID, name: rows[0].name, role: rows[0].role });
    } catch (error) {
        res.status(500).json({ message: "Server error", details: error.message });
    }
};

exports.signUp = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Incomplete information" });

    try {
        const [emailCheck] = await exports.pool.execute('SELECT COUNT(*) AS count FROM users_tbl WHERE email = ?', [email.toLowerCase()]);
        if (emailCheck[0].count > 0) return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await exports.pool.execute(
            `INSERT INTO users_tbl (fullname, email, password, role) VALUES (?, ?, ?, 'student')`,
            [name.trim(), email.toLowerCase(), hashedPassword]
        );
        res.status(201).json({ message: "User signed up successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Signup error", details: error.message });
    }
};