import{r as e,_ as n,C as o,u as c,a as u,j as t,I as d}from"./index-LGvbyJ8s.js";const x=e.lazy(()=>n(()=>import("./MainPanelClient-m-gbL9Jw.js"),__vite__mapDeps([0,1,2,3]))),g=e.lazy(()=>n(()=>import("./NavigatePanelClient-80Qr5I2K.js"),__vite__mapDeps([4,1,2,3])));function m(){const{setClient:i,client:l}=e.useContext(o),r=c();return e.useEffect(()=>{(async()=>{const a=localStorage.getItem("token"),s=a&&await u(a);s?i(s.data.client):r("/login")})()},[]),t.jsx(e.Suspense,{fallback:t.jsx(d,{}),children:l&&t.jsxs("div",{className:"w-screen min-h-screen flex justify-start md:justify-center items-start text-primary-100 dark:text-light bg-light dark:bg-dark",children:[t.jsx(g,{}),t.jsx(x,{})]})})}export{m as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/MainPanelClient-m-gbL9Jw.js","assets/index-LGvbyJ8s.js","assets/index-paDYWhak.css","assets/messagesEventManager-B9LFt-uM.js","assets/NavigatePanelClient-80Qr5I2K.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
