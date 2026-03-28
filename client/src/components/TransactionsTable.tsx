import { useEffect, useState } from "react"
import axios from "axios"

type transactionType = {
  description: string,
  type: 'expenses' | 'income',
  date: string,
  amount: number,
  currentTotal: number,
  _id?: string,
  user: string
}

const TransactionsTable = () => {
  const [transactions, setTransations] = useState<transactionType[]>([])
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
  const [editData, setEditData] = useState<transactionType>()
  const [newItem, setNewItem] = useState<transactionType>()

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/transaction')
      .then(res => setTransations(res.data))
      .catch(e => console.log(e))
  }, [])

  
function deleteItem(id: string) {
    axios.delete('http://localhost:5000/api/transactions/'+id)
    setTransations(prev => prev.filter(tx => tx._id !== id))
}

function editItem(id: string, item: transactionType){
    axios
    .put('http://localhost:5000/api/transactions/'+id, item)
    .then(res => console.log(res.data))
    .catch(e => console.log(e)
) 
    setTransations([...transactions.filter(tx => tx._id === id), item])
    setShowEditModal(false)
}

function createItem(item: transactionType){
    axios.post('http://localhost:5000/api/transactions', item).then(res => console.log(res.data)).catch(e => console.log(e))
    setTransations([...transactions, item])
    setShowCreateModal(false)
}



  return (
<>
    <div className={`w-full bg-gray-700 h-screen flex-col items-center justify-center outfit ${showEditModal ? 'flex' : 'hidden'}`}>

        <div className="bg-white rounded-lg h-115 w-90 flex flex-col items-center" >
            <h1 className="text-xl p-2 font-semibold" >Edit Transaction</h1>
            <form onSubmit={(e) => {
                e.preventDefault()
               editItem(editData?._id as string, editData as transactionType)
            }}>
                <div className="flex flex-col ">
                    <label className="p-1">Description</label>
                    <input type="text" value={editData?.description} onChange={(e) => setEditData({...editData as transactionType, description: e.target.value})} placeholder="e.g: Monthly Salary" className="border p-1.5 rounded-xl" required/>
                </div>

                <div className="flex flex-col ">
                    <label className="flex flex-col">
                        <span className="p-1">Type</span>
                        <select  className="border rounded-xl focus:outline-0 p-1.5"  defaultValue={editData?.type} onChange={(e) => setEditData({...editData as transactionType, type: e.target.value as 'income' | 'expenses' })} >
                            <option value="income" >Income</option>
                            <option value="expenses">Expenses</option>
                        </select>
                    </label>
                </div>

                <div className="flex flex-col ">
                    <label className="p-1">Amount</label>
                    <input value={editData?.amount} onChange={(e) => setEditData({...editData as transactionType, amount: Number(e.target.value)})} type="number" className="border p-1.5 rounded-xl"required/>
                </div>

                <div className="flex flex-col ">
                    <label className="p-1">Date</label>
                    <input type="date" value={editData?.date ? editData.date.slice(0, 10) : ""} onChange={(e) => setEditData({...editData as transactionType, date: e.target.value})}  className="border p-1.5 rounded-xl" required/>
                </div>

                <div className="flex flex-col ">
                    <label className="p-1">Total</label>
                    <input type="number" value={editData?.currentTotal} onChange={(e) => setEditData({...editData as transactionType, currentTotal: Number(e.target.value)})}  className="border p-1.5 rounded-xl" required/>
                </div>

                <div className="flex flex-row p-3 justify-self-end -mr-17 mt-1">
                    <button className="p-1 border rounded-sm hover:bg-gray-100" onClick={() => setShowEditModal(false)}>Cancel</button>
                    <button className="bg-amber-300 rounded-sm p-2 w-15 mx-2 hover:bg-amber-400" type='submit'>Save</button>
                </div>
                
            </form>
        </div>
    </div>


        <div className={`w-full bg-gray-700 h-screen flex-col items-center justify-center outfit ${showCreateModal ? 'flex' : 'hidden'}`}>

    <div className="bg-white rounded-lg h-115 w-90 flex flex-col items-center" >
            <h1 className="text-xl p-2 font-semibold" >Create Transaction</h1>
            <form onSubmit={(e) =>{
              e.preventDefault()
              createItem(newItem as transactionType)}
              }>
                <div className="flex flex-col ">
                    <label className="p-1">Description</label>
                    <input type="text" value={newItem?.description} onChange={(e) => setNewItem({...newItem as transactionType, description: e.target.value})} placeholder="e.g: Monthly Salary" className="border p-1.5 rounded-xl" required/>
                </div>

                <div className="flex flex-col ">
                    <label className="flex flex-col">
                        <span className="p-1">Type</span>
                        <select  className="border rounded-xl focus:outline-0 p-1.5" defaultValue={newItem?.type} onChange={(e) => setNewItem({...newItem as transactionType, type: e.target.value as 'income' | 'expenses' })} >
                            <option value="income">Income</option>
                            <option value="expenses">Expenses</option>
                        </select>
                    </label>
                </div>

                <div className="flex flex-col ">
                    <label className="p-1">Amount</label>
                    <input value={newItem?.amount} onChange={(e) => setNewItem({...newItem as transactionType, amount: Number(e.target.value)})} type="number" className="border p-1.5 rounded-xl"required/>
                </div>

                <div className="flex flex-col ">
                    <label className="p-1">Date</label>
                    <input type="date" value={newItem?.date ? newItem?.date.slice(0, 10) : ""} onChange={(e) => setNewItem({...newItem as transactionType, date: e.target.value})}  className="border p-1.5 rounded-xl" required/>
                </div>

                <div className="flex flex-col ">
                    <label className="p-1">Total</label>
                    <input type="number" value={newItem?.currentTotal} onChange={(e) => setNewItem({...newItem as transactionType, currentTotal: Number(e.target.value)})}  className="border p-1.5 rounded-xl" required/>
                </div>

                <div className="flex flex-row p-3 justify-self-end -mr-17 mt-1">
                    <button className="p-1 border rounded-sm hover:bg-gray-100" onClick={() => setShowCreateModal(false)}>Cancel</button>
                    <button className="bg-amber-300 rounded-sm p-2 w-15 mx-2 hover:bg-amber-400" type='submit'>Create</button>
                </div>
                
            </form>
        </div>  </div>
    
    <div className="min-h-screen bg-gray-700 text-white flex flex-col items-center  outfit"> 

    
      <h1 className="font-semibold text-2xl mt-4">Transactions Tracker</h1>

      <div className="overflow-x-auto w-full flex justify-center flex-row mt-7">
        <button className="items-center m-2 h-10 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold shadow"
        onClick={() => {
            setShowCreateModal(true)
            setNewItem({
              description: '',
              type: 'income',
              date: new Date().toISOString().split("T")[0],
              amount: 0,
              currentTotal: 0
            })
        }}
        >
          <span className="text-lg">➕</span>
        </button>

        <div>
          <table className="w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold border-b">Description</th>
                <th className="px-4 py-3 text-left text-sm font-semibold border-b">Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold border-b">Date</th>
                <th className="px-4 py-3 text-right text-sm font-semibold border-b">Amount</th>
                <th className="px-4 py-3 text-right text-sm font-semibold border-b">Current Total</th>
                <th className="px-4 py-3 text-center text-sm font-semibold border-b">Actions</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((tx) => (
                <tr key={tx._id} className="hover:bg-gray-600">
                  <td className="px-4 py-3 border-b">{tx.description}</td>

                  <td className="px-4 py-3 border-b">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${ tx.type === "income" ? "bg-blue-300 text-black" : "bg-red-500 text-white"}`}
                    >
                      {tx.type}
                    </span>
                  </td>

                  <td className="px-4 py-3 border-b">
                    {new Date(tx.date).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3 border-b text-right text-green-300 font-medium">
                    {tx.amount}
                  </td>

                  <td className="px-4 py-3 border-b text-right font-semibold">
                    {tx.currentTotal}
                  </td>

                  <td className="px-4 py-3 border-b text-center">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => {
                            setEditData(tx)
                            setShowEditModal(true)
                        }}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-yellow-500 hover:bg-yellow-600 text-black"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteItem(tx._id as string)}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 text-white"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
</>
  )
}

export default TransactionsTable
