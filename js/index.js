$("#wikiSearch").click(function(){
	var text = $("input").val();
	var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+text;
	$.ajax({
		url: url,
		dataType: "jsonp"
	}).done(function(data){
		var keys = Object.keys(data.query.pages);
		var res = data.query.pages;
  	
		var html = '<ul class="results">';
		
		for(var i=0; i<keys.length; i++){
			
			var image;
		
		if(res[keys[i]].hasOwnProperty('thumbnail')){
			image = res[keys[i]].thumbnail.source;
		}
			else{
				image = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png";
			}
			
			html += '<li><div class="row"><div class="col-md-9"><div class="row"><div class="col-md-12 res-title"><a target="_blank" href="https://en.wikipedia.org/?curid='+res[keys[i]].pageid+'">'+res[keys[i]].title+'</a></div></div><div class="row"><div class="col-md-12">'+res[keys[i]].extract+'</div></div></div><div class="col-md-3"><img src="'+image+'"></div></div></div></li>';
		}
		html +="</ul>";
		
		$(".results").html(html);
		
	});
});

$(".form-control").keypress(function(key){
	if(key.which === 13){
		$("#wikiSearch").click();
	}
})