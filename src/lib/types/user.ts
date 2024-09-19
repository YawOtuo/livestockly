export interface User {
  id: number;
  username: string;
  email: string;
  uid: string;
  permission: string;
  public_id: string | null;
  country: string | null;
  phone_number: string | null;
  contact_address: string | null;
  farm_id: number;
  acceptedIntoFarm: boolean;
  created_at: string;
  updated_at: string;
}
