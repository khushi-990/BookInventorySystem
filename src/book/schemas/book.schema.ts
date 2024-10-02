import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import  { Document, Date } from "mongoose";
import { TABLE_NAMES } from "../../common/constants/table-name.constant";

export type BooksDocument = Books & Document;

@Schema({ collection: TABLE_NAMES.BOOK, timestamps: true })
export class Books {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: false })
  price: number;

  @Prop({ required: false })
  publishedDate: string;

  @Prop({ required: true, default: false })
  isStock: boolean;

  @Prop({type: Date})
  createdAt: Date

  @Prop({type: Date})
  updatedAt: Date
}

export const BooksSchema = SchemaFactory.createForClass(Books);
