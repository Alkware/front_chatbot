import{r as e,_ as n,C as r,u as c,a as d,j as t,I as u}from"./index-7t3RVw_F.js";const x=e.lazy(()=>n(()=>import("./MainPanelClient-5xGUcKAi.js"),__vite__mapDeps([0,1,2,3]))),_=e.lazy(()=>n(()=>import("./NavigatePanelClient-SoSFk4J6.js"),__vite__mapDeps([4,1,2,3])));function g(){const{setClient:i,client:o}=e.useContext(r),l=c();return e.useEffect(()=>{(async()=>{const a=localStorage.getItem("token"),s=a&&await d(a);s?i(s.data.client):l("/login")})()},[]),t.jsx(e.Suspense,{fallback:t.jsx(u,{}),children:o&&t.jsxs("div",{className:"w-screen h-screen overflow-hidden flex justify-start items-start text-dark dark:text-light",children:[t.jsx(_,{}),t.jsx(x,{})]})})}export{g as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/MainPanelClient-5xGUcKAi.js","assets/index-7t3RVw_F.js","assets/index-bZsUixgV.css","assets/messagesEventManager-bntI0xfj.js","assets/NavigatePanelClient-SoSFk4J6.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
