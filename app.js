"use strict";

const assets = (name) => `./public/assets/${name}`;
const DEV_BACKEND_ORIGIN = "http://127.0.0.1:8002";
const API_BASE =
  window.NAIL_API_BASE ||
  (["4173", "5173", "5174", "5175"].includes(window.location.port) || window.location.protocol === "file:"
    ? DEV_BACKEND_ORIGIN
    : window.location.origin);

const navItems = [
  ["home", "首页"],
  ["analysis", "AI分析"],
  ["demand", "需求发布"],
  ["stores", "门店预约"],
  ["merchant", "商家中心"],
  ["mine", "我的"],
];

const steps = ["上传手图", "Nail BTI 分析", "AI试戴"];

const btiPersonas = {
  WNLS: ["DREAMER", "下次一定换风格体", "连续三年说尝试新风格，连续三年选奶茶裸粉。", ["nude-mica-french", "milk-white-bow", "satin-nude-almond", "milky-pearl-office", "rose-jelly-french"]],
  WNLA: ["GHOSTER", "老板看不出来体", "做了等于没做，但自己爽了一个月。", ["milky-pearl-office", "nude-mica-french", "champagne-sheer-almond", "satin-nude-almond", "milk-white-bow"]],
  WNRS: ["PLANNER", "甲油胶理财师", "做一次美甲，要算30天平均成本。", ["rose-jelly-french", "nude-mica-french", "champagne-crystal-almond", "peach-blossom-gradient", "satin-nude-almond"]],
  WNRA: ["SOCIALITE", "电子富家千金", "存款三位数，审美八位数。", ["dopamine-gem-party", "rose-jelly-french", "fuchsia-flower-gem", "wine-heart-gem", "champagne-crystal-almond"]],
  WELS: ["MOONLIGHTER", "白月光延伸型", "看起来什么都没做，实际最贵。", ["shell-pearl-almond", "moonlight-silver-french", "aurora-silver-cat-eye", "champagne-sheer-almond", "milky-pearl-office"]],
  WELA: ["EXPLORER", "小众赛道冠军", "你喜欢的款式，三个月后才会变成爆款。", ["aurora-silver-cat-eye", "jungle-black-bow", "silver-mirror-french", "clear-crystal-bow", "olive-knit-cat-eye"]],
  WERS: ["REFINER", "高冷但想显白体", "嘴上说无所谓，第一句还是“显白吗？”", ["mirror-french-diamond", "champagne-crystal-almond", "shell-pearl-almond", "moonlight-silver-french", "aurora-silver-cat-eye"]],
  WERA: ["REBEL", "审美危险分子", "别人怕撞款，你怕撞审美。", ["black-white-grid", "jungle-black-bow", "espresso-leopard-grid", "black-cat-eye-aura", "clear-crystal-bow"]],
  CNLS: ["SHARER", "朋友圈伸手党", "做完美甲第一件事不是照镜子，而是找光。", ["rose-jelly-french", "peach-blossom-gradient", "moonlight-silver-french", "nude-mica-french", "milky-pearl-office"]],
  CNLA: ["OBSERVER", "社恐出片体", "不发自拍，但能发十张手照。", ["silver-mirror-french", "milky-pearl-office", "satin-nude-almond", "moonlight-silver-french", "olive-knit-cat-eye"]],
  CNRS: ["RESTARTER", "做甲如换命体", "做完美甲当天，人生重新开始。", ["wine-heart-gem", "dopamine-gem-party", "rose-black-french", "fuchsia-flower-gem", "champagne-crystal-almond"]],
  CNRA: ["MAXIMIZER", "这次真不加钻体", "每次说简单一点，最后还是加满。", ["black-cat-eye-aura", "fuchsia-flower-gem", "mirror-french-diamond", "dopamine-gem-party", "wine-heart-gem"]],
  CELS: ["SELECTOR", "色卡纠结症", "选色半小时，上手两分钟。", ["aurora-silver-cat-eye", "silver-mirror-french", "olive-knit-cat-eye", "moonlight-silver-french", "mirror-french-diamond"]],
  CELA: ["COLLECTOR", "参考图诈骗受害者", "收藏夹800张图，每次做出来都是第801种。", ["espresso-leopard-grid", "black-white-grid", "rose-black-french", "jungle-black-bow", "caramel-tortoise-short"]],
  CERS: ["ORIGINAL", "撞款会死党", "最怕的不是丑，是和同事一样。", ["jungle-black-bow", "black-cat-eye-aura", "dopamine-gem-party", "black-white-grid", "clear-crystal-bow"]],
  CERA: ["VIPER", "美甲店VIP候选人", "你不是来做美甲，你是来巡视会员权益。", ["black-gold-short", "mirror-french-diamond", "black-cat-eye-aura", "jungle-black-bow", "champagne-crystal-almond"]],
};

const axisLabels = {
  white_axis: {
    soft_white: "暖柔显白型",
    contrast_white: "冷亮提白型",
  },
  shape_axis: {
    natural_shape: "自然修饰型",
    elongated_shape: "延伸显手型",
  },
  design_axis: {
    clean_design: "简洁耐看型",
    rich_design: "细节承载型",
  },
  vibe_axis: {
    soft_vibe: "温柔通勤型",
    strong_vibe: "强风格气场型",
  },
};

const nailStyles = [
  ["nude-mica-french", "云母裸粉轻法式", "/nails/01_87797733466cfd525625a5947767e2ff1794125.png", "裸粉底叠轻法式和细闪云母感，干净显手白，适合日常通勤。", ["裸粉", "轻法式", "通勤"]],
  ["olive-knit-cat-eye", "橄榄毛衣猫眼", "/nails/02_162afb52255bd908ba3ec418fd61824a2254875.png", "橄榄绿和裸色错落搭配，带一点复古毛衣感和冷调光泽。", ["橄榄绿", "复古", "显白"]],
  ["rose-black-french", "玫瑰黑茶法式", "/nails/03_7bb5bc0c2c741f9f0aa63787a601d7ad2604877.png", "黑茶色法式边配玫瑰氛围，显白又有轻奢感。", ["黑茶", "法式", "玫瑰"]],
  ["silver-mirror-french", "银镜冷光法式", "/nails/04_fc8fe60e78341d77a5070fc2f8e520072098070.png", "银灰镜面光泽和冷调法式边，适合清冷骨感手型。", ["银灰", "镜面", "冷感"]],
  ["milky-pearl-office", "奶白珍珠通勤", "/nails/05_3c0d090e20f0cb56f70fcb56c54dd6582416974.png", "奶白短甲点缀珍珠光，低调但精致，适合上班和约会。", ["奶白", "珍珠", "短甲"]],
  ["clear-crystal-bow", "冰透水晶蝴蝶结", "/nails/06_6c857edd85a5fa4bcec59698fe9416cb1913981.png", "透明延长甲叠水晶和蝴蝶结，甜感强但保留清透空气感。", ["冰透", "水晶", "蝴蝶结"]],
  ["black-white-grid", "黑白棋盘涂鸦", "/nails/07_2ac2d01a9bc78320edbe2b545b485b4a2132292.png", "黑白格纹、涂鸦线条和跳色组合，适合想要强辨识度的人。", ["格纹", "涂鸦", "黑白"]],
  ["black-gold-short", "黑金短甲小香", "/nails/08_d15c06e8c2137d4f39f3b60476a90cf92026957.png", "黑金短甲和小香风质感，短甲也能有强气场。", ["黑金", "短甲", "轻奢"]],
  ["black-cat-eye-aura", "黑曜猫眼气场", "/nails/09_69614397f0ecb559b98cb46a5a46f3b32642714.png", "黑曜底色叠猫眼光带，适合聚会、夜拍和强气场穿搭。", ["黑曜", "猫眼", "气场"]],
  ["rose-jelly-french", "玫瑰果冻法式", "/nails/10_2277d6f9d82264fa6a3c986373e5e44c2292083.png", "玫瑰果冻底配透明法式弧线，显气色又不过分甜。", ["玫瑰", "果冻", "法式"]],
  ["champagne-sheer-almond", "香槟裸透杏仁", "/nails/11_bc153edf655dd6961dc9f8e95ad8cd1e2561531.png", "香槟裸色和杏仁甲型拉长手指，适合精致但不张扬的风格。", ["香槟", "杏仁甲", "裸透"]],
  ["jungle-black-bow", "森野黑钻蝴蝶结", "/nails/12_43cc4ced977a3dd271f60ee2f05607772681747.png", "黑色装饰、蝴蝶结和钻饰点缀，适合小众酷甜风。", ["黑钻", "蝴蝶结", "小众"]],
  ["moonlight-silver-french", "月光银闪法式", "/nails/13_682c173ae3a95d0b838655e8337b30d72213857.png", "裸透底叠银闪法式边，像月光一样清冷干净。", ["银闪", "法式", "清冷"]],
  ["shell-pearl-almond", "贝母珍珠杏仁", "/nails/14_eecfba4ab276e895b579a79491b2d0211982788.png", "贝母光泽和珍珠感叠在杏仁甲上，温柔又显贵。", ["贝母", "珍珠", "杏仁甲"]],
  ["dopamine-gem-party", "多巴胺宝石派对", "/nails/15_1248ad42d355b98257e5fbcdf90efc552138079.png", "彩色宝石、跳色和高明度组合，适合节日和派对拍照。", ["宝石", "跳色", "派对"]],
  ["fuchsia-flower-gem", "玫粉花园宝石", "/nails/16_137aad1f6a36655ae395cf7dc57604642782680.png", "玫粉主色和花朵宝石感，热烈、明亮、很适合出片。", ["玫粉", "花朵", "宝石"]],
  ["milk-white-bow", "奶白蝴蝶结短甲", "/nails/17_ec437f6291295904c2f894edb8c01cb82131722.png", "奶白短甲配小蝴蝶结和轻装饰，甜但不重。", ["奶白", "蝴蝶结", "短甲"]],
  ["wine-heart-gem", "酒红爱心钻饰", "/nails/18_5591229138c4e7e1d183b59be442d9dc2267735.png", "酒红、爱心和钻饰组合，适合状态切换和约会场景。", ["酒红", "爱心", "钻饰"]],
  ["champagne-crystal-almond", "香槟水钻杏仁", "/nails/19_5fad21e6d38656170bf726ff3973a4501918338.png", "香槟裸透底配水钻点缀，适合想要精致存在感的人。", ["香槟", "水钻", "杏仁甲"]],
  ["espresso-leopard-grid", "咖啡豹纹格纹", "/nails/20_d5eedc75b0021f79381962fc145b0bc62301165.png", "咖啡色、豹纹和格纹混搭，适合喜欢复杂细节的人。", ["咖啡", "豹纹", "格纹"]],
  ["caramel-tortoise-short", "焦糖玳瑁短甲", "/nails/21_f4b69d45af5d3b496adbd9d21e768a8e2195181.png", "焦糖玳瑁纹理和短甲比例，复古但很好驾驭。", ["焦糖", "玳瑁", "短甲"]],
  ["aurora-silver-cat-eye", "极光银猫眼", "/nails/22_5b985a1c661ae2e964286178e6c0b0f92258113.png", "银色猫眼光带叠极光背景，清冷又很有未来感。", ["极光", "银色", "猫眼"]],
  ["satin-nude-almond", "缎光裸粉杏仁", "/nails/23_bf8657d94693fb0fe1da3f7729d5667d2020119.png", "缎面裸粉和柔和杏仁甲型，显手细长又不抢戏。", ["裸粉", "缎光", "杏仁甲"]],
  ["mirror-french-diamond", "镜面法式钻饰", "/nails/24_e80e1d25e48d7ef5c505b29ee8e331822641412.png", "镜面法式边和钻饰线条，适合高完成度精致款。", ["镜面", "法式", "钻饰"]],
  ["peach-blossom-gradient", "桃花果冻渐变", "/nails/25_73ee568aa09547d8bfc0168113ac9ebc2712329.png", "桃粉果冻渐变和花瓣氛围，甜美但不厚重。", ["桃粉", "果冻", "渐变"]],
].map(([id, name, image, reason, tags]) => ({
  id,
  name,
  img: resolveImageSrc(image),
  image: resolveImageSrc(image),
  reason,
  description: reason,
  tags,
}));

const heroPreviewImage = "hero-aigc-nailmuse-preview-centered.png";
const heroShowcaseStyleIds = [
  "rose-jelly-french",
  "satin-nude-almond",
  "fuchsia-flower-gem",
  "shell-pearl-almond",
  "champagne-sheer-almond",
];

const referenceHandSamples = [
  {
    id: "natural-short",
    name: "自然短甲",
    desc: "适合先测 Nail BTI",
    img: "hand-before.jpg",
  },
  {
    id: "soft-french",
    name: "柔粉法式",
    desc: "手型清晰，适合试流程",
    img: "hand-after.jpg",
  },
  {
    id: "clean-square",
    name: "清透方圆甲",
    desc: "无照片时直接选用",
    img: "demand-ref-3.jpg",
  },
];

const stores = [
  {
    id: "a",
    name: "等待真实门店",
    distance: "",
    price: "",
    score: "",
    slots: [],
    img: "",
    badge: "",
  },
];

const mockStoreDetails = {
  "hefei-shushan-chuanmu-zhixincheng": {
    rating: "4.9",
    price: "168",
    priceRange: "¥128-298",
    reviewCount: "563条评价",
    monthlyOrders: "近30天92单",
    openHours: "10:30-22:00",
    avgDuration: "75-110分钟",
    repeatRate: "37%复购",
    platformRank: "之心城热度Top 5",
    discount: "新客立减20",
    serviceBadges: ["点评可核对", "美睫同做", "可改款"],
    detailTags: ["写字楼门店", "清透水光", "低饱和"],
  },
  "hefei-shushan-muxi-zhixincheng": {
    rating: "4.8",
    price: "198",
    priceRange: "¥158-368",
    reviewCount: "418条评价",
    monthlyOrders: "近30天76单",
    openHours: "11:00-22:00",
    avgDuration: "90-120分钟",
    repeatRate: "42%复购",
    platformRank: "高级感款热门",
    discount: "工作日套餐¥188起",
    serviceBadges: ["轻奢款强", "可做延长", "支持改色"],
    detailTags: ["奶茶裸色", "珍珠", "约会款"],
  },
  "hefei-shushan-muse-ganghui": {
    rating: "4.7",
    price: "139",
    priceRange: "¥99-238",
    reviewCount: "286条评价",
    monthlyOrders: "近30天64单",
    openHours: "10:00-21:30",
    avgDuration: "60-95分钟",
    repeatRate: "34%复购",
    platformRank: "港汇广场回头客多",
    discount: "短甲单色¥99起",
    serviceBadges: ["短甲友好", "通勤款快", "可卸甲"],
    detailTags: ["社区老店", "裸色", "基础法式"],
  },
  "hefei-shushan-fancheng-zhonghuan": {
    rating: "4.8",
    price: "178",
    priceRange: "¥128-328",
    reviewCount: "331条评价",
    monthlyOrders: "近30天58单",
    openHours: "10:30-22:30",
    avgDuration: "85-125分钟",
    repeatRate: "39%复购",
    platformRank: "中环城猫眼款高热",
    discount: "猫眼升级半价",
    serviceBadges: ["碎钻加固", "可做晕染", "夜间可约"],
    detailTags: ["猫眼", "钻饰", "甜酷"],
  },
  "hefei-shushan-xiaoning-mingmennanjun": {
    rating: "4.6",
    price: "159",
    priceRange: "¥108-288",
    reviewCount: "204条评价",
    monthlyOrders: "近30天49单",
    openHours: "10:00-21:00",
    avgDuration: "80-115分钟",
    repeatRate: "31%复购",
    platformRank: "甜妹手绘款推荐",
    discount: "花朵手绘¥168起",
    serviceBadges: ["手绘沟通", "纹绣同店", "可补甲"],
    detailTags: ["花朵", "甜妹", "显白"],
  },
  "hefei-shushan-chuuh-aoyuan": {
    rating: "4.9",
    price: "188",
    priceRange: "¥138-358",
    reviewCount: "397条评价",
    monthlyOrders: "近30天71单",
    openHours: "10:30-22:00",
    avgDuration: "85-120分钟",
    repeatRate: "44%复购",
    platformRank: "奥园清透款Top 3",
    discount: "水光款套餐¥168起",
    serviceBadges: ["一站式", "新中式", "可贴甲片"],
    detailTags: ["水光", "清透", "银色猫眼"],
  },
  "hefei-shushan-taoxi-qiushi": {
    rating: "4.5",
    price: "89",
    priceRange: "¥49-168",
    reviewCount: "512条评价",
    monthlyOrders: "近30天118单",
    openHours: "09:30-22:00",
    avgDuration: "45-80分钟",
    repeatRate: "28%复购",
    platformRank: "性价比人气店",
    discount: "自助美甲¥49起",
    serviceBadges: ["自助快做", "学生友好", "基础款多"],
    detailTags: ["性价比", "短甲", "通勤"],
  },
  "hefei-shushan-qiaoxiang-tianehuwanda": {
    rating: "4.8",
    price: "219",
    priceRange: "¥168-398",
    reviewCount: "472条评价",
    monthlyOrders: "近30天83单",
    openHours: "10:00-22:00",
    avgDuration: "95-135分钟",
    repeatRate: "41%复购",
    platformRank: "天鹅湖万达轻奢榜",
    discount: "钻饰套餐¥228起",
    serviceBadges: ["轻奢精修", "水钻库存足", "可预约设计师"],
    detailTags: ["高级感", "珍珠", "钻饰"],
  },
  "hefei-shushan-duomanni-anju": {
    rating: "4.6",
    price: "119",
    priceRange: "¥79-228",
    reviewCount: "238条评价",
    monthlyOrders: "近30天46单",
    openHours: "10:00-21:00",
    avgDuration: "60-100分钟",
    repeatRate: "33%复购",
    platformRank: "安居苑社区口碑",
    discount: "法式短甲¥118起",
    serviceBadges: ["社区近", "通勤款稳", "可卸可补"],
    detailTags: ["短甲", "裸粉", "法式"],
  },
  "hefei-shushan-angel-furong": {
    rating: "4.2",
    price: "149",
    priceRange: "¥99-268",
    reviewCount: "189条评价",
    monthlyOrders: "近30天35单",
    openHours: "10:00-21:30",
    avgDuration: "75-115分钟",
    repeatRate: "26%复购",
    platformRank: "芙蓉路甜美款",
    discount: "渐变晕染¥158起",
    serviceBadges: ["花朵晕染", "美睫同做", "可沟通改图"],
    detailTags: ["甜妹", "渐变", "晕染"],
  },
};

const mockStoreDetailFallbacks = [
  mockStoreDetails["hefei-shushan-chuanmu-zhixincheng"],
  mockStoreDetails["hefei-shushan-muxi-zhixincheng"],
  mockStoreDetails["hefei-shushan-qiaoxiang-tianehuwanda"],
];

const mockDemandReferences = {
  upload: {
    id: "mock-upload-reference",
    name: "冰透猫眼轻法式参考款",
    image: assets("demand-ref-1.jpg"),
    tags: ["冰透", "猫眼", "轻法式", "显白"],
    description: "用户上传参考图，希望商家按图还原清透猫眼和轻法式边。",
    btiFitReason: "参考图适合做清透显白方向，可由商家根据甲床长度微调。",
    demandText: "想做上传参考图里的冰透猫眼轻法式，预算168-228元，合肥蜀山区附近，近期可约。希望尽量按图还原，短甲也能做。",
    sourceType: "uploaded_reference",
  },
  link: {
    id: "mock-xhs-link-reference",
    name: "小红书玫瑰果冻渐变款",
    image: assets("demand-ref-3.jpg"),
    tags: ["玫瑰", "果冻", "渐变", "小红书同款"],
    description: "从小红书链接解析出的参考款，重点是玫瑰果冻色和柔和渐变。",
    btiFitReason: "适合想要显气色、偏甜美但不过分厚重的用户。",
    demandText: "想做小红书链接里的玫瑰果冻渐变款，预算168-228元，合肥蜀山区附近，近期可约。希望商家先确认能否做相似效果。",
    sourceType: "xhs_link_reference",
  },
};

const xhsTrendBatch = {
  runId: "20260604_160652",
  keyword: "美甲",
  recentDays: 30,
  analysisDays: 90,
  count: 8,
  generatedAt: "2026-06-04T16:25:39",
  hotKeywords: ["多巴胺渐变", "淡人高级感", "甜妹蝴蝶结", "春夏显白", "冰感清透"],
};

