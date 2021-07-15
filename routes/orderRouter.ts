import express, { Request, Response } from 'express'
import * as orderModel from '../models/order'
import { Order, BasicOrder } from '../types/order'
const orderRouter = express.Router();


orderRouter.get('/', async (req: Request, res: Response) => {
    console.log("I am called")
    await orderModel.findAll((err: Error, orders: Order[]) => {
        if (err) {
            return res.status(500).json({ "error": err.message });
        }
        res.status(200).json({ "data": orders })
    })
})

orderRouter.post("/", async (req: Request, res: Response) => {
    const newOrder: BasicOrder = await req.body
    await orderModel.create(newOrder, (err: Error, orderId: number) => {
        if (err) { res.status(500).json({ "error": err.message }) }
        res.status(200).json({ "orderId": orderId })
    })
})

orderRouter.get("/:id", async (req: Request, res: Response) => {
    const orderId: number = await Number(req.params.id);
    await orderModel.findOne(orderId, (err: Error, order: Order) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "data": order });
    })
});

orderRouter.put("/:id", async (req: Request, res: Response) => {
    const order: Order = await req.body;
    await orderModel.update(order, (err: Error) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }

        res.status(200).send();
    })
});

export { orderRouter };
