import { IsInt, IsString, Matches, Max, Min } from 'class-validator';

export default class updateUserDto {
  @IsString()
  @Matches(/^[A-Za-z0-9]+$/i)
  password!: string;

  @IsInt()
  @Max(130)
  @Min(18)
  age!: number;
}
