interface PageNotFound { }

export function PageNotFound({ }: PageNotFound) {
    return (
        <div className="w-screen h-screen grid place-items-center bg-dark">
            <div className="max-w-[95vw] bg-yellow-200 border border-black shadow-lg shadow-yellow-200/30 rounded-md flex flex-col items-center p-2 gap-4">
                <h1 className="font-bold text-2xl">WIPZEE INFORMA:</h1>
                <div className="flex flex-col items-center">
                    <h2 className="font-medium">Prezado(a) usuário(a),</h2>
                    <h2 className="text-center max-w-[700px]">
                        Informamos que a <span className="font-bold">Wipzee</span> estará temporariamente fora do ar para a realização de atualizações importantes,
                        com o objetivo de aprimorar ainda mais sua experiência em nossa plataforma.
                        O seu negócio é importante para nós, e por isso, trabalhamos arduamente para melhorar nosso software e
                        oferecer resultados sólidos para o sucesso da sua empresa.
                    </h2>
                </div>
                <h2 className="text-center max-w-[700px]">
                    Durante esse período, o acesso ao site estará indisponível. Pedimos desculpas por qualquer inconveniente e agradecemos a sua compreensão.
                </h2>

                <h2 className="font-bold text-center md:text-left">
                    Estamos ansiosos para voltar com uma plataforma ainda mais rápida e eficiente!
                </h2>
                <h2>
                    Atenciosamente,
                    Wipzee
                </h2>

            </div>
        </div>
    )
};