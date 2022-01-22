const URL = {
    CREATE_VEHICLE: '/vehicles',
    REPAIRS_LIST: '/vehicles/~stockNumber~/repairs',
    CREATE_REPAIRS: '/vehicles/~stockNumber~/repairs',
    UPDATE_REPAIRS: '/vehicles/~stockNumber~/repairs/~repairId~',
    DELETE_REPAIRS: '/vehicles/~stockNumber~/repairs/~repairId~',
};

export default class HttpClient {
    static getURLCreateVehicle() {
        return URL.CREATE_VEHICLE;
    }

    static getURLRepairList(stockNumber) {
        return URL.REPAIRS_LIST.replace('~stockNumber~', stockNumber);
    }

    static getURLRepairCreate(stockNumber) {
        return URL.CREATE_REPAIRS.replace('~stockNumber~', stockNumber);
    }

    static getURLRepairUpdate(stockNumber, repairId) {
        return URL.UPDATE_REPAIRS.replace(
            '~stockNumber~',
            stockNumber,
        ).replace('~repairId~', repairId);
    }

    static getURLRepairDelete(stockNumber, repairId) {
        return URL.DELETE_REPAIRS.replace(
            '~stockNumber~',
            stockNumber,
        ).replace('~repairId~', repairId);
    }
}
