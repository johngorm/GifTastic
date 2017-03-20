var topics = ['Programing', 'Rock Guitar', 'Sondheim', 'Super Smash Bros', 'Anime','Star Trek', 
	'Panic','Game of Thrones','Walt Disney World', 'The Simpsons','Joe Biden', 'Patton Oswalt', 'Wil Wheaton', 
	'Rage','Steven Universe', 'Arrested Development','Board Games', 'Piderman', 'Westworld'];

function userGifTag(name){
	this.name = name;
};


$(document).ready(function(){
	var $tagDiv = $('#tag-list');
	var $tagInput = $('#tag-input');
	var $addBtn = $('#add-tag-btn');
	var $resetBtn = $('#reset-Local-btn');
	var $tagBtn = $('.tag-btn');
	var $gifDisplay = $('#gif-display');
	var APIKey = 'dc6zaTOxFJmzC';

	//Array to hold localStorage user tag objects
	var userTagObjArray = [];

	populateTagField(topics);

	//If the user has tags in local memory, add them to the the gif tag list
	if(localStorage.getItem('user-tag')){	
		//Parse localStorage to get the gif tag objects
		userTagObjArray= JSON.parse(localStorage.getItem('user-tag'));
		for(var jj = 0; jj < userTagObjArray.length; jj++){
			 addTag(userTagObjArray[jj].name)
		}
	}
	
	//Take user input and create gif tag, put tag name into localStorage
	//as a stringified version of the tag object
	$addBtn.on('click', function(){
		if($tagInput.val()){
			addTag($tagInput.val());	
			var gifTagObject = new userGifTag($tagInput.val());
			userTagObjArray.push(gifTagObject);
			localStorage.setItem('user-tag',JSON.stringify(userTagObjArray));
			$tagInput.val('');
		}
	});
	//Clear storage and reload page to clear user-added tags
	$resetBtn.on('click', function() {
		localStorage.clear();
		location.reload();
	})

	//If a gif image is clicked, change the source to either the full url or the static url 
	//based on the current gif state
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
	});

	//Clicking a tag button makes a AJAX call to Giphy API to get 10 gifs 
	//that have the tag
	$('#tag-list').delegate('.tag-btn', 'click', function(){
		//Replace the spaces in tag with '+' in accordance with Giphy API requiremnts
		var pattern = new RegExp('\\s','g');
		var searchTag = $(this).val();
		searchTag = searchTag.replace(pattern, '+');
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTag + 
		'&api_key=' + APIKey + '&limit=10';

		$.ajax({
			method: 'GET',
			url: queryURL
			
		}).done(function(Response){
			var gifsArray = Response.data;
			$gifDisplay.empty();
			gifsArray.forEach(addGif);
		})
	});

	//Create a div to hold the gif and its rating, set all attributes,
	//and append to the DOM
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
	};

	//
	function addTag(element){
		var $button = $('<button class="tag-btn">');
		$button.html(element)
			.val(element);
		$tagDiv.append($button);
	};

	//Function to add tags that takes an array as input
	function populateTagField (tagArray){
		tagArray.forEach(addTag);
	};
	

	

});