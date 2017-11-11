const authMW=require('../middlewares/authMW');
const getNearEventsMW=require('../middlewares/getNearEventsMW');
const getEventsPictureMW=require('../middlewares/getEventsPictureMW');
const getEventsDescriptionMW=require('../middlewares/getEventsDescriptionMW');


module.exports = function (app,pg,connectionString,fs,path) {

	app.post('/FestScan/getNearEvents',
		authMW(),
		getNearEventsMW(pg,connectionString)
	);
	app.post('/FestScan/getEventsPicture',
		authMW(),
		getEventsPictureMW(pg,connectionString,fs,path)
	);
	app.post('/FestScan/getEventsDescription',
		authMW(),
		getEventsDescriptionMW(pg,connectionString)
	);
	app.get('/',
		function (req, res, next) {
			res.render('test',res.tpl);
		}
	)
};