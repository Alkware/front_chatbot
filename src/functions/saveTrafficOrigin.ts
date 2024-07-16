/**
 * Função responsável por salvar a origem do trafégo no localStorage...
 */
export function saveTrafficOrigin() {
    const params = new URLSearchParams(window.location.search);

    const origin = params.get("tag");
    origin && (localStorage.origin = origin);
}