const DIALOGUE_STORY = {
    start: 'intro_1',

    nodes: {

        // =========================
        // INTRO CUTSCENE TRANSITION
        // =========================

        intro_1: {
            speaker: '',
            text: 'When your eyes finally open, the world feels… unfinished.',
            next: 'intro_2'
        },

        intro_2: {
            speaker: '',
            text: 'The colors do not arrive all at once.',
            next: 'intro_3'
        },

        intro_3: {
            speaker: '',
            text: 'Instead, they hesitate… as if unsure whether they belong.',
            next: 'intro_4'
        },

        intro_4: {
            speaker: '',
            text: 'Black. White.',
            next: 'intro_5'
        },

        intro_5: {
            speaker: '',
            text: 'And then, slowly, a room begins to take shape around you.',
            next: 'intro_6'
        },

        intro_6: {
            speaker: '',
            text: 'It is small. Quiet. Still.',
            next: 'intro_7'
        },

        intro_7: {
            speaker: '',
            text: 'The kind of stillness that does not feel empty… but waiting.',
            next: 'intro_8'
        },

        intro_8: {
            speaker: '',
            text: 'Your gaze drifts, without direction, until it finds her.',
            next: 'intro_9'
        },

        intro_9: {
            speaker: '',
            text: 'A girl rests at the edge of the bed.',
            next: 'intro_10'
        },

        intro_10: {
            speaker: '',
            text: 'She leans forward slightly, her head tilted down, as though she had simply paused in the middle of something and never resumed.',
            next: 'intro_11'
        },

        intro_11: {
            speaker: '',
            text: 'It reminds you of a student resting against their desk… not asleep, but somewhere close to it.',
            next: 'intro_12'
        },

        intro_12: {
            speaker: '',
            text: 'Her hair falls gently around her face.',
            next: 'intro_13'
        },

        intro_13: {
            speaker: '',
            text: 'White. Completely white. Not dull, not bright… just as white as a blank paper.',
            next: 'intro_14'
        },

        intro_14: {
            speaker: '',
            text: 'Pinned within it is a small crescent moon.',
            next: 'intro_15'
        },

        intro_15: {
            speaker: '',
            text: 'It rests there as if it has always belonged, as if removing it would disturb something delicate.',
            next: 'intro_16'
        },

        intro_16: {
            speaker: '',
            text: 'Her entire form seems drawn rather than placed.',
            next: 'intro_17'
        },

        intro_17: {
            speaker: '',
            text: 'Lines. Soft shading. A presence that feels closer to a sketch than a person.',
            next: 'intro_18'
        },

        intro_18: {
            speaker: '',
            text: 'Black and white… and nothing in between.',
            next: 'intro_19'
        },

        intro_19: {
            speaker: '',
            text: 'And yet… she does not feel incomplete.',
            next: 'intro_20'
        },

        intro_20: {
            speaker: '',
            text: 'She feels… still.',
            next: 'intro_21'
        },

        intro_21: {
            speaker: '',
            text: 'As if the world had paused around her, rather than the other way around.',
            next: 'intro_22'
        },

        intro_22: {
            speaker: '',
            text: 'For a moment, you are not sure if she has noticed you at all.',
            next: 'intro_23'
        },

        intro_23: {
            speaker: '',
            text: 'Then, without warning, she speaks.',
            next: 'intro_24'
        },

        intro_24: {
            speaker: '???',
            text: '...You are awake.',
            next: 'main_menu'
        },

        // =========================
        // MAIN MENU
        // =========================

        main_menu: {
            speaker: '???',
            speakerIfFlag: { flag: 'knowsName', value: true, speaker: 'Liebe' },
            text: 'What would you like to do?',
            choices: [
                { text: 'Look around', next: 'look_menu' },
                { text: 'Talk', next: 'talk_menu' },
                {
                    text: 'Next stage',
                    next: 'stage2_intro_1',
                    showIf: { flag: 'knowsName', value: true }
                },
                { text: 'Sit quietly', next: 'quiet_path_1' }
            ]
        },

        // =========================
        // LOOK PATH
        // =========================

        look_menu: {
            speaker: 'You',
            text: 'Where should I look?',
            choices: [
                { text: 'Door', next: 'door_1' },
                { text: 'Liebe', next: 'stare_1' },
                { text: 'Window', next: 'window_1' },
                { text: 'Back', next: 'main_menu' }
            ]
        },

        door_1: {
            speaker: '???',
            speakerIfFlag: { flag: 'knowsName', value: true, speaker: 'Liebe' },
            text: 'That is the only way out.',
            next: 'door_2'
        },

        door_2: {
            speaker: '???',
            speakerIfFlag: { flag: 'knowsName', value: true, speaker: 'Liebe' },
            text: 'But it does not open for you.',
            next: 'door_3'
        },

        door_3: {
            speaker: '???',
            speakerIfFlag: { flag: 'knowsName', value: true, speaker: 'Liebe' },
            text: 'Not yet.',
            next: 'look_menu'
        },

        stare_1: {
            speaker: '???',
            speakerIfFlag: { flag: 'knowsName', value: true, speaker: 'Liebe' },
            text: '...',
            next: 'stare_2'
        },

        stare_2: {
            speaker: '???',
            speakerIfFlag: { flag: 'knowsName', value: true, speaker: 'Liebe' },
            text: 'You are staring.',
            next: 'stare_3'
        },

        stare_3: {
            speaker: '???',
            speakerIfFlag: { flag: 'knowsName', value: true, speaker: 'Liebe' },
            text: 'Most people try not to make it obvious.',
            next: 'stare_4'
        },

        stare_4: {
            speaker: '???',
            speakerIfFlag: { flag: 'knowsName', value: true, speaker: 'Liebe' },
            text: 'But I suppose honesty is easier than subtlety.',
            next: 'look_menu'
        },

        window_1: {
            speaker: '???',
            speakerIfFlag: { flag: 'knowsName', value: true, speaker: 'Liebe' },
            text: 'It looks empty to you.',
            next: 'window_2'
        },

        window_2: {
            speaker: '???',
            speakerIfFlag: { flag: 'knowsName', value: true, speaker: 'Liebe' },
            text: 'Flat. Colorless.',
            next: 'window_3'
        },

        window_3: {
            speaker: '???',
            speakerIfFlag: { flag: 'knowsName', value: true, speaker: 'Liebe' },
            text: 'But I see something else.',
            next: 'window_4'
        },

        window_4: {
            speaker: '???',
            speakerIfFlag: { flag: 'knowsName', value: true, speaker: 'Liebe' },
            text: 'Warmth. Faded, but still there.',
            next: 'look_menu'
        },

        // =========================
        // TALK PATH
        // =========================

        talk_menu: {
            speaker: 'You',
            text: 'What do I want to ask?',
            choices: [
                {
                    text: 'Who are you?',
                    next: 'name_1',
                    showIf: { flag: 'knowsName', value: false }
                },
                { text: 'Where am I?', next: 'where_1' },
                { text: 'Back', next: 'main_menu' }
            ]
        },

        name_1: {
            speaker: '???',
            text: '...',
            next: 'name_2'
        },

        name_2: {
            speaker: '???',
            text: 'You want a name.',
            next: 'name_3'
        },

        name_3: {
            speaker: 'Liebe',
            text: 'Then you may call me Liebe.',
            setFlags: { knowsName: true },
            next: 'name_4'
        },

        name_4: {
            speaker: 'Liebe',
            text: 'It is the closest thing I have to one.',
            next: 'talk_menu'
        },

        where_1: {
            speaker: '???',
            speakerIfFlag: { flag: 'knowsName', value: true, speaker: 'Liebe' },
            text: 'You are in my room.',
            next: 'where_2'
        },

        where_2: {
            speaker: '???',
            speakerIfFlag: { flag: 'knowsName', value: true, speaker: 'Liebe' },
            text: 'It may not make sense yet.',
            next: 'where_3'
        },

        where_3: {
            speaker: '???',
            speakerIfFlag: { flag: 'knowsName', value: true, speaker: 'Liebe' },
            text: 'But it is where you are.',
            next: 'talk_menu'
        },

        // =========================
        // STAGE 2
        // =========================

        stage2_intro_1: {
            speaker: 'Liebe',
            text: 'Then let us go a little further.',
            changeStage: {
                open: 'sroom',
                closed: 'sroom1'
            },
            next: 'stage2_intro_2'
        },

        stage2_intro_2: {
            speaker: 'Liebe',
            text: 'There is something I want to ask you.',
            next: 'stage2_question'
        },

        stage2_question: {
            speaker: 'Liebe',
            text: 'What do you think is your reason for being here?',
            choices: [
                { text: 'A punishment.', next: 'stage2_punishment_1' },
                { text: 'A reward.', next: 'stage2_reward_1' },
                { text: 'A setup.', next: 'stage2_setup_1' },
                { text: "...I don't know.", next: 'stage2_dontknow_1' }
            ]
        },

        stage2_punishment_1: {
            speaker: 'You',
            text: 'A punishment.',
            selfLoveChange: -8,
            next: 'stage2_punishment_2'
        },

        stage2_punishment_2: {
            speaker: 'Liebe',
            text: 'You say that as if suffering would make more sense than kindness.',
            next: 'stage2_punishment_followup'
        },

        stage2_punishment_followup: {
            speaker: 'Liebe',
            text: 'Why does that feel believable to you?',
            choices: [
                {
                    text: 'Because I usually deserve the worst.',
                    next: 'stage2_punishment_low_1'
                },
                {
                    text: 'Because I am used to expecting it.',
                    next: 'stage2_punishment_neutral_1'
                },
                {
                    text: 'Maybe I am wrong about myself.',
                    next: 'stage2_punishment_high_1'
                }
            ]
        },

        stage2_punishment_low_1: {
            speaker: 'You',
            text: 'Because I usually deserve the worst.',
            selfLoveChange: -14,
            next: 'stage2_punishment_low_2'
        },

        stage2_punishment_low_2: {
            speaker: 'Liebe',
            text: 'That is a cruel thing to say to someone, even if that someone is yourself.',
            next: 'stage3_intro_1'
        },

        stage2_punishment_neutral_1: {
            speaker: 'You',
            text: 'Because I am used to expecting it.',
            selfLoveChange: -4,
            next: 'stage2_punishment_neutral_2'
        },

        stage2_punishment_neutral_2: {
            speaker: 'Liebe',
            text: 'Expectation can feel like truth after long enough. That does not mean it is.',
            next: 'stage3_intro_1'
        },

        stage2_punishment_high_1: {
            speaker: 'You',
            text: 'Maybe I am wrong about myself.',
            selfLoveChange: 10,
            next: 'stage2_punishment_high_2'
        },

        stage2_punishment_high_2: {
            speaker: 'Liebe',
            text: 'Maybe. And maybe that would be the kinder answer.',
            next: 'stage3_intro_1'
        },

        stage2_reward_1: {
            speaker: 'You',
            text: 'A reward.',
            selfLoveChange: 6,
            next: 'stage2_reward_2'
        },

        stage2_reward_2: {
            speaker: 'Liebe',
            text: 'Then some part of you believes you were meant to receive gentleness.',
            next: 'stage2_reward_followup'
        },

        stage2_reward_followup: {
            speaker: 'Liebe',
            text: 'What kind of reward would you hope for?',
            choices: [
                {
                    text: 'To be told I did enough.',
                    next: 'stage2_reward_kind_1'
                },
                {
                    text: 'To rest without feeling guilty.',
                    next: 'stage2_reward_rest_1'
                },
                {
                    text: 'Nothing. I probably have not earned one.',
                    next: 'stage2_reward_low_1'
                }
            ]
        },

        stage2_reward_kind_1: {
            speaker: 'You',
            text: 'To be told I did enough.',
            selfLoveChange: 12,
            next: 'stage2_reward_kind_2'
        },

        stage2_reward_kind_2: {
            speaker: 'Liebe',
            text: 'Then hear this much from me: surviving this far was not nothing.',
            next: 'stage3_intro_1'
        },

        stage2_reward_rest_1: {
            speaker: 'You',
            text: 'To rest without feeling guilty.',
            selfLoveChange: 8,
            next: 'stage2_reward_rest_2'
        },

        stage2_reward_rest_2: {
            speaker: 'Liebe',
            text: 'Rest is not always a prize. Sometimes it is simply something a hurting person needs.',
            next: 'stage3_intro_1'
        },

        stage2_reward_low_1: {
            speaker: 'You',
            text: 'Nothing. I probably have not earned one.',
            selfLoveChange: -10,
            next: 'stage2_reward_low_2'
        },

        stage2_reward_low_2: {
            speaker: 'Liebe',
            text: 'You withdraw your hand before kindness can even touch it.',
            next: 'stage3_intro_1'
        },

        stage2_setup_1: {
            speaker: 'You',
            text: 'A setup.',
            next: 'stage2_setup_2'
        },

        stage2_setup_2: {
            speaker: 'Liebe',
            text: 'Then you think this place is trying to trick you.',
            next: 'stage2_setup_followup'
        },

        stage2_setup_followup: {
            speaker: 'Liebe',
            text: 'What would the trick be?',
            choices: [
                {
                    text: 'That hope will only make it hurt more later.',
                    next: 'stage2_setup_low_1'
                },
                {
                    text: 'That if I trust this, I will lose something.',
                    next: 'stage2_setup_mid_1'
                },
                {
                    text: 'That there is none. Maybe I am only afraid.',
                    next: 'stage2_setup_high_1'
                }
            ]
        },

        stage2_setup_low_1: {
            speaker: 'You',
            text: 'That hope will only make it hurt more later.',
            selfLoveChange: -10,
            next: 'stage2_setup_low_2'
        },

        stage2_setup_low_2: {
            speaker: 'Liebe',
            text: 'A frightened heart can begin treating comfort like a threat.',
            next: 'stage3_intro_1'
        },

        stage2_setup_mid_1: {
            speaker: 'You',
            text: 'That if I trust this, I will lose something.',
            selfLoveChange: -3,
            next: 'stage2_setup_mid_2'
        },

        stage2_setup_mid_2: {
            speaker: 'Liebe',
            text: 'Perhaps. But keeping every wall intact can also be its own kind of loss.',
            next: 'stage3_intro_1'
        },

        stage2_setup_high_1: {
            speaker: 'You',
            text: 'That there is none. Maybe I am only afraid.',
            selfLoveChange: 9,
            next: 'stage2_setup_high_2'
        },

        stage2_setup_high_2: {
            speaker: 'Liebe',
            text: 'Fear said aloud becomes easier to hold. Easier to survive.',
            next: 'stage3_intro_1'
        },

        stage2_dontknow_1: {
            speaker: 'You',
            text: "...I don't know.",
            selfLoveChange: 4,
            next: 'stage2_dontknow_2'
        },

        stage2_dontknow_2: {
            speaker: 'Liebe',
            text: 'That may be the most honest answer you could have given me.',
            next: 'stage2_dontknow_followup'
        },

        stage2_dontknow_followup: {
            speaker: 'Liebe',
            text: 'When you do not know what something means, what do you usually blame first?',
            choices: [
                {
                    text: 'Myself.',
                    next: 'stage2_dontknow_low_1'
                },
                {
                    text: 'The situation.',
                    next: 'stage2_dontknow_mid_1'
                },
                {
                    text: 'No one. Some things take time.',
                    next: 'stage2_dontknow_high_1'
                }
            ]
        },

        stage2_dontknow_low_1: {
            speaker: 'You',
            text: 'Myself.',
            selfLoveChange: -12,
            next: 'stage2_dontknow_low_2'
        },

        stage2_dontknow_low_2: {
            speaker: 'Liebe',
            text: 'You reach for your own throat before you reach for understanding.',
            next: 'stage3_intro_1'
        },

        stage2_dontknow_mid_1: {
            speaker: 'You',
            text: 'The situation.',
            selfLoveChange: 0,
            next: 'stage2_dontknow_mid_2'
        },

        stage2_dontknow_mid_2: {
            speaker: 'Liebe',
            text: 'A reasonable answer. Not every unanswered thing is a failure.',
            next: 'stage3_intro_1'
        },

        stage2_dontknow_high_1: {
            speaker: 'You',
            text: 'No one. Some things take time.',
            selfLoveChange: 10,
            next: 'stage2_dontknow_high_2'
        },

        stage2_dontknow_high_2: {
            speaker: 'Liebe',
            text: 'That is a patient kind of mercy.',
            next: 'stage3_intro_1'
        },

        // =========================
        // STAGE 3
        // =========================

        stage3_intro_1: {
            speaker: 'Liebe',
            text: 'One more question, then.',
            next: 'stage3_question'
        },

        stage3_question: {
            speaker: 'Liebe',
            text: 'When you imagine your life beyond this room, what feels most true about your predicament?',
            choices: [
                {
                    text: 'I ruin the good things I am given.',
                    next: 'stage3_low_1'
                },
                {
                    text: 'I am tired, but I still want to try.',
                    next: 'stage3_mid_1'
                },
                {
                    text: 'I deserve a chance to begin again.',
                    next: 'stage3_high_1'
                },
                {
                    text: 'I just want someone to stay with me a little longer.',
                    next: 'stage3_tender_1'
                }
            ]
        },

        stage3_low_1: {
            speaker: 'You',
            text: 'I ruin the good things I am given.',
            selfLoveChange: -16,
            next: 'stage3_low_2'
        },

        stage3_low_2: {
            speaker: 'Liebe',
            text: 'You speak about yourself like a disaster you are already bracing for.',
            next: 'final_prelude_1'
        },

        stage3_mid_1: {
            speaker: 'You',
            text: 'I am tired, but I still want to try.',
            selfLoveChange: 6,
            next: 'stage3_mid_2'
        },

        stage3_mid_2: {
            speaker: 'Liebe',
            text: 'That is not a small thing. Wanting to try is how many people survive the night.',
            next: 'final_prelude_1'
        },

        stage3_high_1: {
            speaker: 'You',
            text: 'I deserve a chance to begin again.',
            selfLoveChange: 14,
            next: 'stage3_high_2'
        },

        stage3_high_2: {
            speaker: 'Liebe',
            text: 'Yes. Even now. Especially now.',
            next: 'final_prelude_1'
        },

        stage3_tender_1: {
            speaker: 'You',
            text: 'I just want someone to stay with me a little longer.',
            selfLoveChange: 2,
            next: 'stage3_tender_2'
        },

        stage3_tender_2: {
            speaker: 'Liebe',
            text: 'There is no shame in that wish.',
            next: 'final_prelude_1'
        },

        // =========================
        // FINAL STAGE
        // =========================

        final_prelude_1: {
            speaker: '',
            text: 'Then the room grows quiet again, as if waiting for what you will do with yourself next.',
            next: 'final_prelude_2'
        },

        final_prelude_2: {
            speaker: '',
            text: 'The sound of the door opening is heard.',
            sound: 'doorOpen',
            particles: 'doorOpen',
            playSoundOnce: true,
            next: 'final_prelude_3'
        },

        final_prelude_3: {
            speaker: 'Liebe',
            text: 'The door is there. The bed is still here. So am I.',
            evaluateEnding: true,
            next: 'final_choice'
        },

        final_choice: {
            speaker: 'You',
            text: 'I...',
            choices: [
                {
                    text: 'Take her hand, and leave with her.',
                    next: 'ending_high_1',
                    showIfSelfLoveMin: 70
                },
                {
                    text: 'Stand up and leave the room alone.',
                    next: 'ending_neutral_1',
                    showIfSelfLoveMin: 40,
                    showIfSelfLoveMax: 69
                },
                {
                    text: 'Stay in bed and let the room hold me.',
                    next: 'ending_low_1',
                    showIfSelfLoveMax: 39
                }
            ]
        },

        ending_high_1: {
            speaker: '',
            text: 'You rise from the bed on unsteady legs.',
            next: 'ending_high_2'
        },

        ending_high_2: {
            speaker: '',
            text: 'This time, when you reach for the door, you do not reach alone.',
            next: 'ending_high_3'
        },

        ending_high_3: {
            speaker: 'Liebe',
            text: '...So you chose to go on.',
            next: 'ending_high_4'
        },

        ending_high_4: {
            speaker: '',
            text: 'You take Liebe with you, and the room finally releases both of you.',
            next: 'ending_high_5'
        },

        ending_high_5: {
            speaker: '',
            text: 'Ending: Tsuru ga Kirei',
            next: null
        },

        ending_neutral_1: {
            speaker: '',
            text: 'You sit up slowly, as though waking for a second time.',
            next: 'ending_neutral_2'
        },

        ending_neutral_2: {
            speaker: 'Liebe',
            text: 'You can leave, even if you are not ready to understand everything yet.',
            next: 'ending_neutral_3'
        },

        ending_neutral_3: {
            speaker: '',
            text: 'At the doorway, you look back only once.',
            next: 'ending_neutral_4'
        },

        ending_neutral_4: {
            speaker: '',
            text: 'Liebe remains where she is as you step forward without her.',
            next: 'ending_neutral_5'
        },

        ending_neutral_5: {
            speaker: '',
            text: 'Ending: Tsuki wa Hitori',
            next: null
        },

        ending_low_1: {
            speaker: '',
            text: 'You do not move.',
            next: 'ending_low_2'
        },

        ending_low_2: {
            speaker: '',
            text: 'The weight in your chest is too familiar, too heavy, too tired to argue with.',
            next: 'ending_low_3'
        },

        ending_low_3: {
            speaker: 'Liebe',
            text: 'Then stay. I will watch over you until the hurting passes.',
            next: 'ending_low_4'
        },

        ending_low_4: {
            speaker: '',
            text: 'You remain in the bed, and Liebe keeps you company with a softness that asks for nothing.',
            next: 'ending_low_5'
        },

        ending_low_5: {
            speaker: '',
            text: 'Ending: Tsuki no Shita',
            next: null
        },

        // =========================
        // QUIET PATH (ENDING)
        // =========================

        quiet_path_1: {
            speaker: '',
            text: 'You decide not to speak.',
            next: 'quiet_path_2'
        },

        quiet_path_2: {
            speaker: '',
            text: 'The silence stretches.',
            next: 'quiet_path_3'
        },

        quiet_path_3: {
            speaker: '',
            text: 'And she does not interrupt it.',
            next: 'quiet_path_4'
        },

        quiet_path_4: {
            speaker: '',
            text: 'Eventually, even your thoughts begin to fade.',
            next: 'quiet_end'
        },

        quiet_end: {
            speaker: '',
            text: 'Ending: Quiet Stillness',
            next: null
        }

    }
}
