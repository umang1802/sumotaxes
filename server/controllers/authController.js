const Pool = require("pg").Pool;
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "sumotax",
  password: "postgres",
  port: 5432,
});


const signup = async(req, res) => {
  const { first_name, last_name, email, password, occupation } = req.body
  pool.query(
    "INSERT INTO users (first_name, last_name, email, password, occupation) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [first_name, last_name, email, password, occupation],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
  );
}

const signin = async(req, res) => {
  const { email, password } = req.body
  pool.query("SELECT * FROM users where email = $1 and password = $2", [email, password], (error, results) => {
    if(error) {
      throw error;
    }
    res.status(200).json(results.rows[0])
  })
}

const setPliadToken = async (req, res) => {
  const {email, token} = req.body

  pool.query("UPDATE users SET plaid_access_token = $1 WHERE email = $2",[token, email], (error, results) => {
    if(error) {
      throw error;
    }
    res.status(200).send(`plaid access token updated for user: ${email}`)
  })
}

module.exports = {
  signup,
  signin,
  setPliadToken,
};