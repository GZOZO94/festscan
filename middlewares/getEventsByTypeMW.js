module.exports = function () {
	return function (req, res, next) {
		if(req.body.type===undefined || req.body.gps===undefined){
			res.tpl.error="Hiba történt az adatok megadása során";
			return res.status(200).send(res.tpl.error);
		}
		let type=req.body.type;
		let gps=req.body.gps;
		let data={'gps': gps, 'type':type};
		return res.status(200).send(data);
	}
};