var serve = "http://39.104.73.169:80/";
var col_plus_id = 1;
var row_plus_id = 21;
var v = new Array(20);
var amount = 0;
var money = 0;
window.onload = function() {
	init();
	buy_food();
	pay();
    //show_order_page();
}

$(document).ready(function() {
	$(document).delegate(".col-plus", "click", function() {
		var num = 1;
		var flat = 1;
		$(this).parent().find(".num").css("opacity", 1);
		for(var j = 1; j < 20; ++j) {
			if($(this).attr('id') == j) {
				$(this).parent().find(".num").text(++v[j]);
				$(this).parent().find(".col-minus").css("opacity", 1);
				flat = 0;
			}
		}
		if(flat) {
			$(this).parent().find(".num").text(num);
			$(this).attr("id", col_plus_id);
			v[col_plus_id] = num;
			num++;
			col_plus_id++;
			$(this).parent().find(".col-minus").css("opacity", 1);

		}
		$(".food_amount").text(++amount);
		$(".food_amount").css("opacity", 1);
		if(amount) {
			$(".basket-description").text("去结算");
			$(".basket-description").css("background-color", "aquamarine");
		} else {
			$(".basket-description").text("木有菜品");
			$(".basket-description").css("background-color", "#555555");
		}
		//计算菜品总金额；
		money += parseFloat($(this).parent().prev().find(".menu_price").text());
		
	});
	
	$(document).delegate(".row-plus", "tap", function() {
		var row_num = 1;
		var flat = 1;
		for(var j = 21; j < 30; ++j) {
			if($(this).attr('id') == j) {
				$(this).prev().text(++v[j]);
				flat = 0;
			}
		}
		if(flat) {
			$(this).prev().text(row_num);
			$(this).attr("id", row_plus_id);
			v[row_plus_id] = row_num;
			row_num++;
			row_plus_id++;
		}
		$(".food_amount").text(++amount);
		$(".food_amount").css("opacity", 1);
		if(amount) {
			$(".basket-description").text("去结算");
			$(".basket-description").css("background-color", "aquamarine");
		} else {
			$(".basket-description").text("木有菜品");
			$(".basket-description").css("background-color", "#555555");
		}
		//计算菜品总金额；
		money += parseFloat($(this).parent().prev().find(".menu_price").text());
	});
	
	$(document).delegate(".col-minus", "click", function() {
		var value = $(this).parent().find(".num").text();
		value--;
		$(this).parent().find(".num").text(value);
		for(var j = 1; j < 15; ++j) {
			if($(this).parent().find(".col-plus").attr('id') == j) {
				v[j]--;
			}
		}
		if(value == 0) {
			$(this).css("opacity", 0);
			$(this).parent().find(".num").css("opacity", 0);
		}
		$(".food_amount").text(--amount);
		if(!amount) {
			$(".food_amount").css("opacity", 0);
			$(".basket-description").text("木有菜品");
			$(".basket-description").css("background-color", "#555555");
		} else {
			$(".basket-description").text("去结算");
			$(".basket-description").css("background-color", "aquamarine");
		}
		money -= parseFloat($(this).parent().prev().find(".menu_price").text());
	});
	
});



function init() {
	read_menu_from_server();
	//append_row_food();
	//append_menu_bar();
	//append_column_food();

}

