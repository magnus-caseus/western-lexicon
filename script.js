// ====start Data====
var root = document.body;
var synth = window.speechSynthesis;

if (typeof synth === 'undefined') {
  alert('Speech Synthesis is not supported on this browser. See https://caniuse.com/?search=Speech%20Synthesis for browser support.')
}

var voices = [];
var voice = {}
var prevVoiceLength = 0;
var voiceTestString = "Hello there.";

var deck = {}; // deck obj for edit page
var deckIndex = 0;

var g = { // g means Game
  question: "",
  answer: "",
  answerAttempt: "",
  answerSubmitted: false,
  feedback: "",
  qaPairs: [],
  qaPair: {},
  qaPairIndex: 0,
  inProgress: false,
  correctCount: 0,
  incorrectCount: 0
}
var d = [
  {
    "name": "Going Free Glossary",
    "cards": [
      {
        "q": "An advocate of ideas rather than the people who create and sustain the ideas, as exemplified by those who advocate Western culture (philosophy, law and order, economy, civility, morals etc.) without advocating for Westernkind.",
        "a": "Abstractionist"
      },
      {
        "q": "A perspective promoted by antiwhites that leads to antiwhite conclusions. E.g. selectively ignoring or minimizing the suffering of Westmen while emphasizing the suffering of nonwhites, or holding Westmen to higher standards of morality and agency while providing endless excuses for the behaviors of nonwhites.",
        "a": "Antiwhite Lens"
      },
      {
        "q": "The dominant narrative in the West, wherin Westmen are the antagonists and antiwhites are the protagonists. A product of antiwhiteism, the \"blank blank\" is imposed on Western Civilization by antiwhites who dominate the nerve centers of the Regime",
        "a": "Antiwhite Narrative"
      },
      {
        "q": "The first of the two components of an MP. The \"blank blank\" of an MP is the actual antiwhite belief, that is on some level of consciousness accepted as true by the mind. E.g. \"Westmen didn't create Western Civilization, they stole it.\" The second component of the MP, the interpretive mandate, dictates an emotional response to the \"blank blank\"",
        "a": "Antiwhite Precept"
      },
      {
        "q": "A TFT/MC tool/formula to understand and predict antiwhite thoughts and behavior.",
        "a": "Antiwhite Screed"
      },
      {
        "q": "All oral and written communication that directly or indirectly inflicts harm on White Wellbeing or those serving White Wellbeing. For example, the word \"racist\" is an \"blank blank\". \"blank blank\" are individiual pieces of the language of white oppression, which has reinforced and legitimized by its use.",
        "a": "Antiwhite Slur"
      },
      {
        "q": "Meetings/hearings (in various contexts, such as work and school) wherein Westmen are interrogated, investigated, terrorized, humiliated, and punished (as heretics) for deviating from antiwhiteism in thought, word, or deed.",
        "a": "Antiwhite Tribunals"
      },
      {
        "q": "People, thoughts, deeds, laws/policies/rules and organizational entities that are inimical to the Wellbeing of Westernkind.",
        "a": "Antiwhite"
      },
      {
        "q": "All concepts, ideologies, actions and everything deriving therefrom (such as opinions, policies, laws, rules) that inflict injury on Westernkind and Western Civilization.",
        "a": "Antiwhiteism"
      },
      {
        "q": "A process that aligns Westmen with the archetype of Westernkind, which—among other objectives—unleashes the indomitable Western Spirit within them. This process is called Going Free. Aligning with the archetype is the goal of Going Free.",
        "a": "Archetype Alignment Protocol"
      },
      {
        "q": "Crudely defined as instinct, 'blank' is the natural, historic, and expected thought and behavioral patterns distinct to a people.",
        "a": "Bio-Spirit"
      },
      {
        "q": "The broadly recognizable expressions of each race of man, which projected onto their environments is their cultures. 'blank'—as it intersects with environment—is synonymous with the word culture.",
        "a": "Bio-Spiritual Expression"
      },
      {
        "q": "The irreconcilability of bio-spiritual expressions among the peoples of man. 'Blank' precludes multiracial societies, as bio-spiritual discomfort is the basis of violent balkanization.",
        "a": "Bio-Spiritual Incompatibility"
      },
      {
        "q": "People and depictions of people (in art, children's toys etc.) that are race and sexless.",
        "a": "Chimeras"
      },
      {
        "q": "An AAP technique by which Prometheans—cued and triggered by internal and external MPs—consciously create counter triggers in the subconscious mind by vocally or internally reciting a counter assertion.",
        "a": "Confront, Challenge, Dispel (CCD)"
      },
      {
        "q": "A countervailing statement (uttered vocally or internally) that aggressively counters an MP.",
        "a": "Counter Assertion"
      },
      {
        "q": "A consciously created subconscious mechanism for the negation of MPs and white-noir. 'Blanks' are triggered by the triggered MPs with which a person is infected",
        "a": "Counter Trigger"
      },
      {
        "q": "The bio-spiritual expression of a race of people projected onto their environment and reflected back from that environment.",
        "a": "Culture"
      },
      {
        "q": "An ancillary term for the AAP (Going Free), referencing an aspect of the AAPs design that enables it to spread easily from person to person.",
        "a": "Curative Contagion"
      },
      {
        "q": "An AAP technique by which Prometheans exercise, develop, deepen, and explore the knowledge and skillsets they have acquired for Going Free. The technique involves challenging antiwhiteism and sharing personal success stories in Internet forums, community newspapers etc.",
        "a": "Face Antiwhiteism"
      },
      {
        "q": "The application and practice of AAP. Aligning with the archetype of Westernkind is the goal of 'blank'.",
        "a": "Going Free"
      },
      {
        "q": "The synergistic and exponential momentum manifested by milestones that signify the increassing impossibility of arresting momentum.",
        "a": "Great White Awakening"
      },
      {
        "q": "Any covert act—committed by on or more antiwhites in the guise of a white person or people—that conforms to the Antiwhite Narrative and thereby demonizes Westmen is a 'blank'. 'Blanks' draw the noose of suspicion around the throats of all white people, and thereby are \"hate crimes\" against our entire race. Such crimes are used to \"justify\" past, present, and future harm to Westernkind.",
        "a": "Hate Hoax"
      },
      {
        "q": "Deviation from antiwhiteism.",
        "a": "Heresy"
      },
      {
        "q": "All acts that victimize one or more Westmen and by so doing contradict and or disprove the Antiwhite Narrative, and are therefore downplayed, ignored, or given comparatively little publicity/attention by antiwhites. Not all 'blank' are \"criminal\"; some are legal but socially condemned acts. Debunked hate hoaxes routinely become 'blank'. 'Blank' is a powerful MC because the premise reveals the truth about antiwhite domination of Regime news and entertainment media.",
        "a": "Hush Crime"
      },
      {
        "q": "The second of the two components of an MP. The 'blank' of an MP is a form of mental programming that dictates how we are supposed to feel about the first component of an MP: the antiwhite precept.",
        "a": "Interpretive mandate"
      },
      {
        "q": "Also known as the bunker mindset is the destructive belief that the best course for White Wellbeing is isolating one's family with several other families on small farmsteads in \"remote\" territories.",
        "a": "Isolationism"
      },
      {
        "q": "The fundamental motivations of the antiwhite. Envy is specifically delineated from jealousy as a feeling of discontent/resentment/covetousness of Westernkind's successes, possessions, history, etc., whereas jealousy is anger/rage for a perceived rival who has or is likely to triumph in competition.",
        "a": "Jealousy and Envy"
      },
      {
        "q": "An AAP technique by which Prometheans, Wellbeing advocates, live their lives and frame their thoughts so as not to conflict with Going Free. It means that Wellbeing advocates server the welfare of the community for White Wellbeing (In the phraseology of Prometheus Rising, Prometheans serve the well-being of the Prometheum, which is the Promethean community.), ensuring the rapid growth, dissemination, and success of our community. White Wellbeing advocates acknowledge that Western kind is the most victimized people—persecuted, exploited, and psychologically abused for the totality of their lives. As such, to 'blank' means that Wellbeing advocates consider transgressions against Westmen (who are not antiwhite) to be shameful and disgraceful beyond compare.",
        "a": "Keep it Promethean (KIP)"
      },
      {
        "q": "Concepts/perspectives, such as \"numerical courage,\" \"multiracial harmonizing,\" and \"there is no excellence where there is equality\" the opposite of Meme-Pathogens.",
        "a": "Meme-Curatives (MCs)"
      },
      {
        "q": "MPs used in combination to support (and seemingly validate) each other.",
        "a": "Meme-Pathogen Montage"
      },
      {
        "q": "Antiwhite precepts bolstered by interpretive mandates that produce white-noir (physical, mental, emotional, and spiritual sickness/disease) in Westernkind. 'Blanks' are lesions on our bodies, minds, and spirits. Simplistically, a 'blank' is a belief that is destructive for white people.",
        "a": "Meme-Pathogens (MPs)"
      },
      {
        "q": "The pretexts (and the creation of such pretexts) employed by antiwhites to \"legitimize\" and \"justify\" the harm they inflict on Westmen and Western Civilization.",
        "a": "Moralize, Intellectualize, Sentimentalize (MIS)"
      },
      {
        "q": "Efforts designed to ameliorate the progressive tension/hostility between racial/ethnic groups in racially/ethnically diverse populations. Such efforts take various forms and consume massive resources in time, money, energy, and intelligence.",
        "a": "Multiracial Harmonizing"
      },
      {
        "q": "The point at which nonwhites (within Western countries) manifest and project their bio-spiritual expressions on Western Civilization. Prior to achieving 'blank', nonwhites are in a state of numerical diffidence. Once 'blank' is achieved, however, nonwhites increasingly exert and impose their bio-spiritual expressions (which are at variance with Western expression) on Western society.'",
        "a": "Numerical Courage"
      },
      {
        "q": "Prior to achieving numerical courage, nonwhites are in a state of 'blank'. While in this state, nonwhites superficially conform to the bio-spiritual expression of Westernkind.",
        "a": "Numerical Diffidence"
      },
      {
        "q": "The social, moral/ethical, and legal imperatives with which antiwhites have structured society so as to advance, enrich, and empower nonwhites at the expense of, detriment to, and ruination of whites.",
        "a": "Pervasive Antiwhiteism and Structural Inequities"
      },
      {
        "q": "The aggregate of one's bio-spiritual potentialities to manifest, attain, and satisfy one's desires. 'Blank' is limited by internal and external factors: Internally, one's unique bio-spiritual composition or architecture establishes one's potentialities. External forces—specifically MPs—undermine the attainment of internal potentialities by inflicting white-noir—reducing one's abilities to manifest, attain, and satisfy one's desires. 'Blank' can be positively and negatively influenced throughout life. By Going Free and reducing white-noir, one increases one's 'blank'.",
        "a": "Potential-to-Power (PTP)"
      },
      {
        "q": "All people, places, and things that are robustly Western.",
        "a": "Pristine"
      },
      {
        "q": "A person who is Going Free. Also an adjective meaning to be befitting of someone Going Free. In reference to the dignity and honorable behavior of the Prometheans in Prometheus Rising.",
        "a": "Promethean"
      },
      {
        "q": "A book by Jason Köhne presenting an inspirational and edifying myth, crafted for teh advancement of Westernkind.",
        "a": "Prometheus Rising"
      },
      {
        "q": "The governments, national and international banks, news and entertainment media, academia and all institutions influenced by these entities.",
        "a": "Regime"
      },
      {
        "q": "The rewrite of history to conform to the Antiwhite Narrative and facilitate white erasure.",
        "a": "Erasure History"
      },
      {
        "q": "Putting one's reputation on the line by repeating the thoughts of content producers to one's friends and family.",
        "a": "Reputational Investment"
      },
      {
        "q": "Any speech or activity, such as support shaming and virtue trapping, which undermines—in any way—a Wellbeing advocate's work for White Wellbeing.",
        "a": "Road Blocking"
      },
      {
        "q": "To improve the lives and structural supports of Westernkind and its expressions.",
        "a": "Serve White Wellbeing"
      },
      {
        "q": "Economic, social, and psychological attacks zealously inflicted by antiwhites on those who intentionally or unintentionally express opinions, or engage in acts at variance with antiwhiteism. 'Blank' often results in alienation from family and friends, as well as loss of employment and therefore all of the concomitant losses, i.e., standard of living, health care, insurance, home, automobile, etc.",
        "a": "Social Lynching"
      },
      {
        "q": "Criticizing an advocate for White Wellbeing—with the intent to undermine his or her efforts for White Wellbeing—for accepting and/or asking for various forms of support: volunteer, financial, etc. Note: withholding or questioning support to newcomers in the white positive sphere is not support shaming. Such individuals have to prove themselves worthy of support with self-sacrifice and a history of successful advocacy for White Wellbeing.",
        "a": "Support Shaming"
      },
      {
        "q": "Another term for meme-curatives (MCs).",
        "a": "Tactical Frames of Thought (TFTs)"
      },
      {
        "q": "People who have not come into contact with any form of antiwhiteism, or those who are not firmly antiwhite but who speak, write, and act (virtue signal) in ways that conform to the Antiwhite Narrative.",
        "a": "Vagues"
      },
      {
        "q": "Virtue signaling antiwhiteism.",
        "a": "Villainy signal"
      },
      {
        "q": "Criticizing an advocate for White Wellbeing—with the intent to undermine his or her efforts for White Wellbeing—for not \"perfectly\" exemplifying a virtue that Wellbeing advocates maintain as necessary for a healthy life and community.",
        "a": "Virtue Trapping"
      },
      {
        "q": "Another term for White Wellbeing. Sometimes used as a pithier descriptor for something that serves White Wellbeing, such as 'blank' art (art that serves White Wellbeing), and 'blank' advocates (people who serve White Wellbeing).",
        "a": "Wellbeing"
      },
      {
        "q": "White people as a collective and as a historical entity.",
        "a": "Westernkind"
      },
      {
        "q": "A white person.",
        "a": "Westman"
      },
      {
        "q": "White people and white people as a collective.",
        "a": "Westmen"
      },
      {
        "q": "The degradation and replacement of Westernkind and its expressions/culture with nonwhites and their expressions/cultures.",
        "a": "White Erasure"
      },
      {
        "q": "White individuals or people fleeing—physically or mentally—from discomfort, such as bio-spiritual disharmony, physical danger by antiwhites, white-guilt, white-noir etc. Examples are moving one's place of residence; quietism; drug use; self-mutilation; dating, marring and reproducing with nonwhites etc. The ultimate form of 'blank' is suicide.",
        "a": "White Flighting"
      },
      {
        "q": "The totality of all individuals, ideas, and entities that share at least one common element: a concern for the welfare of Westernkind. These individuals, ideas, and entities can be mutually contradictory in other areas.",
        "a": "White Positive Sphere"
      },
      {
        "q": "Concern for the welfare of Westernkind.",
        "a": "White Positive"
      },
      {
        "q": "One of the most destructive elements of white-noir, 'blank' infects Westmen with culpability for the real and fabricated \"wrongdoings\" of Westmen throughout history. It obligates us to pay a \"debt\" and \"make amends\" by way of surrender, atonement, and suffering. 'Blank' develops in Westmen as a result of being 'blanked' by antiwhites.",
        "a": "White-Guilt"
      },
      {
        "q": "Multidimensional and pervasive physical, mental, emotional, and spiritual trauma suffered by Westmen as a consequence of MP infection and living in antiwhite societies.",
        "a": "White-Noir"
      },
      {
        "q": "The welfare of Westernkind and its expressions.",
        "a": "White Wellbeing"
      }
    ]
  },
  {
    "name": "Going Free Acronyms",
    "cards": [
      {
        "q": "AAP",
        "a": "Archetype Alignment Protocol"
      },
      {
        "q": "CCD",
        "a": "Confront, Challenge, Dispel"
      },
      {
        "q": "CP",
        "a": "Common Person"
      },
      {
        "q": "KIP",
        "a": "Keep it Promethean"
      },
      {
        "q": "MC",
        "a": "Meme-Curative"
      },
      {
        "q": "MIS",
        "a": "Moralize, Intellectualize, Sentimentalize"
      },
      {
        "q": "MP",
        "a": "Meme-Pathogen"
      },
      {
        "q": "MPM",
        "a": "Meme-Pathogen Montage"
      },
      {
        "q": "PTP",
        "a": "Potential-to-Power"
      },
      {
        "q": "TFT",
        "a": "Tactical Frame of Thought"
      }
    ]
  }
];
var lss = {};
if (typeof localStorage.getItem('settings') === 'string') {
  lss = JSON.parse(localStorage.getItem('settings')); // get localStorage settings
}

