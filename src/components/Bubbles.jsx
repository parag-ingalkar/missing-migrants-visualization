import React from "react";
import * as d3 from "d3";
import { sizeValue } from "../utils/dataAccessors";

const maxRadius = 15;

const Bubbles = ({ data, filteredData, projection }) => {
	const sizeScale = React.useMemo(() => {
		const maxSizeValue = d3.max(data, sizeValue);
		return d3.scaleSqrt().domain([0, maxSizeValue]).range([0, maxRadius]);
	}, [data]);

	return (
		<>
			{filteredData.map((d, index) => {
				const [x, y] = projection(d.coords);
				const xValue = isNaN(x) ? 0 : x;
				const yValue = isNaN(y) ? 0 : y;

				return (
					<g key={index} className="bubbleMarks">
						<circle cx={xValue} cy={yValue} r={sizeScale(sizeValue(d))} />
					</g>
				);
			})}
		</>
	);
};

export default Bubbles;
