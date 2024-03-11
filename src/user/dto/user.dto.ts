import { IsEmpty, IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { Exclude } from "class-transformer";

export class UserDTO extends BaseDTO {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  lastname!: string;

  @IsNotEmpty()
  username!: string; // ! indica que no será null

  @IsNotEmpty()
  email!: string;

  @Exclude() // no lo respondas en el response http
  @IsNotEmpty()
  password!: string;

  @IsNotEmpty()
  city!: string;

  @IsNotEmpty()
  province!: string;
}
