import React, { useState, useEffect } from 'react';

import { Field, FieldError, Form } from 'react-jsonschema-form-validation';
import Select from 'react-select';
import CodeEditor from '@uiw/react-textarea-code-editor';

import randomFriendlyPhrase from 'randomfriendlyphrase';
import generator from 'generate-password-ts';

import EnfusionSchema from './EnfusionSchema';


const exportConfig = (name, data) => {
    const fileData = JSON.stringify(data, null, 4);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = name.split(' ').join('') + '.json';
    link.href = url;
    link.click();
  }

const AsyncFormField = (props) => {
    const {name, data, value, label, method} = props;

    let type ='select';

    const [jsonData, setJsonData] = useState(null);

    const getJsonData = async () => {
        let data = JSON.parse(localStorage.getItem('reforger-workshop-cache'));

        if (data === null) {
            let response = await fetch('https://files.ofpisnotdead.com/reforger-workshop.json');
            data = await response.json();
        }
        localStorage.setItem('reforger-workshop-cache', JSON.stringify(data));
        return data;
    };

    useEffect(() => {
        getJsonData().then(data => {
            setJsonData(data);
        }); 
    }, []);

    if (jsonData === null) {
        return null;
    }
    let options = [];

    if (method === 'scenarios') {
        options = jsonData.data.map((item) => {
            if (item.scenariosIds.length > 0) {
                return {
                    label: item.name,
                    options: item.scenariosIds.map((scenario) => {
                        return {
                            value: scenario,
                            label: scenario
                        }
                    })
                }
            }
            return null;
        }).filter((item) => item !== null);
    }
    if (method === 'mods') {
        options = jsonData.data.map((item) => {
            return {
                value: item.id,
                label: item.name
            }
        }).sort((a, b) => {
            let x = a.label;
            let y = b.label;
            return x < y ? -1 : x > y ? 1 : 0;
        });
    }

    return (
        <div className="md:flex mb-6">
            <div className="md:w-1/3">
                <label className="block font-bold md:text-left mb-3 md:mb-0 pr-4" htmlFor={name}>
                    {label}
                </label>
            </div>
            <div className="md:w-2/3">
                {method === 'scenarios' && (
                    <Field
                        id={name}
                        type={type}
                        name={name}
                        component={Select}
                        options={options}
                        defaultValue={value || [data?.default]}
                        onChange={(newVal, handleFieldChange) => {
                            newVal = newVal.value;
                            handleFieldChange(name, newVal)
                        }}
                    />
                )}
                {method === 'mods' && (
                    <Field
                        id={name}
                        type={type}
                        name={name+'[]'}
                        component={Select}
                        options={options}
                        isClearable
                        isMulti
                        defaultValue={value || [data?.default]}
                        onChange={(newVal, handleFieldChange) => {
                            let newName = name.split('[]')[0];
                            newVal = newVal.map((item) => {
                                return {
                                    name: item.label,
                                    modId: item.value
                                };
                            })
                            handleFieldChange(newName, newVal)
                        }}
                    />
                )}
                {data.description && (
                    <p className="py-2 text-sm text-gray-600">{data.description}</p>
                )}
                <FieldError
                    name={name}
                />
            </div>
        </div>
    );
};

