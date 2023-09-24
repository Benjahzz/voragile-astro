export type  Task = {
    id: number;
    content: string;
    letter: string;
    bgColor?: string;
    textColor?: string;
}

export type Pricing = {
    title: string;
    price: number;
    description: string;
    features: string[];
    btnText: string;
    isFeatured?: boolean;
}