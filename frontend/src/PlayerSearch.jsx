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
    const [selected, setSelected] = useState(null);

    const [isFocused, bindFocus] = useFocus();

    const inputRef = useRef(null);

    useEffect(() => {
        if (value) {
            setData(
                allPlayers.filter(p =>
                    p.name.toLowerCase().includes(value.toLowerCase())
                )
            );
        }
    }, [value, allPlayers]);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3001/search/players/${event}`)
            .then(r => r.json())
            .then(d => {
                const players = d.map(([id, name]) => ({ id, name }));
                setAllPlayers(players);
                setValue("");
                setData(players);
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
                // if not focused, set value to the selected player name
                value={isFocused ? value : selected ? selected.name : value}
                onChange={ev => {
                    setValue(ev.target.value);
                }}
                disabled={loading || !event || event === "none"}
                {...bindFocus}
            />
            <Fade in={isFocused}>
                <MenuList classes={{ root: classes.menu }}>
                    {data.slice(0, 30).map(p => (
                        <MenuItem
                            key={p.id}
                            value={p.id}
                            onClick={() => {
                                onChange(p.id);
                                setSelected(p);
                            }}
                            style={
                                selected && p.id === selected.id
                                    ? {
                                          backgroundColor: "#303f9f",
                                          color: "white"
                                      }
                                    : null
                            }
                        >
                            {p.name}
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
