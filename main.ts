//                  Varable Declarations
const config: [string] = [//-|
    "30,-1",              // |
    "20,500",             // |
    "15,250",             // |}The configuration for distance in an array
    "10,125",             // |
    "7,60",               // |
    "3,30"                //-|
]
let sonarPin = 0          //Distance from device to microbit
let event = false         //A varable to run code when true
const buzzerPin = DigitalPin.P0// Define the buzzerPin
//------------------------------------------------------------

//  Start Up screen
basic.showLeds(`
    # # # # #
    # . . . #
    # . # . #
    # . . . #
    # # # # #
`)
//  ----------------

//         Functions
function checkForsSig(res:boolean){//|- A function that will check for dtstance and beap
    if (sonarPin == 0) {           //|--if sonar pin is too close or undetetected ⬇⬇⬇
        basic.showLeds(`           
        . # # . .
        . . . # .
        . . # . .
        . . . . .
        . . # . .
        `)                          //|--Display "?"                              <<<
        return
    }
    basic.clearScreen()             //|--Clear Screen
    config.forEach((key) => {       //|- Loop Through the array "config"
        const data = key.split(",") //|-- Split each of the value and split it 
                                    //    in the place that has ",". Then, set data to the
                                    //    varable "data"
        const dist = parseInt(data[0])//|--Set varable "dist" to the first value of "data"
        const wait = parseInt(data[1])//|--Set varable "wait" to the second value of "data"
        if (sonarPin >= dist) {     //|---if the sonar pin distance is more or equel to varable "dist"
            if (!res) {             //|---If varable "res" (in arguments from function) is true                  //|---- Fill the Leds 
                if (wait == -1) return;//|---- if varable "wait" is -1 (Max distance) then return
                beap(buzzerPin, wait)//|----Run functionn "beap" with arguments of buzzerPin 
                                     //     and waiting time
            }else{                   //---Else
                event = true         //----Set varable event to true
            }
            return                   //---return
        }
    })

    led.plot(2, 2)
}

function beap(buzzerPin: any, waittime: number) {//|- A function that will beap
   pins.digitalWritePin(buzzerPin, 1)            //|-- Turn on the buzzer
    for (let i = 0; i <= waittime; i++) {        //|-- Loop Through the the code "waittime" times
        basic.pause(1)                           //|-- Wait 1ms
        checkForsSig(true)                       //|-- Run check for signal function
        if (event){                              //|--- If event is true
            event = false                        //|---- Set event to false
            pins.digitalWritePin(buzzerPin, 0)   //|---- Turn off the buzzer
            return                               //|----return
        }
    }
}
//----------------------------------------------------------------------------------------------------

basic.forever(function () {// Run forever
                           // ⬇Set sonar pin varabele to distance⬇
    sonarPin = sonar.ping(DigitalPin.P2,DigitalPin.P11,  PingUnit.Centimeters)
    checkForsSig(false)    // Run check for signal function
})