/**
 * $Id: promo_discount_view.js 3440 2013-05-11 02:17:15Z pengrl@qidapp.com $
 */
var type = "0";
var seller_cids = "0";
var render_item = function(){
	var idx = 0;
	$(item_data).each(function(ind, item){
		if ((type != "0" && type.indexOf(item[7]) < 0) || (seller_cids != "0" && seller_cids.indexOf(item[8]) < 0)) {
			return true;
		}
		var _div = $('<div class="item"></div>').appendTo($('#main .span3:eq(' + idx % 4 + ')'));
		$('<a class="img" href="http://item.taobao.com/item.htm?id='+item[0]+'&ext=zk" target="_blank"><img src=" ' + item[4] + '" /></a>').appendTo(_div);
		$('<a class="title" href="http://item.taobao.com/item.htm?id='+item[0]+'&ext=zk" target="_blank">'+item[1]+'</a>').appendTo(_div);
		if (~~item[7] != 4 && ~~item[7] != 5) {
			var _span = "";
			if (~~item[7] == 7) {
				_span = '<div class="flag"><span class="label">会员折扣</span></div>';
			}
			$('<div class="price"><span class="pull-left">¥ <b>' + parseFloat(item[5]).toFixed(2) + '</b></span><span class="pull-right">¥ '+parseFloat(item[2]).toFixed(2)+'</span><div class="clearfix"></div>'+_span+'</div>').appendTo(_div);
		} else {
			var _span = "";
			var promoC = item[6].split(';');
			for (var s in promoC) {
				_span += "<span class='label'>" + promoC[s] + "</span>";
			}
			$('<div class="price"><span>¥ <b>' + parseFloat(item[2]).toFixed(2) + '</b></span></div><div class="flag">'+_span+'</div>').appendTo(_div);
		}
		idx++;
	});
	if ($('#main .span3:eq(0)').text() == "") {
		$('#tip').removeClass('hide');
	} else {
		$('#tip').addClass('hide');
	}
};

$(document).ready(function(){
	$('#promo_type a').click(function(){
		type = $(this).attr('_value');
		$('#main .span3').empty();
		render_item();
	});
	
	$('#seller_cids a').click(function(){
		seller_cids = $(this).attr('_value');
		$('#main .span3').empty();
		render_item();
	});
	
	$('#search_tb').click(function(){
		$('#search').attr('action', 'http://z.alimama.com/tksEss.php');
	});
	
	$('#search_self').click(function(){
		$('#search').attr('action', 'http://itools.qdss.org/app/TaobaoSearchEncode');
	});
	
	$('#share').attr('href', 'http://www.jiathis.com/send/?webid=tsina&url='+encodeURIComponent($('#userName').attr('href'))+'&title='+encodeURIComponent("好多折扣商品，赶快来看看吧！#掌柜工具箱#")+'&uid=1714783&appkey=3822648575');
});

var get_cids = function() {
	var aHtml = "";
	$(shop_cats).each(function(ind, item){
		var _aValue = item.cid;
		$(item.child).each(function(ind, item){
			_aValue += "," + item.cid;
		});
		aHtml += '<a href="#'+item.name+'" _value=",'+_aValue+',">'+item.name+'</a>';
	});
	$(aHtml).appendTo($('#seller_cids'));
};
