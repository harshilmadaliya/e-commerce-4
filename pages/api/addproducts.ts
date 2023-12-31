// const mongoose = require('mongoose');

// import connectDb from '@/middleware/mongoose'
// import {dbConnect} from '@/middleware/mongooes'
import connectDb from '@/middleware/mongoose'
import Product  from '@/models/product'

const handler = async (req: any , res:any) => {
    // const con = await dbConnect()
    if (req.method == 'POST') {
        let p = Product(req.body)
        await p.save()
        res.status(200).json({p})
        
    } else {
        res.status(404).json({Error})
    }
}

export default connectDb(handler)