const xhsTrends = [
  {
    id: "sweet-bow-leopard",
    label: "甜妹蝴蝶结",
    merchantTitle: "上涨机会：甜妹蝴蝶结",
    title: "软萌暴击！粉蓝蝴蝶结豹纹甲",
    img: "xhs-trends/latest/xhs_latest_01.webp",
    likes: 3839,
    publishedAt: "2026-05-09",
    daysOld: 25,
    tags: ["甜妹", "蝴蝶结", "春夏显白"],
    signal: "90 天榜单上涨 100%",
    action: "适合做拍照款和约会款封面，备粉蓝色胶、蝴蝶结饰品和豹纹细节模板。",
    url: "https://www.xiaohongshu.com/explore/69ff421a000000001a03540d",
  },
  {
    id: "pure-gradient",
    label: "显白纯欲渐变",
    merchantTitle: "高热爆款：显白纯欲渐变",
    title: "Nail🫧夏日美女味很浓的显白纯欲渐变美甲💅",
    img: "xhs-trends/latest/xhs_latest_02.webp",
    likes: 6578,
    publishedAt: "2026-05-24",
    daysOld: 10,
    tags: ["多巴胺渐变", "显白", "夏日"],
    signal: "近 30 天热度 8055",
    action: "建议做成夏日主推团购，提供低饱和改款，降低日常用户决策门槛。",
    url: "https://www.xiaohongshu.com/explore/6a12b71b000000000803db68",
  },
  {
    id: "clean-short",
    label: "清透短甲",
    merchantTitle: "稳定观察：清透短甲",
    title: "🫧Nail share | 谁做都清纯！",
    img: "xhs-trends/latest/xhs_latest_03.webp",
    likes: 222,
    publishedAt: "2026-05-12",
    daysOld: 22,
    tags: ["清透", "短甲", "通勤"],
    signal: "低热但适合转化验证",
    action: "作为通勤款补充案例，搭配奶茶裸粉和轻法式一起推荐。",
    url: "https://www.xiaohongshu.com/explore/6a02ef370000000006023f80",
  },
  {
    id: "cream-blur",
    label: "奶油晕染",
    merchantTitle: "稳定转化：奶油晕染",
    title: "软软糯糯的奶油晕染美甲～🦙",
    img: "xhs-trends/latest/xhs_latest_04.webp",
    likes: 2498,
    publishedAt: "2026-05-30",
    daysOld: 5,
    tags: ["花朵晕染", "温柔", "奶油感"],
    signal: "近 5 天新鲜款",
    action: "适合放在新品第一屏，主打温柔、不厚重、适合短甲。",
    url: "https://www.xiaohongshu.com/explore/6a1a67df000000003701e59f",
  },
  {
    id: "light-dopamine",
    label: "淡人多巴胺",
    merchantTitle: "上升元素：淡人多巴胺",
    title: "淡人多巴胺美甲⊹꙳💭˖꙳◦",
    img: "xhs-trends/latest/xhs_latest_05.webp",
    likes: 1477,
    publishedAt: "2026-05-16",
    daysOld: 18,
    tags: ["多巴胺", "淡人", "低饱和"],
    signal: "高热但需做日常化改款",
    action: "建议拆成拍照版和通勤版两套报价，避免只热不约。",
    url: "https://www.xiaohongshu.com/explore/6a0832f20000000037035626",
  },
  {
    id: "flower-letter",
    label: "花朵字母",
    merchantTitle: "拍照人群：花朵字母",
    title: "𐙚 ‧𝓕𝓵𝓸𝔀𝓮𝓻 𝓛𝓮𝓽𝓽𝓮𝓻 ₊˚⊹",
    img: "xhs-trends/latest/xhs_latest_06.webp",
    likes: 2119,
    publishedAt: "2026-05-30",
    daysOld: 5,
    tags: ["花朵晕染", "拍照", "细节感"],
    signal: "近 5 天新鲜款",
    action: "适合做生日、约会、拍照场景套餐，强调手绘细节和出片感。",
    url: "https://www.xiaohongshu.com/explore/6a19bcd1000000003700d533",
  },
  {
    id: "blue-korean",
    label: "冰蓝韩系",
    merchantTitle: "春夏主推：冰感清透",
    title: "夏天最忧郁之美甲🐬🩵🏝️淡淡韩味！",
    img: "xhs-trends/latest/xhs_latest_07.webp",
    likes: 732,
    publishedAt: "2026-05-29",
    daysOld: 5,
    tags: ["冰感清透", "蓝色系", "韩系"],
    signal: "清凉色系稳定观察",
    action: "适合与冰蓝水光、银色细闪一起做夏日清凉组合。",
    url: "https://www.xiaohongshu.com/explore/6a19b7380000000035026825",
  },
  {
    id: "photo-outfit",
    label: "拍照穿搭",
    merchantTitle: "内容机会：拍照穿搭",
    title: "👚拍美甲常穿的 2.0",
    img: "xhs-trends/latest/xhs_latest_08.webp",
    likes: 1202,
    publishedAt: "2026-06-01",
    daysOld: 3,
    tags: ["内容种草", "搭配", "拍照"],
    signal: "最新 3 天内容信号",
    action: "适合把门店案例和穿搭建议一起发布，提高收藏和分享。",
    url: "https://www.xiaohongshu.com/explore/6a1ce6000000000008000fc8",
  },
];

const xhsStyleTrends = [
  { style: "多巴胺渐变", status: "上涨 194%", statusType: "up", growth: 194, score90d: 13229, score30d: 8055, count: 4 },
  { style: "淡人高级感", status: "上涨 100%", statusType: "up", growth: 100, score90d: 10025, score30d: 5787, count: 5 },
  { style: "甜妹蝴蝶结", status: "上涨 100%", statusType: "up", growth: 100, score90d: 19940, score30d: 3839, count: 4 },
  { style: "花朵晕染", status: "热度稳定", statusType: "stable", growth: -43, score90d: 20660, score30d: 2498, count: 4 },
  { style: "春夏显白", status: "上涨 100%", statusType: "up", growth: 100, score90d: 2370, score30d: 2370, count: 2 },
  { style: "冰感清透", status: "热度稳定", statusType: "stable", growth: -84, score90d: 13955, score30d: 1976, count: 3 },
  { style: "海莉醋酸", status: "热度稳定", statusType: "stable", growth: 0, score90d: 72335, score30d: 0, count: 3 },
  { style: "闪粉亮片", status: "热度稳定", statusType: "stable", growth: 0, score90d: 12000, score30d: 0, count: 1 },
  { style: "奶茶裸粉", status: "稳定高转化", statusType: "stable", growth: -100, score90d: 2797, score30d: 0, count: 1 },
];

const state = {
  view: "home",
  aiStep: 0,
  selectedStyle: "shell-pearl-almond",
  selectedTrend: "sweet-bow-leopard",
  xhsTrendBatch: { ...xhsTrendBatch },
  xhsTrends: [...xhsTrends],
  xhsStyleTrends: [...xhsStyleTrends],
  xhsSync: {
    status: "idle",
    progress: 0,
    step: "等待同步",
    lastSyncedAt: xhsTrendBatch.generatedAt,
    logs: [],
  },
  publishedDemandCount: 0,
  merchantOrders: [],
  sharedJourney: null,
  frontDemands: [],
  frontAppointments: [],
  frontBtiRecords: [],
  frontTryonRecords: [],
  frontShareRecords: [],
  profile: {
    nickname: "小美爱美甲",
    signature: "最近迷上清透显白款，偏爱低饱和通勤风。",
    avatar: assets("user-avatar.jpg"),
    level: {
      current: 1,
      name: "新手试戴者",
      points: 120,
      nextPoints: 300,
      benefit: "完成 Nail BTI、保存试戴和发布需求都能积累成长值",
    },
  },
  mineDetail: null,
  demandTab: "new",
  demandSource: "",
  storeFilter: "distance",
  selectedStore: "a",
  selectedSlot: "今天 16:00",
  storeMode: "style",
  storeLookupStatus: "",
  storeLookupLoading: false,
  storeLookupStyleId: "",
  realStores: [],
  manualStores: [],
  modal: null,
  toast: "",
  handFile: null,
  handImage: "",
  handFileName: "",
  handAnalysis: null,
  btiResult: null,
  generatedStyle: null,
  generatedStyleNonce: 0,
  generatedStyleLoading: false,
  stylePrompt: "想要一款显白、清透、日常但有一点精致感的美甲。",
  tryonImage: "",
  tryonLoading: false,
  tryonError: "",
  showHandSamples: false,
  demandText: "",
  demandId: "",
  myDemands: [],
  appointment: null,
  friendInvite: null,
  friendInviteRecords: [],
  bookingDate: "",
  bookingTime: "",
  bookingCode: "",
};

let analysisTimer = null;
let toastTimer = null;
let xhsSyncTimers = [];

const app = document.querySelector("#app");
const modalRoot = document.querySelector("#modal-root");

if (!app || !modalRoot) {
  throw new Error("NailMuse app roots are missing.");
}

function icon(name) {
  return `<i data-lucide="${name}" aria-hidden="true"></i>`;
}

function activeStyle() {
  if (state.selectedStyle === "generated" && state.generatedStyle) {
    return state.generatedStyle;
  }
  return nailStyles.find((item) => item.id === state.selectedStyle) || nailStyles[0];
}

function activeStore() {
  return state.realStores.find((item) => item.id === state.selectedStore) || state.realStores[0] || stores.find((item) => item.id === state.selectedStore) || stores[0];
}

const SHARED_JOURNEY_KEY = "nailMuseSharedJourney";

function readSharedJourney() {
  try {
    const raw = window.localStorage.getItem(SHARED_JOURNEY_KEY);
    if (!raw) return null;
    const payload = JSON.parse(raw);
    return payload && typeof payload === "object" ? payload : null;
  } catch (error) {
    console.warn("Unable to read shared NailMuse journey.", error);
    return null;
  }
}

function recordImageSrc(img, fallback = "demand-ref-1.jpg") {
  if (!img) return assets(fallback);
  const value = String(img);
  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:") ||
    value.startsWith("./") ||
    value.startsWith("../") ||
    value.startsWith("/")
  ) {
    return value;
  }
  return assets(value);
}

function syncSharedJourney() {
  const journey = readSharedJourney();
  state.sharedJourney = journey;
  state.frontDemands = Array.isArray(journey?.demands) ? journey.demands : [];
  state.frontAppointments = Array.isArray(journey?.appointments) ? journey.appointments : [];
  state.frontBtiRecords = Array.isArray(journey?.btiRecords) ? journey.btiRecords : [];
  state.frontTryonRecords = Array.isArray(journey?.tryonRecords) ? journey.tryonRecords : [];
  state.frontShareRecords = Array.isArray(journey?.shareRecords) ? journey.shareRecords : [];
  state.publishedDemandCount = Math.max(state.myDemands.length, state.frontDemands.length, state.publishedDemandCount || 0);
  const localOrders = state.merchantOrders.filter((item) => item.localOnly);
  const sharedOrders = state.frontAppointments.map(sharedAppointmentToMerchantOrder);
  const byId = new Map();
  [...localOrders, ...sharedOrders].forEach((item) => byId.set(item.id, item));
  state.merchantOrders = Array.from(byId.values()).slice(0, 6);
}

function sharedDemandToOrder(item, index) {
  return {
    id: item.id || `shared-demand-${index}`,
    img: item.image || item.referenceImage || `demand-ref-${Math.min(index + 1, 4)}.jpg`,
    title: item.styleName || item.title || "美甲需求",
    bti: item.bti || item.btiArchetype || "来自我的需求",
    heat: item.budgetRange || item.availableTime || "等待商家报价",
    store: item.location || "用户附近",
    slot: item.availableTime || "近期可约",
    price: item.budgetRange || "",
    status: item.status || "等待商家报价",
    desc: item.demandText || item.desc || "",
    tags: Array.isArray(item.styleTags) && item.styleTags.length ? item.styleTags.slice(0, 4) : ["需求发布"],
  };
}

function sharedAppointmentToMerchantOrder(item, index) {
  return {
    id: item.id || item.code || `shared-booking-${index}`,
    img: item.styleImage || "style-ice-cat.jpg",
    title: item.styleName || "门店预约",
    bti: "来自门店预约",
    heat: "预约订单",
    store: item.storeName || "已预约门店",
    slot: item.slot || `${item.dateLabel || ""} ${item.dateSub || ""} ${item.time || ""}`.trim(),
    price: item.price || "",
    status: item.status === "booked" ? "待商家确认" : item.status || "待商家确认",
    tags: Array.isArray(item.styleTags) && item.styleTags.length ? item.styleTags.slice(0, 4) : ["预约"],
  };
}

function currentXhsTrends() {
  return state.xhsTrends && state.xhsTrends.length ? state.xhsTrends : xhsTrends;
}

function currentXhsTrendBatch() {
  return state.xhsTrendBatch || xhsTrendBatch;
}

function currentXhsStyleTrends() {
  return state.xhsStyleTrends && state.xhsStyleTrends.length ? state.xhsStyleTrends : xhsStyleTrends;
}

function activeTrend() {
  const trends = currentXhsTrends();
  return trends.find((item) => item.id === state.selectedTrend) || trends[0];
}

function createMerchantOrder() {
  const store = activeStore();
  const style = activeStyle();
  const details = storeDisplayDetails(store);
  return {
    id: state.bookingCode || `booking-${Date.now()}`,
    localOnly: true,
    img: style.img || style.image || "style-ice-cat.jpg",
    title: style.name || "门店预约",
    bti: state.btiResult?.name || state.btiResult?.archetype || "来自门店预约",
    heat: "预约订单",
    store: store?.name || "已预约门店",
    slot: state.selectedSlot || `${selectedBookingDate().label} ${selectedBookingDate().sub} ${selectedBookingTime()}`,
    price: details.priceRange || store?.price || "",
    status: "待商家确认",
    tags: Array.isArray(style.tags) && style.tags.length ? style.tags.slice(0, 4) : ["预约"],
  };
}

function formatCompactNumber(value) {
  const number = Number(value || 0);
  if (number >= 10000) return `${Math.round(number / 1000) / 10}w`;
  return String(number);
}

function formatGeneratedDate(value) {
  return value ? String(value).slice(0, 10).replaceAll("-", ".") : "";
}

function refreshedXhsTrends() {
  return [...xhsTrends];
}

function apiBaseUrl() {
  return API_BASE;
}

function applyXhsPayload(payload) {
  if (!payload || !payload.trends || !payload.trends.length) return false;
  state.xhsTrends = payload.trends;
  state.xhsStyleTrends = payload.styleTrends && payload.styleTrends.length ? payload.styleTrends : state.xhsStyleTrends;
  state.selectedTrend = payload.trends[0].id;
  state.xhsTrendBatch = {
    ...state.xhsTrendBatch,
    ...payload.batch,
    count: payload.trends.length,
    hotKeywords: payload.batch?.hotKeywords?.length ? payload.batch.hotKeywords : state.xhsTrendBatch.hotKeywords,
  };
  return true;
}

async function fetchLatestXhsPayload() {
  const response = await fetch(`${apiBaseUrl()}/api/xhs/trends/latest`);
  if (!response.ok) throw new Error("latest trends unavailable");
  return response.json();
}

async function startXhsSync() {
  xhsSyncTimers.forEach((timer) => window.clearTimeout(timer));
  xhsSyncTimers = [];
  state.xhsSync = {
    status: "syncing",
    progress: 12,
    step: "正在连接小红书采集任务...",
    lastSyncedAt: state.xhsSync.lastSyncedAt,
    logs: [],
  };
  render();

  try {
    const response = await fetch(`${apiBaseUrl()}/api/xhs/sync/start`, { method: "POST" });
    if (!response.ok) throw new Error("sync api unavailable");
    pollXhsSyncStatus();
    return;
  } catch (error) {
    runMockXhsSync();
  }
}

function runMockXhsSync() {
  const steps = [
    [520, 32, "正在读取关键词：美甲 / 热门 / 最近 30 天"],
    [1040, 56, "正在筛选完整单套美甲图片"],
    [1580, 78, "正在整理商家可读风格标签"],
    [2100, 100, "同步完成，趋势数据已刷新"],
  ];

  steps.forEach(([delay, progress, step]) => {
    const timer = window.setTimeout(() => {
      const done = progress === 100;
      if (done) {
        const syncedAt = new Date().toISOString();
        const trends = refreshedXhsTrends();
        state.xhsTrends = trends;
        state.selectedTrend = trends[0].id;
        state.xhsTrendBatch = {
          ...xhsTrendBatch,
          generatedAt: syncedAt,
          count: trends.length,
          hotKeywords: xhsTrendBatch.hotKeywords,
        };
        state.xhsSync = {
          status: "done",
          progress,
          step,
          lastSyncedAt: syncedAt,
          logs: ["模拟同步完成"],
        };
        showToast("小红书趋势已同步到网站");
        return;
      }
      state.xhsSync = {
        ...state.xhsSync,
        progress,
        step,
        logs: [step],
      };
      render();
    }, delay);
    xhsSyncTimers.push(timer);
  });
}

async function pollXhsSyncStatus() {
  try {
    const response = await fetch(`${apiBaseUrl()}/api/xhs/sync/status`);
    if (!response.ok) throw new Error("sync status unavailable");
    const status = await response.json();
    state.xhsSync = {
      status: status.status || "syncing",
      progress: status.progress || 0,
      step: status.step || "正在同步",
      lastSyncedAt: status.finishedAt || state.xhsSync.lastSyncedAt,
      logs: status.logs || state.xhsSync.logs || [],
    };
    render();

    if (status.status === "done") {
      const payload = await fetchLatestXhsPayload();
      applyXhsPayload(payload);
      state.xhsSync = {
        status: "done",
        progress: 100,
        step: "同步完成，趋势数据已刷新",
        lastSyncedAt: payload.batch.generatedAt || new Date().toISOString(),
        logs: status.logs || state.xhsSync.logs || [],
      };
      showToast("小红书趋势已实时同步");
      return;
    }

    if (status.status === "error") {
      state.xhsSync = {
        ...state.xhsSync,
        status: "error",
        progress: 100,
        step: status.error || "同步失败",
        logs: status.logs || state.xhsSync.logs || [],
      };
      showToast("小红书同步失败，请查看后端日志");
      return;
    }

    const timer = window.setTimeout(pollXhsSyncStatus, 1200);
    xhsSyncTimers.push(timer);
  } catch (error) {
    runMockXhsSync();
  }
}

function isGeneratedStyleSelected() {
  return state.selectedStyle === "generated" && Boolean(state.generatedStyle);
}

function fixedStyleCanBookDirect() {
  return !isGeneratedStyleSelected();
}

function fixedTryonShouldBookDirectly() {
  return fixedStyleCanBookDirect() && Boolean(state.tryonImage);
}

function styleById(id) {
  return nailStyles.find((item) => item.id === id) || nailStyles[0];
}

function recommendedStylesForCurrentPersona() {
  const recommendation = state.btiResult?.recommendation || buildRecommendation(state.handAnalysis);
  return [recommendation.mainStyle, ...(recommendation.optionalStyles || [])].filter(Boolean);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function downloadTextFile(filename, mimeType, content) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 800);
}

