export const data = {
    lines: [
        {
            audio:"a1",
            ch:"我 去 超市 买 了 点 东西。",
            en:"I went to the supermarket (and) bought some groceries/things.",
            source:"https://youtu.be/FN6iUHwieho?list=PLWnUfdoAdVv59cmiJSzmWS5rPYv-qkAdB&t=14"
        },
        {
            audio:"letmesee",
            ch:"你 买 什么 了 ？ 让 我 看看。",
            en:"What did you buy? Let me see.",
            source:"https://youtu.be/FN6iUHwieho?list=PLWnUfdoAdVv59cmiJSzmWS5rPYv-qkAdB&t=16"
        },
        {
            ch:"主要 真的 不怪我",
            en: "Mainly, it's really not my fault.",
            source: "https://youtu.be/OA-oZ5Y5Xx8?t=750",
            audio:"notmyfault"
        },
        {
            audio:"ibought",
            ch:"我 买 了 两盒 牛奶， 一些 水果",
            en:"I bought two boxes of milk, some fruits,",
            source:"https://youtu.be/FN6iUHwieho?list=PLwU1UURoj-SFpKuz23fPwHuiNfViWSyV8&t=19"
        },
        {
            audio:"cantfigureitout",
            ch:"我 就 真 搞 不 清楚 了",
            en:"I really can't figure it out anymore.",
            source:"https://www.youtube.com/watch?v=thqNmtaelkc"
        },
        {
            audio:"project",
            source:"https://youtu.be/thqNmtaelkc?t=458",
            ch:"当然 必须 坚持 这个 项目 要 全力以赴",
            en:"Of course, we must persist. This project needs to be carried out with full effort."
        },
        {
            audio:"blinddate",
            source:"https://youtu.be/PN4gd45kLas?t=158",
            ch:"你 也是 来 相亲 的",
            en:"You are also here for a blind date?"
        },
        {
            audio:"leavemyson",
            source:"https://youtu.be/TjWaLmTSaNw?t=263",
            ch:"你 要 多少 钱 才能 离开 我 儿子",
            en:"How much money do you need to leave my son?"
        },
        {
            audio:"ourhome",
            source:"https://youtu.be/4Bjk6ZvAVmw?t=90",
            ch:"这儿 就 是 我们的 家",
            en:"This is our home!"
        }
    ]
}

data.lines.sort((a, b) => a.ch.length - b.ch.length);

export const removeNonChinese = (str:string) => {
    return str.replace(/[^\u4e00-\u9fff]/g, "").trim();
}