module.exports = function () {
	return function (req, res, next) {
		if(req.body.name===undefined || req.body.gps===undefined){
			res.tpl.error="Hiba történt az adatok megadása során";
			return res.status(200).send(res.tpl.error);
		}
		let name=req.body.name;
		let gps=req.body.gps;
		let data={'gps': gps, 'name':name};
		return res.status(200).send(data);
	}
	
};