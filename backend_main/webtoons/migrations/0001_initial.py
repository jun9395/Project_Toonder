# Generated by Django 3.1.7 on 2021-04-05 05:38

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('genre_name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Webtoon',
            fields=[
                ('webtoon_number', models.AutoField(primary_key=True, serialize=False)),
                ('webtoon_name', models.CharField(max_length=100)),
                ('overview', models.TextField()),
                ('webtoon_writer', models.CharField(max_length=50)),
                ('thumbnail_url', models.TextField()),
                ('webtoon_score', models.FloatField()),
                ('webtoon_link', models.TextField(default='')),
                ('webtoon_platform', models.TextField(default='')),
                ('serialized_day', models.TextField(default='')),
                ('overview_morph', models.TextField()),
                ('genres', models.ManyToManyField(related_name='webtoons', to='webtoons.Genre')),
                ('users_webtoon', models.ManyToManyField(related_name='favorites', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
