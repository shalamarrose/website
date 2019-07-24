// Create a Stripe client.
var stripe = Stripe('pk_test_CCnNa5sA59yE4CyyZaVXOHzl00MPSD9Hnb');

// Create a source or display an error when the form is submitted.
var form = document.getElementById('payment-form');
console.log(form);
form.addEventListener('submit', async (event) => {
	event.preventDefault();

	const personResult = await stripe.createToken('person', {
		person: {
			first_name: document.querySelector('input[name="first_name"]').value,
			last_name: document.querySelector('input[name="last_name"]').value,
			address: {
				line1: document.querySelector('input[name="line1"]').value,
				city: document.querySelector('input[name="city"]').value,
				state: document.querySelector('input[name="state"]').value,
				postal_code: document.querySelector('input[name="postal_code"]').value,
			},
		},
	});


	if (personResult.token) {
		document.querySelector('#token-person').value = personResult.token.id;

		form.submit();

		yeet = JSON.parse(getCookie());

		for (var i = 0; i < JSON.parse(getCookie()).length; i++) {
			delete yeet[i].price;
		}

		stripe.redirectToCheckout({
				items: yeet,

				// requestShipping: "true", // Do not rely on the redirect to the successUrl for fulfilling
				// purchases, customers may not always reach the success_url after
				// a successful payment.
				// Instead use one of the strategies described in
				// https://stripe.com/docs/payments/checkout/fulfillment
				successUrl: 'https://your-website.com/success',
				cancelUrl: 'https://your-website.com/canceled',

			})
			.then(function(result) {
				if (result.error) {
					// If `redirectToCheckout` fails due to a browser or network
					// error, display the localized error message to your customer.
					var displayError = document.getElementById('error-message');
					displayError.textContent = result.error.message;
				}
			});

	}
});


const stripeSourceHandler = (source) => {
	// Insert the source ID into the form so it gets submitted to the server
	const form = document.getElementById('payment-form');
	const hiddenInput = document.createElement('input');
	hiddenInput.setAttribute('type', 'hidden');
	hiddenInput.setAttribute('name', 'stripeSource');
	hiddenInput.setAttribute('value', source.id);
	form.appendChild(hiddenInput);

	// Submit the form
	form.submit();
}
