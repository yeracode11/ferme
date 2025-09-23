from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import MenuItem, Order
from .serializers import MenuItemSerializer, OrderSerializer

class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.filter(available=True)
    serializer_class = MenuItemSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
            headers=headers
        )