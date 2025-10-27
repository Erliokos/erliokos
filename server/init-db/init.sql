-- Подключаем расширение для UUID, если его ещё нет
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- Уникальный ID игрока
    username VARCHAR(50) UNIQUE NOT NULL,           -- Никнейм игрока
    email VARCHAR(100) UNIQUE NOT NULL,             -- Почта игрока (может быть пустой)
    password TEXT NOT NULL,                         -- Хэш пароля
    avatar_url TEXT,                                -- Ссылка на аватар
    level INT DEFAULT 1,                            -- Уровень игрока
    xp INT DEFAULT 0,                               -- Опыт игрока
    gold INT DEFAULT 0,                             -- Виртуальная валюта
    created_at TIMESTAMP DEFAULT now(),             -- Дата регистрации
    last_login TIMESTAMP,                           -- Последний вход в игру
    is_banned BOOLEAN DEFAULT FALSE,                -- Заблокирован ли аккаунт
    role VARCHAR(20) DEFAULT 'player'               -- Роль пользователя (player, admin и т.д.)
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