function downloadBtiShareCard() {
  const bti = state.btiResult;
  const recommendation = bti?.recommendation || buildRecommendation(state.handAnalysis);
  const personaName = bti?.chineseName || "奶茶通勤系";
  const personaCode = bti?.archetype || "DREAMER";
  const btiCode = bti?.code || "WNLS";
  const summary = bti?.styleSummary || "适合低饱和、显白、耐看的美甲风格。";
  const roast = bti?.comment || bti?.roast || "收藏夹很满，行动力很玄，但审美确实在线。";
  const mainStyle = recommendation.mainStyle || nailStyles[0];
  const metrics = [
    ["显白指数", metricValue("white_axis", 92)],
    ["修手指数", metricValue("shape_axis", 87)],
    ["承载指数", metricValue("design_axis", 84)],
    ["气质指数", metricValue("vibe_axis", 90)],
  ];
  const diagonalLines = Array.from(
    { length: 18 },
    (_, index) => `<line x1="${index * 80 - 260}" y1="0" x2="${index * 80 + 80}" y2="1440"/>`,
  ).join("");
  const metricCards = metrics
    .map(
      ([label, value], index) => `
        <rect x="${124 + index * 208}" y="1036" width="178" height="126" rx="26" fill="#fffafc" stroke="#f2c8d5"/>
        <text x="${150 + index * 208}" y="1086" fill="#8c5b73" font-size="24" font-family="Arial, sans-serif" font-weight="700">${escapeHtml(label)}</text>
        <text x="${150 + index * 208}" y="1140" fill="#dc5f8d" font-size="48" font-family="Arial, sans-serif" font-weight="900">${value}</text>
      `,
    )
    .join("");
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1440" viewBox="0 0 1080 1440">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fffafd"/>
      <stop offset="0.48" stop-color="#ffe6ef"/>
      <stop offset="1" stop-color="#f7b6cc"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="28" stdDeviation="28" flood-color="#b86584" flood-opacity="0.22"/>
    </filter>
  </defs>
  <rect width="1080" height="1440" fill="url(#bg)"/>
  <circle cx="930" cy="160" r="260" fill="#fff" opacity="0.36"/>
  <circle cx="140" cy="1180" r="260" fill="#fff" opacity="0.28"/>
  <g opacity="0.34" stroke="#d697a6" stroke-width="2">${diagonalLines}</g>
  <rect x="86" y="118" width="908" height="1110" rx="52" fill="rgba(255,255,255,0.78)" stroke="#f0c6d4" stroke-width="3" filter="url(#softShadow)"/>
  <text x="124" y="214" fill="#8c5b73" font-size="34" font-family="Arial, sans-serif" font-weight="700" letter-spacing="4">甲遇 NailMuse</text>
  <text x="124" y="318" fill="#8a2f52" font-size="84" font-family="serif" font-weight="700">我的 Nail BTI</text>
  <rect x="124" y="372" width="390" height="66" rx="33" fill="#fff5f8" stroke="#efc2d0"/>
  <text x="154" y="416" fill="#9a5370" font-size="30" font-family="Arial, sans-serif" font-weight="700">${escapeHtml(personaCode)} · ${escapeHtml(btiCode)}</text>
  <text x="124" y="550" fill="#8a2f52" font-size="92" font-family="serif" font-weight="700">${escapeHtml(personaName)}</text>
  <text x="124" y="650" fill="#3f2732" font-size="48" font-family="Arial, sans-serif" font-weight="800">AI 说我不是纠结，</text>
  <text x="124" y="715" fill="#3f2732" font-size="48" font-family="Arial, sans-serif" font-weight="800">是下一次一定换风格体。</text>
  <text x="124" y="802" fill="#8f7480" font-size="30" font-family="Arial, sans-serif">${escapeHtml(summary).slice(0, 34)}</text>
  <rect x="124" y="868" width="832" height="112" rx="28" fill="#fff0f5"/>
  <text x="164" y="936" fill="#a84c6d" font-size="34" font-family="Arial, sans-serif" font-weight="800">“ ${escapeHtml(roast).slice(0, 28)} ”</text>
  ${metricCards}
  <text x="124" y="1266" fill="#8c5b73" font-size="30" font-family="Arial, sans-serif" font-weight="800">本命款：${escapeHtml(mainStyle.name || "冰透猫眼轻法式")}</text>
  <text x="124" y="1322" fill="#a1848f" font-size="26" font-family="Arial, sans-serif">你测出来是什么？发我看看，顺便帮我决定下一款。</text>
</svg>`;
  downloadTextFile(`NailMuse-${personaName}-BTI.svg`, "image/svg+xml;charset=utf-8", svg.trim());
  showToast("Nail BTI 卡片已保存到本地");
}

function resolveImageSrc(value, fallback = "") {
  const image = String(value || "").trim();
  if (!image) return fallback;
  if (image.startsWith("data:image/") || image.startsWith("http://") || image.startsWith("https://")) return image;
  if (image.startsWith("./") || image.startsWith("../")) return image;
  if (image.startsWith("public/")) return `./${image}`;
  if (image.startsWith("/nails/") || image.startsWith("/personas/") || image.startsWith("/samples/")) {
    return `./public${image}`;
  }
  if (image.startsWith("/")) return `.${image}`;
  return assets(image);
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error || new Error("读取图片失败"));
    reader.readAsDataURL(file);
  });
}

function loadImageElement(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("图片解析失败"));
    image.src = src;
  });
}

function dataUrlByteLength(dataUrl) {
  const payload = String(dataUrl || "").split(",", 2)[1] || "";
  return Math.ceil((payload.length * 3) / 4);
}

async function compressImageDataUrl(dataUrl, options = {}) {
  if (!String(dataUrl || "").startsWith("data:image/")) return dataUrl;
  const maxBytes = options.maxBytes || 1200 * 1024;
  const passes = [
    { maxSide: options.maxSide || 1280, quality: options.quality || 0.86 },
    { maxSide: 1080, quality: 0.82 },
    { maxSide: 920, quality: 0.78 },
    { maxSide: 760, quality: 0.72 },
    { maxSide: 640, quality: 0.68 },
  ];
  try {
    const image = await loadImageElement(dataUrl);
    const sourceWidth = image.naturalWidth || image.width;
    const sourceHeight = image.naturalHeight || image.height;
    if (!sourceWidth || !sourceHeight) return dataUrl;
    const sourceBytes = dataUrlByteLength(dataUrl);
    const sourceMime = dataUrl.slice(5, dataUrl.indexOf(";")).toLowerCase();
    if (Math.max(sourceWidth, sourceHeight) <= passes[0].maxSide && sourceBytes <= maxBytes && sourceMime === "image/jpeg") {
      return dataUrl;
    }

    let best = dataUrl;
    let bestBytes = sourceBytes;
    for (const pass of passes) {
      const scale = Math.min(1, pass.maxSide / Math.max(sourceWidth, sourceHeight));
      const width = Math.max(1, Math.round(sourceWidth * scale));
      const height = Math.max(1, Math.round(sourceHeight * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (!context) continue;
      context.fillStyle = "#fff";
      context.fillRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);
      const output = canvas.toDataURL("image/jpeg", pass.quality);
      const outputBytes = dataUrlByteLength(output);
      if (outputBytes < bestBytes) {
        best = output;
        bestBytes = outputBytes;
      }
      if (outputBytes <= maxBytes) return output;
    }
    return best;
  } catch (error) {
    return dataUrl;
  }
}

function dataUrlToFile(dataUrl, filename = "hand-upload.jpg") {
  const [header, payload = ""] = String(dataUrl || "").split(",", 2);
  const mime = header.split(";", 1)[0].replace("data:", "") || "image/jpeg";
  const binary = atob(payload);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return new File([bytes], filename, { type: mime });
}

function asJpegFilename(filename = "hand-upload.jpg") {
  const trimmed = String(filename || "hand-upload").trim() || "hand-upload";
  return /\.[^.]+$/.test(trimmed) ? trimmed.replace(/\.[^.]+$/, ".jpg") : `${trimmed}.jpg`;
}

async function prepareHandImageFile(file, filename = "hand-upload.jpg") {
  const originalDataUrl = await fileToDataUrl(file);
  const dataUrl = await compressImageDataUrl(originalDataUrl);
  if (dataUrl === originalDataUrl) {
    return { file, dataUrl };
  }
  return { file: dataUrlToFile(dataUrl, asJpegFilename(filename)), dataUrl };
}

async function imageToDataUrl(src) {
  if (src.startsWith("data:image/")) return src;
  const response = await fetch(src);
  if (!response.ok) throw new Error("参考图读取失败");
  const blob = await response.blob();
  return fileToDataUrl(blob);
}

async function useReferenceHand(sampleId) {
  const sample = referenceHandSamples.find((item) => item.id === sampleId) || referenceHandSamples[0];
  if (!sample) return;
  try {
    const imageUrl = assets(sample.img);
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error("参考手图读取失败");
    const blob = await response.blob();
    const extension = sample.img.split(".").pop() || "jpg";
    const file = new File([blob], `${sample.id}.${extension}`, { type: blob.type || "image/jpeg" });
    const prepared = await prepareHandImageFile(file, `${sample.id}.${extension}`);
    state.handFile = prepared.file;
    state.handFileName = sample.name;
    state.handImage = prepared.dataUrl;
    state.handAnalysis = null;
    state.btiResult = null;
    state.tryonImage = "";
    state.tryonError = "";
    state.showHandSamples = false;
    state.view = "analysis";
    state.aiStep = 0;
    render();
    showToast(`已选用参考图：${sample.name}`);
  } catch (error) {
    showToast(error instanceof Error ? error.message : "参考手图读取失败");
  }
}

async function apiJson(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, options);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    let detail = payload.detail || payload.error || "";
    if (!detail && response.status === 413) detail = "图片太大，已自动压缩后请再试一次";
    if (!detail && response.status === 504) detail = "AI生成超时，请稍后重试";
    if (!detail) detail = response.statusText;
    throw new Error(detail || "接口调用失败");
  }
  return payload;
}

function buildBTICode(analysis) {
  return [
    analysis.white_axis === "soft_white" ? "W" : "C",
    analysis.shape_axis === "natural_shape" ? "N" : "E",
    analysis.design_axis === "clean_design" ? "L" : "R",
    analysis.vibe_axis === "soft_vibe" ? "S" : "A",
  ].join("");
}

function buildRecommendation(analysis) {
  const code = analysis ? buildBTICode(analysis) : "WELS";
  const persona = btiPersonas[code] || btiPersonas.WELS;
  const styleIds = persona[3] || [];
  const styles = styleIds.map(styleById).filter(Boolean);
  const mainStyle = styles[0] || nailStyles[0];
  const optionalStyles = styles.slice(1, 5);
  const rich = analysis?.design_axis === "rich_design";
  const cold = analysis?.white_axis === "contrast_white";
  return {
    mainStyle,
    optionalStyles,
    avoidStyles: rich ? ["过度堆钻", "厚重雕花"] : cold ? ["灰感裸色", "暗沉纯色"] : ["大面积荧光色", "高饱和撞色"],
    avoidReason: rich ? "装饰过密会抢掉手部比例。" : "容易压住肤色和原本气质。",
  };
}

function mapHandAnalysisToBTI(analysis) {
  const code = buildBTICode(analysis);
  const [archetype, chineseName, personaComment] = btiPersonas[code] || btiPersonas.WELS;
  const recommendation = buildRecommendation(analysis);
  const traits = [
    axisLabels.white_axis[analysis.white_axis],
    axisLabels.shape_axis[analysis.shape_axis],
    axisLabels.design_axis[analysis.design_axis],
    axisLabels.vibe_axis[analysis.vibe_axis],
  ].filter(Boolean);
  return {
    code,
    archetype,
    chineseName,
    cnName: chineseName,
    comment: personaComment,
    roast: `AI说我是 ${archetype}`,
    avatarUrl: `/personas/${String(archetype).toLowerCase()}.png`,
    traits,
    axes: {
      white_axis: analysis.white_axis,
      shape_axis: analysis.shape_axis,
      design_axis: analysis.design_axis,
      vibe_axis: analysis.vibe_axis,
    },
    confidence: analysis.confidence || {},
    evidence: analysis.evidence || {},
    recommendation,
    styleSummary: `你适合${recommendation.mainStyle.name}一类的款式，重点放在显白、比例和真实佩戴感。`,
    shareCopy: `AI说我是 ${archetype}，你测出来是什么？`,
  };
}

function metricValue(key, fallback) {
  const value = state.handAnalysis?.confidence?.[key];
  return Math.max(72, Math.min(98, Math.round((typeof value === "number" ? value : fallback / 100) * 100)));
}

function generatedStyleName(style) {
  const tags = Array.isArray(style?.tags) ? style.tags.join("") : "";
  const seed = `${style?.name || ""}${style?.description || ""}${tags}${state.stylePrompt || ""}`;
  const pools = [
    ["晨雾贝母流光甲", "月雾珍珠微光甲", "奶冻贝壳轻法式"],
    ["蓝粉蝴蝶糖霜甲", "甜妹冰晶蝴蝶甲", "云朵蝴蝶果冻甲"],
    ["冷白银露猫眼甲", "冰透银纱猫眼甲", "月光银闪水波甲"],
    ["玫瑰果冻花瓣甲", "蜜桃花露渐变甲", "粉雾花瓣轻透甲"],
    ["柔光通勤缎面甲", "裸粉雾面显白甲", "低饱和微闪通勤甲"],
  ];
  let pool = pools[4];
  if (/贝母|珍珠|贝壳|奶白/.test(seed)) pool = pools[0];
  else if (/蝴蝶|甜|蓝粉|可爱/.test(seed)) pool = pools[1];
  else if (/银|冰|猫眼|冷|极光/.test(seed)) pool = pools[2];
  else if (/花|玫瑰|桃|粉/.test(seed)) pool = pools[3];
  const index = Math.abs(seed.length + state.generatedStyleNonce) % pool.length;
  return `AI ${pool[index]}`;
}

function generatedStyleFromPayload(style) {
  return {
    id: "generated",
    name: generatedStyleName(style),
    sourceName: style.name || "",
    img: style.image || nailStyles[0].image,
    image: style.image || nailStyles[0].image,
    reason: style.btiFitReason || style.description || state.btiResult?.recommendation?.mainStyle?.reason || "根据你的手型和 Nail BTI 生成。",
    tags: Array.isArray(style.tags) && style.tags.length ? style.tags.slice(0, 4) : ["AI生成", "显白", "适配"],
    description: style.description || "",
    estimatedPrice: style.estimatedPrice || "168-228元",
  };
}

function currentStylePayload() {
  const style = activeStyle();
  return {
    id: style.id,
    name: style.name,
    image: style.image || style.img,
    tags: style.tags || [],
    description: style.description || style.reason || "",
    btiFitReason: style.reason || "",
    estimatedPrice: style.estimatedPrice || "168-228元",
  };
}

function currentDemandPayload() {
  if (state.demandSource === "upload" || state.demandSource === "link") {
    const mock = mockDemandReferences[state.demandSource];
    return {
      ...mock,
      img: mock.image,
      reason: mock.btiFitReason,
      estimatedPrice: "168-228元",
    };
  }
  const style = currentStylePayload();
  return {
    ...style,
    image: state.tryonImage || "",
    img: state.tryonImage || "",
    sourceType: state.tryonImage ? "tryon_result" : "ai_generated",
  };
}

function applyDemandSource(source) {
  state.demandSource = source;
  state.demandText = mockDemandReferences[source]?.demandText || "";
}

function getCurrentStyleImage() {
  const style = activeStyle();
  return resolveImageSrc(style.image || style.img, resolveImageSrc(nailStyles[0].image));
}

function shell(content) {
  return `
    <header class="topbar">
      <div class="topbar-inner">
        <button class="brand" type="button" data-nav="home" aria-label="回到首页">
          <span class="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 64 64" focusable="false">
              <path class="brand-mark-finger" d="M37.6 54.8c6.8-8.4 11-19.6 10.2-30.6-.5-7.5-5.3-12.7-11.4-11.8-7 1.1-10.6 9.3-9.9 18.2.6 7.9 4.1 16.2 11.1 24.2Z" />
              <path class="brand-mark-nail" d="M38.1 12.6c7.9 3.2 9.1 17.2 2.4 25.2-4.2 5-10.8 3.8-13.2-2.4-3.4-8.5.8-19.3 10.8-22.8Z" />
              <path class="brand-mark-leaf" d="M13.8 36.6c12.2 2.7 21.2 9.6 27 20.7-13.6-.1-22.6-7-27-20.7Z" />
            </svg>
          </span>
          <span class="brand-copy">
            <span class="brand-cn">甲遇</span>
            <span class="brand-en">NailMuse</span>
          </span>
        </button>
        <nav class="nav" aria-label="主导航">
          ${navItems
            .map(
              ([id, label]) => `
                <button class="nav-item ${state.view === id ? "active" : ""}" type="button" data-nav="${id}">
                  ${label}
                </button>
              `,
            )
            .join("")}
        </nav>
      </div>
    </header>
    ${content}
  `;
}

function renderHome() {
  const heroDecorStyles = [
    "rose-jelly-french",
    "satin-nude-almond",
    "shell-pearl-almond",
    "champagne-sheer-almond",
    "nude-mica-french",
    "milky-pearl-office",
    "moonlight-silver-french",
  ]
    .map((id) => nailStyles.find((style) => style.id === id))
    .filter(Boolean);
  const marqueeStyles = [...heroDecorStyles, ...heroDecorStyles];

  return `
    <main class="hero">
      <div class="hero-media" aria-hidden="true">
        <img class="hero-backdrop" src="${assets("hero-atmosphere-pink-aigc.png")}" alt="" />
        <div class="hero-nail-marquee">
          <div class="hero-marquee-track">
            ${marqueeStyles
              .map((style) => `<img src="${resolveImageSrc(style.img)}" alt="" />`)
              .join("")}
          </div>
        </div>
      </div>
      <div class="hero-grain" aria-hidden="true"></div>
      <div class="hero-inner">
        <section class="hero-copy">
          <span class="hero-kicker">${icon("scan-line")}AI NAIL STUDIO</span>
          <h1>
            <span>从试戴到选购</span>
            <span>一站式搞定你的下一款美甲</span>
          </h1>
          <p>AI 分析手型与风格偏好，预览真实上手效果，并找到更适合你的款式与门店。</p>
          <div class="hero-actions">
            <button class="btn primary large hero-cta" type="button" data-action="start-ai">
              ${icon("sparkles")}<span>开始分析美甲</span>
            </button>
          </div>
          <div class="hero-note" aria-label="AI 分析、款式试戴、需求发布、门店预约">
            <span><b>AI 分析</b><small>识别手型</small></span>
            <span><b>款式试戴</b><small>预览效果</small></span>
            <span><b>需求发布</b><small>用户定制</small></span>
            <span><b>门店预约</b><small>就近到店</small></span>
          </div>
        </section>
        <aside class="hero-console" aria-label="首页动态数据">
          <div class="hero-console-head">
            <span></span>
          </div>
          <div class="hero-console-preview">
            <img src="${resolveImageSrc(heroPreviewImage)}" alt="AI 试戴预览" />
            <i></i>
          </div>
          <div class="hero-console-grid">
            <div><span>Nail BTI</span><b>WELS</b></div>
            <div><span>适配度</span><b>94%</b></div>
            <div><span>趋势热度</span><b class="trend-value">${icon("trending-up")}38</b></div>
          </div>
        </aside>
      </div>
    </main>
  `;
}

function pageHead(title, subtitle = "") {
  return `
    <div class="page-head">
      <div>
        <h1 class="page-title">${title}</h1>
        ${subtitle ? `<p class="page-subtitle">${subtitle}</p>` : ""}
      </div>
    </div>
  `;
}

function stepper() {
  return `
    <div class="stepper" aria-label="AI分析步骤">
      ${steps
        .map((label, index) => {
          const status = index === state.aiStep ? "active" : index < state.aiStep ? "done" : "";
          const sep = index < steps.length - 1 ? `<span class="step-sep">${icon("arrow-right")}</span>` : "";
          return `
            <button class="step ${status}" type="button" data-ai-step="${index}">
              <span class="step-number">${index + 1}</span>
              <span>${label}</span>
            </button>
            ${sep}
          `;
        })
        .join("")}
    </div>
  `;
}

function renderAnalysis() {
  const screens = [renderUploadState, renderBtiState, renderTryonState];
  return `
    <main class="page analysis-page analysis-step-${state.aiStep}">
      <div class="analysis-shell">
        ${stepper()}
        ${screens[state.aiStep]()}
      </div>
    </main>
  `;
}

function renderUploadState() {
  const hasHandImage = Boolean(state.handImage);
  return `
    <section class="layout-two analysis-upload-layout">
      <div class="tool-panel analysis-upload-panel ${hasHandImage ? "has-hand-image" : ""}">
        <div class="upload-panel-head">
          <h2 class="panel-title">${icon("upload-cloud")}上传手部照片</h2>
          <button class="btn soft preset-toggle" type="button" data-action="toggle-reference-hands">
            ${icon("images")}预设参考
          </button>
        </div>
        <button class="dropzone ${hasHandImage ? "has-image" : ""}" type="button" data-action="select-hand-file">
          ${
            hasHandImage
              ? `<img class="uploaded-hand-preview" src="${state.handImage}" alt="已选择的手部照片" />`
              : icon("upload-cloud")
          }
          <p class="dropzone-title">${hasHandImage ? "已选择手部照片" : "选择照片 / 拖拽上传"}</p>
          <small>${hasHandImage ? `${escapeHtml(state.handFileName || "点击可重新选择照片")}` : "支持 JPG、PNG，建议手掌自然平放，指甲完整露出"}</small>
        </button>
        ${
          state.showHandSamples
            ? `<div class="sample-hand-block sample-hand-popover">
          <div class="sample-hand-head">
            <strong>没有手部照片？</strong>
            <span>直接选一张参考图体验完整流程</span>
          </div>
          <div class="sample-hand-grid">
            ${referenceHandSamples
              .map(
                (item) => `
                  <button class="sample-hand-card ${state.handFileName === item.name ? "active" : ""}" type="button" data-action="use-reference-hand" data-reference-hand="${escapeHtml(item.id)}">
                    <img src="${assets(item.img)}" alt="${escapeHtml(item.name)}" />
                    <span>${escapeHtml(item.name)}</span>
                    <small>${escapeHtml(item.desc)}</small>
                  </button>
                `,
              )
              .join("")}
          </div>
        </div>`
            : ""
        }
        <button class="btn primary full" type="button" data-action="${hasHandImage ? "start-analysis" : "select-hand-file"}">
          ${icon("scan-line")}<span>开始分析</span>
        </button>
      </div>
      <aside class="panel analysis-guide-panel">
        <h2 class="panel-title">${icon("sparkles")}你将获得</h2>
        <div class="benefit-list">
          ${[
            ["bar-chart-3", "Nail BTI 分析结果"],
            ["gauge", "四个核心指数"],
            ["compass", "适合风格与避雷风格"],
            ["wand-sparkles", "AI 推荐试戴款式"],
          ]
            .map(([name, text]) => `<div class="benefit-item">${icon(name)}<span>${text}</span></div>`)
            .join("")}
        </div>
        <hr class="divider" />
        <h3>拍照建议</h3>
        <div class="advice-grid">
          ${[
            ["hand", "手掌自然平放"],
            ["fingerprint", "指甲尽量露出"],
            ["sun", "光线充足"],
            ["ban", "不要遮挡手指"],
          ]
            .map(([name, text]) => `<div class="advice-item">${icon(name)}<span>${text}</span></div>`)
            .join("")}
        </div>
      </aside>
    </section>
  `;
}

function renderBtiState() {
  const bti = state.btiResult;
  if (!bti) return renderBtiDefaultState();

  const recommendation = bti?.recommendation || buildRecommendation(state.handAnalysis);
  const mainStyle = recommendation.mainStyle || nailStyles[0];
  const personaName = bti?.chineseName || "白月光延伸型";
  const personaCode = bti?.archetype || "MOONLIGHTER";
  const summary = bti?.styleSummary || "你的气质温柔干净，甲面条件适合低饱和与自然感，适合日常通勤与多场合切换的精致美甲风格。";
  const mainImage = resolveImageSrc(mainStyle.image || mainStyle.img, resolveImageSrc(nailStyles[0].image));
  const metrics = [
    ["显白指数", metricValue("white_axis", 92), "拍照不用狂调亮度", "底色选对，手会自己开柔光。"],
    ["修手指数", metricValue("shape_axis", 87), "甲型决定气场半径", "别硬上厚重款，比例比热闹更重要。"],
    ["甲面承载指数", metricValue("design_axis", 84), "能加戏，但别抢戏", "细闪、法式、猫眼都可，堆满容易变年会。"],
    ["线条气质指数", metricValue("vibe_axis", 90), "通勤里藏一点小心机", "看似温柔，其实很会选。"],
  ];
  const roastCards = [
    ["自拍翻车点", "款式太灰会显得手在加班，别让指尖替生活背锅。"],
    ["朋友会怎么说", `${personaName}不是没风格，是在等一个值得换头像的款。`],
    ["适合场景", "上班、约会、见客户都能用；属于“看起来没用力，但很精致”的路线。"],
  ];
  const avoidText = (recommendation.avoidStyles || [])
    .map((item) => item.name || item)
    .slice(0, 3)
    .join(" / ");
  return `
    <section class="layout-two analysis-result-layout">
      <div class="tool-panel">
        <div class="bti-card">
          <div>
            <h2 class="panel-title">${icon("sparkle")}你的 Nail BTI</h2>
            <span class="muted">人格</span>
            <h3 class="bti-name">${escapeHtml(personaName)}</h3>
            <span class="pill">${escapeHtml(personaCode)} · ${escapeHtml(bti?.code || "WNLS")}</span>
            <p class="page-subtitle">${escapeHtml(summary)}</p>
            <div class="bti-quote">
              ${icon("message-circle")}
              <span>${escapeHtml(bti?.comment || bti?.roast || "这双手不是不想换风格，是每次打开收藏夹都开始精神内耗。")}</span>
            </div>
          </div>
          <div class="persona-img">
            <img src="${resolveImageSrc(bti?.avatarUrl, "/personas/moonlighter.png")}" alt="${escapeHtml(personaName)}专属形象" />
          </div>
        </div>
        <div class="metric-grid">
          ${metrics
            .map(
              ([label, value, punchline, note]) => `
                <div class="score-card">
                  <b>${label}</b>
                  <div class="score">${value}<small>/100</small></div>
                  <strong class="score-punch">${escapeHtml(punchline)}</strong>
                  <div class="meter"><span style="width:${value}%"></span></div>
                  <p>${escapeHtml(note)}</p>
                </div>
              `,
            )
            .join("")}
        </div>
        <div class="roast-grid">
          ${roastCards
            .map(
              ([title, text]) => `
                <div class="roast-card">
                  <span>${escapeHtml(title)}</span>
                  <p>${escapeHtml(text)}</p>
                </div>
              `,
            )
            .join("")}
        </div>
        <div class="summary-box">
          ${icon("gem")}
          <div>
            <strong>风格总结</strong>
            <p class="muted">${escapeHtml(mainStyle.reason || summary)}</p>
            ${avoidText ? `<small>避雷关键词：${escapeHtml(avoidText)}</small>` : ""}
          </div>
        </div>
        <div class="btn-row">
          <button class="btn secondary" type="button" data-action="open-modal" data-modal="shareBti">${icon("download")}保存卡片</button>
          <button class="btn secondary" type="button" data-action="open-modal" data-modal="shareBti">${icon("share-2")}分享卡片</button>
        </div>
      </div>
      <aside class="panel">
        <h2 class="panel-title">${icon("sparkles")}适合风格结果</h2>
        <p class="muted"><strong>最推荐主风格</strong></p>
        <div class="style-hero">
          <img src="${mainImage}" alt="${escapeHtml(mainStyle.name)}" />
          <div>
            <h3>${escapeHtml(mainStyle.name || "冰透猫眼轻法式")}</h3>
            <div class="tag-row">
              ${(mainStyle.tags || ["显白", "灵动", "通勤百搭"])
                .slice(0, 4)
                .map((tag, index) => `<span class="tag ${index === 1 ? "sage" : index === 2 ? "gold" : ""}">${escapeHtml(tag)}</span>`)
                .join("")}
            </div>
            <p class="muted">${escapeHtml(mainStyle.reason || "冰透底色搭配猫眼光泽与轻法式边缘，干净显白，质感灵动，适合日常通勤与多场合。")}</p>
          </div>
        </div>
        <hr class="divider" />
        <p><strong>可考虑风格</strong></p>
        <div class="style-grid">
          ${(recommendation.optionalStyles || [])
            .slice(0, 4)
            .map((item) => `<button class="style-tile" type="button" data-style="${item.id}"><img src="${resolveImageSrc(item.image || item.img)}" alt="${escapeHtml(item.name)}" /><span>${escapeHtml(item.name)}</span></button>`)
            .join("")}
        </div>
        <hr class="divider" />
        <p><strong>避雷风格</strong></p>
        <div class="avoid-list">
          ${(recommendation.avoidStyles || ["大面积荧光色", "厚重雕花", "高饱和撞色"])
            .slice(0, 3)
            .map((item) => `<span class="chip">${icon("x")}${escapeHtml(item)}</span>`)
            .join("")}
        </div>
        <hr class="divider" />
        <button class="btn primary full" type="button" data-action="enter-tryon">${icon("wand-sparkles")}进入 AI试戴</button>
      </aside>
    </section>
  `;
}

function renderBtiDefaultState() {
  return `
    <section class="layout-two analysis-result-layout">
      <div class="tool-panel bti-default-panel">
        <div class="empty-state compact bti-empty-card">
          ${icon("scan-line")}
          <strong>还没有完成手部分析</strong>
          <p class="muted">请先回到“上传手图”，选择清晰手部照片后开始分析。</p>
          <button class="btn primary" type="button" data-ai-step="0">${icon("upload-cloud")}去上传手图</button>
        </div>
      </div>
      <aside class="panel">
        <h2 class="panel-title">${icon("info")}生成后你会看到</h2>
        <div class="benefit-list">
          ${[
            ["badge-check", "Nail BTI人格"],
            ["gauge", "显白、修手、承载、气质四维指数"],
            ["sparkles", "适合你的主推款和可尝试款"],
            ["ban", "不适合你的避雷风格"],
          ]
            .map(([name, text]) => `<div class="benefit-item">${icon(name)}<span>${text}</span></div>`)
            .join("")}
        </div>
      </aside>
    </section>
  `;
}

function renderTryonState() {
  const picked = activeStyle();
  const pickedImage = getCurrentStyleImage();
  const beforeImage = state.handImage || assets("hand-before.jpg");
  const hasTryonResult = Boolean(state.tryonImage);
  const afterLabel = hasTryonResult ? "试戴效果" : state.tryonError ? "生成失败" : "待生成效果";
  const localRecommendations = recommendedStylesForCurrentPersona();
  const optionalTryonStyles = localRecommendations.filter((item) => item.id !== picked.id).slice(0, 4);
  const directBooking = fixedStyleCanBookDirect();
  const bookingButtonText = state.tryonImage ? "直接预约门店" : "预约推荐门店";
  return `
    <section class="tryon-layout analysis-tryon-layout">
      <div class="tool-panel">
        <h2 class="panel-title">${icon("palette")}推荐款式</h2>
        <div class="style-hero">
          <img src="${pickedImage}" alt="${escapeHtml(picked.name)}" />
          <div>
            <span class="pill">主推款</span>
            <h3>${escapeHtml(picked.name)}</h3>
            <p class="muted"><strong>推荐理由：</strong>${escapeHtml(picked.reason || picked.description || "根据你的手型和 Nail BTI 生成。")}</p>
          </div>
        </div>
        ${state.tryonLoading ? `<p class="muted">AI 正在生成真实试戴效果，预计约 100 秒，请保持页面打开。</p>` : ""}
        ${state.tryonError ? `<p class="status-note error">${icon("circle-alert")}${escapeHtml(state.tryonError)}，已先保留参考款效果，可稍后重试。</p>` : ""}
        <hr class="divider" />
        <p><strong>4 个可尝试款</strong></p>
        <div class="style-grid">
          ${optionalTryonStyles
            .map(
              (item) => `
                <button class="style-tile ${item.id === picked.id ? "active" : ""}" type="button" data-style="${item.id}">
                  <img src="${resolveImageSrc(item.image || item.img)}" alt="${escapeHtml(item.name)}" />
                  <span>${escapeHtml(item.name)}</span>
                </button>
              `,
            )
            .join("")}
        </div>
        <hr class="divider" />
        <button class="btn soft full" type="button" data-action="cycle-style">${icon("refresh-cw")}试戴其他推荐款</button>
        <hr class="divider" />
        <div class="form-row">
          <label>AI 生成新款式</label>
          <textarea class="textarea" data-field="style-prompt">${escapeHtml(state.stylePrompt)}</textarea>
        </div>
        <button class="btn primary full" type="button" data-action="generate-style">
          ${icon("sparkles")}${state.generatedStyleLoading ? "生成中..." : "生成新推荐款"}
        </button>
      </div>
      <div class="panel compare-card">
        <div class="compare-head">
          <div><strong>当前选择：</strong>${escapeHtml(picked.name)}</div>
          <div class="muted"><strong>推荐说明：</strong>${escapeHtml(picked.reason || picked.description || "根据你的手型和 Nail BTI 生成。")}</div>
        </div>
        <div class="compare-grid">
          <figure class="compare-frame">
            <span class="label">原始手图</span>
            <img src="${beforeImage}" alt="原始手图" />
          </figure>
          <figure class="compare-frame ${hasTryonResult ? "" : "empty-tryon-frame"}">
            <span class="label">${afterLabel}</span>
            ${
              hasTryonResult
                ? `<img src="${state.tryonImage}" alt="AI 试戴效果" />`
                : `<div class="tryon-placeholder">
                    ${icon(state.tryonError ? "circle-alert" : "wand-sparkles")}
                    <strong>${state.tryonError ? "本次生成未完成" : "AI试戴生成后显示"}</strong>
                    <small>${state.tryonError ? "可重试生成，成功后这里会显示生图模型结果。" : "点击“开始 AI试戴”后，这里会展示真实上手效果。"}</small>
                  </div>`
            }
          </figure>
        </div>
        <hr class="divider" />
        <div class="btn-row">
          <button class="btn primary" type="button" data-action="start-tryon">${icon("wand-sparkles")}${state.tryonLoading ? "试戴生成中..." : "开始 AI试戴"}</button>
          ${
            directBooking
              ? `<button class="btn primary" type="button" data-nav="stores" data-keep-style="true">${icon("map-pin")}${bookingButtonText}</button>`
              : `<button class="btn primary" type="button" data-nav="demand">${icon("send")}发布需求找商家</button>`
          }
          ${directBooking ? "" : `<button class="btn secondary" type="button" data-action="open-modal" data-modal="importTryon">${icon("download")}导入试戴结果</button>`}
        </div>
      </div>
    </section>
  `;
}

function renderDemand() {
  return `
    <main class="page demand-page">
      <div class="demand-page-shell">
        <div class="tabbar demand-tabs" role="tablist" aria-label="需求页签">
          <button class="${state.demandTab === "new" ? "active" : ""}" type="button" data-demand-tab="new">新建需求</button>
          <button class="${state.demandTab === "mine" ? "active" : ""}" type="button" data-demand-tab="mine">我的需求</button>
        </div>
        ${state.demandTab === "new" ? renderDemandNew() : renderDemandMine()}
      </div>
    </main>
  `;
}

function renderDemandNew() {
  if (!state.demandSource) return renderDemandSourceChooser();
  if (state.demandSource === "import" && fixedStyleCanBookDirect()) {
    const style = activeStyle();
    return `
      <section class="tool-panel">
        <h2 class="panel-title">${icon("calendar-check")}已有款直接预约</h2>
        <div class="style-hero store-style-hero">
          <img src="${resolveImageSrc(state.tryonImage || style.image || style.img)}" alt="${escapeHtml(style.name)}" />
          <div>
            <span class="pill">无需发布需求</span>
            <h3>${escapeHtml(style.name)}</h3>
            <p class="muted">这是平台已有款式，试戴后会直接进入合肥蜀山区门店预约，不再生成需求单。</p>
          </div>
        </div>
        <div class="btn-row" style="margin-top:16px">
          <button class="btn primary" type="button" data-nav="stores" data-keep-style="true">${icon("map-pin")}直接预约门店</button>
        </div>
      </section>
    `;
  }

  const style = currentDemandPayload();
  const tags = style.tags?.length ? style.tags.slice(0, 4) : ["冰透", "猫眼", "轻法式", "显白"];
  const referenceImage = style.image || style.img || "";
  const previewText =
    state.demandText ||
    style.demandText ||
    `想做一款${style.name || "冰透猫眼轻法式"}，适合短甲，希望显白、日常、不厚重。附近能做类似效果的商家可以接单。`;
  return `
    <section class="layout-two wide-right">
      <div class="tool-panel">
        <h2 class="panel-title">${icon("file-plus-2")}输入来源</h2>
        <p><strong>选择输入方式</strong></p>
        <div class="source-grid">
          ${demandSourceOptions()
            .map(
              ({ id, iconName, label }) => `
                <button class="source-option ${state.demandSource === id ? "active" : ""}" type="button" data-demand-source="${id}">
                  ${icon(iconName)}<span>${label}</span>
                </button>
              `,
            )
            .join("")}
        </div>
        ${renderDemandSourceInput()}
        <div class="form-grid">
          <div class="form-row">
            <label>预算区间</label>
            <div class="budget-grid">
              <input class="input" value="168" aria-label="最低预算" data-field="budget-min" />
              <span class="muted">-</span>
              <input class="input" value="228" aria-label="最高预算" data-field="budget-max" />
              <span class="muted">元</span>
            </div>
          </div>
          <div class="form-row">
            <label>补充描述</label>
            <textarea class="textarea" data-field="demand-extra">希望显白、日常、不厚重。</textarea>
          </div>
        </div>
        <hr class="divider" />
        <button class="btn primary full" type="button" data-action="generate-demand">${icon("sparkles")}生成需求单</button>
      </div>
      <aside class="panel preview-box">
        <h2 class="panel-title">${icon("clipboard-list")}需求单预览</h2>
        <h3 class="preview-title">想做一款${escapeHtml(style.name || "冰透猫眼轻法式")}</h3>
        <p><strong>参考图</strong></p>
        <div class="image-strip">
          ${
            referenceImage
              ? `<img src="${resolveImageSrc(referenceImage)}" alt="${escapeHtml(style.name || "需求参考图")}" />`
              : `<div class="empty-state compact"><strong>暂无 AI 试戴结果图</strong><p class="muted">请先完成 AI 试戴，再导入需求单。</p></div>`
          }
        </div>
        <hr class="divider" />
        <p><strong>款式标签</strong></p>
        <div class="tag-row">
          ${tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
        </div>
        <hr class="divider" />
        <p><strong>Nail BTI 适配</strong></p>
        <p class="muted">${escapeHtml(state.btiResult?.chineseName || "奶茶通勤系")}，适合${escapeHtml(tags[0] || "轻量显白")}款</p>
        <p><strong>自动生成文案</strong></p>
        <p class="preview-text">${escapeHtml(previewText)}</p>
        <button class="btn primary full" type="button" data-action="publish-demand">${icon("send")}发布到需求榜</button>
      </aside>
    </section>
  `;
}

function renderDemandSourceChooser() {
  return `
    <section class="tool-panel demand-start">
      <div class="demand-start-head">
        <div>
          <h2 class="panel-title">${icon("file-plus-2")}先选择需求来源</h2>
          <p class="muted">选择后再生成需求单。现在不会默认创建空需求，也不会直接推给商家。</p>
        </div>
        <span class="pill">3 种方式</span>
      </div>
      <div class="source-grid demand-source-large">
        ${demandSourceOptions()
          .map(
            ({ id, iconName, label, desc }) => `
              <button class="source-option" type="button" data-demand-source="${id}">
                ${icon(iconName)}
                <span>${label}</span>
                <small>${desc}</small>
              </button>
            `,
          )
          .join("")}
      </div>
      <div class="summary-box">
        ${icon("clipboard-list")}
        <div>
          <strong>需求单会在你选择来源后出现</strong>
          <p class="muted">左侧填写预算、补充描述；右侧预览参考图、标签、Nail BTI 适配和自动文案。</p>
        </div>
      </div>
    </section>
  `;
}

function renderDemandSourceInput() {
  if (state.demandSource === "link") {
    const mock = mockDemandReferences.link;
    return `
      <div class="form-row">
        <label>链接</label>
        <div class="btn-row" style="flex-wrap:nowrap">
          <input class="input" value="https://www.xiaohongshu.com/explore/nail-alpha" aria-label="小红书链接" />
          <button class="btn secondary" type="button" data-action="open-modal" data-modal="parseLink">${icon("search")}解析</button>
        </div>
      </div>
      <div class="summary-box">
        <img class="summary-thumb" src="${resolveImageSrc(mock.image)}" alt="${escapeHtml(mock.name)}" />
        <div>
          <strong>已准备默认小红书参考款</strong>
          <p class="muted">${escapeHtml(mock.name)}。点击解析后会刷新右侧需求单文案。</p>
        </div>
      </div>
      <hr class="divider" />
    `;
  }
  if (state.demandSource === "import") {
    const style = activeStyle();
    if (fixedStyleCanBookDirect()) {
      return `
        <div class="summary-box">
          ${icon("map-pin")}
          <div>
            <strong>已有款试戴无需发布需求</strong>
            <p class="muted">当前款式：${escapeHtml(style.name)}。系统会直接匹配可预约门店。</p>
          </div>
        </div>
        <button class="btn primary full" type="button" data-nav="stores" data-keep-style="true">${icon("calendar-check")}直接预约门店</button>
        <hr class="divider" />
      `;
    }
    return `
      <div class="summary-box">
        ${icon("wand-sparkles")}
        <div>
          <strong>已选择 AI 生成款试戴结果</strong>
          <p class="muted">当前试戴款：${escapeHtml(style.name)}。AI 生成款需要先发布需求，请商家确认可做。</p>
        </div>
      </div>
      <button class="btn secondary full" type="button" data-action="open-modal" data-modal="importTryon">${icon("download")}确认导入</button>
      <hr class="divider" />
    `;
  }
  const mock = mockDemandReferences.upload;
  return `
    <button class="mini-upload" type="button" data-action="mock-upload-reference">
      ${icon("upload-cloud")}<span>点击或拖拽图片到此处上传</span>
      <small>支持 JPG / PNG / WEBP，最多 9 张</small>
    </button>
    <div class="summary-box">
      <img class="summary-thumb" src="${resolveImageSrc(mock.image)}" alt="${escapeHtml(mock.name)}" />
      <div>
        <strong>已准备默认上传参考款</strong>
        <p class="muted">${escapeHtml(mock.name)}，右侧会展示对应 mock 参考图。</p>
      </div>
    </div>
    <hr class="divider" />
  `;
}

function demandSourceOptions() {
  const options = [
    {
      id: "upload",
      iconName: "upload-cloud",
      label: "上传参考图",
      desc: "已有图片，想让商家照图还原。",
    },
    {
      id: "link",
      iconName: "link",
      label: "粘贴小红书链接",
      desc: "从收藏夹搬款，解析参考方向。",
    },
  ];
  if (!fixedStyleCanBookDirect()) {
    options.push({
      id: "import",
      iconName: "wand-sparkles",
      label: "导入 AI试戴结果",
      desc: "AI 生成款先发需求，请商家确认可做。",
    });
  }
  return options;
}

function renderDemandMine() {
  const rows = state.myDemands.length
    ? state.myDemands.map((item) => [
        item.title || `想做一款${item.styleName || "AI 推荐美甲"}`,
        item.desc || "已发布，等待商家报价",
        item.status || "报价中",
        item.image || state.tryonImage || currentStylePayload().image,
      ])
    : [];
  return `
    <section class="panel">
      <h2 class="panel-title">${icon("list-checks")}我的需求</h2>
      ${
        rows.length
          ? `<div class="history-list">
              ${rows
                .map(
                  ([title, desc, status, image], index) => `
                    <div class="quote-card">
                      <img src="${resolveImageSrc(image, assets(`demand-ref-${Math.min(index + 1, 4)}.jpg`))}" alt="${escapeHtml(title)}" />
                      <div>
                        <h3>${escapeHtml(title)}</h3>
                        <p class="muted">${escapeHtml(desc)}</p>
                        <span class="tag ${status === "已完成" ? "sage" : ""}">${escapeHtml(status)}</span>
                      </div>
                      <div class="quote-actions">
                        <button class="btn secondary" type="button" data-nav="stores" data-keep-style="true">${icon("search")}匹配真实门店</button>
                        <button class="btn soft" type="button" data-nav="stores" data-keep-style="true">${icon("map-pin")}去美团预约</button>
                      </div>
                    </div>
                  `,
                )
                .join("")}
            </div>`
          : `<div class="empty-state">
              ${icon("inbox")}
              <strong>还没有发布过需求</strong>
              <p class="muted">回到“新建需求”，先选择一个来源，再生成需求单。</p>
              <button class="btn primary" type="button" data-demand-tab="new">${icon("file-plus-2")}新建需求</button>
            </div>`
      }
    </section>
  `;
}

function renderStores() {
  if (state.storeMode !== "demand" && fixedStyleCanBookDirect()) {
    return renderFixedStyleStores();
  }

  const demand = state.myDemands[0];
  if (!demand) return renderStoresWaitingForDemand();

  return `
    <main class="page stores-page">
      <section class="real-store-panel">
        <div>
          <h2 class="panel-title">${icon("clipboard-list")}当前需求单</h2>
          <p><strong>${escapeHtml(demand.title || "已发布美甲需求")}</strong></p>
          <p class="muted">${escapeHtml(demand.demandText || demand.desc || "等待根据需求匹配附近真实门店。")}</p>
          <div class="tag-row" style="margin-top:12px">
            ${(demand.styleTags || []).slice(0, 4).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
          </div>
        </div>
      </section>
      <section class="real-store-panel">
        <div>
          <h2 class="panel-title">${icon("send")}合肥蜀山可接单商家</h2>
          <p class="muted">点击后会从合肥蜀山区 10 家真实门店池里，按当前需求标签匹配可接单的 3 家商家。</p>
          ${state.storeLookupStatus ? `<p class="lookup-status">${escapeHtml(state.storeLookupStatus)}</p>` : ""}
        </div>
        <div class="btn-row">
          <button class="btn primary" type="button" data-action="lookup-real-stores">${icon("navigation")}匹配可接单商家</button>
        </div>
      </section>
      ${renderRealStoreResults()}
    </main>
  `;
}

function renderFixedStyleStores() {
  const style = activeStyle();
  return `
    <main class="page stores-page stores-direct-page">
      <section class="real-store-panel">
        <div class="style-hero store-style-hero">
          <img src="${resolveImageSrc(style.image || style.img)}" alt="${escapeHtml(style.name)}" />
          <div>
            <span class="pill">当前已有款式</span>
            <h2 class="panel-title">${icon("palette")}${escapeHtml(style.name)}</h2>
            <p class="muted">${escapeHtml(style.reason || style.description || "系统将按这款美甲的标签推荐可做的蜀山区门店。")}</p>
            <div class="tag-row" style="margin-top:12px">
              ${(style.tags || []).slice(0, 4).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
            </div>
          </div>
        </div>
      </section>
      <section class="real-store-panel">
        <div>
          <h2 class="panel-title">${icon("map-pin")}推荐可预约门店 Top 3</h2>
          <p class="muted">从后台 10 家合肥蜀山区真实门店池中，按店铺推荐款式和款式标签筛出 3 家。</p>
          ${state.storeLookupStatus ? `<p class="lookup-status">${escapeHtml(state.storeLookupStatus)}</p>` : ""}
        </div>
        <div class="btn-row">
          <button class="btn secondary" type="button" data-action="lookup-real-stores">${icon("refresh-cw")}刷新推荐</button>
        </div>
      </section>
      ${renderRealStoreResults()}
    </main>
  `;
}

function renderManualStoreImport() {
  return `
    <section class="panel">
      <h2 class="panel-title">${icon("log-in")}美团自助登录 / 门店导入</h2>
      <p class="muted">在美团页面里使用你自己的浏览器登录并挑选门店；本系统只保存你主动填写的门店信息，不读取账号、密码、Cookie 或登录页面内容。</p>
      <div class="btn-row" style="margin-top:12px">
        <a class="btn primary" href="https://www.dianping.com/search/keyword/3/0_%E7%BE%8E%E7%94%B2" target="_blank" rel="noreferrer">${icon("external-link")}打开美团/点评搜索</a>
        <a class="btn secondary" href="https://uri.amap.com/search?keyword=%E7%BE%8E%E7%94%B2&src=nail-alpha" target="_blank" rel="noreferrer">${icon("map")}打开地图搜索</a>
      </div>
      <div class="form-grid" style="margin-top:16px">
        <div class="form-row">
          <label>门店名称</label>
          <input class="input" data-field="manual-store-name" placeholder="例如：某某美甲工作室" />
        </div>
        <div class="form-row">
          <label>门店链接</label>
          <input class="input" data-field="manual-store-url" placeholder="粘贴美团/大众点评/地图门店链接" />
        </div>
        <div class="form-row">
          <label>价格 / 地址备注</label>
          <input class="input" data-field="manual-store-note" placeholder="例如：人均 168 / 滨江区某路" />
        </div>
      </div>
      <button class="btn secondary full" type="button" data-action="import-manual-store" style="margin-top:12px">${icon("download")}导入这个门店</button>
    </section>
  `;
}

function renderStoresWaitingForDemand() {
  return `
    <main class="page stores-page">
      <section class="empty-state">
        ${icon("clipboard-list")}
        <strong>AI 生成款还没有需求单</strong>
        <p class="muted">已有 25 个款式会直接推荐门店；AI 生成款属于定制款，需要先发布需求。</p>
        <button class="btn primary" type="button" data-nav="demand">${icon("file-plus-2")}去发布需求</button>
      </section>
    </main>
  `;
}

function renderRealStoreResults() {
  const storesForRender = state.realStores;
  const directBooking = state.storeMode !== "demand" && fixedStyleCanBookDirect();
  if (state.storeLookupLoading) {
    return `
      <section class="panel">
        <div class="empty-state compact">
          ${icon("loader")}
          <strong>${directBooking ? "正在推荐可预约门店" : "正在匹配蜀山门店"}</strong>
          <p class="muted">${directBooking ? "正在按当前款式从合肥蜀山区 10 家真实门店池中筛选 Top 3。" : "正在按需求标签从合肥蜀山区 10 家真实门店池中筛选 Top 3。"}</p>
        </div>
      </section>
    `;
  }
  if (!storesForRender.length) {
    return `
      <section class="panel">
        <div class="empty-state compact">
          ${icon("search")}
          <strong>${directBooking ? "正在等待款式门店推荐" : "尚未推荐蜀山门店"}</strong>
          <p class="muted">${directBooking ? "进入本页后会自动按当前款式推荐 3 家门店，也可以点击上方按钮刷新。" : "点击上方按钮后，后端会基于 10 家真实门店快照和当前需求标签返回推荐。"}</p>
        </div>
      </section>
    `;
  }
  return `
    <section class="store-list real-results">
      ${storesForRender
        .map((store, index) => {
          const detail = storeDisplayDetails(store, index);
          const detailTags = [...detail.detailTags, ...detail.serviceBadges].slice(0, 5);
          return `
            <article class="store-card real${directBooking ? " booking-compact" : ""}">
              ${storeImage(store) ? `<img src="${escapeHtml(storeImage(store))}" alt="${escapeHtml(store.name)}" />` : `<div class="store-photo-placeholder">${icon("store")}</div>`}
              <div>
                <h3>${escapeHtml(store.name)}</h3>
                <div class="store-meta">
                  ${store.distance ? `<span>${icon("map-pin")}${escapeHtml(formatStoreDistance(store.distance))}</span>` : ""}
                  ${detail.price ? `<span>${icon("circle-dollar-sign")}${escapeHtml(formatStorePrice(detail.price))}</span>` : `<span>${icon("circle-dollar-sign")}价格待核对</span>`}
                  ${detail.rating ? `<span>${icon("star")}评分 ${escapeHtml(detail.rating)}</span>` : ""}
                  ${detail.reviewCount ? `<span>${icon("message-circle")}${escapeHtml(detail.reviewCount)}</span>` : ""}
                  ${detail.monthlyOrders ? `<span>${icon("trending-up")}${escapeHtml(detail.monthlyOrders)}</span>` : ""}
                </div>
                <p class="muted">${escapeHtml(store.address || "地址未返回")}</p>
                ${
                  directBooking
                    ? `<p class="store-quick-note">${icon("check-circle")}已按当前款式匹配，可先核对再预约。</p>`
                    : `
                      <div class="store-detail-grid">
                        ${detail.priceRange ? `<span><small>价格区间</small><b>${escapeHtml(detail.priceRange)}</b></span>` : ""}
                        ${detail.openHours ? `<span><small>营业时间</small><b>${escapeHtml(detail.openHours)}</b></span>` : ""}
                        ${detail.avgDuration ? `<span><small>预计耗时</small><b>${escapeHtml(detail.avgDuration)}</b></span>` : ""}
                      </div>
                      ${
                        detail.discount || detail.repeatRate || detail.platformRank
                          ? `<div class="store-mini-line">
                              ${detail.discount ? `<span>${icon("badge-percent")}${escapeHtml(detail.discount)}</span>` : ""}
                              ${detail.repeatRate ? `<span>${icon("rotate-ccw")}${escapeHtml(detail.repeatRate)}</span>` : ""}
                              ${detail.platformRank ? `<span>${icon("award")}${escapeHtml(detail.platformRank)}</span>` : ""}
                            </div>`
                          : ""
                      }
                      ${store.matchReason ? `<p class="muted store-match-reason">${escapeHtml(store.matchReason)}</p>` : ""}
                      ${Array.isArray(store.matchedTags) && store.matchedTags.length ? `<div class="tag-row">${store.matchedTags.slice(0, 5).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
                      ${detailTags.length ? `<div class="store-badge-row">${detailTags.map((tag) => `<span class="store-badge">${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
                    `
                }
              </div>
              <div class="store-actions">
                ${
                  directBooking
                    ? `
                      <button class="btn primary" type="button" data-action="book-store" data-book-store="${escapeHtml(store.id)}">${icon("calendar-check")}预约这家</button>
                    `
                    : `
                      <button class="btn primary" type="button" data-action="request-store-quote" data-book-store="${escapeHtml(store.id)}">${icon("send")}请求商家接单</button>
                      <span class="store-request-note">AI 生成款需商家确认可做后再约</span>
                    `
                }
              </div>
            </article>
          `;
        })
        .join("")}
    </section>
  `;
}

function amapPoiUrl(store) {
  if (!store?.location) return "https://uri.amap.com/search?keyword=%E7%BE%8E%E7%94%B2&src=nail-alpha";
  const [longitude, latitude] = String(store.location).split(",");
  if (!longitude || !latitude) return "https://uri.amap.com/search?keyword=%E7%BE%8E%E7%94%B2&src=nail-alpha";
  return `https://uri.amap.com/marker?position=${encodeURIComponent(`${longitude},${latitude}`)}&name=${encodeURIComponent(store.name || "美甲门店")}&src=nail-alpha`;
}

function storeImage(store) {
  return resolveImageSrc(store?.photo || (Array.isArray(store?.caseImages) ? store.caseImages[0] : "") || "");
}

function formatStoreDistance(distance) {
  const value = String(distance || "").trim();
  if (!value) return "";
  if (/[a-zA-Z米]/.test(value)) return value;
  return `${value}m`;
}

function formatStorePrice(price) {
  const value = String(price || "").trim();
  if (!value) return "";
  if (/元|¥|￥|人均/.test(value)) return value;
  return `¥${value} 人均`;
}

function storeDisplayDetails(store, index = 0) {
  const mock = mockStoreDetails[store?.id] || mockStoreDetailFallbacks[index % mockStoreDetailFallbacks.length] || {};
  const pick = (key) => String(store?.[key] || mock[key] || "").trim();
  const pickArray = (key) => {
    const value = Array.isArray(store?.[key]) && store[key].length ? store[key] : mock[key];
    return Array.isArray(value) ? value.map((item) => String(item).trim()).filter(Boolean) : [];
  };
  return {
    rating: pick("rating"),
    price: pick("price"),
    priceRange: pick("priceRange"),
    reviewCount: pick("reviewCount"),
    monthlyOrders: pick("monthlyOrders"),
    openHours: pick("openHours"),
    avgDuration: pick("avgDuration"),
    repeatRate: pick("repeatRate"),
    platformRank: pick("platformRank"),
    discount: pick("discount"),
    serviceBadges: pickArray("serviceBadges"),
    detailTags: pickArray("detailTags"),
  };
}

function renderMerchant() {
  const trends = currentXhsTrends();
  const batch = currentXhsTrendBatch();
  const styleTrends = currentXhsStyleTrends();
  const upStyleCount = styleTrends.filter((item) => item.statusType === "up").length;
  const inSiteTrends = merchantInSiteTrends();
  const visibleInSiteTrends = inSiteTrends.slice(0, 4);
  const visibleXhsTrends = trends.slice(0, 2);
  const bookingOrders = state.merchantOrders;
  const localDemandOrders = state.myDemands.map(sharedDemandToOrder);
  const sharedDemandOrders = state.frontDemands.map(sharedDemandToOrder);
  const demandOrders = [...bookingOrders, ...localDemandOrders, ...sharedDemandOrders];
  const visibleDemandOrders = demandOrders.slice(0, 1);
  const hiddenDemandOrderCount = Math.max(demandOrders.length - visibleDemandOrders.length, 0);
  const orderCount = state.merchantOrders.length;
  const waitingOrderCount = demandOrders.filter((order) => order.status === "待商家确认").length;
  const coreMetrics = {
    newDemand: Math.max(state.publishedDemandCount, state.myDemands.length + state.frontDemands.length, 18),
    waiting: Math.max(waitingOrderCount, 6),
    today: Math.max(orderCount, 9),
    upStyle: Math.max(upStyleCount, 4),
  };
  return `
    <main class="page">
      <section class="layout-merchant">
        <aside class="panel merchant-site-panel">
          <h2 class="panel-title">${icon("bar-chart-3")}站内趋势</h2>
          <div class="trend-list">
            ${visibleInSiteTrends
              .map(
                ([img, title, value]) => `
                  <button class="trend-item" type="button" data-action="open-modal" data-modal="trendDetail">
                    <img src="${assets(img)}" alt="${title}" />
                    <span><strong>${title}</strong><small class="muted">站内行为已验证</small></span>
                    <span class="trend-up">${value}</span>
                  </button>
                `,
              )
              .join("")}
          </div>
          <button class="btn soft full trend-toggle" type="button" data-action="open-modal" data-modal="merchantInsiteTrends">
            ${icon("panel-top-open")}展开更多站内趋势
          </button>
        </aside>

        <aside class="panel merchant-outside-panel">
          <div class="xhs-trend-title">
            <h2 class="panel-title">${icon("activity")}站外趋势</h2>
            ${renderXhsSyncPanel()}
          </div>
          ${renderTrendMovementChart(styleTrends)}
          <div class="trend-list">
            ${visibleXhsTrends
              .map(
                (item) => `
                  <button class="trend-item" type="button" data-action="open-modal" data-modal="trendDetail" data-trend="${item.id}">
                    <img src="${assets(item.img)}" alt="${item.label}" />
                    <span>
                      <strong>${item.merchantTitle}</strong>
                      <small class="muted">${item.signal} · ${item.tags.join(" / ")}</small>
                    </span>
                    <span class="trend-up">${formatCompactNumber(item.likes)}</span>
                  </button>
                `,
              )
              .join("")}
          </div>
          <div class="trend-source">
            <span>${icon("book-open")}小红书 ${batch.recentDays} 天热榜</span>
            <span>入选 ${batch.count} 款</span>
            <span>采集 ${formatGeneratedDate(batch.generatedAt)}</span>
          </div>
          <div class="tag-row">
            ${batch.hotKeywords.map((keyword) => `<span class="tag">${keyword}</span>`).join("")}
          </div>
          <button class="btn soft full trend-toggle" type="button" data-action="open-modal" data-modal="merchantXhsTrends">
            ${icon("panel-top-open")}展开更多站外趋势
          </button>
        </aside>

        <section class="panel merchant-core-panel">
          <h2 class="panel-title">${icon("layout-dashboard")}核心数据</h2>
          <div class="merchant-core-grid">
            ${[
              ["clipboard-plus", "新增需求", String(coreMetrics.newDemand)],
              ["tag", "待确认", String(coreMetrics.waiting)],
              ["calendar-check", "今日预约", String(coreMetrics.today)],
              ["shopping-bag", "建议上新", String(coreMetrics.upStyle)],
            ]
              .map(([iconName, label, value]) => `<div class="metric">${icon(iconName)}<div><span>${label}</span><b>${value}</b></div></div>`)
              .join("")}
          </div>
        </section>

        <section class="panel merchant-demand-panel">
          <h2 class="panel-title">${icon("inbox")}需求接单池</h2>
          ${
            state.merchantOrders.length
              ? `<p class="muted merchant-live-note">${icon("radio")}已同步 ${state.merchantOrders.length} 个门店预约订单</p>`
              : ""
          }
          ${
            demandOrders.length
              ? `
                <div class="history-list">
                  ${visibleDemandOrders
                    .map(
                      (order, index) => `
                        <article class="quote-card live-order">
                          <img src="${recordImageSrc(order.img)}" alt="${escapeHtml(order.title)}" />
                          <div>
                            <h3>${order.title} <span class="tag gold">新预约</span></h3>
                            <div class="tag-row">
                              ${order.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
                            </div>
                            <p class="muted">Nail BTI：${order.bti} · ${order.heat}</p>
                            <p class="muted">门店：${order.store} · 时间：${order.slot} · ${order.price}</p>
                          </div>
                          <div class="quote-actions">
                            <span class="tag sage">${order.status}</span>
                            <button class="btn ${index === 0 ? "primary" : "secondary"}" type="button" data-action="open-modal" data-modal="quoteOrder">${icon("receipt")}确认接单</button>
                            <button class="btn secondary" type="button" data-action="open-modal" data-modal="uploadCase">${icon("image-plus")}上传案例</button>
                            <button class="btn soft" type="button" data-action="open-modal" data-modal="recommendChange">${icon("lightbulb")}推荐改款</button>
                          </div>
                        </article>
                      `,
                    )
                    .join("")}
                  ${
                    hiddenDemandOrderCount
                      ? `
                        <button class="btn soft full trend-toggle" type="button" data-action="open-modal" data-modal="merchantOrders">
                          ${icon("panel-top-open")}查看全部 ${demandOrders.length} 个预约
                        </button>
                      `
                      : ""
                  }
                </div>
              `
              : `
                <div class="empty-state">
                  ${icon("inbox")}
                  <strong>暂无预约订单</strong>
                  <p class="muted">用户在门店预约确认后，会实时同步到这里。</p>
                </div>
              `
          }
        </section>

        <aside class="panel merchant-agent-panel">
          <h2 class="panel-title">${icon("bot")}智能运营 Agent</h2>
          <div class="agent-list">
            ${merchantAgentAdvice()
              .map(([iconName, title, suggestion]) => {
                const text = `${title}：${suggestion}`;
                return `<div class="agent-row">${icon(iconName)}<span><strong>${escapeHtml(title)}</strong><small>${escapeHtml(suggestion)}</small></span><button class="btn icon-only" type="button" data-action="toast" data-toast="${escapeHtml(text)}">${icon("copy")}</button></div>`;
              })
              .join("")}
          </div>
          <hr class="divider" />
          <div class="btn-row">
            <button class="btn primary" type="button" data-action="generate-operation-plan">${icon("sparkles")}生成运营方案</button>
            <button class="btn secondary" type="button" data-action="open-modal" data-modal="launchStyle">${icon("upload")}一键上架</button>
            <button class="btn soft" type="button" data-action="open-modal" data-modal="pushConfirm">${icon("send")}推送目标用户</button>
          </div>
        </aside>
      </section>
    </main>
  `;
}

function renderXhsSyncPanel() {
  const sync = state.xhsSync;
  const isSyncing = sync.status === "syncing";
  const statusLabel = {
    idle: "待更新",
    syncing: "爬取中",
    done: "已同步",
    error: "失败",
  }[sync.status] || "待更新";
  const latestLog = sync.logs && sync.logs.length ? sync.logs[sync.logs.length - 1] : sync.step;

  return `
    <div class="xhs-sync-panel">
      <button class="btn soft xhs-sync-button" type="button" data-action="start-xhs-sync" ${isSyncing ? "disabled" : ""} title="${sync.step}">
        ${icon(isSyncing ? "loader-circle" : "refresh-cw")}${isSyncing ? "同步中" : "更新"}
      </button>
      <div class="xhs-sync-progress" aria-label="同步进度" title="${sync.step}">
        <span style="width:${sync.progress}%"></span>
      </div>
      <div class="xhs-sync-popover ${sync.status}" title="${latestLog}">
        <div>
          <strong>${statusLabel}</strong>
          <span>${Math.round(sync.progress || 0)}%</span>
        </div>
        <p>${escapeHtml(sync.step)}</p>
      </div>
    </div>
  `;
}

function merchantInSiteTrends() {
  return [
    ["style-ice-cat.jpg", "今日上涨款：冰透猫眼", "+38%"],
    ["style-milktea.jpg", "稳定高转化：奶茶裸粉", "稳"],
    ["style-glitter.jpg", "高试戴低预约：多巴胺渐变", "需优化"],
    ["style-pearl.jpg", "本地供给缺口：轻法式", "机会"],
  ];
}

function renderTrendMovementChart(styleTrends = currentXhsStyleTrends(), limit = 3) {
  const visibleStyles = styleTrends.slice(0, limit);
  const maxGrowth = Math.max(...visibleStyles.map((item) => Math.max(item.growth, 0)), 1);
  return `
    <div class="trend-movement">
      <div class="trend-movement-head">
        <strong>${icon("activity")}趋势热度</strong>
      </div>
      <div class="trend-bars">
        ${visibleStyles
          .map((item) => {
            const growthWidth = item.statusType === "up" ? Math.max(12, Math.round((Math.max(item.growth, 0) / maxGrowth) * 100)) : 16;
            return `
              <button class="trend-bar-row trend-heat-row" type="button" data-action="toast" data-toast="${item.style}：${item.status}">
                <span class="trend-bar-label">${item.style}</span>
                <span class="trend-bar-track" aria-hidden="true">
                  <span class="trend-bar-fill ${item.statusType}" style="width:${growthWidth}%"></span>
                </span>
                <span class="trend-status ${item.statusType}">${item.status}</span>
              </button>
            `;
          })
          .join("")}
      </div>
    </div>
  `;
}

function merchantAgentAdvice() {
  const trends = currentXhsTrends();
  const latestOrder = state.merchantOrders[0];
  const leadTrend = trends[0];
  const supportTrend = trends.find((trend) => trend.id !== leadTrend.id && !trend.tags.some((tag) => leadTrend.tags.includes(tag))) || trends[1];
  const trendTags = [...new Set([...(leadTrend.tags || []), ...(supportTrend.tags || [])])];
  const isDailyTrend = trendTags.some((tag) => ["低饱和", "通勤", "显白", "淡人", "淡粉"].includes(tag));
  const isPhotoTrend = trendTags.some((tag) => ["多巴胺", "彩色", "夏日", "冰蓝"].includes(tag));

  const takeAdvice = latestOrder
    ? `优先确认 ${state.merchantOrders.length} 个预约订单，先跟进${latestOrder.title}`
    : state.publishedDemandCount > 0
      ? `跟进 ${state.publishedDemandCount} 个需求榜用户，主推${leadTrend.label}`
      : `暂无新订单，先准备${leadTrend.label}趋势款案例`;

  const targetAdvice = latestOrder
    ? `偏好${latestOrder.tags.join(" / ")}的相似用户`
    : isDailyTrend
      ? "偏好清透显白款的通勤用户"
      : isPhotoTrend
        ? "近期有拍照、度假场景的年轻用户"
        : "收藏过热门趋势款的高意向用户";

  const prepAdvice = latestOrder
    ? `预留${latestOrder.slot}档期，并备好${latestOrder.tags.slice(0, 2).join("、")}物料`
    : state.publishedDemandCount > 0
      ? `补齐${leadTrend.label}报价模板和相似案例图`
      : `上新${leadTrend.label}封面图，搭配${supportTrend.label}做组合推荐`;

  return [
    ["gift", "今天上什么", `${leadTrend.label} / ${supportTrend.label}`],
    ["file-text", "今天接什么", takeAdvice],
    ["user-round-check", "今天推给谁", targetAdvice],
    ["calendar-plus", "今天怎么准备", prepAdvice],
  ];
}

function renderMine() {
  if (state.mineDetail) return renderMineDetail();
  const profile = state.profile;
  const level = profile.level;
  const levelProgress = Math.min(100, Math.round((level.points / level.nextPoints) * 100));
  return `
    <main class="page mine-page">
      <section class="panel profile-card">
        <div class="profile-avatar"><img src="${profile.avatar}" alt="用户头像" /></div>
        <div>
          <h2 class="panel-title" style="margin-bottom:10px">${escapeHtml(profile.nickname)}</h2>
          <p class="profile-signature">${escapeHtml(profile.signature)}</p>
          <p class="muted">最近一次 Nail BTI</p>
          <span class="pill">奶茶通勤系</span>
        </div>
        <button class="level-card" type="button" data-action="open-modal" data-modal="levelGrowth" aria-label="查看等级成长">
          <div class="level-card-head">
            <span>LV.${level.current}</span>
            <strong>${level.name}</strong>
          </div>
          <div class="level-progress" aria-label="等级经验进度">
            <span style="width:${levelProgress}%"></span>
          </div>
          <div class="level-meta">
            <span>${level.points}/${level.nextPoints} 成长值</span>
            <b>距 LV.${level.current + 1} 还差 ${level.nextPoints - level.points}</b>
          </div>
          <p>${level.benefit}</p>
          <small>${icon("chevron-right")}查看等级成长</small>
        </button>
        <div class="profile-actions">
          <button class="btn secondary" type="button" data-action="open-modal" data-modal="profileEdit">${icon("user-pen")}编辑资料</button>
          <button class="btn soft" type="button" data-nav="analysis">${icon("arrow-right")}查看分析</button>
        </div>
      </section>
      <div style="height:26px"></div>
      <section>
        <h2 class="panel-title">${icon("history")}历史记录区</h2>
        <div class="history-list">
          ${[
            ["bti", "radar", "我的 Nail BTI", "查看历史 BTI 结果"],
            ["tryon", "hand", "我的试戴记录", "查看历史试戴款式"],
            ["demand", "file-text", "我的需求发布", "查看已发布需求和商家报价"],
            ["appointment", "calendar-check", "我的预约记录", "查看门店预约和核销信息"],
            ["share", "share-2", "我的分享记录", "查看分享过的 BTI 卡片和试戴结果"],
          ]
            .map(
              ([detail, iconName, title, desc]) => `
                <button class="history-row" type="button" data-mine-detail="${detail}">
                  ${icon(iconName)}
                  <strong>${title}</strong>
                  <span class="muted">${desc}</span>
                  ${icon("chevron-right")}
                </button>
              `,
            )
            .join("")}
        </div>
      </section>
    </main>
  `;
}

function mineDetailConfig() {
  const appointments = state.merchantOrders.map((order) => ({
    img: order.img,
    title: order.title,
    meta: `${order.store} · ${order.slot}`,
    desc: `${order.status} · ${order.price}`,
    tags: order.tags,
  }));
  const configs = {
    bti: {
      iconName: "radar",
      title: "我的 Nail BTI",
      subtitle: "历史手型与风格分析记录。",
      empty: "暂无更多 BTI 历史记录",
      records: [
        {
          img: "persona.jpg",
          title: "奶茶通勤系",
          meta: "最近一次分析 · 显白指数 92",
          desc: "适合低饱和、显白、耐看的美甲风格。",
          tags: ["低饱和", "显白", "通勤"],
        },
      ],
    },
    tryon: {
      iconName: "hand",
      title: "我的试戴记录",
      subtitle: "保存过的 AI 试戴款式。",
      empty: "暂无试戴记录",
      records: [
        {
          img: "style-ice-cat.jpg",
          title: "冰透猫眼轻法式",
          meta: "AI 试戴 · 最近保存",
          desc: "显白、不挑手，适合短甲和通勤场景。",
          tags: ["冰透", "猫眼", "轻法式"],
        },
        {
          img: "style-milktea.jpg",
          title: "奶茶裸粉",
          meta: "AI 推荐 · 高适配",
          desc: "低饱和、耐看，适合日常约会和办公室。",
          tags: ["奶茶", "裸粉", "低饱和"],
        },
      ],
    },
    demand: {
      iconName: "file-text",
      title: "我的需求发布",
      subtitle: "你发布到需求榜的记录。",
      empty: "暂无发布需求",
      records:
        state.publishedDemandCount > 0
          ? Array.from({ length: state.publishedDemandCount }, (_, index) => ({
              img: `demand-ref-${Math.min(index + 1, 4)}.jpg`,
              title: "冰透猫眼轻法式需求",
              meta: index === 0 ? "刚刚发布 · 等待商家报价" : "历史发布 · 报价中",
              desc: "希望显白、日常、不厚重，附近能做类似效果的商家可以接单。",
              tags: ["冰透", "猫眼", "显白"],
            }))
          : [],
    },
    appointment: {
      iconName: "calendar-check",
      title: "我的预约记录",
      subtitle: "门店预约和核销信息。",
      empty: "暂无预约记录",
      records: appointments,
    },
    share: {
      iconName: "share-2",
      title: "我的分享记录",
      subtitle: "分享过的 BTI 卡片、试戴结果和好友同行卡。",
      empty: "暂无分享记录",
      records: [
        {
          img: "persona.jpg",
          title: "Nail BTI 分享卡片",
          meta: "最近分享 · 奶茶通勤系",
          desc: "已生成适合分享给好友的 BTI 风格卡片。",
          tags: ["BTI", "分享卡", "奶茶通勤"],
        },
      ],
    },
  };
  const normalizeRecord = (item, fallbackImg) => ({
    img: item.img || item.image || item.referenceImage || fallbackImg,
    title: item.title || item.styleName || "美甲记录",
    meta: item.meta || item.status || item.budgetRange || item.availableTime || "",
    desc: item.desc || item.demandText || item.description || "",
    tags: Array.isArray(item.tags) && item.tags.length ? item.tags : Array.isArray(item.styleTags) ? item.styleTags : [],
  });
  if (state.btiResult) {
    configs.bti.records = [
      {
        img: state.btiResult.avatarUrl || "persona.jpg",
        title: state.btiResult.chineseName || state.btiResult.archetype || "Nail BTI",
        meta: `最近一次分析 · ${state.btiResult.code || ""}`.trim(),
        desc: state.btiResult.styleSummary || state.btiResult.comment || "已完成手型与风格分析。",
        tags: [state.btiResult.archetype, state.btiResult.code].filter(Boolean),
      },
    ];
  }
  if (state.tryonImage) {
    const style = activeStyle();
    configs.tryon.records = [
      {
        img: state.tryonImage,
        title: style.name || "AI 试戴记录",
        meta: "AI 试戴 · 当前保存",
        desc: style.reason || style.description || "已生成当前款式试戴图。",
        tags: style.tags || [],
      },
      ...configs.tryon.records,
    ];
  }
  if (state.frontBtiRecords.length) {
    configs.bti.records = state.frontBtiRecords.map((item) => normalizeRecord(item, "persona.jpg"));
  }
  if (state.frontTryonRecords.length) {
    configs.tryon.records = state.frontTryonRecords.map((item) => normalizeRecord(item, "style-ice-cat.jpg"));
  }
  if (state.myDemands.length || state.frontDemands.length) {
    configs.demand.records = [...state.myDemands, ...state.frontDemands].map((item, index) =>
      normalizeRecord(item, `demand-ref-${Math.min(index + 1, 4)}.jpg`),
    );
  }
  if (state.frontAppointments.length) {
    const frontAppointmentRecords = state.frontAppointments.map((item) =>
      normalizeRecord(
        {
          ...item,
          img: item.styleImage,
          title: item.styleName || "门店预约",
          meta: `${item.storeName || "已预约门店"} · ${item.slot || ""}`,
          desc: `${item.code || ""} ${item.status || ""}`.trim(),
          tags: item.styleTags,
        },
        "style-ice-cat.jpg",
      ),
    );
    configs.appointment.records = [...appointments, ...frontAppointmentRecords];
  }
  if (state.friendInviteRecords.length) {
    const inviteRecords = state.friendInviteRecords.map((item) =>
      normalizeRecord(
        {
          ...item,
          img: item.styleImage,
          title: item.title || "邀请好友同行 9折",
          meta: `${item.storeName || "预约门店"} · ${item.slot || ""}`,
          desc: `${item.discount || "9折"} · 同行码 ${item.code || ""}`,
          tags: ["同行优惠", item.discount || "9折", "分享卡"],
        },
        "style-pearl.jpg",
      ),
    );
    configs.share.records = [...inviteRecords, ...configs.share.records];
  }
  if (state.frontShareRecords.length) {
    configs.share.records = [...configs.share.records, ...state.frontShareRecords.map((item) => normalizeRecord(item, "persona.jpg"))];
  }
  return configs[state.mineDetail] || configs.bti;
}

function renderMineDetail() {
  const detail = mineDetailConfig();
  return `
    <main class="page">
      <div class="mine-detail-head">
        <button class="btn secondary" type="button" data-action="back-mine">${icon("arrow-left")}返回我的</button>
        <div>
          <h1 class="page-title">${icon(detail.iconName)}${detail.title}</h1>
          <p class="page-subtitle">${detail.subtitle}</p>
        </div>
      </div>
      <section class="panel">
        ${
          detail.records.length
            ? `
              <div class="history-list">
                ${detail.records
                  .map(
                    (item) => `
                      <article class="quote-card mine-record-card">
                        <img src="${recordImageSrc(item.img)}" alt="${escapeHtml(item.title)}" />
                        <div>
                          <h3>${item.title}</h3>
                          <p class="muted">${item.meta}</p>
                          <p class="preview-text">${item.desc}</p>
                          <div class="tag-row">${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
                        </div>
                      </article>
                    `,
                  )
                  .join("")}
              </div>
            `
            : `
              <div class="empty-state">
                ${icon(detail.iconName)}
                <strong>${detail.empty}</strong>
                <p class="muted">后续产生的新记录会自动显示在这里。</p>
              </div>
            `
        }
      </section>
    </main>
  `;
}

function renderModal() {
  if (!state.modal) return "";
  const modal = {
    analyzing: modalAnalyzing,
    shareBti: modalShareBti,
    importTryon: modalImportTryon,
    parseLink: modalParseLink,
    publishSuccess: modalPublishSuccess,
    quoteDetail: modalQuoteDetail,
    bookingTime: modalBookingTime,
    friendInvite: modalFriendInvite,
    appointmentSuccess: modalAppointmentSuccess,
    profileEdit: modalProfileEdit,
    levelGrowth: modalLevelGrowth,
    trendDetail: modalTrendDetail,
    trendImage: modalTrendImage,
    merchantInsiteTrends: modalMerchantInsiteTrends,
    merchantXhsTrends: modalMerchantXhsTrends,
    merchantOrders: modalMerchantOrders,
    quoteOrder: modalQuoteOrder,
    uploadCase: modalUploadCase,
    recommendChange: modalRecommendChange,
    launchStyle: modalLaunchStyle,
    pushConfirm: modalPushConfirm,
  }[state.modal];
  return modal ? `<div class="modal-backdrop" role="dialog" aria-modal="true">${modal()}</div>` : "";
}

function modalFrame(title, body, footer = "", wide = false) {
  return `
    <section class="modal-card ${wide ? "wide" : ""}">
      <button class="btn icon-only close-x" type="button" data-action="close-modal" aria-label="关闭">${icon("x")}</button>
      <h2 class="modal-title">${icon("sparkle")}${title}</h2>
      <div class="modal-body">${body}</div>
      ${footer ? `<div class="modal-footer">${footer}</div>` : ""}
    </section>
  `;
}

function modalAnalyzing() {
  return modalFrame(
    "AI 正在分析中...",
    `
      <div class="scan-panel">
        ${["识别手部轮廓", "识别肤色冷暖", "识别甲床比例", "生成 Nail BTI"]
          .map((text) => `<div class="scan-line">${icon("check-circle")}${text}</div>`)
          .join("")}
        <div class="progress" aria-label="分析进度"><span></span></div>
      </div>
      <p class="muted" style="text-align:center">预计还需 8 秒</p>
    `,
  );
}

function modalShareBti() {
  const bti = state.btiResult;
  const recommendation = bti?.recommendation || buildRecommendation(state.handAnalysis);
  const personaName = bti?.chineseName || "奶茶通勤系";
  const personaCode = bti?.archetype || "DREAMER";
  const summary = bti?.styleSummary || "适合低饱和、显白、耐看的美甲风格。";
  const roast = bti?.comment || bti?.roast || "收藏夹很满，行动力很玄，但审美确实在线。";
  const mainStyle = recommendation.mainStyle || nailStyles[0];
  const avoidText = (recommendation.avoidStyles || [])
    .map((item) => item.name || item)
    .slice(0, 3)
    .join(" / ");
  const metrics = [
    ["显白指数", metricValue("white_axis", 92)],
    ["修手指数", metricValue("shape_axis", 87)],
    ["承载指数", metricValue("design_axis", 84)],
    ["气质指数", metricValue("vibe_axis", 90)],
  ];
  return `
    <section class="modal-card share-modal-card share-poster-modal">
      <button class="btn icon-only close-x" type="button" data-action="close-modal" aria-label="关闭">${icon("x")}</button>
      <div class="modal-body">
      <div class="share-card bti-share-export-card bti-share-poster">
        <div class="share-brand">甲遇 NailMuse</div>
        <h2 class="share-poster-title">我的 Nail BTI</h2>
        <span class="share-type-pill">${escapeHtml(personaCode)} · ${escapeHtml(bti?.code || "WNLS")}</span>
        <h3 class="bti-name">${escapeHtml(personaName)}</h3>
        <p class="share-hook">AI 说我不是纠结，<br />是下一次一定换风格体。</p>
        <p class="muted">${escapeHtml(summary)}</p>
        <div class="share-roast">
          <strong>“ ${escapeHtml(roast)} ”</strong>
        </div>
        <div class="share-scores">
          ${metrics.map(([label, value]) => `<span><small>${escapeHtml(label)}</small><b>${value}</b></span>`).join("")}
        </div>
        <div class="share-poster-foot">
          <strong>本命款：${escapeHtml(mainStyle.name || "冰透猫眼轻法式")}</strong>
          <span>避雷：${escapeHtml(avoidText || "荧光色 / 厚重雕花")}</span>
          <em>你测出来是什么？发我看看，顺便帮我决定下一款。</em>
        </div>
      </div>
      </div>
      <div class="modal-footer">
      <button class="btn secondary" type="button" data-action="download-bti-card">${icon("download")}保存图片</button>
      <button class="btn secondary" type="button" data-action="toast" data-toast="分享链接已复制">${icon("copy")}复制链接</button>
      <button class="btn primary" type="button" data-action="toast" data-toast="已打开分享面板">${icon("share-2")}分享给好友</button>
      </div>
    </section>
  `;
}

function modalImportTryon() {
  const style = activeStyle();
  const hasTryonImage = Boolean(state.tryonImage);
  const directBooking = fixedStyleCanBookDirect();
  return modalFrame(
    directBooking ? "已有款直接预约" : "导入当前试戴结果",
    `
      <div class="summary-box">
        ${icon(directBooking ? "calendar-check" : "wand-sparkles")}
        <div>
          <strong>当前试戴款：${escapeHtml(style.name)}</strong>
          <p class="muted">${
            directBooking
              ? "这是平台已有款式，试戴后无需发布需求，可直接匹配门店预约。"
              : hasTryonImage
                ? "是否将该 AI 生成款试戴结果图和说明带入需求发布？"
                : "请先生成 AI 试戴结果图，再导入需求发布。"
          }</p>
        </div>
      </div>
    `,
    `
      <button class="btn secondary" type="button" data-action="close-modal">取消</button>
      <button class="btn primary" type="button" data-action="confirm-import">${icon(directBooking ? "map-pin" : "download")}${directBooking ? "直接预约门店" : "确认导入"}</button>
    `,
  );
}

function modalParseLink() {
  const mock = mockDemandReferences.link;
  return modalFrame(
    "粘贴小红书链接",
    `
      <div class="form-grid">
        <div class="form-row">
          <label>输入链接</label>
          <input class="input" value="https://www.xiaohongshu.com/explore/nail-alpha" />
        </div>
        <div class="summary-box">
          <img class="summary-thumb" src="${resolveImageSrc(mock.image)}" alt="${escapeHtml(mock.name)}" />
          <div>
            <strong>默认解析结果：${escapeHtml(mock.name)}</strong>
            <p class="muted">${escapeHtml(mock.description)}</p>
          </div>
        </div>
        <p class="muted">系统将自动识别图片、款式标签和参考描述。</p>
      </div>
    `,
    `
      <button class="btn secondary" type="button" data-action="close-modal">取消</button>
      <button class="btn primary" type="button" data-action="parse-link">${icon("search")}开始解析</button>
    `,
  );
}

function modalPublishSuccess() {
  return modalFrame(
    "发布成功",
    `<p class="preview-text">你的需求已进入后台，系统已按款式标签匹配合肥蜀山区门店。</p>`,
    `
      <button class="btn secondary" type="button" data-action="view-my-demand">${icon("list-checks")}查看我的需求</button>
      <button class="btn secondary" type="button" data-action="continue-demand">${icon("file-plus-2")}继续发布</button>
      <button class="btn primary" type="button" data-action="go-real-stores">${icon("map-pin")}查看匹配门店</button>
    `,
  );
}

function modalQuoteDetail() {
  return modalFrame(
    "真实门店匹配",
    `
      <div class="summary-box">
        ${icon("store")}
        <div>
          <strong>报价不再使用本地示例数据</strong>
          <p class="muted">请进入门店预约页，后端会从合肥蜀山区 10 家真实门店池中推荐 3 家。</p>
        </div>
      </div>
    `,
    `
      <button class="btn secondary" type="button" data-action="close-modal">关闭</button>
      <button class="btn primary" type="button" data-action="go-real-stores">${icon("map-pin")}去匹配真实门店</button>
    `,
  );
}

function bookingDateOptions() {
  const today = new Date();
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  return [0, 1, 2, 3].map((offset) => {
    const date = new Date(today);
    date.setDate(today.getDate() + offset);
    const id = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const label = offset === 0 ? "今天" : offset === 1 ? "明天" : weekdays[date.getDay()];
    return {
      id,
      label,
      sub: `${date.getMonth() + 1}/${date.getDate()}`,
    };
  });
}

function bookingTimeOptions() {
  return ["10:30", "13:30", "15:00", "16:30", "18:30", "20:00"];
}

function selectedBookingDate() {
  const options = bookingDateOptions();
  return options.find((item) => item.id === state.bookingDate) || options[0];
}

function selectedBookingTime() {
  const options = bookingTimeOptions();
  return options.includes(state.bookingTime) ? state.bookingTime : options[0];
}

function makeAppointmentCode(store, style) {
  const source = `${store?.id || "store"}-${style?.id || "style"}-${Date.now()}`;
  let hash = 0;
  for (let index = 0; index < source.length; index += 1) {
    hash = (hash * 31 + source.charCodeAt(index)) >>> 0;
  }
  return `NAIL-${String(hash).slice(0, 6).padStart(6, "0")}`;
}

function makeFriendInviteCode(store, style) {
  const source = `friend-${store?.id || "store"}-${style?.id || "style"}-${selectedBookingDate().id}-${selectedBookingTime()}-${Date.now()}`;
  let hash = 0;
  for (let index = 0; index < source.length; index += 1) {
    hash = (hash * 33 + source.charCodeAt(index)) >>> 0;
  }
  return `MUSE-${String(hash).slice(0, 6).padStart(6, "0")}`;
}

function buildFriendInvite() {
  const store = activeStore();
  const style = activeStyle();
  const date = selectedBookingDate();
  const time = selectedBookingTime();
  return {
    code: state.friendInvite?.code || makeFriendInviteCode(store, style),
    storeId: store?.id || "",
    storeName: store?.name || "预约门店",
    styleId: style?.id || "",
    styleName: style?.name || "美甲款式",
    styleImage: style?.image || style?.img || "",
    dateId: date.id,
    dateLabel: date.label,
    dateSub: date.sub,
    time,
    slot: `${date.label} ${date.sub} ${time}`,
    discount: "9折",
    title: "邀请好友同行，立享9折",
    desc: "把这张卡发给好友，一起到店做同款或同店服务即可享同行优惠。",
  };
}

function generateFriendInvite() {
  if (!fixedStyleCanBookDirect()) {
    showToast("AI 生成款需要先请求商家接单");
    return;
  }
  const invite = buildFriendInvite();
  state.friendInvite = invite;
  state.friendInviteRecords = [invite, ...state.friendInviteRecords.filter((item) => item.code !== invite.code)].slice(0, 8);
  if (state.appointment) {
    state.appointment.friendInvite = invite;
  }
  state.modal = "friendInvite";
  render();
}

function modalBookingTime() {
  const store = activeStore();
  const detail = storeDisplayDetails(store);
  const style = activeStyle();
  const dates = bookingDateOptions();
  const times = bookingTimeOptions();
  const currentDate = selectedBookingDate();
  const currentTime = selectedBookingTime();
  return modalFrame(
    "选择预约时间",
    `
      <div class="booking-card">
        <div class="booking-head">
          ${storeImage(store) ? `<img src="${escapeHtml(storeImage(store))}" alt="${escapeHtml(store.name)}" />` : `<div class="store-photo-placeholder">${icon("store")}</div>`}
          <div>
            <span class="pill">预约门店</span>
            <h3>${escapeHtml(store.name)}</h3>
            <p class="muted">${escapeHtml(style.name)} · ${escapeHtml(store.address || "地址以门店页面为准")}</p>
            <div class="booking-store-meta">
              ${detail.rating ? `<span>${icon("star")}评分 ${escapeHtml(detail.rating)}</span>` : ""}
              ${detail.price ? `<span>${icon("circle-dollar-sign")}${escapeHtml(formatStorePrice(detail.price))}</span>` : ""}
              ${detail.priceRange ? `<span>${icon("wallet-cards")}${escapeHtml(detail.priceRange)}</span>` : ""}
              ${detail.openHours ? `<span>${icon("clock")}${escapeHtml(detail.openHours)}</span>` : ""}
            </div>
          </div>
        </div>
        <hr class="divider" />
        <p><strong>选择日期</strong></p>
        <div class="booking-date-grid">
          ${dates
            .map(
              (item) => `
                <button class="booking-option ${item.id === currentDate.id ? "active" : ""}" type="button" data-action="select-booking-date" data-booking-date="${escapeHtml(item.id)}" aria-pressed="${item.id === currentDate.id ? "true" : "false"}">
                  <strong>${escapeHtml(item.label)}</strong>
                  <span>${escapeHtml(item.sub)}</span>
                  ${item.id === currentDate.id ? `<em>已选</em>` : ""}
                </button>
              `,
            )
            .join("")}
        </div>
        <p><strong>选择时间</strong></p>
        <div class="booking-time-grid">
          ${times
            .map(
              (time) => `
                <button class="booking-option ${time === currentTime ? "active" : ""}" type="button" data-action="select-booking-time" data-booking-time="${escapeHtml(time)}" aria-pressed="${time === currentTime ? "true" : "false"}">
                  <strong>${escapeHtml(time)}</strong>
                  ${time === currentTime ? `<em>已选</em>` : ""}
                </button>
              `,
            )
            .join("")}
        </div>
        <div class="invite-offer">
          <div>
            ${icon("users")}
            <span>邀请好友同行</span>
            <strong>立享9折</strong>
            <p>生成分享卡发给好友，一起来做美甲更划算。</p>
          </div>
          <button class="btn secondary" type="button" data-action="generate-friend-invite">${icon("share-2")}生成分享卡</button>
        </div>
        <div class="booking-summary">
          ${icon("calendar-check")}
          <span>${escapeHtml(currentDate.label)} ${escapeHtml(currentDate.sub)} · ${escapeHtml(currentTime)}</span>
        </div>
      </div>
    `,
    `
      <button class="btn secondary" type="button" data-action="close-modal">取消</button>
      <button class="btn primary" type="button" data-action="confirm-booking">${icon("check")}确认预约</button>
    `,
  );
}

function modalFriendInvite() {
  const invite = state.friendInvite || buildFriendInvite();
  return modalFrame(
    "邀请好友同行，立享9折",
    `
      <div class="friend-share-card">
        <div class="friend-share-top">
          <span class="pill">同行优惠</span>
          <strong>${escapeHtml(invite.discount)}</strong>
        </div>
        <div class="friend-share-main">
          <img src="${resolveImageSrc(invite.styleImage, assets("style-pearl.jpg"))}" alt="${escapeHtml(invite.styleName)}" />
          <div>
            <h3>${escapeHtml(invite.title)}</h3>
            <p>${escapeHtml(invite.desc)}</p>
            <div class="friend-share-meta">
              <span>${icon("store")}${escapeHtml(invite.storeName)}</span>
              <span>${icon("calendar-check")}${escapeHtml(invite.slot)}</span>
              <span>${icon("sparkles")}${escapeHtml(invite.styleName)}</span>
            </div>
          </div>
        </div>
        <div class="friend-share-code">
          <span>好友到店出示同行码</span>
          <strong>${escapeHtml(invite.code)}</strong>
        </div>
      </div>
      <p class="preview-text">邀请好友一起到店做美甲，双方可享同行 9 折权益；实际核销以门店确认结果为准。</p>
    `,
    `
      <button class="btn secondary" type="button" data-action="toast" data-toast="同行邀请卡已保存">${icon("download")}保存卡片</button>
      <button class="btn secondary" type="button" data-action="toast" data-toast="同行邀请链接已复制">${icon("copy")}复制链接</button>
      ${
        state.appointment
          ? `<button class="btn primary" type="button" data-action="open-modal" data-modal="appointmentSuccess">${icon("check")}返回预约</button>`
          : `<button class="btn primary" type="button" data-action="confirm-booking">${icon("calendar-check")}确认预约</button>`
      }
    `,
    true,
  );
}

function modalAppointmentSuccess() {
  const store = activeStore();
  const style = activeStyle();
  const appointment = state.appointment || {};
  const latestOrder = state.merchantOrders[0];
  return modalFrame(
    "预约成功",
    `
      <div class="booking-success-card">
        ${icon("badge-check")}
        <div>
          <span class="pill">预约码</span>
          <strong>${escapeHtml(appointment.code || state.bookingCode || "NAIL-000000")}</strong>
          <p class="muted">${escapeHtml(store.name)} · ${escapeHtml(style.name)}</p>
        </div>
      </div>
      <div class="appointment-detail-grid">
        <span>日期<b>${escapeHtml(appointment.dateLabel || selectedBookingDate().label)} ${escapeHtml(appointment.dateSub || selectedBookingDate().sub)}</b></span>
        <span>时间<b>${escapeHtml(appointment.time || selectedBookingTime())}</b></span>
        <span>状态<b>已预约</b></span>
        <span>同行优惠<b>好友同行9折</b></span>
      </div>
      <div class="invite-success-strip">
        ${icon("users")}
        <div>
          <strong>邀请好友同行，立享9折</strong>
          <p>生成分享卡给好友，一起到店做美甲。</p>
        </div>
        <button class="btn secondary" type="button" data-action="generate-friend-invite">${icon("share-2")}生成分享卡</button>
      </div>
      <p class="preview-text">到店前向商家出示预约码即可。真实平台核销信息仍以美团/点评页面为准。</p>
      ${
        latestOrder
          ? `<p class="preview-text"><strong>已同步到商家中心：</strong>${escapeHtml(latestOrder.title)} · ${escapeHtml(latestOrder.slot)} · ${escapeHtml(latestOrder.status)}</p>`
          : ""
      }
    `,
    `
      <button class="btn secondary" type="button" data-nav="stores">${icon("map-pin")}返回门店</button>
      <button class="btn soft" type="button" data-action="view-merchant-orders">${icon("inbox")}查看商家接单池</button>
      <button class="btn primary" type="button" data-action="toast" data-toast="预约码已复制">${icon("copy")}复制预约码</button>
    `,
  );
}

function modalProfileEdit() {
  const profile = state.profile;
  return modalFrame(
    "编辑个人资料",
    `
      <div class="profile-edit-head">
        <div class="profile-avatar edit"><img src="${profile.avatar}" alt="头像预览" /></div>
        <div class="profile-edit-actions">
          <input id="avatarUpload" class="visually-hidden" type="file" accept="image/*" />
          <button class="btn secondary" type="button" data-action="pick-avatar">${icon("image-up")}本地相册</button>
          <button class="btn soft" type="button" data-action="use-bti-avatar">${icon("radar")}使用 Nail BTI 图像</button>
        </div>
      </div>
      <div class="form-grid">
        <div class="form-row">
          <label for="profileNickname">昵称</label>
          <input id="profileNickname" class="input" value="${escapeHtml(profile.nickname)}" maxlength="20" />
        </div>
        <div class="form-row">
          <label for="profileSignature">签名</label>
          <textarea id="profileSignature" class="textarea" maxlength="60">${escapeHtml(profile.signature)}</textarea>
        </div>
      </div>
    `,
    `
      <button class="btn secondary" type="button" data-action="close-modal">取消</button>
      <button class="btn primary" type="button" data-action="save-profile">${icon("save")}保存资料</button>
    `,
    true,
  );
}

function levelStages() {
  return [
    {
      level: 1,
      name: "新手试戴者",
      threshold: 0,
      target: 300,
      condition: "完成首次 Nail BTI 或保存一款试戴",
      benefit: "开启个人风格档案和基础试戴记录",
    },
    {
      level: 2,
      name: "风格探索者",
      threshold: 300,
      target: 650,
      condition: "累计 300 成长值",
      benefit: "解锁试戴记录整理和相似款推荐",
    },
    {
      level: 3,
      name: "灵感收藏家",
      threshold: 650,
      target: 1000,
      condition: "累计 650 成长值",
      benefit: "解锁趋势收藏、案例置顶和上新提醒",
    },
    {
      level: 4,
      name: "高意向美甲玩家",
      threshold: 1000,
      target: 1000,
      condition: "累计 1000 成长值",
      benefit: "解锁优先预约提醒和商家推荐优先匹配",
    },
  ];
}

function modalLevelGrowth() {
  const level = state.profile.level;
  const actions = [
    ["radar", "完成 Nail BTI", "+80"],
    ["hand", "保存一次试戴", "+50"],
    ["file-text", "发布需求", "+120"],
    ["calendar-check", "完成预约", "+200"],
    ["share-2", "分享 BTI 卡片", "+30"],
  ];
  return modalFrame(
    "等级成长",
    `
      <div class="level-overview">
        <div>
          <span>当前等级</span>
          <strong>LV.${level.current} ${level.name}</strong>
        </div>
        <div>
          <span>成长值</span>
          <strong>${level.points}/${level.nextPoints}</strong>
        </div>
      </div>
      <div class="level-roadmap">
        ${levelStages()
          .map((item) => {
            const active = item.level === level.current;
            const unlocked = item.level < level.current;
            const locked = item.level > level.current;
            return `
              <article class="level-stage ${active ? "active" : unlocked ? "unlocked" : "locked"}">
                <div class="level-stage-badge">LV.${item.level}</div>
                <div>
                  <h3>${item.name} ${active ? '<span class="tag gold">当前</span>' : unlocked ? '<span class="tag sage">已解锁</span>' : '<span class="tag">待解锁</span>'}</h3>
                  <p class="muted">${item.condition}</p>
                  <p>${item.benefit}</p>
                </div>
              </article>
            `;
          })
          .join("")}
      </div>
      <hr class="divider" />
      <p><strong>如何升级</strong></p>
      <div class="level-action-grid">
        ${actions.map(([iconName, text, score]) => `<div>${icon(iconName)}<span>${text}</span><b>${score}</b></div>`).join("")}
      </div>
    `,
    `<button class="btn primary" type="button" data-action="close-modal">${icon("check")}知道了</button>`,
    true,
  );
}

function modalTrendDetail() {
  const trend = activeTrend();
  const batch = currentXhsTrendBatch();
  return modalFrame(
    `趋势详情：${trend.label}`,
    `
      <div class="trend-detail">
        <button class="trend-preview" type="button" data-action="open-modal" data-modal="trendImage" data-trend="${trend.id}" aria-label="放大查看${trend.label}">
          <img src="${assets(trend.img)}" alt="${trend.label}" />
          <span>${icon("maximize-2")}</span>
        </button>
        <div>
          <div class="tag-row">${trend.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
          <p class="preview-text"><strong>${trend.merchantTitle}</strong><br />原帖：${trend.title}</p>
        </div>
      </div>
      <div class="modal-stats">
        <div class="modal-stat"><span>小红书点赞</span><b>${formatCompactNumber(trend.likes)}</b></div>
        <div class="modal-stat"><span>发布时间</span><b>${trend.publishedAt}</b></div>
        <div class="modal-stat"><span>批次筛选</span><b>${batch.recentDays} 天内</b></div>
      </div>
      <hr class="divider" />
      <p class="preview-text"><strong>商家判断：</strong>${trend.signal}，适合与站内需求池做交叉验证。<br /><strong>行动建议：</strong>${trend.action}</p>
    `,
    `
      <button class="btn secondary" type="button" data-action="close-modal">关闭</button>
      <a class="btn soft" href="${trend.url}" target="_blank" rel="noreferrer">${icon("external-link")}查看原帖</a>
      <button class="btn primary" type="button" data-action="generate-operation-plan" data-trend="${trend.id}">${icon("sparkles")}生成运营方案</button>
    `,
  );
}

function generateOperationPlanFile(trendId = "") {
  if (trendId) state.selectedTrend = trendId;
  const trend = activeTrend();
  const batch = currentXhsTrendBatch();
  const date = new Date().toISOString().slice(0, 10);
  const safeLabel = String(trend.label || "趋势款").replace(/[\\/:*?"<>|]/g, "").slice(0, 24) || "趋势款";
  const tags = Array.isArray(trend.tags) ? trend.tags.join(" / ") : "";
  const content = `# 甲遇 NailMuse 运营方案：${trend.label}

生成日期：${date}

## 趋势判断

- 趋势主题：${trend.merchantTitle}
- 小红书信号：${trend.signal}
- 标签：${tags}
- 批次：${batch.recentDays} 天内热榜，采集时间 ${formatGeneratedDate(batch.generatedAt)}

## 上新建议

1. 48 小时内上架 1 个主推款和 1 个通勤改色版。
2. 门店案例图统一使用「手部近景 + 细节特写 + 价格区间」三图结构。
3. 标题关键词优先放：${tags || trend.label}。

## 套餐设计

- 引流款：¥99-139，短甲/基础显白版。
- 主推款：¥168-238，增加细闪、蝴蝶结、贝母或局部猫眼。
- 高客单款：¥268-368，延长甲、钻饰或复杂晕染。

## 今日执行清单

- 补 3 张案例图：自然光手照、细节微距、上手对比。
- 在商家中心置顶该趋势款 7 天。
- 对近期收藏/试戴用户推送一次限时预约券。

## 文案模板

${trend.action}

主推文案：这款适合想要显白但不想太夸张的用户，上手清透、拍照有细节，通勤和约会都能撑住。
`;
  downloadTextFile(`甲遇运营方案-${safeLabel}-${date}.md`, "text/markdown;charset=utf-8", content);
  showToast(`${trend.label}运营方案文件已生成`);
}

function modalTrendImage() {
  const trend = activeTrend();
  return modalFrame(
    trend.label,
    `
      <figure class="trend-image-viewer">
        <img src="${assets(trend.img)}" alt="${trend.label}" />
        <figcaption>${trend.merchantTitle} · ${formatCompactNumber(trend.likes)} 点赞</figcaption>
      </figure>
    `,
    `
      <button class="btn secondary" type="button" data-action="open-modal" data-modal="trendDetail" data-trend="${trend.id}">${icon("arrow-left")}返回详情</button>
      <a class="btn soft" href="${trend.url}" target="_blank" rel="noreferrer">${icon("external-link")}查看原帖</a>
    `,
    true,
  );
}

function modalMerchantInsiteTrends() {
  return modalFrame(
    "全部站内趋势",
    `
      <div class="merchant-modal-list trend-list">
        ${merchantInSiteTrends()
          .map(
            ([img, title, value]) => `
              <button class="trend-item" type="button" data-action="open-modal" data-modal="trendDetail">
                <img src="${assets(img)}" alt="${title}" />
                <span><strong>${title}</strong><small class="muted">站内行为已验证</small></span>
                <span class="trend-up">${value}</span>
              </button>
            `,
          )
          .join("")}
      </div>
    `,
    `<button class="btn primary" type="button" data-action="close-modal">${icon("check")}知道了</button>`,
    true,
  );
}

function modalMerchantXhsTrends() {
  const trends = currentXhsTrends();
  const batch = currentXhsTrendBatch();
  const styleTrends = currentXhsStyleTrends();
  return modalFrame(
    "全部站外趋势",
    `
      <div class="trend-source">
        <span>${icon("book-open")}小红书 ${batch.recentDays} 天热榜</span>
        <span>入选 ${batch.count} 款</span>
        <span>采集 ${formatGeneratedDate(batch.generatedAt)}</span>
      </div>
      ${renderTrendMovementChart(styleTrends, 6)}
      <div class="merchant-modal-list trend-list">
        ${trends
          .map(
            (item) => `
              <button class="trend-item" type="button" data-action="open-modal" data-modal="trendDetail" data-trend="${item.id}">
                <img src="${assets(item.img)}" alt="${item.label}" />
                <span>
                  <strong>${item.merchantTitle}</strong>
                  <small class="muted">${item.signal} · ${item.tags.join(" / ")}</small>
                </span>
                <span class="trend-up">${formatCompactNumber(item.likes)}</span>
              </button>
            `,
          )
          .join("")}
      </div>
    `,
    `<button class="btn primary" type="button" data-action="close-modal">${icon("check")}知道了</button>`,
    true,
  );
}

function modalMerchantOrders() {
  const orders = state.merchantOrders;
  return modalFrame(
    `全部预约订单（${orders.length}）`,
    orders.length
      ? `
        <div class="merchant-modal-list history-list">
          ${orders
            .map(
              (order, index) => `
                <article class="quote-card live-order">
                  <img src="${recordImageSrc(order.img)}" alt="${escapeHtml(order.title)}" />
                  <div>
                    <h3>${escapeHtml(order.title)} <span class="tag gold">新预约</span></h3>
                    <div class="tag-row">
                      ${order.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
                    </div>
                    <p class="muted">Nail BTI：${order.bti} · ${order.heat}</p>
                    <p class="muted">门店：${order.store} · 时间：${order.slot} · ${order.price}</p>
                  </div>
                  <div class="quote-actions">
                    <span class="tag sage">${order.status}</span>
                    <button class="btn ${index === 0 ? "primary" : "secondary"}" type="button" data-action="open-modal" data-modal="quoteOrder">${icon("receipt")}确认接单</button>
                    <button class="btn secondary" type="button" data-action="open-modal" data-modal="uploadCase">${icon("image-plus")}上传案例</button>
                    <button class="btn soft" type="button" data-action="open-modal" data-modal="recommendChange">${icon("lightbulb")}推荐改款</button>
                  </div>
                </article>
              `,
            )
            .join("")}
        </div>
      `
      : `
        <div class="empty-state">
          ${icon("inbox")}
          <strong>暂无预约订单</strong>
          <p class="muted">用户在门店预约确认后，会实时同步到这里。</p>
        </div>
      `,
    `<button class="btn primary" type="button" data-action="close-modal">${icon("check")}知道了</button>`,
    true,
  );
}

function modalQuoteOrder() {
  return modalFrame(
    "报价接单",
    `
      <div class="form-grid">
        <div class="form-row"><label>报价金额</label><input class="input" value="178" /></div>
        <div class="form-row"><label>可预约时间</label><input class="input" value="明天 10:00" /></div>
        <div class="form-row"><label>服务说明</label><textarea class="textarea">可做轻量版冰透猫眼轻法式，适合短甲。</textarea></div>
      </div>
    `,
    `
      <button class="btn secondary" type="button" data-action="close-modal">取消</button>
      <button class="btn primary" type="button" data-action="toast" data-toast="报价已发送">${icon("send")}发送报价</button>
    `,
  );
}

function modalUploadCase() {
  return modalFrame(
    "上传相似案例",
    `
      <button class="mini-upload" type="button" data-action="toast" data-toast="案例图片已上传">${icon("image-plus")}上传图片</button>
      <div style="height:14px"></div>
      <div class="form-row"><label>案例说明</label><textarea class="textarea">冰透猫眼轻法式，同款可做，短甲友好。</textarea></div>
    `,
    `
      <button class="btn secondary" type="button" data-action="close-modal">取消</button>
      <button class="btn primary" type="button" data-action="toast" data-toast="案例已上传">${icon("check")}确认上传</button>
    `,
  );
}

function modalRecommendChange() {
  return modalFrame(
    "推荐改款",
    `
      <p class="preview-text"><strong>原需求：</strong>冰透猫眼轻法式<br /><strong>改款建议：</strong>减少厚重装饰，改为轻法式版本，更适合短甲。</p>
    `,
    `
      <button class="btn secondary" type="button" data-action="close-modal">取消</button>
      <button class="btn primary" type="button" data-action="toast" data-toast="改款建议已发送">${icon("send")}发送建议</button>
    `,
  );
}

function modalLaunchStyle() {
  return modalFrame(
    "上架新款",
    `
      <div class="form-grid">
        <div class="form-row"><label>款式名称</label><input class="input" value="冰透猫眼轻法式" /></div>
        <div class="form-row"><label>价格区间</label><input class="input" value="168-228 元" /></div>
        <div class="form-row"><label>封面图</label><button class="mini-upload" type="button" data-action="toast" data-toast="已使用 AI 图作为封面">${icon("image")}上传 / 使用 AI 图</button></div>
        <div class="form-row"><label>服务说明</label><textarea class="textarea">显白、日常、适合短甲，建议预约 90 分钟。</textarea></div>
      </div>
    `,
    `
      <button class="btn secondary" type="button" data-action="toast" data-toast="草稿已保存">${icon("save")}保存草稿</button>
      <button class="btn primary" type="button" data-action="toast" data-toast="新款已发布上架">${icon("upload")}发布上架</button>
    `,
    true,
  );
}

function modalPushConfirm() {
  return modalFrame(
    "推送目标用户",
    `
      <div class="summary-box">
        ${icon("send")}
        <div>
          <strong>目标人群：25-35 岁通勤用户</strong>
          <p class="muted">推送内容：奶茶裸粉 / 冰透猫眼推荐</p>
        </div>
      </div>
      <p class="preview-text">确认向符合条件的用户发送推荐？</p>
    `,
    `
      <button class="btn secondary" type="button" data-action="close-modal">取消</button>
      <button class="btn primary" type="button" data-action="toast" data-toast="已确认推送">${icon("send")}确认推送</button>
    `,
  );
}

function render() {
  syncSharedJourney();
  const views = {
    home: renderHome,
    analysis: renderAnalysis,
    demand: renderDemand,
    stores: renderStores,
    merchant: renderMerchant,
    mine: renderMine,
  };
  app.innerHTML = shell((views[state.view] || renderHome)());
  modalRoot.innerHTML = `${renderModal()}${state.toast ? `<div class="toast">${state.toast}</div>` : ""}`;
  if (window.lucide) {
    window.lucide.createIcons({
      attrs: {
        "stroke-width": 1.8,
      },
    });
  }
}

function setView(view, options = {}) {
  if (view === "demand" && fixedTryonShouldBookDirectly()) {
    view = "stores";
    options = { ...options, keepStyle: true };
    showToast("已有款试戴无需发布需求，已为你跳转到门店预约");
  }
  state.view = view;
  state.modal = null;
  if (view !== "mine") state.mineDetail = null;
  if (view === "analysis" && typeof state.aiStep !== "number") {
    state.aiStep = 0;
  }
  if (view === "demand") {
    state.demandTab = "new";
    if (!state.demandSource && state.tryonImage && !fixedStyleCanBookDirect()) {
      applyDemandSource("import");
    }
  }
  if (view === "stores") {
    state.storeMode = options.storeMode || "style";
  }
  if (view === "stores" && !options.keepStyle) {
    resetStoresState();
  }
  render();
  if (view === "stores" && state.storeMode !== "demand" && fixedStyleCanBookDirect()) {
    window.setTimeout(() => lookupStyleStores(false), 0);
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetStoresState() {
  state.storeFilter = "distance";
  state.selectedStore = stores[0]?.id || "";
  state.selectedSlot = stores[0]?.slots?.[0] || "";
  state.storeLookupStatus = "";
  state.storeLookupLoading = false;
  state.storeLookupStyleId = "";
  state.realStores = [];
}

function resetAnalysisState() {
  state.aiStep = 0;
  state.handFile = null;
  state.handImage = "";
  state.handFileName = "";
  state.handAnalysis = null;
  state.btiResult = null;
  state.generatedStyle = null;
  state.tryonImage = "";
  state.tryonLoading = false;
  state.tryonError = "";
  state.showHandSamples = false;
}

function showToast(message) {
  state.toast = message;
  render();
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    state.toast = "";
    render();
  }, 1800);
}

function selectHandFile() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/png,image/jpeg,image/webp";
  input.addEventListener("change", async () => {
    const file = input.files?.[0];
    if (!file) return;
    try {
      const prepared = await prepareHandImageFile(file, file.name || "hand-upload.jpg");
      state.handFile = prepared.file;
      state.handFileName = file.name;
      state.handImage = prepared.dataUrl;
      state.showHandSamples = false;
      state.handAnalysis = null;
      state.btiResult = null;
      state.tryonImage = "";
      state.tryonError = "";
      state.modal = null;
      state.view = "analysis";
      state.aiStep = 0;
      render();
      showToast("手部照片已选择");
    } catch (error) {
      showToast(error instanceof Error ? error.message : "图片读取失败");
    }
  });
  input.click();
}

async function startAnalysis() {
  if (!state.handFile && !state.handImage) {
    selectHandFile();
    return;
  }
  state.modal = "analyzing";
  state.view = "analysis";
  state.aiStep = 0;
  render();
  window.clearTimeout(analysisTimer);
  try {
    let analysisFile = state.handFile;
    if (state.handImage) {
      const compressedHandImage = await compressImageDataUrl(state.handImage);
      if (compressedHandImage !== state.handImage || !analysisFile) {
        analysisFile = dataUrlToFile(compressedHandImage, asJpegFilename(state.handFileName || "hand-upload.jpg"));
        state.handFile = analysisFile;
        state.handImage = compressedHandImage;
      }
    } else if (analysisFile) {
      const prepared = await prepareHandImageFile(analysisFile, state.handFileName || analysisFile.name || "hand-upload.jpg");
      analysisFile = prepared.file;
      state.handFile = prepared.file;
      state.handImage = prepared.dataUrl;
    }
    if (!analysisFile) throw new Error("请先上传手部照片");

    const formData = new FormData();
    formData.append("image", analysisFile, analysisFile.name || "hand-upload.jpg");
    const analysis = await apiJson("/api/analyze-hand", {
      method: "POST",
      body: formData,
    });
    state.handAnalysis = analysis;
    state.btiResult = mapHandAnalysisToBTI(analysis);
    state.selectedStyle = state.btiResult.recommendation.mainStyle.id;
    state.generatedStyle = null;
    state.tryonImage = "";
    state.tryonError = "";
    resetStoresState();
    state.modal = null;
    state.aiStep = 1;
    showToast("Nail BTI 分析已完成");
  } catch (error) {
    state.modal = null;
    showToast(error instanceof Error ? error.message : "AI 手部分析失败");
  }
}

async function runTryon() {
  if (!state.handImage) {
    selectHandFile();
    return;
  }
  state.view = "analysis";
  state.aiStep = 2;
  state.tryonLoading = true;
  state.tryonError = "";
  render();
  try {
    const style = activeStyle();
    const handImage = await compressImageDataUrl(state.handImage);
    const styleImage = await compressImageDataUrl(await imageToDataUrl(getCurrentStyleImage()));
    const result = await apiJson("/api/generate-nail-tryon-v2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hand_image: handImage,
        style_image: styleImage,
        style_id: style.id,
        style_name: style.name,
        bti_result: state.btiResult,
        fast_mode: true,
        length_mode: "match_reference",
      }),
    });
    if (result?.success !== true || typeof result.image !== "string") {
      throw new Error(result?.error || "AI生成失败，请重新生成");
    }
    state.tryonImage = result.image;
    state.tryonError = "";
    showToast(fixedStyleCanBookDirect() ? "AI 试戴已生成，可直接预约门店" : "AI 试戴已生成，可发布需求找商家");
  } catch (error) {
    state.tryonError = error instanceof Error ? error.message : "AI生成失败，请重新生成";
    showToast(state.tryonError);
  } finally {
    state.tryonLoading = false;
    render();
  }
}

async function generateRecommendedStyle() {
  if (state.generatedStyleLoading) return;
  const promptInput = document.querySelector('[data-field="style-prompt"]');
  const customPrompt = promptInput?.value?.trim() || state.stylePrompt;
  state.stylePrompt = customPrompt;
  const fallbackIndex = nailStyles.findIndex((item) => item.id === state.selectedStyle);
  const fallbackNext = nailStyles[(fallbackIndex + 1 + nailStyles.length) % nailStyles.length];
  if (!state.handImage && !state.btiResult) {
    state.selectedStyle = fallbackNext.id;
    state.tryonImage = "";
    state.tryonError = "";
    showToast(`已切换到：${fallbackNext.name}`);
    return;
  }

  state.generatedStyleLoading = true;
  state.tryonImage = "";
  state.tryonError = "";
  render();
  try {
    const baseStyle = activeStyle();
    const handImage = state.handImage ? await compressImageDataUrl(state.handImage) : "";
    const result = await apiJson("/api/generate-nail-style", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: `${customPrompt} 参考方向：${baseStyle.name || "显白日常款"}。`,
        btiResult: state.btiResult,
        handImage: handImage || undefined,
      }),
    });
    if (result?.success !== true || !result.style) {
      throw new Error(result?.error || "AI生成新款式失败");
    }
    state.generatedStyleNonce += 1;
    state.generatedStyle = generatedStyleFromPayload(result.style);
    state.selectedStyle = "generated";
    resetStoresState();
    showToast("AI 新推荐款已生成");
  } catch (error) {
    state.selectedStyle = fallbackNext.id;
    resetStoresState();
    showToast(error instanceof Error ? error.message : `已切换到：${fallbackNext.name}`);
  } finally {
    state.generatedStyleLoading = false;
    render();
  }
}

function cycleLocalRecommendedStyle() {
  const styles = recommendedStylesForCurrentPersona();
  const fallback = nailStyles;
  const pool = styles.length > 1 ? styles : fallback;
  const index = pool.findIndex((item) => item.id === state.selectedStyle);
  const next = pool[(index + 1 + pool.length) % pool.length] || pool[0];
  state.selectedStyle = next.id;
  state.generatedStyle = null;
  state.tryonImage = "";
  state.tryonError = "";
  resetStoresState();
  showToast(`已切换到：${next.name}`);
  render();
}

function demandFormValues() {
  const min = document.querySelector('[data-field="budget-min"]')?.value || "168";
  const max = document.querySelector('[data-field="budget-max"]')?.value || "228";
  const extra = document.querySelector('[data-field="demand-extra"]')?.value || "希望显白、日常、不厚重。";
  return {
    budgetRange: `${min}-${max}元`,
    extra,
    location: "附近 3 公里",
    availableTime: "近期可约",
  };
}

async function generateDemand() {
  if (!state.demandSource) {
    showToast("请先选择需求来源");
    return;
  }
  const values = demandFormValues();
  const style = currentDemandPayload();
  const fallbackText = (
    style.demandText ||
    `想做一款${style.name}，预算${values.budgetRange}，${values.availableTime}可约，位置在${values.location}附近。`
  ).trim();
  showToast("正在生成需求单...");
  try {
    const result = await apiJson("/api/generate-demand-text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        style,
        btiResult: state.btiResult,
        budgetRange: values.budgetRange,
        location: values.location,
        availableTime: values.availableTime,
        acceptModification: true,
      }),
    });
    const baseText = typeof result.demandText === "string" && result.demandText.trim() ? result.demandText : fallbackText;
    state.demandText = `${baseText}${values.extra ? ` ${values.extra}` : ""}`.trim();
    showToast("需求单已生成，可直接发布");
  } catch (error) {
    state.demandText = `${fallbackText}${values.extra ? ` ${values.extra}` : ""}`.trim();
    showToast(error instanceof Error ? `${error.message}，已使用默认需求单` : "已使用默认需求单");
  } finally {
    render();
  }
}

async function publishCurrentDemand() {
  if (!state.demandSource) {
    showToast("请先选择需求来源");
    return;
  }
  const values = demandFormValues();
  const style = currentDemandPayload();
  const referenceImage = style.image || style.img || state.tryonImage || "";
  const demandText =
    state.demandText ||
    `想做一款${style.name}，预算${values.budgetRange}，${values.availableTime}可约，位置在${values.location}附近。${values.extra}`;
  showToast("正在发布需求...");
  try {
    const publishResult = await apiJson("/api/demands", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        referenceImage,
        sourceType: style.sourceType || (state.tryonImage ? "tryon_result" : "ai_generated"),
        styleTags: style.tags || [],
        btiCode: state.btiResult?.code,
        btiArchetype: state.btiResult?.archetype,
        fitInfo: state.btiResult?.styleSummary,
        budgetRange: values.budgetRange,
        location: values.location,
        availableTime: values.availableTime,
        acceptModification: true,
        demandText,
        status: "published",
      }),
    });
    state.demandId = publishResult.demandId || "";
    state.demandText = demandText;
    state.myDemands.unshift({
      id: state.demandId,
      title: `想做一款${style.name}`,
      desc: state.demandId ? `需求号 ${state.demandId} · 等待商家报价` : "已发布，等待商家报价",
      status: "报价中",
      image: referenceImage,
      styleName: style.name,
      styleTags: style.tags || [],
      demandText,
      budgetRange: values.budgetRange,
      location: values.location,
      availableTime: values.availableTime,
    });
    state.publishedDemandCount = state.myDemands.length;
    if (publishResult.storeSearch && typeof publishResult.storeSearch === "object") {
      state.realStores = Array.isArray(publishResult.storeSearch.stores) ? publishResult.storeSearch.stores : [];
      state.storeLookupStatus =
        publishResult.storeSearch.message ||
        (state.realStores.length
          ? `后台已按需求自动推荐 ${state.realStores.length} 家合肥蜀山区门店。`
          : "后台已收到需求，但暂未返回可展示门店。");
    }
    state.storeMode = "demand";
    state.modal = "publishSuccess";
    render();
  } catch (error) {
    showToast(error instanceof Error ? error.message : "需求发布失败");
  }
}

