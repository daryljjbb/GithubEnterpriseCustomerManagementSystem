from django.db import models

from django.conf import settings


class Customer(models.Model):

    # -----------------------------------
    # STATUS CHOICES
    # -----------------------------------
    ACTIVE = "active"

    INACTIVE = "inactive"

    LEAD = "lead"


    STATUS_CHOICES = [

        (ACTIVE, "Active"),

        (INACTIVE, "Inactive"),

        (LEAD, "Lead"),
    ]


    # -----------------------------------
    # CUSTOMER INFO
    # -----------------------------------
    first_name = models.CharField(
        max_length=100
    )

    last_name = models.CharField(
        max_length=100
    )

    email = models.EmailField(
        unique=True
    )

    phone = models.CharField(
        max_length=20
    )

    date_of_birth = models.DateField(
        null=True,
        blank=True
    )

    address = models.CharField(
        max_length=255,
        blank=True
    )

    city = models.CharField(
        max_length=100,
        blank=True
    )

    state = models.CharField(
        max_length=100,
        blank=True
    )

    zip_code = models.CharField(
        max_length=20,
        blank=True
    )


    # -----------------------------------
    # CUSTOMER STATUS
    # -----------------------------------
    status = models.CharField(

        max_length=20,

        choices=STATUS_CHOICES,

        default=LEAD
    )


    # -----------------------------------
    # AUDIT FIELDS
    # -----------------------------------
    created_by = models.ForeignKey(

        settings.AUTH_USER_MODEL,

        on_delete=models.SET_NULL,

        null=True,

        related_name="customers_created"
    )


    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )


    # -----------------------------------
    # STRING REPRESENTATION
    # -----------------------------------
    def __str__(self):

        return f"{self.first_name} {self.last_name}"