import { MetaData } from "../Common/common.interfaces";

export class CreateClientDto {
  readonly id: string;
  readonly userId: string;
  readonly email: string;
  readonly pass?: string;
  readonly photo?: string;
  readonly name: string;
  readonly surname: string;
  readonly dob: string;
  readonly gender: string;
  readonly phone: string;
  readonly created: MetaData;
  readonly updated: MetaData;
}