function read_menu_from_server() {
	var jsonStr = JSON.stringify({
		restaurant_id: '123456'
	});
	$.ajax({
		type: 'POST',
		url:  "/restaurant",
		data: jsonStr,
		//async: false,
		headers: {
			'Content-Type': 'application/json;charset=UTF-8',
		},
		success: function(json_menus) {
			//alert("请求成功了！yyp");
			//alert(json_menus);
			//var menus = JSON.parse(json_menus);
			//var menus = json_menus.data;
			//alert(menus);
			if($.isEmptyObject(json_menus)) {
				alert("菜单为空");
			} else {
				//alert("菜单不为空");
				show_menu_in_page_menu(json_menus);
			}
		}
	});
}
function show_menu_in_page_menu(myjson) {
	show_row_menu(myjson.data);
	var menu_types = get_menu_types(myjson);
	show_menu_types_in_page(menu_types);
	show_menu_by_type(myjson.data);

}
/*-------------------------------------横向菜单------------------------------------*/
function show_row_menu(menu) {
	var j = 0;
	var row_food_html = '<img class="row_food_image" width="100" height="72"><p class="row_food_name"></p><span class = "money">&yen;<b class="row_food_price"></b></span><span class="row_num"></span><button class = "row-plus">+</button>';
	//alert(menu[7].picture_url);
	for(var i = 0; i < 6; ++i) {
		$(".js-mui-control-item").eq(i).append(row_food_html);
		$(".row_food_image").eq(i).attr("src", menu[i].picture_url);
		$(".row_food_name").eq(i).text(menu[i].food_name);
		$(".row_food_price").eq(i).text(menu[i].food_price);

	}
}
function append_row_food() {
	var row_food_html = '<img class="row_food_image" src="image/鹅肠.png" width="100" height="72"><p class="row_food_name">酱爆鹅肠 </p><span class="money">&yen;<b class="row_food_price">12.9</b></span><span class="row_num"></span><button class="row-plus">+</button>';
	for(var i = 0; i < 6; ++i) {
		$(".js-mui-control-item").eq(i).append(row_food_html);
	}
}
/*----------------------------------------------------------------------------------*/
/*------------------获取菜单类型----------------------*/
function get_menu_types(myjson) {
	var menu = myjson.data;
	var menu_types = [];
	for(var i = 0; i < menu.length; ++i) {
		var isadded = false;
		for(var j = 0; j < menu_types.length; ++j) {
			if(menu[i].food_type == menu_types[j]) isadded = true;
		}
		if(!isadded) {
			menu_types.push(menu[i].food_type);
		}
	}
	return menu_types;
}
/*--------------------------------------菜单类型栏----------------------------------*/
function show_menu_types_in_page(menu_types) {
	var menu_bar_html = '<a href="#1" class="food_type"></a>';
	var types = $(".menu_type");
	var i = 0;
	var num = 1;
	types.each(function() {
		if (i < menu_types.length) {
			$(this).append(menu_bar_html);
			$(this).find(".food_type").text(menu_types[i++]);
		    $(this).find(".food_type").attr("href", "#" + num++);
		}
	});
}
function append_menu_bar() {
	var num = 1;
	var menu_bar_html = '<a href="#1" class="food_type"></a>';
	var menu_types = new Array("饭", "荤菜", "素菜", "饮料");
	var types = $(".menu_type");
	var i = 0;
	types.append(menu_bar_html);
	types.each(function() {
		$(this).find(".food_type").text(menu_types[i++]);
		$(this).find(".food_type").attr("href", "#" + num++);
		//console.log($(this).find(".food_type").attr('href'));
	});
}
/*---------------------------------------------------------------------------------*/
/*--------------------------------竖向菜单-----------------------------------------*/
function show_menu_by_type(menu) {
	var j = 0;
	var num = 1;
	var types = $(".food_type");
	var column_food_html = '<div class="food-image"><a class="anchor"></a><img class="food_image" width="100" height="72"></div><div class="food-description"><h4 class="food_name"></h4><p class="food_description"></p><span class="money">&yen;<b class="menu_price"></b></span><span><button class = "col-minus">-</button><b class="num"></b><button class = "col-plus">+</button></span></div>';
	types.each(function() {
		var is_first_food = true;
		for(var i = 0; i < menu.length; ++i) {
			if($(this).text() == menu[i].food_type) {
				$(".js-mui-control-item2").eq(j).append(column_food_html);
				$(".food_image").eq(j).attr("src", menu[i].picture_url);
				$(".food_name").eq(j).text(menu[i].food_name);
				$(".food_description").eq(j).text(menu[i].food_description);
				$(".menu_price").eq(j).text(menu[i].food_price);
				if(is_first_food) {
					$(".js-mui-control-item2").eq(j).find(".anchor").attr("name", num++);
					is_first_food = false;
				}
				j++;
			}
		}
	});
}
function append_column_food() {
	var types = $(".food_type");
	var j = 0;
	var column_food_html = '<div class="food-image"><a class="anchor" name="1"></a><img src="image/鸭翅.png" width="100" height="72"></div><div class="food-description"><h4><b class="food_name">酱香鸭翅</b></h4><p class="food_description">鸭翅全部砍成一块块，方便入味，超级好吃</p><span class="money">&yen;<b class="menu_price">12.9</b></span><span><button class = "col-minus">-</button><b class="num"></b><button class = "col-plus">+</button></span></div>';
	types.each(function() {
		for(var i = 0; i < 1; ++i) {
			//console.log("abc");
			if($(this).text() == "饭") {
				//console.log("abc");
				$(".js-mui-control-item2").eq(j).append(column_food_html);
				$(".js-mui-control-item2").eq(j).find(".anchor").attr("name", 1);
				//console.log($(".js-mui-control-item2").eq(j).find(".anchor").attr("name"));
				j++;
			}
			if($(this).text() == "荤菜") {
				//console.log("abc");
				$(".js-mui-control-item2").eq(j).append(column_food_html);
				$(".js-mui-control-item2").eq(j).find(".anchor").attr("name", 2);
				//console.log($(".js-mui-control-item2").eq(j).find(".anchor").attr("name"));
				j++;
			}
			if($(this).text() == "素菜") {
				//console.log("abc");
				$(".js-mui-control-item2").eq(j).append(column_food_html);
				$(".js-mui-control-item2").eq(j).find(".anchor").attr("name", 3);
				//console.log($(".js-mui-control-item2").eq(j).find(".anchor").attr("name"));
				j++;
			}
			if($(this).text() == "饮料") {
				//console.log("abc");
				$(".js-mui-control-item2").eq(j).append(column_food_html);
				$(".js-mui-control-item2").eq(j).find(".anchor").attr("name", 4);
				//console.log($(".js-mui-control-item2").eq(j).find(".anchor").attr("name"));
				j++;
			}
		}
	});
}
/*---------------------------------------------------------------------------------*/

