import { useState, useEffect } from "react";
import { Field } from 'react-jsonschema-form-validation';

import FormSelect from "./FormSelect";


const FormAsyncInput = (props) => {
    const {name, data, value, method, mods} = props;

    let type ='select';

    const [jsonData, setJsonData] = useState(null);

    const getJsonData = async () => {

        let data = {};

        const now = new Date();
        const ttl = 4*3600*1000; // 4 hours

        let stored = JSON.parse(localStorage.getItem('reforger-workshop-cache'));

        if (stored === null || now.getTime() > stored.expire) {

            let response = await fetch('https://files.ofpisnotdead.com/reforger-workshop.json');
            data = await response.json();
            
            localStorage.setItem('reforger-workshop-cache', JSON.stringify({
                data: data,
                expire: now.getTime() + ttl
            }));
        } else {
            data = stored.data;
        }

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
        <>
            {method === 'scenarios' && (
                <Field
                    id={name}
                    type={type}
                    name={name}
                    component={FormSelect}
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
                    component={FormSelect}
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
        </>
    );
};

export default FormAsyncInput;