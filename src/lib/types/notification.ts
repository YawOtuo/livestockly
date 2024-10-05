export interface Notification {
  from_name: string;
  type: "info" | "caution" | "success" | "alert" | "reminder"
  createdAt: string;
  subject: string;
  content: string;
  id: number;
  to_farm_id: number
  read: boolean
}
