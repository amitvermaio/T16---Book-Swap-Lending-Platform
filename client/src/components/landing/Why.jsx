import React from "react";

const Why = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center">

      {/* MAIN CONTENT */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ================= LEFT ================= */}
          <div className="flex flex-col gap-6 text-center lg:text-left">

            <h1 className="text-neutral-900 tracking-tight text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
              Why Readers <br className="hidden lg:block" />
              <span className="text-orange-500">Love BookSwap</span>
            </h1>

            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-[520px] mx-auto lg:mx-0">
              Join a thriving community of book lovers. Discover hidden gems,
              declutter your shelves, and connect with readers who share your
              passion — all without spending a dime.
            </p>

            <div className="flex justify-center lg:justify-start">
              <button className="h-11 px-7 rounded-full bg-orange-400 hover:bg-orange-500 text-white text-sm font-semibold transition-colors">
                Start Swapping →
              </button>
            </div>

            {/* USERS */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mt-2">
              <div className="flex -space-x-3">
                <img
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2Zs9yo3-9sJZAfDdJ0CL7qEzKl2WVFXLZ5Kh9YD9ELvUPXLBJ5BrhbemShMgGdDjdiSGcL4fHcA27gr7S1hJ9flQm_zdRJ9yrKJJPpcHfpacUt2u1MyEX2QiMzDuM8gxrRVR0vLWoCNDDkgrybtEXW7qMvy47V2wVVosLefxt-dVHN_8EU_Vpkma9rKLYTcspM_kKhRSNuGUa3DuLEvDdQVO3wPE5tiO0laITkbZYUXSNPM76bASVWEgppCkygwE8s_yjz3_ymDs"
                />
                <img
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJzKu3P8xMxozMPy62uPnNlI_PNaXm_OEvsQAyJ2t2POZpM1TM_xi-c306Vb2rmZr9QV5MzKUYYTFx94LfS2zs_2PopiXWoN8AHD_hJyPr0FoUtBNDZMLx4NRL85qcmdBpiZMuLWUlRSiQrV3_qM2ESGuIGVfV5DdbJZNbUVCmjDXJ9-wgwuJ4Nx3ko6r56sz8Xt-5-m5CMoM2xXBtMRsuQyFXH4ppU07bXi-_3oyK1F0J9LtJ_ssOTNvfz6YySTJLfX3JZ3cRS9Q"
                />
                <img
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxhAY-JWD3ZdvRJT4Tny2Gvuvy97JimId0G8XHKxjT97knAdd8XOD-4SHz9S5OHhfbN_Kg-UE7-kE3eEqX6Pr8qt8nLMYBdeBiS_Ua5VO4Y7U8CneftJKELYQAkjUqNGiH-3NWvJA5_JUpgBmMvcrii1d5ORDBENG7Wsepkuo4D8YZpTXuwcLQmmqiZUjX7TU_4NKDCMAd3hblAu0ovDe2SuhTi1k_19ajUdmckyqmd2mmNyI-pfAm9hUVvhrey5JGgKKrYSwEnIM"
                />
              </div>

              <span className="text-sm text-neutral-500 font-medium">
                Used by 10,000+ readers
              </span>
            </div>
          </div>

          {/* ================= RIGHT (STAGGERED GRID) ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-8 gap-6">

            {/* Card 1 */}
            <div className="row-span-4 border border-neutral-200 rounded-xl p-8 bg-white">
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                Sustainable Reading
              </h3>
              <p className="text-sm text-neutral-600">
                Give books a second life and reduce waste by keeping them in
                circulation.
              </p>
            </div>

            {/* Card 2 (down) */}
            <div className="row-span-4 row-start-3 border border-neutral-200 rounded-xl p-8 bg-white">
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                Save Money
              </h3>
              <p className="text-sm text-neutral-600">
                Read more for less by trading instead of buying expensive copies.
              </p>
            </div>

            {/* Card 3 */}
            <div className="row-span-4 border border-neutral-200 rounded-xl p-8 bg-white">
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                Community Driven
              </h3>
              <p className="text-sm text-neutral-600">
                Connect with verified readers and share recommendations.
              </p>
            </div>

            {/* Card 4 (down) */}
            <div className="row-span-4 row-start-3 border border-neutral-200 rounded-xl p-8 bg-white">
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                Discover Gems
              </h3>
              <p className="text-sm text-neutral-600">
                Find rare editions and out-of-print classics easily.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Why;
