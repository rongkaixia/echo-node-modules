var Mango  = require('../../mango')

let Types = Mango.Types;
let product = new Mango.Collection("product")

product.addSchema({
	id: Types.String,
	type: Types.String,
	name: Types.String,
	type_name: Types.String,
	brief_desc: [Types.String],
	choices: [Types.Mixed],
	specs: [Types.Mixed],
  price: Types.Double, // 商品原始单价
  real_price: Types.Double, // 商品实际单价，促销等情况
	images: {hero_image: Types.String,
					thumbnail: Types.String,
					gallery: Types.Mixed,
					banner: Types.Mixed}
})

/**
 * Registration
 */
// product.defaultColumns = 'name, email, isAdmin';
product.register();
