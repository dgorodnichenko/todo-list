import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(160)
    title!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(2000)
    description!: string;
}