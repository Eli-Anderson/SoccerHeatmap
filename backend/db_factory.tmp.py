# Temporary db_factory file

## (Shot off)

# fouls
def player_heatmap_fouls(self, player_name):
        search_string = '' + player_name
        statement = 'select pos_x, pos_y ' \
                    'from soccer02.player ' \
                    'join soccer02.matchevent on soccer02.player.player_id = soccer02.matchevent.player_player_id ' \
                    'where upeer(soccer02.player.name) like \'%' + search_string.upper() + '%\'and event_type like \'foulcommit\' ' \
                    'and pos_x is not null and pos_y is not null and player.name is not null and player_id is not null ' \
                    'and player_player_id is not null;'
        self.connection.cursor.execute(statement)
        res = self.connection.cursor.fetchall()
        pprint(res)
        return res

# corner
def player_heatmap_corner(self, player_name):
        search_string = '' + player_name
        statement = 'select pos_x, pos_y ' \
                    'from soccer02.player ' \
                    'join soccer02.matchevent on soccer02.player.player_id = soccer02.matchevent.player_player_id ' \
                    'where upeer(soccer02.player.name) like \'%' + search_string.upper() + '%\'and event_type like \'corner\' ' \
                    'and pos_x is not null and pos_y is not null and player.name is not null and player_id is not null ' \
                    'and player_player_id is not null;'
        self.connection.cursor.execute(statement)
        res = self.connection.cursor.fetchall()
        pprint(res)
        return res

# goals
def player_heatmap_goal(self, player_name):
        search_string = '' + player_name
        statement = 'select pos_x, pos_y ' \
                    'from soccer02.player ' \
                    'join soccer02.matchevent on soccer02.player.player_id = soccer02.matchevent.player_player_id ' \
                    'where upeer(soccer02.player.name) like \'%' + search_string.upper() + '%\'and event_type like \'goal\' ' \
                    'and pos_x is not null and pos_y is not null and player.name is not null and player_id is not null ' \
                    'and player_player_id is not null;'
        self.connection.cursor.execute(statement)
        res = self.connection.cursor.fetchall()
        pprint(res)
        return res

# shoton
def player_heatmap_shoton(self, player_name):
        search_string = '' + player_name
        statement = 'select pos_x, pos_y ' \
                    'from soccer02.player ' \
                    'join soccer02.matchevent on soccer02.player.player_id = soccer02.matchevent.player_player_id ' \
                    'where upeer(soccer02.player.name) like \'%' + search_string.upper() + '%\'and event_type like \'shoton\' ' \
                    'and pos_x is not null and pos_y is not null and player.name is not null and player_id is not null ' \
                    'and player_player_id is not null;'
        self.connection.cursor.execute(statement)
        res = self.connection.cursor.fetchall()
        pprint(res)
        return res

# shot off
def player_heatmap_shotoff(self, player_name):
        search_string = '' + player_name
        statement = 'select pos_x, pos_y ' \
                    'from soccer02.player ' \
                    'join soccer02.matchevent on soccer02.player.player_id = soccer02.matchevent.player_player_id ' \
                    'where upeer(soccer02.player.name) like \'%' + search_string.upper() + '%\'and event_type like \'shotoff\' ' \
                    'and pos_x is not null and pos_y is not null and player.name is not null and player_id is not null ' \
                    'and player_player_id is not null;'
        self.connection.cursor.execute(statement)
        res = self.connection.cursor.fetchall()
        pprint(res)
        return res

