resource "aws_sns_topic" "reminder_notifications" {
  name                        = "${var.resource_prefix}reminder-notifications.fifo"
  fifo_topic                  = true
  content_based_deduplication = true
}

resource "aws_sns_topic_subscription" "reminder_notifications_sqs" {
  topic_arn = aws_sns_topic.reminder_notifications.arn
  protocol  = "sqs"
  endpoint  = aws_sqs_queue.reminder_notifications.arn
}
