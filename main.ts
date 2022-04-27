
let sonarPin = 0
const buzzerPin = DigitalPin.P8
basic.forever(function () {
    sonarPin = sonar.ping(
        DigitalPin.P2,
        DigitalPin.P3,
        PingUnit.Centimeters
    )
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
    if (sonarPin >= 70) {
        beap(buzzerPin, 1200)
    } else if (sonarPin >= 50) {
        beap(buzzerPin, 1000)
    } else if (sonarPin >= 30) {
        beap(buzzerPin, 700)
    } else if (sonarPin >= 20) {
        beap(buzzerPin, 500)
    } else if (sonarPin >= 15) {
        beap(buzzerPin, 250)
    } else if (sonarPin >= 10) {
        beap(buzzerPin, 125)
    } else if (sonarPin >= 7) {
        beap(buzzerPin, 62)
    } else if (sonarPin >= 4) {
        beap(buzzerPin, 50)
    }
    let p = sonar.ping(DigitalPin.P1, DigitalPin.P2, PingUnit.Inches);
    led.toggle(3, 1)
})

function beap(buzzerPin: any, waittime: number) {
    pins.digitalWritePin(buzzerPin, 1)
    basic.pause(waittime)
    pins.digitalWritePin(buzzerPin, 0)
}