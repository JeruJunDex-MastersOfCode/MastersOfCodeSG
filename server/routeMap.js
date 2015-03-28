module.exports = [
	['/api', 'index#index', 'get'],
	['/api/users/signup', 'users#signup', 'post'],
	['/api/users/getAllUsers', 'users#getAllUsers', 'get'],
	['/api/users/getSimplifyCustomer', 'users#getSimplifyCustomer', 'post'],
	['/api/transactions/checkout', 'transactions#checkout', 'post'],
	['/api/transactions/testone', 'transactions#test', 'post']
	//['/api/users/getAllUsers', 'users#getAllUsers', 'get']
];