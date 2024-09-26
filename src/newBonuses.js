const newBonuses = [
	{
		"code": "WelcomeBonus",
		"title": "Welcome Bonus",
		"description": "150% up to 200€ + 25 Mega Spins",
		"logoUrl": "https://get.fluidpayments.io/assets/images/bonus-image-1.jpg",
		"maxBonus": "200",
		"maxBonusPercentage": "150",
		"termsAndConditions": "",
		"paymentMethodFilter": {
			"applyTo": [
				{ "providerType": "CREDITCARD" }
			]
		},
        "selected": false
	},
	{
		"code": "DepositBonus",
		"title": "Deposit Bonus",
		"description": "100% up to 250€ + 10 Mega Spins",
		"logoUrl": "https://get.fluidpayments.io/assets/images/bonus-image-2.jpg",
		"maxBonus": "250",
		"termsAndConditions": "",
		"paymentMethodFilter": {
			"applyTo": [
				{ "providerType": "CREDITCARD" },
				{ "providerType": "WEBREDIRECT", "service": "BLIXTPAY" }
			]
		},
        "selected": true
	},
	{
		"code": "LoginBonus",
		"title": "Login Bonus",
		"description": "100% up to 150€ + 10 Mega Spins",
		"logoUrl": "https://get.fluidpayments.io/assets/images/bonus-image-1.jpg",
		"maxBonus": "150",
		"maxBonusPercentage": "100",
		"termsAndConditions": "",
		"paymentMethodFilter": {
			"excludeFrom": [
				{ "providerType": "JETON" },
				{ "providerType": "SKRILLQCO", "service": "NETELLER" }
			]
		},
        "selected": false
	}
];

export default newBonuses;