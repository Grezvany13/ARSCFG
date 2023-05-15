import ServerConfigForm from './ServerConfigForm';

function Root() {
  return (
    <>
        <section>
            <div className="max-w-2xl mx-auto">
                <p>This tool is a simple form to generate a full config json file for your Arma Reforger server.</p>
                <p>It <em>should</em> contain all variables based on the <a href="https://community.bistudio.com/wiki/Arma_Reforger:Server_Hosting#Configuration_File" target="_blank" rel="noreferrer">BIKI page</a>, and <em>should</em> validate correctly with the <a href='https://uro1.gitlab.io/ar-server-config-checker/' target='_blank' rel="noreferrer">Syntax and Data Validator</a>.</p>
                <br />
                <p>Nothing is stored (like passwords) and everything is local to your browser.</p>
            </div>
        </section>
        <section>
            <div className="max-w-2xl mx-auto">
                <ServerConfigForm />
            </div>
        </section>
        </>
  );
}

export default Root;
