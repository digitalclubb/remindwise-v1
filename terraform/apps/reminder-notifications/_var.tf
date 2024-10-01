variable "stage" {
  type = string
}

variable "resource_prefix" {
  type = string
}

variable "supabase_url" {
  type = string
}

variable "supabase_service_role" {
  type      = string
  sensitive = true
}

variable "supabase_user_profile_table" {
  type = string
}

variable "supabase_reminder_table" {
  type = string
}

variable "reminder_notifications_cron" {
  type = string
}

variable "notifications_from_address" {
  type = string
}

variable "test_users" {
  type = string
}
