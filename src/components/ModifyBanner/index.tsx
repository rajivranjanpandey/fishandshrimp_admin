"use client";
import { use, useState } from "react";
import SelectGroupTwo from "../SelectGroup/SelectGroupTwo";
import SubmitButton from "../SubmitButton";

interface ModifyBannerProps {
    mode: string,
    initialValue?: any;

}
export default function ModifyBanner(props: ModifyBannerProps) {
    const { mode, initialValue } = props;
    const [selectedImage, setSelectedImage] = useState<string | null>(mode === "EDIT" ? initialValue?.image : null);
    const [selectedBannerType, setSelectedBannerType] = useState(mode === "EDIT" ? initialValue?.banner_type : 'SLIDER');
    return (
        <>
            {
                mode === 'EDIT' &&
                <input name="bannerId" type="hidden" value={initialValue.id} />
            }
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Image*
                        </label>
                        {
                            selectedImage &&
                            <div className="mb-5">
                                <img className="h-50 w-100" src={selectedImage} />
                            </div>
                        }
                        <input
                            type="file"
                            name="image"
                            accept='image/*'
                            required={true}
                            className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                            onChange={event => setSelectedImage(event.target.files ? URL.createObjectURL(event.target.files[0]) : null)}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                    <div>

                        <SelectGroupTwo
                            label='Banner Typ*'
                            formName="banner_type"
                            options={[{ label: 'GRID', value: 'GRID' }, { label: 'SLIDER', value: 'SLIDER' }, { label: 'HORIZONTAL', value: 'HORIZONTAL' }]}
                            value={selectedBannerType}
                            onChange={event => setSelectedBannerType(event.target.value)}

                        />
                        {/* <input
                            type="text"
                            name="banner_type"
                            required={true}
                            placeholder="Enter banner type"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        /> */}
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Pincodes*
                        </label>
                        <input
                            type="text"
                            name="banner_zipcodes"
                            required={true}
                            placeholder="Enter servicable pincodes (seperated by comma)"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            defaultValue={initialValue ? (initialValue.banner_zipcodes ? JSON.stringify(initialValue.banner_zipcodes) : '') : ''}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Additional Data
                        </label>
                        <input
                            type="text"
                            name="banner_data"
                            placeholder="Any additional data for the banner"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            defaultValue={initialValue ? (initialValue.banner_data ? JSON.stringify(initialValue.banner_data) : '') : ''}

                        />
                    </div>
                </div>

            </div>
            <div className="text-center mt-5">
                <SubmitButton />
            </div>
        </>
    )
}