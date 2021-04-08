from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from accounts.models import User

class NewUserAdmin(UserAdmin):
    #리스트 화면에서 뜨는 부분
    list_display = ('email', 'username', 'date_joined', 'last_login', 'is_admin', 'is_staff')
    #검색하면 나오는 부분
    search_fields = ('email', 'username')
    #클릭시 수정이 불가능하다. 
    readonly_fields = ('user_id', 'date_joined', 'last_login')


    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()
    
admin.site.register(User, NewUserAdmin)
