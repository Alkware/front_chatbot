import{r as p,C as b,J as h,aB as n,j as e,aC as S,aA as A,M as C,T as j,aD as z,m as R,u as k,Z as F,aE as I,P as D,aF as T,aG as P,aH as q,aI as V,aJ as B,aK as O,aL as G,aM as H,h as Z,aN as J}from"./index-x9zFc4c2.js";import{m as x,C as K}from"./messagesEventManager-_Z0_UbeF.js";function W(){const{client:a}=p.useContext(b),s=p.useRef(null),[t]=h(),l=t.get(n.URL_NAME)===n.DEFAULT_VALUES.DEFAULT,o=async r=>{var d,c,m,u;const i=r.target.files;if(i.length&&i[0].size<4e6){const g=new FileReader;g.onload=v=>{var y,N,L,E,M,U,_;if(s.current){const w=s.current.querySelector("img");w&&((y=v.target)!=null&&y.result)&&(w.src=v.target.result.toString())}(N=s.current)==null||N.classList.add("flex"),(L=s.current)==null||L.classList.remove("hidden"),(M=(E=s.current)==null?void 0:E.querySelector("div#loading"))==null||M.classList.add("flex"),(_=(U=s.current)==null?void 0:U.querySelector("div#loading"))==null||_.classList.remove("hidden")},g.readAsDataURL(i[0]);const f=await S(i[0]);f!=null&&f.data&&a&&(await A({client_id:a==null?void 0:a.id,logo:f.data.url}),(c=(d=s.current)==null?void 0:d.querySelector("div#loading"))==null||c.classList.remove("flex"),(u=(m=s.current)==null?void 0:m.querySelector("div#loading"))==null||u.classList.add("hidden"))}};return e.jsx("div",{"data-ismenuresized":l,className:"w-[100px] h-[100px] md:w-[40px] md:h-[40px] md:data-[ismenuresized=true]:w-[80px] md:data-[ismenuresized=true]:h-[80px] rounded-full overflow-hidden cursor-pointer border-4 border-primary-100 dark:border-light",children:e.jsxs("label",{className:"w-full h-full relative cursor-pointer",ref:s,onChange:o,children:[e.jsx("input",{type:"file",className:"hidden",accept:".png, .jpg, .jpeg, .webp"}),e.jsx("img",{src:(a==null?void 0:a.logo)||"https://via.placeholder.com/100",alt:"",className:"w-full h-full object-contain"}),e.jsx("div",{id:"loading",className:"w-full h-full bg-zinc-800/50 absolute top-0 left-0 justify-center items-center hidden",children:e.jsx("div",{className:"w-[40px] h-[40px] border-2 border-t-primary-300 rounded-full animate-spin"})})]})})}function Q(){const{client:a}=p.useContext(b),{setModalContent:s}=p.useContext(C),t=p.useRef(null),l=({currentTarget:r})=>{var m,u;r.dataset.overlay=!1,r.style.display=!1;const i=(m=t.current)==null?void 0:m.querySelector("input"),d=t.current,c=(u=t.current)==null?void 0:u.querySelector("div[data-save]");i&&d&&c&&(d.classList.add("border"),i.classList.remove("disabled"),c.dataset.save=!0)},o=async()=>{var m,u,g;const r=(m=t.current)==null?void 0:m.querySelector("input"),i=t.current,d=(u=t.current)==null?void 0:u.querySelector("div[data-save]"),c=(g=t.current)==null?void 0:g.querySelector("div[data-overlay]");if(a){const f=r==null?void 0:r.value.split(" "),[v,y]=f||[];v&&y?(await A({client_id:a==null?void 0:a.id,fullname:r==null?void 0:r.value}),r&&i&&d&&(i.classList.remove("border"),r.classList.add("disabled"),d.dataset.save=!1,c.dataset.overlay=!0,r.blur())):s({componentName:"modal_error_name",components:e.jsx(R,{message:"Digite seu nome e sobrenome",type:"WARNING",componentName:"modal_error_name"})})}};return e.jsx(j,{tip:"2 cliques para editar seu nome",children:e.jsxs("div",{className:"w-full px-2 flex justify-center gap-2 items-center rounded-lg relative",ref:t,children:[e.jsx("div",{className:"w-full h-full absolute data-[overlay=false]:hidden",onDoubleClick:l,"data-testid":"test-display","data-overlay":!0}),e.jsx("input",{type:"text",className:"text-xl bg-transparent text-primary-100 dark:text-light text-center font-bold cursor-default whitespace-nowrap text-ellipsis overflow-hidden",onKeyDown:r=>r.code==="Enter"&&o(),defaultValue:a==null?void 0:a.fullname}),e.jsx("div",{"data-save":!1,onClick:o,className:"bg-light rounded-full justify-center items-center hidden data-[save=true]:flex",children:e.jsx(z,{className:"fill-green-500 text-2xl cursor-pointer","data-testid":"button-save"})})]})})}const X=({})=>{const{setModalContent:a,clearModal:s}=p.useContext(C),{client:t}=p.useContext(b),l=k(),[o]=h(),r=o.get(n.URL_NAME)===n.DEFAULT_VALUES.DEFAULT,i=()=>{function c(){localStorage.removeItem("token"),s("modal_confirm_exit_panel"),l("/login")}a({componentName:"modal_confirm_exit_panel",components:e.jsx(D,{children:e.jsx(K,{title:"Tem certeza que deseja sair do painel?",confirmFunction:c,cancelFuntion:()=>s("modal_confirm_exit_panel")})})})},d=()=>{l("/panel?tab=6")};return t&&e.jsx("div",{className:"w-full flex flex-col gap-2 justify-center items-center relative",children:e.jsxs("div",{className:"w-4/5 pb-2 flex flex-col justify-center items-center gap-2 border-b border-primary-100 dark:border-light/30",children:[e.jsxs("div",{className:"w-full flex justify-center gap-2 items-end",children:[e.jsx(j,{tip:"Edite seu perfil",children:e.jsx(F,{"data-ismenuresized":r,className:"text-2xl cursor-pointer hover:animate-spin md:data-[ismenuresized=false]:hidden fill-primary-100 dark:fill-light",onClick:d})}),e.jsx(W,{}),e.jsx(j,{tip:"Sair do seu painel",children:e.jsx(I,{"data-ismenuresized":r,className:"text-2xl cursor-pointer -scale-x-100 fill-primary-100 dark:fill-light hover:fill-red-500 transition-colors duration-200 md:data-[ismenuresized=false]:hidden",onClick:i})})]}),e.jsxs("div",{"data-ismenuresized":r,className:"w-full flex flex-col md:data-[ismenuresized=false]:hidden",children:[e.jsx(Q,{}),e.jsx("h3",{"data-ismessages":x(t.plan_management).maxMessages,className:"flex gap-1 justify-center items-center text-primary-100 dark:text-light font-bold data-[ismessages='0']:hidden",children:x(t.plan_management).totalMessages+" / "+x(t.plan_management).maxMessages}),e.jsxs("h3",{"data-ismessages":x(t.plan_management).maxBonus,className:"flex gap-1 justify-center items-center bg-primary-300 p-1 rounded-lg border border-primary-100 text-primary-100 dark:text-light font-bold data-[ismessages='0']:hidden",children:["Bônus",e.jsx("span",{children:x(t.plan_management).reminingMessagesBonus+" / "+x(t.plan_management).maxBonus})]})]})]})})},Y=[{name:"Meus chats",Icon:T},{name:"Métricas",Icon:P},{name:"Fonte de dados",Icon:q},{name:"Registros",Icon:V},{name:"Assinatura",Icon:B},{name:"Central de ajuda",Icon:O}];function $({urlParamName:a}){const[s,t]=h(),l=s.get(n.URL_NAME)===n.DEFAULT_VALUES.DEFAULT,o=r=>{s.get(a)&&s.set(a,"close"),s.set("tab",r.toString()),t(s)};return e.jsx("ul",{className:"w-full flex flex-col items-end",children:Y.map((r,i)=>e.jsx("li",{"data-tab":Number(s.get("tab"))==i,"data-ismenuresize":l,className:"group w-full py-2 tall-6:py-3 flex gap-2 justify-center items-center text-center cursor-pointer font-bold text-xl hover:text-primary-300 hover:dark:text-light hover:bg-primary-100/30 hover:dark:bg-dark data-[tab=true]:dark:bg-dark transition-colors duration-300",onClick:()=>o(i),children:e.jsxs("div",{className:"w-full group-data-[ismenuresize=true]:w-4/5 flex justify-center data-[ismenuresize=true]:justify-start items-center gap-2",children:[e.jsx(r.Icon,{className:"group-hover:fill-primary-100 text-primary-100 dark:text-light text-xl transition-colors duration-100"}),e.jsx("p",{className:"md:group-data-[ismenuresize=false]:hidden group-hover:text-primary-100 text-primary-100 dark:text-white transition-colors duration-100 whitespace-nowrap text-ellipsis",children:r.name})]})},r.name))})}const ee=()=>{const[a,s]=h(),t=a.get(n.URL_NAME)===n.DEFAULT_VALUES.DEFAULT,l=()=>{const o=a.get(n.URL_NAME);t||(a.append(n.URL_NAME,n.DEFAULT_VALUES.DEFAULT),s(a)),o===n.DEFAULT_VALUES.DEFAULT?a.set(n.URL_NAME,n.DEFAULT_VALUES.RESIZED):a.set(n.URL_NAME,n.DEFAULT_VALUES.DEFAULT),s(a)};return e.jsx("div",{"data-ismenuresize":t,className:"hidden md:flex w-full data-[ismenuresize=true]:absolute top-0 data-[ismenuresize=true]:justify-end justify-center z-50",children:t?e.jsx(G,{className:"text-4xl fill-primary-100 dark:fill-zinc-100 cursor-pointer","data-control-arrow":"left",onClick:l}):e.jsx(H,{className:"text-4xl fill-primary-100 dark:fill-zinc-100 cursor-pointer","data-control-arrow":"right",onClick:l})})};function te(){const[a]=h(),s="menu_mobile",t=a.get(n.URL_NAME)===n.DEFAULT_VALUES.DEFAULT,l=a.get(s)==="open";return e.jsxs("div",{"data-isresizemenu":t,"data-isopenmobilemenu":l,className:"w-full md:w-[300px] fixed z-[999] md:relative data-[isopenmobilemenu=false]:w-auto md:data-[isresizemenu=false]:w-[70px] bg-primary-100 rounded-b-md md:rounded-none",children:[e.jsx(ee,{}),e.jsxs("div",{"data-isopenmobilemenu":l,className:"flex flex-col min-h-screen py-4 md:py-0 data-[isopenmobilemenu='false']:hidden md:data-[isopenmobilemenu='false']:flex bg-gradient-to-b from-primary-100 via-light to-light dark:to-primary-300 dark:via-primary-300",children:[e.jsx(Z,{urlParamName:s,className:"md:hidden"}),e.jsx(J,{}),e.jsxs("nav",{className:"w-full h-full py-0 my-4 relative",children:[e.jsx(X,{}),e.jsx($,{urlParamName:s})]})]})]})}export{te as default};
