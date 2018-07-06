var serve = "http://39.104.73.169:80/";
/*
$(document).ready(function() {
	showOrder();
});
*/
window.onload = function() {
	init();
}

function init() {
	get_orders();
}

function get_orders() {
	var time = new Date();
	var jsonStr=JSON.stringify({"restaurant_id":'123456', order_time: time});
	$.ajax({
		headers: {
			'Content-Type':'application/json;charset=UTF-8'
    	},
		type:"post",
		url:serve+'receiveOrders',
		data:jsonStr,
		success:function(orderdata){
			alert("收到订单")
			if (orderdata['data'].length>0) {
				//alert("订单数量： " + orderdata.data.length);
			    show_order_in_page_new_order(orderdata.data[0]);
		    }
		}
	});
}

function show_order_in_page_new_order(order) {
	var j=0;
	var menus=JSON.parse(order.menu);
	//alert(menus.length);
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
	$(".table_num").text("桌号：" + order.table_num);
	//$(".order_time").text("下单时间：" + order.order_time);
}



function showOrder() {
	var j = 0;
	$(".num").each(function() {
		//alert("abcd");
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