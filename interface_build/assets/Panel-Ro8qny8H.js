import{r as e,_ as n,C as r,u as c,a as d,j as t,I as u}from"./index-gSf2Z7Wu.js";const x=e.lazy(()=>n(()=>import("./MainPanelClient--zpBvFE5.js"),__vite__mapDeps([0,1,2,3]))),_=e.lazy(()=>n(()=>import("./NavigatePanelClient-VX53NbrA.js"),__vite__mapDeps([4,1,2,3])));function g(){const{setClient:i,client:o}=e.useContext(r),l=c();return e.useEffect(()=>{(async()=>{const a=localStorage.getItem("token"),s=a&&await d(a);s?i(s.data.client):l("/login")})()},[]),t.jsx(e.Suspense,{fallback:t.jsx(u,{}),children:o&&t.jsxs("div",{className:"w-screen h-screen overflow-hidden flex justify-start items-start text-dark dark:text-light",children:[t.jsx(_,{}),t.jsx(x,{})]})})}export{g as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/MainPanelClient--zpBvFE5.js","assets/index-gSf2Z7Wu.js","assets/index-vsUQEqX5.css","assets/messagesEventManager-Qj4eaW-e.js","assets/NavigatePanelClient-VX53NbrA.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
