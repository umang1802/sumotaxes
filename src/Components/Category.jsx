import axios from 'axios'
import React, { useCallback, useState } from 'react'

export default function Category(props) {
  const { transactions } = props
  const [showCategory, setCurrentCategory] = useState('')
  const [showModal, setShowModal] = useState(false)
  // let showCategory = ""
  const setCategory = useCallback(data => () => {
    setCurrentCategory(data.category)
  }, [])

  return (
    <div>
     { transactions.length > 0 && transactions.map((data) => {
        return(
          <div key={data.category} onClick={setCategory(data)}>
            <div className="flex mt-2 mx-4 px-4 py-4 shadow-lg rounded-md text-rose-400 bg-white hover:bg-rose-400 hover:text-white"  >
              <p>{ data.category } ({data.data.length})</p>
          </div>
          <div id={data.category} className={`${showCategory == data.category ? 'block' : 'hidden'} `}>
            { data.category && 
              data.data.map(tr => {
                return(
                  <div class="flex mx-4 px-2 py-2 shadow-sm bg-white border text-gray-700 text-xs" onClick={() => setShowModal(true)}>
                    <div className="w-1/2 ">
                      { tr.transaction_name } 
                    </div>
                    <div className="flex" >
                      USD { tr.transaction_amount }
                    </div>
                    <div className="ml-auto">
                      { tr.transaction_date }
                    </div>
                  </div>
                )
              })
            }
          </div>
          </div>
        )
      }) }
      {showModal ? (
        <>
          <div
            className="mx-4 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Update Transaction
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    This Modal will have option to make modifications to the transaction selected
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  )
}
