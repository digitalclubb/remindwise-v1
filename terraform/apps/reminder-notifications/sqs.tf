resource "aws_sqs_queue" "reminder_notifications" {
  name                        = "${var.resource_prefix}reminder-notifications.fifo"
  fifo_queue                  = true
  content_based_deduplication = true

  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.reminder_notifications_dlq.arn
    maxReceiveCount     = 1
  })
}

resource "aws_lambda_event_source_mapping" "reminder_notifications_sqs" {
  event_source_arn = aws_sqs_queue.reminder_notifications.arn
  function_name    = aws_lambda_function.reminder_notifications.arn
  batch_size       = 1
}

resource "aws_sqs_queue" "reminder_notifications_dlq" {
  name                        = "${var.resource_prefix}reminder-notifications-dlq.fifo"
  fifo_queue                  = true
  content_based_deduplication = true
}

resource "aws_sqs_queue_policy" "reminder_notifications" {
  queue_url = aws_sqs_queue.reminder_notifications.url
  policy    = data.aws_iam_policy_document.reminder_notifications_sqs_sns.json
}

data "aws_iam_policy_document" "reminder_notifications_sqs_sns" {
  statement {
    sid       = "ReminderNotificationsSNS"
    actions   = ["sqs:SendMessage"]
    resources = [aws_sqs_queue.reminder_notifications.arn]

    principals {
      type        = "Service"
      identifiers = ["sns.amazonaws.com"]
    }

    condition {
      test     = "ArnEquals"
      variable = "aws:SourceArn"
      values   = [aws_sns_topic.reminder_notifications.arn]
    }
  }
}
