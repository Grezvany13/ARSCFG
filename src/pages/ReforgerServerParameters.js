import { Helmet } from 'react-helmet-async';

import React, { useState } from 'react';
import { Form } from 'react-jsonschema-form-validation';
import Breadcrumb from '../components/Breadcrumb';

import FormField from '../components/FormField';
import FormGroup from '../components/FormGroup';

import FormCodeEditor from '../components/FormCodeEditor';

import ReforgerServerParameterSchema from '../schema/ReforgerServerParameterSchema.json';
import formDataCleaner from '../hooks/formDataCleaner';

// const exportConfig = (name, data) => {
//     const fileData = JSON.stringify(data, null, 4);
//     const blob = new Blob([fileData], { type: "application/json" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.download = name.split(' ').join('') + '.json';
//     link.href = url;
//     link.click();
// }

const formatParameters = (data) => {
    let str = '';

    str = (data.custom.os === 'Windows' ? 'ArmaReforgerServer.exe' : '.\\ArmaReforgerServer');

    if (data?.hosting) {
        for (let [key, val] of Object.entries(data.hosting)) {
            if (val === true) {
                str += ` -${key}`;
            } else  {
                str += ` -${key}=${val}`;
            }
        }
    }
    if (data?.network) {
        for (let [key, val] of Object.entries(data.network)) {
            if (val === true) {
                str += ` -${key}`;
            } else  {
                str += ` -${key}=${val}`;
            }
        }
    }
    if (data?.debug) {
        for (let [key, val] of Object.entries(data.debug)) {
            if (val === true) {
                str += ` -${key}`;
            } else  {
                str += ` -${key}=${val}`;
            }
        }
    }

    return str;
};

