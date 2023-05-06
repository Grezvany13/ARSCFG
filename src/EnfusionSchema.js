const EnfusionSchema = {
	type: 'object',
    additionalProperties: false,
	properties: {
        dedicatedServerId: {
            type: 'string',
            description: 'Used by the Favourite system. If not provided, the backend will provide a new ID and save it to the config file.  It is recommended to server administrators to store this ID safe to ensure to keep their playerbase in case of a server migration or a config accident.'
        },
        region: {
            type: "string",
            description: "ISO 3166-1 alpha-2 Country\\Region Code",
            pattern: "^([A-Z]{2})$|^([A-Z]{2})-([A-Z0-9]{2,3})$",
            minLength: 2,
            maxLength: 6
        },
        gameHostBindAddress: {
            description: "IP address which server socket will be bound to. In most cases, this should be left empty. It can be used to restrict connections to particular network interface. When left out or empty, 0.0.0.0 is used, which allows connections through any IP address.",
            anyOf: [
                {
                    type: "string",
                    format: "ipv4",
                    pattern: "\\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\\b"
                },
                {
                    type: "string",
                    pattern: "^$|^(localhost)$",
                    maxLength: 9
                }
            ]
        },
        gameHostBindPort: {
            description: "UDP port to which the server socket will be bound.",
            type: "integer",
            minimum: 1,
            maximum: 65535,
            default: 2001
        },
        gameHostRegisterBindAddress: {
            description: "IP address registered in backend. This should be set to the public IP address to which clients can connect in order to reach the server (either IP of the server itself or IP of the machine that will forward data to the server). When left out or empty, an attempt is made to automatically determine the IP address, but this will often fail and should not be relied upon as the server might not be reachable from public networks.",
            anyOf: [
                {
                    type: "string",
                    format: "ipv4",
                    pattern: "\\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\\b"
                },
                {
                    type: "string",
                    pattern: "^$|^(localhost)$",
                    maxLength: 9
                }
            ]
        },
        gameHostRegisterPort: {
            description: "UDP port registered in backend. If the server itself has a public IP address, this should be the same value as in gameHostBindPort. Otherwise, this is the UDP port that is forwarded to the server.",
            type: "integer",
            minimum: 1,
            maximum: 65535,
            default: 2001
        },
        a2sQueryEnabled: {
            description: "Steam Query protocol: Enable = true, Disable = false.",
            type: "boolean"
        },
        steamQueryPort: {
            description: "Steam Query UDP port on which game listens to A2S requests.",
            type: "integer",
            minimum: 1,
            maximum: 65535,
            default: 17777
        },
        adminPassword: {
            description: "Defines the server's admin password, allows a server administrator to login and control the server, to access this either open the chat input box by pressing C in the lobby or Enter in-game followed by: #login [the admin password]",
            type: "string",
            pattern: "^[a-zA-Z0-9_-]+$"
        },
        game: {
            type: "object",
            additionalProperties: false,
            properties: {
                name: {
                    description: "The servers name in the server browser.",
                    type: "string",
                    minLength: 0,
                    maxLength: 100
                },
                password: {
                    description: "The alpha-numeric password required to join the server (no spaces), leave empty for none",
                    type: "string",
                    pattern: "^[a-zA-Z0-9_-]*$",
                    minLength: 0
                },
                scenarioId: {
                    description: "The scenario's .conf file path is defined here. See the listScenarios startup parameter to list available scenarios and obtain their .conf file path.",
                    type: "string",
                    //pattern: "^(\\{([A-Z0-9]{16})\\}([a-zA-Z0-9_-]+)\\/([a-zA-Z0-9_-]+)\\.conf)$|^(\\{([A-Z0-9]{16})\\}([a-zA-Z0-9_-]+).conf)$|^(\\{([A-Z0-9]{16})\\})$",
                    pattern: "^({([A-Z0-9]{16})}([a-zA-Z0-9_-]+)/([a-zA-Z0-9_-]+).conf)$|^({([A-Z0-9]{16})}([a-zA-Z0-9_-]+).conf)$|^({([A-Z0-9]{16})})$",
                    minLength: 0
                },
                scenarioName: {
                    description: "Name of the mission, not required but useful for server amins to keep track of which mission is running",
                    type: "string"
                },
                playerCountLimit: {
                    description: "Sets the maximum amount of players on the server. (Currently capped by engine at 64 on PC)",
                    type: "integer",
                    minimum: 1,
                    maximum: 256
                },
                autoJoinable: {
                    description: "Set if the session can be selected through the auto join feature.",
                    type: "boolean",
                    default: false
                },
                visible: {
                    description: "Set the visibility of the server in the Server Browser.",
                    type: "boolean"
                },
                gameMode: {
                    description: "Game mode of the mission. Not required",
                    type: "string",
                    minLength: 0
                },
                supportedGameClientTypes: {
                    description: "Supported Platform Type (PC is set default, PC is required)",
                    type: "array",
                    minItems: 1,
                    default: "PLATFORM_PC",
                    items: {
                        type: "string",
                        enum: [
                            "PLATFORM_PC",
                            "PLATFORM_XBL"
                        ]
                    }
                },
                gameProperties: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                        serverMaxViewDistance: {
                            description: "The maximum client view-distance in meters enforced by the server",
                            type: "integer",
                            minimum: 500,
                            maximum: 10000,
                            default: 1600
                        },
                        serverMinGrassDistance: {
                            description: "The minimum client grass render distance in meters enforced by the server",
                            type: "integer",
                            minimum: 0,
                            maximum: 150,
                            default: 50
                        },
                        networkViewDistance: {
                            description: "The maxmimum network streaming range of replicated entitites between connected clients",
                            type: "integer",
                            minimum: 500,
                            maximum: 5000,
                            default: 500
                        },
                        disableThirdPerson: {
                            description: "Force clients to use the first-person view. True = 3DP Disabled, False = 3DP Enabled",
                            type: "boolean",
                            default: false
                        },
                        fastValidation: {
                            description: "Validation of map entities and components loaded on client when it joins, ensuring things match with initial server state. True = minimum information required to make sure data matches is exchanged between client.  False = extra data for every replicated entity and component in the map will be transferred when new client connects to the server.",
                            type: "boolean",
                            default: true
                        },
                        battlEye: {
                            description: "Enable Battleye",
                            type: "boolean",
                            default: true
                        },
                        VONDisableUI: {
                            description: "Force clients to not have VON (Voice Over Network) UI",
                            type: "boolean",
                            default: false
                        },
                        VONDisableDirectSpeechUI: {
                            description: "Force clients to not have VON (Voice Over Network) Direct Speech UI",
                            type: "boolean",
                            default: false
                        },
                        missionHeader: {
                            description: "These properties override the scenario's SCR_MissionHeaderCampaign settings",
                            type: "object",
                            patternProperties: {
                                "^[a-zA-Z0-9]+$": {
                                    type: [
                                        "string",
                                        "number",
                                        "integer",
                                        "boolean"
                                    ]
                                }
                            },
                        }
                    },
                    required: [
                        "battlEye",
                        "disableThirdPerson",
                        "fastValidation",
                        "networkViewDistance",
                        "serverMaxViewDistance",
                        "serverMinGrassDistance"
                    ],
                },
                mods: {
                    type: "array",
                    minItems: 0,
                    items: {
                        description: "The list of mods required by the server and clients, they will automatically be downloaded and activated on server start and client join.",
                        type: "object",
                        additionalProperties: false,
                        properties: {
                            modId: {
                                description: "GUID of the mod. It can be obtained from ServerData.json inside mod directories",
                                type: "string",
                                pattern: "^([A-Z0-9]{16})$"
                            },
                            name: {
                                description: "This parameter doesn't do anything and is only used as sort of comment, with human readable name of the mod, can be used to keep track of modId to mods name",
                                type: "string",
                                default: ""
                            },
                            version: {
                                description: "The version mod parameter is optional. If it missing, the latest mod version will always be used.",
                                type: "string",
                                default: ""
                            }
                        },
                        required: [
                            "modId"
                        ],
                    }
                }
            },
            required: [
                "autoJoinable",
                "gameProperties",
                "name",
                //"password",
                "playerCountLimit",
                "scenarioId",
                "visible"
            ],
        },
        operating: {
            description: "Operating parameters",
            type: "object",
            additionalProperties: false,
            properties: {
                lobbyPlayerSynchronise: {
                    description: "If enabled, the list of player identities present on server are sent to the GameAPI with heartbeat (advanced synchronisation).  Strongly recommended by developers to set this true as this setting solves the \"ghost players\" that are preventing players to connect to a non-full server.",
                    type: "boolean",
                    default: false
                }
            },
            required: [],
        }
    },
    required: [
        "adminPassword",
        "dedicatedServerId",
        "game",
        "gameHostBindAddress",
        "gameHostBindPort",
        "gameHostRegisterBindAddress",
        "gameHostRegisterPort",
        "region"
    ],
};

export default EnfusionSchema;