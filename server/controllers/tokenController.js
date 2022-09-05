

const {
   Configuration, PlaidApi, PlaidEnvironments
} = require('plaid')
const moment = require('moment');

const PLAID_CLIENT_ID = '625fa75d0af39a0014d79e02'
const PLAID_SECRET ='533a671ddc3b4485bdcd15821f01d6'
const PLAID_ENV = 'sandbox'
const OAUTH_REDIRECT_URI = 'http://localhost:3000/dashboard'

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
      'PLAID-SECRET': PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);


const getLinkToken = async (req, res) => {
  const request = {
  user: {
    "client_user_id": "abcdef1234567"
  },
  client_name: 'taxsmart',
  products: ['auth', 'transactions'],
  country_codes: ['US'],
  language: 'en',
  redirect_uri: OAUTH_REDIRECT_URI,
};

try {
  const response = await plaidClient.linkTokenCreate(request);
  const linkToken = response.data.link_token;
  res.json({
    linkToken: linkToken
  })
} catch (error) {
  console.log('error-->', error)
  // handle error
  res.json({
    error: error
  })
}

}

const getAccesstoken = async (req, res) => {
  const request = {
    public_token: req.body.public_token,
  }
  try {
    // add logic to store access_token in DB
    const response = await plaidClient.itemPublicTokenExchange(request);
    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;
    res.json({
      accessToken: accessToken,
      itemId: itemId,
    });
  } catch (err) {
    // handle error
    res.json({
      error: err
    })
  }
}

module.exports = {
  getLinkToken,
  getAccesstoken,
};