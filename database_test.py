from database.database import Database


if __name__ == "__main__":
    db = Database()
    # print(db.read_city(4).fetchone())
    # db.update_city(4, 'Moscow', 1, 2, 100, 'Rus', 1, None)
    db.delete_factory(0)
