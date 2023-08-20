import mysql.connector as connector

config = {
    'user': 'root',
    'password': '...',
    'host': '127.0.0.1',  # MySQL 容器的 IP 地址
    'database': 'db_jobAppManager',
    'raise_on_warnings': True
}


def get_connection() -> connector.connection_cext.CMySQLConnection:

    try:
        connection = connector.connect(**config)
        if connection.is_connected():
            print("Connected to MySQL database")
        else:
            raise Exception('Database not connected')
    except Exception as e:
        print('Connection failed')
        print(f'Exception: {e}')

    return connection
