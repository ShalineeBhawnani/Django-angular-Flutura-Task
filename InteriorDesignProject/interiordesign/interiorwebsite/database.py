import psycopg2
from sqlalchemy import create_engine
def connect_database():
    try:
        conn = psycopg2.connect(
            database = "interiordesigns",
            user = "postgres",
            password = "asdflkjh",
            host = "localhost",
            port = "5432",
        )           
        return conn
    except Exception as err:
        print("Error while connecting to PostgreSQL",err)
        return HttpResponse("Error while connecting to PostgreSQL",err)

def connect_sql__database():
    try:
        engine = create_engine('postgresql://postgres:asdflkjh@localhost:5432/interiordesigns')
        return engine
    except Exception as err:
         print("Error while connecting to PostgreSQL",err)
         return HttpResponse("Error while connecting to PostgreSQL",err)
