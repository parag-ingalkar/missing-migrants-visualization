import React from "react";

const Countries = ({ worldAtlas: { land, interiors }, pathGenerator }) => {
	const landPaths = React.useMemo(() => {
		return land.features.map((feature, index) => (
			<path key={index} className="land" d={pathGenerator(feature)} />
		));
	}, [land, pathGenerator]);

	const interiorsPaths = React.useMemo(() => {
		return <path className="interiors" d={pathGenerator(interiors)} />;
	}, [interiors, pathGenerator]);

	return (
		<g className="countries">
			{landPaths}
			{interiorsPaths}
		</g>
	);
};

export default Countries;
