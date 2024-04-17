import{r as e,_ as n,C as r,u as c,a as d,j as t,I as u}from"./index-Pces45Sd.js";const x=e.lazy(()=>n(()=>import("./MainPanelClient-GbPZ7tC2.js"),__vite__mapDeps([0,1,2,3]))),_=e.lazy(()=>n(()=>import("./NavigatePanelClient-UoksM7Nt.js"),__vite__mapDeps([4,1,2,3])));function g(){const{setClient:i,client:o}=e.useContext(r),l=c();return e.useEffect(()=>{(async()=>{const a=localStorage.getItem("token"),s=a&&await d(a);s?i(s.data.client):l("/login")})()},[]),t.jsx(e.Suspense,{fallback:t.jsx(u,{}),children:o&&t.jsxs("div",{className:"w-screen h-screen overflow-hidden flex justify-start items-start text-dark dark:text-light",children:[t.jsx(_,{}),t.jsx(x,{})]})})}export{g as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/MainPanelClient-GbPZ7tC2.js","assets/index-Pces45Sd.js","assets/index-rhBcGnCc.css","assets/messagesEventManager-x8QaAoI7.js","assets/NavigatePanelClient-UoksM7Nt.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
