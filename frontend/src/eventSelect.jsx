import React from "react";
import {
    NativeSelect,
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

const eventLabels = {
    throwin: "Throw in",
    foulcommit: "Foul",
    cross: "Cross",
    shotoff: "Shot off",
    shoton: "Shot on",
    card: "Card",
    goal: "Goal",
    corner: "Corner"
};

export const EventSelect = props => {
    const classes = useStyles(props);

    return (
        <div>
            <FormControl>
                <InputLabel htmlFor="eventSelect">Event</InputLabel>
                <NativeSelect
                    id="eventSelect"
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
                    {props.data.map(x => (
                        <option key={x} value={x}>
                            {eventLabels[x]}
                        </option>
                    ))}
                </NativeSelect>
            </FormControl>
        </div>
    );
};
