data "archive_file" "user_retriever" {
  type             = "zip"
  source_dir       = "../../dist/user-retriever"
  output_file_mode = "0666"
  output_path      = "${path.module}/../user-retriever.zip"
}

data "archive_file" "reminder_notifications" {
  type             = "zip"
  source_dir       = "../../dist/notifier"
  output_file_mode = "0666"
  output_path      = "${path.module}/../notifier.zip"
}