var s = { // s means Settings, applying localStorage settings or using a default value
  rate: typeof lss.rate === 'string' ? lss.rate : '1',
  pitch: typeof lss.pitch === 'string' ? lss.pitch : '1',
  volume: typeof lss.volume === 'string' ? lss.volume : '1',
  voiceName: typeof lss.voiceName === 'string' ? lss.voiceName : '',
  theme: typeof lss.theme === 'string' ? lss.theme : 'light',
  caseSensitive: 'insensitive'
}

document.body.className = s.theme;


if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}
// ====end Data====

// ====start Functions====
function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
    const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
    if ( aname < bname ) return -1;
    else if ( aname == bname ) return 0;
    else return +1;
  });
  if (voices.length > 0) {
    if (s.voiceName === '') {
      if (localStorage.getItem('settings') && localStorage.getItem('settings').voice) {
        s.voiceName = localStorage.getItem('settings').voice;
      } else {
        s.voiceName = voices[0].name;
      }
    }
    voice = getVoice();
    m.redraw();
  }
}

function voiceSelectOptionsChange() {
  var voiceSelect = document.getElementById('voice_select');
  if(voiceSelect.options.length > 0 && voiceSelect.options.length >= voices.length) {
    voiceSelect.options[voices.indexOf(voice)].selected = true;
  }
}

