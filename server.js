const express = require("express");
const session = require("express-session");
const db = require("./db");
const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(session({ secret: "quiz-secret", resave: false, saveUninitialized: false }));

// ==========================================
// 1. RUTA DE LOGIN (Aceasta lipsea!)
// ==========================================
app.post("/login", (req, res) => {
    const { team_name, password } = req.body;
    db.query("SELECT * FROM teams WHERE team_name = ? AND password = ?", [team_name, password], (err, result) => {
        if (err) return res.status(500).send("Eroare server");
        if (result.length > 0) {
            req.session.team_id = result[0].id;
            res.send("success");
        } else {
            res.status(401).send("Nume echipă sau parolă greșită");
        }
    });
});

// ==========================================
// 2. Află etapa activă și verifică dacă a jucat
// ==========================================
app.get("/questions/active", (req, res) => {
    if (!req.session.team_id) return res.status(401).send("Loghează-te");
    const team_id = req.session.team_id;

    db.query("SELECT config_value FROM settings WHERE config_key = 'active_stage'", (err, settings) => {
        if (err || !settings[0]) return res.status(500).send("Eroare setări server");
        const stage = parseInt(settings[0].config_value);
        const column = `stage${stage}`;

        db.query(`SELECT ${column} FROM scores WHERE team_id = ?`, [team_id], (err, scoreResult) => {
            const currentScore = scoreResult[0] ? scoreResult[0][column] : 0;

            if (currentScore !== 0) {
                return res.json({ stage, completed: true, score: currentScore });
            }

            db.query("SELECT * FROM questions WHERE stage = ?", [stage], (err, questions) => {
                res.json({ stage, questions, completed: false });
            });
        });
    });
});

// ==========================================
// 3. Salvare Scor (Punctaj + Bonus Timp)
// ==========================================
app.post("/submit-quiz", (req, res) => {
    if (!req.session.team_id) return res.status(401).send("Neautorizat");
    
    const { stage, correctCount, timeLeft } = req.body;
    const team_id = req.session.team_id;
    const column = `stage${stage}`;

    db.query(`SELECT ${column} FROM scores WHERE team_id = ?`, [team_id], (err, result) => {
        if (result[0] && result[0][column] !== 0) {
            return res.status(403).send("Ai trimis deja răspunsurile pentru această etapă!");
        }

        const bonusPuncte = Math.floor(timeLeft / 20);
        const punctajEtapa = (correctCount * 10) + bonusPuncte;

        db.query(`UPDATE scores SET ${column} = ? WHERE team_id = ?`, [punctajEtapa, team_id], (err) => {
            if (err) return res.status(500).send(err);
            res.json({ score: punctajEtapa });
        });
    });
});

// ==========================================
// 4. Ruta pentru Admin (Setează etapa)
// ==========================================
app.post("/admin/set-stage", (req, res) => {
    const { stage } = req.body;
    db.query("UPDATE settings SET config_value = ? WHERE config_key = 'active_stage'", [stage], () => res.send("OK"));
});

// Ruta de logout
app.get("/logout", (req, res) => {
    req.session.destroy(() => res.redirect("/login.html"));
});

app.listen(3000, () => console.log("Server activ la http://localhost:3000"));