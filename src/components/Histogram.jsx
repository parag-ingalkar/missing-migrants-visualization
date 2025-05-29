import React from "react";
import * as d3 from "d3";
import {
	getReportedDate,
	getTotalDeadAndMissing,
} from "../utils/dataAccessors";
import { AxisLeft, AxisBottom, Bars } from "./AxisComponents";

const margin = { top: 20, right: 30, bottom: 20, left: 45 };
const yAxisLabel = "Total Dead and Missing";
const yAxisLabelOffset = 30;
const formatDate = d3.timeFormat("%d.%m.%Y");

const Histogram = ({ data, width, height, setBrushExtent }) => {
	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.right - margin.left;

	const xScale = React.useMemo(() => {
		return d3
			.scaleTime()
			.domain(d3.extent(data, getReportedDate))
			.range([0, innerWidth])
			.nice();
	}, [data, innerWidth]);

	const binnedData = React.useMemo(() => {
		const [start, end] = xScale.domain();
		return d3
			.bin()
			.value(getReportedDate)
			.domain(xScale.domain())
			.thresholds(d3.timeMonths(start, end))(data)
			.map((array) => ({
				x0: array.x0,
				x1: array.x1,
				y: d3.sum(array, getTotalDeadAndMissing),
			}));
	}, [data, xScale]);

	const yScale = React.useMemo(() => {
		return d3
			.scaleLinear()
			.domain([0, d3.max(binnedData, (d) => d.y)])
			.range([innerHeight, 0]);
	}, [binnedData, innerHeight]);

	const brushRef = React.useRef();

	React.useEffect(() => {
		const brush = d3.brushX().extent([
			[0, 0],
			[innerWidth, innerHeight],
		]);
		brush(d3.select(brushRef.current));
		brush.on("brush end", (event) => {
			setBrushExtent(event.selection && event.selection.map(xScale.invert));
		});
	}, [innerWidth, innerHeight, xScale, setBrushExtent]);

	return (
		<>
			<rect width={width} height={height} fill="white" />
			<g transform={`translate(${margin.left}, ${margin.top})`}>
				<AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={10} />
				<AxisBottom
					xScale={xScale}
					innerHeight={innerHeight}
					tickOffset={10}
					formatDate={formatDate}
				/>
				<Bars
					binnedData={binnedData}
					xScale={xScale}
					yScale={yScale}
					innerHeight={innerHeight}
				/>
				<text
					className="axis-label"
					textAnchor="middle"
					transform={`translate(${-yAxisLabelOffset}, ${
						innerHeight / 2
					}) rotate(-90)`}
				>
					{yAxisLabel}
				</text>
				<g ref={brushRef} />
			</g>
		</>
	);
};

export default Histogram;
