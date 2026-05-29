from rest_framework import viewsets

from rest_framework.permissions import (
    IsAuthenticated
)

from .models import Customer

from .serializers import (
    CustomerSerializer
)

from rest_framework import filters

from django_filters.rest_framework import (
    DjangoFilterBackend
)

from authentication.models import AuditLog

from common.ip_utils import get_client_ip


class CustomerViewSet(
    viewsets.ModelViewSet
):

    queryset = Customer.objects.all(

    ).order_by("-created_at")


    serializer_class = (
        CustomerSerializer
    )

    permission_classes = [
        IsAuthenticated
    ]


    # -----------------------------------
    # FILTERING
    # -----------------------------------
    filter_backends = [

        DjangoFilterBackend,

        filters.SearchFilter,

        filters.OrderingFilter,
    ]


    # -----------------------------------
    # SEARCHABLE FIELDS
    # -----------------------------------
    search_fields = [

        "first_name",

        "last_name",

        "email",

        "phone",
    ]


    # -----------------------------------
    # FILTERABLE FIELDS
    # -----------------------------------
    filterset_fields = [

        "status",

        "city",

        "state",
    ]


    # -----------------------------------
    # ORDERABLE FIELDS
    # -----------------------------------
    ordering_fields = [

        "created_at",

        "first_name",

        "last_name",
    ]


    def perform_create(
        self,
        serializer
    ):

        customer = serializer.save(

            created_by=self.request.user
        )


        # -----------------------------------
        # AUDIT LOG
        # -----------------------------------
        AuditLog.objects.create(

            user=self.request.user,

            event="customer_created",

            ip_address=get_client_ip(self.request),

            user_agent=self.request.META.get(
                "HTTP_USER_AGENT"
            ),

            details={

                "customer_id": customer.id,

                "customer_name":
                    f"{customer.first_name} {customer.last_name}",

                "email": customer.email,
            }
        )
        # -----------------------------------
    # DELETE CUSTOMER
    # -----------------------------------
    def perform_destroy(self, instance):

        customer_name = (
            f"{instance.first_name} "
            f"{instance.last_name}"
        )

        customer_id = instance.id

        instance.delete()

        # -----------------------------------
        # AUDIT LOG
        # -----------------------------------
        AuditLog.objects.create(

            user=self.request.user,

            event="customer_deleted",

            ip_address=get_client_ip(
                self.request
            ),

            user_agent=self.request.META.get(
                "HTTP_USER_AGENT"
            ),

            details={

                "customer_id": customer_id,

                "customer_name": customer_name,
            }
        )