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
    demandCode : string,
    code : string,
   // code : string,
    name : string,
    minorHeadId:number,
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

export interface MasterDetailHead{
    id : number,
    code : string,
    name : string,
}

export interface MasterSubDetailHead{
    id: number,
    code: string,
    name: string,
    DetailHeadId: number
}


export interface Code {
    name: string,
    code: string
}
export interface minorHead{
    id : number,
    code : string,
    name : string,
    sub_major_id : number,
}
export interface minorheadid {
    id : number,
    name: string
    code: string
}