async function lookupStyleStores(force = false) {
  if (!fixedStyleCanBookDirect()) {
    lookupRealStores();
    return;
  }
  const style = activeStyle();
  const styleKey = `${style.id || ""}:${style.name || ""}`;
  if (!force && state.storeLookupStyleId === styleKey && state.realStores.length) return;

  state.storeLookupStyleId = styleKey;
  state.storeLookupStatus = `正在按「${style.name}」推荐合肥蜀山门店...`;
  state.storeLookupLoading = true;
  state.realStores = [];
  render();
  try {
    const params = new URLSearchParams({
      styleId: style.id || "",
      styleName: style.name || "",
      limit: "3",
    });
    const payload = await apiJson(`/api/style-store-recommendations?${params.toString()}`);
    state.realStores = Array.isArray(payload.stores) ? payload.stores : [];
    state.selectedStore = state.realStores[0]?.id || stores[0]?.id || "";
    state.storeLookupStatus =
      payload.message ||
      (state.realStores.length ? `已按「${style.name}」推荐 ${state.realStores.length} 家门店。` : "暂未返回可展示的蜀山区门店。");
  } catch (error) {
    state.storeLookupStatus = error instanceof Error ? error.message : "款式门店推荐失败";
    state.realStores = [];
  } finally {
    state.storeLookupLoading = false;
    render();
  }
}

