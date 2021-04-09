const express =require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "reactjs_nodejs"
});

app.post("/register", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "INSERT INTO users (username, password) VALUES (?,?)",
         [username, password],
         (err,result) => {
             console.log(err);
             res.send({message: "SUCESS!!"})
         }
    );
});

app.post('/login',(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
         [username, password],
         (err,result) => {

            if(err){
                res.send({err:err})
            }

                if(result.length > 0 ){
                    res.send(result)
                }else{
                    res.send({message: "Wrong username & password combination!"})
                }
         }
    );

})

app.listen(5000, () => {
    console.log("running server");
});