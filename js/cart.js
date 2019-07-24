function addStuff(sku,quantity,price,total) {

    var item = `<tr class="table_row">
        <td class="column-1">
            <div class="how-itemcart1">
                <img src="images/item-cart-04.jpg" alt="IMG">
            </div>
        </td>
        <td class="column-2">` + sku + `</td>
        <td class="column-3">$ ` + price + `</td>
        <td class="column-4">
            <div class="wrap-num-product flex-w m-r-20 m-tb-10">
                <div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                    <i class="fs-16 zmdi zmdi-minus"></i>
                </div>

                <input class="mtext-104 cl3 txt-center num-product" type="number" name="num-product" value="` + quantity + `" readonly>

                <div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                    <i class="fs-16 zmdi zmdi-plus"></i>
                </div>
            </div>
        </td>
        <td class="column-5">$ ` + total + `</td>
    </tr>`;

    $(".table-shopping-cart").append(item)

}

for (var i = 0; i < JSON.parse(getCookie()).length; i++) {

    var cookie = JSON.parse(getCookie());
    var total = cookie[i].quantity * cookie[i].price;
    addStuff(cookie[i].sku, cookie[i].quantity, cookie[i].price, total);

}

function help(elm) {

    var json = JSON.parse(getCookie());

    var item = elm.getElementsByClassName("column-2")[0].innerHTML;

    for (var i = 0; i < json.length; i++) {

        if (json[i].sku == item) {
            delete json[i];

            var goodJson = json.filter(bleh => bleh !== undefined)

            document.cookie = 'cart=' + JSON.stringify(goodJson) + ";path=/";

            if (getCookie() == "[]") {
                deleteAllCookies();
            }

            break;

        }

    }

}

function getTotal() {
    var subtotal = 0;
    var tax = 0;
    var total = 0;
    if (getCookie() != false) {

        var json = JSON.parse(getCookie());

        for (var i = 0; i < JSON.parse(getCookie()).length; i++) {

            subtotal += json[i].quantity * json[i].price;

        }

        tax = Math.ceil(subtotal*.07*100)/100;
        total = subtotal + tax;

        $('.subtotal')[0].innerHTML = "$ " + subtotal;
        $('.tax')[0].innerHTML = "$ " + tax;
        $('.total')[0].innerHTML = "$ " + total;

    } else {
        $('.subtotal')[0].innerHTML = "$ 0";
        $('.tax')[0].innerHTML = "$ 0";
        $('.total')[0].innerHTML = "$ 0";
    }

}

$(document).ready(function() {
    $(".wrap-num-product").click(function() {
        var json = JSON.parse(getCookie());
        var parent = $(this).parent().parent()
        var price = parseInt(parent.children(".column-3")[0].innerHTML.replace("$", ""));
        var quantity = parseInt(parent[0].getElementsByClassName("num-product")[0].value);
        console.log(quantity);
        $(this).parent().parent().children(".column-5")[0].innerHTML = "$ " + price*quantity;

        var sku = parent.children(".column-2")[0].innerHTML

        for (var i = 0; i < json.length; i++) {

            if (json[i].sku == sku) {

                json[i].quantity = quantity;
                document.cookie = 'cart=' + JSON.stringify(json) + ";path=/";
                break;
            }
        }

        console.log(JSON.parse(getCookie()));
        console.log(getCookie());
        getTotal();
    });

    getTotal();

});


$('.how-itemcart1').each(function() {
    var element = $(this).parent().parent();

    $(this).on('click', function() {

        help($(this).parent().parent()[0]);

        $(element).remove();

        console.log(JSON.parse(getCookie()));
        getTotal();
    });
});

console.log(JSON.parse(getCookie()));
