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

import pymysql.cursors

# Connect to the database
connection = pymysql.connect(host='localhost',
                             user='alice',
                             password='s3cr3t',
                             database='db',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

with connection:
    with connection.cursor() as cursor:
        # Create a new record
        sql = "INSERT INTO `users` (`email`, `password`) VALUES (%s, %s)"
        cursor.execute(sql, ('webmaster@python.org', 'very-secret'))

    # connection is not autocommit by default. So you must commit to save
    # your changes.
    connection.commit()

    with connection.cursor() as cursor:
        # Read a single record
        sql = "SELECT `id`, `password` FROM `users` WHERE `email`=%s"
        cursor.execute(sql, ('webmaster@python.org',))
        result = cursor.fetchone()
        print(result)
