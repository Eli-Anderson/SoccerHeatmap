class Team:

    def __init__(self, players):
        self._players = players
        self._long_name = None
        
    
    def set_name(self, name):
        self._long_name = name
        