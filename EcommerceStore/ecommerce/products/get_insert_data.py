from . import database

def insert_product(product_name,product_description,product_image,product_color,product_category):
    try:

        conn = database.connect_database()
        cur = conn.cursor()
        cur.execute('INSERT INTO products_Product (name,description,image,color,category_id) VALUES (%s, %s, %s, %s, %s)', (product_name,product_description,product_image,product_color,product_category))
        conn.commit()

    except Exception as err:
        return HttpResponse("Error while inserting sql data in company table",err) 
    finally:
        cur.close()
        if conn is not None:
            conn.close ()