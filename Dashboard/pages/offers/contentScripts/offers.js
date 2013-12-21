
/*
window.addEventListener("DOMContentLoaded", init);

function init() {
	navigateToAllCategories();
	};
	
*/
if(location.href.indexOf("#category") != -1){
	navigateToAllCategories();
	};
	
function navigateToAllCategories() {
	var button = document.getElementById("ct_itm_0");
	if(button){
		button.click();
		}
	else {
		setTimeout(navigateToAllCategories, 100);
		}
	};