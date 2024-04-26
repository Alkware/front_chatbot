import{r as e,_ as n,C as r,u as c,a as u,j as t,I as x}from"./index-dcGVlx13.js";const _=e.lazy(()=>n(()=>import("./MainPanelClient-2sKnaVwM.js"),__vite__mapDeps([0,1,2,3]))),d=e.lazy(()=>n(()=>import("./NavigatePanelClient-dqQr12_x.js"),__vite__mapDeps([4,1,2,3])));function f(){const{setClient:i,client:l}=e.useContext(r),o=c();return e.useEffect(()=>{(async()=>{const a=localStorage.getItem("token"),s=a&&await u(a);s?i(s.data.client):o("/login")})()},[]),t.jsx(e.Suspense,{fallback:t.jsx(x,{}),children:l&&t.jsxs("div",{className:"w-screen h-screen flex justify-start items-start text-primary-100 dark:text-light",children:[t.jsx(d,{}),t.jsx(_,{})]})})}export{f as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/MainPanelClient-2sKnaVwM.js","assets/index-dcGVlx13.js","assets/index-c37NgfKM.css","assets/messagesEventManager-h2QsI0aV.js","assets/NavigatePanelClient-dqQr12_x.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
