from rest_framework import serializers

from .models import Customer


class CustomerSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = Customer

        fields = "__all__"

        read_only_fields = [

            "id",

            "created_by",

            "created_at",

            "updated_at",
        ]


    # -----------------------------------
    # VALIDATE PHONE
    # -----------------------------------
    def validate_phone(self, value):

        if len(value) < 10:

            raise serializers.ValidationError(

                "Phone number too short."
            )

        return value