function lookupRealStores() {
  if (!state.myDemands.length) {
    showToast("请先发布需求单");
    return;
  }
  state.storeLookupStatus = "正在准备合肥蜀山区门店推荐...";
  state.storeLookupLoading = true;
  state.realStores = [];
  render();

  const fetchStores = async (coords) => {
    try {
      const payload = await apiJson("/api/nearby-stores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          latitude: coords.latitude,
          longitude: coords.longitude,
          keyword: "美甲",
          radius: 3000,
          demandId: state.myDemands[0]?.id || state.demandId || undefined,
          platform: "meituan",
        }),
      });
      state.realStores = Array.isArray(payload.stores) ? payload.stores : [];
      state.storeLookupStatus =
        payload.message ||
        (state.realStores.length
          ? `已返回 ${state.realStores.length} 家蜀山区真实门店推荐。`
          : "暂未返回可展示的蜀山区门店。");
    } catch (error) {
      state.storeLookupStatus = error instanceof Error ? error.message : "真实门店数据获取失败";
      state.realStores = [];
    } finally {
      state.storeLookupLoading = false;
      render();
    }
  };

  if (!navigator.geolocation) {
    state.storeLookupStatus = "当前浏览器不支持定位，已改用合肥蜀山默认坐标推荐门店。";
    render();
    fetchStores({ latitude: 31.8512, longitude: 117.2266 });
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      fetchStores({
        latitude: Number(position.coords.latitude.toFixed(6)),
        longitude: Number(position.coords.longitude.toFixed(6)),
      });
    },
    (error) => {
      state.storeLookupStatus = error?.message ? `定位未成功，改用合肥蜀山默认坐标继续推荐：${error.message}` : "定位未成功，改用合肥蜀山默认坐标继续推荐。";
      fetchStores({ latitude: 31.8512, longitude: 117.2266 });
    },
    { enableHighAccuracy: false, timeout: 6000, maximumAge: 300000 },
  );
}

