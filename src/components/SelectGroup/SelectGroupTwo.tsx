"use client";
import React, { ChangeEventHandler, useState } from "react";
type SelectOption = {
  label: string;
  value: string;
}
type SelectGroupProps = {
  label: string;
  value: string;
  formName?: string;
  options: SelectOption[];
  onChange: ChangeEventHandler<HTMLSelectElement>
}
const SelectGroupTwo = (props: SelectGroupProps) => {
  const [selectedOption, setSelectedOption] = useState<string>(props.value);
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(props.value ? true : false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        {props.label}
      </label>

      <div className="relative z-20 bg-white dark:bg-form-input">
        {/* <span className="absolute left-4 top-1/2 z-30 -translate-y-1/2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 0.833984C4.93667 0.833984 0.833333 4.93732 0.833333 10C0.833333 15.0627 4.93667 19.166 10 19.166C15.0633 19.166 19.1667 15.0627 19.1667 10C19.1667 4.93732 15.0633 0.833984 10 0.833984ZM10 17.5C5.85833 17.5 2.5 14.1417 2.5 10C2.5 5.85832 5.85833 2.5 10 2.5C14.1417 2.5 17.5 5.85832 17.5 10C17.5 14.1417 14.1417 17.5 10 17.5Z"
                fill="#637381"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.5 5.83398C7.5 5.37373 7.8731 5.00065 8.33334 5.00065H12.5C12.9603 5.00065 13.3333 5.37373 13.3333 5.83398C13.3333 6.29423 12.9603 6.66732 12.5 6.66732H9.16667V8.33398H12.5C12.9603 8.33398 13.3333 8.70707 13.3333 9.16732C13.3333 9.62757 12.9603 10.0007 12.5 10.0007H9.16667V10.833H12.5C12.9603 10.833 13.3333 11.2061 13.3333 11.6663C13.3333 12.1266 12.9603 12.4997 12.5 12.4997H10.277L12.026 15.4463C12.268 15.864 12.1033 16.3747 11.6856 16.6167C11.2679 16.8587 10.7573 16.694 10.5153 16.2763L8.33333 12.4997H7.5C7.03976 12.4997 6.66667 12.1266 6.66667 11.6663C6.66667 11.2061 7.03976 10.833 7.5 10.833H8.33333V10.0007H7.5C7.03976 10.0007 6.66667 9.62757 6.66667 9.16732C6.66667 8.70707 7.03976 8.33398 7.5 8.33398H8.33333V6.66732H7.5C7.03976 6.66732 6.66667 6.29423 6.66667 5.83398C6.66667 5.37373 7.03976 5.00065 7.5 5.00065H8.33333V5.83398H7.5Z"
                fill="#637381"
              />
            </g>
          </svg>

        </span> */}

        <select
          name={props.formName || 'select'}
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            changeTextColor();
            props.onChange(e);
          }}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? "text-black dark:text-white" : ""
            }`}
        >
          {
            props.options.map((option) => {
              return (
                <option key={option.value} value={option.value} className="text-body dark:text-bodydark">
                  {option.label}
                </option>
              )
            })
          }
        </select>

        <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill="#637381"
              ></path>
            </g>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SelectGroupTwo;
