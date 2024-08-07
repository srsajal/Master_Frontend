export interface MasterDdo {
    id: number,
    treasuryCode: string,
    code: string,
    designation: string,
    address: string,
    phone: string
}

export interface MasterTreasury {
    id: number,
    districtName: string,
    districtCode: number,
    code: string,
    name: string
}

export interface masterSchemeHead {
    demandCode: string,
    code: string,
    // code : string,
    name: string,
    minorHeadId: number,
}

export interface Masterdept {
    id: number,
    code: string,
    name: string,
    demandCode: string,
    address: string,
    pinCode: number,
    phoneNumber: string,
    mobileNumber: string,
    email: string,
}

export interface MasterDetailHead {
    id: number,
    code: string,
    name: string,
}

export interface MasterSubDetailHead {
    id: number,
    code: string,
    name: string,
    detailHeadId: number
}


export interface Code {
    name: string,
    code: string
}
export interface minorHead{
    subMajorId : number,
    id : number,
    code : string,
    name : string,
   // sub_major_id : number,
}
export interface minorheadid {
    id: number,
    name: string
    code: string
}
export interface majorHead {

    code: string,
    name: string,
}
export interface submajorhead {
    id: number,
    code: string,
    name: string,
    majorHeadId:number,
}

export interface AllMasterCount {
    totalActiveDdo: number;
    totalInactiveDdo: number;

    totalActiveDetailHead: number;
    totalInactiveDetailHead: number;

    totalActiveSubDetailHead: number;
    totalInactiveSubDetailHead: number;

    totalActiveDepartment: number;
    totalInactiveDepartment: number;

    totalActiveMajorHead: number;
    totalInactiveMajorHead: number;

    totalActiveSchemeHead: number;
    totalInactiveSchemeHead: number;

    totalActiveMinorHead: number;
    totalInactiveMinorHead: number;

    totalActiveSubMajorHead: number;
    totalInactiveSubMajorHead: number;

    totalActiveTreasury: number;
    totalInactiveTreasury: number;
}