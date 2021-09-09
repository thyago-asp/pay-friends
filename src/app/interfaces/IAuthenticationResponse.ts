import { IClient } from './IClient';
export interface IAuthenticationResponse {
    accessToken: string;
    user: IClient;
}

