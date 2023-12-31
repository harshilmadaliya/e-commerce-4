// const mongoose = require('mongoose');
import mongoose from 'mongoose'

// import {dbConnect} from '@/middleware/mongooes'
const connectDb = require ("@/middleware/mongoose")
import Product  from '@/models/product'

const handler = async (req: any , res:any) => {
    if (req.method == 'POST') {
        // let p = Product(req.body)
        // await p.save()
        // res.status(200).json({p})

        let p = await Product.findByIdAndUpdate(req.body._id , req.body)
        return res.status(200).json({success : "success"})
        
    } else {
        res.status(404).json({Error})
    }
}

export default connectDb(handler)