export function setThemePage(){
    const isDark = localStorage.theme === "dark"
    document.documentElement.classList.toggle("dark", !!isDark)
}