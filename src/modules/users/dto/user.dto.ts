export class UserDto {
  readonly id: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly username: string;
  readonly email: string;
  createdOn?: Date;
}