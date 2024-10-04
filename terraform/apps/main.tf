terraform {
  backend "s3" {}

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {}

module "reminder_notifications" {
  source = "./reminder-notifications"

  stage                       = var.stage
  resource_prefix             = local.resource_prefix
  supabase_url                = var.supabase_url
  supabase_service_role       = var.supabase_service_role
  supabase_user_profile_table = var.supabase_user_profile_table
  supabase_reminder_table     = var.supabase_reminder_table
  reminder_notifications_cron = var.reminder_notifications_cron
  notifications_from_address  = var.notifications_from_address
  notifications_display_name  = var.notifications_display_name
  test_users                  = var.test_users
}
