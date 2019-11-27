import React, { useRef, useEffect, useCallback } from "react";
import h337 from "heatmap.js";
import { LinearProgress, Fade, Typography } from "@material-ui/core";

export const Heatmap = props => {
    const containerRef = useRef();

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
                    max: 2,
                    data: formattedData
                });
            } else {
                heatmap.setData({
                    max: 1,
                    data: []
                });
            }
        }
    }, [props.data]);

    return (
        <div style={{ width: "100%", height: "100%" }}>
            {!props.data.length && !props.loading && (
                <Typography>No Data Available</Typography>
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
    );
};
