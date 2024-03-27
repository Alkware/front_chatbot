import{r as u,C as j,j as e,av as L,au as k,M as _,T as v,aw as M,P,u as I,S as q,ax as R,y as E,ay as F,az as z,aA as T,aB as U,aC as D,aD as A,aE as B,aF as G}from"./index-zUTRXssf.js";import{m as g,P as $,C as K}from"./messagesEventManager-RQPuM6E9.js";function V({menuIsOpen:a}){const{client:r}=u.useContext(j),s=u.useRef(null),l=async n=>{var o,i,m,c;const t=n.target.files;if(t.length&&t[0].size<4e6){const d=new FileReader;d.onload=x=>{var p,h,y,b,N,w,C;if(s.current){const S=s.current.querySelector("img");S&&((p=x.target)!=null&&p.result)&&(S.src=x.target.result.toString())}(h=s.current)==null||h.classList.add("flex"),(y=s.current)==null||y.classList.remove("hidden"),(N=(b=s.current)==null?void 0:b.querySelector("div#loading"))==null||N.classList.add("flex"),(C=(w=s.current)==null?void 0:w.querySelector("div#loading"))==null||C.classList.remove("hidden")},d.readAsDataURL(t[0]);const f=await L(t[0]);f!=null&&f.data&&r&&(await k({client_id:r==null?void 0:r.id,logo:f.data.url}),(i=(o=s.current)==null?void 0:o.querySelector("div#loading"))==null||i.classList.remove("flex"),(c=(m=s.current)==null?void 0:m.querySelector("div#loading"))==null||c.classList.add("hidden"))}};return e.jsx("div",{"data-menuisopen":a,className:"w-[40px] h-[40px] data-[menuisopen=true]:w-[100px] data-[menuisopen=true]:h-[100px] rounded-full overflow-hidden cursor-pointer border-4 border-primary-100 dark:border-light",children:e.jsxs("label",{className:"w-full h-full relative cursor-pointer",ref:s,onChange:l,children:[e.jsx("input",{type:"file",className:"hidden",accept:".png, .jpg, .jpeg, .webp"}),e.jsx("img",{src:(r==null?void 0:r.logo)||"https://via.placeholder.com/100",alt:"",className:"w-full h-full object-cover"}),e.jsx("div",{id:"loading",className:"w-full h-full bg-zinc-800/50 absolute top-0 left-0 justify-center items-center hidden",children:e.jsx("div",{className:"w-[40px] h-[40px] border-2 border-t-primary-300 rounded-full animate-spin"})})]})})}function W(){const{client:a}=u.useContext(j),{setModalContent:r}=u.useContext(_),s=u.useRef(null),l=({currentTarget:t})=>{var c,d;t.dataset.overlay=!1,t.style.display=!1;const o=(c=s.current)==null?void 0:c.querySelector("input"),i=s.current,m=(d=s.current)==null?void 0:d.querySelector("div[data-save]");o&&i&&m&&(i.classList.add("border"),o.classList.remove("disabled"),m.dataset.save=!0)},n=async()=>{var c,d,f;const t=(c=s.current)==null?void 0:c.querySelector("input"),o=s.current,i=(d=s.current)==null?void 0:d.querySelector("div[data-save]"),m=(f=s.current)==null?void 0:f.querySelector("div[data-overlay]");if(a){const x=t==null?void 0:t.value.split(" "),[p,h]=x||[];p&&h?(await k({client_id:a==null?void 0:a.id,fullname:t==null?void 0:t.value}),t&&o&&i&&(o.classList.remove("border"),t.classList.add("disabled"),i.dataset.save=!1,m.dataset.overlay=!0,t.blur())):r({componentName:"modal_error_name",components:e.jsx(P,{message:"Digite seu nome e sobrenome",type:"WARNING",componentName:"modal_error_name"})})}};return e.jsx(v,{tip:"2 cliques para editar seu nome",children:e.jsxs("div",{className:"w-full px-2 flex justify-center gap-2 items-center rounded-lg relative",ref:s,children:[e.jsx("div",{className:"w-full h-full absolute data-[overlay=false]:hidden",onDoubleClick:l,"data-testid":"test-display","data-overlay":!0}),e.jsx("input",{type:"text",className:"text-xl bg-transparent text-center font-bold cursor-default whitespace-nowrap text-ellipsis overflow-hidden",onKeyDown:t=>t.code==="Enter"&&n(),defaultValue:a==null?void 0:a.fullname}),e.jsx("div",{"data-save":!1,onClick:n,className:"bg-light rounded-full justify-center items-center hidden data-[save=true]:flex",children:e.jsx(M,{className:"fill-green-500 text-2xl cursor-pointer","data-testid":"button-save"})})]})})}const H=({menuIsOpen:a})=>{const{setModalContent:r,clearModal:s}=u.useContext(_),{client:l}=u.useContext(j),n=I(),t=()=>{function i(){localStorage.removeItem("token"),s("modal_confirm_exit_panel"),n("/login")}r({componentName:"modal_confirm_exit_panel",components:e.jsx($,{children:e.jsx(K,{title:"Tem certeza que deseja sair do painel?",confirmFunction:i,cancelFuntion:()=>s("modal_confirm_exit_panel")})})})},o=()=>{n("/panel?tab=5")};return l&&e.jsx("div",{className:"w-full min-h-[80px] flex flex-col gap-2 justify-center items-center relative",children:e.jsxs("div",{className:"w-4/5 flex flex-col justify-center items-center gap-2 border-b border-primary-100 dark:border-light/30 pb-8",children:[e.jsxs("div",{className:"w-full flex justify-center gap-2 items-end",children:[e.jsx(v,{tip:"Edite seu perfil",children:e.jsx(q,{"data-menuisopen":a,className:"text-3xl cursor-pointer hover:animate-spin data-[menuisopen=false]:hidden",onClick:o})}),e.jsx(V,{menuIsOpen:a}),e.jsx(v,{tip:"Sair do seu painel",children:e.jsx(R,{"data-menuisopen":a,className:"text-3xl cursor-pointer -scale-x-100 hover:fill-red-500 transition-colors duration-200 data-[menuisopen=false]:hidden",onClick:t})})]}),e.jsxs("div",{className:`w-full flex flex-col ${a?"block":"hidden"}`,children:[e.jsx(W,{}),e.jsx("h3",{"data-ismessages":g(l.plan_management).maxMessages,className:"flex gap-1 justify-center items-center text-primary-200 dark:text-light font-bold data-[ismessages='0']:hidden",children:g(l.plan_management).reminingMessages+" / "+g(l.plan_management).maxMessages})]})]})})},J=[{name:"Meus chats",Icon:F},{name:"Métricas",Icon:z},{name:"Fonte de dados",Icon:T},{name:"Registros",Icon:U},{name:"Assinatura",Icon:D}];function Q({menuIsOpen:a}){const r=I(),[s]=E(),l=n=>{r(`/panel?tab=${n}`)};return e.jsx("ul",{className:"w-full flex flex-col items-end",children:J.map((n,t)=>e.jsx("li",{"data-tab":Number(s.get("tab"))==t,className:"w-full py-3 flex gap-2 justify-center items-center text-center cursor-pointer font-bold text-xl hover:text-primary-300 hover:dark:text-light hover:bg-primary-100 hover:dark:bg-dark data-[tab=true]:dark:bg-dark transition-colors duration-300 group",onClick:()=>l(t),children:e.jsxs("div",{"data-menuisopen":a,className:"w-full data-[menuisopen=true]:w-4/5 flex justify-center data-[menuisopen=true]:justify-start items-center gap-2",children:[e.jsx(n.Icon,{className:"group-hover:fill-green_color text-xl transition-colors duration-100"}),e.jsx("p",{className:`group-hover:text-green_color transition-colors duration-100 whitespace-nowrap text-ellipsis ${a?"block":"hidden"}`,children:n.name})]})},n.name))})}const X=({menuIsOpen:a,setMenuIsOpen:r})=>e.jsx("div",{"data-menuisopen":a,className:"w-full absolute bottom-6 flex data-[menuisopen=true]:justify-end justify-center",children:a?e.jsx(A,{className:"text-4xl fill-zinc-100 cursor-pointer","data-control-arrow":"left",onClick:()=>r(!1)}):e.jsx(B,{className:"text-4xl fill-zinc-100 cursor-pointer","data-control-arrow":"right",onClick:()=>r(!0)})});function Y(){return e.jsx("h2",{className:"w-full flex justify-center items-center p-4",children:e.jsx("img",{src:G,alt:"Logo da empresa",className:"w-[120px]"})})}function ee(){const[a,r]=u.useState(!0);return e.jsxs("main",{"data-menuisopen":a,className:"w-[280px] data-[menuisopen=false]:w-[70px] relative h-full bg-gradient-to-b from-primary-100 via-light to-light dark:to-primary-300 dark:via-primary-300",children:[e.jsx(Y,{}),e.jsxs("nav",{className:"w-full py-4 relative",children:[e.jsx(H,{menuIsOpen:a}),e.jsx(Q,{menuIsOpen:a})]}),e.jsx(X,{menuIsOpen:a,setMenuIsOpen:r})]})}export{ee as default};
