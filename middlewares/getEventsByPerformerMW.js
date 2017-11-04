module.exports = function () {
	return function (req, res, next) {
		if(req.body.performer===undefined || req.body.gps===undefined){
			res.tpl.error="Hiba történt az adatok megadása során";
			return res.status(200).send(res.tpl.error);
		}
		let performer=req.body.performer;
		let gps=req.body.gps;
		let data={'gps': gps, 'performer':performer};
		return res.status(200).send(data);
	}
};