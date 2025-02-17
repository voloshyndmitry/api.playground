import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateClientDto } from "../DTO/create-client.dto";
import { ClientsDataClass } from "../Schemas/clients.schema";
import { UsersService } from "./users.service";
import { PAYMENT_STATUS } from "src/Common/common.interfaces";

const hyperid = require("hyperid");
const generateId = hyperid({ urlSafe: true });

@Injectable()
export class ClientsService {
  payments;

  constructor(
    @InjectModel(ClientsDataClass.name)
    private clientsModel: Model<ClientsDataClass>,
    private usersService: UsersService,
  ) {}

  async create(
    createClientDto: CreateClientDto,
    user
  ): Promise<ClientsDataClass> {
    const id = generateId();
    const currentUser = await this.usersService.findOne(user.sub);
    const created = {
      date: new Date().getTime(),
      userId: 0,
    };
    const createdClient = new this.clientsModel({
      id,
      ...createClientDto,
      userId: currentUser.id,
      isApproved: true,
      created,
      updated: created,
    });

    return createdClient.save();
  }

  async update(
    createClientDto: CreateClientDto,
    user
  ): Promise<ClientsDataClass> {
    const updated = {
      date: new Date().getTime(),
      userId: user.sub,
    };
    const { id, ...updateData } = createClientDto;
    const resp = await this.clientsModel.findOneAndUpdate(
      { id },
      { ...updateData, updated },
      {
        new: true,
      }
    );

    return resp;
  }

  async updateValue(
    createClientDto: CreateClientDto,
    user
  ): Promise<ClientsDataClass> {
    const updated = {
      date: new Date().getTime(),
      userId: user.sub,
    };
    const { id, ...updateData } = createClientDto;

    const resp = await this.clientsModel.findOneAndUpdate(
      { id },
      { ...updateData, updated }
    );

    return resp;
  }

  private getStatus({ id: clientId }: CreateClientDto): string {
    if (status?.toLowerCase?.() === PAYMENT_STATUS.NOT_ACTIVE) {
      return status;
    }

    const lastPaymentByClientId = this.payments
      .sort((next, prev) => Number(prev.date) - Number(next.date))
      .find(
        (payment) =>
          payment.clientId === clientId &&
          payment.title.toLowerCase() === "membership"
      );
    if (!lastPaymentByClientId) {
      return PAYMENT_STATUS.PENDING;
    }

    const date = Number(lastPaymentByClientId.date);
    const expireDate = new Date(date).setMonth(new Date(date).getMonth() + 1);
    const currentDate = new Date().getTime();

    return expireDate > currentDate
      ? PAYMENT_STATUS.ACTIVE
      : PAYMENT_STATUS.PENDING;
  }

  async findAll(user): Promise<ClientsDataClass[]> {
    const currentUser = await this.usersService.findOne(user.sub);

    const clients = await this.clientsModel
      .find({ userId: currentUser.id })
      .exec();

    return clients
      .map((client) => {
        const { _id, ...clientData } = client.toObject();
        return {
          ...clientData,
          status: this.getStatus(client),
        };
      });
  }

  async findOne(id: string): Promise<ClientsDataClass> {
    return this.clientsModel.findOne({ id: id }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.clientsModel
      .deleteOne({ id }).exec();
    return deletedCat;
  }
}
