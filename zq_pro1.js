/*
测试脚本，禁止外传
多用户版本
config里面
export zqkdCookie='xxx@xxx'
ck包含uid,zqkey,zqkey_id三个变量就行
*/

const jsname = '中青看点'
const $ = Env(jsname)
let logDebug = 0
const notifyFlag = process.env.zqnotify || 0; 	//0为关闭通知，1为打开通知,默认为0
const CryptoJS = require('./crypto-js')
const hour = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).getHours();
const minute = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).getMinutes();
const week = new Date().getDay();  
const notify = $.isNode() ? require('./sendNotify') : '';


var fs = require("fs");
let notifyStr=''
let userCookie = ($.isNode() ? process.env.zqkdCookie : $.getdata('zqkdCookie')) || '';
let userCookieArr = []
let cash = ($.isNode() ? process.env.zqkdCash : $.getdata('zqkdCash')) || '1';	//提现额度
let withdraw_auto=process.env.zqkd_withdraw_auto||1	//是否打开自动提现，默认关闭

let zqbody
let usernmae="",zqcookie="";

let params

let rndtime = Math.floor(new Date().getTime()/1000)
let bodyTemplate='access=WIFI&app-version=3.5.5&app_name=zqkd_app&app_version=3.5.5&carrier=CHINA%20MOBILE&channel=c1002&device_brand=Xiaomi&device_id=57869111&device_model=MI%20MAX&device_platform=android&device_type=android&dpi=320&inner_version=202108181034&language=zh-CN&memory=1&mi=0&mobile_type=1&net_type=1&network_type=WIFI&openudid=245b140bcd95bf09&os_api=22&os_version=LMY49I&param=box_three&request_time='+rndtime+'&resolution=900x1600&rom_version=LMY49I&s_ad=SXPkPrW1Kghg%3DMcifHk8tlVniT2DcGNYCQf0Gf4IyI3ps&s_im=HUJybc31G2V0%3DctdA6WzSssxhKaYAHNn-Qg%3D%3DHA&sim=1&sm_device_id=202112201645014e6d8fd11a81c60e7f77876c4ea62c1a01f775e41eee01b3&storage=15.62&action=task_reward_action&'
let withdrawbody='access=WIFI&app-version=3.5.5&app_name=zqkd_app&app_version=3.5.5&&carrier=CHINA%20MOBILE&channel=c1002&device_brand=Xiaomi&device_id=57869111&device_model=MI%20MAX&device_platform=android&device_type=android&dpi=320&inner_version=202108181034&language=zh-CN&memory=1&mi=0&mobile_type=1&money=1&net_type=1&network_type=WIFI&openudid=245b140bcd95bf09&os_api=22&os_version=LMY49Irequest_time='+rndtime+'&resolution=900x1600&rom_version=LMY49I&s_ad=SXPkPrW1Kghg%3DMcifHk8tlVniT2DcGNYCQf0Gf4IyI3ps&s_im=HUJybc31G2V0%3DctdA6WzSssxhKaYAHNn-Qg%3D%3DHA&sim=1&sm_device_id=202112201645014e6d8fd11a81c60e7f77876c4ea62c1a01f775e41eee01b3&storage=15.62&type=2&uid=61221440&username=%E9%A3%8E%E5%B2%9A&version_code=63&'
let taskName=[
"first_share_article",
"watch_video_reward",
"new_fresh_five_video_reward",
"watch_article_reward",
"task_kankan_reward",
"box_three",
"box_six",
"box_nine",
"read_article_video_reward_five",
"beread_reward_three"
]
let rewardList = [],signrewardList = [],rewardCount = [],nickname = []
let waittime=1

