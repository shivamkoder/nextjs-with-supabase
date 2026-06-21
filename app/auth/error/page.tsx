import { Suspense } from "react";

async function ErrorContent({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

  return (
    <p className="text-sm text-white/50">
      {params?.error ? `Code error: ${params.error}` : "An unspecified error occurred."}
    </p>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-[#0f0f0f] p-6 md:p-10">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="text-center mb-2">
          <span className="text-2xl font-bold text-white tracking-tight">
            Task<span className="text-[#e8553e]">ly</span>.
          </span>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#161616] p-6 text-center">
          <h1 className="text-xl font-bold text-white mb-3">Sorry, something went wrong.</h1>
          <Suspense>
            <ErrorContent searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
