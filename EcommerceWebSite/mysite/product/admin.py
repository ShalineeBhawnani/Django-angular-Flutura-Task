from django.contrib import admin
from .models import Category, Product,OrderItem,Subcategory,Order

admin.site.register(Category)
admin.site.register(Subcategory)
admin.site.register(Product)
admin.site.register(OrderItem)
admin.site.register(Order)

# class CategoryAdmin(admin.ModelAdmin):
#     list_display = ['name','slug']
#     prepopulated_fields = {'slug' : ('name',)}
# admin.site.register(Category,CategoryAdmin)

# class SubcategoryAdmin(admin.ModelAdmin):
#     list_display = ['name','slug']
#     prepopulated_fields = {'slug' : ('name',)}
# admin.site.register(Subcategory,SubcategoryAdmin)

# class ProductAdmin(admin.ModelAdmin):
#     list_display = ['id', 'name','slug','price','created_at','updated_at']
#     prepopulated_fields = {'slug' : ('name',)}
#     list_filter = ['created_at','updated_at']
#     list_editable = ['price']
# admin.site.register(Product,ProductAdmin)

# admin.site.register(OrderItem)
