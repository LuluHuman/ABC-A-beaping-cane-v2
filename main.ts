//Varables
const config: [string] = [
    "70,30000",
    "50,1000",
    "30,700",
    "20,500",
    "15,250",
    "10,125",
    "7,60",
    "3,30"
]
let sonarPin = 0
let event = false
const buzzerPin = DigitalPin.P0

//functions
function checkForsSig(res:boolean){
    if (sonarPin == 0) {
        basic.showLeds(`
        . . # . .
        . . # . .
        . . # . .
        . . . . .
        . . # . .
        `)
        return
    }
    config.forEach((key) => {
        const data = key.split(",")

        const dist = parseInt(data[0])
        const wait = parseInt(data[1])
        if (sonarPin >= dist) {
            if (!res) {
                beap(buzzerPin, wait)
            }else{
                event = true
            }
            return 
        }
    })
    led.toggle(3,1)
}

function beap(buzzerPin: any, waittime: number) {
    pins.digitalWritePin(buzzerPin, 1)
    for (let i = 0; i <= waittime; i++) {
        basic.pause(1)
        checkForsSig(true)
        if (event){
            event = false
            pins.digitalWritePin(buzzerPin, 0)
            return
        }
    }
}

//
basic.forever(function () {
    sonarPin = sonar.ping(DigitalPin.P2, DigitalPin.P3, PingUnit.Centimeters)
    checkForsSig(false)
})