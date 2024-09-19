export interface Notification {
  from_name: string;
  type: string;
  date_created: string;
  subject: string;
  message: string;
  id: number;
  to_farm_id: number
}
