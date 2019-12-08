import React, { useRef, useEffect, useCallback, useState } from "react";
import h337 from "heatmap.js";
import {
    LinearProgress,
    Fade,
    Typography,
    Slider,
    Box
} from "@material-ui/core";

export const Heatmap = props => {
    const containerRef = useRef();

    const [max, setMax] = useState(2);

    // data stores the filtered data: the data we want to visualize
    // we must change our visualization whenever data changes

    const heatmapRef = useRef(null);

    const initializeHeatmap = useCallback(() => {
        heatmapRef.current = h337.create({
            container: containerRef.current
        });
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        const heatmap = heatmapRef.current;
        if (container && heatmap) {
            if (props.data && props.data.length) {
                const scale = {
                    x: container.clientWidth / 69,
                    y: container.clientHeight / 45
                };
                const formattedData = props.data.map(point => ({
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
    }, [props.data, max]);

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
                onChange={(ev, value) => setMax(value)}
            />
            <div style={{ width: "100%", height: "100%" }}>
                {!props.data.length && !props.loading && (
                    <Box textAlign="center">
                        <Typography>No Data Available</Typography>
                    </Box>
                )}
                <Fade in={props.loading}>
                    <LinearProgress style={{ height: 6 }} variant="query" />
                </Fade>
                <div ref={containerRef}>
                    <img
                        onLoad={() => initializeHeatmap()}
                        src="field.svg"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
};
