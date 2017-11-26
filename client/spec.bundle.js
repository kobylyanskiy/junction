'use strict';

import 'babel-polyfill';

// this regex matches any js files in __tests__ directories
var context = require.context('./src-admin/', true, /.spec$/);
context.keys().forEach(context);
