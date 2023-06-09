import { Helmet } from 'react-helmet-async';

import React, { useState } from 'react';
import { Form } from 'react-jsonschema-form-validation';
import Breadcrumb from '../components/Breadcrumb';

import FormField from '../components/FormField';
import FormGroup from '../components/FormGroup';
import FormCodeEditor from '../components/FormCodeEditor';

import formDataCleaner from '../hooks/formDataCleaner';

import ReforgerServerConfigSchema from '../schema/ReforgerServerConfigSchema.json';

const exportConfig = (name, data) => {
    const fileData = JSON.stringify(data, null, 4);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = name.split(' ').join('') + '.json';
    link.href = url;
    link.click();
}

const ReforgerConfig = () => {
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
            passwordAdmin: '', //generator.generate({length: 12, numbers: true, strict: true}),
            scenarioId: '',
            playerCountLimit: 127,
            visible: true,
            crossPlatform: false,
            supportedPlatforms: [],
            gameProperties: {
                serverMaxViewDistance: 1600,
                serverMinGrassDistance: 0,
                networkViewDistance: 1500,
                disableThirdPerson: false,
                fastValidation: false,
                battlEye: true,
                VONDisableUI: false,
                VONDisableDirectSpeechUI: false,
                missionHeader: {}
            },
            mods: []
        },
        operating: {
            lobbyPlayerSynchronise: true,
            playerSaveTime: 120,
            aiLimit: -1
        }
    });

    const [formDataClean, setformDataClean] = useState(formDataCleaner(formData, ReforgerServerConfigSchema));

    const handleChange = (newData) => {
        setFormData(newData);
        const cleanData = formDataCleaner(newData, ReforgerServerConfigSchema);
        setformDataClean(cleanData);
    };
    const handleSubmit = () => {};

    return (
        <>
            <Helmet>
                <title>Reforger Server Config</title>
            </Helmet>
            <Breadcrumb pageName="Reforger Server Config" />

            <Form
                data={formData}
				onChange={handleChange}
				onSubmit={handleSubmit}
				schema={ReforgerServerConfigSchema}
            >
                <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 grid-flow-dense">
                    <div className="flex flex-col gap-9">
                        <FormGroup
                            title="Main"
                            //title={ReforgerServerConfigSchema.title}
                            description={ReforgerServerConfigSchema.description}
                        >
                            <FormField
                                name="bindAddress"
                                data={ReforgerServerConfigSchema.properties.bindAddress}
                                value={formData.bindAddress}
                            />
                            <FormField
                                name="bindPort"
                                data={ReforgerServerConfigSchema.properties.bindPort}
                                value={formData.bindPort}
                            />
                            <FormField
                                name="publicAddress"
                                data={ReforgerServerConfigSchema.properties.publicAddress}
                                value={formData.publicAddress}
                            />
                            <FormField
                                name="publicPort"
                                data={ReforgerServerConfigSchema.properties.publicPort}
                                value={formData.publicPort}
                            />
                        </FormGroup>

                        <FormGroup
                            title={ReforgerServerConfigSchema.definitions.a2s.title}
                            description={ReforgerServerConfigSchema.definitions.a2s.description}
                        >
                            <FormField
                                name="a2s.address"
                                data={ReforgerServerConfigSchema.definitions.a2s.properties.address}
                                value={formData.a2s.address}
                            />
                            <FormField
                                name="a2s.port"
                                data={ReforgerServerConfigSchema.definitions.a2s.properties.port}
                                value={formData.a2s.port}
                            />
                        </FormGroup>
                        <FormGroup
                            title={ReforgerServerConfigSchema.definitions.operating.title}
                            description={ReforgerServerConfigSchema.definitions.operating.description}
                        >
                            <FormField
                                name="operating.lobbyPlayerSynchronise"
                                data={ReforgerServerConfigSchema.definitions.operating.properties.lobbyPlayerSynchronise}
                                value={formData.operating.lobbyPlayerSynchronise}
                            />
                            <FormField
                                name="operating.playerSaveTime"
                                data={ReforgerServerConfigSchema.definitions.operating.properties.playerSaveTime}
                                value={formData.operating.playerSaveTime}
                            />
                            <FormField
                                name="operating.aiLimit"
                                data={ReforgerServerConfigSchema.definitions.operating.properties.aiLimit}
                                value={formData.operating.aiLimit}
                            />
                        </FormGroup>
                        <FormGroup
                            title={ReforgerServerConfigSchema.definitions.gameProperties.title}
                            description={ReforgerServerConfigSchema.definitions.gameProperties.description}
                        >
                            <FormField
                                name="game.gameProperties.serverMaxViewDistance"
                                data={ReforgerServerConfigSchema.definitions.gameProperties.properties.serverMaxViewDistance}
                                value={formData.game.gameProperties.serverMaxViewDistance}
                            />
                            <FormField
                                name="game.gameProperties.serverMinGrassDistance"
                                data={ReforgerServerConfigSchema.definitions.gameProperties.properties.serverMinGrassDistance}
                                value={formData.game.gameProperties.serverMinGrassDistance}
                            />
                            <FormField
                                name="game.gameProperties.fastValidation"
                                data={ReforgerServerConfigSchema.definitions.gameProperties.properties.fastValidation}
                                value={formData.game.gameProperties.fastValidation}
                            />
                            <FormField
                                name="game.gameProperties.networkViewDistance"
                                data={ReforgerServerConfigSchema.definitions.gameProperties.properties.networkViewDistance}
                                value={formData.game.gameProperties.networkViewDistance}
                            />
                            <FormField
                                name="game.gameProperties.battlEye"
                                data={ReforgerServerConfigSchema.definitions.gameProperties.properties.battlEye}
                                value={formData.game.gameProperties.battlEye}
                            />
                            <FormField
                                name="game.gameProperties.disableThirdPerson"
                                data={ReforgerServerConfigSchema.definitions.gameProperties.properties.disableThirdPerson}
                                value={formData.game.gameProperties.disableThirdPerson}
                            />
                            <FormField
                                name="game.gameProperties.VONDisableUI"
                                data={ReforgerServerConfigSchema.definitions.gameProperties.properties.VONDisableUI}
                                value={formData.game.gameProperties.VONDisableUI}
                            />
                            <FormField
                                name="game.gameProperties.VONDisableDirectSpeechUI"
                                data={ReforgerServerConfigSchema.definitions.gameProperties.properties.VONDisableDirectSpeechUI}
                                value={formData.game.gameProperties.VONDisableDirectSpeechUI}
                            />
                            <FormField
                                name="game.gameProperties.missionHeader"
                                data={ReforgerServerConfigSchema.definitions.gameProperties.properties.missionHeader}
                                value={formData.game.gameProperties.missionHeader}
                            />
                        </FormGroup>
                    </div>
                    <div className="flex flex-col gap-9">
                        <FormGroup
                            title={ReforgerServerConfigSchema.definitions.game.title}
                            description={ReforgerServerConfigSchema.definitions.game.description}
                        >
                            <FormField
                                name="game.name"
                                data={ReforgerServerConfigSchema.definitions.game.properties.name}
                                value={formData.game.name}
                            />
                            <FormField
                                name="game.password"
                                data={ReforgerServerConfigSchema.definitions.game.properties.password}
                                value={formData.game.password}
                            />
                            <FormField
                                name="game.passwordAdmin"
                                data={ReforgerServerConfigSchema.definitions.game.properties.passwordAdmin}
                                value={formData.game.passwordAdmin}
                            />
                            <FormField
                                name="game.scenarioId"
                                data={ReforgerServerConfigSchema.definitions.game.properties.scenarioId}
                                value={formData.game.scenarioId}
                                mods={formData.game.mods}
                            />
                            <FormField
                                name="game.playerCountLimit"
                                data={ReforgerServerConfigSchema.definitions.game.properties.playerCountLimit}
                                value={formData.game.playerCountLimit}
                            />
                            <FormField
                                name="game.visible"
                                data={ReforgerServerConfigSchema.definitions.game.properties.visible}
                                value={formData.game.visible}
                            />
                            <FormField
                                name="game.supportedPlatforms[]"
                                data={ReforgerServerConfigSchema.definitions.game.properties.supportedPlatforms}
                                value={formData.game.supportedPlatforms}
                            />
                        </FormGroup>
                        <FormGroup
                            title={ReforgerServerConfigSchema.definitions.game.properties.mods.title}
                            description={ReforgerServerConfigSchema.definitions.game.properties.mods.description}
                        >
                            <FormField
                                name="game.mods[]"
                                data={ReforgerServerConfigSchema.definitions.game.properties.mods}
                                value={formData.game.mods}
                            />
                        </FormGroup>
                        <FormGroup
                            title="Export"
                            grow={true}
                        >
                            <FormCodeEditor
                                id="result"
                                value={JSON.stringify(formDataClean, null, 4)}
                                name="result"
                                disabled
                            />

                            <button
                                type="button"
                                onClick={() => exportConfig('config', formDataClean)}
                                className='rounded-lg px-4 py-2 bg-primary text-white duration-300'
                            >
                                <div className="flex justify-center items-center relative stroke-white">
                                    <svg width="9" height="11" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 9L9 13M9 13L5 9M9 13V1"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M1 17V18C1 18.7956 1.31607 19.5587 1.87868 20.1213C2.44129 20.6839 3.20435 21 4 21H14C14.7956 21 15.5587 20.6839 16.1213 20.1213C16.6839 19.5587 17 18.7956 17 18V17"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span className="pl-2 leading-none">Download</span>
                                </div>
                            </button>
                        </FormGroup>
                    </div>
                </div>
            </Form>
        </>
    );
};

export default ReforgerConfig;