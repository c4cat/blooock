//
//
//
//

// init
var redirectURL = "http://ili.li";
var urls = '';
//
// clear data
//
// chrome.storage.local.clear();

function init(){
    chrome.storage.local.get('urls', function (data) {
        if( isArray(data.urls) ){
            if( data.urls.length > 0 ){
                chrome.webRequest.onBeforeRequest.addListener(
                    redirectUrl,
                    {urls: data.urls },
                    ["blocking"]
                );
            }
        }
        console.log('init');
    });
}
var isArray = function(obj) { 
    return Object.prototype.toString.call(obj) === '[object Array]'; 
} 
function redirectUrl(){
    return { 'redirectUrl': redirectURL };
}

init();

chrome.storage.onChanged.addListener(function(){
    chrome.webRequest.onBeforeRequest.removeListener(redirectUrl);
    init();
    console.log('onChanged!');
})

// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
//     if(message == 're'){
//         print();
//         init();
//     }
// });

//
// save data
//
// chrome.storage.local.set(
//     {
//         'urls':['1','2']
//     },
//     function(){
//         // chrome.storage.local.get('',function(items){
//         //     console.log(items);
//         // });
//     }
// );


//
// read data
// chrome.storage.local.get('urls',function(items){
//             console.log(items.urls);
//         })



//
// create menu
//

chrome.contextMenus.create({
    type:'normal',
    title: 'Block This Sites.',
    id : 'right_click_menu_button',
    onclick : get_current_tab_link
})

function get_current_tab_link(){
    chrome.tabs.query({ currentWindow: true, active: true } ,function(tab){
        deal_with_the_url(tab[0].url);
    });
}

function deal_with_the_url(url){
    if(url.indexOf('ttp')){
        //http://www.bbs0101.com/archives/130.html
        var re = /^(?:(\w+):\/\/)?(?:(\w+):?(\w+)?@)?([^:\/\?#]+)(?::(\d+))?(\/[^\?#]+)?(?:\?([^#]+))?(?:#(\w+))?/;
        var link = re.exec(url);
            link = link[4];  //get the current link

            if(link){
                link_dot_arr = link.split('.');
                link_dot_arr_length = link_dot_arr.length;
                if(link_dot_arr_length > 1){
                    var the_link = '*://*.' + link_dot_arr[link_dot_arr_length-2] + '.' + link_dot_arr[link_dot_arr_length-1] + '/*';

                    // let's save
                    chrome.storage.local.get('urls',function(data){
                        var arr = data.urls?data.urls:[];
                            arr.push(the_link);

                        save_to_storage(arr);
                    });
                }

            }
    }
}

function save_to_storage(data){
    chrome.storage.local.set(
        {
            'urls':data
        },
        function(){
            print();
        }
    );
}


function print(){
    chrome.storage.local.get('urls',function(data){console.log(data)});
}
