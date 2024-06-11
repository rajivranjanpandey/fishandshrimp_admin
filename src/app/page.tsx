// import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title:
    "Fish and Shrimp",
  description: "Fish and Shrimp admin",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <h1>Dashboard Coming Soon ...</h1>
        {/* <ECommerce /> */}
      </DefaultLayout>
    </>
  );
}
