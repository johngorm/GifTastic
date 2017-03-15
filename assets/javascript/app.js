var topics = ['coding', 'guitar', 'musical theater', 'video games', 'anime','star trek', 
	'salsa','game of thrones','disney', 'the simpsons'];

$(document).ready(function(){
	var $tagDiv = $('#tag-list');
	var $tagInput = $('#tag-input');
	var $addBtn = $('#add-tag-btn');
	populateTagField(topics);

	

	$addBtn.on('click', function(){
		if($tagInput.val()){
			console.log('foobar');
			addTag($tagInput.val());
			$tagInput.val('');
		}
	})

	function addTag(element){
		var $button = $('<button class="tag-btn">');
		$button.html(element);
		$button.val(element);
		$tagDiv.append($button);
	};

	function populateTagField (tagArray){
		tagArray.forEach(addTag);
	}
	

	

});