function voiceSelectOnUpdate() {
  if (voices.length > 0 && voices.length !== prevVoiceLength) {
    voiceSelectOptionsChange();
  }
  prevVoiceLength = voices.length;
}

function setNextQuestion() {
  g.feedback = "";
  g.answerAttempt = "";
  g.answerSubmitted = false;
  if (g.qaPairs.length > 0) {
    g.qaPairIndex = Math.floor(Math.random() * g.qaPairs.length);
    g.qaPair = g.qaPairs[g.qaPairIndex];
    g.question = g.qaPair.q;
    g.answer = g.qaPair.a;
    speak(g.question);
  } else {
    clearGame();
    g.feedback = "Congratulations! You've Actively Recalled every concept!"
    speak(g.feedback);
  }
  m.redraw();
}

function setButtonHighlight(buttonName) {
  document.getElementById('game_btn').classList.remove("btn_highlight");
  document.getElementById('decks_btn').classList.remove("btn_highlight");
  document.getElementById('settings_btn').classList.remove("btn_highlight");
  document.getElementById(buttonName).classList.add("btn_highlight");
}

function cloneObj(orig) {
  return JSON.parse(JSON.stringify(orig));
}

function clearGame() {
  g.question = "";
  g.answer = "";
  g.answerAttempt = "";
  g.feedback = "";
  g.qaPairs = [];
  g.qaPair = {};
  g.qaPairIndex = 0;
  g.inProgress = false;
  g.correctCount = 0;
  g.incorrectCount = 0;
}
  
