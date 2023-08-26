import { IsNotEmpty } from "class-validator";

export class CreateVehicleDto {
    @IsNotEmpty()
    company: string;

    @IsNotEmpty()
    model: string;

    @IsNotEmpty()
    year: number;
    // Additional properties can be added as needed
  }
  