function importManualStore() {
  const name = document.querySelector('[data-field="manual-store-name"]')?.value?.trim() || "";
  const externalUrl = document.querySelector('[data-field="manual-store-url"]')?.value?.trim() || "";
  const note = document.querySelector('[data-field="manual-store-note"]')?.value?.trim() || "";
  if (!name) {
    showToast("请先填写门店名称");
    return;
  }
  state.manualStores.unshift({
    id: `manual-store-${Date.now()}`,
    name,
    address: note || "用户选择的真实门店链接",
    distance: "",
    tel: "",
    type: "manual_import",
    rating: "",
    price: "",
    photo: "",
    location: "",
    source: "manual_import",
    externalUrl,
  });
  state.storeLookupStatus = "已导入你手动选择的门店。";
  showToast("门店已导入");
  render();
}

function confirmBooking() {
  if (!fixedStyleCanBookDirect()) {
    showToast("AI 生成款需要先请求商家接单");
    state.modal = null;
    render();
    return;
  }
  const store = activeStore();
  const style = activeStyle();
  const date = selectedBookingDate();
  const time = selectedBookingTime();
  const code = makeAppointmentCode(store, style);
  state.bookingDate = date.id;
  state.bookingTime = time;
  state.bookingCode = code;
  state.selectedSlot = `${date.label} ${date.sub} ${time}`;
  state.appointment = {
    code,
    storeId: store?.id || "",
    storeName: store?.name || "",
    styleId: style?.id || "",
    styleName: style?.name || "",
    styleImage: style?.image || style?.img || "",
    styleTags: style?.tags || [],
    dateId: date.id,
    dateLabel: date.label,
    dateSub: date.sub,
    time,
    status: "booked",
    friendInvite: state.friendInvite,
  };
  state.merchantOrders = [createMerchantOrder(), ...state.merchantOrders.filter((item) => item.id !== code)].slice(0, 6);
  state.modal = "appointmentSuccess";
  showToast("预约成功");
  render();
}

