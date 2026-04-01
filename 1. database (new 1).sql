-- Create the Database
CREATE DATABASE softeng_sports_rental1;
USE softeng_sports_rental1;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users_tbl (
    userID INT PRIMARY KEY AUTO_INCREMENT,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role ENUM('student', 'staff') NOT NULL DEFAULT 'student',
    password VARCHAR(255) NOT NULL,
    registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'inactive') DEFAULT 'inactive'
);

CREATE TABLE IF NOT EXISTS equipment_category_tbl (
    categoryID INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL
);

-- 2. Equipment Table
CREATE TABLE IF NOT EXISTS equipment_tbl (
    equipmentID INT PRIMARY KEY AUTO_INCREMENT,
    categoryID INT,
    equipment_name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    FOREIGN KEY (categoryID) REFERENCES equipment_category_tbl(categoryID) ON DELETE CASCADE
);

-- For tracking quantity (total vs available)
CREATE TABLE IF NOT EXISTS rental_items_tbl (
    itemID INT PRIMARY KEY AUTO_INCREMENT,
    equipmentID INT NOT NULL,
    total_quantity INT DEFAULT 1,
    available_quantity INT DEFAULT 1,
    FOREIGN KEY (equipmentID)
		REFERENCES equipment_tbl(equipmentID) ON DELETE CASCADE
);

-- For student & item borrowed
CREATE TABLE IF NOT EXISTS rentals_tbl (
    rentalID INT PRIMARY KEY AUTO_INCREMENT,
    itemID INT,
    userID INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1, -- quantity borrowed
    
    condition_status ENUM('New', 'Good', 'Fair', 'Damaged') DEFAULT 'Good',
    borrow_status ENUM('Pending', 'Approved', 'Returned', 'Overdue') DEFAULT 'Pending',
    
    request_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    due_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    return_date DATETIME,
    FOREIGN KEY (itemID) REFERENCES rental_items_tbl(itemID) ON DELETE CASCADE,
    FOREIGN KEY (userID) REFERENCES users_tbl(userID) ON DELETE CASCADE
);


-- 5. Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_log_tbl (
    logID INT PRIMARY KEY AUTO_INCREMENT,
    userID INT,
    action_type VARCHAR(100),
    action_details TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userID) REFERENCES users_tbl(userID) ON DELETE SET NULL
);

-- --- Procedures ---

DELIMITER //
CREATE PROCEDURE AddEquipment
(
IN equipment_name VARCHAR(255),
IN categoryID INT,
IN quantity INT
)
BEGIN
	INSERT INTO equipment_tbl (equipment_name, categoryID) VALUES
    (equipment_name, categoryID);
    
    SET @equipmentID = LAST_INSERT_ID();
    
    INSERT INTO rental_items_tbl (equipmentID, available_quantity, total_quantity) VALUES
    (@equipmentID, quantity, quantity);
END //
DELIMITER ;


  --          'INSERT INTO rentals_tbl (userID, itemID, quantity ) VALUES (?, ?, ?)',
    --        [userID, itemID, quantity]


DELIMITER //
CREATE PROCEDURE RequestBorrow(userID INT, itemID_i INT, quantity INT)
BEGIN
	DECLARE currentQuantity INT;
	INSERT INTO rentals_tbl (userID, itemID, quantity ) VALUES (userID, itemID, quantity);
    
    SELECT available_quantity
    INTO currentQuantity
    FROM rental_items_tbl
    WHERE itemID = itemID_i;
    
    UPDATE rental_items_tbl
    SET available_quantity = (currentQuantity - quantity)
    WHERE itemID = itemID_i;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE GetRentalStatus(
	OUT total_active_rentals INT, 
    OUT total_equipment INT,
    OUT total_overdue_rentals INT
)
BEGIN
	-- active rentals
	SELECT SUM(total_quantity - available_quantity)
    INTO total_active_rentals
	FROM rental_items_tbl;

	-- total equipment
	SELECT SUM(total_quantity)
    INTO total_equipment
	FROM rental_items_tbl;

	-- overdue items
	SELECT SUM(quantity)
    INTO total_overdue_rentals
	FROM rentals_tbl;
END //
DELIMITER ;

CALL GetRentalStatus(@active, @equipment, @overdue);
SELECT @active, @equipment, @overdue;

-- --- SEED DATA (Optional) ---

-- Add initial Staff and Student
INSERT INTO users_tbl (email, password, fullname, role, status) VALUES 
('staff@smu.edu.ph', 'admin123', 'System Admin', 'staff', 'active'),
('student@smu.edu.ph', 'student123', 'Sample Student', 'student', 'active');

INSERT INTO equipment_category_tbl (category_name) VALUES
('Ball Games'), ('Racket Sports');

CALL AddEquipment('Basketball (Spalding)', 1, 5);
CALL AddEquipment('Volleyball (Mikasa)', 1, 10);
CALL AddEquipment('Badminton Racket', 2, 3);
CALL AddEquipment('Table Tennis Paddle', 1, 5);
CALL AddEquipment('Soccer Ball', 1, 3);
