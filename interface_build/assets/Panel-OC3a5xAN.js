import{r as t,_ as n,C as o,u as l,a as c,j as e}from"./index-_vyg5iSi.js";const u=t.lazy(()=>n(()=>import("./MainPanelClient-Xt0FiSgo.js"),__vite__mapDeps([0,1,2,3]))),_=t.lazy(()=>n(()=>import("./NavigatePanelClient-FVkx2cD4.js"),__vite__mapDeps([4,1,2,3])));function g(){const{setClient:i}=t.useContext(o),r=l();return t.useEffect(()=>{(async()=>{const a=localStorage.getItem("token"),s=a&&await c(a);s?i(s.data.client):r("/login")})()},[]),e.jsxs("div",{className:"w-screen min-h-screen flex justify-start md:justify-center items-start text-primary-100 dark:text-light bg-light dark:bg-dark",children:[e.jsx(_,{}),e.jsx(u,{})]})}export{g as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/MainPanelClient-Xt0FiSgo.js","assets/index-_vyg5iSi.js","assets/index-BEaVGgo3.css","assets/messagesEventManager-nP9Q9w4t.js","assets/NavigatePanelClient-FVkx2cD4.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
