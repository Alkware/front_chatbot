import{r as p,C as y,j as e,ax as C,aw as S,M as w,T as N,ay as R,h as F,u as k,X as D,az as I,P as T,G as L,aA as m,aB as P,aC as z,aD as V,aE as q,aF as O,aG as B,aH as o,aI as G,aJ as H,t as K,aK as Z}from"./index-LGvbyJ8s.js";import{m as g,C as J}from"./messagesEventManager-B9LFt-uM.js";function W({menuIsOpen:t}){const{client:n}=p.useContext(y),a=p.useRef(null),r=async l=>{var i,d,f,c;const s=l.target.files;if(s.length&&s[0].size<4e6){const u=new FileReader;u.onload=h=>{var v,E,j,b,U,A,_;if(a.current){const M=a.current.querySelector("img");M&&((v=h.target)!=null&&v.result)&&(M.src=h.target.result.toString())}(E=a.current)==null||E.classList.add("flex"),(j=a.current)==null||j.classList.remove("hidden"),(U=(b=a.current)==null?void 0:b.querySelector("div#loading"))==null||U.classList.add("flex"),(_=(A=a.current)==null?void 0:A.querySelector("div#loading"))==null||_.classList.remove("hidden")},u.readAsDataURL(s[0]);const x=await C(s[0]);x!=null&&x.data&&n&&(await S({client_id:n==null?void 0:n.id,logo:x.data.url}),(d=(i=a.current)==null?void 0:i.querySelector("div#loading"))==null||d.classList.remove("flex"),(c=(f=a.current)==null?void 0:f.querySelector("div#loading"))==null||c.classList.add("hidden"))}};return e.jsx("div",{"data-menuisopen":t,className:"w-[40px] h-[40px] data-[menuisopen=true]:w-[80px] data-[menuisopen=true]:h-[80px] rounded-full overflow-hidden cursor-pointer border-4 border-primary-100 dark:border-light",children:e.jsxs("label",{className:"w-full h-full relative cursor-pointer",ref:a,onChange:r,children:[e.jsx("input",{type:"file",className:"hidden",accept:".png, .jpg, .jpeg, .webp"}),e.jsx("img",{src:(n==null?void 0:n.logo)||"https://via.placeholder.com/100",alt:"",className:"w-full h-full object-contain"}),e.jsx("div",{id:"loading",className:"w-full h-full bg-zinc-800/50 absolute top-0 left-0 justify-center items-center hidden",children:e.jsx("div",{className:"w-[40px] h-[40px] border-2 border-t-primary-300 rounded-full animate-spin"})})]})})}function X(){const{client:t}=p.useContext(y),{setModalContent:n}=p.useContext(w),a=p.useRef(null),r=({currentTarget:s})=>{var c,u;s.dataset.overlay=!1,s.style.display=!1;const i=(c=a.current)==null?void 0:c.querySelector("input"),d=a.current,f=(u=a.current)==null?void 0:u.querySelector("div[data-save]");i&&d&&f&&(d.classList.add("border"),i.classList.remove("disabled"),f.dataset.save=!0)},l=async()=>{var c,u,x;const s=(c=a.current)==null?void 0:c.querySelector("input"),i=a.current,d=(u=a.current)==null?void 0:u.querySelector("div[data-save]"),f=(x=a.current)==null?void 0:x.querySelector("div[data-overlay]");if(t){const h=s==null?void 0:s.value.split(" "),[v,E]=h||[];v&&E?(await S({client_id:t==null?void 0:t.id,fullname:s==null?void 0:s.value}),s&&i&&d&&(i.classList.remove("border"),s.classList.add("disabled"),d.dataset.save=!1,f.dataset.overlay=!0,s.blur())):n({componentName:"modal_error_name",components:e.jsx(F,{message:"Digite seu nome e sobrenome",type:"WARNING",componentName:"modal_error_name"})})}};return e.jsx(N,{tip:"2 cliques para editar seu nome",children:e.jsxs("div",{className:"w-full px-2 flex justify-center gap-2 items-center rounded-lg relative",ref:a,children:[e.jsx("div",{className:"w-full h-full absolute data-[overlay=false]:hidden",onDoubleClick:r,"data-testid":"test-display","data-overlay":!0}),e.jsx("input",{type:"text",className:"text-xl bg-transparent text-primary-100 dark:text-light text-center font-bold cursor-default whitespace-nowrap text-ellipsis overflow-hidden",onKeyDown:s=>s.code==="Enter"&&l(),defaultValue:t==null?void 0:t.fullname}),e.jsx("div",{"data-save":!1,onClick:l,className:"bg-light rounded-full justify-center items-center hidden data-[save=true]:flex",children:e.jsx(R,{className:"fill-green-500 text-2xl cursor-pointer","data-testid":"button-save"})})]})})}const $=({menuIsOpen:t})=>{const{setModalContent:n,clearModal:a}=p.useContext(w),{client:r}=p.useContext(y),l=k(),s=()=>{function d(){localStorage.removeItem("token"),a("modal_confirm_exit_panel"),l("/login")}n({componentName:"modal_confirm_exit_panel",components:e.jsx(T,{children:e.jsx(J,{title:"Tem certeza que deseja sair do painel?",confirmFunction:d,cancelFuntion:()=>a("modal_confirm_exit_panel")})})})},i=()=>{l("/panel?tab=5")};return r&&e.jsx("div",{className:"w-full flex flex-col gap-2 justify-center items-center relative",children:e.jsxs("div",{className:"w-4/5 pb-2 flex flex-col justify-center items-center gap-2 border-b border-primary-100 dark:border-light/30",children:[e.jsxs("div",{className:"w-full flex justify-center gap-2 items-end",children:[e.jsx(N,{tip:"Edite seu perfil",children:e.jsx(D,{"data-menuisopen":t,className:"text-2xl cursor-pointer hover:animate-spin data-[menuisopen=false]:hidden fill-primary-100 dark:fill-light",onClick:i})}),e.jsx(W,{menuIsOpen:t}),e.jsx(N,{tip:"Sair do seu painel",children:e.jsx(I,{"data-menuisopen":t,className:"text-2xl cursor-pointer -scale-x-100 fill-primary-100 dark:fill-light hover:fill-red-500 transition-colors duration-200 data-[menuisopen=false]:hidden",onClick:s})})]}),e.jsxs("div",{className:`w-full flex flex-col ${t?"block":"hidden"}`,children:[e.jsx(X,{}),e.jsx("h3",{"data-ismessages":g(r.plan_management).maxMessages,className:"flex gap-1 justify-center items-center text-primary-100 dark:text-light font-bold data-[ismessages='0']:hidden",children:g(r.plan_management).totalMessages+" / "+g(r.plan_management).maxMessages}),e.jsxs("h3",{"data-ismessages":g(r.plan_management).maxBonus,className:"flex gap-1 justify-center items-center bg-primary-300 p-1 rounded-lg border border-primary-100 text-primary-100 dark:text-light font-bold data-[ismessages='0']:hidden",children:["Bônus",e.jsx("span",{children:g(r.plan_management).reminingMessagesBonus+" / "+g(r.plan_management).maxBonus})]})]})]})})},Q=[{name:"Meus chats",Icon:P},{name:"Métricas",Icon:z},{name:"Fonte de dados",Icon:V},{name:"Registros",Icon:q},{name:"Assinatura",Icon:O},{name:"Central de ajuda",Icon:B}];function Y(){const[t,n]=L(),a=t.get(m.URL_NAME)===m.DEFAULT_VALUES.DEFAULT,r=l=>{t.get(o.URL_NAME)&&t.set(o.URL_NAME,"close"),t.set("tab",l.toString()),n(t)};return e.jsx("ul",{className:"w-full flex flex-col items-end",children:Q.map((l,s)=>e.jsx("li",{"data-tab":Number(t.get("tab"))==s,"data-ismenuresize":a,className:"group w-full py-2 tall-6:py-3 flex gap-2 justify-center items-center text-center cursor-pointer font-bold text-xl hover:text-primary-300 hover:dark:text-light hover:bg-primary-100/30 hover:dark:bg-dark data-[tab=true]:dark:bg-dark transition-colors duration-300",onClick:()=>r(s),children:e.jsxs("div",{className:"w-full group-data-[ismenuresize=true]:w-4/5 flex justify-center data-[ismenuresize=true]:justify-start items-center gap-2",children:[e.jsx(l.Icon,{className:"group-hover:fill-primary-100 text-primary-100 dark:text-light text-xl transition-colors duration-100"}),e.jsx("p",{className:"md:group-data-[ismenuresize=false]:hidden group-hover:text-primary-100 text-primary-100 dark:text-white transition-colors duration-100 whitespace-nowrap text-ellipsis",children:l.name})]})},l.name))})}const ee=()=>{const[t,n]=L(),a=t.get(m.URL_NAME)===m.DEFAULT_VALUES.DEFAULT,r=()=>{const l=t.get(m.URL_NAME);a||(t.append(m.URL_NAME,m.DEFAULT_VALUES.DEFAULT),n(t)),console.log(l===m.DEFAULT_VALUES.DEFAULT),l===m.DEFAULT_VALUES.DEFAULT?t.set(m.URL_NAME,m.DEFAULT_VALUES.RESIZED):t.set(m.URL_NAME,m.DEFAULT_VALUES.DEFAULT),n(t)};return e.jsx("div",{"data-ismenuresize":a,className:"hidden md:flex w-full data-[ismenuresize=true]:absolute top-0  data-[ismenuresize=true]:justify-end justify-center",children:a?e.jsx(G,{className:"text-4xl fill-primary-100 dark:fill-zinc-100 cursor-pointer","data-control-arrow":"left",onClick:r}):e.jsx(H,{className:"text-4xl fill-primary-100 dark:fill-zinc-100 cursor-pointer","data-control-arrow":"right",onClick:r})})};function ae({className:t}){const n=p.useRef(null),[a,r]=L();p.useEffect(()=>s(a.get(o.URL_NAME)===o.DEFAULT_VALUES.OPEN),[a.get(o.URL_NAME)]);const l=()=>{let i=a.get(o.URL_NAME);i||(a.append(o.URL_NAME,o.DEFAULT_VALUES.OPEN),i=o.DEFAULT_VALUES.OPEN,r(a)),s(i!==o.DEFAULT_VALUES.OPEN)},s=i=>{const d=n.current;if(d){const f=d.querySelector("span[tabindex='2']"),c=d.querySelector("span[tabindex='1']"),u=d.querySelector("span[tabindex='0']");i?(f==null||f.classList.add("-rotate-45","-translate-y-[200%]"),c==null||c.classList.add("hidden"),u==null||u.classList.add("rotate-45","translate-y-full"),a.set(o.URL_NAME,o.DEFAULT_VALUES.OPEN)):(f==null||f.classList.remove("-rotate-45","-translate-y-[200%]"),c==null||c.classList.remove("hidden"),u==null||u.classList.remove("rotate-45","translate-y-full"),a.set(o.URL_NAME,o.DEFAULT_VALUES.CLOSE)),r(a)}};return e.jsxs("div",{ref:n,className:K("w-24 flex flex-col gap-2 p-4",t),onClick:l,children:[e.jsx("span",{tabIndex:0,className:"bg-light w-11 h-1 transition-transform duration-500"}),e.jsx("span",{tabIndex:1,className:"bg-light w-11 h-1 transition-transform duration-500"}),e.jsx("span",{tabIndex:2,className:"bg-light w-11 h-1 transition-transform duration-500"})]})}function ne(){const[t]=L(),n=t.get(m.URL_NAME)===m.DEFAULT_VALUES.DEFAULT,a=t.get(o.URL_NAME)===o.DEFAULT_VALUES.OPEN;return e.jsxs("div",{"data-isresizemenu":n,"data-isopenmobilemenu":a,className:"w-full md:w-[300px] fixed z-[999] md:relative data-[isopenmobilemenu=false]:w-auto md:data-[isresizemenu=false]:w-[70px] bg-primary-100 rounded-b-md md:rounded-none",children:[e.jsx(ee,{}),e.jsx(ae,{className:"md:hidden"}),e.jsxs("div",{"data-isopenmobilemenu":a,className:"flex flex-col min-h-screen data-[isopenmobilemenu='false']:hidden md:data-[isopenmobilemenu='false']:flex bg-gradient-to-b from-primary-100 via-light to-light dark:to-primary-300 dark:via-primary-300",children:[e.jsx(Z,{}),e.jsxs("nav",{className:"w-full h-full py-4 relative",children:[e.jsx($,{menuIsOpen:n}),e.jsx(Y,{})]})]})]})}export{ne as default};
