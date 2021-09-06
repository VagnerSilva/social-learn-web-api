import { User } from '../user/user.schema';
export class ProfileDto {
  id: string;
  name: string;
  active: boolean;
  user: User[];
}
