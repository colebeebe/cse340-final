-- Required extensions
CREATE EXTENSION IF NOT EXISTS unaccent;

-- Table creation for users and roles

CREATE TABLE IF NOT EXISTS oa_users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(63) NOT NULL,
  last_name VARCHAR(63) NOT NULL,
  birthdate DATE,
  username VARCHAR(63) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role_id INTEGER NOT NULL DEFAULT 4,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS oa_roles (
  id SERIAL PRIMARY KEY,
  role_name VARCHAR(50) UNIQUE NOT NULL,
  role_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO oa_roles (role_name, role_description)
VALUES
  ('admin', 'Administrator with full system access'),
  ('critic', 'Employee that critiques games'),
  ('verified', 'Verified user with notable social presence'),
  ('user', 'Standard user with basic access')
ON CONFLICT (role_name) DO NOTHING;

CREATE TABLE IF NOT EXISTS oa_games (
  id SERIAL PRIMARY KEY,
  title VARCHAR(127) NOT NULL,
  description VARCHAR(2000),
  release_date DATE NOT NULL,
  cover_image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
