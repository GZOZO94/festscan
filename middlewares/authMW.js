module.exports = function () {
	
	return function (req, res, next) {
		if(req.body===undefined || req.body.id===undefined){
			res.tpl.error="Hiba történt a kérés küldése során";
			return res.status(200).send(res.tpl.error);
		}
		if(req.body.id!=="FestScanApp"){
			res.tpl.error="Nem megfelelő azonosítót küldtél";
			return res.status(200).send(res.tpl.error);
		}
		return next();
	};
};