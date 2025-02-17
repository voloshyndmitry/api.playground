import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { MetaData } from "../Common/common.interfaces";
import { MetaDataSchema } from "../Common/common.schema";

export type ClientsDocument = HydratedDocument<ClientsDataClass>;


@Schema({ collection: "clients" })
export class ClientsDataClass {
  @Prop({ required: true, type: String })
  id: string;

  @Prop({ required: true, type: String })
  userId: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  pass: string;

  @Prop({ type: String })
  photo: string;

  @Prop({ type: String })
  name: string;

  @Prop({ required: true, type: String })
  surname: string;

  @Prop({ type: String })
  dob: string;

  @Prop({ type: String })
  gender: string;

  @Prop({ type: String })
  phone: string;

  @Prop({ required: true, type: MetaDataSchema })
  created: MetaData;

  @Prop({ required: true, type: MetaDataSchema })
  updated: MetaData;
}

export const ClientSchema = SchemaFactory.createForClass(ClientsDataClass);
