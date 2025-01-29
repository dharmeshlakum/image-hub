import { Request } from "express";

// Interface : Defines Return Type
interface ReturnTypes {
    userAgent: string;
    ipAddress: string;
}

// Function : Get Client Information
const getClientInfoFN = (req: Request): ReturnTypes => {

    const userAgent = req.headers["user-agent"] || "";
    let ipAddress = req.ip || "";

    if (req.headers["x-forwarded-for"]) {
        const forwardedIps = (req.headers["x-forwarded-for"] as string).split(',');
        ipAddress = forwardedIps[0].trim();
    }

    return {
        userAgent,
        ipAddress
    }
}

export { getClientInfoFN }