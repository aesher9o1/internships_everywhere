var serverURL= "https://62f23b1d.ngrok.io"

main = function () {
	function createUI(text){
		
		var yTranslatePopupDiv = document.getElementById('yTranslatePopupDiv');
		if (yTranslatePopupDiv === null) {
			yTranslatePopupDiv = document.createElement('div');
		}else{
			document.getElementById('yTranslatePopupDiv').remove()
			yTranslatePopupDiv = document.createElement('div')
		}
		yTranslatePopupDiv.id = 'yTranslatePopupDiv';
		yTranslatePopupDiv.style.fontSize = "1.2em";
		yTranslatePopupDiv.style.color="#000000";
		yTranslatePopupDiv.style.textalign="left";
		yTranslatePopupDiv.style.right="0%";
		yTranslatePopupDiv.style.width="22% ";
		yTranslatePopupDiv.style.margin="auto";
		yTranslatePopupDiv.style.top="20%";
		yTranslatePopupDiv.style.border="1px solid #DCA";
		yTranslatePopupDiv.style.background="#ffffff";
		yTranslatePopupDiv.style.borderRadius = "6px";
		yTranslatePopupDiv.style.boxShadow = "5px 5px 8px #CCC";
		yTranslatePopupDiv.style.position="fixed";
		yTranslatePopupDiv.style.padding="20px";
		yTranslatePopupDiv.style.display = "inline"

		document.getElementsByTagName('body') [0].appendChild(yTranslatePopupDiv)
		if(typeof(text)=="string")
			yTranslatePopupDiv.innerHTML = text
		else
			yTranslatePopupDiv.appendChild(text)

	}

	function parseJs(resp) {
		var result = JSON.parse(resp)
		var ul = document.createElement('ul')
		ul.style.cssText=" list-style-type: none"
		if(result.length>0)
			result.forEach(element => {
				var li=document.createElement('li')
				ul.appendChild(li)
				
				var a = document.createElement('a')
				a.setAttribute('href',element.url)
				a.title = element.title
				a.target='_blank'
				li.appendChild(a)

				var img = document.createElement('img')
				img.style.cssText = "height:2em; display:inline; float:left; margin-right:1em"
				img.src= element.img

				a.appendChild(img)
			
			});
			createUI(ul)
	}

	document.addEventListener('mouseup', function (event) {
		selected = window.getSelection().toString();
		
		if (selected.length > 0 && event.altKey) {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", serverURL+'/?url='+selected, true);
			createUI("Fetching Internships...")
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					parseJs(xhr.responseText);
				}
			}
			xhr.send();
		}
	});
	// document.addEventListener("mousedown", function(event){
	// 	var yTranslatePopupDiv = document.getElementById("yTranslatePopupDiv");
	// 	if (yTranslatePopupDiv !== null){
	// 		yTranslatePopupDiv.style.display = "none";
	// 	}
	// });

};
main();