import {Aggregate} from "../Aggregate";
import {Guid} from "guid-typescript";

export class UserId {
    private readonly _value: Guid;
    public get value(): Guid {
        return this._value
    }

    public constructor(value: Guid) {
        this._value = value;
    }

    public toString = () => this._value.toString();
}

export class UserAggregate extends Aggregate<UserId> {
    private _password: string;
    private _email: string;
    private _username: string;

    public get password(): string {
        return this._password;
    }

    public get email(): string {
        return this._email;
    }

    public get username(): string {
        return this._username;
    }

    constructor(id: UserId, password: string, email: string, username: string) {
        super(id);
        this._password = password;
        this._email = email;
        this._username = username;
    }

    public updateUser(email?: string, username?: string, password?: string): void {
        if (!!email)
            this._email = email;
        if (!!username)
            this._username = username;
        if (!!password)
            this._password = password;
    }
}
