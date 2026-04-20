DROP DATABASE IF EXISTS quiz_db;
CREATE DATABASE quiz_db;
USE quiz_db;

-- Tabelul pentru echipe
CREATE TABLE teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    team_name VARCHAR(50) UNIQUE,
    password VARCHAR(255)
);

-- Tabelul pentru întrebări
CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    stage INT, 
    question TEXT,
    option1 VARCHAR(255),
    option2 VARCHAR(255),
    option3 VARCHAR(255),
    correct_option INT
);

-- Tabelul pentru scoruri detaliate
CREATE TABLE scores (
    team_id INT PRIMARY KEY,
    stage1 INT DEFAULT 0,
    stage2 INT DEFAULT 0,
    stage3 INT DEFAULT 0,
    total_score INT AS (stage1 + stage2 + stage3), -- Calculat automat de baza de date
    FOREIGN KEY (team_id) REFERENCES teams(id)
);

-- Tabel pentru setările serverului (Etapa Activă)
CREATE TABLE settings (
    config_key VARCHAR(50) PRIMARY KEY,
    config_value VARCHAR(50)
);

-- Inițializăm serverul în Etapa 1
INSERT INTO settings (config_key, config_value) VALUES ('active_stage', '1');

-- Echipe de test
INSERT INTO teams (team_name, password) VALUES ('Echipa 1', '1234'), ('Echipa 2', '1234');
-- Creăm rânduri de scor goale pentru echipe
INSERT INTO scores (team_id) VALUES (1), (2);

-- Întrebări de test (Etapa 1 și 2)
INSERT INTO questions (stage, question, option1, option2, option3, correct_option) VALUES
(1, 'Cat fac 5x5?', '20', '25', '30', 2),
(2, 'Capitala Italiei?', 'Milano', 'Napoli', 'Roma', 3);