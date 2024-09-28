resource "aws_sfn_state_machine" "reminder_notifications" {
  name     = "${var.resource_prefix}reminder-notifications"
  role_arn = aws_iam_role.reminder_notifications_sfn.arn
  type     = "EXPRESS"

  definition = jsonencode({
    "Comment" : "Processes notifications for remindwise",
    "StartAt" : "GetUsers",
    "States" : {
      "GetUsers" : {
        "Type" : "Task",
        "Resource" : aws_lambda_function.user_retriever.arn,
        "Next" : "SendNotifications"
      },
      "SendNotifications" : {
        "Type" : "Map",
        "ItemProcessor" : {
          "ProcessorConfig" : {
            "Mode" : "INLINE"
          },
          "StartAt" : "SendToSNS",
          "States" : {
            "SendToSNS" : {
              "Type" : "Task",
              "Resource" : "arn:aws:states:::sns:publish",
              "Parameters" : {
                "TopicArn" : aws_sns_topic.reminder_notifications.arn,
                "Message.$" : "$",
                "MessageGroupId.$" : "$.id"
              },
              "End" : true
            }
          }
        },
        "End" : true
      }
    }
  })

  logging_configuration {
    log_destination        = "${aws_cloudwatch_log_group.reminder_notifications_sfn.arn}:*"
    include_execution_data = true
    level                  = "ALL"
  }
}

resource "aws_iam_role" "reminder_notifications_sfn" {
  name = "${var.resource_prefix}reminder-notifications-sfn-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "states.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_policy" "reminder_notifications_sfn_lambda" {
  name = "${var.resource_prefix}reminder-notifications-sfn-lambda"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "lambda:InvokeFunction"
        ],
        Resource = aws_lambda_function.user_retriever.arn
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "reminder_notifications_sfn_lambda" {
  role       = aws_iam_role.reminder_notifications_sfn.name
  policy_arn = aws_iam_policy.reminder_notifications_sfn_lambda.arn
}


resource "aws_iam_policy" "reminder_notifications_sfn_sns" {
  name = "${var.resource_prefix}reminder-notifications-sfn-sns"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "sns:Publish"
        ],
        Resource = aws_sns_topic.reminder_notifications.arn
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "reminder_notifications_sfn_sns" {
  role       = aws_iam_role.reminder_notifications_sfn.name
  policy_arn = aws_iam_policy.reminder_notifications_sfn_sns.arn
}

resource "aws_iam_policy" "reminder_notifications_sfn_cloudwatch" {
  name = "${var.resource_prefix}reminder-notifications-sfn-cloudwatch"

  policy = jsonencode({
    Version : "2012-10-17",
    Statement : [
      {
        Effect : "Allow",
        Action : [
          "logs:CreateLogDelivery",
          "logs:CreateLogStream",
          "logs:GetLogDelivery",
          "logs:UpdateLogDelivery",
          "logs:DeleteLogDelivery",
          "logs:ListLogDeliveries",
          "logs:PutLogEvents",
          "logs:PutResourcePolicy",
          "logs:DescribeResourcePolicies",
          "logs:DescribeLogGroups"
        ],
        Resource : "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "reminder_notifications_sfn_cloudwatch" {
  role       = aws_iam_role.reminder_notifications_sfn.name
  policy_arn = aws_iam_policy.reminder_notifications_sfn_cloudwatch.arn
}