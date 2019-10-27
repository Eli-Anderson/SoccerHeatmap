import React, { useContext } from "react";
import { AppContext } from "./App";

export const Heatmap = props => {
    const { data } = useContext(AppContext);

    // data stores the filtered data: the data we want to visualize
    // we must change our visualization whenever data changes

    // we must use our own equality check on data, since React does not
    // handle array equality deeply (only checks references)

    // so we may need to import a library for this, or just come up with our own
    // function

    return <div></div>;
};
