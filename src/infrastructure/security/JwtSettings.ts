import {Algorithm} from "jsonwebtoken";

export class JwtSettings {
    readonly key: string = process.env.JWT_SETTINGS_KEY
    readonly issuer: string = process.env.JWT_SETTINGS_ISSUER
    readonly audience: string = process.env.JWT_SETTINGS_AUDIENCE
    readonly minutesDuration: number = process.env.JWT_SETTINGS_MINUTES_DURATION as unknown as number
    readonly algorithm: Algorithm = process.env.JWT_SETTINGS_ALGORITHM as unknown as Algorithm
}
