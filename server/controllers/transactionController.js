const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");
const moment = require("moment");

const PLAID_CLIENT_ID = "625fa75d0af39a0014d79e02";
const PLAID_SECRET = "533a671ddc3b4485bdcd15821f01d6";
const PLAID_ENV = "sandbox";
const OAUTH_REDIRECT_URI = "http://localhost:3000/dashboard";

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": PLAID_CLIENT_ID,
      "PLAID-SECRET": PLAID_SECRET,
    },
  },
});

let ACTIVE_TRANSACTIONS = []
let CURRENT_USER_ID = ''
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "sumotax",
  password: "postgres",
  port: 5432,
});

const plaidClient = new PlaidApi(configuration);

const getCurrentUserID = (email) => {
  console.log('email', email)
  pool.query(
    "SELECT id FROM users WHERE email = $1",
    [email],
    (error, results) => {
      if (error) {
        throw error;
      }
      return results.rows[0].id;
    }
  );
}


const getTransactions = async (req, res) => {
  // add logic to get acces token from DB

  const accessToken = req.body.token
  const email = req.body.email
  let currentUserID = ''
  console.log('accessToken', accessToken)
  const request = {
    access_token: accessToken,
    start_date: "2022-01-01",
    end_date: "2022-01-06",
  };

  pool.query("SELECT id FROM users WHERE email = $1", [email], 
    (error, results) => {
      if(error) {
        throw error
      }
      currentUserID = results.rows[0].id
    }
  )

  try {
    const response = await plaidClient.transactionsGet(request);
    let transactions = response.data.transactions;
    const total_transactions = response.data.total_transactions;
    await setTransactions(response.data.transactions, currentUserID);
    getTransactionsFromDB(currentUserID);
     console.log("result rows", ACTIVE_TRANSACTIONS);
   
   
    // Manipulate the offset parameter to paginate
    // transactions and retrieve all available data
    // while (transactions.length < total_transactions) {
    //   const paginatedRequest = {
    //     access_token: accessToken,
    //      start_date: "2022-01-01",
    //      end_date: "2022-01-06",
    //     options: {
    //       offset: transactions.length,
    //     },
    //   };
    //   const paginatedResponse = await plaidClient.transactionsGet(
    //     paginatedRequest
    //   );
    //   transactions = transactions.concat(
    //     paginatedResponse.data.transactions,
    //   );
    //   res.status = 200
    //   res.json({
    //     transactions: transactions
    //   })
    // }
     
          res.status = 200;
          res.json({
            transactions: ACTIVE_TRANSACTIONS,
            count: total_transactions,
          });
      
      
      
  } catch (err) {
    // handle error
    res.status = 500
    res.json({
      error: err
    })
  }

}

const setTransactions = async(transactions, id) => {
    transactions.forEach((tr) => {
      pool.query(
        "INSERT INTO transactions (user_id, transaction_id, transaction_category, transaction_amount, currency, account_id, transaction_date, transaction_type, transaction_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT (transaction_id) DO UPDATE SET transaction_name = EXCLUDED.transaction_name",
        [
          id,
          tr.transaction_id,
          tr.category[1],
          tr.amount,
          tr.currency,
          tr.account_id,
          tr.date,
          tr.transaction_type,
          tr.name
        ],
        (error, results) => {
          if (error) {
             console.log("error", error);
            return error;
           
          } 
          else {
            console.log("transactions updated", results);
          }
          
        }
      );
      return true;
    });
  
}
const getTransactionsFromDB = (id) => {
  pool.query("SELECT * FROM transactions WHERE user_id = $1", [id], (error, results) => {
    if(error) {
      return error
    } 
    ACTIVE_TRANSACTIONS = results.rows
  })
}

const getTransactionsByCategory = async (req, res) => {
  const email = req.query.email
  const category = req.query.category
  console.log('req query', req.query)
  let id = getCurrentUserID(email)
  pool.query(
    "SELECT * FROM transactions WHERE user_id = $1 AND transaction_category = $2",
    [id, category],
    (error, results) => {
      if (error) {
        return error;
      }
      console.log('rwssss---->', results.rows)
      res.status = 200;
      res.json({
        transactions: results.rows,
      });
    }
  );
}

const getCategories = async (req, res) => {
  // const accessToken = req.body.token;
  try {
  const response = await plaidClient.categoriesGet({});
  const categories = response.data.categories;
  res.status = 200
  res.json({
    categories: categories
  })
} catch (error) {
  res.status = 500
  res.json({
    error: err
  })
  // handle error
}
}

module.exports = {
  getTransactions,
  getCategories,
  getTransactionsByCategory,
};