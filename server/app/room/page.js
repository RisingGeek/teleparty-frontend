(()=>{var e={};e.id=576,e.ids=[576],e.modules={126:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SocketMessageTypes=void 0,function(e){e.CREATE_SESSION="createSession",e.JOIN_SESSION="joinSession",e.SEND_MESSAGE="sendMessage",e.SET_TYPING_PRESENCE="setTypingPresence"}(t.SocketMessageTypes||(t.SocketMessageTypes={}))},846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},883:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,3219,23)),Promise.resolve().then(s.t.bind(s,4863,23)),Promise.resolve().then(s.t.bind(s,5155,23)),Promise.resolve().then(s.t.bind(s,802,23)),Promise.resolve().then(s.t.bind(s,9350,23)),Promise.resolve().then(s.t.bind(s,8530,23)),Promise.resolve().then(s.t.bind(s,1601,23)),Promise.resolve().then(s.t.bind(s,8921,23))},1135:()=>{},1354:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>c,metadata:()=>l});var r=s(2740),n=s(2202),a=s.n(n),o=s(4988),i=s.n(o);s(1135);let l={title:"Create Next App",description:"Generated by create next app"};function c({children:e}){return(0,r.jsx)("html",{lang:"en",children:(0,r.jsx)("body",{className:`${a().variable} ${i().variable} antialiased`,children:(0,r.jsx)("div",{className:"flex flex-col min-h-screen bg-gray-100 p-4",children:(0,r.jsxs)("div",{className:"max-w-md w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden",children:[(0,r.jsx)("div",{className:"bg-blue-600 text-white p-4",children:(0,r.jsx)("h1",{className:"text-xl font-bold",children:"Teleparty Chat"})}),e]})})})})}},1432:(e,t,s)=>{Promise.resolve().then(s.bind(s,4415))},2151:()=>{},2950:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SocketCallbackManager=void 0;class s{constructor(){this._callbackMap=new Map}makeId(){let e="";for(let t=0;t<16;t+=1)e+="0123456789abcdef"[Math.floor(16*Math.random())];return e}executeCallback(e,t){let s=this._callbackMap.get(e);s&&(s(t),this._callbackMap.delete(e))}addCallback(e){let t=this.makeId();for(;this._callbackMap.has(t);)t=this.makeId();return this._callbackMap.set(t,e),t}}t.SocketCallbackManager=s},3032:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>n});var r=s(8077);let n=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,r.fillMetadataSegment)("/teleparty-frontend",await e.params,"favicon.ico")+""}]},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3272:function(e,t,s){"use strict";var r=this&&this.__awaiter||function(e,t,s,r){return new(s||(s=Promise))(function(n,a){function o(e){try{l(r.next(e))}catch(e){a(e)}}function i(e){try{l(r.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?n(e.value):((t=e.value)instanceof s?t:new s(function(e){e(t)})).then(o,i)}l((r=r.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0}),t.TelepartyClient=void 0;let n=s(2950),a=s(126);class o{constructor(e){this._socketEventHandler=e,this._socket=new WebSocket("wss://uwstest.teleparty.com"),this._callbackManager=new n.SocketCallbackManager,this._handleSocketEvents(),this._reconnectAttempts=0}_handleSocketEvents(){this._socket.onmessage=this._onMessage.bind(this),this._socket.onclose=this._onClose.bind(this),this._socket.onerror=this._onError.bind(this),this._socket.onopen=this._onOpen.bind(this)}_onMessage(e){try{let t=JSON.parse(e.data);t.callbackId?this._callbackManager.executeCallback(t.callbackId,t.data):this._socketEventHandler.onMessage(t)}catch(e){}}_onOpen(){this._socketEventHandler.onConnectionReady()}_onClose(e){this._socketEventHandler.onClose()}_onError(e){this._socket.close()}_formatMessage(e,t,s){return{type:e,data:t,callbackId:s}}joinChatRoom(e,t,s){return r(this,void 0,void 0,function*(){let r={videoId:"0",sessionId:t,videoService:"netflix",permId:"0000000000000000",userSettings:{userIcon:s,userNickname:e}},n=yield new Promise(e=>{this.sendMessage(a.SocketMessageTypes.JOIN_SESSION,r,t=>{e(t)})});if(n.errorMessage)throw Error(n.errorMessage);return{messages:n.messages}})}createChatRoom(e,t){return r(this,void 0,void 0,function*(){let s={controlLock:!1,videoId:"0",videoDuration:0,videoService:"netflix",permId:"0000000000000000",userSettings:{userIcon:t,userNickname:e}},r=yield new Promise(e=>{this.sendMessage(a.SocketMessageTypes.CREATE_SESSION,s,t=>{e(t)})});if(r.errorMessage)throw Error(r.errorMessage);return r.sessionId})}sendMessage(e,t,s){if(1==this._socket.readyState){let r="null";s&&(r=this._callbackManager.addCallback(s));let n=this._formatMessage(e,t,r);this._socket.send(JSON.stringify(n))}else s&&s({errorMessage:"Connection isn't Ready yet."})}teardown(){try{this._socket.close(4500)}catch(e){}this._reconnectTimeOut&&clearTimeout(this._reconnectTimeOut),this._keepAliveInterval&&clearInterval(this._keepAliveInterval)}}t.TelepartyClient=o},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},3499:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>l});var r=s(5512),n=s(9334),a=s(8009),o=s(7895);let i=()=>{let e=(0,n.useSearchParams)().get("roomId"),[t,s]=(0,a.useState)([]),[i,l]=(0,a.useState)(""),[c,d]=(0,a.useState)(""),[u,m]=(0,a.useState)(!1),[h,p]=(0,a.useState)([]),[b,v]=(0,a.useState)([]),[x,g]=(0,a.useState)([]),[f,y]=(0,a.useState)(!0),[_,k]=(0,a.useState)(""),S=(0,a.useRef)(null),M=(0,a.useRef)(null),j=(0,n.useRouter)();return((0,a.useEffect)(()=>{S.current?.scrollIntoView({behavior:"smooth"})},[t]),(0,a.useEffect)(()=>{let t=new o.Ul({onConnectionReady:()=>{let t=sessionStorage.getItem("teleparty-nickname")||"";d(t),M.current?.joinChatRoom(t,e||"","userIcon"),y(!1)},onClose:()=>{console.log("Socket has been closed")},onMessage:e=>{let{type:t,data:r}=e;switch(console.log("message",e),t){case o.mw.SEND_MESSAGE:s(e=>[...e,r]);break;case"userList":let n=r.map(e=>({userId:e.socketConnectionId,userNickname:e.userSettings.userNickname,userIcon:e.userSettings.userIcon}));console.log("users",n,r),p(n);break;case o.mw.SET_TYPING_PRESENCE:v(r.usersTyping);break;case"userId":k(r.userId)}}});return M.current=t,()=>{M.current?.teardown()}},[e]),(0,a.useEffect)(()=>{console.log("type",u),M.current?.sendMessage(o.mw.SET_TYPING_PRESENCE,{typing:u})},[u]),(0,a.useEffect)(()=>{g(b.filter(e=>e!==_).map(e=>h.find(t=>t.userId===e)?.userNickname||""))},[b,h,_]),f)?(0,r.jsx)("div",{className:"flex flex-col justify-center items-center h-96",children:(0,r.jsx)("div",{className:"w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"})}):(0,r.jsxs)("div",{className:"flex flex-col h-96",children:[(0,r.jsx)("div",{className:"p-4 bg-gray-100 border-b",children:(0,r.jsxs)("div",{className:"flex justify-between items-center",children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)("h2",{className:"font-semibold text-black",children:["Room: ",e]}),(0,r.jsxs)("p",{className:"text-sm text-gray-600",children:["You: ",c]})]}),(0,r.jsx)("button",{className:"text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded cursor-pointer",onClick:()=>{M.current?.teardown(),j.replace("/")},children:"Leave Room"})]})}),(0,r.jsxs)("div",{className:"flex-1 overflow-y-auto p-4 space-y-3",children:[t.map((e,t)=>(0,r.jsx)("div",{children:(0,r.jsxs)("div",{className:`max-w-xs px-4 py-2 rounded-lg ${e.isSystemMessage?"bg-gray-200 text-gray-800":"bg-gray-300 text-gray-800"}`,children:[!e.isSystemMessage&&(0,r.jsx)("div",{className:"text-xs font-semibold mb-1",children:e.userNickname}),(0,r.jsx)("p",{children:e.isSystemMessage?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("span",{className:"font-bold",children:[e.userNickname," "]}),(0,r.jsx)("span",{children:e.body})]}):e.body}),(0,r.jsx)("div",{className:"text-xs text-right mt-1 opacity-75",children:new Date(e.timestamp).toLocaleTimeString([],{hour:"numeric",minute:"numeric"})})]})},t)),(0,r.jsx)("div",{ref:S})]}),x.length>0&&(0,r.jsx)("div",{className:"text-sm text-gray-500 italic mb-2 pl-4",children:1===x.length?`${x[0]} is typing...`:`${Array.from(x).join(", ")} are typing...`}),(0,r.jsx)("div",{className:"p-4 border-t",children:(0,r.jsxs)("div",{className:"flex space-x-2",children:[(0,r.jsx)("input",{type:"text",value:i,onChange:e=>{u||(m(!0),setTimeout(()=>{m(!1)},3e3)),l(e.target.value)},className:"flex-1 p-2 border rounded text-black",placeholder:"Type a message..."}),(0,r.jsx)("button",{onClick:e=>{e.preventDefault();let t=i.trim();t&&(m(!1),M.current?.sendMessage(o.mw.SEND_MESSAGE,{body:t}),l(""))},className:"bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer",children:"Send"})]})})]})},l=()=>(0,r.jsx)(a.Suspense,{children:(0,r.jsx)(i,{})})},3873:e=>{"use strict";e.exports=require("path")},4415:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>r});let r=(0,s(6760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/home/bhavay/Documents/personal/teleparty-frontend/src/app/room/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/bhavay/Documents/personal/teleparty-frontend/src/app/room/page.tsx","default")},4684:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>o.a,__next_app__:()=>u,pages:()=>d,routeModule:()=>m,tree:()=>c});var r=s(260),n=s(8203),a=s(5155),o=s.n(a),i=s(7292),l={};for(let e in i)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>i[e]);s.d(t,l);let c={children:["",{children:["room",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,4415)),"/home/bhavay/Documents/personal/teleparty-frontend/src/app/room/page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,3032))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(s.bind(s,1354)),"/home/bhavay/Documents/personal/teleparty-frontend/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,9937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(s.t.bind(s,9116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(s.t.bind(s,1485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,3032))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]}.children,d=["/home/bhavay/Documents/personal/teleparty-frontend/src/app/room/page.tsx"],u={require:s,loadChunk:()=>Promise.resolve()},m=new r.AppPageRouteModule({definition:{kind:n.RouteKind.APP_PAGE,page:"/room/page",pathname:"/room",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},6816:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,6959,23)),Promise.resolve().then(s.t.bind(s,3875,23)),Promise.resolve().then(s.t.bind(s,8903,23)),Promise.resolve().then(s.t.bind(s,7174,23)),Promise.resolve().then(s.t.bind(s,4178,23)),Promise.resolve().then(s.t.bind(s,7190,23)),Promise.resolve().then(s.t.bind(s,8429,23)),Promise.resolve().then(s.t.bind(s,1365,23))},7895:(e,t,s)=>{"use strict";t.Ul=t.mw=void 0;let r=s(126);Object.defineProperty(t,"mw",{enumerable:!0,get:function(){return r.SocketMessageTypes}});let n=s(3272);Object.defineProperty(t,"Ul",{enumerable:!0,get:function(){return n.TelepartyClient}})},8280:(e,t,s)=>{Promise.resolve().then(s.bind(s,3499))},9023:()=>{},9121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},9551:e=>{"use strict";e.exports=require("url")}};var t=require("../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[638,983,720],()=>s(4684));module.exports=r})();