import{r as u,C as j,j as e,av as M,au as S,M as _,T as v,aw as L,h as q,u as I,U as P,ax as R,P as E,z as F,ay as z,az as B,aA as T,aB as U,aC as D,aD as A,aE as $,aF as G}from"./index-dcGVlx13.js";import{m as x,C as K}from"./messagesEventManager-h2QsI0aV.js";function V({menuIsOpen:a}){const{client:r}=u.useContext(j),s=u.useRef(null),n=async l=>{var i,o,m,d;const t=l.target.files;if(t.length&&t[0].size<4e6){const c=new FileReader;c.onload=p=>{var h,g,y,b,N,C,w;if(s.current){const k=s.current.querySelector("img");k&&((h=p.target)!=null&&h.result)&&(k.src=p.target.result.toString())}(g=s.current)==null||g.classList.add("flex"),(y=s.current)==null||y.classList.remove("hidden"),(N=(b=s.current)==null?void 0:b.querySelector("div#loading"))==null||N.classList.add("flex"),(w=(C=s.current)==null?void 0:C.querySelector("div#loading"))==null||w.classList.remove("hidden")},c.readAsDataURL(t[0]);const f=await M(t[0]);f!=null&&f.data&&r&&(await S({client_id:r==null?void 0:r.id,logo:f.data.url}),(o=(i=s.current)==null?void 0:i.querySelector("div#loading"))==null||o.classList.remove("flex"),(d=(m=s.current)==null?void 0:m.querySelector("div#loading"))==null||d.classList.add("hidden"))}};return e.jsx("div",{"data-menuisopen":a,className:"w-[40px] h-[40px] data-[menuisopen=true]:w-[80px] data-[menuisopen=true]:h-[80px] rounded-full overflow-hidden cursor-pointer border-4 border-primary-100 dark:border-light",children:e.jsxs("label",{className:"w-full h-full relative cursor-pointer",ref:s,onChange:n,children:[e.jsx("input",{type:"file",className:"hidden",accept:".png, .jpg, .jpeg, .webp"}),e.jsx("img",{src:(r==null?void 0:r.logo)||"https://via.placeholder.com/100",alt:"",className:"w-full h-full object-contain"}),e.jsx("div",{id:"loading",className:"w-full h-full bg-zinc-800/50 absolute top-0 left-0 justify-center items-center hidden",children:e.jsx("div",{className:"w-[40px] h-[40px] border-2 border-t-primary-300 rounded-full animate-spin"})})]})})}function W(){const{client:a}=u.useContext(j),{setModalContent:r}=u.useContext(_),s=u.useRef(null),n=({currentTarget:t})=>{var d,c;t.dataset.overlay=!1,t.style.display=!1;const i=(d=s.current)==null?void 0:d.querySelector("input"),o=s.current,m=(c=s.current)==null?void 0:c.querySelector("div[data-save]");i&&o&&m&&(o.classList.add("border"),i.classList.remove("disabled"),m.dataset.save=!0)},l=async()=>{var d,c,f;const t=(d=s.current)==null?void 0:d.querySelector("input"),i=s.current,o=(c=s.current)==null?void 0:c.querySelector("div[data-save]"),m=(f=s.current)==null?void 0:f.querySelector("div[data-overlay]");if(a){const p=t==null?void 0:t.value.split(" "),[h,g]=p||[];h&&g?(await S({client_id:a==null?void 0:a.id,fullname:t==null?void 0:t.value}),t&&i&&o&&(i.classList.remove("border"),t.classList.add("disabled"),o.dataset.save=!1,m.dataset.overlay=!0,t.blur())):r({componentName:"modal_error_name",components:e.jsx(q,{message:"Digite seu nome e sobrenome",type:"WARNING",componentName:"modal_error_name"})})}};return e.jsx(v,{tip:"2 cliques para editar seu nome",children:e.jsxs("div",{className:"w-full px-2 flex justify-center gap-2 items-center rounded-lg relative",ref:s,children:[e.jsx("div",{className:"w-full h-full absolute data-[overlay=false]:hidden",onDoubleClick:n,"data-testid":"test-display","data-overlay":!0}),e.jsx("input",{type:"text",className:"text-xl bg-transparent text-primary-100 dark:text-light text-center font-bold cursor-default whitespace-nowrap text-ellipsis overflow-hidden",onKeyDown:t=>t.code==="Enter"&&l(),defaultValue:a==null?void 0:a.fullname}),e.jsx("div",{"data-save":!1,onClick:l,className:"bg-light rounded-full justify-center items-center hidden data-[save=true]:flex",children:e.jsx(L,{className:"fill-green-500 text-2xl cursor-pointer","data-testid":"button-save"})})]})})}const H=({menuIsOpen:a})=>{const{setModalContent:r,clearModal:s}=u.useContext(_),{client:n}=u.useContext(j),l=I(),t=()=>{function o(){localStorage.removeItem("token"),s("modal_confirm_exit_panel"),l("/login")}r({componentName:"modal_confirm_exit_panel",components:e.jsx(E,{children:e.jsx(K,{title:"Tem certeza que deseja sair do painel?",confirmFunction:o,cancelFuntion:()=>s("modal_confirm_exit_panel")})})})},i=()=>{l("/panel?tab=5")};return n&&e.jsx("div",{className:"w-full flex flex-col gap-2 justify-center items-center relative",children:e.jsxs("div",{className:"w-4/5 pb-2 flex flex-col justify-center items-center gap-2 border-b border-primary-100 dark:border-light/30",children:[e.jsxs("div",{className:"w-full flex justify-center gap-2 items-end",children:[e.jsx(v,{tip:"Edite seu perfil",children:e.jsx(P,{"data-menuisopen":a,className:"text-2xl cursor-pointer hover:animate-spin data-[menuisopen=false]:hidden fill-primary-100 dark:fill-light",onClick:i})}),e.jsx(V,{menuIsOpen:a}),e.jsx(v,{tip:"Sair do seu painel",children:e.jsx(R,{"data-menuisopen":a,className:"text-2xl cursor-pointer -scale-x-100 fill-primary-100 dark:fill-light hover:fill-red-500 transition-colors duration-200 data-[menuisopen=false]:hidden",onClick:t})})]}),e.jsxs("div",{className:`w-full flex flex-col ${a?"block":"hidden"}`,children:[e.jsx(W,{}),e.jsx("h3",{"data-ismessages":x(n.plan_management).maxMessages,className:"flex gap-1 justify-center items-center text-primary-100 dark:text-light font-bold data-[ismessages='0']:hidden",children:x(n.plan_management).totalMessages+" / "+x(n.plan_management).maxMessages}),e.jsxs("h3",{"data-ismessages":x(n.plan_management).maxBonus,className:"flex gap-1 justify-center items-center bg-primary-300 p-1 rounded-lg border border-primary-100 text-primary-100 dark:text-light font-bold data-[ismessages='0']:hidden",children:["Bônus",e.jsx("span",{children:x(n.plan_management).reminingMessagesBonus+" / "+x(n.plan_management).maxBonus})]})]})]})})},J=[{name:"Meus chats",Icon:z},{name:"Métricas",Icon:B},{name:"Fonte de dados",Icon:T},{name:"Registros",Icon:U},{name:"Assinatura",Icon:D}];function Q({menuIsOpen:a}){const r=I(),[s]=F(),n=l=>{r(`/panel?tab=${l}`)};return e.jsx("ul",{className:"w-full flex flex-col items-end",children:J.map((l,t)=>e.jsx("li",{"data-tab":Number(s.get("tab"))==t,className:"w-full py-2 tall-6:py-3 flex gap-2 justify-center items-center text-center cursor-pointer font-bold text-xl hover:text-primary-300 hover:dark:text-light hover:bg-primary-100/30 hover:dark:bg-dark data-[tab=true]:dark:bg-dark transition-colors duration-300 group",onClick:()=>n(t),children:e.jsxs("div",{"data-menuisopen":a,className:"w-full data-[menuisopen=true]:w-4/5 flex justify-center data-[menuisopen=true]:justify-start items-center gap-2",children:[e.jsx(l.Icon,{className:"group-hover:fill-primary-100 text-primary-100 dark:text-light text-xl transition-colors duration-100"}),e.jsx("p",{className:`group-hover:text-primary-100 text-primary-100 dark:text-white transition-colors duration-100 whitespace-nowrap text-ellipsis ${a?"block":"hidden"}`,children:l.name})]})},l.name))})}const X=({menuIsOpen:a,setMenuIsOpen:r})=>e.jsx("div",{"data-menuisopen":a,className:"w-full absolute bottom-0 tall-6:bottom-6 flex data-[menuisopen=true]:justify-end justify-center",children:a?e.jsx(A,{className:"text-4xl fill-zinc-100 cursor-pointer","data-control-arrow":"left",onClick:()=>r(!1)}):e.jsx($,{className:"text-4xl fill-zinc-100 cursor-pointer","data-control-arrow":"right",onClick:()=>r(!0)})});function O(){const[a,r]=u.useState(!0);return e.jsxs("main",{"data-menuisopen":a,className:"w-[280px] data-[menuisopen=false]:w-[70px] relative h-full bg-gradient-to-b from-primary-100 via-light to-light dark:to-primary-300 dark:via-primary-300",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx(G,{}),e.jsxs("nav",{className:"w-full h-full py-4 relative",children:[e.jsx(H,{menuIsOpen:a}),e.jsx(Q,{menuIsOpen:a})]})]}),e.jsx(X,{menuIsOpen:a,setMenuIsOpen:r})]})}export{O as default};
