import{r as e,_ as n,C as r,u as c,a as u,j as t,I as x}from"./index-a9Bh-oKK.js";const d=e.lazy(()=>n(()=>import("./MainPanelClient-P4yXceDP.js"),__vite__mapDeps([0,1,2,3]))),_=e.lazy(()=>n(()=>import("./NavigatePanelClient-6i404Tud.js"),__vite__mapDeps([4,1,2,3])));function g(){const{setClient:i,client:o}=e.useContext(r),l=c();return e.useEffect(()=>{(async()=>{const a=localStorage.getItem("token"),s=a&&await u(a);s?i(s.data.client):l("/login")})()},[]),t.jsx(e.Suspense,{fallback:t.jsx(x,{}),children:o&&t.jsxs("div",{className:"w-screen h-screen overflow-hidden flex justify-start items-start text-primary-100 dark:text-light",children:[t.jsx(_,{}),t.jsx(d,{})]})})}export{g as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/MainPanelClient-P4yXceDP.js","assets/index-a9Bh-oKK.js","assets/index-kvKagIbY.css","assets/messagesEventManager-ppDhwaZW.js","assets/NavigatePanelClient-6i404Tud.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
