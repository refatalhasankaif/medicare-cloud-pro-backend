import { Role, UserStatus } from "../../generated/prisma/client"
import { prisma } from "../lib/prisma"
import { cookieUtils } from "../utils/cookie"
import { NextFunction, Request, Response } from "express"
import AppError from "../errorHelpers/AppError"
import status from "http-status"
import { jwtUtils } from "../utils/jwt"
import { envVars } from "../../config/env"

export const checkAuth = (...authRoles: Role[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionToken = cookieUtils.getCookie(req, 'better-auth.session.session_token')
        if (!sessionToken) {
            throw new AppError(status.UNAUTHORIZED, 'Unauthorized: Session token is missing')
        }

        const accessToken = cookieUtils.getCookie(req, 'accessToken')

        const verifiedToken = accessToken ? jwtUtils.verifyToken(accessToken, envVars.ACCESS_TOKEN_SECRET) : null

        if (sessionToken) {
            const sessionExists = await prisma.session.findFirst({
                where: {
                    token: sessionToken,
                    expiresAt: {
                        gt: new Date(),
                    }
                },
                include: {
                    user: true,
                }
            })

            if (sessionExists && sessionExists.user) {
                const user = sessionExists.user
                const now = new Date()
                const expiresAt = new Date(sessionExists.expiresAt)
                const createdAt = new Date(sessionExists.createdAt)

                const sessionDuration = expiresAt.getTime() - createdAt.getTime()
                const timeRemaining = expiresAt.getTime() - now.getTime()

                const percentageRemaining = (timeRemaining / sessionDuration) * 100

                if (percentageRemaining < 20) {
                    res.setHeader('X-Session-Refresh', 'true');
                    res.setHeader('X-Session-Expiration-At', expiresAt.toISOString());
                    res.setHeader('X-time-remaining', timeRemaining.toString());

                    console.log("Session Expiring Soon!!!")
                }

                if (user.status === UserStatus.SUSPENDED || user.status === UserStatus.INACTIVE) {
                    throw new AppError(status.UNAUTHORIZED, 'Unauthorized: User account is not active')
                }

                if (user.isDeleted === true) {
                    throw new AppError(status.UNAUTHORIZED, 'Unauthorized: User account is deleted')
                }

                if (authRoles.length > 0 && !authRoles.includes(verifiedToken?.data!.role as Role)) {
                    throw new AppError(status.FORBIDDEN, 'Forbidden: Insufficient permissions to access this resource')
                }

                req.user = {
                    userId: user.id,
                    role: user.role,
                    email: user.email,
                }
            }
        }

        if (!accessToken) {
            throw new AppError(status.UNAUTHORIZED, 'Unauthorized: Access token is missing')
        }

        if (!verifiedToken || !verifiedToken.success) {
            throw new AppError(status.UNAUTHORIZED, 'Unauthorized: Invalid access token')
        }

        if (authRoles.length > 0 && !authRoles.includes(verifiedToken.data!.role as Role)) {
            throw new AppError(status.FORBIDDEN, 'Forbidden: Insufficient permissions to access this resource')
        }


        next()
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (err: any) {
        next(err)
    }
}