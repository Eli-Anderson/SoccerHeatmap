import React from "react";
import {
    makeStyles,
    InputLabel,
    FormControl,
    NativeSelect
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

export const PlayerSelect = props => {
    const classes = useStyles(props);

    return (
        <div>
            <FormControl>
                {/* if a team is selected, show 'Player', otherwise show 'Select a team' */}
                <InputLabel htmlFor="playerSelect">Player</InputLabel>
                <NativeSelect
                    id="playerSelect"
                    className={classes.select}
                    value={props.value}
                    onChange={props.onChange}
                >
                    <option
                        className={classes.firstItem}
                        key="all"
                        value="none"
                    >
                        {props.data.length ? "" : "Loading..."}
                    </option>
                    {props.data.map((x, i) => (
                        <option key={x + i} value={x}>
                            {x}
                        </option>
                    ))}
                </NativeSelect>
            </FormControl>
        </div>
    );
};
