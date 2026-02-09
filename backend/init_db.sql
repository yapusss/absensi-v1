-- Run as PostgreSQL superuser
-- Replace app_user and app_password with your values.

CREATE ROLE app_user WITH LOGIN PASSWORD 'app_password';
ALTER ROLE app_user SET client_encoding TO 'utf8';
ALTER ROLE app_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE app_user SET timezone TO 'UTC';

CREATE DATABASE abensiv1_db OWNER app_user;

GRANT ALL PRIVILEGES ON DATABASE abensiv1_db TO app_user;