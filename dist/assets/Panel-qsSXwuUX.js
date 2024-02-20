import{r as e,_ as n,C as r,u as c,a as d,j as t,I as u}from"./index-K4ArSkEu.js";const x=e.lazy(()=>n(()=>import("./MainPanelClient-wBVvzhDS.js"),__vite__mapDeps([0,1,2,3]))),_=e.lazy(()=>n(()=>import("./NavigatePanelClient-FZbdZ2LO.js"),__vite__mapDeps([4,1,2,3])));function g(){const{setClient:i,client:o}=e.useContext(r),l=c();return e.useEffect(()=>{(async()=>{const a=localStorage.getItem("token"),s=a&&await d(a);s?i(s.data.client):l("/login")})()},[]),t.jsx(e.Suspense,{fallback:t.jsx(u,{}),children:o&&t.jsxs("div",{className:"w-screen h-screen overflow-hidden flex justify-start items-start  text-dark dark:text-light",children:[t.jsx(_,{}),t.jsx(x,{})]})})}export{g as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/MainPanelClient-wBVvzhDS.js","assets/index-K4ArSkEu.js","assets/index-jc7XKbZ7.css","assets/messagesEventManager-19O8_Ce0.js","assets/NavigatePanelClient-FZbdZ2LO.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