function buy_food() {
	//var col_plus_id = 1;
	//var row_plus_id = 21;
	//var v = new Array(20);
	/*
	$(".col-plus").on('click',function() {
	//$(".col-plus").click(function() {
		var num = 1;
		var flat = 1;
		//console.log("abc");
		//$(this).parent().find(".col-minus").css("opacity", 1);
		$(this).parent().find(".num").css("opacity", 1);
		for(var j = 1; j < 20; ++j) {
			if($(this).attr('id') == j) {
				//console.log("abc");
				//console.log(i);
				//console.log(v[i]);
				$(this).parent().find(".num").text(++v[j]);
				$(this).parent().find(".col-minus").css("opacity", 1);
				flat = 0;
			}
		}
		if(flat) {
			//console.log("abc");
			$(this).parent().find(".num").text(num);
			$(this).attr("id", col_plus_id);
			v[col_plus_id] = num;
			num++;
			//console.log(v[i]);
			col_plus_id++;
			//console.log($(this).attr('id'));
			$(this).parent().find(".col-minus").css("opacity", 1);

		}
	});
	*/
	/*
	$(".col-minus").click(function() {
		//console.log("abc");
		var value = $(this).parent().find(".num").text();
		//console.log(value);
		value--;
		$(this).parent().find(".num").text(value);
		for(var j = 1; j < 15; ++j) {
			if($(this).parent().find(".col-plus").attr('id') == j) {
				v[j]--;
				//console.log(v[j]);
			}
		}
		if(value == 0) {
			$(this).css("opacity", 0);
			$(this).parent().find(".num").css("opacity", 0);
		}
	});
	*/
	/*
	$(".col-plus").on('click',function() {
	//$(".col-plus").click(function() {
		$(".food_amount").text(++amount);
		$(".food_amount").css("opacity", 1);
		if(amount) {
			$(".basket-description").text("去结算");
			$(".basket-description").css("background-color", "aquamarine");
		} else {
			$(".basket-description").text("木有菜品");
			$(".basket-description").css("background-color", "#555555");
		}
		//计算菜品总金额；
		money += parseFloat($(this).parent().prev().find(".menu_price").text());
	});
	*/
	/*
	$(".row-plus").on('tap', function() {
		var row_num = 1;
		var flat = 1;
		//console.log("abc");
		for(var j = 21; j < 30; ++j) {
			if($(this).attr('id') == j) {
				//console.log("abc");
				//console.log(i);
				//console.log(v[i]);
				$(this).prev().text(++v[j]);
				//$(this).parent().find(".col-minus").css("opacity", 1);
				flat = 0;
			}
		}
		if(flat) {
			//console.log("abc");
			$(this).prev().text(row_num);
			$(this).attr("id", row_plus_id);
			v[row_plus_id] = row_num;
			row_num++;
			//console.log(v[i]);
			row_plus_id++;
			//console.log($(this).attr('id'));
			//$(this).parent().find(".col-minus").css("opacity", 1);

		}
	});
	*/
	/*
	$(".row-plus").on('tap', function() {
		//console.log("abc");
		$(".food_amount").text(++amount);
		$(".food_amount").css("opacity", 1);
		if(amount) {
			$(".basket-description").text("去结算");
			$(".basket-description").css("background-color", "aquamarine");
		} else {
			$(".basket-description").text("木有菜品");
			$(".basket-description").css("background-color", "#555555");
		}
		//计算菜品总金额；
		money += parseFloat($(this).parent().prev().find(".menu_price").text());
	});
	*/
	/*
	$(".col-minus").click(function() {
		$(".food_amount").text(--amount);
		if(!amount) {
			$(".food_amount").css("opacity", 0);
			$(".basket-description").text("木有菜品");
			$(".basket-description").css("background-color", "#555555");
		} else {
			$(".basket-description").text("去结算");
			$(".basket-description").css("background-color", "aquamarine");
		}
		money -= parseFloat($(this).parent().prev().find(".menu_price").text());
	});
	*/
}

