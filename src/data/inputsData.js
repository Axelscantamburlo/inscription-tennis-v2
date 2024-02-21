export const INPUTS_DATA = [
    {
        id:'email',
        label: 'Email',
        type: 'mail',
        maxLength: 100,
        className: ""
    },
    {
        id:'password',
        label: 'Mot de Passe',
        type: 'password',
        maxLength: 20,
        className: "not"
    },
]

export const NEW_PLAYEUR_INPUTS = [
    {
        id:'name',
        label: 'Nom',
        type: 'text',
        maxLength: 40,
    },
    {
        id:'phone',
        label: 'Numéro de téléphone',
        type: 'text',
        maxLength: 10,
        minLength: 10
    },
    {
        id:'email',
        label: 'Email',
        type: 'mail',
        maxLength: 100,
    },
    {
        id:'birthDay',
        label: 'Date de naissance',
        type: 'date',
        maxLength: 100,
    },

]
