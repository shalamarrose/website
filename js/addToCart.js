function getCookie() {
	var name = 'cart=';
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return false;

}

function addProduct() {

    var list = document.getElementsByClassName("show-modal1")[0];
    var sku = list.getElementsByClassName("js-name-detail")[0].innerHTML.replace(/\s/g, '');
    var quantity = parseInt(list.getElementsByClassName("num-product")[0].value);
	var price = parseInt(list.getElementsByClassName("mtext-106")[0].innerHTML.replace(/\$/g, ''));


	if (getCookie() != false) {
		var cookieArray = JSON.parse(getCookie());
	} else {

		document.cookie = 'cart=' + JSON.stringify([{
			sku: sku,
			quantity: quantity,
			price: price
		}]) + ";path=/";

		return;
	}

	console.log(document.cookie);
	console.log(cookieArray[0].sku);

	var i = 0;
	while (i < cookieArray.length) {


		if (sku === cookieArray[i].sku) {

			cookieArray[i].quantity += quantity;

			document.cookie = 'cart=' + JSON.stringify(cookieArray) + ";path=/";
			break;

		} else if (i == cookieArray.length - 1) {

			cookieArray.push({
                sku: sku,
    			quantity: quantity,
				price: price
			});

			document.cookie = 'cart=' + JSON.stringify(cookieArray) + ";path=/";
			break;
		}

		i++;

	}

	console.log(document.cookie);
    console.log(JSON.parse(getCookie()));

}


///////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////

function deleteAllCookies() {
	var cookies = document.cookie.split(";");

	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i];
		var eqPos = cookie.indexOf("=");
		var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
	}
}

// deleteAllCookies();
// console.log(document.cookie);






//
