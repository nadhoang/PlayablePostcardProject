class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    preload() {
        this.load.image('room', './assets/img/room.png')
        this.load.image('room1', './assets/img/room1.png')
        this.load.image('sroom', './assets/img/sroom.png')
        this.load.image('sroom1', './assets/img/sroom1.png')
        this.load.image('particle', './assets/img/particle1.png')

        // sound
        this.load.audio('textBlip', './assets/sounds/textblip.mp3')
        this.load.audio('doorOpen', './assets/sounds/dooropensfx.mp3')
        this.load.audio('music1', './assets/sounds/room.mp3')
        this.load.audio('music2', './assets/sounds/shepast.mp3')
    }

    create() {
        // dialogue flags
        this.flags = {
            knowsName: false
        }

        // hidden stat
        this.selfLove = 50

        // track one-time node sounds
        this.playedNodeSounds = {}

        // dialogue state
        this.currentNodeId = DIALOGUE_STORY.start
        this.isTyping = false
        this.fullText = ''
        this.typingEvent = null
        this.choiceButtons = []
        this.choiceTexts = []
        this.pendingChoices = null
        this.inIntroCutscene = true

        // text sound
        this.textSound = this.sound.add('textBlip', { volume: 0.3 })

        // fade in
        this.cameras.main.fadeIn(400)

        this.currentBgOpen = 'room'
        this.currentBgClosed = 'room1'

        // start black intro cutscene first
        this.startIntroCutscene()
    }

    startIntroCutscene() {
        this.introMusic = this.sound.add('music1', {
            loop: true,
            volume: 0
        })

        this.introMusic.play()

        // fade IN music1
        this.tweens.add({
            targets: this.introMusic,
            volume: 0.6,
            duration: 1000
        })

        this.introLines = [
            "There was once a girl who watched the sky.",
            "She lived somewhere far away… somewhere pale and distant.",
            "A place that borrowed its light instead of making its own.",

            "Every day, she would look toward something brighter.",
            "Something warm.",
            "Something she could never quite touch.",

            "She loved it, in the way you love something you were never meant to reach.",
            "Not loudly, not desperately… just quietly, and for a very long time.",

            "Sometimes, she wondered what it would feel like to stand in that light.",
            "To be seen fully, instead of in reflection.",

            "But distance has a way of becoming permanent.",
            "And some things remain beautiful only because they are far away.",

            "...",

            "Still, she kept watching.",
            "As if that alone was enough.",

            "...",

            "And somewhere, without quite realizing it…",
            "she began to wish for something to look back at her.",

            "...",

            "Someone is waiting for you."
        ]

        this.introIndex = 0

        this.introBg = this.add.rectangle(
            this.scale.width / 2,
            this.scale.height / 2,
            this.scale.width,
            this.scale.height,
            0x000000,
            1
        ).setDepth(200)

        this.introText = this.add.text(
            this.scale.width / 2,
            this.scale.height / 2,
            '',
            {
                fontFamily: '"BabyDoll"',
                fontSize: '30px',
                color: '#ffffff',
                align: 'center',
                wordWrap: { width: this.scale.width - 120 }
            }
        )
        .setOrigin(0.5)
        .setDepth(201)

        this.introContinueText = this.add.text(
            this.scale.width - 40,
            this.scale.height - 30,
            'Click to continue',
            {
                fontFamily: '"BabyDoll"',
                fontSize: '18px',
                color: '#ffffff'
            }
        )
        .setOrigin(1, 1)
        .setDepth(201)
        .setVisible(false)

        this.tweens.add({
            targets: this.introContinueText,
            alpha: 0.35,
            duration: 500,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut'
        })

        this.typeIntroText(this.introLines[this.introIndex])

        this.input.on('pointerdown', this.handleIntroClick, this)
    }

    endIntroCutscene() {
        // prepare music2 (start silent)
        this.roomMusic = this.sound.add('music2', {
            loop: true,
            volume: 0
        })

        this.time.delayedCall(400, () => {
            this.roomMusic.play()

            this.tweens.add({
                targets: this.roomMusic,
                volume: 0.6,
                duration: 1200
            })
        })

        // FADE OUT intro music
        if (this.introMusic && this.introMusic.isPlaying) {
            this.tweens.add({
                targets: this.introMusic,
                volume: 0,
                duration: 1200,
                ease: 'Linear',
                onComplete: () => {
                    this.introMusic.stop()
                }
            })
        }

        // FADE IN room music
        this.tweens.add({
            targets: this.roomMusic,
            volume: 0.6,
            duration: 1200,
            ease: 'Linear'
        })

        // visual fade
        this.cameras.main.fadeOut(600, 0, 0, 0)

        this.time.delayedCall(650, () => {
            this.introBg.destroy()
            this.introText.destroy()
            this.introContinueText.destroy()

            this.startRoomScene()

            this.cameras.main.fadeIn(600, 0, 0, 0)
        })
    }

    handleIntroClick(pointer, currentlyOver) {
        if (!this.inIntroCutscene) return

        // if still typing, finish instantly
        if (this.isTyping) {
            this.finishIntroTyping()
            return
        }

        // go to next line
        this.introIndex++

        if (this.introIndex < this.introLines.length) {
            this.typeIntroText(this.introLines[this.introIndex])
        } else {
            this.input.off('pointerdown', this.handleIntroClick, this)
            this.endIntroCutscene()
        }
    }

    typeIntroText(text) {
        if (this.typingEvent) {
            this.typingEvent.remove()
            this.typingEvent = null
        }

        this.introText.setText('')
        this.introContinueText.setVisible(false)
        this.fullText = text
        this.isTyping = true

        let i = 0

        this.typingEvent = this.time.addEvent({
            delay: 30,
            repeat: text.length - 1,
            callback: () => {
                this.introText.text += text[i]
                i++

                if (i % 2 === 0 && text[i - 1] !== ' ') {
                    this.textSound.play({
                        rate: Phaser.Math.FloatBetween(0.9, 1.1),
                        volume: Phaser.Math.FloatBetween(0.25, 0.35)
                    })
                }

                if (i === text.length) {
                    this.isTyping = false
                    this.typingEvent = null
                    this.introContinueText.setVisible(true)
                }
            }
        })
    }

    finishIntroTyping() {
        if (this.typingEvent) {
            this.typingEvent.remove()
            this.typingEvent = null
        }

        this.introText.setText(this.fullText)
        this.isTyping = false
        this.introContinueText.setVisible(true)
    }

    startRoomScene() {
        this.inIntroCutscene = false

        // bg image + anim
        this.bg = this.add.image(0, 0, this.currentBgOpen).setOrigin(0, 0)
        this.bg.displayWidth = this.scale.width
        this.bg.displayHeight = this.scale.height

        // liebe blink
        const doBlink = () => {
            this.bg.setTexture(this.currentBgClosed)

            this.time.delayedCall(180, () => {
                this.bg.setTexture(this.currentBgOpen)
                this.time.delayedCall(Phaser.Math.Between(2000, 5000), doBlink)
            })
        }
        this.time.delayedCall(Phaser.Math.Between(2000, 5000), doBlink)

        // dialogue box UI
        const boxHeight = 140

        // background box
        this.dialogueBox = this.add.rectangle(
            this.scale.width / 2,
            this.scale.height - boxHeight / 2,
            this.scale.width,
            boxHeight,
            0x000000,
            0.7
        ).setDepth(100)

        // name box
        this.nameBox = this.add.rectangle(
            110,
            this.scale.height - boxHeight - 18,
            180,
            40,
            0x000000,
            0.85
        ).setDepth(102)

        // name text
        this.nameText = this.add.text(
            110,
            this.scale.height - boxHeight - 18,
            '',
            {
                fontFamily: '"BabyDoll"',
                fontSize: '24px',
                color: '#ffffff',
                align: 'center'
            }
        )
        .setOrigin(0.5)
        .setDepth(103)

        // text object
        this.dialogueText = this.add.text(
            40,
            this.scale.height - boxHeight + 20,
            '',
            {
                fontFamily: '"BabyDoll"',
                fontSize: '20px',
                color: '#ffffff',
                wordWrap: { width: this.scale.width - 80 }
            }
        ).setDepth(101)

        // click to continue indicator
        this.continueText = this.add.text(
            this.scale.width - 40,
            this.scale.height - 20,
            'Click to continue',
            {
                fontFamily: '"BabyDoll"',
                fontSize: '18px',
                color: '#ffffff'
            }
        )
        .setOrigin(1, 1)
        .setDepth(103)
        .setVisible(false)

        // pulse for continue text
        this.tweens.add({
            targets: this.continueText,
            alpha: 0.35,
            duration: 500,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut'
        })

        // click to advance
        this.input.on('pointerdown', this.handleRoomClick, this)

        // start first node
        this.goToNode(this.currentNodeId)
    }

    changeStage(openKey, closedKey) {
        if (!this.bg) {
            this.currentBgOpen = openKey
            this.currentBgClosed = closedKey
            return
        }

        const oldOpen = this.currentBgOpen
        const oldClosed = this.currentBgClosed

        this.cameras.main.fadeOut(500, 0, 0, 0)

        this.time.delayedCall(550, () => {
            // only switch once the screen is already black
            this.currentBgOpen = openKey
            this.currentBgClosed = closedKey
            this.bg.setTexture(this.currentBgOpen)

            this.cameras.main.fadeIn(500, 0, 0, 0)
        })
    }

    handleRoomClick(pointer, currentlyOver) {
        if (this.inIntroCutscene) return
        if (currentlyOver.length > 0) return
        if (this.hasChoicesOnScreen()) return

        if (this.isTyping) {
            this.finishTyping()
            return
        }

        const node = this.getCurrentNode()
        if (!node) return

        if (node.choices && this.getVisibleChoices(node).length > 0) {
            return
        }

        if (node.next) {
            this.goToNode(node.next)
        }
    }

    getCurrentNode() {
        return DIALOGUE_STORY.nodes[this.currentNodeId]
    }

    getFlag(flagName) {
        return this.flags[flagName]
    }

    setFlags(flagObject) {
        if (!flagObject) return

        Object.keys(flagObject).forEach((key) => {
            this.flags[key] = flagObject[key]
        })
    }

    resolveSpeaker(node) {
        let speaker = node.speaker || ''

        if (node.speakerIfFlag) {
            const rule = node.speakerIfFlag
            if (this.getFlag(rule.flag) === rule.value) {
                speaker = rule.speaker
            }
        }

        return speaker
    }

    playDoorParticles() {
        const particles = this.add.particles(0, 0, 'particle', {
            x: this.scale.width / 2 + 200,
            y: this.scale.height / 2 - 40,
            lifespan: 1200,
            speed: { min: 20, max: 90 },
            angle: { min: 160, max: 380 },
            scale: { start: 2.12, end: 0 },
            alpha: { start: 0.7, end: 0 },
            quantity: 48,
            frequency: -1
        })

        particles.setDepth(110)

        particles.explode(18, this.scale.width / 2, this.scale.height / 2 - 40)

        this.time.delayedCall(1300, () => {
            if (particles) particles.destroy()
        })
    }

    choiceIsVisible(choice) {
        if (choice.showIf) {
            if (this.getFlag(choice.showIf.flag) !== choice.showIf.value) {
                return false
            }
        }

        if (choice.showIfSelfLoveMin !== undefined) {
            if (this.selfLove < choice.showIfSelfLoveMin) {
                return false
            }
        }

        if (choice.showIfSelfLoveMax !== undefined) {
            if (this.selfLove > choice.showIfSelfLoveMax) {
                return false
            }
        }

        return true
    }

    getVisibleChoices(node) {
        if (!node.choices) return []
        return node.choices.filter(choice => this.choiceIsVisible(choice)).slice(0, 4)
    }

    goToNode(nodeId) {
        this.clearChoices()

        if (this.typingEvent) {
            this.typingEvent.remove()
            this.typingEvent = null
        }

        this.currentNodeId = nodeId
        const node = this.getCurrentNode()
        if (!node) return

        if (node.setFlags) {
            this.setFlags(node.setFlags)
        }

        if (node.selfLoveChange !== undefined) {
            this.selfLove += node.selfLoveChange
            this.selfLove = Phaser.Math.Clamp(this.selfLove, 0, 100)
        }

        if (node.sound) {
            const alreadyPlayed = this.playedNodeSounds[nodeId]

            if (!node.playSoundOnce || !alreadyPlayed) {
                this.sound.play(node.sound)
                this.playedNodeSounds[nodeId] = true
            }
        }
        
        if (node.particles === 'doorOpen') {
            this.playDoorParticles()
        }

        if (node.changeStage) {
            this.changeStage(node.changeStage.open, node.changeStage.closed)
        }

        this.nameText.setText(this.resolveSpeaker(node))
        this.typeText(node.text)

        const visibleChoices = this.getVisibleChoices(node)
        if (visibleChoices.length > 0) {
            this.pendingChoices = visibleChoices
        } else {
            this.pendingChoices = null
        }

        if (node.next === null) {
            this.cameras.main.fadeOut(3000, 0, 0, 0)
            this.time.delayedCall(3500, () => {
                if (this.introMusic) this.introMusic.stop()
                if (this.roomMusic) this.roomMusic.stop()
                this.scene.start('titleScene')
            })
        }
    }

    finishTyping() {
        if (this.typingEvent) {
            this.typingEvent.remove()
            this.typingEvent = null
        }

        this.dialogueText.setText(this.fullText)
        this.isTyping = false

        if (this.pendingChoices && this.pendingChoices.length > 0) {
            this.showChoices(this.pendingChoices)
            this.continueText.setVisible(false)
        } else {
            this.continueText.setVisible(true)
        }
    }

    typeText(text) {
        if (this.typingEvent) {
            this.typingEvent.remove()
            this.typingEvent = null
        }

        this.dialogueText.setText('')
        this.continueText.setVisible(false)
        this.fullText = text
        this.isTyping = true

        let i = 0

        this.typingEvent = this.time.addEvent({
            delay: 30,
            repeat: text.length - 1,
            callback: () => {
                this.dialogueText.text += text[i]
                i++

                if (i % 2 === 0 && text[i - 1] !== ' ') {
                    this.textSound.play({
                        rate: Phaser.Math.FloatBetween(0.9, 1.1),
                        volume: Phaser.Math.FloatBetween(0.25, 0.35)
                    })
                }

                if (i === text.length) {
                    this.isTyping = false
                    this.typingEvent = null

                    if (this.pendingChoices && this.pendingChoices.length > 0) {
                        this.showChoices(this.pendingChoices)
                        this.continueText.setVisible(false)
                    } else {
                        this.continueText.setVisible(true)
                    }
                }
            }
        })
    }

    showChoices(choices) {
        this.clearChoices()

        const startY = this.scale.height - 310
        const spacing = 46

        choices.forEach((choice, index) => {
            const y = startY - ((choices.length - 1 - index) * spacing)

            const btn = this.add.rectangle(
                this.scale.width / 2,
                y,
                420,
                38,
                0x000000,
                0.8
            )
            .setStrokeStyle(2, 0xffffff)
            .setDepth(120)
            .setInteractive({ useHandCursor: true })

            const txt = this.add.text(
                this.scale.width / 2,
                y,
                choice.text,
                {
                    fontFamily: '"BabyDoll"',
                    fontSize: '16px',
                    color: '#ffffff',
                    align: 'center',
                    wordWrap: { width: 380 }
                }
            )
            .setOrigin(0.5)
            .setDepth(121)

            btn.on('pointerover', () => {
                btn.setFillStyle(0x222222, 0.95)
                txt.setScale(1.05)
            })

            btn.on('pointerout', () => {
                btn.setFillStyle(0x000000, 0.8)
                txt.setScale(1)
            })

            btn.on('pointerdown', () => {
                this.clearChoices()
                this.goToNode(choice.next)
            })

            this.choiceButtons.push(btn)
            this.choiceTexts.push(txt)
        })
    }

    clearChoices() {
        this.choiceButtons.forEach(btn => btn.destroy())
        this.choiceTexts.forEach(txt => txt.destroy())
        this.choiceButtons = []
        this.choiceTexts = []
    }

    hasChoicesOnScreen() {
        return this.choiceButtons.length > 0
    }
}