// 2015-12-27
// ver 0.1	
// use jquery
// popup.js
//


$(function(){
	chrome.storage.local.get(
		function(data){
			for(var i=0;i<data.urls.length;i++){
				$('#url-list').append('<div class="item"><input type="text" value="'+data.urls[i]+'"/><button class="del" href="#">x</button></div>');
			}//end for
		}
	);

	$('#url-list').delegate('.del','click',function(){
		$(this).parent().remove();
		var url_list_arr = [];
		$('#url-list .item').each(function(){
			var val = $(this).parent().find('input').val();
			if(val){
				url_list_arr.push(val);
			}
		});
		if(url_list_arr.length){
			save_to_storage(url_list_arr);
		}else{
			url_list_arr = '';
			save_to_storage(url_list_arr);
		}
		return false;
	});


	function save_to_storage(data){
	    chrome.storage.local.set(
	        {
	            'urls':data
	        },
	        function(){
				// chrome.runtime.sendMessage('re', function(response){
				//     console.log('re');
				// });
	   //          print();
	        }
	    );
	}

	print();
});



