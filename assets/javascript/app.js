var topics = ['coding', 'guitar', 'musical theater', 'video games', 'anime','star trek', 
	'salsa','game of thrones','disney', 'the simpsons','joe biden'];

$(document).ready(function(){
	var $tagDiv = $('#tag-list');
	var $tagInput = $('#tag-input');
	var $addBtn = $('#add-tag-btn');
	var $tagBtn = $('.tag-btn');

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
			var gifs = Response.data;
			console.log(gifs);
		})
	});

	$addBtn.on('click', function(){
		if($tagInput.val()){
			addTag($tagInput.val());
			$tagInput.val('');
		}
	})




	function addTag(element){
		var $button = $('<button class="tag-btn">');
		$button.html(element).val(element);
		$tagDiv.append($button);
	};

	function populateTagField (tagArray){
		tagArray.forEach(addTag);
	}
	

	

});