-- Подключаем расширение для UUID, если его ещё нет
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL
);

-- Создание таблицы category
-- CREATE TABLE IF NOT EXISTS category (
--   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--   link VARCHAR(255) NOT NULL,
--   name VARCHAR(100) NOT NULL
-- );

-- Добавление данных в category
-- INSERT INTO category (id, link, name) VALUES
--   (uuid_generate_v4(), 'mangal', 'Мангал'),
--   (uuid_generate_v4(), 'knife', 'Ножи'),
--   (uuid_generate_v4(), 'sports_corner', 'Спортивный уголок'),
--   (uuid_generate_v4(), 'flashlight', 'Фонари'),
--   (uuid_generate_v4(), 'tents', 'Палатки');


