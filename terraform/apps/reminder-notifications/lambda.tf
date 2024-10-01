resource "aws_lambda_function" "user_retriever" {
  filename         = data.archive_file.user_retriever.output_path
  function_name    = "${var.resource_prefix}user-retriever"
  role             = aws_iam_role.user_retriever.arn
  handler          = "index.handler"
  source_code_hash = data.archive_file.user_retriever.output_base64sha256
  runtime          = "nodejs20.x"
  architectures    = ["arm64"]
  memory_size      = 256
  timeout          = 30

  environment {
    variables = {
      STAGE                       = var.stage
      SUPABASE_URL                = var.supabase_url
      SUPABASE_SERVICE_ROLE       = var.supabase_service_role
      SUPABASE_USER_PROFILE_TABLE = var.supabase_user_profile_table
      TEST_USERS                  = var.test_users
    }
  }
}

resource "aws_iam_role" "user_retriever" {
  name = "${var.resource_prefix}user-retriever-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com"
        },
        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_policy" "user_retriever_cloudwatch" {
  name = "${var.resource_prefix}user-retriever-cloudwatch"

  policy = jsonencode({
    Version : "2012-10-17",
    Statement : [
      {
        Effect : "Allow",
        Action : [
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Resource : "${aws_cloudwatch_log_group.user_retriever_lambda.arn}:*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "user_retriever_cloudwatch" {
  role       = aws_iam_role.user_retriever.name
  policy_arn = aws_iam_policy.user_retriever_cloudwatch.arn
}

resource "aws_lambda_function" "reminder_notifications" {
  filename         = data.archive_file.reminder_notifications.output_path
  function_name    = "${var.resource_prefix}reminder-notifications"
  role             = aws_iam_role.reminder_notifications.arn
  handler          = "index.handler"
  source_code_hash = data.archive_file.reminder_notifications.output_base64sha256
  runtime          = "nodejs20.x"
  architectures    = ["arm64"]
  memory_size      = 256
  timeout          = 30

  environment {
    variables = {
      SUPABASE_URL                    = var.supabase_url
      SUPABASE_SERVICE_ROLE           = var.supabase_service_role
      SUPABASE_REMINDER_TABLE         = var.supabase_reminder_table
      DYNAMO_NOTIFICATION_STATE_TABLE = aws_dynamodb_table.reminder_notifications.id
      NOTIFICATIONS_FROM_ADDRESS      = var.notifications_from_address
    }
  }
}

resource "aws_lambda_permission" "reminder_notifications" {
  statement_id  = "AllowExecutionFromSQS"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.reminder_notifications.arn
  principal     = "sqs.amazonaws.com"
  source_arn    = aws_sqs_queue.reminder_notifications.arn
}

resource "aws_iam_role" "reminder_notifications" {
  name = "${var.resource_prefix}reminder-notifications-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com"
        },
        Action = "sts:AssumeRole"
      },
    ]
  })
}

resource "aws_iam_policy" "reminder_notifications_ses" {
  name = "${var.resource_prefix}reminder-notifications-ses"

  policy = jsonencode({
    Version : "2012-10-17",
    Statement : [
      {
        Effect = "Allow",
        Action = [
          "ses:SendEmail",
          "ses:SendRawEmail"
        ],
        Resource = "*"
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "reminder_notifications_ses" {
  role       = aws_iam_role.reminder_notifications.name
  policy_arn = aws_iam_policy.reminder_notifications_ses.arn
}

resource "aws_iam_policy" "reminder_notifications_sqs" {
  name = "${var.resource_prefix}reminder-notifications-sqs"

  policy = jsonencode({
    Version : "2012-10-17",
    Statement : [
      {
        Effect = "Allow",
        Action = [
          "sqs:ReceiveMessage",
          "sqs:DeleteMessage",
          "sqs:SendMessage",
          "sqs:GetQueueAttributes"
        ],
        Resource = aws_sqs_queue.reminder_notifications.arn
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "reminder_notifications_sqs" {
  role       = aws_iam_role.reminder_notifications.name
  policy_arn = aws_iam_policy.reminder_notifications_sqs.arn
}

resource "aws_iam_policy" "reminder_notifications_dynamo" {
  name = "${var.resource_prefix}reminder-notifications-dynamo"

  policy = jsonencode({
    Version : "2012-10-17",
    Statement : [
      {
        Effect : "Allow",
        Action : [
          "dynamodb:DescribeTable",
          "dynamodb:Query",
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
        ],
        Resource : aws_dynamodb_table.reminder_notifications.arn
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "reminder_notifications_dynamo" {
  role       = aws_iam_role.reminder_notifications.name
  policy_arn = aws_iam_policy.reminder_notifications_dynamo.arn
}

resource "aws_iam_policy" "reminder_notifications_cloudwatch" {
  name = "${var.resource_prefix}reminder-notifications-cloudwatch"

  policy = jsonencode({
    Version : "2012-10-17",
    Statement : [
      {
        Effect : "Allow",
        Action : [
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Resource : "${aws_cloudwatch_log_group.reminder_notifications_lambda.arn}:*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "reminder_notifications_cloudwatch" {
  role       = aws_iam_role.reminder_notifications.name
  policy_arn = aws_iam_policy.reminder_notifications_cloudwatch.arn
}
