resource "aws_scheduler_schedule" "reminder_notifications" {
  name = "${var.resource_prefix}reminder-notifications-schedule"

  flexible_time_window {
    mode = "OFF"
  }

  schedule_expression          = "cron(${var.reminder_notifications_cron})"
  schedule_expression_timezone = "Europe/London"

  target {
    arn      = "arn:aws:scheduler:::aws-sdk:sfn:startExecution"
    role_arn = aws_iam_role.reminder_notifications_schedule.arn

    input = jsonencode({
      Input           = null
      StateMachineArn = aws_sfn_state_machine.reminder_notifications.arn
    })
  }
}

resource "aws_iam_role" "reminder_notifications_schedule" {
  name = "${var.resource_prefix}reminder-notifications-schedule-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        "Effect" : "Allow",
        "Principal" : {
          "Service" : "scheduler.amazonaws.com"
        },
        "Action" : "sts:AssumeRole"
      },
    ]
  })
}

resource "aws_iam_policy" "reminder_notifications_schedule_sfn" {
  name = "${var.resource_prefix}reminder-notifications-schedule-sfn"

  policy = jsonencode({
    Version : "2012-10-17",
    Statement : [
      {
        Action   = "states:StartExecution"
        Effect   = "Allow"
        Resource = aws_sfn_state_machine.reminder_notifications.arn
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "reminder_notifications_schedule_sfn" {
  role       = aws_iam_role.reminder_notifications_schedule.name
  policy_arn = aws_iam_policy.reminder_notifications_schedule_sfn.arn
}
