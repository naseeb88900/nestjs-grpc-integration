import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {

    @Prop({ required: true })
    burgerName: string;

    @Prop({ required: true })
    quantity: number;

    @Prop({ required: true })
    customerName: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);