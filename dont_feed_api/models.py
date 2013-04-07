from django.db import models


class BaseModel(models.Model):
    modify_time = models.DateTimeField(auto_now=True)
    create_time = models.DateTimeField(auto_now=True, editable=False)

    class Meta:
        abstract = True


class Summoner(BaseModel):
    """
    All summoner info
    """

    SERVER_CHOICES = (
        ('na', 'North America'),
        ('euw', 'EU West'),
        ('eune', 'EU Nordic & East'),
    )

    internal_name = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    account_id = models.PositiveIntegerField()
    profile_icon_id = models.PositiveIntegerField()
    revision_date = models.DateTimeField()
    summoner_level = models.PositiveIntegerField()
    summoner_id = models.PositiveIntegerField()
    region = models.CharField(max_length=10, choices=SERVER_CHOICES)
    feed_points = models.PositiveIntegerField(default=0)
    pro_points = models.PositiveIntegerField(default=0)


class SummonerAlias(models.Model):
    """
    All known summoner aliases incase summoner changes names
    """

    summoner = models.ForeignKey('Summoner', blank=False, null=False)
    name = models.CharField(max_length=50)

