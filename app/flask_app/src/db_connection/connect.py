import mysql.connector as connector
from src.secret_config.secret_config import DBSecrets

config = {
    'user': DBSecrets.DB_USER,
    'password': DBSecrets.DB_PASSWORD,
    'host': DBSecrets.DB_HOST,  # MySQL 容器的 IP 地址
    'database': DBSecrets.DB_NAME,
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
