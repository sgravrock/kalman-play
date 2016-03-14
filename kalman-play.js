(function () {
	var xhr = new XMLHttpRequest();

	xhr.onload = function () {
		if (xhr.status === 200) {
			init(JSON.parse(xhr.response));
		} else {
			alert("Unable to load " + url + ": " + xhr.status + " " + xhr.statusText);
		}
	};

	xhr.onerror = function () {
		alert("Unable to load " + url);
	};

	xhr.open("get", "example.json");
	xhr.send();

	function init(realData) {
		var button = document.querySelector("button");
		button.disabled = false;
		button.addEventListener("click", function (e) {
			var r = parseFloat(document.querySelector("[name=r]").value);
			var q = parseFloat(document.querySelector("[name=q]").value);
			var KalmanFilter = require("kalmanjs").default;
			var kalmanFilter = new KalmanFilter({R: r, Q: q});
			var filteredData = realData.map(function (p) {
				return {
					d: p.d,
					s: kalmanFilter.filter(p.s)
				};
			});
			e.preventDefault();
			show_graph([filteredData, realData]);
		});
	};

	function show_graph(data) {
		document.querySelector("#plot").innerHTML = "";
		MG.data_graphic({
			data: data,
			height: 450,
			full_width: true,
			area: false,
			left: 100,
			target: '#plot',
			x_accessor: "d",
			x_label: "Distance (miles)",
			y_accessor: "s",
			interpolate: "monotone"
		});
	};
}());
