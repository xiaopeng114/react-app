import Mock from "mockjs"

let data = Mock.mock({
    "list|10": [
        {   //店铺名称
            "name": "@ctitle",
            "km|1-10": 1,
            "collect|+1":1, //收藏标识
            "image": "@image(100x100,@color)",
            "price|10-100": 1,
            "sales|20-200": 1,
            "childred|7": [
                {   //商品分类
                    "title|+1": ["热销", "优惠", "三文鱼", "刺身", "年货礼品", "鲜虾活鱼", "猪肉"],
                    "content|10": [
                        {   
                            "id|+1":1,
                            "image": "@image(100x100,@color)",
                            "com":"@ctitle", //商品名称
                            "text":"@ctitle(20)",
                            "oneprice|10-100":1 //单价
                        }

                    ]

                }
            ]
        }
    ]
})

Mock.mock("/get", "get", function () {
    return data
})