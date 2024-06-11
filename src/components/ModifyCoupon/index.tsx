"use client";
import { COUPON_SCHEMA } from '@/app/schema/coupon';
import { useForm as useHookForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import SelectGroupTwo from '../SelectGroup/SelectGroupTwo';
import SwitcherThree from '../Switchers/SwitcherThree';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ModifyCouponProps {
    initialValue?: any,
    mode: string
}

function ModifyCoupon(props: ModifyCouponProps) {
    const router = useRouter();
    const [loadingStats, setLoadingStats] = useState<string | null>(null);
    const { control, handleSubmit, watch, formState: { errors }, setValue, getValues, setError, clearErrors } = useHookForm<any>({
        resolver: yupResolver(COUPON_SCHEMA),
        defaultValues: props.initialValue || {}
    });

    const couponType = watch('coupon_discount_type');
    const hasSingleUsage = watch('single_usage');

    const onSubmit: SubmitHandler<any> = async (data) => {
        try {
            setLoadingStats('Updating data');
            const payload = { data };
            if (props.mode === 'EDIT') {
                payload.id = props.initialValue.id;
                delete payload.data.coupon_zipcodes;
                delete payload.data.id;
                delete payload.data.createdAt;
                delete payload.data.updatedAt;
            }
            const createResponse = await fetch('/api/coupon', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).then(res => res.json());
            setLoadingStats(null);
            console.log({ createResponse });
            if (createResponse.message.id) {
                alert('Coupon modified successfully');
                router.replace('/admin/coupon');
            } else {
                alert('Error in modifying coupon');
            }

        } catch (e) {
            setLoadingStats(null);
            console.log('error in creating coupon:::', e);
            alert('Error in creating coupon');
        }


    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Coupon Code*
                        </label>
                        <Controller
                            name="coupon_code"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <input
                                        {...field}
                                        placeholder="Enter coupon code"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                    {errors.coupon_code && <span className="text-red">{errors.coupon_code.message}</span>}
                                </>
                            )}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Coupon Description
                        </label>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <input
                                        {...field}
                                        placeholder="Enter description"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                    {errors.description && <span className="text-red">{errors.description.message}</span>}
                                </>
                            )}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Coupon Notes
                        </label>
                        <Controller
                            name="notes"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <input
                                        {...field}
                                        placeholder="Enter notes"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                    {errors.notes && <span className="text-red">{errors.notes.message}</span>}
                                </>
                            )}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                        <Controller
                            name="coupon_discount_type"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <SelectGroupTwo
                                        label='Coupon Type*'
                                        options={[{ label: 'FIXED', value: 'FIXED' }, { label: 'PERCENT', value: 'PERCENT' }]}
                                        value={field.value}
                                        onChange={field.onChange}

                                    />
                                    {errors.coupon_discount_type && <span className="text-red">{errors.coupon_discount_type.message}</span>}
                                </>
                            )}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Coupon Value*
                        </label>
                        <Controller
                            name="coupon_discount_value"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <input
                                        {...field}
                                        placeholder={couponType === 'PERCENT' ? "Enter value between 0-100" : "Enter value"}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        max={couponType === 'PERCENT' ? 100 : 1000000000000}
                                    />
                                    {errors.coupon_discount_value && <span className="text-red">{errors.coupon_discount_value.message}</span>}
                                </>
                            )}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                    <Controller
                        name="start_date"
                        control={control}
                        render={({ field }) => (
                            <>
                                <DatePickerOne label='Start Date' uniqueKey={'start_date'} value={field.value} onChange={val => field.onChange(val)} />
                                {errors.start_date && <span className="text-red">{errors.start_date.message}</span>}
                            </>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                    <Controller
                        name="end_date"
                        control={control}
                        render={({ field }) => (
                            <>
                                <DatePickerOne label='End Date' uniqueKey={'end_date'} value={field.value} onChange={val => field.onChange(val)} />
                                {errors.end_date && <span className="text-red">{errors.end_date.message}</span>}
                            </>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Coupon Is Active
                        </label>
                        <Controller
                            name="is_active"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <SwitcherThree name={field.name} value={field.value} onChange={field.onChange} />
                                    {errors.is_active && <span className="text-red">{errors.is_active.message}</span>}
                                </>
                            )}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            One Time Use
                        </label>
                        <Controller
                            name="single_usage"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <SwitcherThree name={field.name} value={field.value} onChange={field.onChange} />
                                    {errors.single_usage && <span className="text-red">{errors.single_usage.message}</span>}
                                </>
                            )}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Make Hidden
                        </label>
                        <Controller
                            name="hide_from_user"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <SwitcherThree name={field.name} value={field.value} onChange={field.onChange} />
                                    {errors.hide_from_user && <span className="text-red">{errors.hide_from_user.message}</span>}
                                </>
                            )}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Max No of use
                        </label>
                        <Controller
                            name="max_usage"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <input
                                        placeholder="Enter maximum times user can use this coupon"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        {...field}
                                        disabled={hasSingleUsage}
                                    />
                                    {errors.max_usage && <span className="text-red">{errors.max_usage.message}</span>}
                                </>
                            )}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Pincodes*
                        </label>
                        <Controller
                            name="zipcodes"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <input
                                        {...field}
                                        placeholder="Enter servicable pincodes (separated by comma)"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                    {errors.zipcodes && <span className="text-red">{errors.zipcodes.message}</span>}
                                </>
                            )}
                        />
                    </div>
                </div>
            </div>
            <div className="text-center mt-5">
                <input
                    type="submit"
                    value={loadingStats || "Save"}
                    className="w-50 cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                />
            </div>
        </form>
    )
}

export default ModifyCoupon;
