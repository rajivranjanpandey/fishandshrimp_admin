export type CreateCouponType = {
    coupon_code: string;
    coupon_discount_type: string;
    coupon_discount_value: number;
    description?: string;
    notes?: string;
    single_usage: boolean;
    hide_from_user: boolean;
    max_usage: number | null;
    start_date: string;
    end_date: string;
    zipcodes: string[];
};
export type UpdateCouponType = {
    id: string;
    data: {
        coupon_code?: string;
        coupon_discount_type?: string;
        coupon_discount_value?: number;
        description?: string;
        notes?: string;
        single_usage?: boolean;
        hide_from_user?: boolean;
        max_usage?: number | null;
        start_date?: string;
        end_date?: string;
        zipcodes?: string[];
    }
};