const ReforgerServerParameters = () => {
    const [formData, setFormData] = useState({
        custom: {
            os: 'Windows',
            path: ''
        },
        hosting: {
            a2sIpAddress: '',
            a2sPort: 17777,
            autoreload: 0,
            bindIP: '',
            bindPort: 2001,
            config: '',
            listScenarios: false,
            logStats: 0,
            logStats_toggle: false,
            maxFPS: 0,
            client: ''
        },
        network: {
            nds: 2,
            nwkResolution: 500,
            "rpl-reconnect": false,
            "rpl-timeout-disable": false,
            "rpl-timeout-ms": 0,
            "rpl-validation-rdb-disable": false,
            "rpl-validation-scr-disable": false,
            "rpl-validation-version-disable": false,
            staggeringBudget: 5000,
            streamingBudget: 500,
            streamsDelta: 100
        },
        debug: {
            aiLimit: -1,
            debugger: 'localhost',
            debuggerPort: 1000,
            disableCrashReporter: false,
            disableShadersBuild: false,
            generateShaders: false,
            keepNumOfLogs: 10,
            "log-rdb-checksum": false,
            "log-scr-checksum": false,
            logAppend: false,
            logFS: false
        }
    });

    const [formDataClean, setformDataClean] = useState(formDataCleaner(formData, ReforgerServerParameterSchema));
    const [formDataString, setformDataString] = useState(formatParameters(formDataClean));

    const handleChange = (newData) => {
        setFormData(newData);
        const cleanData = formDataCleaner(newData, ReforgerServerParameterSchema);
        setformDataClean(cleanData);
        setformDataString(formatParameters(cleanData));
    };
    const handleSubmit = () => {};

    return (
        <>
            <Helmet>
                <title>Reforger Server Parameters</title>
            </Helmet>
            <Breadcrumb pageName="Reforger Server Parameters" />

            <Form
                data={formData}
				onChange={handleChange}
				onSubmit={handleSubmit}
				schema={ReforgerServerParameterSchema}
            >
                <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 grid-flow-dense">
                    <div className="flex flex-col gap-9 col-span-1 sm:col-span-2">
                        <FormGroup
                            title="Configurator settings"
                            description="These settings are beyond the parameters, but are used to generate the proper structure for your server."
                        >
                            <FormField
                                name="custom.os"
                                data={{
                                    type: "array",
                                    items: {
                                        type: "string",
                                        enum: ["Windows", "Linux"]
                                    },
                                    maxItems: 1,
                                    minItems: 1,
                                    uniqueItems: true,
                                    title: "Operating System",
                                    description: ""
                                }}
                                value={formData.custom.os}
                            />
                        </FormGroup>
                    </div>
                    <div className="flex flex-col gap-9">
                        <FormGroup
                            title="Common"
                            description=""
                        >
                            <FormField
                                name="hosting.config"
                                data={ReforgerServerParameterSchema.definitions.hosting.properties.config}
                                value={formData.hosting.config}
                            />
                            <FormField
                                name="hosting.maxFPS"
                                data={ReforgerServerParameterSchema.definitions.hosting.properties.maxFPS}
                                value={formData.hosting.maxFPS}
                            />
                            <FormField
                                name="debug.aiLimit"
                                data={ReforgerServerParameterSchema.definitions.debug.properties.aiLimit}
                                value={formData.debug.aiLimit}
                            />
                            <FormField
                                name="hosting.logStats"
                                data={ReforgerServerParameterSchema.definitions.hosting.properties.logStats}
                                value={formData.hosting.logStats}
                                toggle={formData.hosting.logStats_toggle}
                            />
                        </FormGroup>

                        <FormGroup
                            title={ReforgerServerParameterSchema.definitions.hosting.title}
                            description={ReforgerServerParameterSchema.definitions.hosting.description}
                        >
                            <FormField
                                name="hosting.a2sIpAddress"
                                data={ReforgerServerParameterSchema.definitions.hosting.properties.a2sIpAddress}
                                value={formData.hosting.a2sIpAddress}
                            />
                            <FormField
                                name="hosting.a2sPort"
                                data={ReforgerServerParameterSchema.definitions.hosting.properties.a2sPort}
                                value={formData.hosting.a2sPort}
                            />
                            <FormField
                                name="hosting.autoreload"
                                data={ReforgerServerParameterSchema.definitions.hosting.properties.autoreload}
                                value={formData.hosting.autoreload}
                            />
                            <FormField
                                name="hosting.bindIP"
                                data={ReforgerServerParameterSchema.definitions.hosting.properties.bindIP}
                                value={formData.hosting.bindIP}
                            />
                            <FormField
                                name="hosting.bindPort"
                                data={ReforgerServerParameterSchema.definitions.hosting.properties.bindPort}
                                value={formData.hosting.bindPort}
                            />
                            <FormField
                                name="hosting.listScenarios"
                                data={ReforgerServerParameterSchema.definitions.hosting.properties.listScenarios}
                                value={formData.hosting.listScenarios}
                            />
                            <FormField
                                name="hosting.client"
                                data={ReforgerServerParameterSchema.definitions.hosting.properties.client}
                                value={formData.hosting.client}
                            />
                        </FormGroup>
                    </div>
                    <div className="flex flex-col gap-9">
                        <FormGroup
                            title={ReforgerServerParameterSchema.definitions.hosting.title}
                            description={ReforgerServerParameterSchema.definitions.hosting.description}
                        >
                            <FormCodeEditor
                                id="result"
                                value={formDataString}
                                name="result"
                                disabled
                            />
                        </FormGroup>

                        <FormGroup
                            title={ReforgerServerParameterSchema.definitions.network.title}
                            description={ReforgerServerParameterSchema.definitions.network.description}
                        >
                            <FormField
                                name="network.nds"
                                data={ReforgerServerParameterSchema.definitions.network.properties.nds}
                                value={formData.network.nds}
                            />
                            <FormField
                                name="network.nwkResolution"
                                data={ReforgerServerParameterSchema.definitions.network.properties.nwkResolution}
                                value={formData.network.nwkResolution}
                            />
                            <FormField
                                name="network.rpl-reconnect"
                                data={ReforgerServerParameterSchema.definitions.network.properties['rpl-reconnect']}
                                value={formData.network['rpl-reconnect']}
                            />
                            <FormField
                                name="network.rpl-timeout-disable"
                                data={ReforgerServerParameterSchema.definitions.network.properties['rpl-timeout-disable']}
                                value={formData.network['rpl-timeout-disable']}
                            />
                            <FormField
                                name="network.rpl-timeout-ms"
                                data={ReforgerServerParameterSchema.definitions.network.properties['rpl-timeout-ms']}
                                value={formData.network['rpl-timeout-ms']}
                            />
                            <FormField
                                name="network.rpl-validation-rdb-disable"
                                data={ReforgerServerParameterSchema.definitions.network.properties['rpl-validation-rdb-disable']}
                                value={formData.network['rpl-validation-rdb-disable']}
                            />
                            <FormField
                                name="network.rpl-validation-scr-disable"
                                data={ReforgerServerParameterSchema.definitions.network.properties['rpl-validation-scr-disable']}
                                value={formData.network['rpl-validation-scr-disable']}
                            />
                            <FormField
                                name="network.rpl-validation-version-disable"
                                data={ReforgerServerParameterSchema.definitions.network.properties['rpl-validation-version-disable']}
                                value={formData.network['rpl-validation-version-disable']}
                            />
                            <FormField
                                name="network.staggeringBudget"
                                data={ReforgerServerParameterSchema.definitions.network.properties.staggeringBudget}
                                value={formData.network.staggeringBudget}
                            />
                            <FormField
                                name="network.streamingBudget"
                                data={ReforgerServerParameterSchema.definitions.network.properties.streamingBudget}
                                value={formData.network.streamingBudget}
                            />
                            <FormField
                                name="network.streamsDelta"
                                data={ReforgerServerParameterSchema.definitions.network.properties.streamsDelta}
                                value={formData.network.streamsDelta}
                            />
                        </FormGroup>

                        <FormGroup
                            title={ReforgerServerParameterSchema.definitions.debug.title}
                            description={ReforgerServerParameterSchema.definitions.debug.description}
                        >
                            <FormField
                                name="debug.debugger"
                                data={ReforgerServerParameterSchema.definitions.debug.properties.debugger}
                                value={formData.debug.debugger}
                            />
                            <FormField
                                name="debug.debuggerPort"
                                data={ReforgerServerParameterSchema.definitions.debug.properties.debuggerPort}
                                value={formData.debug.debuggerPort}
                            />
                            <FormField
                                name="debug.disableCrashReporter"
                                data={ReforgerServerParameterSchema.definitions.debug.properties.disableCrashReporter}
                                value={formData.debug.disableCrashReporter}
                            />
                            <FormField
                                name="debug.disableShadersBuild"
                                data={ReforgerServerParameterSchema.definitions.debug.properties.disableShadersBuild}
                                value={formData.debug.disableShadersBuild}
                            />
                            <FormField
                                name="debug.generateShaders"
                                data={ReforgerServerParameterSchema.definitions.debug.properties.generateShaders}
                                value={formData.debug.generateShaders}
                            />
                            <FormField
                                name="debug[log-rdb-checksum]"
                                data={ReforgerServerParameterSchema.definitions.debug.properties['log-rdb-checksum']}
                                value={formData.debug['log-rdb-checksum']}
                            />
                            <FormField
                                name="debug[log-scr-checksum]"
                                data={ReforgerServerParameterSchema.definitions.debug.properties['log-scr-checksum']}
                                value={formData.debug['log-scr-checksum']}
                            />
                            <FormField
                                name="debug.logAppend"
                                data={ReforgerServerParameterSchema.definitions.debug.properties.logAppend}
                                value={formData.debug.logAppend}
                            />
                            <FormField
                                name="debug.logFS"
                                data={ReforgerServerParameterSchema.definitions.debug.properties.logFS}
                                value={formData.debug.logFS}
                            />
                        </FormGroup>
                    </div>
                </div>
            </Form>
        </>
    );
};

export default ReforgerServerParameters;
