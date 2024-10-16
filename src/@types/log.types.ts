export interface Log {
    log: string, 
    sector: "Plataforma" | "Login" | "Registro" | "Landing Page" | "Chat" | "Back-end" | "Socket" | "IA";
    path: string;
    level: "warning" | "danger";
}