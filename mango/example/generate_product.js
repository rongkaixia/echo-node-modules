// var mango = require('./lib/echo-node-modules/mango')
// var mango = require('../../mango')
require('mongoose').Promise = global.Promise
let mango = require('mango');
mango.options['module root'] = '/Users/rk/Desktop/share_folder/order-server/src'
console.log("importModels")
mango.importModels('models')
mango.mongo = 'mongodb://localhost/product'
console.log("start")
mango.start()

mango.db.on('open', function() {
// we're connected!
	console.log("mongodb connected")
	let Category = mango.collections['category'].model;
	let Product = mango.collections['product'].model;
	let Item = mango.collections['item'].model;

	console.log("generate category root")

	let rootCategory = new Category({
		name: "root",
		desc: "root"
	})
	rootCategory.save()
	.then((rootDoc) => {
		console.log("rootCategory save success")
		let jadeCategory = new Category({
			name: "jade",
			desc: "翡翠",
			pid: mango.mongoose.Types.ObjectId(rootDoc.id),
			pname: "root"
		})
		return jadeCategory.save()
	})
	.then((jadeDoc) => {
		console.log("jadeCategory save success")
		let jadeNecklaceCategory = new Category({
			name: "jade-necklace",
			desc: "翡翠项链",
			pid: mango.mongoose.Types.ObjectId(jadeDoc.id),
			pname: "root"
		})
		let jadeRingCategory = new Category({
			name: "jade-ring",
			desc: "翡翠戒指",
			pid: mango.mongoose.Types.ObjectId(jadeDoc.id),
			pname: "root"
		})
		// return jadeNecklaceCategory.save().then(() => return jadeRingCategory.save())
		return Promise.all([jadeNecklaceCategory.save(), jadeRingCategory.save()])
	})
	.then(([jadeNecklaceDoc, jadeRingDoc]) => { //生成产品1
		console.log("jadeNecklaceDoc: " + JSON.stringify(jadeNecklaceDoc))
		console.log("jadeRingDoc: " + JSON.stringify(jadeRingDoc))
		console.log("jadeNecklaceCategory and jadeRingCategory save success")
		let necklace_spu_1 = new Product({
			class_id: mango.mongoose.Types.ObjectId(jadeNecklaceDoc.id),
		  name: "经典 - 翡翠吊坠",
		  brief_desc: "精选心型翡翠吊坠", // 简要描述，用于购买页展示
		  common_props: [ // 公共属性
		    {name: "吊坠大小", value: "1.8cm * 0.5cm * 0.2cm"},
		    {name: "主石大小", value: "1.8cm * 0.5cm * 0.2cm"},
		    {name: "吊坠重量", value: "1.02g"},
		    {name: "主石重量", value: "0.018g"}
		  ],
		  sell_props_name: ["材质", "手寸"], // 销售属性名字，值由每个商品自己定义
		  images: {
		    hero_image: 'http://localhost:4000/dist' + "/static/diaozhui.png", //商品主图，单张图片， 用于点击进入详情页或购买页面
		    gallery: {}, //商品gallery，多张
		    banner: {} // banner图片，用于商品详细页面
		  }
		})
		return necklace_spu_1.save()
	})
	.then((necklace_spu_doc1) => { // 生个产品1对应的两个商品
		console.log("necklace_spu_doc1 save success")
		let item1 = new Item({
			spu_id: mango.mongoose.Types.ObjectId(necklace_spu_doc1.id),
		  name: "经典 - 翡翠吊坠(18K白金)",
		  brief_desc: "精选心型翡翠吊坠(18K白金)", // 简要描述，用于购买页展示
		  sell_props: { //销售属性值
		  	'材质': '18K白金',
		  	'手寸': '12'
		  },
		  images: {
		    hero_image: 'http://localhost:4000/dist' + "/static/diaozhui.png", //商品主图，单张图片， 用于点击进入详情页或购买页面
		    thumbnail: 'http://localhost:4000/dist' + "/static/diaozhui80x80.jpg", //商品小图，用于订单中展示等
		  },
		  sale: 0, // 销量
		  sku: 100, //库存
		  price: 1750.00, // 商品原始单价
		  real_price: 1750.00 // 商品实际单价，促销等情况
		})
		let item2 = new Item({
			spu_id: mango.mongoose.Types.ObjectId(necklace_spu_doc1.id),
		  name: "经典 - 翡翠吊坠(18K白金)",
		  brief_desc: "精选心型翡翠吊坠(18K白金)", // 简要描述，用于购买页展示
		  sell_props: { //销售属性值
		  	'材质': '18K白金',
		  	'手寸': '13'
		  },
		  images: {
		    hero_image: 'http://localhost:4000/dist' + "/static/diaozhui.png", //商品主图，单张图片， 用于点击进入详情页或购买页面
		    thumbnail: 'http://localhost:4000/dist' + "/static/diaozhui80x80.jpg", //商品小图，用于订单中展示等
		  },
		  sale: 0, // 销量
		  sku: 50, //库存
		  price: 1750.00, // 商品原始单价
		  real_price: 1750.00 // 商品实际单价，促销等情况
		})
		let item3 = new Item({
			spu_id: mango.mongoose.Types.ObjectId(necklace_spu_doc1.id),
		  name: "经典 - 翡翠吊坠(18K黄金)",
		  brief_desc: "精选心型翡翠吊坠(18K黄金)", // 简要描述，用于购买页展示
		  sell_props: { //销售属性值
		  	'材质': '18K黄金',
		  	'手寸': '11'
		  },
		  images: {
		    hero_image: 'http://localhost:4000/dist' + "/static/diaozhui.png", //商品主图，单张图片， 用于点击进入详情页或购买页面
		    thumbnail: 'http://localhost:4000/dist' + "/static/diaozhui80x80.jpg", //商品小图，用于订单中展示等
		  },
		  sale: 0, // 销量
		  sku: 50, //库存
		  price: 1850.00, // 商品原始单价
		  real_price: 1850.00 // 商品实际单价，促销等情况
		})
		return Promise.all([item1.save(), item2.save(), item3.save()])
	})
	.then(() => {
		console.log("necklace_spu_1 items save success")
	})
	.catch((err) => {
		console.log(err)
		console.log("ERROR: " + JSON.stringify(err))
	})


	//   // brief_desc: ["精选心型18K翡翠吊坠", "18k白金、18k黄金", "吊坠大小 - 1.8cm * 0.5cm * 0.2cm"], // 简要描述，用于购买页展示

	// let p1 = new Product({
	// 	_id: "xxx", // sku_id
	// 	spu_id: "xxx",
	//   name: "经典 - 18k白金翡翠吊坠",
	//   brief_desc: "精选心型18K白金翡翠吊坠", // 简要描述，用于购买页展示
	//   sell_property: { //销售属性值
	//   	size: 12,
	//   	material: "18K白金"
	//   }
	//   images: {
	//     hero_image: 'http://localhost:4000/dist' + "/static/diaozhui.png", //商品主图，单张图片， 用于点击进入详情页或购买页面
	//     thumbnail: 'http://localhost:4000/dist' + "/static/diaozhui80x80.jpg", //商品小图，用于订单中展示等
	//   },
	//   sale: 0, // 销量
	//   sku: 100, //库存
	//   price: 1750.00, // 商品原始单价
	//   real_price: 1750.00 // 商品实际单价，促销等情况
	// })

	// p1.save((err) => {
	// 	if (err) {
	// 		console.log("save error: " + JSON.stringify(err));
	// 		return;
	// 	}
	// 	console.log("save product 1 success");
	// })

	// console.log("generate product 2")
	// let p2 = new Product({
	//   name: "经典 - 18k白金翡翠吊坠",
	//   type: "necklace",
	//   type_name: "吊坠",
	//   brief_desc: ["精选心型18K翡翠吊坠", "18k白金", "吊坠大小 - 1.8cm * 0.5cm * 0.2cm"], // 简要描述，用于购买页展示
	//   choices: [
	//     {id: 1, name: "material", display_name: "材质", value: ["18k白金"]}
	//   ], //商品选择
	//   specs: [
	//     {name: "大小", value: ["主石大小 1.8cm * 0.5cm * 0.2cm", "吊坠大小 1.8cm * 0.5cm * 0.2cm"]},
	//     {name: "重量", value: ["主石重量 0.018g", "吊坠总重量 1.02g"]}
	//   ], //参数
	//   images: {
	//     hero_image: 'http://localhost:4000/dist' + "/static/diaozhui2.png", //商品主图，单张图片， 用于点击进入详情页或购买页面
	//     thumbnail: 'http://localhost:4000/dist' + "/static/diaozhui80x80.jpg", //商品小图，用于订单中展示等
	//     gallery: {}, //商品gallery，多张
	//     banner: {} // banner图片，用于商品详细页面
	//   },
	//   price: 2150.00, // 商品原始单价
	//   real_price: 2150.00 // 商品实际单价，促销等情况
	// })
	// p2.save((err) => {
	// 	if (err) {
	// 		console.log("save error: " + JSON.stringify(err));
	// 		return;
	// 	}
	// 	console.log("save product 1 success");
	// })



	// console.log("generate product 3")
	// let p3 = new Product({
	//   name: "经典 - 18k白金翡翠吊坠",
	//   type: "necklace",
	//   type_name: "吊坠",
	//   brief_desc: ["精选心型18K翡翠吊坠", "18k白金、18k黄金", "吊坠大小 - 1.8cm * 0.5cm * 0.2cm"], // 简要描述，用于购买页展示
	//   choices: [
	//     {id: 1, name: "material", display_name: "材质", value: ["18k白金", "18k黄金", "18k玫瑰金"]},
	//     {id: 2, name: "size", display_name: "手寸", value: ["11", "12", "13", "14", "15"], comment: "如何量手寸"}
	//   ], //商品选择
	//   specs: [
	//     {name: "大小", value: ["主石大小 1.8cm * 0.5cm * 0.2cm", "吊坠大小 1.8cm * 0.5cm * 0.2cm"]},
	//     {name: "重量", value: ["主石重量 0.018g", "吊坠总重量 1.02g"]}
	//   ], //参数
	//   images: {
	//     hero_image: 'http://localhost:4000/dist' + "/static/diaozhui3.png", //商品主图，单张图片， 用于点击进入详情页或购买页面
	//     thumbnail: 'http://localhost:4000/dist' + "/static/diaozhui80x80.jpg", //商品小图，用于订单中展示等
	//     gallery: {}, //商品gallery，多张
	//     banner: {} // banner图片，用于商品详细页面
	//   },
	//   price: 3000.00, // 商品原始单价
	//   real_price: 3000.00 // 商品实际单价，促销等情况
	// })
	// p3.save((err) => {
	// 	if (err) {
	// 		console.log("save error: " + JSON.stringify(err));
	// 		return;
	// 	}
	// 	console.log("save product 1 success");
	// })
});