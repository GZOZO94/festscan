const authMW=require('../middlewares/authMW');
const getNearEventsMW=require('../middlewares/getNearEventsMW');
const getEventsByTypeMW=require('../middlewares/getEventsByTypeMW');
const getEventsByNameMW=require('../middlewares/getEventsByNameMW');
const getEventsByPerformerMW=require('../middlewares/getEventsByPerformerMW');


module.exports = function (app,pg,connectionString) {

	app.post('/FestScan/getNearEvents',
		authMW(),
		getNearEventsMW(pg,connectionString)
	);
	app.post('/FestScan/getEventsByType',
		authMW(),
		getEventsByTypeMW(pg,connectionString)
	);
	app.post('/FestScan/getEventsByName',
		authMW(),
		getEventsByNameMW(pg,connectionString)
	);
	app.post('/FestScan/getEventsByPerformer',
		authMW(),
		getEventsByPerformerMW(pg,connectionString)
	);
	app.get('/',
		function (req, res, next) {
			res.render('test',res.tpl);
		}
	)
};