var topics = ['Programing', 'Rock Guitar', 'Musical Theater', 'Video Games', 'Anime','Star Trek', 
	'salsa','Game of Thrones','Disney', 'The Simpsons','Joe Biden'];

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
		var $rating = $('<p>').text('Rating: '+ gifObject.rating.toUpperCase());
		var stillImg = gifObject.images.fixed_height_still;
		var movingImg = gifObject.images.fixed_height;
		var $gifImg = $('<img>').attr('src', stillImg.url)
		$gifImg.attr('data-stillURL', stillImg.url).attr('data-animatedURL', 
			movingImg.url).attr('data-state','still').addClass('img-responsive');
		$gifDiv.append($rating)
			.append($gifImg)
			.addClass('gif-div');
		$gifDisplay.append($gifDiv);
	}


	function addTag(element){
		var $button = $('<button class="tag-btn">');
		$button.html(element)
			.val(element);
		$tagDiv.append($button);
	};

	function populateTagField (tagArray){
		tagArray.forEach(addTag);
	}
	

	

});