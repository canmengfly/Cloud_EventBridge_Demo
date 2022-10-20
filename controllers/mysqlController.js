
//调用mysql模块
var fs = require('fs');
const mysql = require('mysql'); 

mysql_config = JSON.parse(fs.readFileSync(__dirname + '/ali-config.json','utf8'));


//下面的配置必须要与自己本机上的mysql信息一致
// let connection = mysql.createConnection({
// 	host:mns_config.accessKeyId,   //主机地址 mysql_config.host
// 	port:3306,	    //端口
// 	user:'root',       //账号
// 	password:'123456',   //密码
// 	database:'list'   //连接的数据库
// });


let connection = mysql.createConnection({
	host: mysql_config.host,   //主机地址 mysql_config.host
	port: mysql_config.port,	    //端口
	user: mysql_config.user,       //账号
	password: mysql_config.password ,   //密码
	database: mysql_config.database   //连接的数据库
});

//连接到数据库
connection.connect();



module.exports = function (app,ui) {

	// app.get('/server/mysql', async function (req, res,next) {

    //     ui.menuitem = 3
    //     var qParams = req.query.queuename
    //     // console.log(qParams);
    //     mnsq = await mns.getQueueAttributes(qParams)

    //     if (mnsq.code >= 200 && mnsq.code < 300) {
    //         ui.data[ui.menuitem] ='处理结果:\n\n' + JSON.stringify(mnsq)
    //         ui.def_mnsqueuename = req.query.queuename
    //         } else {
    //             ui.data[ui.menuitem] = '(500) Get Queue Attributes Error:\n\n' + JSON.stringify(mnsq)
    //         }

    //     // ui.def_mnsqueueurl = mnsq
    //     res.render('./index', {ui: ui})

       
    // })
	//执行sql语句，从test表中查询数据
	// var user_sql = 'SELECT * FROM '+ mysql_config.database;
	// connection.query(user_sql, function(err,result){
	// 	if(err){
	// 	console.log('[query]-:'+err);
	// 	}else{
	// 		// console.log(result);
	// 		//拿到 result 将其作为 data 渲染给模板引擎，比如这里的index页面
	// 		app.get('/server', function(req, res, next) {
	// 		res.render('server', { 
	// 			  data : result
	// 			});
	// 		});
	// 	}
	// })
	var user_sql = 'SELECT * FROM '+ mysql_config.database;

	app.get('/server', function(req, res, next) {
		connection.query(user_sql, function(err,result){
			if(err){
			console.log('[query]-:'+err);
			}else{
				// console.log(result);
				//拿到 result 将其作为 data 渲染给模板引擎，比如这里的index页面
				res.render('server', { 
					  data : result
					});
			}
		})
		});


		app.get('/complete', function(req, res, next) {
			connection.query(user_sql, function(err,result){
				if(err){
				console.log('[query]-:'+err);
				}else{
					// console.log(result);
					//拿到 result 将其作为 data 渲染给模板引擎，比如这里的index页面
					res.render('complete', { 
						  data : result
						});
				}
			})
			});



	// connection.query(user_sql, function(err,result){
	// 	if(err){
	// 	console.log('[query]-:'+err);
	// 	}else{
	// 		//拿到 result 将其作为 data 渲染给模板引擎，比如这里的index页面
	// 		app.get('/complete', function(req, res, next) {
	// 		res.render('complete', { 
	// 			  data : result
	// 			});
	// 		});
	// 	}
	// })

}

