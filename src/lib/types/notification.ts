
export type NotificationType = "info" | "caution" | "success" | "alert" | "reminder"
export interface Notification {
  from_name: string;
  type: NotificationType
  createdAt: string;
  subject: string;
  content: string;
  id: number;
  to_farm_id: number
  read: boolean
}
