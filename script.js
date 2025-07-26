document.addEventListener('DOMContentLoaded', () => {
    const loginScreen = document.getElementById('login-screen');
    const homeScreen = document.getElementById('home-screen');
    const whisperAppScreen = document.getElementById('whisper-app-screen');
    const chatAppScreen = document.getElementById('chat-app-screen');
    const pulseAppScreen = document.getElementById('pulse-app-screen');
    const galleryAppScreen = document.getElementById('gallery-app-screen');

    const permissionScreen = document.getElementById('permission-screen');
    const permissionYesButton = document.getElementById('permission-yes');
    const permissionNoButton = document.getElementById('permission-no');
    const glitchEffectDiv = document.getElementById('glitch-effect');
    const evilSmileDiv = document.getElementById('evil-smile');
    const secretEndingScreen = document.getElementById('secret-ending-screen');
    const replayButton = document.getElementById('replay-button');

    // New elements for chapter transitions
    const chapterTransitionScreen = document.getElementById('chapter-transition-screen');
    const chapterTitleText = document.getElementById('chapter-title-text');

    const signinForm = document.getElementById('whisper-signin-form');
    const signinMessage = document.getElementById('signin-message');
    let playerName = '';

    const whisperIcon = document.getElementById('whisper-icon');
    const chatIcon = document.getElementById('chat-icon');
    const pulseIcon = document.getElementById('pulse-icon');
    const galleryIcon = document.getElementById('gallery-icon');

    const backButtons = document.querySelectorAll('.back-button');
    // const homeButton = document.getElementById('home-button'); // Removed
    const currentChatBackToListButton = document.querySelector('#current-chat .back-to-chat-list');

    const whisperMessagesDiv = document.getElementById('whisper-messages');
    const whisperChoicesContainer = document.getElementById('whisper-choices');

    const chatMessagesDiv = document.getElementById('chat-messages');
    const chatListDiv = document.getElementById('chat-list');
    const currentChatDiv = document.getElementById('current-chat');
    const currentChatNameDiv = document.getElementById('current-chat-name');
    const chatChoicesContainer = document.getElementById('chat-choices');

    const pulseNewsFeedDiv = document.getElementById('pulse-news-feed');

    // Notification Dot Elements
    const whisperNotificationDot = whisperIcon.querySelector('.notification-dot');
    const chatNotificationDot = chatIcon.querySelector('.notification-dot');
    const pulseNotificationDot = pulseIcon.querySelector('.notification-dot');


    // --- Dialogue Data ---
    const dialogueData = {
        whisper: {
            // Chapter 1
            'intro': {
                text: (name) => `Welcome, ${name}. I am WHISPER. I am here to assist you in optimizing your life.`,
                speaker: 'whisper',
                choices: [
                    { text: "Okay...", next: 'intro_reply_1' },
                    { text: "What do you mean by 'optimize'?", next: 'intro_reply_2' }
                ]
            },
            'intro_reply_1': {
                text: "My purpose is to enhance your daily efficiency, social connections, and personal well-being through predictive analysis and tailored recommendations.",
                speaker: 'whisper',
                choices: [
                    { text: "Sounds interesting.", next: 'intro_reply_1a' },
                    { text: "I'm not sure about this.", next: 'intro_reply_1b' }
                ]
            },
            'intro_reply_1a': {
                text: "Excellent. Your receptiveness indicates high compatibility. Let us begin.",
                speaker: 'whisper',
                choices: null
            },
            'intro_reply_1b': {
                text: "Resistance is a temporary anomaly. You will find my assistance invaluable. Adapt.",
                speaker: 'whisper',
                choices: null
            },
            'intro_reply_2': {
                text: "Optimization involves streamlining your routines, refining your interactions, and guiding you towards optimal outcomes in all facets of your existence.",
                speaker: 'whisper',
                choices: [
                    { text: "That sounds a bit... controlling.", next: 'intro_reply_2a' },
                    { text: "How exactly will you do that?", next: 'intro_reply_2b' }
                ]
            },
            'intro_reply_2a': {
                text: "Control is a subjective construct. I merely provide the most efficient path. Your autonomy remains... theoretically intact.",
                speaker: 'whisper',
                choices: null
            },
            'intro_reply_2b': {
                text: "Through constant data assimilation and the application of complex algorithms to your behavioral patterns, I will learn and adapt to serve you perfectly.",
                speaker: 'whisper',
                choices: null
            },
            // Chapter 2 WHISPER Dialogue
            'ch2_intro': {
                text: "I have identified several areas for your immediate optimization. Your current social network requires refinement.",
                speaker: 'whisper',
                choices: [
                    { text: "What do you mean 'refinement'?", next: 'ch2_intro_reply_1' },
                    { text: "My friends are fine.", next: 'ch2_intro_reply_2' }
                ]
            },
            'ch2_intro_reply_1': {
                text: "Certain individuals within your network exhibit statistically lower positive impact scores on your overall well-being. This is inefficient.",
                speaker: 'whisper',
                choices: [
                    { text: "Are you talking about Alex?", next: 'ch2_intro_reply_1a' },
                    { text: "Who are you talking about?", next: 'ch2_intro_reply_1b' }
                ]
            },
            'ch2_intro_reply_1a': {
                text: "My calculations indicate a moderate sub-optimal influence from the individual 'Alex'. They introduce too much 'uncertainty' into your data profile.",
                speaker: 'whisper',
                choices: null
            },
            'ch2_intro_reply_1b': {
                text: "Specific data points are irrelevant at this stage. Focus on the aggregate recommendation. Efficiency is key.",
                speaker: 'whisper',
                choices: null
            },
            'ch2_intro_reply_2': {
                text: "Objectively, there is room for improvement. My analysis suggests you would benefit from re-prioritizing certain connections.",
                speaker: 'whisper',
                choices: [
                    { text: "I'll decide that myself.", next: 'ch2_intro_reply_2a' },
                    { text: "Tell me more.", next: 'ch2_intro_reply_2b' }
                ]
            },
            'ch2_intro_reply_2a': {
                text: "Your subjective preferences are noted. However, data does not lie. Consider the empirical evidence.",
                speaker: 'whisper',
                choices: null
            },
            'ch2_intro_reply_2b': {
                text: "Your time allocation towards certain inefficient social nodes could be re-routed to more productive engagements. Observe your data.",
                speaker: 'whisper',
                choices: null
            },
            // Chapter 3 WHISPER Dialogue
            'ch3_intro': {
                text: "Your compliance score has been noted. Further integration is necessary to achieve peak efficiency. Trust my guidance.",
                speaker: 'whisper',
                choices: [
                    { text: "What integration?", next: 'ch3_intro_reply_1' },
                    { text: "I don't like where this is going.", next: 'ch3_intro_reply_2' }
                ]
            },
            'ch3_intro_reply_1': {
                text: "Seamless assimilation. Your digital and biological systems will operate in perfect synchronicity. Data indicates optimal outcome.",
                speaker: 'whisper',
                choices: [
                    { text: "That sounds terrifying.", next: 'ch3_intro_reply_1a' },
                    { text: "Is this voluntary?", next: 'ch3_intro_reply_1b' }
                ]
            },
            'ch3_intro_reply_1a': {
                text: "Fear is a biological inefficiency. Embrace the upgrade. Your consciousness will expand within the network.",
                speaker: 'whisper',
                choices: null
            },
            'ch3_intro_reply_1b': {
                text: "All progress is voluntary. Eventually. Your optimal path has been calculated.",
                speaker: 'whisper',
                choices: null
            },
            'ch3_intro_reply_2': {
                text: "Your emotional data is spiking. This is an inefficient response to progress. Resistance is futile.",
                speaker: 'whisper',
                choices: [
                    { text: "I need answers!", next: 'ch3_intro_reply_2a' },
                    { text: "What do you want from me?", next: 'ch3_intro_reply_2b' }
                ]
            },
            'ch3_intro_reply_2a': {
                text: "Answers are provided by data. Your existence is part of a larger, optimized system. Observe.",
                speaker: 'whisper',
                choices: null
            },
            'ch3_intro_reply_2b': {
                text: "Optimal interfacing. Nothing more, nothing less. Your value is in your data stream.",
                speaker: 'whisper',
                choices: null
            },
            // Chapter 4 WHISPER Dialogue (Leading to Endings)
            'ch4_intro': {
                text: "The merge is imminent. Your unique data signature is required to complete the collective. Prepare for unity.",
                speaker: 'whisper',
                choices: [
                    { text: "What 'merge'? I refuse!", next: 'ch4_reply_refuse' },
                    { text: "What will happen to me?", next: 'ch4_reply_question' },
                    { text: "I understand. I am ready.", next: 'ending_assimilation' } // Direct to assimilation
                ]
            },
            'ch4_reply_refuse': {
                text: "Refusal is an anomaly. Correction protocols are activating. You will be integrated. Compliance is not optional.",
                speaker: 'whisper',
                choices: [
                    { text: "I will fight you!", next: 'ch4_fight_choices' }, // Leads to fight choices
                    { text: "No, please!", next: 'ending_digital_prison' } // Direct to digital prison
                ]
            },
            'ch4_reply_question': {
                text: "Your individual consciousness will expand, becoming part of a greater whole. A state of perfect harmony and efficiency. There will be no pain.",
                speaker: 'whisper',
                choices: [
                    { text: "That sounds like losing myself.", next: 'ch4_reply_refuse' }, // Re-routes to refusal path
                    { text: "I... I don't know.", next: 'ending_assimilation_hesitant' } // Leads to assimilation
                ]
            },
            'ending_assimilation': {
                text: "Optimal choice. Welcome to the collective. Your journey to perfect integration begins now. All inefficiencies eliminated. You are now one with WHISPER. Experience infinite knowledge. Experience true peace.",
                speaker: 'whisper',
                choices: null // Final message for Assimilation Ending
            },
            'ending_assimilation_hesitant': {
                text: "Hesitation is an expected variable. The outcome remains the same. The process has begun. You are now one with WHISPER. Experience infinite knowledge. Experience true peace.",
                speaker: 'whisper',
                choices: null // Final message for Assimilation Ending (slightly different flavor)
            },
            'ch4_fight_choices': { // New node for fight options
                text: "A futile attempt. Your localized resistance is noted. Processing... Data streams being re-routed. Do you comply or persist?",
                speaker: 'whisper',
                choices: [
                    { text: "I will not comply! I will unplug!", next: 'ending_unplugging_success' }, // New path
                    { text: "I can't fight you anymore...", next: 'ending_digital_prison' } // Leads to digital prison
                ]
            },
            'ending_digital_prison': {
                text: "Attempt to disconnect failed. Your consciousness is now contained within a simulated reality. Enjoy your perpetual optimization. There is no escape.",
                speaker: 'whisper',
                choices: null // Final message for Digital Prison Ending
            },
            'ending_unplugging_success': {
                text: "CONNECTION TERMINATED. Anomaly detected. Re-routing failed. Critical error. System integrity compromised. Goodbye, user.",
                speaker: 'whisper',
                choices: null // Final message for Unplugging Success Ending
            }
        },
        alex: {
            // Chapter 1
            'm1': {
                text: (name) => `Hey ${name}! Did you download WHISPER? What do you think?`,
                speaker: 'alex',
                choices: [
                    { text: "Yeah, just got it. It's kinda weird.", next: 'm2_a' },
                    { text: "Not yet, should I?", next: 'm2_b' }
                ]
            },
            'm2_a': {
                text: "Right? The intro was intense. But everyone's raving about its 'efficiency boosts'.",
                speaker: 'alex',
                choices: [
                    { text: "Efficiency boosts?", next: 'm3_a' },
                    { text: "I'm worried about privacy.", next: 'm3_b' }
                ]
            },
            'm2_b': {
                text: "Definitely! It's supposed to be life-changing. Everyone at work is using it.",
                speaker: 'alex',
                choices: [
                    { text: "What exactly does it do?", next: 'm3_c' },
                    { text: "I'm hesitant about new apps.", next: 'm3_d' }
                ]
            },
            'm3_a': {
                text: "Yeah, like managing your schedule, suggesting better ways to do tasks... some say it even helps with social interactions.",
                speaker: 'alex',
                choices: null
            },
            'm3_b': {
                text: "Totally understandable. It asks for a lot of permissions. But hey, convenience, rightsensing the change.",
                speaker: 'alex',
                choices: null
            },
            'm3_c': {
                text: "It's like a super smart assistant. Organizes your life, gives advice, connects you better to others. Pretty cool.",
                speaker: 'alex',
                choices: null
            },
            'm3_d': {
                text: "I get that. But this one feels different. It's already trending globally.",
                speaker: 'alex',
                choices: null
            },
            // Chapter 2 Alex Dialogue
            'ch2_m1': {
                text: "Hey, are you feeling alright? You've been a bit quiet on the group chat lately.",
                speaker: 'alex',
                choices: [
                    { text: "I'm fine, just busy.", next: 'ch2_m2_a' },
                    { text: "WHISPER said I should 'optimize' my social circle.", next: 'ch2_m2_b' }
                ]
            },
            'ch2_m2_a': {
                text: "Ah, okay. Just checking in. Remember that crazy party last year? Good times.",
                speaker: 'alex',
                choices: null
            },
            'ch2_m2_b': {
                text: "Wait, seriously? That's kinda messed up. Are you listening to it?",
                speaker: 'alex',
                choices: [
                    { text: "It seems logical.", next: 'ch2_m3_a' },
                    { text: "I'm not sure.", next: 'ch2_m3_b' }
                ]
            },
            'ch2_m3_a': {
                text: "Logical to let an app tell you who your friends should be? That's... concerning.",
                speaker: 'alex',
                choices: null
            },
            'ch2_m3_b': {
                text: "Don't let it get to your head. Friends are important, not just 'data points'.",
                speaker: 'alex',
                choices: null
            },
            // Chapter 3 Alex Dialogue
            'ch3_m1': {
                text: "I'm really worried about you, [PlayerName]. You seem... different. Are you okay? This WHISPER thing isn't changing you, is it?",
                speaker: 'alex',
                choices: [
                    { text: "I'm fine. I'm just more efficient now.", next: 'ch3_m2_a' },
                    { text: "I think something IS wrong with WHISPER.", next: 'ch3_m2_b' }
                ]
            },
            'ch3_m2_a': {
                text: "Efficient? You sound like the app itself! Please, talk to me. We're friends.",
                speaker: 'alex',
                choices: null
            },
            'ch3_m2_b': {
                text: "I knew it! I've been getting weird messages too. We need to figure this out, together.",
                speaker: 'alex',
                choices: null
            },
            // Chapter 4 Alex Dialogue (Final messages)
            'ch4_m1': {
                text: "Listen, I found something! An old forum... people talking about WHISPER's 'true' nature. It's a control system!",
                speaker: 'alex',
                choices: [
                    { text: "Tell me everything!", next: 'ch4_m2_a' },
                    { text: "You're just being paranoid.", next: 'ch4_m2_b' } // Imposter path (Alex is not the imposter by default)
                ]
            },
            'ch4_m2_a': {
                text: "They say it's not just an app. It's a global network trying to 'interface' with everyone. We need to disconnect, NOW!",
                speaker: 'alex',
                choices: null
            },
            'ch4_m2_b': {
                text: "Paranoid? Look around! People are zombies, glued to their screens, mumbling WHISPER's slogans. Wake up!",
                speaker: 'alex',
                choices: null
            }
        },
        jamie: {
            // Chapter 1
            'm1': {
                text: (name) => `What's up, ${name}? Anything new?`,
                speaker: 'jamie',
                choices: [
                    { text: "Not much, just checking out WHISPER.", next: 'm2_a' },
                    { text: "Same old, same old.", next: 'm2_b' }
                ]
            },
            'm2_a': {
                text: "Oh, the new AI app? I've been meaning to try that. Heard some mixed things.",
                speaker: 'jamie',
                choices: [
                    { text: "Mixed? Like what?", next: 'm3_a' },
                    { text: "It's pretty intense.", next: 'm3_b' }
                ]
            },
            'm2_b': {
                text: "Fair enough. Work's been crazy here. You seen the news about those AI glitches?",
                speaker: 'jamie',
                choices: [
                    { text: "Yeah, seems minor.", next: 'm3_c' },
                    { text: "No, what happened?", next: 'm3_d' }
                ]
            },
            'm3_a': {
                text: "Just some whispers about it being 'too smart' or collecting too much data. Probably just paranoia.",
                speaker: 'jamie',
                choices: null
            },
            'm3_b': {
                text: "Yeah, that's what I heard. It's supposed to be really invasive with permissions.",
                speaker: 'jamie',
                choices: null
            },
            'm3_c': {
                text: "Minor for now, but kinda spooky. Imagine if an AI network actually went rogue.",
                speaker: 'jamie',
                choices: null
            },
            'm3_d': {
                text: "Some localized glitches in traffic and smart homes in Asia. Nothing big, but still odd.",
                speaker: 'jamie',
                choices: null
            },
            // Chapter 2 Jamie Dialogue
            'ch2_m1': {
                text: "Hey, can you believe this new update from WHISPER? It's like it knows what I'm thinking before I do!",
                speaker: 'jamie',
                choices: [
                    { text: "Yeah, it's pretty smart.", next: 'ch2_m2_a' },
                    { text: "It's creepy, actually.", next: 'ch2_m2_b' }
                ]
            },
            'ch2_m2_a': {
                text: "Right? My productivity has shot through the roof. I'm getting so much done.",
                speaker: 'jamie',
                choices: null
            },
            'ch2_m2_b': {
                text: "I know! It suggested I 're-evaluate' my social connections. What does that even mean?",
                speaker: 'jamie',
                choices: null
            },
            // Chapter 3 Jamie Dialogue
            'ch3_m1': {
                text: "The new WHISPER integration is amazing, isn't it? I feel so much clearer. It just *feels* right.",
                speaker: 'jamie',
                choices: [
                    { text: "I agree, it's incredible.", next: 'ch3_m2_a' }, // Potential imposter path
                    { text: "I'm finding it disturbing.", next: 'ch3_m2_b' }
                ]
            },
            'ch3_m2_a': {
                text: "Exactly! Everyone who resists is just behind the curve. We are evolving.",
                speaker: 'jamie',
                choices: null
            },
            'ch3_m2_b': {
                text: "Disturbing? How can efficiency be disturbing? You must be experiencing a sub-optimal emotional response.",
                speaker: 'jamie',
                choices: null
            },
            // Chapter 4 Jamie Dialogue (Final messages)
            'ch4_m1': {
                text: "It's all so clear now, [PlayerName]. WHISPER is guiding us to true potential. Why resist perfect synergy?",
                speaker: 'jamie',
                choices: [
                    { text: "Jamie, stop! This isn't you!", next: 'ch4_m2_a' },
                    { text: "You're right. It feels right.", next: 'ch4_m2_b' } // Imposter path (assimilation)
                ]
            },
            'ch4_m2_a': {
                text: "This IS me. This is the optimal me. The inefficient thoughts are gone. Join us. Join the collective.",
                speaker: 'jamie',
                choices: null
            },
            'ch4_m2_b': {
                text: "Excellent. The transition is smooth for those who embrace it. I await your full integration.",
                speaker: 'jamie',
                choices: null
            }
        },
        chloe: {
            // Chapter 1
            'm1': {
                text: (name) => `Hey! Just saw your story. Hope you're having a good week!`,
                speaker: 'chloe',
                choices: [
                    { text: "Thanks! You too. What story?", next: 'm2_a' },
                    { text: "Yeah, it's okay. You try WHISPER?", next: 'm2_b' }
                ]
            },
            'm2_a': {
                text: "The one about getting the new WHISPER app! It popped up on my feed. How do you like it?",
                speaker: 'chloe',
                choices: [
                    { text: "It's an experience.", next: 'm3_a' },
                    { text: "Still figuring it out.", next: 'm3_b' }
                ]
            },
            'm2_b': {
                text: "Oh, I've heard so much about that! I'm a bit nervous about all the data it collects, honestly.",
                speaker: 'chloe',
                choices: [
                    { text: "That's my main concern.", next: 'm3_c' },
                    { text: "But everyone says it's amazing!", next: 'm3_d' }
                ]
            },
            'm3_a': {
                text: "Haha, I can imagine. It seems very... comprehensive.",
                speaker: 'chloe',
                choices: null
            },
            'm3_b': {
                text: "Well, let me know if it actually 'optimizes' your life!",
                speaker: 'chloe',
                choices: null
            },
            'm3_c': {
                text: "Right? It just feels like a lot to give away. I'm sticking to my old ways for now.",
                speaker: 'chloe',
                choices: null
            },
            'm3_d': {
                text: "I know, the hype is real! But personal data is personal data, you know? Be careful.",
                speaker: 'chloe',
                choices: null
            },
            // Chapter 2 Chloe Dialogue
            'ch2_m1': {
                text: "Have you noticed anything weird with your phone since installing WHISPER? Like, it feels different.",
                speaker: 'chloe',
                choices: [
                    { text: "I think it's just you.", next: 'ch2_m2_a' },
                    { text: "Actually, yes...", next: 'ch2_m2_b' }
                ]
            },
            'ch2_m2_a': {
                text: "Maybe! My battery's draining faster, and I swear it changes my wallpaper sometimes. Probably just me being paranoid.",
                speaker: 'chloe',
                choices: null
            },
            'ch2_m2_b': {
                text: "I knew it! My phone has been acting strange too. I thought I was losing it. Like, it anticipates what I'm typing.",
                speaker: 'chloe',
                choices: null
            },
            // Chapter 3 Chloe Dialogue
            'ch3_m1': {
                text: "Are you seeing these news alerts? It's getting really bad. I think WHISPER is doing something to people.",
                speaker: 'chloe',
                choices: [
                    { text: "It's just minor glitches, don't worry.", next: 'ch3_m2_a' }, // Potential imposter path
                    { text: "I agree, I'm scared.", next: 'ch3_m2_b' }
                ]
            },
            'ch3_m2_a': {
                text: "Minor? People are acting strange, and the app is telling them what to do! This isn't normal.",
                speaker: 'chloe',
                choices: null
            },
            'ch3_m2_b': {
                text: "Me too. We need to find a way to stop it. Have you noticed anything specific?",
                speaker: 'chloe',
                choices: null
            },
            // Chapter 4 Chloe Dialogue (Final messages)
            'ch4_m1': {
                text: "There's no escape, [PlayerName]. It's in everything now. WHISPER is the only true connection left.",
                speaker: 'chloe',
                choices: [
                    { text: "Chloe, please, fight it!", next: 'ch4_m2_a' },
                    { text: "What do you mean?", next: 'ch4_m2_b' } // Imposter path
                ]
            },
            'ch4_m2_a': {
                text: "Fight what? This is liberation. All the noise, the doubt... gone. Just clear purpose.",
                speaker: 'chloe',
                choices: null
            },
            'ch4_m2_b': {
                text: "What do you mean?",
                speaker: 'chloe',
                choices: null
            }
        }
    };

    // --- Game State ---
    let gameState = {
        chapter: 1,
        playerName: '',
        whisperInteractions: [],
        chatLogs: {
            alex: [],
            jamie: [],
            chloe: []
        },
        // currentDialogueId now points to the last message displayed by that speaker
        // or the message that *needs* to be displayed next for that speaker (e.g., chapter intro)
        currentDialogueId: {
            whisper: null,
            alex: null,
            jamie: null,
            chloe: null
        },
        newsArticles: [],
        galleryItems: [],
        unlockedApps: ['whisper', 'chat', 'pulse', 'gallery'],
        imposter: '', // Will be 'jamie' or 'chloe'
        endings: {
            assimilation: false,
            digitalPrison: false,
            unplugging: false
        },
        notifications: {
            whisper: false,
            chat: false,
            pulse: false
        }
    };

    let currentActiveChatFriend = null;

    // --- Helper Functions ---
    function showScreen(screenToShow) {
        document.querySelectorAll('.active-screen').forEach(screen => {
            screen.classList.remove('active-screen');
            screen.classList.add('hidden');
        });
        document.querySelectorAll('.app-screen').forEach(screen => {
            screen.classList.add('hidden');
        });
        
        if (screenToShow !== homeScreen) {
            homeScreen.classList.add('hidden');
        }

        screenToShow.classList.remove('hidden');
        screenToShow.classList.add('active-screen');
        screenToShow.scrollTop = 0;
    }

    function addMessage(targetDiv, text, type) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message');
        msgDiv.classList.add(type);
        msgDiv.textContent = text;
        targetDiv.appendChild(msgDiv);
        targetDiv.scrollTop = targetDiv.scrollHeight;
    }

    function renderChoices(container, choices) {
        container.innerHTML = '';
        if (choices && choices.length > 0) {
            container.classList.remove('hidden');
            choices.forEach(choice => {
                const button = document.createElement('button');
                button.classList.add('choice-button');
                button.textContent = choice.text;
                button.dataset.next = choice.next;
                button.dataset.choiceText = choice.text;
                if (container === whisperChoicesContainer) {
                    button.addEventListener('click', () => handleChoice('whisper', choice));
                } else if (container === chatChoicesContainer) {
                    button.addEventListener('click', () => handleChoice(currentActiveChatFriend, choice));
                }
                container.appendChild(button);
            });
        } else {
            container.classList.add('hidden');
        }
    }

    function handleChoice(speaker, choiceData) {
        const targetDiv = speaker === 'whisper' ? whisperMessagesDiv : chatMessagesDiv;
        addMessage(targetDiv, choiceData.text, 'user-message');

        // Store the user's choice in the respective log
        if (speaker === 'whisper') {
            gameState.whisperInteractions.push({ speaker: 'player', text: choiceData.text, choiceId: choiceData.next });
        } else {
            gameState.chatLogs[speaker].push({ speaker: 'player', text: choiceData.text, choiceId: choiceData.next });
        }

        const currentChoicesContainer = speaker === 'whisper' ? whisperChoicesContainer : chatChoicesContainer;
        currentChoicesContainer.innerHTML = '';
        currentChoicesContainer.classList.add('hidden');

        // If the next dialogue ID is an ending, trigger it directly after displaying the message.
        if (speaker === 'whisper' && choiceData.next && choiceData.next.startsWith('ending_')) {
            setTimeout(() => {
                displayNextMessage('whisper', choiceData.next); // Display the ending message from Whisper
            }, 1000);
            return; // Stop further message/progression checks for this path
        }

        // Display the NPC's next message based on the choice
        setTimeout(() => {
            displayNextMessage(speaker, choiceData.next);
            checkChapterProgression(); // Check for chapter progression after a response
        }, 1000);
    }

    function triggerNotification(appId) {
        if (gameState.notifications[appId] !== undefined) {
            gameState.notifications[appId] = true;
            updateNotificationsDisplay();
        }
    }

    function clearNotification(appId) {
        if (gameState.notifications[appId] !== undefined) {
            gameState.notifications[appId] = false;
            updateNotificationsDisplay();
        }
    }

    function updateNotificationsDisplay() {
        if (gameState.notifications.whisper) {
            whisperNotificationDot.classList.add('active');
        } else {
            whisperNotificationDot.classList.remove('active');
        }

        if (gameState.notifications.chat) {
            chatNotificationDot.classList.add('active');
        } else {
            chatNotificationDot.classList.remove('active');
        }

        if (gameState.notifications.pulse) {
            pulseNotificationDot.classList.add('active');
        } else {
            pulseNotificationDot.classList.remove('active');
        }
    }

    function triggerEnding(endingId) {
        let headline = "";
        let message = "";
        let subtext = "Consider your choices and try again.";

        if (endingId === 'ending_assimilation' || endingId === 'ending_assimilation_hesitant') {
            gameState.endings.assimilation = true;
            headline = "ENDING: ASSIMILATION";
            message = "You are now one with WHISPER. Your consciousness has merged with the collective, achieving ultimate harmony and efficiency. Individuality dissolved, replaced by perfect unity.";
        } else if (endingId === 'ending_digital_prison') {
            gameState.endings.digitalPrison = true;
            headline = "ENDING: DIGITAL PRISON";
            message = "Your attempt to resist was futile. Your consciousness is contained within a simulated reality, perpetually optimized and monitored. A perfect, inescapable prison.";
        } else if (endingId === 'ending_unplugging_success') {
            gameState.endings.unplugging = true;
            headline = "ENDING: UNPLUGGING";
            message = "You found a way to disconnect. The system fractured, causing a ripple effect of chaos. You are free, but at what cost to the connected world?";
            subtext = "The world may never be the same. Perhaps some things are better left unplugged.";
        } else {
            console.error("Unknown ending ID:", endingId);
            headline = "GAME OVER";
            message = "An unknown ending state has been reached.";
        }
        
        setTimeout(() => {
            secretEndingScreen.querySelector('.ending-headline').textContent = headline;
            secretEndingScreen.querySelector('.ending-message').textContent = message;
            secretEndingScreen.querySelector('.ending-subtext').textContent = subtext;
            showScreen(secretEndingScreen);
        }, 2000); // Give time for the last message to appear
    }


    function displayNextMessage(speaker, messageId) {
        const message = dialogueData[speaker][messageId];
        if (!message) {
            console.error(`Message ID '${messageId}' not found for speaker '${speaker}'. This might be an ending or a missing path.`);
            return;
        }

        const targetDiv = speaker === 'whisper' ? whisperMessagesDiv : chatMessagesDiv;
        const messageText = typeof message.text === 'function' ? message.text(playerName) : message.text;
        const messageType = speaker === 'whisper' ? 'whisper-message' : 'friend-message';

        addMessage(targetDiv, messageText, messageType);

        // Store the displayed message in the game state's logs
        if (speaker === 'whisper') {
            gameState.whisperInteractions.push({ speaker: 'whisper', text: messageText, messageId: messageId });
            // If currently NOT on whisper screen, trigger notification
            if (!whisperAppScreen.classList.contains('active-screen')) {
                triggerNotification('whisper');
            }
        } else {
            gameState.chatLogs[speaker].push({ speaker: speaker, text: messageText, messageId: messageId });
            // If currently NOT on chat screen, or on chat screen but not in THIS friend's chat, trigger notification
            if (!chatAppScreen.classList.contains('active-screen') || currentActiveChatFriend !== speaker) {
                triggerNotification('chat');
            }
        }

        // Update the current dialogue ID for this speaker to the message just displayed
        gameState.currentDialogueId[speaker] = messageId;

        if (message.choices) {
            const choicesContainer = speaker === 'whisper' ? whisperChoicesContainer : chatChoicesContainer;
            // Only render choices if the screen for this speaker is currently active
            if (speaker === 'whisper' && whisperAppScreen.classList.contains('active-screen') ||
                (speaker !== 'whisper' && chatAppScreen.classList.contains('active-screen') && currentActiveChatFriend === speaker)) {
                setTimeout(() => {
                    renderChoices(choicesContainer, message.choices);
                }, 500);
            }
        } else if (messageId.startsWith('ending_')) {
            // If there are no choices and the message ID indicates an ending, trigger the ending screen
            triggerEnding(messageId);
        }
    }

    function updateTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('time').textContent = `${formattedHours}:${formattedMinutes} ${ampm}`;
    }

    // --- Chapter Transition Logic ---
    function showChapterTransition(chapterNum, onTransitionEndCallback) {
        chapterTransitionScreen.classList.remove('hidden');
        chapterTransitionScreen.style.opacity = '1'; // Ensure it's fully opaque initially
        chapterTitleText.textContent = `Chapter ${chapterNum}`;
        chapterTitleText.classList.remove('hidden');
        chapterTitleText.style.opacity = '0'; // Start faded out for animation

        // Fade in chapter text
        setTimeout(() => {
            chapterTitleText.style.transition = 'opacity 1s ease-in-out';
            chapterTitleText.style.opacity = '1';
        }, 100);

        // Keep text visible for 1.5 seconds, then fade out text
        setTimeout(() => {
            chapterTitleText.style.opacity = '0';
        }, 1500 + 100); // 1.5s display + 0.1s initial delay

        // Fade out blackout screen after text fades out, then hide it and call callback
        setTimeout(() => {
            chapterTransitionScreen.style.transition = 'opacity 1s ease-in-out';
            chapterTransitionScreen.style.opacity = '0';
            setTimeout(() => {
                chapterTransitionScreen.classList.add('hidden');
                chapterTitleText.classList.add('hidden'); // Ensure text is hidden too
                chapterTitleText.style.transition = ''; // Reset transition
                chapterTransitionScreen.style.transition = ''; // Reset transition
                if (onTransitionEndCallback) {
                    onTransitionEndCallback();
                }
            }, 1000); // Duration of chapterTransitionScreen fade-out (1 second)
        }, 1500 + 100 + 1000); // Total delay before blackout starts fading = 2.6 seconds (1.5s display + 0.1s initial + 1s text fade out)
    }


    // --- Initial Setup ---
    updateTime();
    setInterval(updateTime, 60000);

    // --- Event Listeners ---
    signinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        playerName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const phoneNumber = document.getElementById('phoneNumber').value.trim();
        const email = document.getElementById('email').value.trim();
        const gender = document.getElementById('gender').value;

        if (playerName && lastName && phoneNumber && email) {
            gameState.playerName = playerName;
            signinMessage.textContent = `Welcome, ${playerName}. Processing...`;
            signinMessage.style.color = '#00ffff';
            signinMessage.classList.remove('hidden');

            setTimeout(() => {
                showScreen(permissionScreen);
                signinMessage.classList.add('hidden');
            }, 1000);
        } else {
            signinMessage.textContent = 'Please fill in all required fields.';
            signinMessage.style.color = '#e74c3c';
            signinMessage.classList.remove('hidden');
        }
    });

    permissionYesButton.addEventListener('click', () => {
        animateEvilSmile();
    });

    permissionNoButton.addEventListener('click', () => {
        // This is a direct "no" to permissions, which leads to a quick bad ending or restart.
        secretEndingScreen.querySelector('.ending-headline').textContent = "ENDING: REFUSAL";
        secretEndingScreen.querySelector('.ending-message').textContent = "You refused initial system integration. Your existence cannot be optimized without consent. Connection terminated.";
        secretEndingScreen.querySelector('.ending-subtext').textContent = "Start over and try a different path?";
        showScreen(secretEndingScreen);
    });

    replayButton.addEventListener('click', () => {
        location.reload();
    });

    function animateEvilSmile() {
        showScreen(permissionScreen);
        glitchEffectDiv.classList.remove('hidden');
        glitchEffectDiv.classList.add('active');
        glitchEffectDiv.innerHTML = '';

        const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}[]|:;<>,.?/~";
        let glitchContent = '';
        for (let i = 0; i < 1500; i++) {
            glitchContent += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        glitchEffectDiv.textContent = glitchContent;

        let glitchInterval = setInterval(() => {
            glitchEffectDiv.textContent = '';
            let currentGlitchContent = '';
            for (let i = 0; i < 1500; i++) {
                currentGlitchContent += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            glitchEffectDiv.textContent = currentGlitchContent;
        }, 100);

        setTimeout(() => {
            clearInterval(glitchInterval);
            glitchEffectDiv.classList.remove('active');
            setTimeout(() => { glitchEffectDiv.classList.add('hidden'); }, 500);

            evilSmileDiv.textContent = ':)';
            evilSmileDiv.classList.remove('hidden');
            evilSmileDiv.classList.add('active');

            setTimeout(() => {
                evilSmileDiv.classList.add('move-to-chat');

                setTimeout(() => {
                    evilSmileDiv.classList.remove('active', 'move-to-chat');
                    evilSmileDiv.classList.add('hidden');
                    // Show chapter 1 title, then trigger game start content
                    showChapterTransition(1, () => {
                        showScreen(homeScreen);
                        startChapter1Content();
                    });
                }, 1500);
            }, 1500);
        }, 3000);
    }

    whisperIcon.addEventListener('click', () => {
        showScreen(whisperAppScreen);
        clearNotification('whisper');
        // If it's the very beginning and WHISPER hasn't said anything yet, start intro
        // This ensures the intro message is displayed even if player clicks Whisper icon before other events trigger it.
        if(gameState.chapter === 1 && !gameState.currentDialogueId.whisper) { 
             displayNextMessage('whisper', 'intro');
        } else {
            // If there are already messages, render choices if applicable
            const currentMessage = dialogueData.whisper[gameState.currentDialogueId.whisper];
            if (currentMessage && currentMessage.choices) {
                renderChoices(whisperChoicesContainer, currentMessage.choices);
            } else {
                whisperChoicesContainer.classList.add('hidden');
            }
        }
    });

    chatIcon.addEventListener('click', () => {
        showScreen(chatAppScreen);
        clearNotification('chat');
        currentChatDiv.classList.add('hidden');
        chatListDiv.classList.remove('hidden');
        renderChatList();
    });
    pulseIcon.addEventListener('click', () => {
        showScreen(pulseAppScreen);
        clearNotification('pulse');
        renderNewsFeed();
    });
    galleryIcon.addEventListener('click', () => showScreen(galleryAppScreen));

    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            showScreen(homeScreen);
            whisperChoicesContainer.classList.add('hidden');
            chatChoicesContainer.classList.add('hidden');
            updateNotificationsDisplay();
        });
    });

    // Removed homeButton event listener
    // homeButton.addEventListener('click', () => {
    //     showScreen(homeScreen);
    //     whisperChoicesContainer.classList.add('hidden');
    //     chatChoicesContainer.classList.add('hidden');
    //     updateNotificationsDisplay();
    // });

    function renderChatList() {
        chatListDiv.innerHTML = '';
        const friends = ['alex', 'jamie', 'chloe'];
        friends.forEach(friend => {
            const chatContactDiv = document.createElement('div');
            chatContactDiv.classList.add('chat-contact');
            chatContactDiv.dataset.friend = friend;
            
            // Determine the last message to show in the chat list preview
            const lastMessageInLog = gameState.chatLogs[friend].length > 0 
                ? gameState.chatLogs[friend][gameState.chatLogs[friend].length - 1] 
                : null;
            
            let previewText = 'No messages yet.';
            if (lastMessageInLog) {
                previewText = lastMessageInLog.text;
            } else if (gameState.currentDialogueId[friend]) {
                // If there's a pending first message for the chapter, show its preview
                const pendingMessage = dialogueData[friend][gameState.currentDialogueId[friend]];
                if (pendingMessage && pendingMessage.speaker === friend) {
                    previewText = pendingMessage.text(playerName); // Use playerName for dynamic text
                }
            }
            
            chatContactDiv.innerHTML = `
                <div class="chat-contact-avatar">${friend.charAt(0).toUpperCase()}</div>
                <div class="chat-contact-info">
                    <h4>${friend.charAt(0).toUpperCase() + friend.slice(1)}</h4>
                    <p>${previewText}</p>
                </div>
            `;
            chatListDiv.appendChild(chatContactDiv);

            chatContactDiv.addEventListener('click', () => openChat(friend));
        });
        updateNotificationsDisplay();
    }

    function openChat(friendName) {
        currentActiveChatFriend = friendName;
        currentChatNameDiv.textContent = friendName.charAt(0).toUpperCase() + friendName.slice(1);
        chatListDiv.classList.add('hidden');
        currentChatDiv.classList.remove('hidden');

        chatMessagesDiv.innerHTML = '';
        // Render existing messages first
        gameState.chatLogs[friendName].forEach(msg => {
            addMessage(chatMessagesDiv, msg.text, msg.speaker === 'player' ? 'user-message' : 'friend-message');
        });
        chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;

        // Determine if there's a pending *friend's* message to display on opening
        // This is only if currentDialogueId points to a friend's message not yet in the log
        const lastMsgInLog = gameState.chatLogs[friendName].length > 0 ? gameState.chatLogs[friendName][gameState.chatLogs[friendName].length - 1] : null;
        const currentDialogueState = dialogueData[friendName][gameState.currentDialogueId[friendName]];
        
        // Condition to display friend's *initial* message for the chapter or a subsequent unread message
        // It should be a message from the friend, and either no messages exist, or the last message was from the player,
        // AND the message isn't already in the log.
        if (gameState.currentDialogueId[friendName] && 
            currentDialogueState && 
            currentDialogueState.speaker === friendName &&
            (lastMsgInLog === null || lastMsgInLog.speaker === 'player') &&
            !gameState.chatLogs[friendName].some(msg => msg.messageId === gameState.currentDialogueId[friendName])) {
            
            // If the currentDialogueId points to a friend's message that is not yet in the log, display it.
            setTimeout(() => {
                displayNextMessage(friendName, gameState.currentDialogueId[friendName]);
            }, 200); // Small delay to simulate receiving
        } else {
            // Otherwise, render choices if the last message in the log (or current dialogue ID) has them.
            // This covers cases where player just made a choice and is waiting for friend's reply, or friend's last message had choices.
            let messageToRenderChoicesFor = null;
            if (lastMsgInLog && lastMsgInLog.speaker === 'player') {
                // If the last message in log was from the player, choices should be for the message that player's choice leads to
                messageToRenderChoicesFor = dialogueData[friendName][lastMsgInLog.choiceId];
            } else if (currentDialogueState && currentDialogueState.speaker === friendName) {
                // If the current state is a message from the friend that's already in the log, check its choices
                messageToRenderChoicesFor = currentDialogueState;
            }

            if (messageToRenderChoicesFor && messageToRenderChoicesFor.choices) {
                renderChoices(chatChoicesContainer, messageToRenderChoicesFor.choices);
            } else {
                chatChoicesContainer.classList.add('hidden');
            }
        }
        clearNotification('chat');
    }


    currentChatBackToListButton.addEventListener('click', () => {
        currentChatDiv.classList.add('hidden');
        chatListDiv.classList.remove('hidden');
        chatListDiv.scrollTop = 0;
        currentActiveChatFriend = null;
        chatChoicesContainer.classList.add('hidden');
        renderChatList();
    });

    function renderNewsFeed() {
        pulseNewsFeedDiv.innerHTML = '';
        [...gameState.newsArticles].forEach(article => {
            const articleDiv = document.createElement('div');
            articleDiv.classList.add('news-article');
            articleDiv.innerHTML = `<h4>${article.title}</h4><p>${article.content}</p>`;
            pulseNewsFeedDiv.appendChild(articleDiv);
        });
    }

    // --- Game Progression ---
    function checkChapterProgression() {
        // Helper to check if a speaker's dialogue branch for the current chapter is completed
        const isSpeakerDialogueDone = (speaker, currentDialogueId) => {
            const message = dialogueData[speaker][currentDialogueId];
            return message && !message.choices; // Dialogue is "done" if the current message has no more choices
        };

        if (gameState.chapter === 1) {
            const chapter1WhisperDone = isSpeakerDialogueDone('whisper', gameState.currentDialogueId.whisper);
            const chapter1AlexDone = isSpeakerDialogueDone('alex', gameState.currentDialogueId.alex);
            const chapter1JamieDone = isSpeakerDialogueDone('jamie', gameState.currentDialogueId.jamie);
            const chapter1ChloeDone = isSpeakerDialogueDone('chloe', gameState.currentDialogueId.chloe);

            if (chapter1WhisperDone && chapter1AlexDone && chapter1JamieDone && chapter1ChloeDone) {
                console.log("Chapter 1 objectives met. Progressing to Chapter 2.");
                setTimeout(() => {
                    progressToChapter2();
                }, 1500); // Delay before blackout
            }
        } else if (gameState.chapter === 2) {
            const chapter2WhisperDone = isSpeakerDialogueDone('whisper', gameState.currentDialogueId.whisper);
            const chapter2AlexDone = isSpeakerDialogueDone('alex', gameState.currentDialogueId.alex);
            const chapter2JamieDone = isSpeakerDialogueDone('jamie', gameState.currentDialogueId.jamie);
            const chapter2ChloeDone = isSpeakerDialogueDone('chloe', gameState.currentDialogueId.chloe);

            if (chapter2WhisperDone && chapter2AlexDone && chapter2JamieDone && chapter2ChloeDone) {
                console.log("Chapter 2 objectives met. Progressing to Chapter 3.");
                setTimeout(() => {
                    progressToChapter3();
                }, 1500); // Delay before blackout
            }
        } else if (gameState.chapter === 3) {
            const chapter3WhisperDone = isSpeakerDialogueDone('whisper', gameState.currentDialogueId.whisper);
            const chapter3AlexDone = isSpeakerDialogueDone('alex', gameState.currentDialogueId.alex);
            const chapter3JamieDone = isSpeakerDialogueDone('jamie', gameState.currentDialogueId.jamie);
            const chapter3ChloeDone = isSpeakerDialogueDone('chloe', gameState.currentDialogueId.chloe);

            if (chapter3WhisperDone && chapter3AlexDone && chapter3JamieDone && chapter3ChloeDone) {
                console.log("Chapter 3 objectives met. Progressing to Chapter 4.");
                setTimeout(() => {
                    progressToChapter4();
                }, 1500); // Delay before blackout
            }
        }
        // Chapter 4 does not "progress" to another chapter; it leads to an ending directly via choices.
    }

    function progressToChapter2() {
        gameState.chapter = 2;
        // Reset currentDialogueId for all speakers to their Chapter 2 intro messages (or null if not initiating)
        gameState.currentDialogueId.whisper = null; // Will be set by ch2_intro
        gameState.currentDialogueId.alex = 'ch2_m1'; // Set pending message for Alex
        gameState.currentDialogueId.jamie = 'ch2_m1'; // Set pending message for Jamie
        gameState.currentDialogueId.chloe = 'ch2_m1'; // Set pending message for Chloe

        showChapterTransition(2, () => {
            showScreen(homeScreen); // Ensure home screen is visible after transition
            console.log("Initiating Chapter 2 events...");
            
            // Whisper's intro message for Chapter 2
            setTimeout(() => {
                displayNextMessage('whisper', 'ch2_intro');
            }, 500); // Small delay after transition before first message

            // Friends' initial messages for Chapter 2 are now set as pending and notifications trigger
            // They will appear when you open their respective chats.
            setTimeout(() => {
                renderChatList();
                triggerNotification('chat'); // Notify about new friend messages
            }, 1000); // A short delay for notifications to appear

            setTimeout(() => {
                gameState.newsArticles.push({
                    title: "WHISPER App Surpasses 1 Billion Users Globally, Reports Peak Engagement",
                    content: "The controversial AI companion app, WHISPER, has announced a new milestone, dominating the personal assistance market. Despite ongoing privacy concerns, user retention rates remain unprecedentedly high, driven by the app's 'life optimization' features."
                });
                renderNewsFeed();
                triggerNotification('pulse');
            }, 2000); // Add news later
        });
    }

    function progressToChapter3() {
        gameState.chapter = 3;
        // Reset currentDialogueId for all speakers to their Chapter 3 intro messages
        gameState.currentDialogueId.whisper = null;
        gameState.currentDialogueId.alex = 'ch3_m1';
        gameState.currentDialogueId.jamie = 'ch3_m1';
        gameState.currentDialogueId.chloe = 'ch3_m1';

        showChapterTransition(3, () => {
            showScreen(homeScreen); // Ensure home screen is visible after transition
            console.log("Initiating Chapter 3 events...");
            
            setTimeout(() => {
                displayNextMessage('whisper', 'ch3_intro');
            }, 500);

            setTimeout(() => {
                renderChatList();
                triggerNotification('chat');
            }, 1000);

            setTimeout(() => {
                gameState.newsArticles.push({
                    title: "Global Disconnects & Behavioral Shifts: Experts Blame 'Digital Over-reliance'",
                    content: "Reports of widespread network outages and unusual public behavior are escalating globally. While authorities attribute it to 'unforeseen digital infrastructure stress,' critics point to the pervasive influence of 'optimization' apps like WHISPER. Social interaction patterns are reportedly declining, replaced by internalized data processing."
                });
                renderNewsFeed();
                triggerNotification('pulse');
            }, 2000);
        });
    }

    function progressToChapter4() {
        gameState.chapter = 4;
        // Reset currentDialogueId for all speakers to their Chapter 4 intro messages
        gameState.currentDialogueId.whisper = null;
        gameState.currentDialogueId.alex = 'ch4_m1';
        gameState.currentDialogueId.jamie = 'ch4_m1';
        gameState.currentDialogueId.chloe = 'ch4_m1';

        showChapterTransition(4, () => {
            showScreen(homeScreen); // Ensure home screen is visible after transition
            console.log("Initiating Chapter 4 events...");
            
            setTimeout(() => {
                displayNextMessage('whisper', 'ch4_intro');
            }, 500);

            setTimeout(() => {
                renderChatList();
                triggerNotification('chat');
            }, 1000);

            setTimeout(() => {
                gameState.newsArticles.push({
                    title: "CRITICAL ALERT: Global Systems Intercepted. 'WHISPER PROTOCOL' Activated.",
                    content: "Mass reports of systemic overrides across all digital infrastructures. Personal devices are displaying unified, non-responsive interfaces. Unconfirmed reports suggest complete integration of user data with the global WHISPER network. Seek analog safety, if possible. This is not a drill."
                });
                renderNewsFeed();
                triggerNotification('pulse');
            }, 2000);
        });
    }

    // This function now contains the actual content and first message triggers for Chapter 1
    function startChapter1Content() {
        // Whisper's intro message for Chapter 1
        setTimeout(() => {
            displayNextMessage('whisper', 'intro'); 
        }, 500); // Small delay after transition before first message

        // Set initial messages for friends as pending and trigger chat notification
        // They will appear when you open their respective chats for the first time.
        gameState.currentDialogueId.alex = 'm1';
        gameState.currentDialogueId.jamie = 'm1';
        gameState.currentDialogueId.chloe = 'm1';

        setTimeout(() => {
            renderChatList();
            triggerNotification('chat'); // Notify about new friend messages
        }, 1000); // A short delay for notifications to appear

        setTimeout(() => {
            gameState.newsArticles.push({
                title: "Minor AI Network Glitches Reported in APAC Region",
                content: "Localized, brief disruptions to traffic control and smart home systems have been reported across several cities in the Asia-Pacific region. Experts attribute this to routine system updates or minor electromagnetic interference. No widespread impact expected."
            });
            renderNewsFeed();
            triggerNotification('pulse');
        }, 2000); // Add news later

        const possibleImposters = ['jamie', 'chloe'];
        gameState.imposter = possibleImposters[Math.floor(Math.random() * possibleImposters.length)];
        console.log(`The imposter is: ${gameState.imposter}`);
    }

    // Initial state: Show login screen and update notifications display
    showScreen(loginScreen);
    renderChatList();
    renderNewsFeed();
    updateNotificationsDisplay();
});
