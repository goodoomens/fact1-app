export enum Degradation {
    unknown ='unknown',
    veryLow ='veryLow',
    low = 'low',
    medium = 'medium',
    high = 'high',
    veryHigh = 'veryHigh'
}

export type TrackDetails = {
    length: number
    laps: number
    tireDeg: Degradation
    brakeDeg: Degradation
}
