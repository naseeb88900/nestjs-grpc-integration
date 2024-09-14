import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BurgerShopDocument = BurgerShop & Document;

@Schema()
export class BurgerShop {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    location: string;
}

export const BurgerShopSchema = SchemaFactory.createForClass(BurgerShop);