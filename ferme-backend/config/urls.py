from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from django.core.management import call_command
from django.views.decorators.csrf import csrf_exempt
import os

def health_check(request):
    return JsonResponse({"status": "ok", "message": "Ferme API is running"})

@csrf_exempt
def migrate_endpoint(request):
    if request.method == 'POST':
        try:
            call_command('migrate', verbosity=0)
            return JsonResponse({"status": "success", "message": "Migrations applied"})
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)
    return JsonResponse({"status": "error", "message": "POST required"}, status=405)

urlpatterns = [
    path('', health_check),  # Healthcheck для деплоя
    path('migrate/', migrate_endpoint),  # Эндпоинт для миграций
    path('admin/', admin.site.urls),
    path('api/', include('menu.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
else:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

