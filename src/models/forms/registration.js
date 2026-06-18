import db from '../db.js';

/**
 * Checks if an email address is already registered in the database
 *
 * @param {string} email - The email address to check
 * @returns {Promise<boolean>} True if email exists, false otherwise
 */
export const emailExists = async (email) => {
  const query = `
    SELECT EXISTS(SELECT 1 FROM oa_users WHERE email = $1) as exists;
  `;

  const result = await db.query(query, [email]);
  return result.rows[0].exists;
};

/**
 * Checks if a username is already registered in the database
 *
 * @param {string} username - The username to check
 * @returns {Promise<boolean>} True if username exists, false otherwise
 */
export const usernameExists = async (username) => {
  const query = `
  SELECT EXISTS(SELECT 1 FROM oa_users WHERE username = $1) as exists;
  `;

  const result = await db.query(query, [username]);
  return result.rows[0].exists;
};

/**
 * Saves a new user to the databse with a hashed password
 *
 * @param {string} first_name - The user's first name
 * @param {string} last_name - The user's last name
 * @param {Date} birthdate - The user's birthdate
 * @param {string} username - The user's created username
 * @param {string} email - The user's email address
 * @param {string} hashedPassword - The bcrypt-hashed password
 * @returns {Promise<Object>} The newly created user record (without password)
 */
export const saveUser = async (
  first_name,
  last_name,
  birthdate,
  username,
  email,
  hashedPassword,
) => {
  const query = `
    INSERT INTO oa_users (
      first_name,
      last_name,
      birthdate,
      username,
      email,
      password
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING
      id,
      first_name,
      last_name,
      birthdate,
      username,
      email,
      created_at;
  `;
  const params = [
    first_name,
    last_name,
    birthdate,
    username,
    email,
    hashedPassword,
  ];
  const result = await db.query(query, params);
  return result.rows[0];
};

/**
 * Retrieves all registered users from the database
 *
 * @returns {Promise<Array>} Array of user records (without passwords)
 */
export const getAllUsers = async () => {
  const query = `
    SELECT id, username, email, created_at
    FROM oa_users
    ORDER BY created_at DESC
  `;
  const result = await db.query(query);
  return result.rows;
};

/**
 * Retrieve a single user by ID with role information
 *
 * @param {number} id - The id of the user to look up
 * @returns {Promise<Object> | null} The user belonging to the id
 */
export const getUserById = async (id) => {
  const query = `
    SELECT
      oa_users.id,
      oa_users.first_name,
      oa_users.last_name,
      oa_users.birthdate,
      oa_users.username,
      oa_users.email,
      oa_users.created_at,
      oa_roles.role_name
    FROM oa_users
    INNER JOIN oa_roles ON oa_users.role_id = oa_roles.id
    WHERE oa_users.id = $1;
  `;
  const result = await db.query(query, [id]);
  return result.rows[0] || null;
};

/**
 * Update a user's username and email
 *
 * @param {number} id - The id of the user
 * @param {string} username - The updated username
 * @param {string} email - The updated email
 * @returns {Promise<Object> | null} The updated user information
 */
export const updateUser = async (id, username, email) => {
  const query = `
    UPDATE oa_users
    SET username = &1, email = $2, updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING id, username, email, updated_at;
  `;
  const result = await db.query(query, [username, email, id]);
  return result.rows[0] || null;
};

/**
 * Delete a user account
 *
 * @param {number} id - The id of the user to be deleted
 * @returns {Promise<Boolean>} True if the resource was deleted, false otherwise
 */
export const deleteUser = async (id) => {
  const query = `
    DELETE FROM users WHERE id = $1;
  `;
  const result = await db.query(query, [id]);
  return result.rowCount > 0;
};
