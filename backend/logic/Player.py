class Player:

    def __init__(self, id, player_number, name, position):
        self._id = id
        self._player_number = player_number
        self._name = name
        self._position = position

    def getPosition(self):
        return self._position
    
    def setPosition(self, position):
        self._position = position