const FormField = (props) => {
    const {name, data, value, label} = props;

    let type ='text';
    let typeClass ='input';
    let options = [];
    let defaultValue = value;

    switch(data.type) {
        default:
        case 'string':
            type ='text';
            break;
        case 'integer':
            type = 'number';
            break;
        case 'boolean':
            type = 'checkbox';
            typeClass ='checkbox';
            break;
        case 'array':
            type = 'select';
            typeClass ='';

            options = data.items.enum.map(item => {
                return {
                    label: item,
                    value: item,
                    name: item
                };
            });
            break;
        case 'object':
            type = 'editor';
            defaultValue = JSON.stringify(defaultValue);
            break;
    }

    return (
        <div className="md:flex mb-6">
            <div className="md:w-1/3">
                <label className="block font-bold md:text-left mb-3 md:mb-0 pr-4" htmlFor={name}>
                    {label}
                </label>
            </div>
            <div className="md:w-2/3">
                {type==='select' && (
                    <Field
                        id={name}
                        type={type}
                        name={name+'[]'}
                        component={Select}
                        options={options}
                        isClearable
                        isMulti
                        defaultValue={defaultValue || [data?.default]}
                        onChange={(newVal, handleFieldChange) => {
                            let newName = name.split('[]')[0];
                            newVal = newVal.map((item) => {
                                return item.value;
                            })
                            handleFieldChange(newName, newVal)
                        }}
                    />
                )}
                {type==='editor' && (
                    <Field
                        id={name}
                        name={name}
                        value={defaultValue || data?.value}
                        language="json"
                        component={CodeEditor}
                        onChange={(newVal, handleFieldChange) => {
                            let parsed = null;
                            try {
                                parsed = JSON.parse(newVal.target.value);
                            } catch {
                                return;
                            }

                            handleFieldChange(name, parsed)
                        }}
                        data-color-mode="light"
                        minHeight={100}
                        className='form-textarea'
                    />
                )}
                {(type!=='select' && type!=='editor') && (
                    <Field
                        id={name}
                        type={type}
                        name={name}
                        value={defaultValue || data?.default}
                        className={'form-' + typeClass}
                    />                    
                )}
                {data.description && (
                    <p className="py-2 text-sm text-gray-600">{data.description}</p>
                )}
                <FieldError
                    name={name}
                />
            </div>
        </div>
    );
};

