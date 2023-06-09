import React, { useState } from 'react';

import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";

import generator from 'generate-password-ts';

import EnfusionSchema from './ReforgerSchema.json';

const ArrayFieldTemplate = (props) => {
    const {items, canAdd, onAddClick} = props;
    return (
        <>
            {items.map(element => {
                return (
                    <div className="ArrayFieldTemplate">
                        {element.children}
                        {canAdd && (
                            <button type='button' onClick={onAddClick}></button>
                        )}
                    </div>
                )
            })}
        </>
    )
}

const ObjectFieldTemplate = (props) => {
    const {
        //DescriptionField,
        //TitleField,
        title,
        description,
        //disabled,
        properties,
        //onAddClick,
        //readonly,
        //required,
        schema,
        //uiSchema,
        //idSchema,
        //formData,
        //formContext,
        registry
    } = props;

    // if (schema === registry.rootSchema) {
    //     return (
    //         <>
    //             {properties.map(element => element.content)}
    //         </>
    //     );
    // }

    return (
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="text-gray-600 mb-2">
                <p className="font-medium text-lg">{title}</p>
                <p>{description}</p>
            </div>
            <div className="lg:col-span-2">
                {properties.map(element => element.content)}
            </div>
        </div>
    )
}
const FieldTemplate = (props) => {
    const {id, classNames, label, help, required, description, errors, children} = props;

    if (props.displayLabel !== true) {
        return (
            <>
                {children}
            </>
        );
    }

    return (
        <div className="md:flex mb-6">
            <div className="md:w-1/3">
                <label className="block font-bold md:text-left mb-3 md:mb-0 pr-4" htmlFor={id}>
                    {label}
                </label>
            </div>
            <div className="md:w-2/3">
                {children}
                {description && (
                    <p className="py-2 text-sm text-gray-600">{description}</p>
                )}
                {errors}
                {help}
            </div>
        </div>
    );
}
const Widgets = {

};

const templates ={
    FieldTemplate: FieldTemplate,
    ArrayFieldTemplate: ArrayFieldTemplate,
    ObjectFieldTemplate: ObjectFieldTemplate
};

const Test = (props) => {
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

    const log = (type) => console.log.bind(console, type);

    return (
        <Form
            schema={EnfusionSchema}
            validator={validator}
            formData={formData}
            
            templates={templates}

            onChange={log("changed")}
            onSubmit={log("submitted")}
            onError={log("errors")}
        />
    )
};

export default Test;