import React, { useState, useEffect } from 'react';

import { Field, FieldError, Form } from 'react-jsonschema-form-validation';
import Select from 'react-select';
import CodeEditor from '@uiw/react-textarea-code-editor';

//import randomFriendlyPhrase from 'randomfriendlyphrase';
import generator from 'generate-password-ts';

import EnfusionSchema from './ReforgerSchema.json';

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
    const {name, data, value, method, mods} = props;

    let type ='select';
    let label = data.title;

    const [jsonData, setJsonData] = useState(null);

    const getJsonData = async () => {

        // TODO: implement invalidation time, since localStorage is "forever"

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
        }).filter((item) => item !== null).filter((item) => {
            return (mods.find((m) => m.name === item.label));
        });
        let vanilla = [];
        vanilla.push({
            value: '{90F086877C27B6F6}Missions/99_Tutorial.conf',
            label: '{90F086877C27B6F6}Missions/99_Tutorial.conf'
        });
        vanilla.push({
            value: '{ECC61978EDCC2B5A}Missions/23_Campaign.conf',
            label: '{ECC61978EDCC2B5A}Missions/23_Campaign.conf'
        });
        vanilla.push({
            value: '{59AD59368755F41A}Missions/21_GM_Eden.conf',
            label: '{59AD59368755F41A}Missions/21_GM_Eden.conf'
        });
        options.unshift({
            label: 'Official scenarios',
            options: vanilla
        });
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
                {data?.description && (
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
    const {name, data, value} = props;

    let type ='text';
    let typeClass ='input';
    let options = [];
    let defaultValue = value ?? "";
    let label = data.title;

    switch(data.type) {
        default:
        case 'string':
            type ='text';
            break;
        case 'integer':
        case 'number':
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
                        defaultValue={defaultValue ?? [data?.default]}
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
                        value={defaultValue}
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
                        value={defaultValue ?? data?.default}
                        className={'form-' + typeClass}
                    />                    
                )}
                {data?.description && (
                    <p className="py-2 text-sm text-gray-600">{data.description}</p>
                )}
                <FieldError
                    name={name}
                />
            </div>
        </div>
    );
};

