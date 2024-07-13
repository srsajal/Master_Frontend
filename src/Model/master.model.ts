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
    demandcode : string,
    address : string,
    pincode : number,
    phoneno : string,
    mobileno : string,
    email : string,
}



export interface Code {
    code: string
}