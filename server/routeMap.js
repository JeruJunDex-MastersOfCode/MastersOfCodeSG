module.exports = [
	['/api', 'index#index', 'get'],
	['/api/users/signup', 'users#signup', 'post'],
	['/api/users/getAllUsers', 'users#getAllUsers', 'get']
	//['/api/users/getAllUsers', 'users#getAllUsers', 'get']
];