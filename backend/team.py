from db_factory import DB_Factory

class Team:

    def __init__(self, name):
        #self._players = players
        self._long_name = name[0]
        self._short_name = name[1]

    
    def set_long_name(self, long_name):
        self._long_name = long_name
    
    def set_short_name(self, short_name):
        self._short_name = short_name
    
    def get_short_name(self):
        return self._short_name
    
    def get_long_name(self):
        return self._long_name