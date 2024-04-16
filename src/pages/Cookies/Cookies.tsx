import { Footer } from "../Home/components/Footer/Footer";
import { Header } from "../Home/components/Header/Header";

export function Cookies() {
    return (
        <div className="w-screen flex flex-col bg-light dark:bg-dark text-primary-100 dark:text-light">
            <Header />
            <div className="w-4/5 mx-auto my-[100px] space-y-12">
                <h1 className="font-bold text-2xl text-center p-4">
                    POLÍTICAS DE COOKIES
                </h1>

                <div>
                    <h2 className="font-bold text-xl py-2">
                        O que são cookies?
                    </h2>
                    <p>
                        Os cookies são arquivos digitais com pequenos fragmentos de dados (e geralmente com um identificador único)
                        que são salvos e armazenados no dispositivo do usuário de uma plataforma digital. Eles podem ser classificados
                        como cookies temporários (sendo automaticamente apagados quando o navegador ou aplicativo é encerrado)
                        ou cookies persistentes (que permanecem armazenados no dispositivo até uma data de expiração definida),
                        bem como cookies originais (definidos pelo responsável que opera a plataforma)
                        ou cookies terceiros (definidos por aplicações sob responsabilidade de terceiros) Os cookies podem ser
                        categorizados conforme o seu propósito. Existem cookies que são estritamente necessários para o correto
                        funcionamento das plataformas, enquanto outros coletam dados estatísticos com a finalidade de analisar a
                        utilização da plataforma e seu respectivo desempenho. Também há cookies que são utilizados para assegurar a
                        disponibilização de funcionalidades adicionais das plataformas ou para guardar as preferências definidas pelo
                        usuário no uso da plataforma, sempre que utilizar o mesmo dispositivo. Já outros cookies podem servir, ainda,
                        para medir o sucesso de aplicações e a eficácia da publicidade de terceiros.
                    </p>
                </div>

                <div>
                    <h2 className="font-bold text-xl py-2">
                        Por que utilizamos Cookies?
                    </h2>
                    <p>
                        Atualmente, a utilização de cookies comum em qualquer plataforma digital. Seu uso não prejudica de forma alguma os dispositivos (computadores, tablets, celulares, etc.) dos usuários em que são armazenados. Eles aprimoram a experiência do usuário, tanto em termos de performance, como em termos de usabilidade, uma vez que os conteúdos disponibilizados serão direcionados às necessidades e expectativas do usuário.
                        Os cookies permitem que uma plataforma digital memorize informações sobre a visita do usuário, o seu idioma preferido, a sua localização, a recorrência das suas sessões e outras variáveis que nós consideramos relevantes para tornar a sua experiência muito mais eficiente.
                        Os cookies também poderão ser utilizados para compilar estatísticas anônimas e agregadas que permite entender como os usuários utilizam as nossa plataforma, bem como para aprimorar suas estruturas e conteúdo. É importante dizer que não podemos identificá-lo pessoalmente por meio desses dados.
                    </p>
                </div>

                <div>
                    <h2 className="font-bold text-xl py-2">
                        Quais tipos de cookies são utilizados?
                    </h2>
                    <h3 className="font-medium italic">
                        Cookies essenciais
                    </h3>
                    <p className="pl-4">
                        Esses cookies são essenciais para que as nossas plataformas digitais funcionem corretamente. Eles permitem que o usuário navegue em nossos sites e use todas suas funcionalidades. Os exemplos incluem lembrar ações anteriores (por exemplo, textos inseridos) quando você volta a navegar em uma página em uma mesma sessão.
                    </p>
                    <h3 className="font-medium italic">
                        Cookies de Pesquisa, Análise e Desempenho
                    </h3>
                    <p className="pl-4">
                        A finalidade deste tipo de cookie é ajudar a entender o desempenho das nossas plataformas digitais, medir sua audiência, verificar os hábitos de navegação dos usuários, bem como a forma pelo qual chegou à página deste (por exemplo, através de links de outros sites, buscadores ou diretamente pelo endereço).
                    </p>
                    <h3 className="font-medium italic">
                        Cookies de publicidade
                    </h3>
                    <p className="pl-4">
                        Esses cookies são usados para tornar as mensagens publicitárias mais relevantes para você.Eles executam funções como impedir que o mesmo anúncio reapareça continuamente, garantindo que os anúncios sejam exibidos de maneira adequada para os anunciantes e, em alguns casos, selecionando anúncios que são baseados em seus interesses.
                    </p>
                    <h3 className="font-medium italic">
                        Cookies de redes sociais
                    </h3>
                    <p className="pl-4">
                        Esses cookies são usados para permitir que você compartilhe páginas e conteúdo que considere interessantes em nossos sites por meio de redes sociais de terceiros e outros sites.Esses cookies também podem ser usados para fins publicitários.
                    </p>
                    <h3 className="font-medium italic">
                        Cookies de autenticação
                    </h3>
                    <p className="pl-4">
                        Servem para reconhecer um determinado usuário, possibilitando o acesso e utilização da Plataforma com conteúdo e/ou serviços restritos e proporcionando experiências de navegação mais personalizadas.
                    </p>
                </div>
                <div>
                    <h2 className="font-bold text-xl py-2">
                        Como protegemos os Dados Pessoais?
                    </h2>
                    <p>
                        Na WIPZEE implementamos todas as medidas de segurança que estão ao nosso alcance para proteger os seus dados pessoais de acessos não autorizados e de situações acidentais ou ilícitas de destruição, perda, alteração, comunicação ou difusão.
                    </p>
                    <h3 className="font-medium italic">
                        Como por exemplo:
                    </h3>
                    <p>
                        Temos uma política interna de proteção de dados, que se aplica a todos aqueles que tratam dados pessoais em nosso nome.
                    </p>
                    <p>
                        Possuímos certificação SSL (Security Socket Layer) que garante a proteção por criptografia dos dados e chave de segurança utilizando o protocolo SSL de 128 bits.
                    </p>
                </div>
                <div>
                    <h2 className="font-bold text-xl py-2">
                        Por quanto tempo guardamos os Dados Pessoais?
                    </h2>
                    <h3 className="font-medium italic">
                        A retenção de dados pessoais pela Wipzee respeita as seguintes diretrizes:
                    </h3>
                    <p>
                        Apenas são mantidos dados pessoais estritamente necessários para o cumprimento das finalidades do tratamento. Assim, nos livramos de dados pessoais desnecessários ou excessivos.
                        Sem prejuízo, preservamos as informações necessárias para o cumprimento de obrigações legais e regulatórias ou o exercício de nossos direitos em demandas administrativas, judiciais ou arbitrais.
                    </p>
                </div>
                <div>
                    <h2 className="font-bold text-xl py-2">
                        Quais são os direitos relacionados aos Dados Pessoais?
                    </h2>
                    <p>
                        Nos orgulhamos de ser um site que leva a sério os direitos dos titulares de dados pessoais. Por isso, garantimos que os direitos sobre seus dados pessoais previstos na lei (art. 18, Lei Federal n. 13.709/2018) possam ser plenamente exercidos, respeitados os limites aplicáveis.
                    </p>
                    <p>
                        <span className="font-medium">Acesso aos dados:</span> qualquer um pode requerer o acesso aos seus dados pessoais armazenados por nós, bem como informações sobre possível o compartilhamento com terceiros.
                    </p>
                    <p>
                        <span className="font-medium">Correção:</span> caso os dados pessoais estejam incorretos, poderá ser feita uma solicitação de correção ou atualização.
                    </p>
                    <p>
                        <span className="font-medium">Exclusão:</span> dados fornecidos mediante consentimento podem ser alvo de exclusão. Contudo, é possível que, mesmo após o requerimento de exclusão, alguns dados pessoais permaneçam armazenados, devido a obrigações legais ou para a proteção de interesses nossos ou de nossos clientes.
                    </p>
                    <p>
                        <span className="font-medium">Oposição:</span>  você pode se opor ao tratamento de seus dados pessoais por parte da Wipzee.
                    </p>
                    <p>
                        <span className="font-medium">Portabilidade:</span> para que você possa exercer a portabilidade de seus dados pessoais, podemos providenciar a você uma cópia de seus dados pessoais em formato de leitura comum.
                    </p>
                </div>
                <div>
                    <h2 className="font-bold text-xl py-2">
                        Canais de contato
                    </h2>
                    <p>
                        Em caso de dúvidas e solicitações, entre em contato com o nosso Encarregado pelo Tratamento de Dados Pessoais, pelo e-mail abaixo:
                    </p>
                    <span className="text-blue-400">
                        contato@wipzee.com
                    </span>
                    <p>
                        Será um prazer ajudar!
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    )
};
