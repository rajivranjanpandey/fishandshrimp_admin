import * as yup from 'yup';

export const COUPON_SCHEMA = yup.object().shape({
    'coupon_code': yup.string().max(6, 'Coupon code mus be less then equal to 6 charachters').required('Coupon code is required'),
    'coupon_discount_type': yup.string().oneOf(['FIXED', 'PERCENT']).default('FIXED').required('Coupon type is required'),
    'coupon_discount_value': yup
        .number()
        .required('Coupon value is required')
        .typeError('Coupon discount value must be a number')
        .min(0, 'Coupon discount value must be at least 0')
        .when('coupon_discount_type', (coupon_discount_type, schema) =>
            coupon_discount_type === 'PERCENT'
                ? schema.max(100, 'Coupon discount value must be less than or equal to 100%')
                : schema.max(1000000000000, 'Coupon discount value is too high')
        ),
    'description': yup.string().optional(),
    'notes': yup.string().optional(),
    'single_usage': yup.boolean().default(false).required(),
    'hide_from_user': yup.boolean().default(false).required(),
    'max_usage': yup.number().nullable().default(null),
    'is_active': yup.boolean().default(true),
    'start_date': yup.string().required('Start date is required').typeError('Start date must be a valid date'),
    'end_date': yup.string().required('End date is required').typeError('End date must be a valid date'),
    'zipcodes': yup.string().required()
})