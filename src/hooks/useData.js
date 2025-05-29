import React from "react";
import * as d3 from "d3";

// Missing migrants data hook
export const useData = () => {
	const [data, setData] = React.useState(null);
	const csvUrl =
		"https://gist.githubusercontent.com/kristen149/4d01f7061114ac0131f784abe8b68f4d/raw/e73d8b0277050c10db08719010f0a2ab07911e58/MissingMigrant2023.csv";

	// CSV row processor
	const row = (d) => {
		d.coords = d["Location Coordinates"].split(",").map(Number).reverse();
		d["Total Dead and Missing"] = parseInt(d["Total Dead and Missing"]);
		d["Reported Date"] = new Date(d["Reported Date"]);
		return d;
	};

	React.useEffect(() => {
		d3.csv(csvUrl, row).then((data) => {
			setData(data);
		});
	}, []);

	return data;
};
