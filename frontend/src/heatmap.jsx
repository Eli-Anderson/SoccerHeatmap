import React, { useRef, useEffect, useCallback, useState } from "react";
import h337 from "heatmap.js";
import {
    LinearProgress,
    Fade,
    Typography,
    Slider,
    Box,
    CircularProgress,
    Popover,
    IconButton
} from "@material-ui/core";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";

export const Heatmap = ({ data, loading, allTeams, ...props }) => {
    const containerRef = useRef();

    const [max, setMax] = useState(2);
    const [clickedEvents, setClickedEvents] = useState([]);
    const [clickedIndex, setClickedIndex] = useState(0);
    const [loadingClickedEvents, setLoadingClickedEvents] = useState(false);
    const [popoverOpen, setPopoverOpen] = useState(false);

    // data stores the filtered data: the data we want to visualize
    // we must change our visualization whenever data changes

    const heatmapRef = useRef(null);

    const initializeHeatmap = useCallback(() => {
        heatmapRef.current = h337.create({
            container: containerRef.current
        });
    }, []);

    useEffect(() => {
        if (heatmapRef.current && containerRef.current) {
            const canvas = heatmapRef.current._renderer.canvas;

            // set cursor type on mouse move
            canvas.onmousemove = ev => {
                const container = containerRef.current;
                const scale = {
                    x: container.clientWidth / 69,
                    y: container.clientHeight / 45
                };
                const x = Math.round(ev.offsetX / scale.x);
                const y = Math.round(ev.offsetY / scale.y);
                if (
                    data.length &&
                    data.filter(point => point.x === x && point.y === y).length
                ) {
                    canvas.style.cursor = "pointer";
                } else {
                    canvas.style.cursor = "";
                }
            };

            // open event info on click
            canvas.onclick = ev => {
                const container = containerRef.current;
                const scale = {
                    x: container.clientWidth / 69,
                    y: container.clientHeight / 45
                };
                const x = Math.round(ev.offsetX / scale.x);
                const y = Math.round(ev.offsetY / scale.y);
                if (data.length) {
                    const events = data
                        .filter(point => point.x === x && point.y === y)
                        .map(d => ({
                            ...d,
                            realX: ev.clientX,
                            realY: ev.clientY
                        }));
                    if (events.length) {
                        setLoadingClickedEvents(true);
                        Promise.all(
                            events.map(d =>
                                fetch(
                                    `http://localhost:3001/player/${d.playerID}`
                                ).then(x => x.json())
                            )
                        )
                            .then(responses => {
                                return events.map((d, i) => ({
                                    ...d,
                                    playerName: responses[i][0][2]
                                }));
                            })
                            .then(d => {
                                setClickedEvents(d);
                                setLoadingClickedEvents(false);
                                setPopoverOpen(true);
                            });
                    }
                }
            };
        }
    }, [data]);

    useEffect(() => {
        const container = containerRef.current;
        const heatmap = heatmapRef.current;
        if (container && heatmap) {
            if (data && data.length) {
                const scale = {
                    x: container.clientWidth / 69,
                    y: container.clientHeight / 45
                };
                const formattedData = data.map(point => ({
                    x: Math.floor(point.x * scale.x),
                    y: Math.floor(point.y * scale.y),
                    value: point.value
                }));
                heatmap.setData({
                    max,
                    data: formattedData
                });
            } else {
                heatmap.setData({
                    max,
                    data: []
                });
            }
        }
    }, [data, max]);

    return (
        <div>
            <Typography>Intensity</Typography>
            <Slider
                min={1}
                max={19}
                marks={true}
                step={1}
                valueLabelDisplay="auto"
                value={max}
                // @ts-ignore
                onChange={(ev, value) => setMax(value)}
            />
            <div style={{ width: "100%", height: "100%" }}>
                {!data.length && !loading && (
                    <Box textAlign="center">
                        <Typography>No Data Available</Typography>
                    </Box>
                )}
                <Fade in={loading}>
                    <LinearProgress style={{ height: 6 }} variant="query" />
                </Fade>
                <div ref={containerRef}>
                    <img
                        onLoad={() => initializeHeatmap()}
                        src="field.svg"
                        alt=""
                    />
                    {loadingClickedEvents && (
                        <Box position="absolute" top="50%" left="50%">
                            <Box margin="8px">
                                <CircularProgress />
                            </Box>
                        </Box>
                    )}
                    {clickedEvents.length > 0 && (
                        <Popover
                            open={popoverOpen}
                            anchorReference="anchorPosition"
                            anchorPosition={{
                                left: clickedEvents[0].realX,
                                top: clickedEvents[0].realY
                            }}
                            onClose={() => {
                                setPopoverOpen(false);
                            }}
                        >
                            <Box margin="8px" minWidth="164px">
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    borderBottom="1px solid gainsboro"
                                    marginBottom="12px"
                                >
                                    <IconButton
                                        onClick={() => {
                                            if (clickedIndex > 0) {
                                                setClickedIndex(
                                                    clickedIndex - 1
                                                );
                                            }
                                        }}
                                    >
                                        <ArrowBack />
                                    </IconButton>
                                    <Typography>{`${clickedIndex + 1} of ${
                                        clickedEvents.length
                                    }`}</Typography>
                                    <IconButton
                                        onClick={() => {
                                            if (
                                                clickedIndex <
                                                clickedEvents.length - 1
                                            ) {
                                                setClickedIndex(
                                                    clickedIndex + 1
                                                );
                                            }
                                        }}
                                    >
                                        <ArrowForward />
                                    </IconButton>
                                </Box>
                                <Typography>
                                    {"Comment: " +
                                        (clickedEvents[clickedIndex].comment ||
                                            "None")}
                                </Typography>
                                <Typography>
                                    {"Type: " +
                                        (clickedEvents[clickedIndex].subType ||
                                            "None")}
                                </Typography>
                                <Typography>
                                    {"Team: " +
                                        (allTeams.find(
                                            x =>
                                                x[3] ===
                                                clickedEvents[clickedIndex]
                                                    .teamID
                                        )[1] || "Unknown")}
                                </Typography>
                                <Typography>
                                    {"Player: " +
                                        (clickedEvents[clickedIndex]
                                            .playerName || "Unknown")}
                                </Typography>
                                <Typography>
                                    {"Venue: " +
                                        (clickedEvents[clickedIndex].venue ||
                                            "Unknown")}
                                </Typography>
                                <Typography>
                                    {"Injury Time: " +
                                        (clickedEvents[clickedIndex]
                                            .injuryTime || "N/A")}
                                </Typography>
                                <Typography>
                                    {"Goal Type: " +
                                        (clickedEvents[clickedIndex].goalType ||
                                            "N/A")}
                                </Typography>
                            </Box>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
};
