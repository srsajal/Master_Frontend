export interface Master{
    id : number,
    treasuryCode : string,
    treasuryMstld : number,
    code : string,
    designation : string,
    designationMstld : number,
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