const ServerConfigForm = (props) => {
	const [formData, setFormData] = useState({
        bindAddress: '',
        bindPort: 2001,
        publicAddress: '',
        publicPort: 2001,
        a2s: {
            address: '',
            port: 17777
        },
        game: {
            name: '',
            password: '',
            passwordAdmin: generator.generate({length: 12, numbers: true, strict: true}),
            scenarioId: '',
            playerCountLimit: 127,
            visible: true,
            crossPlatform: false,
            supportedGameClientTypes: [],
            gameProperties: {
                serverMaxViewDistance: 1600,
                serverMinGrassDistance: 0,
                networkViewDistance: 1500,
                disableThirdPerson: false,
                fastValidation: false,
                battlEye: true,
                VONDisableUI: false,
                VONDisableDirectSpeechUI: false,
                missionHeader: ''
            },
            mods: []
        },
        operating: {
            lobbyPlayerSynchronise: true,
            playerSaveTime: 120,
            aiLimit: -1
        }
    });

    const formDataCleaner = (data, group, isArray) => {
        let dataArray = Object.entries(data);

        let newDataArray = dataArray.map(([key, value]) => {
            if (typeof value === "object") {
                // custom handling for game.mods
                // array with objects
                if (key === 'mods') {
                    let temp = formDataCleaner(value, key, true);
                    let newTemp = temp.map((value, index) => {
                        return value[1];
                    });
                    if (newTemp.length === 0) {
                        return [];
                    }
                    return [key, newTemp];
                }
                // custom handling for game.supportedGameClientTypes
                // flat array
                if (key === 'supportedGameClientTypes') {
                    let temp = formDataCleaner(value, key, true);
                    let newTemp = temp.map((value, index) => {
                        return value[1];
                    });
                    if (newTemp.length === 0) {
                        return [];
                    }
                    return [key, newTemp];
                }
                let temp = [key, formDataCleaner(value, key)];
                
                // remove empty arrays/objects
                if (Object.keys(temp[1]).length === 0
                || temp[1].length === 0) {
                    return [];
                }
                return temp;
            }

            if (
                EnfusionSchema[group]?.required.includes(key)
                || EnfusionSchema.definitions[group]?.required?.includes(key)
            ) {
                return [key, value];
            }

            if (
                ((typeof value === "string" || typeof value === "number") && value !== '')
                || (typeof value === "boolean")
                || (typeof value === "object" && (
                    Object.keys(value).length === 0
                    || value.length === 0
                ))
            ) {
                if (
                    EnfusionSchema.properties[key]?.default === value
                    || EnfusionSchema[group]?.properties[key]?.default === value
                    || EnfusionSchema.definitions[group]?.properties[key]?.default === value
                ) {
                    return [];
                }
                return [key, value];
            }
            return [];
        }).filter(([key, value]) => value !== undefined);

        if (isArray) {
            return newDataArray;
        }
        return Object.fromEntries(newDataArray);
    }

    const [formDataClean, setformDataClean] = useState(formDataCleaner(formData));
	
	const handleChange = (newData) => {
		setFormData(newData);

        let cleanData = formDataCleaner(newData);

        setformDataClean(cleanData);
	}
	
	const handleSubmit = (event) => {
        console.log(event)
        event.preventDefault();
        // nothing to submit, because everything happens onChange
        return false;
	}

	return (
        <>
		<Form
			data={formData}
			onChange={handleChange}
			onSubmit={handleSubmit}
			schema={EnfusionSchema}
		>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                
                <div className="text-gray-600 mb-2">
                    <p className="font-medium text-lg">Main</p>
                    <p></p>
                </div>
                <div className="lg:col-span-2">
                    <FormField
                        name="bindAddress"
                        data={EnfusionSchema.properties.bindAddress}
                        value={formData.bindAddress}
                    />
                    <FormField
                        name="bindPort"
                        data={EnfusionSchema.properties.bindPort}
                        value={formData.bindPort}
                        min={EnfusionSchema.properties.bindPort.minimum}
                        max={EnfusionSchema.properties.bindPort.maximum}
                        step="1"
                    />
                    <FormField
                        name="publicAddress"
                        data={EnfusionSchema.properties.publicAddress}
                        value={formData.publicAddress}
                    />
                    <FormField
                        name="publicPort"
                        data={EnfusionSchema.properties.publicPort}
                        value={formData.publicPort}
                        min={EnfusionSchema.properties.publicPort.minimum}
                        max={EnfusionSchema.properties.publicPort.maximum}
                        step="1"
                    />
                </div>

                <hr className='mb-4' />
            
                <div className="text-gray-600 mb-2">
                    <p className="font-medium text-lg">Main &gt; A2S</p>
                    <p></p>
                </div>
                <div className="lg:col-span-2">
                    <FormField
                        name="a2s.address"
                        data={EnfusionSchema.definitions.a2s.properties.address}
                        value={formData.a2s.address}
                    />
                    <FormField
                        name="a2s.port"
                        data={EnfusionSchema.definitions.a2s.properties.port}
                        value={formData.a2s.port}
                        min={EnfusionSchema.definitions.a2s.properties.port.minimum}
                        max={EnfusionSchema.definitions.a2s.properties.port.maximum}
                        step={EnfusionSchema.definitions.a2s.properties.port.multipleOf}
                    />
                </div>
                
                <hr className='mb-4' />
            
                <div className="text-gray-600 mb-2">
                    <p className="font-medium text-lg">Game &gt; Mods</p>
                    <p></p>
                </div>
                <div className="lg:col-span-2">
                    <AsyncFormField
                        label="Mods"
                        name="game.mods"
                        data={EnfusionSchema.definitions.game.properties.mods}
                        value={formData.game.mods}
                        method="mods"
                    />
                </div>
                
                <hr className='mb-4' />
            
                <div className="text-gray-600 mb-2">
                    <p className="font-medium text-lg">Game</p>
                    <p></p>
                </div>
                <div className="lg:col-span-2">
                    <FormField
                        name="game.name"
                        data={EnfusionSchema.definitions.game.properties.name}
                        value={formData.game.name}
                    />
                    <FormField
                        name="game.password"
                        data={EnfusionSchema.definitions.game.properties.password}
                        value={formData.game.password}
                    />
                    <FormField
                        name="game.passwordAdmin"
                        data={EnfusionSchema.definitions.game.properties.passwordAdmin}
                        value={formData.game.passwordAdmin}
                    />
                    <AsyncFormField
                        name="game.scenarioId"
                        data={EnfusionSchema.definitions.game.properties.scenarioId}
                        value={formData.game.scenarioId}
                        method="scenarios"
                        mods={formData.game.mods}
                    />
                    <FormField
                        name="game.playerCountLimit"
                        data={EnfusionSchema.definitions.game.properties.playerCountLimit}
                        value={formData.game.playerCountLimit}
                        min={EnfusionSchema.definitions.game.properties.playerCountLimit.minimum}
                        max={EnfusionSchema.definitions.game.properties.playerCountLimit.maximum}
                        step="1"
                    />
                    <FormField
                        label="Visible"
                        name="game.visible"
                        data={EnfusionSchema.definitions.game.properties.visible}
                        value={formData.game.visible}
                    />
                    <FormField
                        label="Supported Client Types"
                        name="game.supportedGameClientTypes[]"
                        data={EnfusionSchema.definitions.game.properties.supportedGameClientTypes}
                        value={formData.game.supportedGameClientTypes}
                    />
                </div>
            
                <hr className='mb-4' />
            
                <div className="text-gray-600 mb-2">
                    <p className="font-medium text-lg">Game &gt; GameProperties</p>
                    <p></p>
                </div>
                <div className="lg:col-span-2">
                    <FormField
                        name="game.gameProperties.serverMaxViewDistance"
                        data={EnfusionSchema.definitions.gameProperties.properties.serverMaxViewDistance}
                        value={formData.game.gameProperties.serverMaxViewDistance}
                        min={EnfusionSchema.definitions.gameProperties.properties.serverMaxViewDistance.minimum}
                        max={EnfusionSchema.definitions.gameProperties.properties.serverMaxViewDistance.maximum}
                        step={EnfusionSchema.definitions.gameProperties.properties.serverMaxViewDistance.multipleOf}
                    />
                    <FormField
                        name="game.gameProperties.serverMinGrassDistance"
                        data={EnfusionSchema.definitions.gameProperties.properties.serverMinGrassDistance}
                        value={formData.game.gameProperties.serverMinGrassDistance}
                        min={EnfusionSchema.definitions.gameProperties.properties.serverMinGrassDistance.minimum}
                        max={EnfusionSchema.definitions.gameProperties.properties.serverMinGrassDistance.maximum}
                        step={EnfusionSchema.definitions.gameProperties.properties.serverMinGrassDistance.multipleOf}
                    />
                    <FormField
                        name="game.gameProperties.networkViewDistance"
                        data={EnfusionSchema.definitions.gameProperties.properties.networkViewDistance}
                        value={formData.game.gameProperties.networkViewDistance}
                        min={EnfusionSchema.definitions.gameProperties.properties.networkViewDistance.minimum}
                        max={EnfusionSchema.definitions.gameProperties.properties.networkViewDistance.maximum}
                        step={EnfusionSchema.definitions.gameProperties.properties.networkViewDistance.multipleOf}
                    />
                    <FormField
                        name="game.gameProperties.disableThirdPerson"
                        data={EnfusionSchema.definitions.gameProperties.properties.disableThirdPerson}
                        value={formData.game.gameProperties.disableThirdPerson}
                    />
                    <FormField
                        name="game.gameProperties.fastValidation"
                        data={EnfusionSchema.definitions.gameProperties.properties.fastValidation}
                        value={formData.game.gameProperties.fastValidation}
                    />
                    <FormField
                        name="game.gameProperties.battlEye"
                        data={EnfusionSchema.definitions.gameProperties.properties.battlEye}
                        value={formData.game.gameProperties.battlEye}
                    />
                    <FormField
                        name="game.gameProperties.VONDisableUI"
                        data={EnfusionSchema.definitions.gameProperties.properties.VONDisableUI}
                        value={formData.game.gameProperties.VONDisableUI}
                    />
                    <FormField
                        name="game.gameProperties.VONDisableDirectSpeechUI"
                        data={EnfusionSchema.definitions.gameProperties.properties.VONDisableDirectSpeechUI}
                        value={formData.game.gameProperties.VONDisableDirectSpeechUI}
                    />
                    <FormField
                        name="game.gameProperties.missionHeader"
                        data={EnfusionSchema.definitions.gameProperties.properties.missionHeader}
                        value={formData.game.gameProperties.missionHeader}
                    />
                </div>

                <hr className='mb-4' />
            
                <div className="text-gray-600 mb-2">
                    <p className="font-medium text-lg">Main &gt; Operating</p>
                    <p></p>
                </div>
                <div className="lg:col-span-2">
                    <FormField
                        name="operating.lobbyPlayerSynchronise"
                        data={EnfusionSchema.definitions.operating.properties.lobbyPlayerSynchronise}
                        value={formData.operating.lobbyPlayerSynchronise}
                    />
                    <FormField
                        name="operating.playerSaveTime"
                        data={EnfusionSchema.definitions.operating.properties.playerSaveTime}
                        value={formData.operating.playerSaveTime}
                        step="1"
                    />
                    <FormField
                        name="operating.aiLimit"
                        data={EnfusionSchema.definitions.operating.properties.aiLimit}
                        value={formData.operating.aiLimit}
                        min={EnfusionSchema.definitions.operating.properties.aiLimit.minimum}
                        max={EnfusionSchema.definitions.operating.properties.aiLimit.maximum}
                        step="1"
                    />
                </div>
            </div>
		</Form>

        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div className="text-gray-600 mb-2">
            <p className="font-medium text-lg">Config</p>
            <p></p>
        </div>
        <div className="lg:col-span-2">
            <CodeEditor
                value={JSON.stringify(formDataClean, null, 4)}
                language="json"
                minHeight={500}
            />
        </div>
        <div className="lg:col-span-2 mt-3">
            <button
                onClick={() => exportConfig('config', formDataClean)}
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

        </>
	);
}

export default ServerConfigForm;