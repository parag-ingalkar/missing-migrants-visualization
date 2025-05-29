import React from "react";
import { graticule } from "../utils/projectionUtils";

const WorldGraticule = ({ width, height, pathGenerator }) => {
	const sphereAndGraticule = React.useMemo(() => {
		return (
			<>
				<path className="sphere" d={pathGenerator({ type: "Sphere" })} />
				<path className="graticule" d={pathGenerator(graticule())} />
			</>
		);
	}, [pathGenerator]);

	return <g className="worldGraticule">{sphereAndGraticule}</g>;
};

export default WorldGraticule;
