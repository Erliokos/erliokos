-- Подключаем расширение для UUID, если его ещё нет
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL
);

-- Создание таблицы category
CREATE TABLE IF NOT EXISTS category (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  link VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL
);

-- Добавление данных в category
INSERT INTO category (id, link, name) VALUES
  (uuid_generate_v4(), 'mangal', 'Мангал'),
  (uuid_generate_v4(), 'knife', 'Ножи'),
  (uuid_generate_v4(), 'sports_corner', 'Спортивный уголок'),
  (uuid_generate_v4(), 'flashlight', 'Фонари'),
  (uuid_generate_v4(), 'tents', 'Палатки');

-- Создание таблицы products
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES category(id) ON DELETE CASCADE,
  category_link VARCHAR(100) NOT NULL,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  sale DECIMAL(10, 2) DEFAULT 0,
  images TEXT[],  -- Массив строк для хранения изображений
  description TEXT,
  rating DECIMAL(3, 2) DEFAULT 0,  -- Рейтинг от 0 до 5
  vote_count INT DEFAULT 0,
  remains INT DEFAULT 0,
  model VARCHAR(100) NOT NULL
);

-- Добавление данных в products
-- Добавление данных в products
INSERT INTO products (id, category_id, category_link, name, price, sale, images, description, rating, vote_count, remains, model) VALUES
  (uuid_generate_v4(), (SELECT id FROM category WHERE link = 'mangal' LIMIT 1), (SELECT link FROM category WHERE link = 'mangal' LIMIT 1), 'Мангал', 100.00, 10.00, '{"https://avatars.mds.yandex.net/i?id=cd860157e8fff71baf7c971dd0c14e9e_l-8264209-images-thumbs&n=13",
            "https://cs5.livemaster.ru/storage/99/6b/722c7fbb7eaf4494e13c3cafe8co--dacha-i-sad-mangal.jpg",
            "https://i0.wp.com/cs2.livemaster.ru/storage/20/f6/7ab0dd565250e55e2d89b7e960d4--dacha-i-sad-mangal-ochag-kostrische-dlya-kostra-podarok-skulp.jpg?ssl=1",
            "https://avatars.mds.yandex.net/get-ydo/4498943/2a0000018765eba62785f88ee586a30544fa/diploma",
            "https://ladysarafan.ru/wp-content/uploads/2023/03/1-4.jpg",
            "https://avatars.mds.yandex.net/get-marketpic/1910582/pic6e05789ac1ca30465fd7830035974632/orig"}', 'Description of product 1', 4.5, 100, 10, 'sport_ugol.glb'),
  (uuid_generate_v4(), (SELECT id FROM category WHERE link = 'knife' LIMIT 1), (SELECT link FROM category WHERE link = 'knife' LIMIT 1), 'Нож', 200.00, 20.00, '{"image3.jpg", "image4.jpg"}', 'Description of product 2', 4.0, 150, 10, 'tank.glb'),
  (uuid_generate_v4(), (SELECT id FROM category WHERE link = 'sports_corner' LIMIT 1), (SELECT link FROM category WHERE link = 'sports_corner' LIMIT 1), 'Спортивный уголок', 200.00, 20.00, '{"image3.jpg", "image4.jpg"}', 'Description of product 3', 4.0, 150, 10, 'tank.glb'),
  (uuid_generate_v4(), (SELECT id FROM category WHERE link = 'flashlight' LIMIT 1), (SELECT link FROM category WHERE link = 'flashlight' LIMIT 1), 'Фонарь', 200.00, 20.00, '{"image3.jpg", "image4.jpg"}', 'Description of product 4', 4.0, 150, 10, 'tank.glb'),
  (uuid_generate_v4(), (SELECT id FROM category WHERE link = 'tents' LIMIT 1), (SELECT link FROM category WHERE link = 'tents' LIMIT 1), 'Палатка', 200.00, 20.00, '{"image3.jpg", "image4.jpg"}', 'Description of product 5', 4.0, 150, 10, 'tank.glb');


