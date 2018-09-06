from django.core.exceptions import ValidationError
from django.db import models

# Create your models here.

class SingleInstanceMixin(object):
    """Makes sure that no more than one instance of a given model is created."""

    def clean(self):
        model = self.__class__
        if (model.objects.count() > 0 and self.id != model.objects.get().id):
            raise ValidationError("Można utworzyć tylko 1 %s instancję!" % model.__name__)
        super(SingleInstanceMixin, self).clean()

POGO_TEAMS = (
        ('instinct', 'Instinct'),
        ('mystic', 'Mystic'),
        ('valor', 'Valor'),
)


class Team(models.Model):
    team = models.CharField("Zespół", max_length=255, choices=POGO_TEAMS)

    class Meta:
        verbose_name = "Drużyna"
        verbose_name_plural = "Drużyny"

    def __str__(self):
        return "Drużyna: " + self.team


class Settings(SingleInstanceMixin, models.Model):
    title = models.CharField("Nazwa strony", max_length=255)
    owner_nick = models.CharField("Nick postaci właściciela", max_length=255)
    team = models.ForeignKey(Team, verbose_name="Drużyna właściciela")

    class Meta:
        verbose_name = "Ustawienia"
        verbose_name_plural = "Ustawienia"

    def __str__(self):
        return "Ustawienia"


class TopPlayers(models.Model):
    nickname = models.CharField("Nick", max_length=255)
    level = models.IntegerField("Poziom")

    team = models.ForeignKey(Team, verbose_name="Drużyna")
    trainer_code = models.CharField("Kod trenera", max_length=12, null=True, blank=True)

    class Meta:
        verbose_name = "Topowy gracz"
        verbose_name_plural = "Topowi gracze"

    def __str__(self):
        return "Gracz o nicku: " + self.nickname