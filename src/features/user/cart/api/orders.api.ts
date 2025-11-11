import http from "@/lib/axios";

export type OrderResponse = {
    id: string;
    status: string;
    paymentMethod: string;
    totalOrderPrice: number;
    createdAt: string;
};

export type CheckoutSessionResponse = {
    url: string;
};

export const createCashOrder = async (cartId: string): Promise<OrderResponse> => {
    const response = await http.post(`/orders/${cartId}`, {
        paymentMethod: "cash",
    });
    return response.data?.data || response.data;
};

export const getCheckoutSession = async (
    cartId: string
): Promise<CheckoutSessionResponse> => {
    const response = await http.get(`/orders/checkout-session/${cartId}`);
    return response.data?.data || response.data;
};
