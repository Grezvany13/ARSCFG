import HTMLReactParser, { domToReact } from "html-react-parser";

const IconQuestionMark = ({className}) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 302.967 302.967" width="100%" height="100%">
			<path d="M151.483,302.967C67.956,302.967,0,235.017,0,151.483S67.956,0,151.483,0 s151.483,67.956,151.483,151.483S235.017,302.967,151.483,302.967z M151.483,24.416c-70.066,0-127.067,57.001-127.067,127.067 s57.001,127.067,127.067,127.067s127.067-57.001,127.067-127.067S221.555,24.416,151.483,24.416z"/>
			<path d="M116.586,118.12c1.795-4.607,4.297-8.588,7.511-11.961c3.225-3.389,7.114-6.016,11.667-7.898 c4.547-1.904,9.633-2.845,15.262-2.845c7.261,0,13.32,0.995,18.183,2.997c4.857,1.996,8.768,4.482,11.738,7.441 c2.964,2.97,5.091,6.168,6.369,9.584c1.273,3.432,1.915,6.636,1.915,9.595c0,4.901-0.642,8.947-1.915,12.118 c-1.278,3.171-2.866,5.88-4.759,8.131c-1.898,2.252-3.987,4.172-6.293,5.755c-2.295,1.588-4.471,3.171-6.516,4.759 c-2.045,1.583-3.862,3.394-5.445,5.439c-1.588,2.04-2.589,4.601-2.991,7.664v5.831H140.6v-6.908 c0.305-4.395,1.153-8.072,2.529-11.036c1.382-2.964,2.991-5.499,4.83-7.598c1.844-2.089,3.786-3.911,5.836-5.445 c2.04-1.539,3.927-3.073,5.673-4.591c1.73-1.545,3.144-3.225,4.221-5.069c1.071-1.833,1.556-4.15,1.452-6.908 c0-4.705-1.148-8.18-3.454-10.427c-2.295-2.257-5.493-3.378-9.589-3.378c-2.758,0-5.134,0.533-7.131,1.605 s-3.628,2.513-4.911,4.302c-1.278,1.795-2.225,3.894-2.834,6.288c-0.615,2.415-0.919,4.982-0.919,7.756h-22.55 C113.85,127.785,114.791,122.732,116.586,118.12z M162.536,183.938v23.616h-24.09v-23.616H162.536z"/>
        </svg>
    );
};

const parserOptions = {
    replace: (domNode) => {
        if (domNode.type === 'tag') {
            switch (domNode.name) {
                default:
                break;
                case 'info':
                    domNode.name = 'span';
                    domNode.attribs.class = 'text-secondary font-bold';
                break;
                case 'warning':
                    domNode.name = 'span';
                    domNode.attribs.class = 'text-warning font-bold';
                break;
                case 'error':
                    domNode.name = 'span';
                    domNode.attribs.class = 'text-danger font-bold';
                break;
                case 'code':
                case 'pre':
                    domNode.attribs.class = 'bg-white/10';
                break;
                case 'a':
                    domNode.attribs.class = 'underline';
                break;
            }
        }
        return domToReact(domNode);
    }
};

const FormTooltip = ({description}) => {
    return (
        <div className="group inline-block relative overflow-visible float-right">
            <div className="cursor-pointer inline-block pl-5">
                <IconQuestionMark
                    className="max-h-4 fill-black dark:fill-white"
                />
            </div>
            <div className="z-20 min-w-75 w-full h-auto absolute transition duration-150 ease-in-out top-0 right-0 mr-5 shadow-lg bg-graydark text-white p-4 rounded hidden group-hover:block">
                {HTMLReactParser(description, parserOptions)}
            </div>
        </div>
    );
};

export default FormTooltip;