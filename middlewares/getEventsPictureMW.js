module.exports = function (pg,connectionString,fs,path) {
	return function (req, res, next) {
		if((typeof req.body==='undefined') || (typeof req.body.eventid==='undefined')){
			res.tpl.error="Hiba történt az esemény adatok megadása során";
			return res.status(200).send(res.tpl.error);
		}
		let eventid=req.body.eventid;
		pg.connect(connectionString,function(err,client,done) {
			if(err){
			   console.log("Not able to get connection "+ err);
			   res.tpl.error=err;
			   return res.status(200).send(res.tpl.error);
			} 
			client.query("select picture from events where id=$1",[eventid],function(err,result){
				done();
				console.log(result.rows[0].picture);
				if(err){
				   res.tpl.error=err;
				   return res.status(200).send(res.tpl.error);
				}
				res.sendfile(path.resolve('./Pictures/'+result.rows[0].picture));
				/*return res.status(200).send(result.rows);*/
			});
		});
	}
};