variable "stage" {
  type    = string
}

variable "supabase_url" {
  type    = string
}

variable "supabase_service_role" {
  type      = string
  sensitive = true
}

variable "supabase_user_profile_table" {
  type    = string
  default = "Settings"
}

variable "supabase_reminder_table" {
  type    = string
  default = "Reminder"
}

variable "reminder_notifications_cron" {
  type    = string
  default = "0 9 * * ? *"
}

variable "notifications_from_address" {
  type    = string
}
