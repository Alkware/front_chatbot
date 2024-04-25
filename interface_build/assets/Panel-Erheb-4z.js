import{r as e,_ as n,C as r,u as c,a as u,j as t,I as x}from"./index-jl-LfEzA.js";const d=e.lazy(()=>n(()=>import("./MainPanelClient-byIzfxnX.js"),__vite__mapDeps([0,1,2,3]))),_=e.lazy(()=>n(()=>import("./NavigatePanelClient-eVXq2qDO.js"),__vite__mapDeps([4,1,2,3])));function g(){const{setClient:i,client:o}=e.useContext(r),l=c();return e.useEffect(()=>{(async()=>{const a=localStorage.getItem("token"),s=a&&await u(a);s?i(s.data.client):l("/login")})()},[]),t.jsx(e.Suspense,{fallback:t.jsx(x,{}),children:o&&t.jsxs("div",{className:"w-screen h-screen overflow-hidden flex justify-start items-start text-primary-100 dark:text-light",children:[t.jsx(_,{}),t.jsx(d,{})]})})}export{g as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/MainPanelClient-byIzfxnX.js","assets/index-jl-LfEzA.js","assets/index-gIGHlKbJ.css","assets/messagesEventManager-XXiNSe2O.js","assets/NavigatePanelClient-eVXq2qDO.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
