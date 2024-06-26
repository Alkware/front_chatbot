import { Footer } from "../Home/components/Footer/Footer"
import { Header } from "../Home/components/Header/Header"

export function Police() {
    return (
        <div className="w-screen flex flex-col items-center bg-light dark:bg-dark text-primary-100 dark:text-light">
            <Header />
            <div className="my-[100px] space-y-16">
                <div className="my-8">
                    <h1 className="text-center text-2xl font-bold">POLÍTICAS DE PRIVACIDADE</h1>
                </div>

                <div className="mx-auto flex flex-col gap-6 w-4/5">
                    <div>
                        <p className="font-bold">Olá, bem-vindo(a)!</p>
                        <p>Nós da Wipzee valorizamos a privacidade e queremos contribuir para a proteção de dados pessoais. Por essa razão, a seguir apresentamos nossa Política de Privacidade, para que você saiba como fazemos uso de seus dados pessoais.</p>
                    </div>

                    <div className="flex flex-col">
                        <h3 className="font-bold text-xl py-2">O que faz a Wipzee?</h3>
                        <p>A Wipzee é um site que se dedica ao desenvolvimento e licenciamento de programas de computador customizáveis, oferecendo um serviço de chatbots inteligentes personalizados (SaaS) que utilizam a tecnologia avançada de inteligência artificial.</p>
                        <p> Os programas que desenvolvemos são configuráveis para atender a uma variedade de aplicações, desde atendimento ao cliente, suporte técnico, assistência pessoal, educação e muito mais. Além disso, o licenciamento de nossos programas proporciona aos usuários a capacidade de integrar essas poderosas ferramentas de IA em suas próprias plataformas e sistemas.</p>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-bold text-xl py-2">Como funciona o tratamento de dados por parte da Wipzee?</h3>
                        <p>Como toda a empresa, para realizar nossas atividades, precisamos coletar e tratar algumas informações que são consideradas pela legislação como dados pessoais. Para deixá-lo informado acerca do modo como fazemos o tratamento desses dados, preparamos o quadro resumo a seguir, com as principais perguntas que você pode ter.</p>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="font-bold text-xl py-2">Quais Dados Pessoais Coletamos?</h2>
                        <h3>
                            Em síntese, coletamos os seguintes dados pessoais, mas não restritos a:
                        </h3>
                        <ul className="my-2 font-medium">
                            <li>Nome;</li>
                            <li>Endereço comercial;</li>
                            <li>E-mail;</li>
                            <li>Informações de pagamento;</li>
                        </ul>
                        <p className="py-2">Para além dessas situações, poderemos utilizar seus dados pessoais de forma anonimizada (ou seja, de maneira que não leve à identificação de ninguém), com a finalidade de produzir relatórios analíticos de inteligência de negócio, a fim de melhorar nossos serviços.</p>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="font-bold text-xl py-2">Para que utilizamos os Dados Pessoais?</h2>
                        <p>
                            Em síntese, utilizamos os dados pessoais coletados para finalidades ligadas à prestação de nossos serviços e às empresas que nos contratam. Nesse contexto, os dados pessoais nos são úteis para:
                        </p>
                        <ul className="m-4 list-decimal">
                            <li>Customizar a experiência do usuário;</li>
                            <li>Publicidade e marketing;</li>
                            <li>Garantir o acesso ao site;</li>
                            <li>Analytics e pesquisa de mercado;</li>
                            <li>Contatar os usuários;</li>
                        </ul>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="font-bold text-xl">Com quem compartilhamos os Dados Pessoais?</h2>
                        <p>Os dados pessoais podem ser compartilhados com alguns destinatários, quais sejam:</p>
                        <p className="my-2">
                            <div>
                                <span className="font-bold inline pr-2">Ticto:</span>
                                <p className="inline">Usamos a  Ticto para processar pagamentos. Se você optar por usar nossos serviços pagos, seus detalhes de pagamento serão compartilhados com a Ticto. Eles são rigorosos em suas práticas de segurança e proteção de dados, e mais informações sobre sua política de privacidade podem ser encontradas em seu website.</p>
                            </div>
                            <div>
                                <span className="font-bold inline pr-2">OpenAI:</span>
                                <p className="inline">A tecnologia do ChatGPT que usamos é fornecida pela OpenAI. No entanto, note que a OpenAI recebe apenas dados anonimizados e agregados para fins de melhoria do serviço, não tendo acesso a dados pessoais identificáveis.</p>
                            </div>
                            <div>
                                <span className="font-bold inline pr-2">Google Analytics:</span>
                                <p className="inline">Usamos o Google Analytics para entender como nossos serviços são usados. Este serviço coleta dados de uso, que são anonimizados e agregados para garantir que a privacidade do usuário seja mantida. Consulte a política de privacidade do Google para obter mais informações.</p>
                            </div>
                            <div>
                                <span className="font-bold inline pr-2">Facebook Pixel:</span>
                                <p className="inline">Utilizamos o Facebook Pixel para compreender a eficácia de nossas campanhas de marketing e para ajudar a personalizar anúncios publicitários. Os dados compartilhados com o Facebook estão sujeitos à sua política de privacidade.</p>
                            </div>
                            <div>
                                <span className="font-bold inline pr-2">Hotjar:</span>
                                <p className="inline"> Utilizamos o Hotjar para entender melhor as necessidades de nossos usuários e para otimizar nossos serviços e experiência do usuário. As informações coletadas pelo Hotjar são estatísticas de uso e comportamento do usuário, sem coleta de informações pessoais identificáveis.</p>
                            </div>
                            <div>
                                <span className="font-bold inline pr-2">Sentry:</span>
                                <p className="inline">
                                    Utilizamos o Sentry para monitorar e solucionar problemas técnicos que possam surgir com nossos serviços. As informações enviadas para o Sentry são principalmente relacionadas a erros técnicos e de desempenho, sem coleta de informações pessoais identificáveis.
                                </p>
                            </div>
                        </p>
                    </div>
                    <p>
                        Por favor, note que todos os terceiros com os quais compartilhamos seus dados são cuidadosamente selecionados e cumpridores das leis e regulamentações de proteção de dados.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    )
};