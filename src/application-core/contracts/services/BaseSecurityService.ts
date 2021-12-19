export abstract class BaseSecurityService {

    public abstract hashPasswordAsync(password: string): Promise<string>;

    public abstract validatePasswordAsync(clearPassword: string, hashedPassword: string): Promise<boolean>;
}
