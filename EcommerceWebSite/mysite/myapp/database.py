import psycopg2

def connect_database():
    try:
        conn = psycopg2.connect(
            database = "ecommerce",
            user = "postgres",
            password = "asdflkjh",
            host = "localhost",
            port = "5432",
        )           
        return conn
    except Exception as err:
        print("Error while connecting to PostgreSQL",err)