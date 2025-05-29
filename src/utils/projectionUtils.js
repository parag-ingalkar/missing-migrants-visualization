import * as d3 from "d3";

// Create projection and path generator with proper sizing
export const createProjection = (width, height) => {
	return d3.geoNaturalEarth1().fitSize([width, height], { type: "Sphere" });
};

export const createPathGenerator = (projection) => d3.geoPath(projection);
export const graticule = d3.geoGraticule();
