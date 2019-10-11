class Lineup:

        def __init__(self, lineup, position):
            self._lineup = lineup
            self._position = position
       
        def getPosition(self, player_number):
            return self._position
       
        def getPlayer(self, position):
            return self._position