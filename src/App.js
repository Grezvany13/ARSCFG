import { Outlet } from "react-router-dom";

import { SiGithub, SiDiscord } from "react-icons/si";
import { CgWebsite } from "react-icons/cg";

function App() {
  return (
    <div className="App">
        <header className="bg-gray-900 text-white py-10">
            <div className="max-w-2xl mx-auto">
                <div className="flex flex-col md:flex-row justify-start items-center text-sm text-gray-400">
                    <div>
                        <h1 className='text-6xl  font-bold'>ARSCFG</h1>
                        <h2 className='text-sm'>Arma Reforger Server Config File Generator</h2>
                    </div>
                </div>
            </div>
        </header>
        
        <Outlet />

        <section>
            <div className="max-w-2xl mx-auto">
                <p className='text-sm text-center text-gray-400'>&copy; {new Date().getFullYear()} BOHEMIA INTERACTIVE a.s. ARMA&reg; and BOHEMIA INTERACTIVE&reg; are registered trademarks of BOHEMIA INTERACTIVE a.s. All rights reserved.</p>
            </div>
        </section>

        <footer className="bg-gray-900 text-white py-10">
            <div className="max-w-2xl mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
                    <p className="order-2 md:order-1 mt-8 md:mt-0"> &copy; {new Date().getFullYear()} Grezvany13</p>
                    <div className="order-1 md:order-2 flex flex-row gap-4">
                        <span className="px-2">
                            <a href='https://github.com/Grezvany13/ARSCFG' className='flex flex-row gap-2 items-center text-white no-underline hover:text-gray-400'>
                                <SiGithub /> <span>Github</span>
                            </a>
                        </span>
                        <span className="px-2">
                            <a href='https://discord.gg/KUVEMz8' className='flex flex-row gap-2 items-center text-white no-underline hover:text-gray-400'>
                                <SiDiscord /> <span>Discord</span>
                            </a>
                        </span>
                        <span className="px-2">
                            <a href='https://johandejong.dev' className='flex flex-row gap-2 items-center text-white no-underline hover:text-gray-400'>
                                <CgWebsite /> <span>Personal Website</span>
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    </div>
  );
}

export default App;
