module.exports = [
	['/api', 'index#index', 'get'],
	['/api/users/signup', 'users#signup', 'post'],
	['/api/users/getAllUsers', 'users#getAllUsers', 'get'],
	['/api/users/:uid/editProfile', 'users#editProfile', 'post'],
	['/api/users/:uid', 'users#getUser', 'get'], 
	['/api/tasks/getAllTasks', 'tasks#getAllTasks', 'get'],    
	['/api/tasks/:taskId', 'tasks#getTask', 'get'],
	['/api/tasks/addTask', 'tasks#addTask', 'post'],
	['/api/users/getSimplifyCustomer', 'users#getSimplifyCustomer', 'post'],
	['/api/transactions/checkout', 'transactions#checkout', 'post'],
	['/api/transactions/newTransaction/:taskId', 'transactions#newTransaction', 'post'],
	['/api/transactions/testRoute', 'transactions#testRoute', 'get'],
	['/api/users/testPayment/:uId', 'users#testPayment', 'post']
	// ['/api/transactions/testone', 'transactions#test', 'post'],
];