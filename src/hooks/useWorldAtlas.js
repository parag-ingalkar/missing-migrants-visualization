import React from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";


// World atlas data hook
export const useWorldAtlas = () => {
    const [data, setData] = React.useState(null);
    const jsonUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

    React.useEffect(() => {
        d3.json(jsonUrl).then((topology) => {
            const { countries, land } = topology.objects;
            setData({
                land: topojson.feature(topology, land),
                interiors: topojson.mesh(topology, countries, (a, b) => a !== b),
            });
        });
    }, []);

    return data;
};