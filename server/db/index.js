const db = require('./connection');
const User = require('./user');
const Beverage = require('./beverage');
const Session = require('./session');
const Order = require('./order');
const OrderItem = require('./orderItem');
const Address = require('./address');

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Beverage.hasMany(OrderItem);
OrderItem.belongsTo(Beverage);

Address.belongsTo(User);
User.hasMany(Address);

module.exports = {
  db,
  Beverage,
  User,
  Session,
  Order,
  OrderItem,
  Address,
};
