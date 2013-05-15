/**
 * $Id: promo_discount_view.js 3490 2013-05-15 02:56:13Z pengrl@qidapp.com $
 */
var type = "0";
var seller_cids = "0";
var promo_limit_count = 0;
var promo_fullsend_count = 0;
var catIds = {};
var render_item = function(){
	var idx = 0;
	$(item_data).each(function(ind, item){
		if ((type != "0" && type.indexOf(item[7]) < 0) || (seller_cids != "0" && seller_cids.indexOf(item[8]) < 0)) {
			return true;
		}
		if (~~item[7] != 4 && ~~item[7] != 5) {
			promo_limit_count++;
		} else {
			promo_fullsend_count++;
		}
		if (!!!catIds[item[8]]) { catIds[item[8]] = 1; }
		else { catIds[item[8]] = catIds[item[8]] + 1;}
		setTimeout(function(){
			var _div = $('<div class="item"></div>').appendTo($('#main .span3:eq(' + idx % 4 + ')'));
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
			idx++;
			if (!$('#tip').hasClass('hide')) {
				$('#tip').addClass('hide');
			}
		}, ind * 15);
	});
	if (idx == 0) {
		$('#tip').removeClass('hide');
	}
};

var promo_type_active, seller_cids_active;
$(document).ready(function(){
	$('#promo_type a').click(function(){
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
	    if($(document).scrollTop() >= 78) { 
	    	$('.top').css('margin-bottom',$('#promoType').height() + 38);
	    } else {
	    	$('.top').css('margin-bottom', 18);
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
		if (!!catIds[',' + item.cid + ',']) {
			nodeHasItem = true;
			count = catIds[',' + item.cid + ','];
		}
		
		$(item.child).each(function(ind, item){
			_aValue += "," + item.cid;
			if (!!catIds[',' + item.cid + ',']) {
				nodeHasItem = true;
				count += catIds[',' + item.cid + ','];
			}
		});
		if (!!nodeHasItem) {
			aHtml += '<a href="#'+item.name+'" _value=",'+_aValue+',">' + item.name + ' <span>(' + count + ')</span></a>';
		}
	});
	$(aHtml).appendTo($('#seller_cids'));
};
