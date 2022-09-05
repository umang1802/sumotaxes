
const {
  getLinkToken,
  getAccesstoken,
} = require("./controllers/tokenController");
const {
  getTransactions,
  getCategories,
  getTransactionsByCategory,
} = require("./controllers/transactionController");

const {
  signup,
  signin,
  setPliadToken,
} = require("./controllers/authController");
var bodyParser = require("body-parser");



const express = require("express");
const app = express();
const PORT = 4090;
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// get api for getting link tokens

app.get('/get/linktoken', getLinkToken )

app.post("/get/accesstoken", getAccesstoken);

app.post('/get/transactions', getTransactions);

app.post("/get/categories", getCategories);

app.post("/signup", signup);

app.post("/signin", signin);

app.put("/set-plaid-token", setPliadToken);

app.get("/get/transactions/category", getTransactionsByCategory);


app.listen(PORT, () => {
console.log(`Server running on ${PORT}`);
});