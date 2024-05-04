import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "ai-tool",
    password: "ascc",
    port: 5432,
});

db.connect();

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
    console.log(req);
});

app.get("/signup", (req, res) => {
    console.log(req.body);
    res.sendFile(__dirname + "/public/index.html");
    console.log(req);
});

app.post("/signup", (req, res) => {
    const firstName = req.body["firstname"];
    const lastName = req.body["lastnbblame"];
    const email = req.body["email"];
    const username = req.body["username"]
    const password = req.body["password"];
    

    const userInfo = db.query(
        "INSERT INTO users (first_name, last_name, email, user_name, password) VALUES ($1, $2, $3, $4, $5)",
        [firstName, lastName, email, username, password]
    );

    res.sendFile(__dirname + "/public/index.html")
});

app.listen(port, () => {
    console.log("Server running on port");
});