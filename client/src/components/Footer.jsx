import React from "react";

const Footer = () => {
  return (
    <footer className="w-full text-neutral-800">

      {/* MAIN FOOTER */}
      <div className="w-full border-t border-neutral-200 py-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-16">

          {/* BRAND */}
          <div className="max-w-md">
            <h2 className="text-2xl font-black tracking-tight mb-4">
              Book<span className="text-orange-500">Swap</span>
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              A reader-first platform to swap, lend, and discover books.
              No money. No waste. Just stories moving forward.
            </p>
          </div>

          {/* LINKS */}
          <div className="flex gap-24 text-sm">
            <div>
              <p className="uppercase tracking-widest text-neutral-500 mb-6">
                Platform
              </p>
              <ul className="space-y-4">
                <li className="hover:text-black cursor-pointer">How it works</li>
                <li className="hover:text-black cursor-pointer">Trending books</li>
                <li className="hover:text-black cursor-pointer">Genres</li>
              </ul>
            </div>

            <div>
              <p className="uppercase tracking-widest text-neutral-500 mb-6">
                Community
              </p>
              <ul className="space-y-4">
                <li className="hover:text-black cursor-pointer">Reader stories</li>
                <li className="hover:text-black cursor-pointer">Guidelines</li>
                <li className="hover:text-black cursor-pointer">Contact</li>
              </ul>
            </div>
          </div>

          {/* SUBSCRIBE */}
          <div className="max-w-sm w-full">
            <p className="uppercase tracking-widest text-neutral-500 mb-6 text-sm">
              Stay Updated
            </p>
            <p className="text-neutral-600 mb-4 text-sm">
              Get updates on trending books and community swaps.
            </p>

            <div className="flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-neutral-300 rounded-l-md px-4 py-2 text-sm outline-none focus:border-orange-400"
              />
              <button className="px-6 py-2 text-sm font-semibold rounded-r-md bg-orange-500 hover:bg-orange-600 text-white transition-colors">
                Subscribe
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM LINE */}
      <div className="w-full py-8 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span>© {new Date().getFullYear()} BookSwap. All rights reserved.</span>
          <div className="flex gap-8">
            <span className="hover:text-black cursor-pointer">Privacy</span>
            <span className="hover:text-black cursor-pointer">Terms</span>
            <span className="hover:text-black cursor-pointer">Support</span>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
