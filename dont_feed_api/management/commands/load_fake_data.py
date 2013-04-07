from django.core.management.base import BaseCommand
from dont_feed_api import factories


class Command(BaseCommand):
    help = 'Creates fake data'

    def handle(self, *args, **options):
        for i in range(20):
            summoner = factories.SummonerFactory.create()

        print "Created Factory Data!"