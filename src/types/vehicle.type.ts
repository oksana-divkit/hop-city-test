export type Vehicle = {
    id: string,
    name: string,
    plate: string,
    position: {
        lat: number,
        lon: number
    },
    battery_status: {
        percentage_level: number,
        estimated_distance: number,
        battery_matched: number,
        time: string
    },
    scooter_version: string,
    modifications: Array<any>,
    group: string,
    _change: string
}
