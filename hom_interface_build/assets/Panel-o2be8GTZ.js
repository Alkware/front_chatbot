import{j as s,r as l,M as h,C,I as E,B as M,l as j,u as S,P as v,_ as b,a as $,b as P,c as k}from"./index-jDdyFPtE.js";const D="data:image/svg+xml,%3csvg%20id='eUSIwYNzq8E1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='-48.5%20-48.5%20582%20582'%20shape-rendering='geometricPrecision'%20text-rendering='geometricPrecision'%3e%3cg%20transform='translate(.000015%200)'%3e%3cg%3e%3cpath%20d='M413.974,71.026C368.171,25.225,307.274,0,242.5,0s-125.671,25.225-171.474,71.026C25.225,116.829,0,177.726,0,242.5s25.225,125.671,71.026,171.474C116.829,459.775,177.726,485,242.5,485s125.671-25.225,171.474-71.026C459.775,368.171,485,307.274,485,242.5s-25.225-125.671-71.026-171.474ZM242.5,455C125.327,455,30,359.673,30,242.5s95.327-212.5,212.5-212.5s212.5,95.327,212.5,212.5-95.327,212.5-212.5,212.5Z'%20fill='%237672f2'/%3e%3cpath%20d='M318.514,231.486c19.299,0,35-15.701,35-35s-15.701-35-35-35-35,15.701-35,35s15.701,35,35,35Z'%20fill='%237672f2'/%3e%3cpath%20d='M166.486,231.486c19.299,0,35-15.701,35-35s-15.701-35-35-35-35,15.701-35,35s15.702,35,35,35Z'%20fill='%237672f2'/%3e%3cpath%20d='M242.5,355c-46.911,0-89.35-29.619-105.604-73.703l-28.148,10.378C129.329,347.496,183.08,385,242.5,385s108.449238-36.680509,120.719397-77c3.079369-10.118745-15.115397-26.703-15.115397-26.703C331.85,325.381,289.411,355,242.5,355Z'%20transform='matrix(1%200.017455-.034202%200.979403%2010.683901%207.493635)'%20fill='%237672f2'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e";function y(){return s.jsxs("div",{className:"w-full h-full grid place-items-center gap-4 bg-light dark:bg-dark",children:[s.jsx("img",{src:D,alt:"logo loading wipzee",className:"w-full max-w-[100px] md:max-w-[250px] h-full object-cover animate-pulse"}),s.jsx("span",{className:"animate-pulse text-xl md:text-2xl text-center",children:"Carregando, aguarde."})]})}/*!
 * cpf-cnpj-validator v1.0.3
 * (c) 2020-present Carvalho, Vinicius Luiz <carvalho.viniciusluiz@gmail.com>
 * Released under the MIT License.
 */const R=["00000000000","11111111111","22222222222","33333333333","44444444444","55555555555","66666666666","77777777777","88888888888","99999999999","12345678909"],T=/[.-]/g,O=/[^\d]/g,u=n=>{const e=n.split("").map(r=>parseInt(r,10)),t=e.length+1,o=e.map((r,c)=>r*(t-c)).reduce((r,c)=>r+c)%11;return o<2?0:11-o},p=(n,e)=>{const t=e?T:O;return(n||"").replace(t,"")},w=n=>p(n).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/,"$1.$2.$3-$4"),A=(n,e)=>{const t=p(n,e);if(!t||t.length!==11||R.includes(t))return!1;let a=t.substr(0,9);return a+=u(a),a+=u(a),a.substr(-2)===t.substr(-2)},L=n=>{let e="";for(let t=0;t<9;t+=1)e+=Math.floor(Math.random()*9);return e+=u(e),e+=u(e),n?w(e):e};var V={verifierDigit:u,strip:p,format:w,isValid:A,generate:L};const z=["00000000000000","11111111111111","22222222222222","33333333333333","44444444444444","55555555555555","66666666666666","77777777777777","88888888888888","99999999999999"],Z=/[-\\/.]/g,B=/[^\d]/g,d=n=>{let e=2;const o=n.split("").reduce((r,c)=>[parseInt(c,10)].concat(r),[]).reduce((r,c)=>(r+=c*e,e=e===9?2:e+1,r),0)%11;return o<2?0:11-o},m=(n,e)=>{const t=e?Z:B;return(n||"").replace(t,"")},N=n=>m(n).replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,"$1.$2.$3/$4-$5"),G=(n,e)=>{const t=m(n,e);if(!t||t.length!==14||z.includes(t))return!1;let a=t.substr(0,12);return a+=d(a),a+=d(a),a.substr(-2)===t.substr(-2)},q=n=>{let e="";for(let t=0;t<12;t+=1)e+=Math.floor(Math.random()*9);return e+=d(e),e+=d(e),n?N(e):e};var X={verifierDigit:d,strip:m,format:N,isValid:G,generate:q};function K(n){const e=n.target.value.replaceAll(/[:_.\-/a-zA-Z]/g,""),t=e.length<=11?V.format(e):X.format(e);n.target.value=t}function U({modalName:n}){const{clearModal:e,setModalContent:t}=l.useContext(h),{client:a}=l.useContext(C),o=l.useRef(null),r=()=>{e(n)},c=async()=>{var g,x,_;const i=(x=(g=o.current)==null?void 0:g.querySelector("input"))==null?void 0:x.value,f=(_=o.current)==null?void 0:_.querySelector("button");if(j(f,!0),!!a){if(i&&(i.length===11||i.length===14||i.length===18)){const I=i.replaceAll(".","").replaceAll("/","").replaceAll("-","");await S({client_id:a.id,cpf_cnpj:I})&&(t({componentName:"modal_success_save_cpf_cnpj",components:s.jsx(v,{componentName:"modal_success_save_cpf_cnpj",message:"Dado salvo com sucesso!"})}),e(n))}else t({componentName:"modal_failed_save_cpf_cnpj",components:s.jsx(v,{componentName:"modal_failed_save_cpf_cnpj",message:"Cpf ou cnpj inválido! Tente novamente",type:"WARNING"})});j(f,!1)}};return s.jsxs("div",{className:"bg-light dark:bg-dark rounded-md p-4 flex flex-col items-center",children:[s.jsx("h2",{className:"font-bold text-2xl text-orange-500",children:"AVISO"}),s.jsx("p",{className:"text-medium text-lg text-orange-700",children:"Você ainda não registrou seu cpf ou cnpj..."}),s.jsxs("p",{className:"text-center opacity-80 text-orange-700/90",children:["Para manter a segurança da sua conta,",s.jsx("br",{})," é necessário que você salve em nosso sistema seu cpf ou cnpj."]}),s.jsxs("div",{className:"w-full mt-8",ref:o,children:[s.jsx(E,{name:"cpf_cnpj",title:"Digite seu cpf ou cnpj",mask:K}),s.jsxs("div",{className:"w-full flex mt-8 justify-evenly items-center",children:[s.jsx("span",{className:"underline opacity-80 cursor-pointer",onClick:r,children:"Deixar para depois"}),s.jsx(M,{onClick:c,children:"Salvar"})]})]})]})}function F(n){const e=Number(new Date),t=Number(new Date(n)),o=(e-t)/(1e3*3600);return Math.floor(o)}const H=l.lazy(()=>b(()=>import("./MainPanelClient-Rf4IR7gk.js"),__vite__mapDeps([0,1,2,3]))),W=l.lazy(()=>b(()=>import("./NavigatePanelClient-BkNvo4My.js"),__vite__mapDeps([4,1,2,3])));function Y(){const{setClient:n,client:e}=l.useContext(C),{setModalContent:t}=l.useContext(h),a=$();return l.useEffect(()=>{(async()=>{const o=localStorage.theme==="dark";document.documentElement.classList.toggle("dark",!!o);const r=localStorage.getItem("token");if(!r)return;const c=await P(r);c?(!c.data.client.cpf_cnpj&&F(c.data.client.created_at)>24&&t({componentName:"modal_save_cpf_cnpj",components:s.jsx(k,{children:s.jsx(U,{modalName:"modal_save_cpf_cnpj"})})}),n(c.data.client)):a("/login")})()},[]),s.jsx("div",{className:"w-screen min-h-screen flex items-center text-primary-100 dark:text-light bg-light dark:bg-dark",children:e?s.jsxs("div",{className:"w-full h-full flex justify-start md:justify-center items-start",children:[s.jsx(W,{}),s.jsx(H,{})]}):s.jsx(y,{})})}const ee=Object.freeze(Object.defineProperty({__proto__:null,default:Y},Symbol.toStringTag,{value:"Module"}));export{ee as P,F as c};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/MainPanelClient-Rf4IR7gk.js","assets/index-jDdyFPtE.js","assets/index-XPSGOr17.css","assets/messagesEventManager-RvmJBvzC.js","assets/NavigatePanelClient-BkNvo4My.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
