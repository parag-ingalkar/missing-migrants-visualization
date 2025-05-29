import React from "react";

// AxisLeft Component
export const AxisLeft = ({ yScale, innerWidth, tickOffset }) => {
	return yScale.ticks().map((tickValue) => (
		<g
			className="tick"
			key={tickValue}
			transform={`translate(0,${yScale(tickValue)})`}
		>
			<line x2={innerWidth} />
			<text x={-tickOffset} style={{ textAnchor: "end" }}>
				{tickValue}
			</text>
		</g>
	));
};

// AxisBottom Component
export const AxisBottom = ({ xScale, innerHeight, tickOffset, formatDate }) => {
	return xScale.ticks().map((tickValue) => (
		<g
			className="tick"
			key={tickValue}
			transform={`translate(${xScale(tickValue)},0)`}
		>
			<line y2={innerHeight} />
			<text y={innerHeight + tickOffset} style={{ textAnchor: "middle" }}>
				{formatDate(tickValue)}
			</text>
		</g>
	));
};

// Bars Component
export const Bars = ({ binnedData, xScale, yScale, innerHeight }) => {
	return binnedData.map((d, index) => (
		<rect
			key={index}
			className="bar"
			x={xScale(d.x0)}
			y={yScale(d.y)}
			width={xScale(d.x1) - xScale(d.x0)}
			height={innerHeight - yScale(d.y)}
			fill="#137b80"
		/>
	));
};

export default { AxisLeft, AxisBottom, Bars };
