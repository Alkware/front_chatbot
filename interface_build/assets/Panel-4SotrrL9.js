import{r as e,_ as n,C as r,u as c,a as u,j as t,I as x}from"./index-Ay25yzSR.js";const _=e.lazy(()=>n(()=>import("./MainPanelClient-u5SoO1qo.js"),__vite__mapDeps([0,1,2,3]))),d=e.lazy(()=>n(()=>import("./NavigatePanelClient-Hqthnakt.js"),__vite__mapDeps([4,1,2,3])));function f(){const{setClient:i,client:l}=e.useContext(r),o=c();return e.useEffect(()=>{(async()=>{const a=localStorage.getItem("token"),s=a&&await u(a);s?i(s.data.client):o("/login")})()},[]),t.jsx(e.Suspense,{fallback:t.jsx(x,{}),children:l&&t.jsxs("div",{className:"w-screen h-screen flex justify-center items-start text-primary-100 dark:text-light",children:[t.jsx(d,{}),t.jsx(_,{})]})})}export{f as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/MainPanelClient-u5SoO1qo.js","assets/index-Ay25yzSR.js","assets/index-cdbJop7i.css","assets/messagesEventManager-nP9Q9w4t.js","assets/NavigatePanelClient-Hqthnakt.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
