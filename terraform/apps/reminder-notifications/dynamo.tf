resource "aws_dynamodb_table" "reminder_notifications" {
  name         = "${var.resource_prefix}reminder-notifications"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "userId"

  attribute {
    name = "userId"
    type = "S"
  }
}
