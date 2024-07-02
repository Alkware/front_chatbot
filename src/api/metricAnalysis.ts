import axios from "axios";
import { API_URL } from "./url-api";
import { createLog } from "./log";

interface SendFeedbackMetricAnalysis {
    feedback: string,
    metrics_analysis_rating: number,
    metric_analysis_id: string,
}

export async function createMetricAnalysis(plan_management_id: string, result: string) {
    const response = await axios.post(`${API_URL}/metric_analysis/create`, {
        plan_management_id,
        result
    });


    if (response.data.error) {
        await createLog({
            level: "warning",
            path: "src/api/metricAnalysis.ts Ln: 21",
            log: "Falha ao tentar criar a analise de métrica",
            sector: "Plataforma"
        });
        throw new Error("Unable to create the Metric Analysis.");
    }

    return response;
}

export async function sendFeedbackMetricAnalysis({ feedback, metrics_analysis_rating, metric_analysis_id }: SendFeedbackMetricAnalysis) {
    const response = await axios.post(`${API_URL}/metric_analysis/create_feedback`, {
        feedback,
        metrics_analysis_rating,
        metric_analysis_id
    });

    if (response.data.error) {
        await createLog({
            level: "warning",
            path: "src/api/metricAnalysis.ts Ln: 42",
            log: "Falha ao tentar enviar o feedback sobre a análise de métrica",
            sector: "Plataforma"
        });
        throw new Error("Unable to create the Feedback Metric Analysis.")
    }

    return response;
}


export async function getMetricAnalysis(plan_management_id: string) {

    const response = await axios.get(`${API_URL}/metric_analysis/${plan_management_id}`);

    if (response.status === 400) {
        await createLog({
            level: "warning",
            path: "src/api/metricAnalysis.ts Ln: 59",
            log: "Falha ao tentar buscar todas as análises de métricas",
            sector: "Plataforma"
        });
        throw new Error("Unable to create the Feedback Metric Analysis.")
    }

    return response;
}