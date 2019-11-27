import React from "react";
import {
    Select,
    makeStyles,
    FormControl,
    InputLabel,
    MenuItem
} from "@material-ui/core";

// define our styles here. this transforms css styles to a class so it is easier to apply
const useStyles = makeStyles({
    select: {
        width: 120
    },
    firstItem: {
        color: "gray"
    }
});

const [API_ID, LONG_NAME, SHORT_NAME, TEAM_ID] = [0, 1, 2, 3];

export const TeamSelect = props => {
    const classes = useStyles(props);

    return (
        <div>
            <FormControl>
                <InputLabel htmlFor="teamSelect">Team</InputLabel>
                <Select
                    id="teamSelect"
                    className={classes.select}
                    value={props.value}
                    onChange={props.onChange}
                >
                    <MenuItem
                        className={classes.firstItem}
                        key="all"
                        value="none"
                    >
                        {props.data.length ? "None" : "Loading..."}
                    </MenuItem>
                    {props.data.map(team => (
                        <MenuItem key={team[TEAM_ID]} value={team[TEAM_ID]}>
                            {team[LONG_NAME]}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};
