import{r as e,_ as n,C as o,u as c,a as u,j as t,I as d}from"./index-vrBu_c0o.js";const x=e.lazy(()=>n(()=>import("./MainPanelClient-WXzEnmBq.js"),__vite__mapDeps([0,1,2,3]))),g=e.lazy(()=>n(()=>import("./NavigatePanelClient-9ciUbkJ2.js"),__vite__mapDeps([4,1,2,3])));function m(){const{setClient:i,client:l}=e.useContext(o),r=c();return e.useEffect(()=>{(async()=>{const a=localStorage.getItem("token"),s=a&&await u(a);s?i(s.data.client):r("/login")})()},[]),t.jsx(e.Suspense,{fallback:t.jsx(d,{}),children:l&&t.jsxs("div",{className:"w-screen min-h-screen flex justify-start md:justify-center items-start text-primary-100 dark:text-light bg-light dark:bg-dark",children:[t.jsx(g,{}),t.jsx(x,{})]})})}export{m as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/MainPanelClient-WXzEnmBq.js","assets/index-vrBu_c0o.js","assets/index-aRb7Ob6U.css","assets/messagesEventManager-yQyUASl2.js","assets/NavigatePanelClient-9ciUbkJ2.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
