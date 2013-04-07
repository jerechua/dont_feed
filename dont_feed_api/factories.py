import factory
import models
from random import choice, randint

from django.utils import timezone


class SummonerFactory(factory.DjangoModelFactory):
    FACTORY_FOR = models.Summoner

    internal_name = factory.LazyAttribute(lambda a: choice(('internalname1', 'internalname2', 'internalname3', 'internalname4')))
    name = factory.LazyAttribute(lambda a: choice(('name1','name2', 'name3', 'name4')))
    account_id = factory.LazyAttribute(lambda a: randint(0, 99999999999))
    profile_icon_id = factory.LazyAttribute(lambda a: randint(1, 20))
    revision_date = factory.LazyAttribute(lambda a: timezone.now())
    summoner_level = factory.LazyAttribute(lambda a: randint(1, 30))
    summoner_id = factory.LazyAttribute(lambda a: randint(0, 99999999999))
    region =  factory.LazyAttribute(lambda a: choice(models.Summoner.SERVER_CHOICES))
    feed_points = factory.LazyAttribute(lambda a: randint(0, 9999999))
    pro_points = factory.LazyAttribute(lambda a: randint(0, 9999999))