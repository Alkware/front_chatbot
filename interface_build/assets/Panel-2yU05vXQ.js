import{r as e,_ as n,C as r,u as c,a as d,j as t,I as u}from"./index-5vlf3IGo.js";const x=e.lazy(()=>n(()=>import("./MainPanelClient-3jUA6EqA.js"),__vite__mapDeps([0,1,2,3]))),_=e.lazy(()=>n(()=>import("./NavigatePanelClient-rA9oDOcP.js"),__vite__mapDeps([4,1,2,3])));function g(){const{setClient:i,client:o}=e.useContext(r),l=c();return e.useEffect(()=>{(async()=>{const a=localStorage.getItem("token"),s=a&&await d(a);s?i(s.data.client):l("/login")})()},[]),t.jsx(e.Suspense,{fallback:t.jsx(u,{}),children:o&&t.jsxs("div",{className:"w-screen h-screen overflow-hidden flex justify-start items-start  text-dark dark:text-light",children:[t.jsx(_,{}),t.jsx(x,{})]})})}export{g as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/MainPanelClient-3jUA6EqA.js","assets/index-5vlf3IGo.js","assets/index-jc7XKbZ7.css","assets/messagesEventManager-8aStfXg5.js","assets/NavigatePanelClient-rA9oDOcP.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
