# Generated by Django 4.1.13 on 2024-02-13 18:47

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("posthog", "0388_add_schema_to_batch_exports"),
    ]

    operations = [
        migrations.AlterField(
            model_name="batchexportdestination",
            name="type",
            field=models.CharField(
                choices=[
                    ("S3", "S3"),
                    ("Snowflake", "Snowflake"),
                    ("Postgres", "Postgres"),
                    ("Redshift", "Redshift"),
                    ("BigQuery", "Bigquery"),
                    ("HTTP", "Http"),
                    ("NoOp", "Noop"),
                ],
                help_text="A choice of supported BatchExportDestination types.",
                max_length=64,
            ),
        ),
    ]