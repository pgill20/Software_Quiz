# CREATE TABLE rankings (
#     Rank int,
#     FullName varchar(255),
#     Email varchar(255), 
#     Test varchar(255),
#     Score int,
#     TestId varchar(255),
#     Employer varchar(255)
# )

# CREATE TABLE rankings (Rank int, FullName varchar(255), Email varchar(255), Test varchar(255), Score int, TestId varchar(255), Employer varchar(255))


#     db_conn.execute(
#         "CREATE TABLE IF NOT EXISTS ratings "
#         "( id SERIAL NOT NULL, title VARCHAR(255) NOT NULL, "
#         "genre VARCHAR(255) NOT NULL, rating FLOAT NOT NULL, "
#         "PRIMARY KEY (id));"
#     )

import datetime
from urllib import request
from google.cloud.sql.connector import Connector
import sqlalchemy
import pymysql
import mysql.connector

# initialize Connector object
connector = Connector()

# function to return the database connection
def getconn() -> pymysql.connections.Connection:
    conn: pymysql.connections.Connection = connector.connect(
        "boxwood-valve-365621:us-west1:rankings",
        "pymysql",
        user="peelet",
        password="467Ranking",
        db="RankingsDb"
    )
    return conn

def getRankings():

    pool = sqlalchemy.create_engine(
        "mysql+pymysql://",
        creator=getconn,
    )

    with pool.connect() as db_conn:
        result = db_conn.execute("SELECT * FROM entries").fetchall()
        for row in result:
            print(row)
        print("\n")    
    connector.close()

def insertTestResults():
    pool = sqlalchemy.create_engine(
        "mysql+pymysql://",
        creator=getconn,
    )

    with pool.connect() as db_conn:
        insert_stmt = sqlalchemy.text(
        "INSERT INTO entries (guestName, content) values (:guestName, :content)",
        )
        db_conn.execute(insert_stmt, guestName="First Insert", content="Success")
    connector.close()

getRankings()