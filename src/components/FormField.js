import { Field, FieldError } from 'react-jsonschema-form-validation';

import FormLabel from './FormLabel';
import FormTooltip from './FormTooltip';
import FormInput from './FormInput';
import FormCodeEditor from './FormCodeEditor';
import FormToggle from './FormToggle';

import FormAsyncInput from './FormAsyncInput';
import FormSelect from './FormSelect';

const FieldHtml = (props) => {
    let {name, data, type, typeClass, options, defaultValue} = props;

    switch(type) {
        default:
        case 'string':
            type = 'text';
            typeClass = 'input';

            if (name === 'game.scenarioId') {
                typeClass = 'asyncScenarioId';
            }
            break;
        case 'integer':
        case 'number':
            type = 'number';
            typeClass = 'input';
            break;
        case 'boolean':
            type = 'checkbox';
            typeClass = 'toggle';
            break;
        case 'array':
            type = 'select';
            typeClass = 'select';

            if (name === 'game.mods[]') {
                typeClass = 'asyncMods';
            } else {
                options = data.items.enum.map(item => {
                    return {
                        label: item,
                        value: item,
                        name: item
                    };
                });
            }
            break;
        case 'object':
            type = 'textarea';
            typeClass = 'editor';
            defaultValue = JSON.stringify(defaultValue);
            break;
    }

    return (
        <>
            {typeClass === 'input' && (
                <Field
                    id={name}
                    type={type}
                    component={FormInput}
                    name={name}
                    value={defaultValue ?? data?.default}
                    
                    minimum={data?.minimum ?? null}
                    maximum={data?.maximum ?? null}
                    minLength={data?.minLength ?? null}
                    maxlength={data?.maxlength ?? null}
                    pattern={data?.pattern ?? null}
                />
            )}

            {typeClass === 'toggle' && (
                <Field
                    id={name}
                    type={type}
                    component={FormToggle}
                    name={name}
                    value={defaultValue ?? data?.default}
                    onChange={(newVal, handleFieldChange) => {
                        handleFieldChange(name, newVal)
                    }}
                />
            )}

            {typeClass === 'select' && (
                <Field
                    id={name}
                    type={type}
                    name={name+'[]'}
                    component={FormSelect}
                    options={options}
                    isClearable
                    isMulti={data?.minItems > 1 || !(data?.maxItems === 1)}
                    defaultValue={defaultValue ?? [data?.default]}
                    onChange={(newVal, handleFieldChange) => {
                        let newName = name.split('[]')[0];
                        if (name !== newName) {
                            newVal = newVal.map((item) => {
                                return item.value;
                            })
                        } else {
                            newVal = newVal?.value ?? defaultValue;
                        }
                        handleFieldChange(newName, newVal)
                    }}
                />
            )}

            {typeClass === 'editor' && (
                <Field
                    id={name}
                    type={type}
                    component={FormCodeEditor}
                    name={name}
                    value={defaultValue ?? data?.default}
                    onChange={(newValue, handleFieldChange) => {
                        let parsed = null;
                        try {
                            parsed = JSON.parse(newValue);
                        } catch {
                            return;
                        }
                        handleFieldChange(name, parsed)
                    }}
                />
            )}
            
            {typeClass === 'asyncMods' && (
                <FormAsyncInput
                    {...props}
                    method="mods"
                />
            )}
            {typeClass === 'asyncScenarioId' && (
                <FormAsyncInput
                    {...props}
                    method="scenarios"
                    mods={props.mods}
                />
            )}
        </>
    );
};

const FormField = (props) => {
    const {name, data, value} = props;
    let label = data.title;

    let type = data?.type ?? '';
    let typeClass = 'input';
    let options = [];
    let defaultValue = value ?? "";

    if (data?.anyOf) {
        type = [];
        for(const [, val] of Object.entries(data.anyOf)) {
            if (type.indexOf(val.type) <= -1) {
                type.push(val.type);
            }
        }
        if (type.length === 1) {
            type = type[0];
        } else {
            typeClass = 'combo';
        }
    }

    return (
        <div>
            <FormLabel
                htmlFor={name}
            >
                {label}

                {(data?.htmlDescription || data?.description) && (
                    <FormTooltip
                        description={data?.htmlDescription ?? data.description}
                    />
                )}
            </FormLabel>

            {/* Hacky way to add boolean + input */}
            {typeClass === 'combo' && type.map((value, key) => {
                let combo_name = name;

                if (value === 'boolean') {
                    combo_name = name + '_toggle';
                    defaultValue = props?.toggle ?? false;
                }

                return (
                    <FieldHtml
                        key={key}
                        {...props}
                        name={combo_name}
                        type={value}
                        typeClass={null}
                        options={options}
                        defaultValue={defaultValue}
                    />
                )
            })}

            {typeClass !== 'combo' && (
                <FieldHtml
                    {...props}
                    type={type}
                    typeClass={typeClass}
                    options={options}
                    defaultValue={defaultValue}
                />
            )}

            <FieldError
                className="text-danger"
                name={name}
            />
        </div>
    );
};

export default FormField;