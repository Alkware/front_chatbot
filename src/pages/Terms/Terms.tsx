import { Footer } from "../Home/components/Footer/Footer";
import { Header } from "../Home/components/Header/Header";

export function Terms() {
    return (
        <div className="w-screen flex flex-col items-center bg-light dark:bg-dark text-primary-100 dark:text-light">
            <Header />
            <div className="w-4/5 my-[100px] space-y-16">
                <div className="w-full flex flex-col items-center">
                    <h2>TERMOS DE USO</h2>
                    <h3>Termos e condições de uso</h3>
                </div>

                <p className="w-4/5 text-center mx-auto">
                    A empresa denominada como "Nós" ou "WIPZEE", opera o website wipzee.com, onde fornece um serviço de licenciamento do programa de computador customizável para criar e adicionar chatbots inteligentes em seu próprio site ("Serviço").
                </p>

                <div>
                    <h2 className="font-bold text-xl">1. Termos</h2>
                    <p>
                        Ao acessar ao site wipzee.com, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.
                    </p>
                </div>
                <div>
                    <h2 className="font-bold text-xl">
                        2. Uso de Licença
                    </h2>
                    <p>
                        É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site wipzee.com , apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:
                    </p>
                    <p>
                        modificar ou copiar os materiais;
                    </p>
                    <p>
                        usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);
                        tentar descompilar ou fazer engenharia reversa de qualquer software contido no site wipzee.com;
                        remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou
                        transferir os materiais para outra pessoa ou "espelhar" os materiais em qualquer outro servidor.
                    </p>
                    <p>
                        O uso dos nossos chatbots, embora automatizado pela tecnologia da OpenAI, é sujeito ao uso responsável e legal pelo cliente. A Wipzee não se responsabiliza por erros, inverdades ou informações incorretas fornecidas pelo chatbot em resposta às interações dos usuários finais. O cliente é responsável pela definição do conteúdo fornecido ao chatbot e deve assegurar-se que eles não violem leis ou regulamentos aplicáveis.
                    </p>
                    <p>
                        Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por Wipzee a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrónico ou impresso.
                    </p>
                </div>
                <div>
                    <h2 className="font-bold text-xl">
                        3. Isenção de responsabilidade
                    </h2>
                    <p>
                        A Wipzee não se responsabiliza pelo uso indevido dos chatbots por seus clientes, incluindo, mas não se limitando a, uso para fins ilícitos, prejudiciais ou fraudulentos. A Wipzee reserva-se o direito de encerrar o serviço a qualquer momento se identificar tal uso, sem prejuízo de outras medidas legais cabíveis.
                    </p>
                    <p>
                        Os materiais no site da Wipzee são fornecidos "como estão". Wipzee não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.
                    </p>
                    <p>
                        Além disso, a Wipzee não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.
                    </p>
                </div>
                <div>

                    <h2 className="font-bold text-xl">
                        4. Limitações
                    </h2>
                    <p>
                        Em nenhum caso a Wipzee ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Wipzee, mesmo que Wipzee ou um representante autorizado da Wipzee tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade por danos consequentes ou incidentais, essas limitações podem não se aplicar a você.
                    </p>
                </div>

                <div>
                    <h2 className="font-bold text-xl">
                        5. Precisão dos materiais
                    </h2>
                    <p>
                        Os materiais exibidos no site da Wipzee podem incluir erros técnicos, tipográficos ou fotográficos. Wipzee não garante que qualquer material em seu site seja preciso, completo ou atual. Wipzee pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, Wipzee não se compromete a atualizar os materiais.
                    </p>
                </div>

                <div>
                    <h2 className="font-bold text-xl">
                        6. Links
                    </h2>
                    <p>
                        A Wipzee não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por Wipzee do site. O uso de qualquer site vinculado é por conta e risco do usuário.
                    </p>
                </div>
                <div>
                    <h2 className="font-bold text-xl">
                        7. Política de reembolso
                    </h2>
                    <p>
                        Nos resguardamos ao direito de consumidor, oferecendo a opção de reembolso integral dentro de 7 (sete) dias a partir da data de início da assinatura, desde que o cliente não tenha utilizado nenhum crédito do serviço, com exceção dos créditos oferecidos gratuitamente. Se o cliente utilizar qualquer crédito do serviço ou se passar o período de 7 (sete) dias, não será possível solicitar reembolso, embora o cliente tenha a opção de cancelar a renovação automática do plano.
                    </p>
                    <p>
                        Reembolsos serão processados pela Ticto e podem levar até 10 (dez) dias para serem refletidos em sua fatura. A Wipzee também reserva o direito de encerrar o serviço a qualquer momento e por qualquer motivo. Caso a Wipzee encerre o serviço, um reembolso será fornecido com base na utilização em dias feita por cada cliente.
                    </p>
                </div>
                <div>
                    <h2 className="font-bold text-xl">
                        8. Cancelamento e Cobranças Automáticas
                    </h2>
                    <p>
                        Ao fornecer suas informações de pagamento, você autoriza a Wipzee a debitar automaticamente do seu cartão de crédito no início de cada ciclo de faturamento. Este procedimento assegura a continuidade do serviço, a menos que a conta seja cancelada antes do final do período de assinatura em vigor. Ao cancelar sua assinatura, você está apenas cancelando a renovação automática do seu plano. Não haverá reembolso para o ciclo de cobrança atual e você poderá continuar a usar o serviço até o final do seu ciclo de cobrança atual. Ao fazer um pagamento para a Wipzee e ao autorizar o débito em seu cartão de crédito, você concede permissão para que todos os pagamentos subsequentes sejam debitados automaticamente de seu cartão de crédito sem necessidade de notificação adicional após o pagamento inicial. Você pode cancelar sua assinatura a qualquer momento por meio do portal do assinante ou entrando em contato com nosso serviço de atendimento ao cliente.
                    </p>
                </div>
                <div>
                    <h2 className="font-bold text-xl">
                        9. Modificações
                    </h2>
                    <p>
                        A Wipzee pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual destes termos de serviço.
                    </p>
                </div>
                <div>
                    <h2 className="font-bold text-xl">
                        10. Lei aplicável
                    </h2>
                    <p>
                        Estes termos e condições são regidos e interpretados de acordo com as leis da Wipzee e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    )
};