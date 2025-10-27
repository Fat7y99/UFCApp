import type Role from './Role';

interface BaseUser {
  id?: number;
  username?: string;
  name?: string;
  email?: string;
  phone?: string;
  idNumber?: string;
  active?: boolean;
  preferredLanguage?: string;
  gender?: string;
  address?: string;
  birthDate?: string;
  creationDate?: string;
  updatedDate?: string;
  roles?: Role[];
}

export default BaseUser;
