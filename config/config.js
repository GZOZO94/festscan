const pg = require('pg');
const connectionString="postgres://czdwudvylkbbrd:b07dba3737e5a2324ae060004d7afd41e54bd2fc0561bc068c8ef42921d97c8b@ec2-46-51-187-253.eu-west-1.compute.amazonaws.com:5432/d34ai1jentrfoc";
pg.defaults.ssl = true;
const client=new pg.Client(connectionString);
module.exports=client;