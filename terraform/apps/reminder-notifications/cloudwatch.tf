resource "aws_cloudwatch_log_group" "reminder_notifications_lambda" {
  name = "/aws/lambda/${aws_lambda_function.reminder_notifications.function_name}"
}

resource "aws_cloudwatch_log_group" "reminder_notifications_sfn" {
  name = "/aws/sfn/${var.resource_prefix}reminder-notifications"
}

resource "aws_cloudwatch_log_group" "user_retriever_lambda" {
  name = "/aws/lambda/${aws_lambda_function.user_retriever.function_name}"
}
