
$('.aside').prepend(
	"<h2>虾米下载链接 · · · · · ·</h2>"+
	"<div class='indent'><ul class='bs' id='xiami'>"+
	"</ul></div>"+
	"<p class='pl'><a href='/sddd'>报告问题..</a></p>"
);
var words = $('meta[name=keywords]').attr("content").split(',');
var keyword2 = encodeURIComponent(words[0] + ' ' + words[1]);
console.log(keyword2);

function song(no, loc) {
	var n = parseInt(loc.substr(0, 1));
	var left = loc.substr(1);
	var slen = Math.floor(left.length / n);
	var scnt = left.length % n;
	var i, j;
	var a = [];
	console.log('song:'+no+':'+loc);
	console.log('n='+n);
	console.log('left='+left);
	console.log('leftlen='+left.length);
	console.log('slen='+slen);
	console.log('scnt='+scnt);
	for (i = 0; i < scnt; i++) 
		a.push(left.substr((slen+1)*i, slen+1));
	for (i = scnt; i < n; i++) 
		a.push(left.substr(slen*(i-scnt)+(slen+1)*scnt, slen));
	for (i = 0; i < a.length; i++) 
		console.log('a'+i+'='+a[i]);
	var r = '';
	for (i = 0; i < a[0].length; i++) 
		for (j = 0; j < a.length; j++) {
			//console.log('sub='+a[j].substr(i, 1));
			r += a[j].substr(i, 1);
		}
	console.log('r='+r);
	r = unescape(r);
	r = r.replace(/\^/g, '0');
	r = r.replace(/\+/g, ' ');
	console.log('r='+r);
	return r;
}

function album(title, aid) {
	$.ajax({
		type: 'GET', 
		dataType: 'xml',
		url: "http://www.xiami.com/song/playlist/id/"+aid+"/type/1",
		success: function (r) {
			var i = 1;
			var o = $('#xiami'+aid);
			o.append("<a href='http://www.xiami.com/album/"+aid+"'>["+title+"]</a><br>");
			$(r).find('location').each(function () {
				var url = song(i, $(this).text());
				o.append("<a href='"+url+"'>"+i+"  </a>");
				i++;
			});
		}
	});
}

$.ajax({
	type: 'GET',
	dataType: 'html',
	url: 'http://www.xiami.com/search/album?key='+keyword2,
	success: function (r) {
		//console.log(r);
		var i = 0;
		$(".CDcover100", r).each(function() {
			var aid = $(this).attr('href').split('/')[2];
			var title = $(this).attr('title');
			console.log(aid);
			console.log(title);
			$('#xiami').append("<li id='xiami"+aid+"'></li>");
			album(title, aid);
			i++;
		});
		if (!i) {
			$('#xiami').append("<li>没有找到相关专辑</li>");
		}
	}
});


