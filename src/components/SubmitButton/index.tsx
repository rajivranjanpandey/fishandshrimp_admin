"use client";

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function SubmitButton() {
    const currentPendingStatsRef = useRef(false);
    const { pending, action, data, method } = useFormStatus();
    useEffect(() => {
        console.log({ pending, action, data, method });
        if (currentPendingStatsRef.current === true && pending === false) {
            alert('Data Saved');
        }
        currentPendingStatsRef.current = pending;
    }, [pending])
    return (
        <input
            type="submit"
            disabled={pending}
            value={pending ? "Saving ..." : "Save"}
            className="w-50 cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
        />
    )
}