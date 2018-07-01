var express = require('express');

module.exports = function(app) {

	var restaurant = require('../controllers/restaurant_controller.js');
	var system = require('../controllers/system_controller.js');

	app.use('/static', express.static('./static'));
	


	/**************************************************************************
								user's behaviors
	***************************************************************************/

	//render home page
	app.get('/', function(req, res) {
		console.log('Wecome!');
		//res.render('');
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
