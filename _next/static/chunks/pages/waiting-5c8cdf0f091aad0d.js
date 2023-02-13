(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[440],{2329:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/waiting",function(){return t(7720)}])},7720:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return ex}});var a,r,i,s,o,c=t(5893),l=t(2720),u=t(5409),d=t(7433),m=t(603),x=t(7294),p=t(1248),h=t(1163),g=t(7357),f=t(4184),j=t.n(f),N=t(6041),v=t(5937),Z=t(9280),_=t(9739),k=t(3796),W=t(8122),w=t(5861),C=t(3366),S=t(7462),B=t(6010),b=t(9766),y=t(4780),E=t(4867),M=t(182);let T=(0,M.ZP)();var P=t(5149),R=t(9707),F=t(6500),G=t(5408),D=t(8700);let L=["component","direction","spacing","divider","children","className"],O=(0,F.Z)(),z=T("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,n)=>n.root});function V(e){return(0,P.Z)({props:e,name:"MuiStack",defaultTheme:O})}let $=e=>({row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"})[e],X=({ownerState:e,theme:n})=>{let t=(0,S.Z)({display:"flex",flexDirection:"column"},(0,G.k9)({theme:n},(0,G.P$)({values:e.direction,breakpoints:n.breakpoints.values}),e=>({flexDirection:e})));if(e.spacing){let a=(0,D.hB)(n),r=Object.keys(n.breakpoints.values).reduce((n,t)=>(("object"==typeof e.spacing&&null!=e.spacing[t]||"object"==typeof e.direction&&null!=e.direction[t])&&(n[t]=!0),n),{}),i=(0,G.P$)({values:e.direction,base:r}),s=(0,G.P$)({values:e.spacing,base:r});"object"==typeof i&&Object.keys(i).forEach((e,n,t)=>{let a=i[e];if(!a){let a=n>0?i[t[n-1]]:"column";i[e]=a}});let o=(n,t)=>({"& > :not(style) + :not(style)":{margin:0,[`margin${$(t?i[t]:e.direction)}`]:(0,D.NA)(a,n)}});t=(0,b.Z)(t,(0,G.k9)({theme:n},s,o))}return(0,G.dt)(n.breakpoints,t)},Y=function(e={}){let{createStyledComponent:n=z,useThemeProps:t=V,componentName:a="MuiStack"}=e,r=()=>(0,y.Z)({root:["root"]},e=>(0,E.Z)(a,e),{}),i=n(X),s=x.forwardRef(function(e,n){let a=t(e),s=(0,R.Z)(a),{component:o="div",direction:l="column",spacing:u=0,divider:d,children:m,className:p}=s,h=(0,C.Z)(s,L),g=r();return(0,c.jsx)(i,(0,S.Z)({as:o,ownerState:{direction:l,spacing:u},ref:n,className:(0,B.Z)(g.root,p)},h,{children:d?function(e,n){let t=x.Children.toArray(e).filter(Boolean);return t.reduce((e,a,r)=>(e.push(a),r<t.length-1&&e.push(x.cloneElement(n,{key:`separator-${r}`})),e),[])}(m,d):m}))});return s}();var A=t(7506),I=t.n(A);function H(e){var n=e.reason;return(0,c.jsx)(g.Z,{"data-reason":n||null,className:j()(I().container,I().Empty)})}function K(e){var n=e.cancelWaiting,t=e.isWaiting;return(0,c.jsxs)(g.Z,{className:j()(I().container,I().WaitingStart),children:[(0,c.jsx)(w.Z,{variant:"h5",gutterBottom:!0,children:"Старт игры"}),(0,c.jsx)(Y,{className:I().actions,spacing:2,direction:"row",children:t&&!!n&&(0,c.jsx)(W.Z,{className:"FixMuiButton",onClick:n,variant:"contained",children:(0,c.jsx)("span",{className:"Text",children:"Отменить"})})})]})}function q(e){var n=e.cancelWaiting,t=e.isWaiting;return(0,c.jsxs)(g.Z,{className:j()(I().container,I().WaitingMulti),children:[(0,c.jsx)(w.Z,{variant:"h5",gutterBottom:!0,children:"Ищем соперника"}),(0,c.jsx)(w.Z,{variant:"body1",gutterBottom:!0,children:"Это может занять несколько минут."}),(0,c.jsx)(Y,{className:I().actions,spacing:2,direction:"row",children:t&&!!n&&(0,c.jsx)(W.Z,{className:"FixMuiButton",onClick:n,variant:"contained",children:(0,c.jsx)("span",{className:"Text",children:"Отменить"})})})]})}function Q(e){var n=e.cancelWaiting,t=e.isWaiting;return(0,c.jsxs)(g.Z,{className:j()(I().container,I().WaitingSingle),children:[(0,c.jsx)(w.Z,{variant:"h5",gutterBottom:!0,children:"Запуск игры"}),(0,c.jsx)(Y,{className:I().actions,spacing:2,direction:"row",children:t&&!!n&&(0,c.jsx)(W.Z,{className:"FixMuiButton",onClick:n,variant:"contained",children:(0,c.jsx)("span",{className:"Text",children:"Отменить"})})})]})}function U(e){var n=e.onSingleClick,t=e.goToStartPage;return(0,c.jsxs)(g.Z,{className:j()(I().container,I().WaitingFailed),children:[(0,c.jsx)(w.Z,{variant:"h5",gutterBottom:!0,children:"Похоже, сейчас нет подходщих соперников"}),(0,c.jsx)(w.Z,{variant:"body1",gutterBottom:!0,children:"Вы можете сыграть самостоятельно и подняться в рейтинге"}),(0,c.jsxs)(Y,{className:I().actions,spacing:2,direction:"row",children:[!!n&&(0,c.jsx)(W.Z,{className:"FixMuiButton",onClick:n,variant:"contained",children:(0,c.jsx)("span",{className:"Text",children:"Турнир для одного"})}),!!t&&(0,c.jsx)(W.Z,{className:"FixMuiButton",onClick:t,children:(0,c.jsx)("span",{className:"Text",children:"Начать сначала"})})]})]})}function J(e){var n=e.goToStartPage;return(0,c.jsxs)(g.Z,{className:j()(I().container,I().WasCancelled),children:[(0,c.jsx)(w.Z,{variant:"h5",gutterBottom:!0,children:"Старт игры был отменён"}),(0,c.jsx)(Y,{className:I().actions,spacing:2,direction:"row",children:!!n&&(0,c.jsx)(W.Z,{className:"FixMuiButton",onClick:n,variant:"contained",children:(0,c.jsx)("span",{className:"Text",children:"Начать сначала"})})})]})}function ee(){return(0,c.jsxs)(g.Z,{className:j()(I().container,I().GameReady),children:[(0,c.jsx)(w.Z,{variant:"h5",gutterBottom:!0,children:"Игра готова"}),(0,c.jsx)(w.Z,{variant:"body1",gutterBottom:!0,children:"(Имя партнёра, продолжить)"})]})}var en=t(2742),et=t(8356),ea=t(1799),er=t(9396),ei=t(5751),es=t(2171),eo=t(6447),ec=t(542),el=t.n(ec),eu=t(3611),ed=t.n(eu),em=(0,et.qC)((r=(a={errorClassName:ed().error,wrapperClassName:ed().wrapper}).wrapperClassName,i=a.errorClassName,o=void 0===(s=a.showErrorInWrapper)||s,function(e){return function(n){var t=(0,ei.tP)(),a=(0,ei.lO)(),s=(0,ei.YH)(),l=(0,ei.X4)()||a,d=(0,ei.me)(),m=(0,ei.Vp)(),p=(0,ei.Rb)(),f=(0,h.useRouter)(),N=x.useCallback(function(){f.push("/")},[f]);return(0,c.jsxs)("div",{className:j()(r,el().container),children:[o&&l&&(0,c.jsxs)(g.Z,{className:j()(el().contentErrorContainer),m:2,children:[(0,c.jsx)(w.Z,{className:j()(i,el().contentError),m:2,children:(0,es.VK)(l)}),(0,c.jsx)(eo.Z,{className:el().actions,spacing:2,direction:"row",m:2,justifyContent:"center",children:(0,c.jsx)(W.Z,{className:"FixMuiButton",onClick:N,variant:"contained",children:(0,c.jsx)("span",{className:"Text",children:"Начать сначала"})})})]}),!t&&(0,c.jsx)("div",{className:el().contentContainer,children:(0,c.jsx)(e,(0,er.Z)((0,ea.Z)({},n),{error:l,isLoading:s,isWaiting:d,isStarted:m,isFailed:p}))}),(s||d)&&(0,c.jsx)(u.uY,{className:el().smallLoader,spinnerSize:"medium",show:!0}),(0,c.jsx)(u.uY,{className:el().loaderSplash,show:t,spinnerSize:"large",bg:"white",mode:"cover",fullSize:!0})]})}}))(function(e){var n=e.className,t=(0,p.oR)(),a=(0,v.TL)(),r=(0,h.useRouter)(),i=(0,v.u9)(),s=(0,v.gC)(),o=(0,v.aR)(),l=(0,v.YH)(),u=(0,v.me)(),d=(0,v.Mh)(),f=(0,v.Vp)(),W=(0,v.Rb)(),w=!!s&&!!i,C=x.useCallback(function(){r.push("/")},[r]);x.useEffect(function(){w&&i&&s&&(0,k.Wh)(t)},[i,w,s,t]),x.useEffect(function(){w||N.Z.build.isDev||localStorage.getItem("gameParams:userName")||C()},[C,w,l,i,s,o]);var S=x.useCallback(function(){a(Z.Nw.setGameMode("single"))},[a]),B=(0,m.Z)(x.useState(!1),2),b=B[0],y=B[1],E=x.useCallback(function(){console.log("[WaitingBlock]: DEBUG: cancelWaiting"),(0,v.Io)(),a((0,en.M)()),a(_.Nw.resetData()),y(!0)},[a]),M=x.useMemo(function(){if(!w)return(0,c.jsx)(H,{reason:"Not ready"});if(f)return(0,c.jsx)(ee,{});if(W)return(0,c.jsx)(U,{onSingleClick:S,goToStartPage:C});if(b)return(0,c.jsx)(J,{goToStartPage:C});if(!u)return(0,c.jsx)(H,{reason:"Not waiting"});if(!d)return(0,c.jsx)(K,{cancelWaiting:E,isWaiting:!0});if("single"===o)return(0,c.jsx)(Q,{cancelWaiting:E,isWaiting:!0});else return(0,c.jsx)(q,{cancelWaiting:E,isWaiting:!0})},[E,o,C,S,W,w,f,u,d,b]);return(0,c.jsx)(g.Z,{className:j()(n,I().container),my:2,children:M})}),ex=function(){var e=(0,d.d)("Старт игры");return(0,c.jsx)(l.Z,{title:e,children:(0,c.jsx)(u.ip,{flex:!0,flexVertical:!0,fullSizeFlexChild:!0,flexCenter:!0,children:(0,c.jsx)(em,{})})})}},2171:function(e,n,t){"use strict";function a(e){return[e.message].filter(Boolean).join(": ").replace(/^Error:\s*/,"")}t.d(n,{VK:function(){return a}}),t(5158)},7506:function(e){e.exports={container:"WaitingBlock_container__kQnxn"}},3611:function(e){e.exports={error:"WrappedWaitingBlock_error__M20nw",wrapper:"WrappedWaitingBlock_wrapper__2tBuN"}},542:function(e){e.exports={container:"GameSessionWrapper_container__aDk9O",contentError:"GameSessionWrapper_contentError__ATjRz",contentContainer:"GameSessionWrapper_contentContainer__9ZWe_",smallLoader:"GameSessionWrapper_smallLoader__MetXT",loaderSplash:"GameSessionWrapper_loaderSplash__61cgZ"}}},function(e){e.O(0,[330,12,390,774,888,179],function(){return e(e.s=2329)}),_N_E=e.O()}]);
//# sourceMappingURL=waiting-5c8cdf0f091aad0d.js.map