import { IncreasePerceptionValue } from "./components/IncreasePerceptionValue/IncreasePerceptionValue";
import { Presentation } from "./components/Presentation/Presentation";
import { ChatDemo } from "./components/ShowChatDemo/ShowChatDemo";
import { DesktopDemo } from "./components/DesktopDemo/DesktopDemo";
import { Comparison } from "./components/Comparison/Comparison";
import { Plans } from "./components/Plans/Plans";
import { Guarantee } from "./components/Guarantee/Guarantee";
import { FrequentlyQuestions } from "./components/FrequentlyQuestions/FrequentlyQuestions";

export function Main() {
    return (
        <main>
            <Presentation />
            <IncreasePerceptionValue />
            <ChatDemo />
            <DesktopDemo />
            <Comparison />
            <Plans />
            <Guarantee />
            <FrequentlyQuestions />
        </main>
    )
};