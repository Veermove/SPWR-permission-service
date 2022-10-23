CREATE TABLE IF NOT EXISTS users(
  user_id UUID PRIMARY KEY,
  role VARCHAR(255) NOT NULL,
  mail TEXT NULL,
  name TEXT NULL,
  pwr_assoc INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS users_role_pwr_assoc_index ON users(role, pwr_assoc);