var _0xodj='jsjiami.com.v6',_0xodj_=['_0xodj'],_0x4afc=[_0xodj,'\x70\x3d\x6e\x43\x57\x77\x52\x6a\x33\x65\x47\x78\x43\x77\x25\x33\x44','\x6a\x64\x76\x79\x6c\x71\x63\x68\x4a\x5a\x72\x66\x77\x30\x6f\x32\x44\x67\x41\x62\x73\x6d\x43\x47\x55\x61\x70\x46\x31\x59\x43\x68\x63','\x36\x48\x50\x6a\x53\x5a\x46\x48','\x6c\x65\x6e\x67\x74\x68','\x77\x61\x69\x74','\x63\x61\x74\x63\x68','\x6c\x6f\x67','\x6e\x61\x6d\x65','\x2c\x20\u5931\u8d25\x21\x20\u539f\u56e0\x3a\x20','\x66\x69\x6e\x61\x6c\x6c\x79','\x64\x6f\x6e\x65','\x32\x30\x32\x32\x2d\x30\x31\x2d\x31\x30\x20\x32\x33\x3a\x35\x39\x3a\x35\x39','\x72\x65\x70\x6c\x61\x63\x65','\x76\x61\x6c\x75\x65\x4f\x66','\u6b64\u811a\u672c\u5df2\u5931\u6548\x2c\u8bf7\u505c\u6b62\u4f7f\u7528','\x69\x6e\x64\x65\x78\x4f\x66','\x73\x70\x6c\x69\x74','\x70\x75\x73\x68','\x63\x6f\x6f\x6b\x69\x65\u4f7f\u7528\u56de\u8f66\u7b26\u5206\u5272','\u672a\u627e\u5230\x75\x73\x65\x72\x43\x6f\x6f\x6b\x69\x65','\u672a\u627e\u5230\u6709\u6548\u7684\x75\x73\x65\x72\x43\x6f\x6f\x6b\x69\x65','\u5171\u627e\u5230','\u4e2a\u7528\u6237','\x7a\x71\x6b\x65\x79\x3d','\x6d\x61\x74\x63\x68','\x63\x6f\x6f\x6b\x69\x65\x3d','\x7a\x71\x6b\x65\x79\x5f\x69\x64\x3d','\x63\x6f\x6f\x6b\x69\x65\x5f\x69\x64\x3d','\x75\x69\x64\x3d','\x26\x76\x65\x72\x73\x69\x6f\x6e\x5f\x63\x6f\x64\x65\x3d\x36\x33\x26\x7a\x71\x6b\x65\x79\x3d','\x26\x7a\x71\x6b\x65\x79\x5f\x69\x64\x3d','\x73\x69\x67\x6e\x5f\x72\x65\x77\x61\x72\x64\x5f\x61\x63\x74\x69\x6f\x6e','\x75\x73\x65\x72\x5f\x73\x69\x67\x6e','\x72\x65\x77\x61\x72\x64','\x73\x69\x67\x6e\x5f\x76\x69\x64\x65\x6f\x5f\x72\x65\x77\x61\x72\x64\x5f\x64\x6f\x75\x62\x6c\x65','\x73\x69\x67\x6e\x5f\x73\x65\x63\x6f\x6e\x64\x5f\x72\x65\x77\x61\x72\x64','\x64\x6f\x75\x62\x6c\x65','\x73\x69\x67\x6e\x5f\x6c\x75\x63\x6b\x79\x5f\x72\x65\x77\x61\x72\x64','\x73\x69\x67\x6e\x5f\x6c\x75\x63\x6b\x79\x5f\x72\x65\x77\x61\x72\x64\x5f\x64\x6f\x75\x62\x6c\x65','\x72\x69\x67\x68\x74\x5f\x63\x6f\x72\x6e\x65\x72\x5f\x74\x69\x6d\x65','\x74\x61\x73\x6b\x5f\x72\x65\x77\x61\x72\x64\x5f\x61\x63\x74\x69\x6f\x6e','\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d','\u672c\u8f6e\u5171\u83b7\u5f97\u4e86','\u9752\u8c46\x0a','\x74\x79\x70\x65','\x77\x61\x69\x74\x74\x69\x6d\x65','\u968f\u673a\u7b49\u5f85','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x6b\x61\x6e\x64\x69\x61\x6e\x2e\x77\x6b\x61\x6e\x64\x69\x61\x6e\x2e\x63\x6f\x6d\x2f\x76\x35\x2f\x43\x6f\x6d\x6d\x6f\x6e\x52\x65\x77\x61\x72\x64\x2f\x74\x6f\x44\x6f\x75\x62\x6c\x65\x2e\x6a\x73\x6f\x6e','\x73\x75\x63\x63\x65\x73\x73','\u9886\u53d6\u7ffb\u500d\u5956\u52b1\u6210\u529f\uff0c\u83b7\u5f97','\x69\x74\x65\x6d\x73','\x73\x63\x6f\x72\x65','\u9886\u53d6\u7ffb\u500d\u5956\u52b1\u5931\u8d25','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x6b\x61\x6e\x64\x69\x61\x6e\x2e\x77\x6b\x61\x6e\x64\x69\x61\x6e\x2e\x63\x6f\x6d\x2f\x76\x35\x2f\x43\x6f\x6d\x6d\x6f\x6e\x52\x65\x77\x61\x72\x64\x2f\x74\x6f\x47\x65\x74\x52\x65\x77\x61\x72\x64\x2e\x6a\x73\x6f\x6e','\u9886\u53d6\u4efb\u52a1\u5956\u52b1\u6210\u529f\uff0c\u83b7\u5f97','\u9886\u53d6\u4efb\u52a1\u5956\u52b1\u5931\u8d25','\x6d\x6f\x6e\x65\x79\x3d','\x26\x73\x69\x67\x6e\x3d','\x65\x6e\x63','\x48\x65\x78','\x70\x61\x72\x73\x65','\x42\x61\x73\x65\x36\x34','\x73\x74\x72\x69\x6e\x67\x69\x66\x79','\x61\x63\x74\x69\x6f\x6e\x3d','\x74\x61\x73\x6b','\x69\x6e\x64\x65\x78\x3d','\x70\x61\x72\x61\x6d\x3d','\x55\x74\x66\x38','\x44\x45\x53','\x65\x6e\x63\x72\x79\x70\x74','\x6d\x6f\x64\x65','\x43\x42\x43','\x70\x61\x64','\x50\x6b\x63\x73\x37','\x63\x69\x70\x68\x65\x72\x74\x65\x78\x74','\x74\x6f\x53\x74\x72\x69\x6e\x67','\x4d\x44\x35','\x4a\x64\x41\x6a\x6c\x7a\x65\x45\x73\x6c\x6a\x4c\x74\x6c\x69\x61\x6d\x7a\x69\x2e\x63\x6f\x6d\x2e\x76\x36\x65\x3d\x3d'];function _0x6d33(_0xf3163d,_0x3ba63b){_0xf3163d=~~'0x'['concat'](_0xf3163d['slice'](0x0));var _0x120181=_0x4afc[_0xf3163d];return _0x120181;};(function(_0x306a54,_0x519e19){var _0x57e818=0x0;for(_0x519e19=_0x306a54['shift'](_0x57e818>>0x2);_0x519e19&&_0x519e19!==(_0x306a54['pop'](_0x57e818>>0x3)+'')['replace'](/[JdAlzeElLtlze=]/g,'');_0x57e818++){_0x57e818=_0x57e818^0xc6c84;}}(_0x4afc,_0x6d33));let preBody=_0x6d33('0');let fixStr=_0x6d33('1');let keystr=_0x6d33('2');!(async()=>{if(!(await checkDate())){return;}if(!(await checkEnv())){return;}await initAccountInfo();for(userIdx=0x0;userIdx<userCookieArr[_0x6d33('3')];userIdx++){await querySignStatus(userIdx);await $[_0x6d33('4')](0x3e8);if(week==0x1&&hour<0x8){do_readdouble(userIdx);}await queryTaskList(userIdx);if(hour>=0x15)await runReward(rewardList);await getBalance();}await getStat();await showmsg();})()[_0x6d33('5')](_0x3a8192=>{$[_0x6d33('6')]('','\u274c\x20'+$[_0x6d33('7')]+_0x6d33('8')+_0x3a8192+'\x21','');})[_0x6d33('9')](()=>{$[_0x6d33('a')]();});async function checkDate(){let _0x27ea14=new Date();let _0x20b71d=_0x6d33('b');_0x20b71d=_0x20b71d[_0x6d33('c')](/-/g,'\x2f');_0x20b71d=new Date(_0x20b71d);if(_0x27ea14[_0x6d33('d')]()>_0x20b71d[_0x6d33('d')]()){console[_0x6d33('6')](_0x6d33('e'));return![];}else return!![];}async function checkEnv(){if(userCookie){if(userCookie[_0x6d33('f')]('\x40')>-0x1){let _0x3663c7=userCookie[_0x6d33('10')]('\x40');for(let _0x383a47=0x0;_0x383a47<_0x3663c7[_0x6d33('3')];_0x383a47++){userCookieArr[_0x6d33('11')](replaceCookie(_0x3663c7[_0x383a47]));}}else if(userCookie[_0x6d33('f')]('\x0a')>-0x1){console[_0x6d33('6')](_0x6d33('12'));let _0x462c6b=userCookie[_0x6d33('10')]('\x0a');for(let _0x383a47=0x0;_0x383a47<_0x462c6b[_0x6d33('3')];_0x383a47++){userCookieArr[_0x6d33('11')](replaceCookie(_0x462c6b[_0x383a47]));}}else{userCookieArr[_0x6d33('11')](replaceCookie(userCookie));}}else{console[_0x6d33('6')](_0x6d33('13'));return![];}if(userCookieArr[_0x6d33('3')]==0x0){console[_0x6d33('6')](_0x6d33('14'));return![];}console[_0x6d33('6')](_0x6d33('15')+userCookieArr[_0x6d33('3')]+_0x6d33('16'));return!![];}function replaceCookie(_0x8c320e){let _0x1fb3ae='';let _0x263850='';let _0x1ddc5e='';if(_0x8c320e[_0x6d33('f')](_0x6d33('17'))>-0x1){_0x263850=_0x8c320e[_0x6d33('18')](/zqkey=([\w-]+)/)[0x1];}else if(_0x8c320e[_0x6d33('f')](_0x6d33('19'))>-0x1){_0x263850=_0x8c320e[_0x6d33('18')](/cookie=([\w-]+)/)[0x1];}if(_0x8c320e[_0x6d33('f')](_0x6d33('1a'))>-0x1){_0x1ddc5e=_0x8c320e[_0x6d33('18')](/zqkey_id=([\w-]+)/)[0x1];}else if(_0x8c320e[_0x6d33('f')](_0x6d33('1b'))>-0x1){_0x1ddc5e=_0x8c320e[_0x6d33('18')](/cookie_id=([\w-]+)/)[0x1];}if(_0x8c320e[_0x6d33('f')](_0x6d33('1c'))>-0x1){uid=_0x8c320e[_0x6d33('18')](/uid=([\w-]+)/)[0x1];}_0x1fb3ae=_0x6d33('1c')+uid+_0x6d33('1d')+_0x263850+_0x6d33('1e')+_0x1ddc5e;return _0x1fb3ae;}async function initAccountInfo(){for(userIdx=0x0;userIdx<userCookieArr[_0x6d33('3')];userIdx++){rewardCount[_0x6d33('11')](0x0);}signrewardList[_0x6d33('11')]({'name':_0x6d33('1f'),'task':_0x6d33('20'),'type':_0x6d33('21'),'waittime':0x19});signrewardList[_0x6d33('11')]({'name':_0x6d33('22'),'task':_0x6d33('23'),'type':_0x6d33('24')});signrewardList[_0x6d33('11')]({'name':_0x6d33('1f'),'task':_0x6d33('25'),'type':_0x6d33('21'),'waittime':0x19});signrewardList[_0x6d33('11')]({'name':_0x6d33('22'),'task':_0x6d33('26'),'type':_0x6d33('24')});signrewardList[_0x6d33('11')]({'name':_0x6d33('27'),'task':'','type':_0x6d33('21')});for(let _0x2aba10=0x0;_0x2aba10<taskName[_0x6d33('3')];_0x2aba10++){rewardList[_0x6d33('11')]({'name':_0x6d33('28'),'task':taskName[_0x2aba10],'type':_0x6d33('21')});}}async function getStat(){console[_0x6d33('6')](_0x6d33('29'));for(userIdx=0x0;userIdx<userCookieArr[_0x6d33('3')];userIdx++){notifyStr+='\u8d26\u53f7'+(userIdx+0x1)+_0x6d33('2a')+rewardCount[userIdx]+_0x6d33('2b');}}async function runReward(_0x226af2){for(let _0x445415=0x0;_0x445415<_0x226af2[_0x6d33('3')];_0x445415++){let _0x34759b=await encodeUserBody(userIdx,_0x226af2[_0x445415]);if(_0x226af2[_0x445415][_0x6d33('2c')]==_0x6d33('21'))await GetReward(_0x34759b);else if(_0x226af2[_0x445415][_0x6d33('2c')]==_0x6d33('24'))await GetDouble(_0x34759b);if(_0x226af2[_0x445415][_0x6d33('2d')])waittime=_0x226af2[_0x445415][_0x6d33('2d')];else waittime=randomNum(0x2,0x3);console[_0x6d33('6')](_0x6d33('2e')+waittime+'\u79d2');await $[_0x6d33('4')](waittime*0x3e8);}}async function GetDouble(_0x12f996){let _0xa2bebd=printCaller();let _0x1b5bdf=_0x6d33('2f');let _0x2ef642=PopulatePostUrl(_0x1b5bdf,_0x12f996);await HttpPost(_0x2ef642,_0xa2bebd);let _0x5c7a1c=httpResult;if(!_0x5c7a1c)return;_0x5c7a1c[_0x6d33('30')]==!![]?(console[_0x6d33('6')]('\u7528\u6237'+(userIdx+0x1)+_0x6d33('31')+_0x5c7a1c[_0x6d33('32')][_0x6d33('33')]+'\u9752\u8c46'),rewardCount[userIdx]+=parseInt(_0x5c7a1c[_0x6d33('32')][_0x6d33('33')])):console[_0x6d33('6')]('\u7528\u6237'+(userIdx+0x1)+_0x6d33('34'));}async function GetReward(_0x3c8794){let _0x15d199=printCaller();let _0x5b75ed=_0x6d33('35');let _0x48a571=PopulatePostUrl(_0x5b75ed,_0x3c8794);await HttpPost(_0x48a571,_0x15d199);let _0x441376=httpResult;if(!_0x441376)return;_0x441376[_0x6d33('30')]==!![]?(console[_0x6d33('6')]('\u7528\u6237'+(userIdx+0x1)+_0x6d33('36')+_0x441376[_0x6d33('32')][_0x6d33('33')]+'\u9752\u8c46'),rewardCount[userIdx]+=parseInt(_0x441376[_0x6d33('32')][_0x6d33('33')])):console[_0x6d33('6')]('\u7528\u6237'+(userIdx+0x1)+_0x6d33('37'));}function encodewithdrawBody(_0x24f4ff){let _0x52a917=_0x6d33('38')+_0x24f4ff+'\x26';let _0x26c80d=userCookieArr[userIdx][_0x6d33('10')]('\x26');let _0x57ef8c=withdrawbody[_0x6d33('c')](/uid=[\w_]+/g,_0x26c80d[0x0]);_0x57ef8c=_0x57ef8c[_0x6d33('c')](/money=[\w_]+\&/g,_0x52a917);_0x57ef8c=_0x57ef8c+_0x26c80d[0x2]+'\x26'+_0x26c80d[0x3];let _0xa81481=encodeMD5Str(_0x57ef8c);_0x57ef8c=_0x57ef8c+_0x6d33('39')+_0xa81481;let _0x346bab=encryptByDESModeEBC(_0x57ef8c);let _0x232eb6=CryptoJS[_0x6d33('3a')][_0x6d33('3b')][_0x6d33('3c')](_0x346bab);let _0x502b4a=CryptoJS[_0x6d33('3a')][_0x6d33('3d')][_0x6d33('3e')](_0x232eb6);let _0x214f2b=_0x502b4a[_0x6d33('c')](/\+/g,'\x2d');let _0x8385a=_0x214f2b[_0x6d33('c')](/\//g,'\x5f');let _0x94e556=encodeURIComponent(_0x8385a);_0x94e556=preBody+_0x94e556+'\x3d\x3d';return _0x94e556;}async function encodeUserBody(_0x5da848,_0x5b7103){let _0x3c5f5a='',_0x1197b5='';_0x3c5f5a=_0x6d33('3f')+_0x5b7103[_0x6d33('7')];if(_0x5b7103[_0x6d33('40')]){if(_0x5b7103[_0x6d33('2c')]==_0x6d33('24'))_0x1197b5=_0x6d33('41')+_0x5b7103[_0x6d33('40')]+'\x26';else _0x1197b5=_0x6d33('42')+_0x5b7103[_0x6d33('40')]+'\x26';}let _0x1164d5=bodyTemplate[_0x6d33('c')](/action=[\w_]+/g,_0x3c5f5a);_0x1164d5=_0x1164d5[_0x6d33('c')](/param=[\w_]+\&/g,_0x1197b5);_0x1164d5=_0x1164d5+userCookieArr[_0x5da848];let _0x23520a=encodeMD5Str(_0x1164d5);_0x1164d5=_0x1164d5+_0x6d33('39')+_0x23520a;let _0xbd5456=encryptByDESModeEBC(_0x1164d5);let _0x55895e=CryptoJS[_0x6d33('3a')][_0x6d33('3b')][_0x6d33('3c')](_0xbd5456);let _0xd8ec30=CryptoJS[_0x6d33('3a')][_0x6d33('3d')][_0x6d33('3e')](_0x55895e);let _0x572f2c=_0xd8ec30[_0x6d33('c')](/\+/g,'\x2d');let _0x396c51=_0x572f2c[_0x6d33('c')](/\//g,'\x5f');let _0x595d15=encodeURIComponent(_0x396c51);_0x595d15=preBody+_0x595d15+'\x3d\x3d';return _0x595d15;}function encryptByDESModeEBC(_0x44b15f){var _0x3140c7=CryptoJS[_0x6d33('3a')][_0x6d33('43')][_0x6d33('3c')](keystr);var _0x3ff0b8=CryptoJS[_0x6d33('3a')][_0x6d33('43')][_0x6d33('3c')](keystr);newmessage=CryptoJS[_0x6d33('3a')][_0x6d33('43')][_0x6d33('3c')](_0x44b15f);var _0xf81d86=CryptoJS[_0x6d33('44')][_0x6d33('45')](newmessage,_0x3140c7,{'\x69\x76':_0x3ff0b8,'\x6d\x6f\x64\x65':CryptoJS[_0x6d33('46')][_0x6d33('47')],'\x70\x61\x64\x64\x69\x6e\x67':CryptoJS[_0x6d33('48')][_0x6d33('49')]});return _0xf81d86[_0x6d33('4a')][_0x6d33('4b')]();}function encodeMD5Str(_0x1b1ac0){replacedStr=decodeURIComponent(_0x1b1ac0);replacedStr=replacedStr[_0x6d33('c')](/\&/g,'');replacedStr=replacedStr[_0x6d33('c')](/\+/g,'\x20');replacedStr+=fixStr;md5Str=CryptoJS[_0x6d33('4c')](replacedStr)[_0x6d33('4b')]();return md5Str;};_0xodj='jsjiami.com.v6';

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
        notifyStr += `【青豆总数】：${Math.round(result.user.score/100)/100}\n`
        notifyStr += `【今日收益】：${Math.round(result.user.today_score/100)/100}\n`
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
		console.log(`【今日收益】：${Math.round(result.user.today_score/100)/100}`)
		console.log(`【青豆总数】：${Math.round(result.user.score/100)/100}`)
		if (withdraw_auto==1)
			await check_withdraw(result.user.score/10000); 
    } else {
        console.log(`查询今日收益失败：${result.msg}`)
    }	
}
async function check_withdraw(nowscore){
	let week = new Date().getDay(); 
	console.log(`余额${nowscore},提现设置${cash}`)
	if (nowscore >= parseInt(cash) ) {
	if (!cash)cash=1

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
async function querySignStatus(userIdx) {
    let caller = printCaller()
    let url = 'https://kandian.wkandian.com/v17/NewTask/getSign.json?'+userCookieArr[userIdx]
    let urlObject = PopulateGetUrl(url)
    await HttpGet(urlObject,caller)
    let result = httpResult;
    if(!result) return
    //console.log(`${JSON.stringify(result)}`);
	if(result.success == true) {
		let score=result.items.sign_score?result.items.sign_score:0
		let name = result.items.user.nickname ? result.items.user.nickname : ''
        nickname.push(name)
		if (result.items && result.items.is_sign==false){
			console.log(`\n【签到】用户${userIdx+1}未签到\n今日签到奖励${score}---------去签到`)
			await runReward(signrewardList)		
		}else console.log(`\n【签到】用户${userIdx+1}已签到`)
	}
}
async function queryTaskList(userIdx) {
    let caller = printCaller()
    let url = 'https://kandian.wkandian.com/v17/NewTask/getTaskList.json?'+userCookieArr[userIdx]
    let urlObject = PopulateGetUrl(url)
    await HttpGet(urlObject,caller)
    let result = httpResult;
    if(!result) return
    //console.log(`${JSON.stringify(result)}`);
    
    if(result.success == true) {
		//查询福利视频任务状态
		if(Array.isArray(result.items.daily)) {
			//console.log(`${JSON.stringify(result.items.daily)}`);
            for(let i=0; i<result.items.daily.length; i++) {
                let dailyItem = result.items.daily[i]
				if (dailyItem.title === `阅读5分钟`){
					if (dailyItem.status == 1 ) {
						console.log(`【任务】${dailyItem.title}--已完成，开始领取奖励`)
						await do_screward('5')
					}else if (dailyItem.status == 2 ) console.log(`【任务】用户${userIdx+1}${dailyItem.desc}--已完成，奖励已领`)
					else console.log(`【任务】${dailyItem.title}--阅读${dailyItem.title_num}/${dailyItem.title_total}`)
				}
				if (dailyItem.title === `阅读60分钟`){
					if (dailyItem.status == 666 ) {
						console.log(`【任务】${dailyItem.title}--已完成，开始领取奖励`)
						await do_screward('60')
					}else if (dailyItem.status == 2 ) console.log(`【任务】用户${userIdx+1}${dailyItem.desc}--已完成，奖励已领`)
					else console.log(`【任务】${dailyItem.title}--阅读${dailyItem.title_num}/${dailyItem.title_total}`)
				}
            }
        }
    } else {
        console.log(`\n任务页面查询失败：${result.msg}`)
    }
}
//阅读翻倍，周一申请
async function do_readdouble(userIdx) {
	rndtime = Math.floor(new Date().getTime())
    let caller = printCaller()
    let url = 'https://kandian.wkandian.com/v17/NewTask/setJoinTaskPromotion.json?' + userCookieArr[userIdx] + '&request_time=' + rndtime;
    let urlObject = PopulateGetUrl(url)
    await HttpGet(urlObject,caller)
    let result = httpResult;
    if(!result) return
	//console.log(weekstr);
	console.log(`用户${userIdx+1}尝试申请阅读翻倍`);
  
	if(result.success == true){
		console.log('🎉阅读翻倍:'+result.message);
		notifyStr += `用户${userIdx+1}申请阅读翻倍:${result.message}🎉\n`;
		otherts=true;
	}else{
		console.log('翻倍失败:'+result.message);
		notifyStr += `用户${userIdx+1}阅读翻倍失败:${result.message}\n`;
	}
} 
async function do_screward(rewardtype) {
	rndtime = Math.floor(new Date().getTime())
	let uid = userCookieArr[userIdx].match(/uid=([\w-]+)/)[1]
	let bodydata =`request_time=${rndtime}&reward_type=${rewardtype}&uid=${uid}`;
	let caller = printCaller()
    let url = 'https://kandian.wkandian.com/v17/Ad/getReward.json'
    let urlObject = PopulatePostUrl(url,bodydata)
    await HttpPost(urlObject,caller)
    let result = httpResult;
    if(!result) return 	

	if (result.success == true) {
		console.log(`用户${userIdx+1}领取${rewardtype}分钟时长奖励成功，获得 ${result.items.score} 青豆！`)
		rewardCount[userIdx] += parseInt(result.items.score)
	} else {
		console.log(`用户${userIdx+1}领取${rewardtype}分钟时长奖励失败:${JSON.stringify(result)}\n`)
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
