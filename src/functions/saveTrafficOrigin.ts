/**
 * Função responsável por salvar a origem do trafégo no localStorage...
 */
export async function saveTrafficOrigin() {
    const params = new URLSearchParams(window.location.search);

    const origin = params.get("tag");
    // Salva a origem do trafego no localstorage...
    origin && (localStorage.origin = origin);
}