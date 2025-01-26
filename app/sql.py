from database import Database

db = Database()

def get_db_connection():
    """Establece una nueva conexión a la base de datos y la devuelve."""
    return db.connect()

class Sql:
#**************VENDEDOR/SEMILLAS

    def select_semillas():#----------------------------------------------/semillas
        conexion = db.connect()
        cursor = conexion.cursor()
        sql = "SELECT IdSemilla, NombreCientSemilla, imagen FROM semillas"
        cursor.execute(sql)
        resultado = cursor.fetchall()
        cursor.close()
        conexion.close()
        return resultado
    
    def update_semillas(nombre, imagen, id_receta):#---------------------/actualizar_producto
        
        conexion = db.connect()
        cursor = conexion.cursor()
        sql = "UPDATE semillas SET NombreCientSemilla=%s, imagen=%s WHERE IdSemilla = %s"
        cursor.execute(sql, (nombre, imagen, id_receta))
        conexion.commit()
        cursor.execute("SELECT IdSemilla, NombreCientSemilla, imagen FROM semillas")
        resultado = cursor.fetchall()
        cursor.close()
        conexion.close()
        return resultado
    
    def insert_semillas(nombre, imagen):#-------------------------/registro_producto
        conexion = db.connect()
        cursor = conexion.cursor()
        sql = "INSERT INTO semillas (NombreCientSemilla, imagen) VALUES (%s, %s)"
        valores = (nombre, imagen)
        cursor.execute(sql, valores)
        conexion.commit()
        cursor.close()
        conexion.close()
        

    #**************ADMIN/SEMILLAS
    def update_receta(Nombre, Descripcion, id_receta):
        conexion = db.connect()
        cursor = conexion.cursor()
        sql = "UPDATE recetas SET Nombre=%s, Descripcion=%s WHERE IdReceta = %s"
        cursor.execute(sql, (Nombre, Descripcion, id_receta))
        conexion.commit()
        cursor.execute("SELECT IdReceta, Nombre, Descripcion FROM recetas")
        resultado = cursor.fetchall()
        cursor.close()
        return resultado