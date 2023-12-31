// express : node framework
const express = require("express");
const sqlite3 = require("sqlite3");
const app = express();
const port = 3000;
const db = require("./database");

// Insert a user
const insertRestaurant = (name, email) => {
  db.run(
    "INSERT INTO restaurants (name, id,address,password ,opening_hours,closing_hours,delivery_radius,description,image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      name,
      id,
      address,
      password,
      opening_hours,
      closing_hours,
      delivery_radius,
      description,
      image_url,
    ],
    (err) => {
      if (err) {
        console.error("Error inserting restaurant:", err.message);
      } else {
        console.log("Restaurant inserted successfully");
      }
    }
  );
};

// Query all users
const getAllUsers = () => {
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      console.error("Error querying users:", err.message);
    } else {
      console.log("All users:", rows);
    }
  });
};

// Update user by ID
const updateUserById = (id, newName) => {
  db.run("UPDATE users SET name = ? WHERE id = ?", [newName, id], (err) => {
    if (err) {
      console.error("Error updating user:", err.message);
    } else {
      console.log("User updated successfully");
    }
  });
};

// Delete user by ID
const deleteUserById = (id) => {
  db.run("DELETE FROM users WHERE id = ?", [id], (err) => {
    if (err) {
      console.error("Error deleting user:", err.message);
    } else {
      console.log("User deleted successfully");
    }
  });
};

// Perform operations
// insertRestaurant("John Doe", "john@example.com");

// Close the database connection
db.close();
