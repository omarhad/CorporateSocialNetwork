import { Request } from '@nestjs/common';
import { User } from '@prisma/client';

export interface InterfaceRequestWithUser extends Request {
  user: User;
  id: string;
}
