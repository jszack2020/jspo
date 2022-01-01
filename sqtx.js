/*
测试脚本，禁止外传
多用户版本
config里面
export zqkdCookie='xxx@xxx'
ck包含uid,zqkey,zqkey_id三个变量就行
35 6,13,21 * * * task zq_pro
*/

const jsname = '中青看点'
const $ = Env(jsname)
let logDebug = 0
const notifyFlag = process.env.zqnotify || 0; 	//0为关闭通知，1为打开通知,默认为0
const CryptoJS = require('./crypto-js')

const notify = $.isNode() ? require('./sendNotify') : '';


let notifyStr=''
let userCookie = ($.isNode() ? process.env.zqkdCookie : $.getdata('zqkdCookie')) || '';
let userCookieArr = []
let cash = ($.isNode() ? process.env.zqkdCash : $.getdata('zqkdCash')) || '30';	//提现额度
let cashtype = ($.isNode() ? process.env.zqkdCashtype : $.getdata('zqkdCashtype')) || 'wechat';	//提现类型，微信wechat和支付宝alipay
let withdraw_auto=process.env.zqkd_withdraw_auto||0	//是否打开自动提现，默认关闭


let withdrawbody='access=WIFI&app-version=3.5.5&app_name=zqkd_app&app_version=3.5.5&carrier=CMCC&channel=c4130&device_brand=Xiaomi&device_id=57936743&device_model=M2007J22C&device_platform=android&device_type=android&dpi=240&inner_version=202108181034&language=zh-CN&memory=1&mi=0&mobile_type=1&money=10&net_type=1&network_type=WIFI&openudid=ece32ccfd0407e10&os_api=25&os_version=cannon-user+7.1.2+QP1A.190711.020+700211101+release-keys&request_time=1640838626&resolution=720x1280&rom_version=cannon-user+7.1.2+QP1A.190711.020+700211101+release-keys&s_ad=fUJybc31G2V0%3DJsxRnKQK3Al329udjrzI1zNKGcIdVBHqsl&s_im=gXPkPrW1Kghg%3DtVoJJo1XERdVMIwwM1T3OQ%3D%3D&sm_device_id=20211128154940cb52f5dc3b00cfbe52e1314e07bbdf1c01359f46c6d2d928&storage=117.21&type=2&uid=59933418&username=%E5%A8%83%E5%A8%83&version_code=63&'

let nickname = []
let tmpCk=''
let preBody='p=bYdVi_XPUOzA='