function loadGame(deck) {
  clearGame();
  g.inProgress = true;
  g.qaPairs = cloneObj(deck);
  setNextQuestion();
}

function submitAnswer() {
  if (g.inProgress) {
    if(!g.answerSubmitted) {
      g.answerSubmitted = true;
      if (g.answerAttempt === g.answer || (s.caseSensitive === 'insensitive' && g.answerAttempt.toLowerCase() === g.answer.toLowerCase())) {
        g.qaPairs.splice(g.qaPairs.indexOf(g.qaPair), 1);
        g.correctCount++;
        g.feedback = `"${g.answerAttempt}" is the correct answer!`;
      } else {
        g.incorrectCount++;
        g.feedback = `"${g.answerAttempt}" is incorrect. The correct answer is "${g.answer}"`;
      }
      speak(g.feedback, setNextQuestion);
    } else {
      synth.cancel();
      setNextQuestion();
    }
  } else {
    g.question = 'Select a deck to play';
    speak(g.question);
    m.route.set('/decks');
  }
}

function getVoice() {
  for(i = 0; i < voices.length ; i++) {
    if(voices[i].name === s.voiceName) {
      return voices[i];
    }
  }
}

function speak(text, onend){
  if (synth.speaking) {
    synth.cancel();
  }
  if (text !== '' && s.voiceName !== '') {
    var utterThis = new SpeechSynthesisUtterance(text);
    utterThis.onend = function (event) {
      if (typeof onend === 'function') {
        onend(event);
      }
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }
    utterThis.voice = getVoice();
    utterThis.pitch = s.pitch;
    utterThis.rate = s.rate;
    utterThis.volume = s.volume;
    synth.speak(utterThis);
  }
}

