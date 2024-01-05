
from django.urls import path,include
from .views import RegisterView,LoginView
from account.views import * #----------- date : 3/01/2024------------
from django.contrib.auth import views as auth_views #----------------------date : 5/01/2024 for reset_password , * related to password
from django.core.mail.backends.smtp import EmailBackend #------------date : 5/01/2024 for reset_password

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [

    path('register/',RegisterView.as_view(),name='register'),
    path('login/',LoginView.as_view(),name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('send_otp/',send_otp),
    path('verify_otp/',verify_otp),
    path('resend_otp/',resend_otp),

    
    #-------------- date : 5/01/2024 ---- reset password -----
    path('reset_password/',auth_views.PasswordResetView.as_view(),name='reset_password'), #Submit email form  //PasswordResetView.as_view()
    path('password_reset_done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'), #Emal sent success message //PasswordResetDoneView.as_view()
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'), #link to password reset form in email //PasswordResetConfirmView.as_view()
    path('reset_password_complete/',auth_views.PasswordResetCompleteView.as_view(),name='password_reset_complete') #password successfully changed message //PasswordResetCompleteView.as_view()


]