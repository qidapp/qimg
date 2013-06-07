// $Id: promo_discount_view.js 3698 2013-06-07 04:30:38Z pengrl@qidapp.com $
var type = "0";
var seller_cids = "0";
var promo_limit_count = 0;
var promo_fullsend_count = 0;
var promo_freepost_count = 0;
var catIds = {};
var itemIndex = 0;
var count = 0, lastCount = 0;
var render_item = function(){
	$(item_data).each(function(ind, item){
		if (itemIndex > 0 && itemIndex == item_data.length - 1) {
			return false;
		}
		if (itemIndex != 0 && ind < itemIndex) {
			return true;
		}
		if (ind == item_data.length - 1) {
			itemIndex = ind;
		}
		if ((type != "0" && type != "5" && type.indexOf(item[7]) < 0) || (type == "5" && item[6].indexOf('免邮') < 0)) {
			return true;
		}
		if (seller_cids != "0") {
			var item_cid = item[8].split(',');
			var nodeHasItem = false;
			$(item_cid).each(function(ind, cid) {
				if (!!cid && seller_cids.indexOf(cid) > -1) {
					nodeHasItem = true;
					return false;
				}
			});
			if (!nodeHasItem) {
				return true;
			}
		}
		if (count - lastCount >= 16) {
			lastCount = count;
			itemIndex = ind;
			return false;
		}
		
		var _div = $('<div class="item"></div>').appendTo($('#main .span3:eq(' + (count % 4) + ')'));
		$('<a class="img" href="http://item.taobao.com/item.htm?id='+item[0]+'&ext=zk" target="_blank"><img src=" ' + item[4] + '" /></a>').appendTo(_div);
		$('<a class="title" href="http://item.taobao.com/item.htm?id='+item[0]+'&ext=zk" target="_blank">'+item[1]+'</a>').appendTo(_div);
		if (~~item[7] != 4 && ~~item[7] != 5) {
			var _span = "";
			if (~~item[7] == 7) {
				_span = '<div class="flag"><span class="label">会员折扣</span></div>';
			}
			$('<div class="price"><span class="pull-left">¥ <b>' + parseFloat(item[5]).toFixed(2) + '</b> <span class="discount">'+item[6]+'折</span></span><span class="pull-right">原价 <del>'+parseFloat(item[2]).toFixed(2)+'</del></span><div class="clearfix"></div>'+_span+'</div>').appendTo(_div);
		} else {
			var _span = "";
			var promoC = item[6].split(';');
			for (var s in promoC) {
				_span += "<span class='label'>" + promoC[s] + "</span>";
			}
			$('<div class="price"><span>¥ <b>' + parseFloat(item[2]).toFixed(2) + '</b></span></div><div class="flag">'+_span+'</div>').appendTo(_div);
		}
		count++;
		if (!$('#tip').hasClass('hide')) {
			$('#tip').addClass('hide');
		}
	});
	if (count == 0) {
		$('#tip').removeClass('hide');
	}
};

var promo_type_active, seller_cids_active;
$(document).ready(function(){
	$('#promo_type a').click(function(){
		itemIndex = 0;
		count = 0;
		lastCount = 0;
		type = $(this).attr('_value');
		$('#main .span3').empty();
		if (!!promo_type_active) {
			$(promo_type_active).removeClass('active');
		}
		$(this).addClass('active');
		promo_type_active = this;
		render_item();
	});
	
	$('#seller_cids a').click(function(){
		itemIndex = 0;
		count = 0;
		lastCount = 0;
		seller_cids = $(this).attr('_value');
		$('#main .span3').empty();
		if (!!seller_cids_active) {
			$(seller_cids_active).removeClass('active');
		}
		$(this).addClass('active');
		seller_cids_active = this;
		render_item();
	});
	
	$('#search_tb').click(function(){
		$('#search').attr('action', 'http://z.alimama.com/tksEss.php');
	});
	
	$('#search_self').click(function(){
		$('#search').attr('action', 'http://itools.qdss.org/app/TaobaoSearchEncode');
	});
	
	$(window).scroll(function(){
		var $scrollTop = $(document).scrollTop();
		var $windowHeight = $(document).height() - $(window).height();
	    if($scrollTop >= 78) {
	    	if (!$('#promoType').hasClass('float')){
	    		$('#item-area').css('margin-top', $('#promoType').height() + 42);
	    		$('#promoType').addClass('float');
	    	}
	    } else {
	    	$('#item-area').css('margin-top', 0);
	    	$('#promoType').removeClass('float');
	    }
	    if ($windowHeight - $scrollTop  <= 500) {
	    	render_item();
	    }
	});
	
	$('#share').attr('href', 'http://www.jiathis.com/send/?webid=tsina&url='+encodeURIComponent('http://itools.qidapp.cn/Link.html?id=itools')+'&title='+encodeURIComponent("好多折扣商品，赶快来看看吧！ #掌柜工具箱# "+location.href)+'&uid=1714783&appkey=3822648575');
});

var get_cids = function() {
	var aHtml = "";
	$(shop_cats).each(function(ind, item){
		var _aValue = item.cid;
		var nodeHasItem = false;
		var count = 0;
		if (!!catIds[item.cid]) {
			nodeHasItem = true;
			count = catIds[item.cid];
		}
		
		$(item.child).each(function(ind, item){
			_aValue += "," + item.cid;
			if (!!catIds[item.cid]) {
				nodeHasItem = true;
				count += catIds[item.cid];
			}
		});
		if (!!nodeHasItem) {
//			aHtml += '<a href="#'+item.name+'" _value=",'+_aValue+',">' + item.name + ' <span>(' + count + ')</span></a>';
			aHtml += '<a href="#'+item.name+'" _value=",'+_aValue+',">' + item.name + '</a>';
		}
	});
	$(aHtml).appendTo($('#seller_cids'));
};