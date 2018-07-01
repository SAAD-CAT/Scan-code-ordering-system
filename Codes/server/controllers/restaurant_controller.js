var mongoose = require('mongoose');
var Restaurant = mongoose.model('Restaurant');
var Food = mongoose.model('Food');
var Order = mongoose.model('Order');
var bodyParser = require('body-parser');


exports.getRestaurantData = function(req, res) {
	console.log('received a foods require from customer');
	console.log(req.body);
	Food.find({restaurant_id: req.body.restaurant_id})
	.exec(function(err, foods) {
			if(err) {
				console.log(err);
				res.status(404);
				res.end();
			} else {
				var fooddata = {data: []};
				for (food in foods) {
					console.log(food);
					var data = {
						food_name: foods[food].food_name,
						food_type: foods[food].food_type,
						food_price: foods[food].food_price,
						food_description: foods[food].food_description,
						picture_url: foods[food].picture_url
					}
					fooddata.data.push(data);
				}
				res.status(200).json(fooddata);
				console.log('respond foods success');
				res.end();
			}
	});	
}

exports.receiveAllOrders = function(req, res) {
	console.log('received a orders require from restaurant');
	console.log(req.body);
	
	Order.find({restaurant_id:req.body.restaurant_id})
	.exec(function(err, orders) {
			if(err) {
				console.log(err);
				res.status(404);
				res.end();
			} else {
				var orderdata = {data: []};
				for (order in orders) {
					var data = {
						order_num: orders[order].order_num,
						restaurant_id: orders[order].restaurant_id,
						table_num: orders[order].table_num,
						order_time: new Date(orders[order].order_time),
						menu: orders[order].menu,
						total_num: orders[order].total_num,
						total_price: orders[order].total_price
					}
					orderdata.data.push(data);
				}
				res.status(200).json(orderdata);
				console.log('respond all orders success');
				res.end();
			}
	});	
};


exports.receiveOrders = function(req, res) {
	console.log('received a orders require(every 10s) from restaurant');
	console.log(req.body);
	var order_time = req.body.order_time;
	var requestTime = new Date(order_time);
	
	Order.find({order_time:{"$gte":(requestTime.getTime() - 10000)}, restaurant_id:req.body.restaurant_id})
	.exec(function(err, orders) {
			if(err) {
				console.log(err);
				res.status(404);
				res.end();
			} else {
				var orderdata = {data: []};
				for (order in orders) {
					var data = {
						order_num: orders[order].order_num,
						restaurant_id: orders[order].restaurant_id,
						table_num: orders[order].table_num,
						order_time: new Date(orders[order].order_time),
						menu: orders[order].menu,
						total_num: orders[order].total_num,
						total_price: orders[order].total_price
					}
					orderdata.data.push(data);
				}
				res.status(200).json(orderdata);
				console.log('respond orders success');
				res.end();
			}
	});	
};


exports.addFood = function(req, res) {
	console.log('received add-food require from restaurant');
	console.log(req.body);
	var restaurant_id = req.body.restaurant_id;
	var food_name = req.body.food_name;
	var food_type = req.body.food_type;
	var food_price = req.body.food_price;
	var food_description = req.body.food_description;
	var picture_url = "/static/foods/images/" + req.body.picture_url;

	/*
	* check if repeated, if not then add it to database
	*/

	Food.find({restaurant_id : restaurant_id, food_name : food_name})
		.exec(function(err, foods) {
			if (err) {
				console.log(err);
				res.status(404);
				res.end();
			} else {
				if (foods.length == 0) {
					var food = new Food();
					food.set('restaurant_id', restaurant_id);
					food.set('food_name', food_name);
					food.set('food_type', food_type);
					food.set('food_price', food_price);
					food.set('food_description', food_description);
					food.set('picture_url', picture_url);
					food.save(function(err) {
						if(err) {
							console.log(err);
							//req.session.error = 'error';
							res.status(404);
							res.end();
						} else {
							var data = {
								restaurant_id: restaurant_id,
								food_name: food_name,
								food_type: food_type,
								food_price: food_price,
								food_description: food_description,
								picture_url: picture_url
							}
							res.status(200).json(data);
							console.log("add food success!");
							res.end();
						}
					});
				} else {
					res.status(404).json({message : 'food already added'});
					res.end();
				}
				
			}
		});
};

exports.deleteFood = function(req, res) {
	console.log('received delete-food require from restaurant');
	console.log(req.body);
	var restaurant_id = req.body.restaurant_id;
	var food_name = req.body.food_name;
	Food.remove({restaurant_id: restaurant_id, food_name: food_name}, function(err, docs) {
		if (err) {
			console.log(err);
		} else {
			console.log('delete success!');
		}
	})
};