const DemoForm = (props) => {
	const [formData, setFormData] = useState({
        dedicatedServerId: randomFriendlyPhrase(),
        region: navigator.language.split('-')[1],
        gameHostBindAddress: '0.0.0.0',
        gameHostBindPort: 2001,
        gameHostRegisterBindAddress: '',
        gameHostRegisterPort: 2001,
        a2sQueryEnabled: true,
        steamQueryPort: 17777,
        adminPassword: generator.generate({length: 12, numbers: true, strict: true}),
        game: {
            name: '',
            password: '',
            scenarioId: '',
            scenarioName: '',
            playerCountLimit: 32,
            autoJoinable: false,
            visible: false,
            gameMode: '',
            supportedGameClientTypes: [],
            gameProperties: {
                serverMaxViewDistance: 1600,
                serverMinGrassDistance: 50,
                networkViewDistance: 500,
                disableThirdPerson: false,
                fastValidation: true,
                battlEye: true,
                VONDisableUI: false,
                VONDisableDirectSpeechUI: false,
                missionHeader: {}
            },
            mods: []
        }
    });    
	
	const handleChange = (newData) => {
		// newData is a copy of the object formData with properties (and nested properties)
		// updated using immutability pattern for each change occured in the form.
		setFormData(newData);
	}
	
	const handleSubmit = () => {
		const { doWhateverYouWant } = props;
		doWhateverYouWant(formData); // Do whatever you want with the form data
	}

	return (
		<Form
			data={formData}
			onChange={handleChange}
			onSubmit={handleSubmit}
			schema={EnfusionSchema}
		>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                
                <div className="text-gray-600 mb-2">
                    <p className="font-medium text-lg">Base Settings</p>
                    <p></p>
                </div>
                <div className="lg:col-span-2">
                    <FormField
                        label="Server ID"
                        name="dedicatedServerId"
                        data={EnfusionSchema.properties.dedicatedServerId}
                        value={formData.dedicatedServerId}
                    />
                    <FormField
                        label="Region"
                        name="region"
                        data={EnfusionSchema.properties.region}
                        value={formData.region}
                    />
                    <FormField
                        label="Host Bind Address"
                        name="gameHostBindAddress"
                        data={EnfusionSchema.properties.gameHostBindAddress}
                        value={formData.gameHostBindAddress}
                    />
                    <FormField
                        label="Host Bind Port"
                        name="gameHostBindPort"
                        data={EnfusionSchema.properties.gameHostBindPort}
                        value={formData.gameHostBindPort}
                        min={EnfusionSchema.properties.gameHostBindPort.minimum}
                        max={EnfusionSchema.properties.gameHostBindPort.maximum}
                        step="1"
                    />
                    <FormField
                        label="Host Register Bind Address"
                        name="gameHostRegisterBindAddress"
                        data={EnfusionSchema.properties.gameHostRegisterBindAddress}
                        value={formData.gameHostRegisterBindAddress}
                    />
                    <FormField
                        label="Host Register Port"
                        name="gameHostRegisterPort"
                        data={EnfusionSchema.properties.gameHostRegisterPort}
                        value={formData.gameHostRegisterPort}
                        min={EnfusionSchema.properties.gameHostRegisterPort.minimum}
                        max={EnfusionSchema.properties.gameHostRegisterPort.maximum}
                        step="1"
                    />
                    <FormField
                        label="a2s Query Enabled"
                        name="a2sQueryEnabled"
                        data={EnfusionSchema.properties.a2sQueryEnabled}
                        value={formData.a2sQueryEnabled}
                    />
                    <FormField
                        label="Steam Query Port"
                        name="steamQueryPort"
                        data={EnfusionSchema.properties.steamQueryPort}
                        value={formData.steamQueryPort}
                        min={EnfusionSchema.properties.steamQueryPort.minimum}
                        max={EnfusionSchema.properties.steamQueryPort.maximum}
                        step="1"
                    />
                    <FormField
                        label="Admin Password"
                        name="adminPassword"
                        data={EnfusionSchema.properties.adminPassword}
                        value={formData.adminPassword}
                    />
                </div>
            
                <hr className='mb-4' />
            
                <div className="text-gray-600 mb-2">
                    <p className="font-medium text-lg">Game</p>
                    <p></p>
                </div>
                <div className="lg:col-span-2">
                    <FormField
                        label="Server Name"
                        name="game.name"
                        data={EnfusionSchema.properties.game.properties.name}
                        value={formData.game.name}
                    />
                    <FormField
                        label="Server Password"
                        name="game.password"
                        data={EnfusionSchema.properties.game.properties.password}
                        value={formData.game.password}
                    />
                    <AsyncFormField
                        label="Scenario ID"
                        name="game.scenarioId"
                        data={EnfusionSchema.properties.game.properties.scenarioId}
                        value={formData.game.scenarioId}
                        method="scenarios"
                    />
                    <FormField
                        label="Scenario Name"
                        name="game.scenarioName"
                        data={EnfusionSchema.properties.game.properties.scenarioName}
                        value={formData.game.scenarioName}
                    />
                    <FormField
                        label="Player Limit"
                        name="game.playerCountLimit"
                        data={EnfusionSchema.properties.game.properties.playerCountLimit}
                        value={formData.game.playerCountLimit}
                        min={EnfusionSchema.properties.game.properties.playerCountLimit.minimum}
                        max={EnfusionSchema.properties.game.properties.playerCountLimit.maximum}
                        step="1"
                    />
                    <FormField
                        label="Auto Joinable"
                        name="game.autoJoinable"
                        data={EnfusionSchema.properties.game.properties.autoJoinable}
                        value={formData.game.autoJoinable}
                    />
                    <FormField
                        label="Visible"
                        name="game.visible"
                        data={EnfusionSchema.properties.game.properties.visible}
                        value={formData.game.visible}
                    />
                    <FormField
                        label="Game Mode"
                        name="game.gameMode"
                        data={EnfusionSchema.properties.game.properties.gameMode}
                        value={formData.game.gameMode}
                    />
                    <FormField
                        label="Supported Client Types"
                        name="game.supportedGameClientTypes[]"
                        data={EnfusionSchema.properties.game.properties.supportedGameClientTypes}
                        value={formData.game.supportedGameClientTypes}
                    />
                </div>
            
                <hr className='mb-4' />
            
                <div className="text-gray-600 mb-2">
                    <p className="font-medium text-lg">Mods</p>
                    <p></p>
                </div>
                <div className="lg:col-span-2">
                    <AsyncFormField
                        label="Mods"
                        name="game.mods"
                        data={EnfusionSchema.properties.game.properties.mods}
                        value={formData.game.mods}
                        method="mods"
                    />
                </div>
            
                <hr className='mb-4' />
            
                <div className="text-gray-600 mb-2">
                    <p className="font-medium text-lg">Game Properties</p>
                    <p></p>
                </div>
                <div className="lg:col-span-2">
                    <FormField
                        label="Server Max View Distance"
                        name="game.gameProperties.serverMaxViewDistance"
                        data={EnfusionSchema.properties.game.properties.gameProperties.properties.serverMaxViewDistance}
                        value={formData.game.gameProperties.serverMaxViewDistance}
                        min={EnfusionSchema.properties.game.properties.gameProperties.properties.serverMaxViewDistance.minimum}
                        max={EnfusionSchema.properties.game.properties.gameProperties.properties.serverMaxViewDistance.maximum}
                        step="1"
                    />
                    <FormField
                        label="Server Min Grass Distance"
                        name="game.gameProperties.serverMinGrassDistance"
                        data={EnfusionSchema.properties.game.properties.gameProperties.properties.serverMinGrassDistance}
                        value={formData.game.gameProperties.serverMaxViewDistance}
                        min={EnfusionSchema.properties.game.properties.gameProperties.properties.serverMinGrassDistance.minimum}
                        max={EnfusionSchema.properties.game.properties.gameProperties.properties.serverMinGrassDistance.maximum}
                        step="1"
                    />
                    <FormField
                        label="Netword View Distance"
                        name="game.gameProperties.networkViewDistance"
                        data={EnfusionSchema.properties.game.properties.gameProperties.properties.networkViewDistance}
                        value={formData.game.gameProperties.networkViewDistance}
                        min={EnfusionSchema.properties.game.properties.gameProperties.properties.networkViewDistance.minimum}
                        max={EnfusionSchema.properties.game.properties.gameProperties.properties.networkViewDistance.maximum}
                        step="1"
                    />
                    <FormField
                        label="Disable Third Person"
                        name="game.gameProperties.disableThirdPerson"
                        data={EnfusionSchema.properties.game.properties.gameProperties.properties.disableThirdPerson}
                        value={formData.game.gameProperties.disableThirdPerson}
                    />
                    <FormField
                        label="Fast Validation"
                        name="game.gameProperties.fastValidation"
                        data={EnfusionSchema.properties.game.properties.gameProperties.properties.fastValidation}
                        value={formData.game.gameProperties.fastValidation}
                    />
                    <FormField
                        label="BattlEye"
                        name="game.gameProperties.battlEye"
                        data={EnfusionSchema.properties.game.properties.gameProperties.properties.battlEye}
                        value={formData.game.gameProperties.battlEye}
                    />
                    <FormField
                        label="VON Disable UI"
                        name="game.gameProperties.VONDisableUI"
                        data={EnfusionSchema.properties.game.properties.gameProperties.properties.VONDisableUI}
                        value={formData.game.gameProperties.VONDisableUI}
                    />
                    <FormField
                        label="VON Disable Direct Speech UI"
                        name="game.gameProperties.VONDisableDirectSpeechUI"
                        data={EnfusionSchema.properties.game.properties.gameProperties.properties.VONDisableDirectSpeechUI}
                        value={formData.game.gameProperties.VONDisableDirectSpeechUI}
                    />
                    <FormField
                        label="Mission Header"
                        name="game.gameProperties.missionHeader"
                        data={EnfusionSchema.properties.game.properties.gameProperties.properties.missionHeader}
                        value={formData.game.gameProperties.missionHeader}
                        form={{formData, setFormData}}
                    />
                </div>
            </div>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="text-gray-600 mb-2">
                    <p className="font-medium text-lg">Config</p>
                    <p></p>
                </div>
                <div className="lg:col-span-2">
                    <CodeEditor
                        value={JSON.stringify(formData, null, 4)}
                        language="json"
                        minHeight={500}
                    />
                </div>
                <div className="lg:col-span-2 mt-3">
                    <button
                        onClick={() => exportConfig(formData.dedicatedServerId, formData)}
                        className='rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300'
                    >
                        <div className="flex justify-center items-center relative">
                            <svg width="9" height="11" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className="download-arrow" d="M13 9L9 13M9 13L5 9M9 13V1" stroke="#F2F2F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M1 17V18C1 18.7956 1.31607 19.5587 1.87868 20.1213C2.44129 20.6839 3.20435 21 4 21H14C14.7956 21 15.5587 20.6839 16.1213 20.1213C16.6839 19.5587 17 18.7956 17 18V17" stroke="#F2F2F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="pl-2 leading-none">Download</span>
                        </div>
                    </button>
                </div>
            </div>
            
            {/* small hack to allow TailwindCSS reconizing dynamic classes */}
            <span className='form-input form-select form-checkbox hidden'></span>
		</Form>
	);
}

export default DemoForm;