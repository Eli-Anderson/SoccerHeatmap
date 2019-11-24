import React from "react";
import {
    makeStyles,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    Typography,
    Box
} from "@material-ui/core";

// define our styles here. this transforms css styles to a class so it is easier to apply
const useStyles = makeStyles({
    selectRoot: {
        minWidth: 120
    },
    firstItem: {
        color: "gray"
    }
});

export const MatchSelect = ({ data, teams, ...props }) => {
    const classes = useStyles(props);

    const matches = data.map(match => {
        const team1 = teams.find(t => t[3] === match[1]);
        const team2 = teams.find(t => t[3] === match[2]);
        return {
            id: match[0],
            home: team1[1],
            away: team2[1],
            goalsHome: match[3],
            goalsAway: match[4],
            date: match[5].split(" ")[0] // remove the time component
        };
    });
    return (
        <div>
            <FormControl>
                {/* if a team is selected, show 'Match', otherwise show 'Select a team' */}
                <InputLabel htmlFor="matchSelect">Match</InputLabel>
                <Select
                    id="matchSelect"
                    disabled={!props.team}
                    classes={{
                        root: classes.selectRoot
                    }}
                    value={props.value}
                    onChange={props.onChange}
                >
                    <MenuItem
                        className={classes.firstItem}
                        key="all"
                        value="none"
                    >
                        {data.length ? "None" : "Team required"}
                    </MenuItem>
                    {matches.map(x => (
                        <MenuItem key={x.id} value={x.id}>
                            <Box display="flex" width="100%">
                                <Typography
                                    variant="subtitle2"
                                    color="textPrimary"
                                >
                                    {x.home}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                    style={{
                                        marginLeft: "0.5em",
                                        marginRight: "0.5em"
                                    }}
                                >
                                    ({x.goalsHome})
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                >
                                    vs
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                    style={{
                                        marginLeft: "0.5em",
                                        marginRight: "0.5em"
                                    }}
                                >
                                    ({x.goalsAway})
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    color="textPrimary"
                                >
                                    {x.away}
                                </Typography>
                                <Box flexGrow="1" />
                                <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                    style={{ marginLeft: "0.5em" }}
                                >
                                    {x.date}
                                </Typography>
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};
