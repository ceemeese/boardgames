CREATE DATABASE boardgames;
GRANT ALL PRIVILEGES ON boardgames.* TO user;
USE boardgames;

CREATE TABLE IF NOT EXISTS boardgames (
	id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL UNIQUE,
	description VARCHAR(255),
	minPlayers INTEGER NOT NULL,
	maxPlayers INTEGER NOT NULL,
	category VARCHAR(255)
);
CREATE TABLE IF NOT EXISTS games (
	id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	boardgameId	INTEGER NOT NULL,
	FOREIGN KEY(boardgameId) REFERENCES boardgames(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS users (
	id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255),
	surname VARCHAR(255),
	email VARCHAR(255) NOT NULL UNIQUE,
	alias VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS gamesUsers (
	id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
	gameId INTEGER NOT NULL,
	userId INTEGER NOT NULL,
	FOREIGN KEY(gameId) REFERENCES games(id) ON DELETE CASCADE,
	FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO boardgames (name,description,minPlayers,maxPlayers,category) VALUES ('Carcassonne','Descripción de Carcassonne',2,5,'Gestión de recursos'),
 ('7Wonders','Descripción 7Wonders',3,7,'Draft de cartas'),
 ('Catán','Descripción Catán',3,7,'Control de area'),
 ('Welcome','Descripción Welcome',1,10,'Roll & Write'),
 ('Patchwork','Descripción Patchwork',2,2,'Puzzle'),
 ('Explodding Kittens','Descripción Explodding Kittens',2,5,'Filler');

INSERT INTO games (name,boardgameId) VALUES ('Partida 1',1),
 ('Partida 2',2), ('Partida 3',3), ('Partida 4',4), ('Partida 5',5), ('Partida 6',6);

INSERT INTO users (name,surname,email,alias,password) VALUES ('Cris','Eme','a27877@svalero.com','ceeme','1234'),
 ('Test','test','test@mail.com','testAlias','1234'), ('Coco','test','coco@mail.com','cocoAlias','1234'), ('Alba','ApellidoAlba','alba@mail.com','albaAlias','1234');

INSERT INTO gamesUsers (gameId,userId) VALUES (1,1), (1,2),
 (2,3), (2,1), (2,4), (4,1);

