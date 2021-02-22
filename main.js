(()=>{"use strict";function e(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function t(t){e(1,arguments);var n=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===n?new Date(t.getTime()):"number"==typeof t||"[object Number]"===n?new Date(t):("string"!=typeof t&&"[object String]"!==n||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function n(n){e(1,arguments);var a=t(n);return!isNaN(a)}var a={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function r(e){return function(t){var n=t||{},a=n.width?String(n.width):e.defaultWidth;return e.formats[a]||e.formats[e.defaultWidth]}}var o,i={date:r({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:r({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:r({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},s={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function u(e){return function(t,n){var a,r=n||{};if("formatting"===(r.context?String(r.context):"standalone")&&e.formattingValues){var o=e.defaultFormattingWidth||e.defaultWidth,i=r.width?String(r.width):o;a=e.formattingValues[i]||e.formattingValues[o]}else{var s=e.defaultWidth,u=r.width?String(r.width):e.defaultWidth;a=e.values[u]||e.values[s]}return a[e.argumentCallback?e.argumentCallback(t):t]}}function c(e){return function(t,n){var a=String(t),r=n||{},o=r.width,i=o&&e.matchPatterns[o]||e.matchPatterns[e.defaultMatchWidth],s=a.match(i);if(!s)return null;var u,c=s[0],l=o&&e.parsePatterns[o]||e.parsePatterns[e.defaultParseWidth];return u="[object Array]"===Object.prototype.toString.call(l)?function(e,t){for(var n=0;n<e.length;n++)if(e[n].test(c))return n}(l):function(e,t){for(var n in e)if(e.hasOwnProperty(n)&&e[n].test(c))return n}(l),u=e.valueCallback?e.valueCallback(u):u,{value:u=r.valueCallback?r.valueCallback(u):u,rest:a.slice(c.length)}}}const l={code:"en-US",formatDistance:function(e,t,n){var r;return n=n||{},r="string"==typeof a[e]?a[e]:1===t?a[e].one:a[e].other.replace("{{count}}",t),n.addSuffix?n.comparison>0?"in "+r:r+" ago":r},formatLong:i,formatRelative:function(e,t,n,a){return s[e]},localize:{ordinalNumber:function(e,t){var n=Number(e),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:u({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:u({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(e){return Number(e)-1}}),month:u({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:u({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:u({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(o={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}},function(e,t){var n=String(e),a=t||{},r=n.match(o.matchPattern);if(!r)return null;var i=r[0],s=n.match(o.parsePattern);if(!s)return null;var u=o.valueCallback?o.valueCallback(s[0]):s[0];return{value:u=a.valueCallback?a.valueCallback(u):u,rest:n.slice(i.length)}}),era:c({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:c({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:c({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:c({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:c({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function d(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function g(n,a){e(2,arguments);var r=t(n).getTime(),o=d(a);return new Date(r+o)}function h(t,n){e(2,arguments);var a=d(n);return g(t,-a)}function m(e,t){for(var n=e<0?"-":"",a=Math.abs(e).toString();a.length<t;)a="0"+a;return n+a}const f=function(e,t){var n=e.getUTCFullYear(),a=n>0?n:1-n;return m("yy"===t?a%100:a,t.length)},w=function(e,t){var n=e.getUTCMonth();return"M"===t?String(n+1):m(n+1,2)},v=function(e,t){return m(e.getUTCDate(),t.length)},y=function(e,t){return m(e.getUTCHours()%12||12,t.length)},b=function(e,t){return m(e.getUTCHours(),t.length)},p=function(e,t){return m(e.getUTCMinutes(),t.length)},T=function(e,t){return m(e.getUTCSeconds(),t.length)},k=function(e,t){var n=t.length,a=e.getUTCMilliseconds();return m(Math.floor(a*Math.pow(10,n-3)),t.length)};var D=864e5;function C(n){e(1,arguments);var a=1,r=t(n),o=r.getUTCDay(),i=(o<a?7:0)+o-a;return r.setUTCDate(r.getUTCDate()-i),r.setUTCHours(0,0,0,0),r}function M(n){e(1,arguments);var a=t(n),r=a.getUTCFullYear(),o=new Date(0);o.setUTCFullYear(r+1,0,4),o.setUTCHours(0,0,0,0);var i=C(o),s=new Date(0);s.setUTCFullYear(r,0,4),s.setUTCHours(0,0,0,0);var u=C(s);return a.getTime()>=i.getTime()?r+1:a.getTime()>=u.getTime()?r:r-1}function S(t){e(1,arguments);var n=M(t),a=new Date(0);a.setUTCFullYear(n,0,4),a.setUTCHours(0,0,0,0);var r=C(a);return r}var P=6048e5;function x(n,a){e(1,arguments);var r=a||{},o=r.locale,i=o&&o.options&&o.options.weekStartsOn,s=null==i?0:d(i),u=null==r.weekStartsOn?s:d(r.weekStartsOn);if(!(u>=0&&u<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var c=t(n),l=c.getUTCDay(),g=(l<u?7:0)+l-u;return c.setUTCDate(c.getUTCDate()-g),c.setUTCHours(0,0,0,0),c}function U(n,a){e(1,arguments);var r=t(n,a),o=r.getUTCFullYear(),i=a||{},s=i.locale,u=s&&s.options&&s.options.firstWeekContainsDate,c=null==u?1:d(u),l=null==i.firstWeekContainsDate?c:d(i.firstWeekContainsDate);if(!(l>=1&&l<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var g=new Date(0);g.setUTCFullYear(o+1,0,l),g.setUTCHours(0,0,0,0);var h=x(g,a),m=new Date(0);m.setUTCFullYear(o,0,l),m.setUTCHours(0,0,0,0);var f=x(m,a);return r.getTime()>=h.getTime()?o+1:r.getTime()>=f.getTime()?o:o-1}function E(t,n){e(1,arguments);var a=n||{},r=a.locale,o=r&&r.options&&r.options.firstWeekContainsDate,i=null==o?1:d(o),s=null==a.firstWeekContainsDate?i:d(a.firstWeekContainsDate),u=U(t,n),c=new Date(0);c.setUTCFullYear(u,0,s),c.setUTCHours(0,0,0,0);var l=x(c,n);return l}var L=6048e5;function q(e,t){var n=e>0?"-":"+",a=Math.abs(e),r=Math.floor(a/60),o=a%60;if(0===o)return n+String(r);var i=t||"";return n+String(r)+i+m(o,2)}function N(e,t){return e%60==0?(e>0?"-":"+")+m(Math.abs(e)/60,2):j(e,t)}function j(e,t){var n=t||"",a=e>0?"-":"+",r=Math.abs(e);return a+m(Math.floor(r/60),2)+n+m(r%60,2)}const W={G:function(e,t,n){var a=e.getUTCFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return n.era(a,{width:"abbreviated"});case"GGGGG":return n.era(a,{width:"narrow"});case"GGGG":default:return n.era(a,{width:"wide"})}},y:function(e,t,n){if("yo"===t){var a=e.getUTCFullYear(),r=a>0?a:1-a;return n.ordinalNumber(r,{unit:"year"})}return f(e,t)},Y:function(e,t,n,a){var r=U(e,a),o=r>0?r:1-r;return"YY"===t?m(o%100,2):"Yo"===t?n.ordinalNumber(o,{unit:"year"}):m(o,t.length)},R:function(e,t){return m(M(e),t.length)},u:function(e,t){return m(e.getUTCFullYear(),t.length)},Q:function(e,t,n){var a=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"Q":return String(a);case"QQ":return m(a,2);case"Qo":return n.ordinalNumber(a,{unit:"quarter"});case"QQQ":return n.quarter(a,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(a,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(a,{width:"wide",context:"formatting"})}},q:function(e,t,n){var a=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"q":return String(a);case"qq":return m(a,2);case"qo":return n.ordinalNumber(a,{unit:"quarter"});case"qqq":return n.quarter(a,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(a,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(a,{width:"wide",context:"standalone"})}},M:function(e,t,n){var a=e.getUTCMonth();switch(t){case"M":case"MM":return w(e,t);case"Mo":return n.ordinalNumber(a+1,{unit:"month"});case"MMM":return n.month(a,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(a,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(a,{width:"wide",context:"formatting"})}},L:function(e,t,n){var a=e.getUTCMonth();switch(t){case"L":return String(a+1);case"LL":return m(a+1,2);case"Lo":return n.ordinalNumber(a+1,{unit:"month"});case"LLL":return n.month(a,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(a,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(a,{width:"wide",context:"standalone"})}},w:function(n,a,r,o){var i=function(n,a){e(1,arguments);var r=t(n),o=x(r,a).getTime()-E(r,a).getTime();return Math.round(o/L)+1}(n,o);return"wo"===a?r.ordinalNumber(i,{unit:"week"}):m(i,a.length)},I:function(n,a,r){var o=function(n){e(1,arguments);var a=t(n),r=C(a).getTime()-S(a).getTime();return Math.round(r/P)+1}(n);return"Io"===a?r.ordinalNumber(o,{unit:"week"}):m(o,a.length)},d:function(e,t,n){return"do"===t?n.ordinalNumber(e.getUTCDate(),{unit:"date"}):v(e,t)},D:function(n,a,r){var o=function(n){e(1,arguments);var a=t(n),r=a.getTime();a.setUTCMonth(0,1),a.setUTCHours(0,0,0,0);var o=a.getTime(),i=r-o;return Math.floor(i/D)+1}(n);return"Do"===a?r.ordinalNumber(o,{unit:"dayOfYear"}):m(o,a.length)},E:function(e,t,n){var a=e.getUTCDay();switch(t){case"E":case"EE":case"EEE":return n.day(a,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(a,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(a,{width:"short",context:"formatting"});case"EEEE":default:return n.day(a,{width:"wide",context:"formatting"})}},e:function(e,t,n,a){var r=e.getUTCDay(),o=(r-a.weekStartsOn+8)%7||7;switch(t){case"e":return String(o);case"ee":return m(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(r,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(r,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(r,{width:"short",context:"formatting"});case"eeee":default:return n.day(r,{width:"wide",context:"formatting"})}},c:function(e,t,n,a){var r=e.getUTCDay(),o=(r-a.weekStartsOn+8)%7||7;switch(t){case"c":return String(o);case"cc":return m(o,t.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(r,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(r,{width:"narrow",context:"standalone"});case"cccccc":return n.day(r,{width:"short",context:"standalone"});case"cccc":default:return n.day(r,{width:"wide",context:"standalone"})}},i:function(e,t,n){var a=e.getUTCDay(),r=0===a?7:a;switch(t){case"i":return String(r);case"ii":return m(r,t.length);case"io":return n.ordinalNumber(r,{unit:"day"});case"iii":return n.day(a,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(a,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(a,{width:"short",context:"formatting"});case"iiii":default:return n.day(a,{width:"wide",context:"formatting"})}},a:function(e,t,n){var a=e.getUTCHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(e,t,n){var a,r=e.getUTCHours();switch(a=12===r?"noon":0===r?"midnight":r/12>=1?"pm":"am",t){case"b":case"bb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},B:function(e,t,n){var a,r=e.getUTCHours();switch(a=r>=17?"evening":r>=12?"afternoon":r>=4?"morning":"night",t){case"B":case"BB":case"BBB":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},h:function(e,t,n){if("ho"===t){var a=e.getUTCHours()%12;return 0===a&&(a=12),n.ordinalNumber(a,{unit:"hour"})}return y(e,t)},H:function(e,t,n){return"Ho"===t?n.ordinalNumber(e.getUTCHours(),{unit:"hour"}):b(e,t)},K:function(e,t,n){var a=e.getUTCHours()%12;return"Ko"===t?n.ordinalNumber(a,{unit:"hour"}):m(a,t.length)},k:function(e,t,n){var a=e.getUTCHours();return 0===a&&(a=24),"ko"===t?n.ordinalNumber(a,{unit:"hour"}):m(a,t.length)},m:function(e,t,n){return"mo"===t?n.ordinalNumber(e.getUTCMinutes(),{unit:"minute"}):p(e,t)},s:function(e,t,n){return"so"===t?n.ordinalNumber(e.getUTCSeconds(),{unit:"second"}):T(e,t)},S:function(e,t){return k(e,t)},X:function(e,t,n,a){var r=(a._originalDate||e).getTimezoneOffset();if(0===r)return"Z";switch(t){case"X":return N(r);case"XXXX":case"XX":return j(r);case"XXXXX":case"XXX":default:return j(r,":")}},x:function(e,t,n,a){var r=(a._originalDate||e).getTimezoneOffset();switch(t){case"x":return N(r);case"xxxx":case"xx":return j(r);case"xxxxx":case"xxx":default:return j(r,":")}},O:function(e,t,n,a){var r=(a._originalDate||e).getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+q(r,":");case"OOOO":default:return"GMT"+j(r,":")}},z:function(e,t,n,a){var r=(a._originalDate||e).getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+q(r,":");case"zzzz":default:return"GMT"+j(r,":")}},t:function(e,t,n,a){var r=a._originalDate||e;return m(Math.floor(r.getTime()/1e3),t.length)},T:function(e,t,n,a){return m((a._originalDate||e).getTime(),t.length)}};function O(e,t){switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});case"PPPP":default:return t.date({width:"full"})}}function Y(e,t){switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});case"pppp":default:return t.time({width:"full"})}}const H={p:Y,P:function(e,t){var n,a=e.match(/(P+)(p+)?/),r=a[1],o=a[2];if(!o)return O(e,t);switch(r){case"P":n=t.dateTime({width:"short"});break;case"PP":n=t.dateTime({width:"medium"});break;case"PPP":n=t.dateTime({width:"long"});break;case"PPPP":default:n=t.dateTime({width:"full"})}return n.replace("{{date}}",O(r,t)).replace("{{time}}",Y(o,t))}};var I=6e4;function B(e){return e.getTime()%I}function z(e){var t=new Date(e.getTime()),n=Math.ceil(t.getTimezoneOffset());t.setSeconds(0,0);var a=n>0?(I+B(t))%I:B(t);return n*I+a}var X=["D","DD"],F=["YY","YYYY"];function R(e){return-1!==X.indexOf(e)}function Q(e){return-1!==F.indexOf(e)}function $(e,t,n){if("YYYY"===e)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("YY"===e)throw new RangeError("Use `yy` instead of `YY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("D"===e)throw new RangeError("Use `d` instead of `D` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("DD"===e)throw new RangeError("Use `dd` instead of `DD` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"))}var A,G=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,J=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,V=/^'([^]*?)'?$/,_=/''/g,K=/[a-zA-Z]/;function Z(a,r,o){e(2,arguments);var i=String(r),s=o||{},u=s.locale||l,c=u.options&&u.options.firstWeekContainsDate,g=null==c?1:d(c),m=null==s.firstWeekContainsDate?g:d(s.firstWeekContainsDate);if(!(m>=1&&m<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var f=u.options&&u.options.weekStartsOn,w=null==f?0:d(f),v=null==s.weekStartsOn?w:d(s.weekStartsOn);if(!(v>=0&&v<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!u.localize)throw new RangeError("locale must contain localize property");if(!u.formatLong)throw new RangeError("locale must contain formatLong property");var y=t(a);if(!n(y))throw new RangeError("Invalid time value");var b=z(y),p=h(y,b),T={firstWeekContainsDate:m,weekStartsOn:v,locale:u,_originalDate:y},k=i.match(J).map((function(e){var t=e[0];return"p"===t||"P"===t?(0,H[t])(e,u.formatLong,T):e})).join("").match(G).map((function(e){if("''"===e)return"'";var t=e[0];if("'"===t)return ee(e);var n=W[t];if(n)return!s.useAdditionalWeekYearTokens&&Q(e)&&$(e,r,a),!s.useAdditionalDayOfYearTokens&&R(e)&&$(e,r,a),n(p,e,u.localize,T);if(t.match(K))throw new RangeError("Format string contains an unescaped latin alphabet character `"+t+"`");return e})).join("");return k}function ee(e){return e.match(V)[1].replace(_,"'")}var te=new Uint8Array(16);function ne(){if(!A&&!(A="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return A(te)}const ae=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,re=function(e){return"string"==typeof e&&ae.test(e)};for(var oe=[],ie=0;ie<256;++ie)oe.push((ie+256).toString(16).substr(1));const se=function(e,t,n){var a=(e=e||{}).random||(e.rng||ne)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,t){n=n||0;for(var r=0;r<16;++r)t[n+r]=a[r];return t}return function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=(oe[e[t+0]]+oe[e[t+1]]+oe[e[t+2]]+oe[e[t+3]]+"-"+oe[e[t+4]]+oe[e[t+5]]+"-"+oe[e[t+6]]+oe[e[t+7]]+"-"+oe[e[t+8]]+oe[e[t+9]]+"-"+oe[e[t+10]]+oe[e[t+11]]+oe[e[t+12]]+oe[e[t+13]]+oe[e[t+14]]+oe[e[t+15]]).toLowerCase();if(!re(n))throw TypeError("Stringified UUID is invalid");return n}(a)},ue=e=>{let t=[];function n(e,t){return e.getDate()<t.getDate()?-1:e.getDate()>t.getDate()?1:0}return{getName:()=>e,setName:t=>{e=t},addTask:e=>{t.push(e)},deleteTask:e=>{t.splice(e,1)},getTasks:()=>t,getTask:e=>{},sayHello:()=>console.log("hello project"),sortTasksByDate:()=>{t.sort(n)},clearTasks:()=>{t.splice(0,t.length)}}};function ce(n,a){e(1,arguments);var r=a||{},o=r.locale,i=o&&o.options&&o.options.weekStartsOn,s=null==i?0:d(i),u=null==r.weekStartsOn?s:d(r.weekStartsOn);if(!(u>=0&&u<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var c=t(n),l=c.getDay(),g=(l<u?7:0)+l-u;return c.setDate(c.getDate()-g),c.setHours(0,0,0,0),c}function le(t,n,a){e(2,arguments);var r=ce(t,a),o=ce(n,a);return r.getTime()===o.getTime()}function de(t,n){return e(1,arguments),le(t,Date.now(),n)}const ge=e=>{e.classList.add("requiredField")},he=e=>{e.classList.remove("requiredField")},me=()=>{document.getElementById("formContainer").classList.add("hideContent")},fe=()=>{document.getElementById("projectPopupContainer").classList.add("hideContent"),document.getElementById("newProject").classList.remove("hideContent")},we=e=>{document.getElementById("projectList").innerHTML+="Inbox"==e?`<li><button class='btnProject'>\n                                    <div class='projectLeftSide'>\n                                        <i class='material-icons'>assignment</i>\n                                        <span class='projectName'>${e}</span>\n                                    </div>\n                                </button></li>`:`<li><button class='btnProject'>\n                                    <div class='projectLeftSide'>\n                                        <i class='material-icons'>assignment</i>\n                                        <span class='projectName'>${e}</span>\n                                    </div>\n                                    <i class='material-icons'>delete</i>\n                                </button></li>`},ve=()=>{const e=document.querySelector("#todoListContainer");for(;e.lastChild;)e.removeChild(e.lastChild)},ye=e=>{document.querySelector("#todoProjectTitle").innerHTML=e},be=e=>{e.sortTasksByDate(),ye(e.getName()),ve();const t=document.querySelector("#todoListContainer");e.getTasks().forEach(((e,n)=>{console.log(e.getTitle()),console.log(e.getDate()),console.log(typeof e.getDate()),console.log("index= "+n),t.innerHTML+=`<div class='task' data-uuid=${e.getUUID()}>\n                                            <div class='taskLeftSide'>\n                                                <input type='checkbox' class='taskCheckbox'>\n                                                <button class='btnTaskDetails'>\n                                                    <span class='taskTitle'>${e.getTitle()}</span>\n                                                </button>\n                                            </div>\n                                            <div class='taskRightSide'>\n                                                <span class='taskDate'>${e.getDate()}</span>\n                                                <button class='btnTaskDelete'>X</button>\n                                            </div>\n                                        </div>`}))},pe=(e,t)=>{t.clearTasks(),e.forEach((e=>{e.getTasks().forEach((e=>{t.addTask(e)}))})),t.sortTasksByDate()},Te=e=>{const t=document.querySelector("#todoListContainer");ve(),e.getTasks().forEach((e=>{(function(e){const t=Z(new Date,"MM/dd/yyyy");return console.log(t),console.log(e),t===e})(e.getDate())&&(console.log(`today! ${e.getTitle()}`),t.innerHTML+=`<div class='task' data-uuid=${e.getUUID()}>\n                                            <div class='taskLeftSide'>\n                                                <input type='checkbox' class='taskCheckbox'>\n                                                <button class='btnTaskDetails'>\n                                                    <span class='taskTitle'>${e.getTitle()}</span>\n                                                </button>\n                                            </div>\n                                            <div class='taskRightSide'>\n                                                <span class='taskDate'>${e.getDate()}</span>\n                                                <button class='btnTaskDelete'>X</button>\n                                            </div>\n                                        </div>`)}))},ke=e=>{const t=document.querySelector("#todoListContainer");ve(),e.getTasks().forEach(((e,n)=>{const a=new Date(e.getDate()),r=new Date(a.valueOf()+60*a.getTimezoneOffset()*1e3);console.log(de(r)),de(r)&&(console.log(`this week! ${e.getDate()}`),t.innerHTML+=`<div class='task' data-uuid=${e.getUUID()}>\n                                            <div class='taskLeftSide'>\n                                                <input type='checkbox' class='taskCheckbox'>\n                                                <button class='btnTaskDetails'>\n                                                    <span class='taskTitle'>${e.getTitle()}</span>\n                                                </button>\n                                            </div>\n                                            <div class='taskRightSide'>\n                                                <span class='taskDate'>${e.getDate()}</span>\n                                                <button class='btnTaskDelete'>X</button>\n                                            </div>\n                                        </div>`)}))},De=e=>{ve();const t=document.querySelector("#todoListContainer");e.getTasks().forEach(((e,n)=>{t.innerHTML+=`<div class='task' data-uuid=${e.getUUID()}>\n                                            <div class='taskLeftSide'>\n                                                <input type='checkbox' class='taskCheckbox'>\n                                                <button class='btnTaskDetails'>\n                                                    <span class='taskTitle'>${e.getTitle()}</span>\n                                                </button>\n                                            </div>\n                                            <div class='taskRightSide'>\n                                                <span class='taskDate'>${e.getDate()}</span>\n                                                <button class='btnTaskDelete'>X</button>\n                                            </div>\n                                        </div>`}))};console.log(se()),console.log(se()),console.log("hello"),(()=>{let e=[];const t=ue("Default");function n(t){let n="";return e.forEach((e=>{console.log(e),console.log(t),console.log(e.getName()+" get name"),e.getName()===t&&(n=e)})),n}const a=e=>{be(e)},r=(document.querySelectorAll(".defaultProject").forEach((n=>{console.log(n.id),n.addEventListener("click",(()=>{switch(n.id){case"default":console.log(n.id+"switch"),pe(e,t),De(t),ye(t.getName());break;case"today":console.log(n.id+"switch"),pe(e,t),Te(t),ye("Today");break;case"thisWeek":console.log(n.id+"switch"),pe(e,t),ke(t),ye("This Week")}}))})),()=>{document.querySelectorAll(".btnProject").forEach((e=>{console.log(e);const t=e.querySelector(".projectName");console.log(t.innerHTML+"inner"),e.addEventListener("click",(()=>{console.log("added"),(e=>{let t=n(e);console.log(t),document.querySelector("#todoProjectTitle").innerHTML=t.getName(),a(t)})(t.innerHTML)}))}))}),o=t=>{const n=ue(t);e.push(n)},i=(o("Inbox"),we("Inbox"),r(),()=>{(()=>{const e=document.querySelector("#taskProject");for(;e.lastChild;)e.removeChild(e.lastChild)})(),e.forEach((e=>{var t;console.log(e),t=e.getName(),document.querySelector("#taskProject").innerHTML+=`<option value=${t}>${t}</option>`}))});function s(e){return document.querySelector("#projectInputName").value===e.getName()}document.querySelector("#newProject").addEventListener("click",(()=>{document.getElementById("projectPopupContainer").classList.remove("hideContent"),document.getElementById("newProject").classList.add("hideContent"),document.getElementById("projectInputName").value=""})),document.querySelector("#projectCancelBtn").addEventListener("click",(()=>{fe()})),document.querySelector("#projectAddBtn").addEventListener("click",(()=>{const t=document.querySelector("#projectInputName");""===t.value?alert("You must include a name!"):e.find(s)||"Default"===t.value||"Today"===t.value||"This Week"===t.value?alert("You cannot have the same title!"):(o(t.value),we(t.value),r(),fe())})),document.querySelector(".newTask").addEventListener("click",(()=>{document.getElementById("formContainer").classList.remove("hideContent"),document.getElementById("formPopup").reset(),i()})),document.querySelector(".btnAddTask").addEventListener("click",(()=>{console.log("date: "+document.querySelector("#taskDueDate").value);const t=document.querySelector("#titleInput"),r=document.querySelector("#taskDueDate");r.value||t.value?r.value?t.value?(he(t),he(r),(()=>{const t=document.querySelector("#titleInput"),r=document.querySelector("#descriptionInput"),o=document.querySelector("#taskDueDate"),i=document.querySelector("#taskProject"),s=document.querySelector("#taskPriority"),u=se();console.log(o.value),console.log(u+" task UUID");const c=new Date(o.value),l=new Date(c.valueOf()+60*c.getTimezoneOffset()*1e3);console.log(Z(c,"MM/dd/yyyy")+" newDate"),console.log(Z(l,"MM/dd/yyyy")+"newDateOnly");const d=((e,t,n,a,r,o)=>({getUUID:()=>o,setUUID:e=>{o=e},getTitle:()=>e,setTitle:t=>{e=t},getDate:()=>n,setDate:e=>{n=e},getDescription:()=>t,setDescription:e=>{t=e},getPriority:()=>a,setPriority:e=>{a=e},getProject:()=>r,setProject:e=>{r=e},getStatus:()=>status,setStatus:e=>{status=e}}))(t.value,r.value,Z(l,"MM/dd/yyyy"),s.value,i.value,u);var g;console.log(d),g=d,e.forEach((e=>{g.getProject()===e.getName()&&e.addTask(g)}));let h=n(i.value);a(h)})(),me()):(console.log("empty title!"),ge(t),he(r)):(console.log("empty date!"),ge(r),he(t)):(console.log("empty date and title"),ge(r),ge(t))})),document.querySelector("#btnCloseForm").addEventListener("click",(()=>{he(titleInput),he(taskDueDate),me()})),document.body.addEventListener("click",(function(n){if("btnTaskDelete"==n.target.className){const a=document.querySelector("#todoProjectTitle");let r="";console.log("task delete"),console.log(n.target);const o=n.target.parentNode.parentNode.dataset.uuid;console.log(o),e.forEach((e=>{e.getTasks().forEach(((t,n)=>{t.getUUID()===o&&(console.log(t.getUUID()),console.log(t.getTitle()),console.log(t.getDate()),console.log(t.getProject()),console.log(e.getName()),console.log(n),e.deleteTask(n),r=e)}))})),"Default"===a.innerHTML?(pe(e,t),De(t)):"Today"===a.innerHTML?(pe(e,t),Te(t)):"This Week"===a.innerHTML?(pe(e,t),ke(t)):be(r)}}))})()})();