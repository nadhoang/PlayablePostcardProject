class Title extends Phaser.Scene {
    constructor() {
        super('titleScene')
    }

    preload() {
        this.load.image('room', './assets/img/room.png')
        this.load.image('room1', './assets/img/room1.png')
        this.load.image('title1', './assets/img/titletxt1.png')
        this.load.image('title2', './assets/img/titletxt2.png')
        this.load.image('btn', './assets/img/btn.png')

        this.load.audio('liebe', './assets/sounds/lovedream.mp3')
    }

    create() {
        this.isStartingGame = false

        // fade in
        this.cameras.main.fadeIn(400)

        // bg image + anim
        this.bg = this.add.image(0, 0, 'room').setOrigin(0, 0)
        this.bg.displayWidth = this.scale.width
        this.bg.displayHeight = this.scale.height

        this.title = this.add.image(
            this.scale.width / 2,
            (this.scale.height / 3) - 20,
            'title1'
        ).setOrigin(0.5)

        this.time.addEvent({
            delay: 500,
            loop: true,
            callback: () => {
                this.title.setTexture(
                    this.title.texture.key === 'title1' ? 'title2' : 'title1'
                )
            }
        })

        // liebe blink
        const doBlink = () => {
            this.bg.setTexture('room1')

            this.time.delayedCall(180, () => {
                this.bg.setTexture('room')
                this.time.delayedCall(Phaser.Math.Between(2000, 5000), doBlink)
            })
        }

        this.time.delayedCall(Phaser.Math.Between(2000, 5000), doBlink)

        // bg music
        this.sound.stopByKey('music2')

        if (!this.titleMusic || !this.titleMusic.isPlaying) {
            this.titleMusic = this.sound.add('liebe', {
                loop: true,
                volume: 0.8
            })
            this.titleMusic.play()
        }

        // create start btn
        this.startX = this.scale.width / 2
        this.startY = (this.scale.height * 0.65) + 40

        // create credit btn
        this.creditsX = this.scale.width / 2
        this.creditsY = (this.scale.height * 0.78) + 50

        this.startBtn = this.add.image(this.startX, this.startY, 'btn')
            .setOrigin(0.5)
            .setScale(0.6)
            .setInteractive()

        this.creditsBtn = this.add.image(this.creditsX, this.creditsY, 'btn')
            .setOrigin(0.5)
            .setScale(0.35)
            .setInteractive()

        document.fonts.load('36px "BabyDoll"').then(() => {
            this.startText = this.add.text(this.startX, this.startY, 'Start', {
                fontFamily: '"BabyDoll"',
                fontSize: '36px',
                color: '#000000'
            })
            .setOrigin(0.5)
            .setDepth(10)

            this.creditsText = this.add.text(this.creditsX, this.creditsY, 'Credits', {
                fontFamily: '"BabyDoll"',
                fontSize: '18px',
                color: '#000000'
            })
            .setOrigin(0.5)
            .setDepth(10)

            this.creditsDarken = this.add.rectangle(
                this.scale.width / 2,
                this.scale.height / 2,
                this.scale.width,
                this.scale.height,
                0x000000,
                0.65
            )
            .setDepth(50)
            .setVisible(false)
            .setInteractive()

            this.creditsPanel = this.add.rectangle(
                this.scale.width / 2,
                this.scale.height / 2,
                520,
                300,
                0xffffff,
                0.95
            )
            .setStrokeStyle(4, 0x000000)
            .setDepth(51)
            .setVisible(false)
            this.creditsPanel.setInteractive()

            this.creditsTitle = this.add.text(
                this.scale.width / 2,
                this.scale.height / 2 - 125,
                'Credits',
                {
                    fontFamily: '"BabyDoll"',
                    fontSize: '34px',
                    color: '#000000',
                    align: 'center'
                }
            )
            .setOrigin(0.5)
            .setDepth(52)
            .setVisible(false)

            this.creditsBody = this.add.text(
                this.scale.width / 2,
                this.scale.height / 2 - 10,
                'Game by Zerakim\n\nArt, Writing, SFX,\nand Programming by Zerakim\n\nMusic: Liszt - Liebestraum No. 3\nhttps://pocket-se.info/archives/2258/\nhttps://pocket-se.info/archives/2198/\nhttps://pocket-se.info/archives/2140/',
                {
                    fontFamily: '"BabyDoll"',
                    fontSize: '20px',
                    color: '#000000',
                    align: 'center'
                }
            )
            .setOrigin(0.5)
            .setDepth(52)
            .setVisible(false)

            this.closeCreditsText = this.add.text(
                this.scale.width / 2,
                this.scale.height / 2 + 105,
                'Click outside to close',
                {
                    fontFamily: '"BabyDoll"',
                    fontSize: '18px',
                    color: '#000000',
                    align: 'center'
                }
            )
            .setOrigin(0.5)
            .setDepth(52)
            .setVisible(false)

            this.creditsDarken.on('pointerdown', () => {
                if (this.creditsOpen) {
                    this.hideCredits()
                }
            })
        })

        // start btn hover pulse
        this.startBtn.on('pointerover', () => {
            if (!this.startText || this.creditsOpen) return

            if (this.startTween) {
                this.startTween.stop()
            }

            this.startTween = this.tweens.add({
                targets: [this.startBtn, this.startText],
                scale: 0.7,
                duration: 400,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut'
            })
        })

        this.startBtn.on('pointerout', () => {
            if (this.startTween) {
                this.startTween.stop()
            }
            this.startBtn.setScale(0.6)
            if (this.startText) this.startText.setScale(1)
        })

        // credits button hover pulse
        this.creditsBtn.on('pointerover', () => {
            if (!this.creditsText || this.creditsOpen) return

            if (this.creditsTween) {
                this.creditsTween.stop()
            }

            this.creditsTween = this.tweens.add({
                targets: [this.creditsBtn, this.creditsText],
                scale: 0.42,
                duration: 400,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut'
            })
        })

        this.creditsBtn.on('pointerout', () => {
            if (this.creditsTween) {
                this.creditsTween.stop()
            }
            this.creditsBtn.setScale(0.35)
            if (this.creditsText) this.creditsText.setScale(1)
        })

        // start btn click
        this.startBtn.on('pointerdown', () => {
            if (this.creditsOpen) return
            this.startGameTransition()
        })

        // credits btn click
        this.creditsBtn.on('pointerdown', () => {
            if (this.creditsOpen) return
            this.showCredits()
        })

        this.creditsOpen = false
    }

    startGameTransition() {
        if (this.isStartingGame) return
        this.isStartingGame = true

        // disable buttons so player can't click again
        this.startBtn.disableInteractive()
        this.creditsBtn.disableInteractive()

        // stop hover tweens and reset scales
        if (this.startTween) {
            this.startTween.stop()
        }
        if (this.creditsTween) {
            this.creditsTween.stop()
        }

        this.startBtn.setScale(0.6)
        this.creditsBtn.setScale(0.35)

        if (this.startText) this.startText.setScale(1)
        if (this.creditsText) this.creditsText.setScale(1)

        // fade out music
        if (this.titleMusic && this.titleMusic.isPlaying) {
            this.tweens.add({
                targets: this.titleMusic,
                volume: 0,
                duration: 1200,
                ease: 'Linear'
            })
        }

        // fade out screen
        this.cameras.main.fadeOut(1200, 0, 0, 0)

        // when fade finishes, stop music and switch scenes
        this.cameras.main.once('camerafadeoutcomplete', () => {
            if (this.titleMusic && this.titleMusic.isPlaying) {
                this.titleMusic.stop()
            }

            this.scene.start('playScene')
        })
    }

    showCredits() {
        if (!this.creditsPanel) return

        this.creditsOpen = true

        // disable main buttons while credits are open
        this.startBtn.disableInteractive()
        this.creditsBtn.disableInteractive()

        // stop hover tweens and reset scales
        if (this.startTween) {
            this.startTween.stop()
        }
        if (this.creditsTween) {
            this.creditsTween.stop()
        }

        this.startBtn.setScale(0.6)
        this.creditsBtn.setScale(0.35)
        if (this.startText) this.startText.setScale(1)
        if (this.creditsText) this.creditsText.setScale(1)

        this.creditsDarken.setVisible(true)
        this.creditsPanel.setVisible(true)
        this.creditsTitle.setVisible(true)
        this.creditsBody.setVisible(true)
        this.closeCreditsText.setVisible(true)

        // make sure dark background catches clicks
        this.creditsDarken.setInteractive()
    }

    hideCredits() {
        if (!this.creditsPanel) return

        this.creditsOpen = false

        this.creditsDarken.setVisible(false)
        this.creditsPanel.setVisible(false)
        this.creditsTitle.setVisible(false)
        this.creditsBody.setVisible(false)
        this.closeCreditsText.setVisible(false)

        // re-enable main buttons after credits close
        this.startBtn.setInteractive()
        this.creditsBtn.setInteractive()
    }
}