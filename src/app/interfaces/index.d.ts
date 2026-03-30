import { IRequestUser } from "./requestUserInterface";

declare global {
    namespace Express {
        interface Request {
            user: IRequestUser
        }
    }
}