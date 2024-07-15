export interface MasterDdo{
    id : number,
    treasuryCode : string,
    code : string,
    designation : string,
    address : string,
    phone : string
}

export interface MasterTreasury{
    id : number,
    districtName : string,
    districtCode : string,
    code : string,
    name : string
}

export interface masterSchemeHead{
    demandcode : number,
    code : number,
   // code : string,
    name : string,
    minorheadid:number,
}

export interface Masterdept{
    id : number,
    code : string,
    name : string,
    demandCode : string,
    address : string,
    pinCode : number,
    phoneNumber : string,
    mobileNumber : string,
    email : string,
}



export interface Code {
    code: string
}