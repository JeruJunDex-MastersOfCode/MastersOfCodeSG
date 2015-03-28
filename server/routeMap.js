module.exports = [
	['/api', 'index#index', 'get'],
	['/api/users/signup', 'users#signup', 'post'],
	['/api/users/getAllUsers', 'users#getAllUsers', 'get'],
	['/api/testRoute', 'users#testRoute', 'get'],
	['/api/testPayment', 'users#testPayment', 'get']
	//['/api/users/getAllUsers', 'users#getAllUsers', 'get']
];