import React from "react";
import { useData } from "./hooks/useData";
import { useWorldAtlas } from "./hooks/useWorldAtlas";
import { getReportedDate } from "./utils/dataAccessors";
import { createProjection, createPathGenerator } from "./utils/projectionUtils";
import WorldGraticule from "./components/WorldGraticule";
import Countries from "./components/Countries";
import Bubbles from "./components/Bubbles";
import Histogram from "./components/Histogram";
import "./App.css";

const App = () => {
	// Ref for the heading
	const headingRef = React.useRef(null);

	// State for window dimensions excluding heading height
	const [dimensions, setDimensions] = React.useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	// Update dimensions when window resizes or heading is measured
	React.useEffect(() => {
		const updateDimensions = () => {
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		updateDimensions(); // Initial call

		window.addEventListener("resize", updateDimensions);
		return () => window.removeEventListener("resize", updateDimensions);
	}, []);

	const { width, height } = dimensions;
	const histogramHeight = height * 0.25;
	const mapHeight = height - histogramHeight - 80;

	const projection = React.useMemo(
		() => createProjection(width, mapHeight),
		[width, mapHeight]
	);
	const pathGenerator = React.useMemo(
		() => createPathGenerator(projection),
		[projection]
	);

	const [brushExtent, setBrushExtent] = React.useState();
	const worldAtlas = useWorldAtlas();
	const data = useData();

	if (!worldAtlas || !data) {
		return <div>Data Loading...</div>;
	}

	const filteredData = brushExtent
		? data.filter((d) => {
				const date = getReportedDate(d);
				return date > brushExtent[0] && date < brushExtent[1];
		  })
		: data;

	return (
		<div style={{ margin: 0 }}>
			<h1 style={{ margin: "10px", textAlign: "center" }}>
				Missing Migrants across the Globe
			</h1>

			<svg width={width} height={height}>
				<WorldGraticule
					width={width}
					height={mapHeight}
					pathGenerator={pathGenerator}
				/>
				<Countries worldAtlas={worldAtlas} pathGenerator={pathGenerator} />
				<Bubbles
					data={data}
					filteredData={filteredData}
					projection={projection}
				/>
				<g transform={`translate(0, ${mapHeight})`}>
					<Histogram
						data={data}
						width={width}
						height={histogramHeight}
						setBrushExtent={setBrushExtent}
					/>
				</g>
			</svg>
		</div>
	);
};

export default App;
