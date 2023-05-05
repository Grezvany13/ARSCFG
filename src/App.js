import DemoForm from './DemoForm';

import { SiGithub, SiDiscord } from "react-icons/si";

function App() {
  return (
    <div className="App">
        <header class="bg-gray-900 text-white py-10">
            <div class="max-w-2xl mx-auto">
                <div class="flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
                    <div>
                        <h1 className='text-6xl  font-bold'>ARSCFG</h1>
                        <h2 className='text-sm'>Arma Reforger Server Config File Generator</h2>
                    </div>
                </div>
            </div>
        </header>
        <section>
            <div class="max-w-2xl mx-auto">
                <p>This tool is a simple form to generate a full config json file for your Arma Reforger server.</p>
                <p>It <em>should</em> contain all variables based on the <a href="https://community.bistudio.com/wiki/Arma_Reforger:Server_Hosting#Configuration_File" target="_blank" rel="noreferrer">BIKI page</a>, and <em>should</em> validate correctly with the <a href='https://uro1.gitlab.io/ar-server-config-checker/' target='_blank' rel="noreferrer">Syntax and Data Validator</a>.</p>
                <br />
                <p>Nothing is stored (like passwords) and everything is local to your browser.</p>
            </div>
        </section>
        <section>
            <div class="max-w-2xl mx-auto">
                <DemoForm />
            </div>
        </section>

        <footer class="bg-gray-900 text-white py-10">
            <div class="max-w-2xl mx-auto">
                <div class="flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
                    <p class="order-2 md:order-1 mt-8 md:mt-0"> &copy; Grezvany13, 2023. </p>
                    <div class="order-1 md:order-2 flex flex-row gap-4">
                        <span class="px-2">
                            <a href='https://github.com/grezvany13' className='flex flex-row gap-2 items-center'>
                                <SiGithub /> <span>Github</span>
                            </a>
                        </span>
                        <span class="px-2">
                        <a href='https://discord.gg/KUVEMz8' className='flex flex-row gap-2 items-center'>
                                <SiDiscord /> <span>Discord</span>
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