function createNewDeck() {
  d.push({
    name: 'New Deck',
    cards: [
      {
        q: '',
        a: ''
      }
    ]
  });
}
// ====end Functions====

// ====start Mithril Components====
var Main = {
  view: function() {
    return m("main", [
      m(Header),
      m("div", {id: "content"}, [
        
      ])
    ])
  }
}

var Header = {
  view: function() {
    return m("header", [
      m("h1", "Western Lexicon"),
      m('div', [
        m('button', {id: 'game_btn', onclick: function() {m.route.set("/game")}}, "Game"),
        m('button', {id: 'decks_btn', onclick: function() {m.route.set("/decks")}}, "Decks"),
        m('button', {id: 'settings_btn', onclick: function() {m.route.set("/settings")}}, "Settings")
      ])
    ]);
  }
};

var Game = {
  oncreate: function() {
    setButtonHighlight('game_btn');
    if (!g.inProgress) {
      g.question = 'Select a deck to play';
      // m.redraw();
    }
  },
  view: function() {
    return m("section", {class: 'game_section'}, [
      m(scoreBoard),
      m(gameBoard)
    ])
  }
}

var scoreBoard = {
  view: function() {
    return m('div', {class: 'score_board'}, [
      m('h3', 'Scoreboard'),
      m('p', [
        m('span', 'Remaining'),
        m('span', g.qaPairs.length)
      ]),
      m('p', [
        m('span', 'Correct'),
        m('span', g.correctCount)
      ]),
      m('p', [
        m('span', 'Incorrect'),
        m('span', g.incorrectCount)
      ])
    ]);
  }
};

