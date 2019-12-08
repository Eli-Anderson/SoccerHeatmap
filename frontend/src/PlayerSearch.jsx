import React, { useState, useEffect, useRef } from "react";
import {
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    MenuList,
    Fade,
    Box
} from "@material-ui/core";

import { useFocus } from "web-api-hooks";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    input: {
        minWidth: 220
    },
    menu: {
        minWidth: 220,
        position: "absolute",
        zIndex: 9999,
        backgroundColor: "white",
        top: 60,
        maxHeight: 500,
        overflow: "scroll",
        boxShadow: "0px 0px 20px 2px #666",
        borderRadius: "0.25rem"
    }
});

export const PlayerSearch = ({ onChange, event, ...props }) => {
    const classes = useStyles(props);

    const [value, setValue] = useState("");
    const [data, setData] = useState([]);
    const [allPlayers, setAllPlayers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [isFocused, bindFocus] = useFocus();

    const inputRef = useRef(null);

    useEffect(() => {
        if (value) {
            setData(allPlayers.filter(p => p.includes(value)));
        }
    }, [value, allPlayers]);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3001/search/players/${event}`)
            .then(r => r.json())
            .then(d => {
                const names = d.map(([x]) => x);
                setAllPlayers(names);
                setValue("");
                setData(names);
            })
            .then(() => setLoading(false));
    }, [event]);

    return (
        <FormControl>
            <InputLabel htmlFor="player">
                {loading ? "Loading..." : "Search for a player"}
            </InputLabel>
            <Input
                classes={{ root: classes.input }}
                ref={inputRef}
                value={value}
                onChange={ev => {
                    setValue(ev.target.value);
                }}
                disabled={loading || !event || event === "none"}
                {...bindFocus}
            />
            <Fade in={isFocused}>
                <MenuList classes={{ root: classes.menu }}>
                    {data.slice(0, 30).map((x, i) => (
                        <MenuItem
                            key={i}
                            onClick={() => {
                                onChange(x);
                                setValue(x);
                            }}
                        >
                            {x}
                        </MenuItem>
                    ))}
                    {data.length > 30 && (
                        <MenuItem disabled>
                            <Box width="100%" textAlign="center">
                                {`${data.length - 30} more`}
                            </Box>
                        </MenuItem>
                    )}
                    {data.length === 0 && (
                        <MenuItem disabled>
                            <Box width="100%" textAlign="center">
                                No data found
                            </Box>
                        </MenuItem>
                    )}
                </MenuList>
            </Fade>
        </FormControl>
    );
};
