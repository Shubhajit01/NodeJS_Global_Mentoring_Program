import { IsInt, IsString, Matches, Max, Min } from 'class-validator';

export class createUserDto {
  @IsString()
  login!: string;

  @IsString()
  @Matches(/^[A-Za-z0-9]+$/i)
  password!: string;

  @IsInt()
  @Max(130)
  @Min(18)
  age!: number;
}
