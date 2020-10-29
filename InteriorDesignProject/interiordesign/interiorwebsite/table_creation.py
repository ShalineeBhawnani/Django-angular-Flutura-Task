from . import database
# create all tables
def CreateTables():
    try:
        conn = database.connect_database()
        cur = conn.cursor()
        cur.execute("CREATE TABLE if not exists ContectDetails (id SERIAL PRIMARY KEY,name TEXT NOT NULL);")
        conn.commit()
        cur.execute("CREATE TABLE if not exists Contect (user_id INTEGER REFERENCES users (id),phone_number TEXT UNIQUE NOT NULL,address TEXT NOT NULL,PRIMARY KEY (user_id, phone_number));")
        conn.commit()
        cur.execute("CREATE TABLE if not exists propertyTypes (id SERIAL PRIMARY KEY,name TEXT NOT NULL,);")
        conn.commit()
        cur.execute("CREATE TABLE if not exists cutomer (id SERIAL PRIMARY KEY,name TEXT NOT NULL,phone_number TEXT UNIQUE NOT NULL,email varchar(100),property INTEGER REFERENCES propertyTypes (id),service varchar(30),message varchar(200));")
        conn.commit()
        cur.execute("CREATE TABLE if not exists passenger_movement(ID SERIAL PRIMARY KEY, Date TIMESTAMP WITHOUT time zone, ArrivalsActualCounts INT, DeparturesActualCounts INT);")
        conn.commit()
        cur = conn.cursor()
        return HttpResponse("table created succussfully in database") 
     
    except Exception as err:
        print("Error while connecting to PostgreSQL",err)
        cur.close
        return HttpResponse("table not created",err) 


# table_creation.CreateTables()

from django.db.models import DateTimeField
class DateTimeWithoutTZField(DateTimeField):
    def db_type(self, connection):
        return 'timestamp'