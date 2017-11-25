module.exports = function (pg,connectionString) {
	return function (req, res, next) {
		if((typeof req.body.gps==='undefined') || (typeof req.body.radius=='undefined') || (typeof req.body.ishere==='undefined')){
			res.tpl.error="Hiba történt az GPS megadása során";
			return res.status(200).send(res.tpl.error);
		}
		let gps_x_min=req.body.gps.x-req.body.radius;
		let gps_x_max=req.body.gps.x+req.body.radius;
		let gps_y_min=req.body.gps.y-req.body.radius;
		let gps_y_max=req.body.gps.y+req.body.radius;
		let radius=req.body.radius;
		
		let ids=req.body.ishere;
		pg.connect(connectionString,function(err,client,done) {
			if(err){
			   console.log("Not able to get connection "+ err);
			   res.tpl.error=err;
			   return res.status(200).send(res.tpl.error);
			} 
			client.query("select eventid, gps_x, gps_y, name, short_description, type from events where (abs($1-gps_x)<abs($2) or abs(gps_x-$3)<abs($2)) and (abs($4-gps_y)<abs($2) or abs(gps_y-$5)<abs($2)) and not eventid=any($6::int[])",[gps_x_max,radius,gps_x_min,gps_y_max,gps_y_min,ids],function(err,result){
				done();
				console.log(result.rows);
				if(err){
				   res.tpl.error=err;
				   return res.status(200).send(res.tpl.error);
				}
				return res.status(200).send(result.rows);
			});
		});
	}
};