//发送订单到服务器
//订单数据；
var menu_name;
var menu_price;
var menu_num;
var menu = new Array();
var total_num = 0;
var total_price = 0;
var obj;


function pay() {

	$(".basket-description").on('click', function() {
		//e.preventDefault();
		calculate_order();
		sendJson();
	});

}

function calculate_order() {
	$(".num").each(function() {
		if($(this).text() != "") {
			//alert("abc");
			menu_name = $(this).parents(".food-description").find(".food_name").text();
			menu_price = $(this).parent().prev().find(".menu_price").text();
			menu_num = $(this).text();
			total_num += parseInt(menu_num);
			total_price += parseFloat(menu_price) * parseInt(menu_num);
			obj = {
				'menu_name': menu_name,
				'price': menu_price,
				'num': menu_num
			};
			menu.push(obj);
		}
	});
	$(".row_num").each(function() {
		if($(this).text() != "") {
			menu_name = $(this).prev().prev().text();
			menu_price = $(this).prev().find(".row_food_price").text();
			menu_num = $(this).text();
			total_num += parseInt(menu_num);
			total_price += parseFloat(menu_price) * parseInt(menu_num);
			obj = {
				'menu_name': menu_name,
				'price': menu_price,
				'num': menu_num
			};
			menu.push(obj);
		}
	});
}

function sendJson() {
	var time = new Date();
	total_num = String(total_num);
	total_price = '$' + String(total_price);
	
	var jsonStr = JSON.stringify({
		restaurant_id: '123456',
		table_num: '1',
		order_time: time,
		menu: menu,
		total_num: total_num,
		total_price: total_price
	});

	$.ajax({
		type: 'POST',
		url: serve + "order",
		data: jsonStr,
		//async: false,
		headers: {
			'Content-Type': 'application/json;charset=UTF-8',
		},
		success: function(data) {
			//alert("请求成功");
		},
		complete: function() {
			location.href ="/renderOrder";
			//$.get()
		}
	});
}

function show_order_page(order) {
	var j=0;
	var menus=JSON.parse(order.menu);
	for (var i=0; i < menus.length; i++) {
		var column_food_html = '<h4 class="order_food_name"></h4><b class="order_food_price"></b><span class="order_food_num"></span>';
		$(".js-mui-control-item3").eq(j).append(column_food_html);
		$(".order_food_name").eq(j).text(menus[i].menu_name);
		$(".order_food_price").eq(j).text("$" + menus[i].price);
		$(".order_food_num").eq(j).text(menus[i].num);
		j++;
	}
	$(".order_total_money").text("总价： " + order.total_price);
	$(".order_total_num").text("总数：" + order.total_num);
}

function showOrder() {
	var j = 0;
	$(".num").each(function() {
		if($(this).text() != "") {
			var column_food_html = '<img class="order_food_image" width="100" height="72"><h4 class="order_food_name"></h4><span class="order_money">&yen;<b class="order_food_price"></b></span><p class="order_food_num"></p>';
			$(".js-mui-control-item3").eq(j).append(column_food_html);
			$(".order_food_name").eq(j).text($(this).parents(".food-description").find(".food_name").text());
			$(".order_food_price").eq(j).text($(this).parent().prev().find(".menu_price").text());
			$(".order_food_num").eq(j).text($(this).text());
			$(".order_food_image").eq(j).attr("src", $(this).parents(".food-description").prev().find(".food_image").attr("src"));
			j++;
		}
	});
	$(".row_num").each(function() {
		if($(this).text() != "") {
			var row_food_html = '<img class="order_food_image" width="100" height="72"><h4 class="order_food_name"></h4><span class="order_money">&yen;<b class="order_food_price"></b></span><p class="order_food_num"></p>';
			$(".js-mui-control-item3").eq(j).append(row_food_html);
			$(".order_food_name").eq(j).text($(this).prev().prev().text());
			$(".order_food_price").eq(j).text($(this).prev().find(".row_food_price").text());
			$(".order_food_num").eq(j).text($(this).text());
			$(".order_food_image").eq(j).attr("src", $(this).prev().prev().prev().attr("src"));
			j++;
		}
	});

	$(".order_total_money").text(total_price);
	$(".order_total_num").text(total_num);
}