const config: [string] = [
    "70,1200",
    "50,1000",
    "30,700",
    "20,500",
    "15,250",
    "10,125",
    "7,62",
    "4,50"
]
let sonarPin = sonar.ping(
    DigitalPin.P2,
    DigitalPin.P3,
    PingUnit.Centimeters
)
const buzzerPin = DigitalPin.P8
basic.forever(function () {
    if (sonarPin == 0) {
        basic.showLeds(`
        . . # . .
        . . # . .
        . . # . .
        . . . . .
        . . # . .
        `)
        basic.pause(200)
        basic.showLeds(`
        # # . # #
        # # . # #
        # # . # #
        # # # # #
        # # . # #
        `)
        return
    }
    config.forEach((key) => {
        const data = key.split(",")
        
        const dist = parseInt(data[0])
        const wait = parseInt(data[1])
        if (sonarPin >= dist) {
            beap(buzzerPin, wait)
            return
        }
    })
    led.toggle(3, 1)
})

function beap(buzzerPin: any, waittime: number) {
    pins.digitalWritePin(buzzerPin, 1)
    basic.pause(waittime)
    pins.digitalWritePin(buzzerPin, 0)
}