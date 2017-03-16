var topics = ['coding', 'guitar', 'musical theater', 'video games', 'anime','star trek', 
	'salsa','game of thrones','disney', 'the simpsons','joe biden'];

$(document).ready(function(){
	var $tagDiv = $('#tag-list');
	var $tagInput = $('#tag-input');
	var $addBtn = $('#add-tag-btn');
	var $tagBtn = $('.tag-btn');
	var $gifDisplay = $('#gif-display');
	var APIKey = 'dc6zaTOxFJmzC';

	
	populateTagField(topics);

	$('#tag-list').delegate('.tag-btn', 'click', function(){
		//var pattern = new RegExp( ** pattern variable)
		var pattern = new RegExp('\\s','g');
		var searchTag = $(this).val();
		searchTag = searchTag.replace(pattern, '+');
		console.log(searchTag);
		var queryURL = "http://api.giphy.com/v1/gifs/search?q="+searchTag+'&api_key=' + APIKey + '&limit=10';

		$.ajax({
			method: 'GET',
			url: queryURL
			
		}).done(function(Response){
			var gifsArray = Response.data;
			$gifDisplay.empty();
			gifsArray.forEach(addGif);
		})
	});

	$addBtn.on('click', function(){
		if($tagInput.val()){
			addTag($tagInput.val());
			$tagInput.val('');
		}
	})

	$('#gif-display').delegate('img', 'click', function() {

		var gifState = $(this).attr('data-state');

		if(gifState === 'still'){
			$(this).attr('src',$(this).attr('data-animatedURL'));
			$(this).attr('data-state','animated')
		}
		else{
			$(this).attr('src', $(this).attr('data-stillURL'));
			$(this).attr('data-state','still');
		}
	})

	function addGif(gifObject){
		var $gifDiv= $('<div>');
		//var $rating = $('<p>').text(gifObject.rating);
		var stillImg = gifObject.images.fixed_height_still;
		var movingImg = gifObject.images.fixed_height;
		var $gifImg = $('<img>').attr('src', stillImg.url).attr('data-rating',gifObject.rating);
		$gifImg.attr('data-stillURL', stillImg.url).attr('data-animatedURL', movingImg.url).attr('data-state','still');
		$gifDiv.append($gifImg);
		//$gifDiv.attr('width', stillImg.width);
		$gifDisplay.append($gifDiv);
	}







	function addTag(element){
		var $button = $('<button class="tag-btn">');
		$button.html(element).val(element);
		$tagDiv.append($button);
	};

	function populateTagField (tagArray){
		tagArray.forEach(addTag);
	}
	

	

});