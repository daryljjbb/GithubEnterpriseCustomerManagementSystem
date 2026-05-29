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
    # VALIDATE EMAIL
    # -----------------------------------
    def validate_email(self, value):

        customer = Customer.objects.filter(
                email=value
            )

        # Ignore current instance during edit
        if self.instance:

            customer = customer.exclude(
                        id=self.instance.id
                    )

        if customer.exists():

            raise serializers.ValidationError(

                "Customer email already exists."
            )

        return value    
    # -----------------------------------
    # VALIDATE PHONE
    # -----------------------------------
    def validate_phone(self, value):

        if len(value) < 10:

            raise serializers.ValidationError(

                "Phone number too short."
            )

        return value
    
    