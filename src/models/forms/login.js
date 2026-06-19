import bcrypt, { hash } from 'bcrypt';
import db from '../db.js';

/**
 * Find a user by email address for login verification
 * 
 * @param {string} email - Email address to search for
 * @returns {Promise<Object|null>} User object with password hash or null if not found
 */
export const findUserByEmail = async (email) => {
  const query = `
    SELECT
      oa_users.id,
      oa_users.first_name,
      oa_users.last_name,
      oa_users.birthdate,
      oa_users.username,
      oa_users.email,
      oa_users.password,
      oa_users.created_at,
      oa_users.updated_at,
      oa_roles.role_name
    FROM oa_users
    INNER JOIN oa_roles ON oa_users.role_id = oa_roles.id
    WHERE LOWER(email) = LOWER($1)
    LIMIT 1;
  `;
  const result = await db.query(query, [email]);
  return result.rows[0] || null;
};

/**
 * Verify a plain text password against a stored bcrypt hash
 * 
 * @param {string} plainPassword - The password to verify
 * @param {string} hashedPassword - The stored password hash
 * @returns {Promise<Boolean>} True if password matches, false otherwise
 */
export const verifyPassword = async (plainPassword, hashedPassword) => {
  const match = await bcrypt.compare(plainPassword, hashedPassword);
  return match;
};
