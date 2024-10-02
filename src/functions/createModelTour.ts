export type TourList = {
    id: string;
    completed: boolean;
}

interface ModelTour {
    tourKey: string;
    tourList: TourList[]
}


interface CreateModelTour {
    tourKey: string;
    tourList: Omit<TourList, "completed">[]
}

/**
 * Função responsável por salvar um novo modelo de tutorial no localStorage
 * @param {Model} Model Modelo a ser inserido no localStorage
 */
export function createModelTour({ tourKey, tourList }: CreateModelTour) {
    // Verifica se já existe algum modelo dentro do localStorage...
    const models: ModelTour[] = JSON.parse(localStorage.getItem("tour") || "[]");

    // Caso já exista, verificar se existe um modelo com a mesma chave do atual modelo...
    const alreadyExistmodel = models?.find(model => model.tourKey === tourKey);

    // Caso não exista, será adicionado o novo modelo ao localStorage...
    if (!alreadyExistmodel) models.push({ tourKey, tourList: tourList.map(list => ({ ...list, completed: false })) });

    // Atualiza o model dentro do localStorage...
    localStorage.setItem("tour", JSON.stringify(models));
}


/**
 * Função responsável por buscar o atual modelo do tutorial.
 * @param {string} tourKey Chave unica do tutorial.     
 * @returns {Promise} Retorna o modelo atual ou se cvaso não for encontrado, retornará undefined
 */
export function getCurrentTour(tourKey: string) {
    // busca todos os modelos salvos no localStorage
    const models: ModelTour[] = JSON.parse(localStorage.getItem("tour") || "[]");
    // Encontra qual é o modelo atual baseado na chave do tutorial...
    const currentTour = models.find(model => model.tourKey === tourKey);
    // Informa no log caso não seja encontrada a chave...
    if (!currentTour) console.error("Unable to find the current tour, with the tourkey provided.")
    // Retorna o modelo encontrado...
    return {
        currentTour,
        models
    }
}