/* * 加密工具已经升级了一个版本，目前为 jsjiami.com.v6 ，主要加强了算法; * 已经打算把这个工具基础功能一直免费下去。还希望支持我。 * 另外 jsjiami.com.v6 已经强制加入校验，注释可以去掉，但是 jsjiami.com.v6 不能去掉，其他都没有任何绑定。 * 誓死不会加入任何后门，JsJiami.com 加密的使命就是为了保护你们的Javascript 。 */ var _0xodo='jsjiami.com.v6',_0xodo_=['_0xodo'],_0x1bcc=[_0xodo,'\x6c\x65\x6e\x67\x74\x68','\x72\x65\x70\x6c\x61\x63\x65','\x63\x6f\x6f\x6b\x69\x65','\x63\x61\x74\x63\x68','\x6c\x6f\x67','\x6e\x61\x6d\x65','\x2c\x20\u5931\u8d25\x21\x20\u539f\u56e0\x3a\x20','\x66\x69\x6e\x61\x6c\x6c\x79','\x64\x6f\x6e\x65','\x32\x30\x32\x32\x2d\x30\x31\x2d\x32\x30\x20\x32\x33\x3a\x35\x39\x3a\x35\x39','\x76\x61\x6c\x75\x65\x4f\x66','\u6b64\u811a\u672c\u5df2\u5931\u6548\x2c\u8bf7\u505c\u6b62\u4f7f\u7528','\x6d\x6f\x6e\x65\x79\x3d','\x73\x70\x6c\x69\x74','\x26\x73\x69\x67\x6e\x3d','\x65\x6e\x63','\x48\x65\x78','\x70\x61\x72\x73\x65','\x42\x61\x73\x65\x36\x34','\x73\x74\x72\x69\x6e\x67\x69\x66\x79','\x36\x48\x50\x6a\x53\x5a\x46\x48','\x55\x74\x66\x38','\x44\x45\x53','\x65\x6e\x63\x72\x79\x70\x74','\x6d\x6f\x64\x65','\x43\x42\x43','\x70\x61\x64','\x50\x6b\x63\x73\x37','\x63\x69\x70\x68\x65\x72\x74\x65\x78\x74','\x74\x6f\x53\x74\x72\x69\x6e\x67','\x6a\x64\x76\x79\x6c\x71\x63\x68\x4a\x5a\x72\x66\x77\x30\x6f\x32\x44\x67\x41\x62\x73\x6d\x43\x47\x55\x61\x70\x46\x31\x59\x43\x68\x63','\x4d\x44\x35','\x45\x6a\x73\x4e\x6a\x69\x53\x61\x6d\x55\x69\x43\x2e\x63\x43\x65\x79\x50\x68\x41\x6f\x6d\x2e\x5a\x79\x76\x36\x46\x41\x3d\x3d'];function _0x3115(_0x5b2769,_0x5c96a9){_0x5b2769=~~'0x'['concat'](_0x5b2769['slice'](0x0));var _0x44426a=_0x1bcc[_0x5b2769];return _0x44426a;};(function(_0xf092d3,_0xdf2c75){var _0x233e79=0x0;for(_0xdf2c75=_0xf092d3['shift'](_0x233e79>>0x2);_0xdf2c75&&_0xdf2c75!==(_0xf092d3['pop'](_0x233e79>>0x3)+'')['replace'](/[ENSUCCeyPhAZyFA=]/g,'');_0x233e79++){_0x233e79=_0x233e79^0xc794d;}}(_0x1bcc,_0x3115));!(async()=>{if(!(await checkDate())){return;}if(!(await checkEnv())){return;}for(userIdx=0x0;userIdx<userCookieArr[_0x3115('0')];userIdx++){tmpCk=userCookieArr[userIdx];tmpCk=tmpCk[_0x3115('1')](/version_code=63\&/g,'');tmpCk=tmpCk[_0x3115('1')](/zqkey/g,_0x3115('2'));await querySignStatus(userIdx);await getBalance();await GetOrderList(userIdx);}await showmsg();})()[_0x3115('3')](_0x4db04f=>{$[_0x3115('4')]('','\u274c\x20'+$[_0x3115('5')]+_0x3115('6')+_0x4db04f+'\x21','');})[_0x3115('7')](()=>{$[_0x3115('8')]();});async function checkDate(){let _0x2d0ff6=new Date();let _0x70d333=_0x3115('9');_0x70d333=_0x70d333[_0x3115('1')](/-/g,'\x2f');_0x70d333=new Date(_0x70d333);if(_0x2d0ff6[_0x3115('a')]()>_0x70d333[_0x3115('a')]()){console[_0x3115('4')](_0x3115('b'));return![];}else return!![];}function encodewithdrawBody(_0x225bd0){let _0x560f89=_0x3115('c')+_0x225bd0+'\x26';let _0x593080=userCookieArr[userIdx][_0x3115('d')]('\x26');let _0x612989=withdrawbody[_0x3115('1')](/uid=[\w_]+/g,_0x593080[0x0]);_0x612989=_0x612989[_0x3115('1')](/money=[\w_]+\&/g,_0x560f89);_0x612989=_0x612989+_0x593080[0x2]+'\x26'+_0x593080[0x3];let _0x580b08=encodeMD5Str(_0x612989);_0x612989=_0x612989+_0x3115('e')+_0x580b08;let _0x29ccdf=encryptByDESModeEBC(_0x612989);let _0x50c1e2=CryptoJS[_0x3115('f')][_0x3115('10')][_0x3115('11')](_0x29ccdf);let _0x34be27=CryptoJS[_0x3115('f')][_0x3115('12')][_0x3115('13')](_0x50c1e2);let _0x598886=_0x34be27[_0x3115('1')](/\+/g,'\x2d');let _0x38384d=_0x598886[_0x3115('1')](/\//g,'\x5f');let _0x1524fd=encodeURIComponent(_0x38384d);_0x1524fd=preBody+_0x1524fd+'\x3d\x3d';return _0x1524fd;}function encryptByDESModeEBC(_0x5cedea){let _0x3dcde9=_0x3115('14');var _0x2d9614=CryptoJS[_0x3115('f')][_0x3115('15')][_0x3115('11')](_0x3dcde9);var _0x508ce5=CryptoJS[_0x3115('f')][_0x3115('15')][_0x3115('11')](_0x3dcde9);newmessage=CryptoJS[_0x3115('f')][_0x3115('15')][_0x3115('11')](_0x5cedea);var _0x13f73c=CryptoJS[_0x3115('16')][_0x3115('17')](newmessage,_0x2d9614,{'\x69\x76':_0x508ce5,'\x6d\x6f\x64\x65':CryptoJS[_0x3115('18')][_0x3115('19')],'\x70\x61\x64\x64\x69\x6e\x67':CryptoJS[_0x3115('1a')][_0x3115('1b')]});return _0x13f73c[_0x3115('1c')][_0x3115('1d')]();}function encodeMD5Str(_0x2a18fa){let _0x2070ef=_0x3115('1e');replacedStr=decodeURIComponent(_0x2a18fa);replacedStr=replacedStr[_0x3115('1')](/\&/g,'');replacedStr=replacedStr[_0x3115('1')](/\+/g,'\x20');replacedStr+=_0x2070ef;md5Str=CryptoJS[_0x3115('1f')](replacedStr)[_0x3115('1d')]();return md5Str;};_0xodo='jsjiami.com.v6';

async function checkEnv() {
    if(userCookie) {
        if(userCookie.indexOf('@') > -1) {
            let userCookies = userCookie.split('@')
            for(let i=0; i<userCookies.length; i++) {
                userCookieArr.push(replaceCookie(userCookies[i]))
            }
        }else if (userCookie.indexOf('\n') > -1) {
			console.log('cookie使用回车符分割')
            let userCookies = userCookie.split('\n')
            for(let i=0; i<userCookies.length; i++) {
                userCookieArr.push(replaceCookie(userCookies[i]))
            }
		}else {
            userCookieArr.push(replaceCookie(userCookie))
        }
    } else {
        console.log('未找到userCookie')
        return false
    }
    if(userCookieArr.length == 0) {
        console.log('未找到有效的userCookie')
        return false
    }
    
    console.log(`共找到${userCookieArr.length}个用户`)
    return true
}
function replaceCookie(userCookieItem) {
    let replaceItem = ''
    let zqkey = ''
    let zqkey_id = ''
    if(userCookieItem.indexOf('zqkey=') > -1) {
        zqkey = userCookieItem.match(/zqkey=([\w-]+)/)[1]
    } else if (userCookieItem.indexOf('cookie=') > -1) {
        zqkey = userCookieItem.match(/cookie=([\w-]+)/)[1]
    }
    if(userCookieItem.indexOf('zqkey_id=') > -1) {
        zqkey_id = userCookieItem.match(/zqkey_id=([\w-]+)/)[1]
    } else if (userCookieItem.indexOf('cookie_id=') > -1) {
        zqkey_id = userCookieItem.match(/cookie_id=([\w-]+)/)[1]
    }
    if(userCookieItem.indexOf('uid=') > -1) {
        uid = userCookieItem.match(/uid=([\w-]+)/)[1]
    }
    
    replaceItem = `uid=${uid}&version_code=63&zqkey=${zqkey}&zqkey_id=${zqkey_id}`
    
    return replaceItem
}

//通知
async function showmsg() {
    
    notifyBody = jsname + "运行通知\n\n" + notifyStr
    
    if (notifyFlag != 1) {
        console.log(notifyBody);
    }

    if (notifyFlag == 1) {
        //$.msg(notifyBody);
		console.log(notifyBody);
        if($.isNode()){await notify.sendNotify($.name, notifyBody );}
    }
}

async function querySignStatus(userIdx) {
    let caller = printCaller()
    let url = 'https://kandian.wkandian.com/v17/NewTask/getSign.json?'+userCookieArr[userIdx]
    let urlObject = PopulateGetUrl(url)
    await HttpGet(urlObject,caller)
    let result = httpResult;
    if(!result) return
    //console.log(`${JSON.stringify(result)}`);
	if(result.success == true) {
		let name = result.items.user.nickname ? result.items.user.nickname : ''
        nickname.push(name)
	}
}
//提现信息
async function GetOrderList(userIdx) {
    let caller = printCaller()
    let rndtime = Math.floor(new Date().getTime())
    //let tmpCk = userCookieArr[userIdx].replace(/zqkey/g,'cookie')
    let body = 'status=all&' + tmpCk
    let url = 'https://kandian.youth.cn/withdraw/getOrderList?_=' + rndtime
    let urlObject = PopulatePostUrl(url,body)
    urlObject.headers.Host = 'kandian.youth.cn'
    await HttpPost(urlObject,caller)
    let result = httpResult;
    if(!result) return
    
    if(result.status == 1) {
		let desctime='',desc=''
		if (result.data[0]&&result.data[0].add_time_str){
			desctime=result.data[0].add_time_str?result.data[0].add_time_str.substr(0,16):''
			desc=result.data[0].description?result.data[0].description:''
		}
		notifyStr += `账户${userIdx+1} ${nickname[userIdx]}: `
		notifyStr += `${desctime} ${desc}\n`
        for(let item of result.data) {
            if(item.description) {
                //console.log(`提现风险信息：${item.add_time_str} ${item.description}`)
            }
			if (item.status == 0){
				notifyStr += `${item.add_time_str.substr(0,16)} 提现未入账 ${item.money} \n`;
			}
			if (item.status == 2){
				notifyStr += `${item.add_time_str.substr(0,16)} 提现失败 ${item.money} \n`;
			}			
        }
    } else {
        console.log(`查询风险信息失败`)
    }
}
async function getBalance() {
    let caller = printCaller()
    let tmpCk = userCookieArr[userIdx]
    tmpCk = tmpCk.replace(/zqkey/g,'cookie')
    let url = 'https://kandian.wkandian.com/wap/user/balance?' + tmpCk
    let urlObject = PopulateGetUrl(url)
    await HttpGet(urlObject,caller)
    let result = httpResult;
    if(!result) return
    
    if(result.status == 0) {
		console.log(`\n账户${userIdx+1} ${nickname[userIdx]}: `)
        notifyStr += `\n账户${userIdx+1} ${nickname[userIdx]}: \n`
        notifyStr += `【青豆总数】：${Math.round(result.user.score/100)/100}元\n`
        notifyStr += `【今日收益】：${Math.round(result.user.today_score/100)/100}元\n`
		notifyStr += `【历史收益】：${Math.round(result.user.total_score/100)/100}元\n`
		let zqstatus=result.user.status<1?'异常':'正常'
		notifyStr += `【账号状态】：${zqstatus}\n\n`
        for(let i=0; i<result.history.length; i++) {
            let rewardItem = result.history[i]
            if(rewardItem.newdate.indexOf('今日收益') > -1) {
                for(let j=0; j<rewardItem.group.length; j++) {
                    let groupItem = rewardItem.group[j]
                    console.log(`----【${groupItem.name}】：${groupItem.money}`)
                }
                break;
            }
        }
		console.log(`【今日收益】：${Math.round(result.user.today_score/100)/100}元`)
		console.log(`【青豆总数】：${Math.round(result.user.score/100)/100}元`)
		if (withdraw_auto==1) await check_withdraw(result.user.score/10000); 
    } else {
        console.log(`查询今日收益失败：${result.msg}`)
    }	
}
async function check_withdraw(nowscore){
	let week = new Date().getDay(); 
	console.log(`余额${nowscore},提现设置${cash}`)
	if (nowscore >= parseInt(cash) ) {
	if (!cash)cash=10

	let withdrawbody= encodewithdrawBody(cash)
	let cashUrl30=encodewithdrawBody(30)
	if (!withdrawbody){
		console.log(`没有找到:${cash} 对应的body`)
		return false
	}
	//if (minute<30){
		if ( week != 6 ){	//跳过周六
			//if ( (hour == 13) || (hour == 18 && week !=5)){	//跳过周五下午
				//先提30
				if (nowscore >= 30 && cashUrl30){
					console.log(`当前金额：${nowscore}，尝试提现30元`);
					notifyStr += `尝试提现30元 \n`;
					await withdraw(cashUrl30);
				}
				else if (parseInt(cash) <= 10 && nowscore > 23){
					console.log(`当前金额：${nowscore} 接近30元，自动跳过`);
					notifyStr += `当前金额接近30，跳过提现 \n`;
				}else{
					console.log(`当前金额 ${nowscore} 达到设置条件 ${cash}，---开始尝试提现`);
					notifyStr += `尝试提现${cash}元 \n`;
					await withdraw(withdrawbody);
				}
			//}
		}
	//}
	}
}
//提现
async function withdraw(withdrawbody) {
    let caller = printCaller()
    let url = 'https://kandian.wkandian.com/v5/wechat/withdraw2.json'

	if (cashtype=='alipay') url = 'https://kandian.wkandian.com/v5/alipay/withdraw.json'
    let urlObject = PopulatePostUrl(url,withdrawbody)
    await HttpPost(urlObject,caller)
    let result = httpResult;
    if(!result) return
    
    if(result.success == true) {
		otherts=true;
		//console.log(`${JSON.stringify(result)}\n`);
		notifyStr += `${result.message}🎉\n`;
		console.log(`提现成功🎉`);
    } else {
        console.log(`提现失败：${JSON.stringify(result)}`)
		notifyStr += `提现失败：${result.items.text}\n`;
    }
}


////////////////////////////////////////////////////////////////////
function PopulatePostUrl(url,reqBody){
    let rndtime = Math.floor(new Date().getTime()/1000)
    let urlObject = {
        url: url,
        headers: {
            'User-Agent': 'okhttp/3.12.2',
            'Host' : 'kandian.wkandian.com',
            'device-platform' : 'android',
            'Connection' : 'keep-alive',
        },
        body: reqBody
    }
    return urlObject;
}

function PopulateGetUrl(url){
    let rndtime = Math.floor(new Date().getTime()/1000)
    let urlObject = {
        url: url,
        headers: {
            'User-Agent': 'okhttp/3.12.2',
            'Host' : 'kandian.wkandian.com',
            'device-platform' : 'android',
            'Connection' : 'keep-alive',
        }
    }
    return urlObject;
}


async function HttpPost(url,caller) {
    httpResult = null
    return new Promise((resolve) => {
        $.post(url, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(caller + ": post请求失败");
                    console.log(JSON.stringify(err));
                    $.logErr(err);
                } else {
                    if (safeGet(data)) {
                        httpResult = JSON.parse(data,caller);
                        if(logDebug) console.log(httpResult);
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

async function HttpGet(url,caller) {
    httpResult = null
    return new Promise((resolve) => {
        $.get(url, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(caller + ": get请求失败");
                    console.log(JSON.stringify(err));
                    $.logErr(err);
                } else {
                    if (safeGet(data,caller)) {
                        httpResult = JSON.parse(data);
                        if(logDebug) console.log(httpResult);
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

function safeGet(data,caller) {
    try {
        if (typeof JSON.parse(data) == "object") {
            return true;
        } else {
            console.log(`Function ${caller}: 未知错误`);
            console.log(data)
        }
    } catch (e) {
        console.log(e);
        console.log(`Function ${caller}: 服务器访问数据为空，请检查自身设备网络情况`);
        return false;
    }
}

function printCaller(){
    return (new Error()).stack.split("\n")[2].trim().split(" ")[1]
}
//要写入的文件   要写入的内容       a追加|w写入（默认）|r（读取）  回调函数
function writelog(filename,model,content){
	//console.log('模式：'+model);
	fs.writeFile(filename,content,{flag:`${model}`},function (err) {
    if(err){
        return console.log(err);
    }else {
        console.log(`写入${filename}成功,模式为：${model}`);
    }
	})
}
//检查文件是否存在
function check_file_exist(filename){
	try { 
		fs.accessSync(filename, fs.constants.R_OK); 
		return true;
	} catch (err) { 
		console.error(`检测文件${filename}不存在`); 
		return false;
	}
}

function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}
function UrlParamHash(url) {
    var params = [], h;
	//var hash = url.slice(url.indexOf("?") + 1).split('&');

    var hash = url.split('&');
    for (var i = 0; i < hash.length; i++) {
        h = hash[i].split("=");
        params.push(h[0]);
        params[h[0]] = h[1];
    }
    return params;
}
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
