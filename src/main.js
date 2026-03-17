// Name: Nathan Hoang
// Title: Tsukinokakera
// Time Spent: 13 hours

// Notes:
// For the technical components I used in this project:
// - Cameras: Used for fade in and fade out transitions between scenes and stage changes
// - Text objects: Used for dialogue display, speaker names, and interactive choice buttons
// - Tween manager: Used for smooth transitions such as music fading and UI animations (button hover effects, pulsing text)
// - Timers: Used for typewriter sound effects, blinking animations, and timed transitions
// - Particle system: Used to signify the door opening
// - Sound manager: Used for background music, dialogue text sounds, and sound effects (e.g., door opening)

// It took me a bit of time to figure out what to do for the dialogue
// system, eventually, I settled on just creating a whole seperate thing
// to reference, and make it easier to edit the story on my end.

// This project is a playable postcard because it delivers a personal message through interacting with it,
// allowing my recipient to engage with the theme of self-worth rather than just simply reading it.

let config = {
    type: Phaser.AUTO,
    width: 480,
    height: 480,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    scene: [Title, Play]
}

const game = new Phaser.Game(config)