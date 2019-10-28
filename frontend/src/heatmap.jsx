import React, { useContext, useRef, useEffect } from "react";
import { AppContext } from "./App";
import h337 from "heatmap.js";

export const Heatmap = props => {
    const { data } = useContext(AppContext);

    const containerRef = useRef();

    // data stores the filtered data: the data we want to visualize
    // we must change our visualization whenever data changes

    // we must use our own equality check on data, since React does not
    // handle array equality deeply (only checks references)

    // so we may need to import a library for this, or just come up with our own
    // function

    const heatmap = useRef();

    useEffect(() => {
        heatmap.current = h337.create({
            container: containerRef.current
        });
    }, []);

    useEffect(() => {
        // test heatmap with random data
        let randomData = [];
        const n = 25 + Math.random() * 50;
        for (let i = 0; i < n; i++) {
            randomData.push({
                x: Math.round(Math.random() * containerRef.current.offsetWidth),
                y: Math.round(
                    Math.random() * containerRef.current.offsetHeight
                ),
                value: Math.round(Math.random() * 100)
            });
        }

        /* replace randomData with the real data when the time comes
         * the data is expected to be in the form:
         * [
         *   { x: int, y: int, value: int },
         *   ...
         * ]
         */
        heatmap.current.setData({
            max: 100,
            data: randomData
        });
    }, [data]);

    return (
        <div ref={containerRef}>
            <img src="field.svg" />
        </div>
    );
};
