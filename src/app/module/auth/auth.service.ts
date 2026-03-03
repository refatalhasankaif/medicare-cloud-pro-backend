import { UserStatus } from "../../../generated/prisma/enums";
import { auth } from "../../lib/auth";


interface IRegisterPatientPayload {
    name: string;
    email: string;
    password: string;
}
const registerPatient = async (payload: IRegisterPatientPayload) => {
    const { name, email, password } = payload;

    const data = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
        }
    })

    if (!data.user) {
        throw new Error("Failed to register patient")
    }

    // const patient = await prisma.$transaction(async (tx) => {

    //     // await tx.
    // })

    return data
}

const loginUser = async (payload: IRegisterPatientPayload) => {
    const {email, password} = payload

    const data = await auth.api.signInEmail({
        body: {
            email,
            password
        }
    })

    if(data.user.status === UserStatus.SUSPENDED){
        throw new Error("User is suspended")
    }

    if(data.user.isDeleted){
        throw new Error("User is deleted")
    }

    return data
}

export const authService = {
    registerPatient,
    loginUser

}