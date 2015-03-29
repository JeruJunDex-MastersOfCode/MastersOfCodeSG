module.exports = [
    ['/api', 'index#index', 'get'],
    ['/api/users/signup', 'users#signup', 'post'],
    ['/api/users/getAllUsers', 'users#getAllUsers', 'get'],
    ['/api/users/:uid/editProfile', 'users#editProfile', 'post'],
    ['/api/users/:uid', 'users#getUser', 'get'], 
    ['/api/tasks/getAllTasks', 'tasks#getAllTasks', 'get'],    
    ['/api/tasks/:taskId', 'tasks#getTask', 'get'],
    ['/api/tasks/addTask', 'tasks#addTask', 'post'],    
    ['/api/testRoute', 'users#testRoute', 'get'],
    ['/api/testPayment', 'users#testPayment', 'get']
    //['/api/users/getAllUsers', 'users#getAllUsers', 'get']
];