var gameBoard = {
  view: function() {
    return m('div', {class: 'game_board'}, [
      m("p", {class: "question"}, g.question),
      m(answerForm),
      m("p", {class: "feedback"}, g.feedback)
    ]);
  }
};

var answerForm = {
  view: function() {
      return m("form", {
        onsubmit: function(e) {
            e.preventDefault();
            submitAnswer(e);
        }
      }, [
          m("input.input[type=text][placeholder=Type answer here...][autocomplete=off]", {
            oncreate: function() {document.getElementById('answer_attempt').focus()},
            oninput: function (e) {g.answerAttempt = e.target.value},
            value: g.answerAttempt,
            id: "answer_attempt"
        }),
          m("button.button[type=submit]", "Submit"),
      ])
  }
}

var Decks = {
  oncreate: function() {
    setButtonHighlight('decks_btn');
  },
  view: function() {
    return m('div', {class: 'decks_container'},
    [
      // m('h2', 'Decks'),
      d.map(function(i, iIndex) {
        return m("div", {class: 'deck_container'}, [
        m('div', {class: 'flex-row'}, [
          m('h3', i.name),
          m('span', {class: 'card_count'}, i.cards.length + ' Cards')
        ]),
        m('div', {class: 'flex-row'}, [
          m('button', {
            class: 'inverse',
            onclick: function(){
              clearGame();
              m.route.set('/edit/' + d.indexOf(i));
            } 
          }, 'View'),
          m('button', {
            onclick: function() {
              loadGame(i.cards);
              m.route.set('/game')
            }
          }, 'Play')
        ]),
      ])})
    ]);
  }
};

