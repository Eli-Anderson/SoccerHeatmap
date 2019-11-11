import React from "react";
import {
    Select,
    MenuItem,
    makeStyles,
    FormControl,
    InputLabel
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
                    <MenuItem className={classes.firstItem} key="all" value="">
                        {props.data.length ? "All" : "Loading..."}
                    </MenuItem>
                    {props.data.map(x => (
                        <MenuItem key={x} value={x}>
                            {x}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};
