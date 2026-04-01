exports.pool = null;

exports.viewSummary = async (req, res) => {
    try {
        const [rows] = await exports.pool.query('SELECT * FROM rentals_tbl');

        res.status(200).json(rows);


    } catch (error) {
        res.status(500).json({ message: "Server Error", details: error.message });
    }
};

exports.getStudentRentalOptions = async (req, res) => {
    try {
        const [rows] = await exports.pool.query(`
SELECT E.equipment_name, I.available_quantity AS quantity, I.itemID
FROM rental_items_tbl AS R
LEFT JOIN rental_items_tbl AS I
	ON R.itemID = I.itemID
LEFT JOIN equipment_tbl AS E
	ON R.equipmentID = E.equipmentID;`);

        res.status(200).json(rows);


    } catch (error) {
        res.status(500).json({ message: "Server Error", details: error.message });
    }
};


exports.requestBorrow = async (req, res) => {
    const { userID, itemID, quantity } = req.body;

    if (!userID || !itemID || !quantity) {
        return res.status(400).json({ message: "Incomplete borrow requestinformation" });
    }

    try {
        await exports.pool.execute(
            'CALL RequestBorrow(?, ?, ?);',
            [userID, itemID, quantity]
        );

        res.status(201).json({ message: "Borrow request submitted successfully!" });

    } catch (error) {
        console.error("Borrow Error:", error);
        res.status(500).json({ message: "Error submitting borrow request", details: error.message });
    }
};