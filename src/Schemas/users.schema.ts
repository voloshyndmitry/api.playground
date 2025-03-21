import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UsersDocument = HydratedDocument<UsersDataClass>;

@Schema({ collection: "users" })
export class UsersDataClass {
  @Prop({ required: false })
  userId: string;

  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop()
  email: string;

  @Prop({ required: true })
  pass: string;

  @Prop()
  phone: string;

  @Prop()
  photo: string;
}

export const UserSchema = SchemaFactory.createForClass(UsersDataClass);
