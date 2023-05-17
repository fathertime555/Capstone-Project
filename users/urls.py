from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import UserRegistration, LoginView, LogoutView, CheckAuthenticatedView, UserSearch, AddFavoriteItem, AddFavoriteListing, ListFavoriteItems, ListFavoriteListings

app_name = "users"
urlpatterns = [
    path('authenticated/', CheckAuthenticatedView.as_view()), # for testing
    path('register/', UserRegistration.as_view({'post': 'create'})),
    path("search/", UserSearch.as_view({'get': 'list'})),
    path('search/<str:username>/', UserSearch.as_view({'get': 'retrieve'})),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('addfavoritelisting/', AddFavoriteListing.as_view()),
    path('addfavoriteitem/', AddFavoriteItem.as_view()),
    path('favoritelistings/', ListFavoriteListings.as_view()),
    path('favoriteitems/', ListFavoriteItems.as_view()),
]