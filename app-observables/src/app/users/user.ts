// Interface para las coordenadas geográficas
export interface Geo {
    lat: string;
    lng: string;
}

// Interface para la dirección del usuario
export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

// Interface para la información de la empresa
export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

// Interface principal del Usuario
export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}