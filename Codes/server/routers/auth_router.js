var express = require('express');

module.exports = function(app) {

	var restaurant = require('../controllers/restaurant_controller.js');
	var system = require('../controllers/system_controller.js');

	//app.use('/static', express.static('./static'));
	app.use(express.static(require('/static').join(__dirname, 'views')));
	


	/**************************************************************************
								user's behaviors
	***************************************************************************/

	//render home page
	app.get('/test', function(req, res) {
		console.log('Wecome!');
		res.render('home/home');
	});
	
	// render index page
	app.get('/restaurant', function(req, res) {
		res.render('index/index');
	});
	
	// render order page
	app.get('/renderOrder', function(req, res) {
		res.render('order/order');
	});
	
	// render security-document
	app.get('/renderSecurityDocument', function(req, res) {
		res.render('security-document/security-document');
	});
	
	//render food lists
	app.post('/restaurant',  restaurant.getRestaurantData);

	//get order datas from coutomer and generate order
	app.post('/order', system.generateOrder);

	/**************************************************************************
								end user's behaviors
	***************************************************************************/




	/**************************************************************************
								restaurant's behaviors
	***************************************************************************/
	app.get('/merchantRegister', function(req, res) {
		console.log('render register page!');
	});

	app.post('/merchantRegister',function(req, res) {
		console.log('register!');
	});

	app.get('/merchantLogin', function(req, res) {
		console.log('render login page!');
	});

	app.post('/merchantLogin', function(req, res) {
		console.log('login!');
	});

	app.post('/addFood', restaurant.addFood);

	app.post('/deleteFood', restaurant.deleteFood);

	app.post('/receiveOrders', restaurant.receiveOrders);
	app.post('/receiveAllOrders', restaurant.receiveAllOrders);

	/**************************************************************************
							end restaurant's behaviors
	***************************************************************************/

	/**************************************************************************
							Prevent Wrong Url request
	**************************************************************************/
	// app.use((req, res, next) => {
	// 	res.status(404).json({"error":"request url not found"});
	// });
}
