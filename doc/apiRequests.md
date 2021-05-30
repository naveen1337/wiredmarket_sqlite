### Get all Admin
requests.get('http://localhost:5000/admin/')

### Admin login

requests.post('http://localhost:5000/admin/login',json={"email":"admin@mail.com","password":"pass"})

### Add Product
requests.post('http://localhost:5000/product/create',json={"email":"admin@mail.com","password":"pass"})