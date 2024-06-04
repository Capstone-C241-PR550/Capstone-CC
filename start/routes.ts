/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({auth}) => {
  await auth.use('api').authenticate()
  if(auth.use('api').isLoggedIn){
    return {hello: auth.use('api').user}
  } 
})  

Route.post('/login', 'AuthController.login')
Route.post('/register', 'AuthController.register')
Route.post('/logout', 'AuthController.logout')

Route.group(() => {
  Route.post('users', 'UsersController.store')
  Route.get('users', 'UsersController.index')
  Route.get('users/:id', 'UsersController.show')
  Route.put('users/:id', 'UsersController.update')
  Route.delete('users/:id', 'UsersController.destroy')
  Route.post('records', 'RecordsController.store')
  Route.get('records', 'RecordsController.index')
  Route.get('records/:user_id', 'RecordsController.show')
  Route.put('records/:user_id', 'RecordsController.update')
  Route.delete('records/:user_id', 'RecordsController.destroy')
})