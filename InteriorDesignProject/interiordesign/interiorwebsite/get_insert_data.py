from . import database
def get_user_data():
    try:
        conn = database.connect_database()
        cur = conn.cursor()
        cur.execute("SELECT * from interiorwebsite_Contect")
        rows = cur.fetchall()
        return rows
    except Exception as err:
        return HttpResponse("Error while fetching sql data from user table",err) 
    finally:
        cur.close()
        conn.close ()
def get_customer_data():
    try:
        conn = database.connect_database()
        cur = conn.cursor()
        cur.execute("SELECT * from interiorwebsite__customer")
        rows = cur.fetchall()
        return rows  
    except Exception as err:
        return HttpResponse("Error while fetching sql data from customer table",err) 
    finally:
        cur.close()
        if conn is not None:
            conn.close ()
def insert_customer_data(customer_name,customer_phone_number,customer_email,customer_property,customer_service,customer_message):
    try:
        conn = database.connect_database()
        cur = conn.cursor()
        cur.execute('INSERT INTO interiorwebsite_Cutomer (name,phone_number,email,property_id,service,message) VALUES (%s, %s, %s, %s, %s, %s)', (customer_name,customer_phone_number,customer_email,customer_property,customer_service,customer_message))
        conn.commit()

    except Exception as err:
        return HttpResponse("Error while inserting sql data in company table",err) 
    finally:
        cur.close()
        if conn is not None:
            conn.close ()

def get_all_property():
    try:
        conn = database.connect_database()
        cur = conn.cursor()
        cur.execute("SELECT * from interiorwebsite_propertytypes")
        rows = cur.fetchall()
        return rows  
    except Exception as err:
        return HttpResponse("Error whilefetching sql data from interiorwebsite_propertytypes table",err) 
    finally:
        cur.close()
        if conn is not None:
            conn.close ()

def fetch_timeseries_data():
    try:
        conn = database.connect_database()
        cur = conn.cursor()
        # get the data
        cur.execute("SELECT * from interiorwebsite_passenger_movement")
        # get the all data
        rows = cur.fetchall()
        return rows
    except Exception as err:
        return HttpResponse("Error while inserting sql data in company table",err) 
    finally:
        print("closed cur")
        cur.close()
        if conn is not None:
            print("closed connection")
            conn.close ()

def insert_passenger_data(Date,ArrivalsActualCounts,DeparturesActualCounts):
    try:
        conn = database.connect_database()
        cur = conn.cursor()
        # insert a new data
        cur.execute('INSERT INTO interiorwebsite_passenger_movement (Date,arrivals_counts,departures_counts) VALUES (%s, %s, %s)', (Date,ArrivalsActualCounts,DeparturesActualCounts))
        # commit changes
        conn.commit()
    except Exception as err:
        return HttpResponse("Error while inserting sql data in company table",err)
    finally:
        
        # close the database communication
        cur.close()
        if conn is not None:
            conn.close ()

def delete():
    try:
        conn = database.connect_database()
        cur = conn.cursor()
        cur.execute('DELETE FROM interiorwebsite_passenger_movement')
        conn.commit()
    except Exception as err:
        return HttpResponse("Error while inserting sql data in company table",err) 
    
    finally:
        """Close the cursor. No further queries will be possible."""
        cur.close()
        if conn is not None:
            conn.close ()

