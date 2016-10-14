var mango = require('./lib/echo-node-modules/mango')
mango.options['module root'] = '/Users/rk/Desktop/share_folder/order-server/'
mango.importModels('./lib/echo-node-modules/mango/test_model')
mango.mongo = 'mongodb://localhost/test'
mango.start()
