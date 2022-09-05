import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Category from '../../Components/Category.jsx'

export default function BusinessContainer() {
  const [accessToken, setAccesToken] = useState(localStorage.getItem('plaidAccessToken'))
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])

  let TRANSACTIONS = []

  const extractCategories = (transactions) => {
    let current
    const transactionByCategory = []
    let cat = []
    transactions.forEach(tr => {
      if(cat.indexOf(tr.transaction_category) === -1) {
        cat.push(tr.transaction_category)
      }
    })
    transactions.forEach(tr => {
      if(transactionByCategory.find(t => t.category == tr.transaction_category)){
        // current = transactionByCategory.find(t => t.category == tr.transaction_category)
        let currentIndex = transactionByCategory.indexOf(transactionByCategory.find(t => t.category == tr.transaction_category))
        if(currentIndex){
          transactionByCategory[currentIndex].data.push(tr)
        }
      } else {
        transactionByCategory.push({
          category: tr.transaction_category,
          data: [tr]
        })
     
      }
    })
    console.log('transactionByCategory', transactionByCategory)
    setTransactions(transactionByCategory)
    setCategories(cat)
  }

  



  useEffect(() =>{ 
    axios.post('/get/transactions', {"token": accessToken, "email": localStorage.getItem('email') }).then(resp => {
      if(resp.data.transactions.length) {
       TRANSACTIONS = [...resp.data.transactions]
       extractCategories(resp.data.transactions)
      // updateTransactions(resp.data.transactions)
      console.log('transaction update', TRANSACTIONS)
      }
     
    })
  },[])
  return (
    <div>
       <div className="mx-4 px-8 py-8 bg-rose-400 shadow-lg rounded-md text-white font-semibold">
          <p className="text-center text-base text-white font-normal">TOTAL BUSINESS EXPENSE</p>
          <p className="text-center text-2xl text-white font-semibold">USD 1000</p>
          <p className="mt-4 text-center text-base text-white font-normal">TOTAL DEDUCTION</p>
          <p className="text-center text-2xl text-white font-semibold">USD 300</p>
      </div>
       {transactions.length && <Category transactions={transactions}/>}
    </div>
  )
}
