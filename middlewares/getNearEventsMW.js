module.exports = function (pg,connectionString) {
	return function (req, res, next) {
		if(req.body.gps===undefined){
			res.tpl.error="Hiba történt az GPS megadása során";
			return res.status(200).send(res.tpl.error);
		}
		pg.connect(connectionString,function(err,client,done) {
			if(err){
			   console.log("not able to get connection "+ err);
			   res.tpl.error=err;
			   res.status(200).send(res.tpl.error);
			} 
			client.query("select * from events where gps_x=$1 and gps_y=$2",[req.body.gps.x, req.body.gps.y],function(err,result){
				done();
				if(err){
				   res.tpl.error=err;
				   return res.status(200).send(res.tpl.error);
				}
				return res.status(200).send(result.rows);
			});
		});
	}
		// let gps=req.body.gps;
		// return res.status(200).send(gps);
};