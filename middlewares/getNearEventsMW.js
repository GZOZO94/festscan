module.exports = function (pg,connectionString) {
	return function (req, res, next) {
		if(req.body.gps===undefined || req.body.radius==undefined || req.body.ishere===undefined){
			res.tpl.error="Hiba történt az GPS megadása során";
			return res.status(200).send(res.tpl.error);
		}
		let gps_x_min=req.body.gps.x-req.body.radius;
		let gps_x_max=req.body.gps.x+req.body.radius;
		let gps_y_min=req.body.gps.y-req.body.radius;
		let gps_y_max=req.body.gps.y+req.body.radius;
		let ids=req.body.ishere;
		pg.connect(connectionString,function(err,client,done) {
			if(err){
			   console.log("Not able to get connection "+ err);
			   res.tpl.error=err;
			   return res.status(200).send(res.tpl.error);
			} 
			client.query("select id, gps_x, gps_y, name, short_description, type from events where gps_x>$1 and gps_x<$2 and gps_y>$3 and gps_y<$4 and not id=any($5::int[])",[gps_x_min, gps_x_max, gps_y_min, gps_y_max,ids],function(err,result){
				done();
				if(err){
				   res.tpl.error=err;
				   return res.status(200).send(res.tpl.error);
				}
				return res.status(200).send(result.rows);
			});
		});
	}
};