import Transaction from '../models/transaction.model.js'
import mongoose from 'mongoose'


export const displayAll = async (req, res) => {
    const { id } = req.userId
    try {
        const allTransactionsFromUser = await Transaction.find({ user: id})
        res.json(allTransactionsFromUser)
    } catch (e) {
        console.log(e.message)
        res.json({success: false, message: e.message})
    }
}

export const addItem = async (req, res) => {
    const recievedItem = req.body
    if(!recievedItem.description || !recievedItem.amount || !recievedItem.type || !recievedItem.date || !recievedItem.currentTotal) return res.status(400).json({success: false, message: 'Please Fill in all fields'})
    const newTransaction = new Transaction(recievedItem)

    try {
        await newTransaction.save()
        res.json({success: true, date: newTransaction})
    } catch (e) {
        console.log(e.message)
        res.json({success: false, message: e.message})
    }
}

export const editItem = async (req, res) => {
    const { ItemId } = req.params
    const { id } = req.userId
    const recievedItem = req.body
    if(!recievedItem.description || !recievedItem.amount || !recievedItem.type || !recievedItem.date || !recievedItem.currentTotal) return res.status(400).json({success: false, message: 'Please Fill in all fields'})
    try {
        const updatedItem = await Transaction.findOneAndUpdate({_id: ItemId, user: id}, recievedItem, {new: true})
        res.status(200).json({success: true, data: updatedItem})
    } catch (e) {
        console.log(e.message)
        res.json({success: false, message: e.message})
    }
}

export const deleteItem = async (req, res) => {
    const {ItemId} = req.params
    const { id } = req.userId
    try {
        await Transaction.finOneAndDelete({user: id, _id: ItemId})
        res.status(200).json({success: true})
    } catch (e) {
        console.log(e.message)
        res.json({success: false, message: e.message})
    }
}