function requestStoreQuote(storeId = "") {
  const store = state.realStores.find((item) => item.id === storeId) || activeStore();
  state.selectedStore = store?.id || state.selectedStore;
  state.appointment = null;
  state.modal = null;
  showToast(`已向${store?.name || "商家"}发送接单请求`);
  render();
}

document.addEventListener("click", (event) => {
  const target = event.target.closest(
    "[data-nav],[data-action],[data-ai-step],[data-style],[data-demand-tab],[data-demand-source],[data-filter],[data-store],[data-slot],[data-booking-date],[data-booking-time],[data-mine-detail]",
  );
  if (!target) return;

  const nav = target.dataset.nav;
  if (nav) {
    setView(nav, { keepStyle: target.dataset.keepStyle === "true" });
    return;
  }

  if (target.dataset.aiStep !== undefined) {
    const nextStep = Number(target.dataset.aiStep);
    if (nextStep > 0 && !state.btiResult) {
      state.aiStep = nextStep === 1 ? 1 : 0;
      state.view = "analysis";
      render();
      showToast(nextStep === 1 ? "请先上传手图并开始分析" : "请先完成 Nail BTI 分析");
      return;
    }
    state.aiStep = nextStep;
    state.view = "analysis";
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  if (target.dataset.style) {
    state.selectedStyle = target.dataset.style;
    state.tryonImage = "";
    state.tryonError = "";
    resetStoresState();
    if (state.aiStep < 2) state.aiStep = 2;
    render();
    return;
  }

  if (target.dataset.demandTab) {
    state.demandTab = target.dataset.demandTab;
    render();
    return;
  }

  if (target.dataset.demandSource) {
    applyDemandSource(target.dataset.demandSource);
    render();
    return;
  }

  if (target.dataset.filter) {
    state.storeFilter = target.dataset.filter;
    showToast(`已切换为${target.textContent.trim()}`);
    return;
  }

  if (target.dataset.store) {
    state.selectedStore = target.dataset.store;
    state.selectedSlot = activeStore().slots?.[0] || "以平台可约时间为准";
    render();
    return;
  }

  if (target.dataset.slot) {
    state.selectedSlot = target.dataset.slot;
    render();
    return;
  }

  if (target.dataset.bookingDate && (!target.dataset.action || target.dataset.action === "select-booking-date")) {
    state.bookingDate = target.dataset.bookingDate;
    if (!state.appointment) state.friendInvite = null;
    render();
    return;
  }

  if (target.dataset.bookingTime && (!target.dataset.action || target.dataset.action === "select-booking-time")) {
    state.bookingTime = target.dataset.bookingTime;
    if (!state.appointment) state.friendInvite = null;
    render();
    return;
  }

  if (target.dataset.mineDetail) {
    state.mineDetail = target.dataset.mineDetail;
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const action = target.dataset.action;
  const modal = target.dataset.modal;

  switch (action) {
    case "start-ai":
      resetAnalysisState();
      state.view = "analysis";
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
      break;
    case "select-hand-file":
      selectHandFile();
      break;
    case "use-reference-hand":
      useReferenceHand(target.dataset.referenceHand || "");
      break;
    case "toggle-reference-hands":
      state.showHandSamples = !state.showHandSamples;
      render();
      break;
    case "download-bti-card":
      downloadBtiShareCard();
      break;
    case "open-modal":
      if (target.dataset.trend) state.selectedTrend = target.dataset.trend;
      state.modal = modal;
      render();
      break;
    case "start-xhs-sync":
      startXhsSync();
      break;
    case "close-modal":
      state.modal = null;
      render();
      break;
    case "start-analysis":
      startAnalysis();
      break;
    case "enter-tryon":
      if (!state.btiResult) {
        state.aiStep = 1;
        render();
        showToast("请先完成 Nail BTI 分析");
        break;
      }
      state.aiStep = 2;
      state.selectedStyle = (state.btiResult?.recommendation || buildRecommendation(state.handAnalysis)).mainStyle.id;
      state.tryonImage = "";
      state.tryonError = "";
      resetStoresState();
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
      break;
    case "cycle-style": {
      cycleLocalRecommendedStyle();
      break;
    }
    case "start-tryon":
      runTryon();
      break;
    case "generate-style":
      generateRecommendedStyle();
      break;
    case "generate-operation-plan":
      generateOperationPlanFile(target.dataset.trend || "");
      break;
    case "generate-demand":
      generateDemand();
      break;
    case "publish-demand":
      publishCurrentDemand();
      break;
    case "lookup-real-stores":
      if (fixedStyleCanBookDirect()) {
        lookupStyleStores(true);
      } else {
        lookupRealStores();
      }
      break;
    case "import-manual-store":
      importManualStore();
      break;
    case "confirm-import":
      if (!state.tryonImage) {
        showToast("请先生成 AI 试戴结果图");
        break;
      }
      if (fixedStyleCanBookDirect()) {
        state.modal = null;
        setView("stores", { keepStyle: true });
        showToast("已有款试戴无需发布需求，可直接预约门店");
        break;
      }
      state.view = "demand";
      state.demandTab = "new";
      applyDemandSource("import");
      state.modal = null;
      showToast("AI 试戴结果已导入需求单");
      render();
      break;
    case "parse-link":
      applyDemandSource("link");
      state.modal = null;
      showToast("小红书链接已解析，已生成 mock 需求单");
      render();
      break;
    case "mock-upload-reference":
      applyDemandSource("upload");
      showToast("已加入上传参考图 mock 需求单");
      render();
      break;
    case "view-my-demand":
      state.modal = null;
      state.view = "demand";
      state.demandTab = "mine";
      render();
      break;
    case "continue-demand":
      state.modal = null;
      state.view = "demand";
      state.demandTab = "new";
      state.demandSource = "";
      state.demandText = "";
      render();
      break;
    case "go-real-stores":
      state.modal = null;
      setView("stores", { storeMode: "demand", keepStyle: true });
      break;
    case "choose-quote-store":
      state.modal = null;
      setView("stores", { storeMode: "demand", keepStyle: true });
      break;
    case "confirm-booking":
      confirmBooking();
      break;
    case "generate-friend-invite":
      generateFriendInvite();
      break;
    case "request-store-quote":
      requestStoreQuote(target.dataset.bookStore || "");
      break;
    case "view-merchant-orders":
      state.modal = null;
      state.view = "merchant";
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
      break;
    case "back-mine":
      state.mineDetail = null;
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
      break;
    case "pick-avatar": {
      const input = document.querySelector("#avatarUpload");
      if (input) input.click();
      break;
    }
    case "use-bti-avatar":
      state.profile.avatar = resolveImageSrc(state.btiResult?.avatarUrl, assets("persona.jpg"));
      showToast("已使用 Nail BTI 图像作为头像");
      break;
    case "save-profile": {
      const nickname = document.querySelector("#profileNickname")?.value.trim();
      const signature = document.querySelector("#profileSignature")?.value.trim();
      state.profile.nickname = nickname || "小美爱美甲";
      state.profile.signature = signature || "最近迷上清透显白款，偏爱低饱和通勤风。";
      state.modal = null;
      showToast("个人资料已保存");
      break;
    }
    case "select-booking-date":
      state.bookingDate = target.dataset.bookingDate || state.bookingDate;
      if (!state.appointment) state.friendInvite = null;
      render();
      break;
    case "select-booking-time":
      state.bookingTime = target.dataset.bookingTime || state.bookingTime;
      if (!state.appointment) state.friendInvite = null;
      render();
      break;
    case "book-store":
      if (!fixedStyleCanBookDirect()) {
        requestStoreQuote(target.dataset.bookStore || "");
        break;
      }
      state.selectedStore = target.dataset.bookStore || state.selectedStore;
      state.bookingDate = bookingDateOptions()[0]?.id || "";
      state.bookingTime = bookingTimeOptions()[0] || "";
      state.selectedSlot = `${selectedBookingDate().label} ${selectedBookingDate().sub} ${selectedBookingTime()}`;
      state.friendInvite = null;
      state.modal = "bookingTime";
      render();
      break;
    case "toast":
      showToast(target.dataset.toast || "操作已完成");
      break;
    default:
      break;
  }
});

document.addEventListener("change", (event) => {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || input.id !== "avatarUpload") return;
  const file = input.files && input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    if (typeof reader.result === "string") {
      state.profile.avatar = reader.result;
      showToast("头像已更新，记得保存资料");
    }
  });
  reader.readAsDataURL(file);
});

render();
