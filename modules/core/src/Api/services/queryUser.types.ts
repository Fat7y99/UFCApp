// TODO: Construct update profile body based on API.
export interface UpdateProfileBody {
  address?: string;
  birthDate?: string; // Format: DD-MM-YYYY
  gender?: 'MALE' | 'FEMALE';
  preferredLanguage?: 'EN' | 'AR';
}
