export interface Plan {
    id: string;
    description: string;
    duration_days: number;
    max_databases: Default_limit_plan;
    max_messages: Default_limit_plan;
    max_projects: Default_limit_plan;
    max_analyze_metric: Default_limit_plan;
    monthly_price: string;
    order_relevance: number;
    payment_link: string;
    plan_name: string;
}

export interface Default_limit_plan {
    bonus: string;
    default: string;
}