var Edit = {
  oninit: function(vnode) {
    deckIndex = vnode.attrs.index;
    deck = cloneObj(d[deckIndex]);
  },
  view: function() {
    return m('div', {class: 'cards_container'},
    [
      m('div', {class: 'flex-row around'}, [
        m('h2', deck.name),
        m('button', {
          onclick: function() {
            loadGame(deck.cards);
            m.route.set('/game')
          }
        }, 'Play Deck')
      ]),
      deck.cards.map(function(card, index, deckArr) {
        return m('div', {class: 'card_container'}, [
        m("form", {
          onsubmit: function(e) {
            e.preventDefault();
          }
        }, [
          m('h3', 'Card ' + (index+1) + '/' + deckArr.length),
          m('p', {class: 'question-label'}, 'Question'),
          m('p', card.q),
          m('p', {class: 'answer-label'}, 'Answer'),
          m('p', card.a)
        ])
      ])})
    ]);
  }
};

var Settings = {
  oncreate: function() {
    setButtonHighlight('settings_btn');
  },
  view: function() {
    return m("section", {id: "settings"}, [
      // m('h2', 'Settings'),
      m(speechSynthesisOptions),
      m(themeOptions)
    ]);
  }
};

var speechSynthesisOptions = {
  oncreate: function() {
    populateVoiceList();
  },
  view: function() {
    return m("form", {class: "voice_options"}, [
      m("h3", "Voice Options"),
      m("p", {class: "label_container rate"}, [
        m("label.label[for=rate]", "Rate"),
        m("span", {class: "value rate"}, s.rate),
      ]),
      m("input.input[type=range][min=0.5][max=2][step=0.1][id=rate]",
        {
          id: "rate",
          class: "speech_range",
          value: s.rate,
          onchange: e => {
            s.rate = e.target.value;
            localStorage.setItem('settings', JSON.stringify(s));
            speak(voiceTestString);
          }
        }
      ),
      m("p", {class: "label_container pitch"}, [
        m("label.label[for=pitch]", "Pitch"),
        m("span", {class: "value pitch"}, s.pitch),
      ]),
      m("input.input[type=range][min=0][max=2][step=0.1][id=pitch]",
        {
          id: "pitch",
          class: "speech_range",
          value: s.pitch,
          onchange: e => {
            s.pitch = e.target.value;
            localStorage.setItem('settings', JSON.stringify(s));
            speak(voiceTestString);
          }
        }
      ),
      m("p", {class: "label_container volume"}, [
        m("label.label[for=volume]", "Volume"),
        m("span", {class: "value volume"}, s.volume),
      ]),
      m("input.input[type=range][min=0][max=1][step=0.1][id=volume]",
        {
          id: "volume",
          class: "speech_range",
          value: s.volume,
          onchange: e => {
            s.volume = e.target.value;
            localStorage.setItem('settings', JSON.stringify(s));
            speak(voiceTestString);
          }
        }
      ),
      m('label[for=voice]', {class: "voice_label"}, 'Voice'),
      m('select[name=voice]', {
        value: s.voiceName,
        id: 'voice_select',
        onchange: e => {
          s.voiceName = voices[e.target.selectedIndex].name;
          localStorage.setItem('settings', JSON.stringify(s));
          speak(voiceTestString);
        },
        onupdate: voiceSelectOnUpdate
      }, [
        voices.map(i => m('option', { value: i.name, "data-lang": i.lang, "data-name": i.name }, i.name + ' (' + i.lang + ')' + (i.default ? " -- DEFAULT": '')))
      ])
    ]);
  }
};

var themeOptions = {
  oncreate: function() {
    document.getElementById(s.theme).checked = true;
  },
  view: function() {
    return m('div', {class: 'settings_option_container'}, [
      m('h3', 'Theme'),
      m('form', {
        class: 'radios_container',
        value: s.theme,
        onchange: e => {
          console.log('radio form value', e.target.value);
          s.theme = e.target.value;
          localStorage.setItem('settings', JSON.stringify(s));
          document.body.className = s.theme;
        }
      }, [
        m('div', {class: 'radio_container'}, [
          m('label[for=light]', 'Light'),
          m('input[type=radio][id=light][name=theme][value=light]')
        ]),
        m('div', {class: 'radio_container'}, [
          m('label[for=dark]', 'Dark'),
          m('input[type=radio][id=dark][name=theme][value=dark]')
        ])
      ])
    ]);
  }
};
// ====end Mithril Components====

// ====start Routing====
m.mount(root, Main);
m.route(document.getElementById('content'), "/decks", {
  "/decks": Decks,
  "/edit/:index": Edit,
  "/game": Game,
  "/settings": Settings
})
