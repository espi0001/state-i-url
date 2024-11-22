"use client";
import Image from "next/image";
import Link from "next/link";

import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function Home() {
  // arrays for sizes and colors
  const sizes = ["sx", "s", "m", "l", "xl"];
  const colors = ["White", "Black", "Grey"];
  const searchParams = useSearchParams();

  // console.log(searchParams);

  // Her bruger vi useCallback for at oprette en funktion der kan opdatere query params
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <main className="flex-1">
      <section className="mx-auto grid max-w-7xl p-8">
        {/* vi bruger form for at skabe en formular da det er en "formular" man skal udfylde når man vælger størrelse og farve */}
        <form className="grid gap-2 sm:grid-cols-2 lg:grid-cols-8">
          <div className="md:col-span-1 lg:col-span-5">
            <div className="aspect-square overflow-hidden bg-neutral-50">
              <Image alt="T-shirt" width={500} height={500} className="h-full w-full object-contain object-center" src="/tshirt.png" priority />
            </div>
          </div>
          <div className="flex flex-col pt-6 sm:col-span-1 sm:px-6 sm:pt-0 lg:col-span-3 lg:pt-16">
            <div>
              <h1 className="mb-4 flex-auto text-3xl font-medium tracking-tight text-neutral-900">Bare en t-shirt</h1>
              <p className="mb-8 text-sm">kr. 90.00</p>
              <fieldset className="my-4">
                <legend className="sr-only">Sizes</legend>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((size, index) => {
                    return (
                      <Link key={index} className={`${searchParams.get("size") == size && "border-neutral-100"} border-neutral-200 text-neutral-900 hover:bg-neutral-100 relative flex min-w-[5ch] items-center justify-center rounded border p-3 text-center text-sm font-semibold`} href={`?${createQueryString("size", size)}`}>
                        {size}
                      </Link>
                    );
                  })}
                </div>
              </fieldset>
              <fieldset className="my-4">
                <legend className="sr-only">Colors</legend>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color, index) => {
                    return (
                      <Link key={index} className={`${searchParams.get("color") == color && "border-neutral-100"}border-neutral-200 text-neutral-900 hover:bg-neutral-100 relative flex min-w-[5ch] items-center justify-center rounded border p-3 text-center text-sm font-semibold`} href={`?${createQueryString("color", color)}`}>
                        {color}
                      </Link>
                    );
                  })}
                </div>
              </fieldset>
              <div className="mt-8">
                <Link href={`/payment?${searchParams}`}>
                  <button type="submit" className="h-12 items-center rounded-md bg-neutral-900 px-6 py-3 text-base font-medium leading-6 text-white shadow hover:bg-neutral-800">
                    <span>Add to cart</span>
                  </button>
                </Link>
              </div>
              <div className="mt-8 space-y-6 text-sm text-neutral-500">
                <div>
                  <p>
                    <b>Step into summer with the right balance.</b>&nbsp;Every time your head goes down, you see these beauties, and your mood bounces right back up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
