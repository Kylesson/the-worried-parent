'use strict';

/* ---------- Content ---------- */

const STRATEGY = { 1: 'Listen first', 2: 'Show evidence', 3: 'Close with a plan' };

const NODES = {
  n1: {
    step: 1,
    scene: 'Mrs. Lin puts the test on the desk. There is a 74 at the top in red pen.',
    say: "Teacher, Andy got 74 on this test. Last time he got 92. And at home he says he doesn't like English anymore. I'm thinking maybe we should try another school.",
    zh: '老師，Andy這次考74分，上次還有92分。他在家說他不喜歡英文了。我在想，是不是要讓他換一間補習班。',
    tip: 'She came in with a decision half made. Your first job is to find out what is behind it. What could you say that lets her keep talking?',
    choices: [
      { id: 'a', text: "Don't worry, he's doing great! 74 is still a good score for grade 3.", score: 0, go: 'n1r',
        react: 'Mrs. Lin holds the test a little tighter.',
        fb: 'Reassuring too early can feel like brushing her off. She came with a worry. Try asking about it first.' },
      { id: 'b', text: 'Thank you for telling me. What did he say at home?', score: 2, go: 'n2', best: true,
        react: 'Mrs. Lin sits down on the bench by the desk.', say: 'OK. Let me tell you what he said.', zh: '好，我跟你說他怎麼講的。',
        fb: 'Thanking her and asking an open question shows you take the worry seriously. Now she can tell you the real story.' },
      { id: 'c', text: 'That test was hard for everyone. Lots of kids scored lower.', score: 0, go: 'n1r',
        react: 'Mrs. Lin raises her eyebrows.',
        fb: 'Defending the test moves the talk to the test, not to Andy. Try asking what she has seen at home.' }
    ]
  },
  n1r: {
    step: 1, recover: true,
    scene: 'Ms. Chen stops typing.',
    say: "So you think it's not a problem? He dropped 18 points.",
    zh: '所以你覺得沒問題嗎？他退步了18分耶。',
    tip: 'When a parent pushes back, it helps to name what she said, then ask a question.',
    choices: [
      { id: 'a', text: "You're right, I'm sorry. 18 points is a big drop. Can you tell me what he said at home?", score: 1, go: 'n2', best: true,
        react: 'Mrs. Lin pauses. She is still holding the test, but she nods.', say: 'OK.', zh: '好。',
        fb: 'Saying sorry and going back to a question gets the talk back on track. After a slip, trust takes a little longer to come back.' },
      { id: 'b', text: "Really, it's normal. Kids go up and down, and he'll do better next time.", score: 0, go: 'n2',
        react: 'Mrs. Lin looks at Ms. Chen, not at you.', say: 'Normal.', zh: '正常喔。',
        fb: 'Repeating the reassurance can sound like her worry was not heard. When a parent pushes back, stop and ask.' }
    ]
  },
  n2: {
    step: 2,
    scene: 'Mrs. Lin tells you more.',
    say: "He says the new unit has so much reading. He can't finish it. After class he's so tired he just lies on the sofa. I don't know if he's learning anything here.",
    zh: '他說新的單元閱讀好多，都讀不完。下課回家累到直接躺在沙發上。我不知道他在這裡到底有沒有學到東西。',
    tip: 'What could you put on the desk that shows how Andy is doing? Name one thing he does well and one thing to work on.',
    choices: [
      { id: 'a', text: "Can I show you his notebook and our points log? He's great at speaking up in class. The longer reading is new for him, and that's where we can help.", score: 2, go: 'n3', best: true,
        react: 'You open Andy\'s notebook. Mrs. Lin leans in.', say: "He answers questions in class? He never tells me that.", zh: '他上課會回答問題？他都沒跟我說。',
        fb: 'Showing his real work, with one strength and one gap, gives her something to see, not just words. The gap is specific, so it can be fixed.' },
      { id: 'b', text: 'I can give him extra reading homework every night, so he catches up with the new unit.', score: 0, go: 'n2r',
        react: 'Mrs. Lin frowns.',
        fb: 'More work is a quick fix, but she just told you he is tired. Try showing what is happening in class first.' },
      { id: 'c', text: 'Maybe a private tutor could help him with reading. A lot of parents here find one for the weekend.', score: 0, go: 'n2r',
        react: 'Mrs. Lin frowns.',
        fb: 'Sending her somewhere else can sound like the problem is not yours. Show what you see in class first.' }
    ]
  },
  n2r: {
    step: 2, recover: true,
    scene: 'Mrs. Lin shakes her head.',
    say: "He's already so tired. Adding more won't help.",
    zh: '他已經很累了。再加東西也沒用吧。',
    tip: 'She just told you the idea will not work. What do you have that shows how Andy is really doing?',
    choices: [
      { id: 'a', text: "You're right. Let me show you his notebook first. He speaks up a lot in class. The longer reading is the hard part.", score: 1, go: 'n3', best: true,
        react: 'Mrs. Lin looks at the notebook. She is still frowning, but she is reading it.',
        fb: 'Pulling back when an idea does not fit is a strength. His real work helps her see the whole picture.' },
      { id: 'b', text: 'I still think more practice outside class is the only way for him to catch up.', score: 0, go: 'n3',
        react: 'Mrs. Lin checks the time on her phone.',
        fb: 'Sticking with an idea she has turned down can feel like pressure. Showing his work would give you both the same picture.' }
    ]
  },
  n3: {
    step: 3,
    scene: "It's almost 9:00. Ms. Chen is closing the register. Time to wrap up.",
    say: 'So what do we do now?',
    zh: '那我們現在要怎麼辦？',
    tip: 'A good close answers three questions. What will we do? How will you know? When do we talk again?',
    choices: [
      { id: 'a', text: "Let's try a two-week plan. One small goal: he reads one short page with me in each class. Ms. Chen will send you a short LINE update every Friday. Can we talk again in two weeks?", score: 2, go: 'end', best: true,
        react: 'Mrs. Lin takes out her phone and writes it down.',
        fb: 'A small goal, a way to stay in touch and a date make the plan real. She knows what will happen and when.' },
      { id: 'b', text: "I'll keep an eye on it in class and let you know if anything changes.", score: 0, go: 'end',
        react: 'Mrs. Lin waits a moment for more.',
        fb: 'A promise with no detail is hard to trust. Try one small goal and a date.' },
      { id: 'c', text: 'Let me get the manager for you. The manager can explain our reading program better than I can.', score: 0, go: 'end',
        react: 'Mrs. Lin looks surprised.',
        fb: 'Handing off at the end can feel like stepping away. You know Andy best. Try to close with your own plan.' }
    ]
  }
};

const MAX_RAW = 6; // best path: 2 + 2 + 2
const PASS = 70;

const ENDINGS = {
  trust: { title: 'Trust built', mood: 'smile',
    text: 'Mrs. Lin takes a photo of the plan. She asks Ms. Chen to write the check-in in the book.',
    say: 'OK, two weeks. Thank you, teacher.', zh: '好，那就兩個禮拜。謝謝老師。' },
  truce: { title: 'Uneasy truce', mood: 'unsure',
    text: "Mrs. Lin puts the test back in her bag. She doesn't book a time.",
    say: "OK... we'll see.", zh: '好吧，再看看。' },
  leaves: { title: 'She leaves', mood: 'upset',
    text: 'Outside, someone from the school next door is handing out trial-class flyers. Mrs. Lin takes one.',
    say: 'Thank you, teacher.', zh: '謝謝老師。' }
};

const WARM = [
  { id: 'scores', label: 'Test scores', note: 'Very common. Scores are easy to see and compare. Have the student\'s work ready so you can talk about more than one number.' },
  { id: 'mood', label: "Their child's mood", note: 'A child who says "I don\'t like it" can worry a parent more than a low score. Ask what the child said.' },
  { id: 'money', label: 'Money and value', note: 'Cram school is a big cost for many families. Parents want to see what they get for it.' },
  { id: 'fair', label: 'Fairness', note: 'Parents notice if their child gets less attention than others. Be ready to show what you do for every student.' }
];

const CARD = [
  { title: 'Listen', lines: [
    ['Thank you for telling me.', '謝謝您跟我說。'],
    ['What did he say at home?', '他在家怎麼說？'],
    ['That sounds worrying. Can you tell me more?', '聽起來您很擔心，可以多說一點嗎？'] ] },
  { title: 'Show', lines: [
    ['Can I show you his notebook?', '我可以給您看他的筆記本嗎？'],
    ['Here is one thing he does well.', '這是他做得很好的地方。'],
    ['This is the part we will work on.', '這是我們接下來要加強的地方。'] ] },
  { title: 'Plan', lines: [
    ["Let's try one small goal for two weeks.", '我們先試兩個禮拜，定一個小目標。'],
    ["Here is what I'll do in class.", '這是我在課堂上會做的。'],
    ["Here is how you'll see if it works.", '這樣您就能看到他有沒有進步。'] ] },
  { title: 'Follow up', lines: [
    ['Ms. Chen will send you a LINE update on Fridays.', '陳老師每週五會用LINE跟您說明近況。'],
    ['Can we talk again on [date]?', '我們[日期]再聊一次好嗎？'],
    ['Thank you for coming in today.', '謝謝您今天特地過來。'] ] }
];

/* ---------- Avatars (inline SVG) ---------- */

const MOUTH = {
  worried: 'M32 55 Q40 51 48 55',
  upset: 'M31 56 Q40 49 49 56',
  unsure: 'M32 54 L48 54',
  calm: 'M32 53 Q40 57 48 53',
  smile: 'M30 52 Q40 61 50 52'
};

function avatar(who, mood) {
  const skin = { lin: '#f0c9a4', chen: '#e8b98f', you: '#c98e64' }[who];
  const hair = {
    lin: '<path d="M18 40 Q18 14 40 14 Q62 14 62 40 L62 58 Q58 50 56 34 Q40 28 24 34 Q22 50 18 58 Z" fill="#2b2420"/>',
    chen: '<circle cx="40" cy="12" r="8" fill="#3a2a22"/><path d="M20 38 Q20 17 40 17 Q60 17 60 38 Q54 27 40 26 Q26 27 20 38 Z" fill="#3a2a22"/>',
    you: '<path d="M21 36 Q22 16 40 16 Q58 16 59 36 Q52 25 40 24 Q28 25 21 36 Z" fill="#5a3b28"/>'
  }[who];
  const extra = who === 'chen'
    ? '<circle cx="33" cy="42" r="5" fill="none" stroke="#1f2a37" stroke-width="1.6"/><circle cx="47" cy="42" r="5" fill="none" stroke="#1f2a37" stroke-width="1.6"/><path d="M38 42 L42 42" stroke="#1f2a37" stroke-width="1.6"/>'
    : '';
  const brows = mood === 'upset'
    ? '<path d="M28 34 L36 36 M52 34 L44 36" stroke="#1f2a37" stroke-width="2" stroke-linecap="round"/>'
    : mood === 'worried' || mood === 'unsure'
      ? '<path d="M28 35 L36 33 M52 35 L44 33" stroke="#1f2a37" stroke-width="2" stroke-linecap="round"/>'
      : '';
  const m = MOUTH[mood] || MOUTH.calm;
  return '<svg class="av" viewBox="0 0 80 80" aria-hidden="true" focusable="false">' +
    '<circle cx="40" cy="40" r="39" fill="var(--av-bg)"/>' +
    '<path d="M16 80 Q16 64 40 64 Q64 64 64 80 Z" fill="var(--av-' + who + ')"/>' +
    '<circle cx="40" cy="40" r="20" fill="' + skin + '"/>' + hair + brows +
    '<circle cx="33" cy="42" r="2.2" fill="#1f2a37"/><circle cx="47" cy="42" r="2.2" fill="#1f2a37"/>' + extra +
    '<path d="' + m + '" fill="none" stroke="#1f2a37" stroke-width="2.2" stroke-linecap="round"/></svg>';
}

/* ---------- State ---------- */

const app = document.getElementById('app');
const progressEl = document.getElementById('progress');
const zhBtn = document.getElementById('zh-toggle');

const state = {
  path: [],        // [{node, choice}]
  zh: false,
  shownAt: 0,      // when the current decision appeared (for latency)
  started: Date.now(),
  nInteraction: 0,
  ended: false,
  best: null,      // best score so far (from the LMS or this visit); a retry never lowers it
  readyAt: 0       // ignore clicks for a moment after a new screen (stops double taps skipping a screen)
};

const rawScore = () => state.path.reduce((sum, p) => sum + choiceOf(p).score, 0);
const pct = () => Math.round((rawScore() / MAX_RAW) * 100);
const choiceOf = (p) => NODES[p.node].choices.find((c) => c.id === p.choice);
const endingKey = (score) => (score >= 80 ? 'trust' : score >= 50 ? 'truce' : 'leaves');

function nextNode() {
  if (!state.path.length) return 'n1';
  return choiceOf(state.path[state.path.length - 1]).go;
}

function lastMood() {
  if (!state.path.length) return 'worried';
  const s = choiceOf(state.path[state.path.length - 1]).score;
  return s === 2 ? 'calm' : s === 1 ? 'unsure' : 'upset';
}

function saveSuspend() {
  SCORM.set('cmi.suspend_data', state.path.map((p) => p.node + ':' + p.choice).join(','));
}

function loadSuspend(str) {
  const path = [];
  for (const part of str.split(',')) {
    const [node, choice] = part.split(':');
    if (!NODES[node] || !NODES[node].choices.some((c) => c.id === choice)) return [];
    path.push({ node, choice });
  }
  return path;
}

/* ---------- Rendering helpers ---------- */

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function bubble(who, name, text, zh, mood) {
  const zhLine = zh ? '<p class="zh" lang="zh-Hant"' + (state.zh ? '' : ' hidden') + '>' + esc(zh) + '</p>' : '';
  return '<div class="line line-' + who + '">' + avatar(who, mood) +
    '<div class="bubble"><p class="who">' + esc(name) + '</p><p>' + esc(text) + '</p>' + zhLine + '</div></div>';
}

function setProgress(step, recover) {
  if (!step) { progressEl.hidden = true; return; }
  progressEl.hidden = false;
  const dots = [1, 2, 3].map((n) => '<span class="dot' + (n < step ? ' done' : n === step ? ' now' : '') + '"></span>').join('');
  progressEl.innerHTML = '<span class="dots" aria-hidden="true">' + dots + '</span>' +
    '<span>Step ' + step + ' of 3' + (recover ? ' · second chance' : '') + '</span>';
}

function show(html, step, recover) {
  setProgress(step, recover);
  app.innerHTML = html;
  state.readyAt = Date.now() + 300;
  zhBtn.hidden = !app.querySelector('.bubble .zh');
  const h = app.querySelector('h1, h2');
  if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
  window.scrollTo(0, 0);
}

/* ---------- Screens ---------- */

function screenIntro(resumeTo) {
  show(
    '<section class="screen intro" data-screen="intro">' +
    '<p class="kicker">Training for new teachers · about 10 minutes</p>' +
    '<h1>The Worried Parent</h1>' +
    '<div class="desk" aria-hidden="true">' + avatar('chen', 'calm') + avatar('lin', 'worried') + avatar('you', 'calm') + '</div>' +
    '<p class="scene">It\'s 8:50 on a Thursday night. Your last class just left. You are packing up at the front desk when the door opens.</p>' +
    '<p class="scene">Mrs. Lin, Andy\'s mom, walks in. Andy is 9, in grade 3. She is holding his test paper. Ms. Chen, the front desk admin, looks up from the computer. She speaks Chinese and can help you.</p>' +
    (resumeTo
      ? '<p class="note">Welcome back. You stopped at step ' + (resumeTo === 'end' ? 3 : NODES[resumeTo].step) + ' of 3.</p>' +
        '<button class="btn primary" data-go="' + resumeTo + '">Pick up where I left off</button> ' +
        '<button class="btn" data-go="retry">Start over</button>'
      : '<button class="btn primary" data-go="goals">Start</button>') +
    '</section>');
}

function screenGoals() {
  show(
    '<section class="screen" data-screen="goals">' +
    '<h2>What you will practice</h2>' +
    '<ol class="goals">' +
    '<li>Open by <strong>listening first</strong>, not by defending or reassuring.</li>' +
    '<li>Back up what you say with <strong>evidence</strong>: the student\'s work, the points log, one strength and one gap.</li>' +
    '<li>Close with a <strong>small, clear plan</strong> and a date to follow up.</li>' +
    '</ol>' +
    '<div class="good"><h3>What good looks like</h3><p class="steps"><span>Listen</span><span>Show</span><span>Plan</span></p>' +
    '<p>The one thing to take away: <strong>listen before you reassure.</strong></p></div>' +
    '<p>You will make 3 choices. A weak choice does not end the talk. It leads somewhere real, and you get a second chance. There is no timer, and you can try again at the end.</p>' +
    '<button class="btn primary" data-go="warm">Next: quick warm-up</button>' +
    '</section>');
}

function screenWarm() {
  const opts = WARM.map((w) => '<button class="btn choice" data-warm="' + w.id + '">' + esc(w.label) + '</button>').join('');
  show(
    '<section class="screen" data-screen="warm">' +
    '<p class="kicker">Warm-up · not scored</p>' +
    '<h2>What do parents here worry about most?</h2>' +
    '<p>Pick the one you think comes up most.</p>' +
    '<div class="choices" id="warm-opts">' + opts + '</div>' +
    '<div id="warm-notes"></div>' +
    '</section>');
}

function warmPicked(id) {
  for (const b of app.querySelectorAll('[data-warm]')) {
    b.disabled = true;
    if (b.dataset.warm === id) b.classList.add('picked');
  }
  const notes = WARM.map((w) => '<li' + (w.id === id ? ' class="picked"' : '') + '><strong>' + esc(w.label) + '.</strong> ' + esc(w.note) + '</li>').join('');
  document.getElementById('warm-notes').innerHTML =
    '<ul class="notes">' + notes + '</ul>' +
    '<p>All four are real. Mrs. Lin is worried about two of them. Listen for which ones.</p>' +
    '<button class="btn primary" data-go="n1">Go to the front desk</button>';
  document.getElementById('warm-notes').querySelector('button').focus();
}

function screenNode(id) {
  const n = NODES[id];
  const opts = n.choices.map((c, i) =>
    '<button class="btn choice" data-pick="' + c.id + '"><span class="letter">' + 'ABC'[i] + '</span><span>' + esc(c.text) + '</span></button>').join('');
  show(
    '<section class="screen" data-screen="' + id + '">' +
    '<h2 class="sr-only">Step ' + n.step + ': what do you say?</h2>' +
    '<p class="scene">' + esc(n.scene) + '</p>' +
    bubble('lin', 'Mrs. Lin', n.say, n.zh, lastMood()) +
    '<p class="ask">What do you say?</p>' +
    '<div class="choices">' + opts + '</div>' +
    '<button class="btn link" data-tip aria-expanded="false" aria-controls="tip">Coach tip</button>' +
    '<p class="tip" id="tip" hidden>' + esc(n.tip) + '</p>' +
    '</section>', n.step, n.recover);
  state.shownAt = Date.now();
  saveSuspend();
}

function pick(nodeId, choiceId) {
  const n = NODES[nodeId];
  const c = n.choices.find((x) => x.id === choiceId);
  state.path.push({ node: nodeId, choice: choiceId });

  const i = state.nInteraction++;
  const pre = 'cmi.interactions.' + i + '.';
  SCORM.set(pre + 'id', nodeId);
  SCORM.set(pre + 'type', 'choice');
  SCORM.set(pre + 'student_response', choiceId);
  SCORM.set(pre + 'result', c.best ? 'correct' : 'wrong');
  SCORM.set(pre + 'latency', SCORM.timespan(Date.now() - state.shownAt));
  saveSuspend();
  SCORM.commit();

  const mood = c.score === 2 ? 'calm' : c.score === 1 ? 'unsure' : 'upset';
  const next = c.go === 'end' ? 'end' : c.go;
  show(
    '<section class="screen" data-screen="feedback" data-node="' + nodeId + '">' +
    '<h2 class="sr-only">What happened</h2>' +
    bubble('you', 'You', c.text, null, 'calm') +
    '<p class="scene">' + esc(c.react) + '</p>' +
    (c.say ? bubble('lin', 'Mrs. Lin', c.say, c.zh, mood) : '') +
    '<div class="coach" role="status"><p class="who">Coach · ' + esc(STRATEGY[n.step]) + '</p><p>' + esc(c.fb) + '</p></div>' +
    '<button class="btn primary" data-go="' + next + '">' + (next === 'end' ? 'See how it ends' : 'Continue') + '</button>' +
    '</section>', n.step, n.recover);
}

function screenEnd() {
  const score = pct();
  const key = endingKey(score);
  const e = ENDINGS[key];
  const passed = score >= PASS;

  const before = state.best;
  if (!state.ended) {
    state.ended = true;
    // Keep the best attempt: a free retry must never overwrite a pass with a lower score.
    if (before === null || score >= before) {
      state.best = score;
      SCORM.set('cmi.core.score.min', 0);
      SCORM.set('cmi.core.score.max', 100);
      SCORM.set('cmi.core.score.raw', score);
      SCORM.set('cmi.core.lesson_status', passed ? 'passed' : 'failed');
    }
    SCORM.set('cmi.suspend_data', '');
    SCORM.commit();
  }
  const bestLine = before === null ? '' : score > before
    ? 'New personal best. Up from ' + before + '.'
    : 'Your best so far: ' + Math.max(before, score) + '.';

  const review = [1, 2, 3].map((step) => {
    const picks = state.path.filter((p) => NODES[p.node].step === step);
    const pts = picks.reduce((s, p) => s + choiceOf(p).score, 0);
    const said = picks.map((p) => '<li>"' + esc(choiceOf(p).text) + '"</li>').join('');
    const best = NODES['n' + step].choices.find((c) => c.best).text;
    const model = pts < 2 ? '<p class="model">A stronger line: "' + esc(best) + '"</p>' : '';
    return '<li><p><strong>' + esc(STRATEGY[step]) + '</strong> <span class="pts">' + pts + ' of 2</span></p><ul class="said">' + said + '</ul>' + model + '</li>';
  }).join('');

  const cardHtml = CARD.map((b) => '<div class="card-box"><h4>' + esc(b.title) + '</h4><ul>' +
    b.lines.map((l) => '<li><span>' + esc(l[0]) + '</span><span class="zh" lang="zh-Hant">' + esc(l[1]) + '</span></li>').join('') +
    '</ul></div>').join('');

  const survey = (q, name, opts) => '<fieldset class="survey"><legend>' + q + '</legend><div class="opts">' +
    opts.map((o, i) => '<label><input type="radio" name="' + name + '" value="' + (i + 1) + '"> ' + o + '</label>').join('') + '</div></fieldset>';

  show(
    '<section class="screen" data-screen="end" data-ending="' + key + '">' +
    '<p class="kicker">Ending</p>' +
    '<h2>' + esc(e.title) + '</h2>' +
    '<p class="scene">' + esc(e.text) + '</p>' +
    bubble('lin', 'Mrs. Lin', e.say, e.zh, e.mood) +
    '<div class="result"><p class="big"><span id="score">' + score + '</span> / 100</p><p>Pass mark ' + PASS + '. ' +
    (passed ? 'You reached it.' : 'Try again and see what changes.') + (bestLine ? ' ' + bestLine : '') + '</p></div>' +
    '<p class="note">This shows what happened in this talk, not who you are as a teacher.</p>' +
    '<h3>Your three moments</h3><ol class="review">' + review + '</ol>' +
    '<button class="btn primary" data-go="retry">Try again</button>' +
    '</section>' +
    '<section class="screen" data-screen="reflect">' +
    '<h3>Reflect</h3>' +
    '<label for="reflection">What will you say first next time?</label>' +
    '<textarea id="reflection" rows="2" maxlength="500"></textarea>' +
    '<button class="btn" data-save-reflection>Save my answer</button> <span id="saved" class="saved" role="status"></span>' +
    '</section>' +
    '<section class="screen" data-screen="survey">' +
    '<h3>Two quick questions</h3>' +
    survey('Was this useful for your job?', 'useful', ['Not really', 'A little', 'Yes']) +
    survey('How confident do you feel about your next parent talk?', 'confident', ['Not yet', 'A bit', 'Very']) +
    '</section>' +
    '<section class="talk-card" aria-labelledby="card-title">' +
    '<div class="card-head"><h3 id="card-title">Parent Talk card</h3><button class="btn no-print" data-print>Print the card</button></div>' +
    '<p class="card-sub">Listen before you reassure.</p>' +
    '<div class="card-grid">' + cardHtml + '</div>' +
    '</section>');
}

function retry() {
  state.path = [];
  state.ended = false;
  // Only "not done yet" goes back to incomplete; a recorded result stays until a better one replaces it.
  if (state.best === null) SCORM.set('cmi.core.lesson_status', 'incomplete');
  saveSuspend();
  SCORM.commit();
  route('n1');
}

function route(to) {
  if (to === 'goals') return screenGoals();
  if (to === 'warm') return screenWarm();
  if (to === 'end') return screenEnd();
  if (to === 'retry') return retry();
  if (NODES[to]) return screenNode(to);
  screenIntro();
}

/* ---------- Events ---------- */

app.addEventListener('click', (ev) => {
  const t = ev.target.closest('button');
  if (!t || Date.now() < state.readyAt) return;
  if (t.dataset.go) return route(t.dataset.go);
  if (t.dataset.warm) return warmPicked(t.dataset.warm);
  if (t.dataset.pick) return pick(app.querySelector('[data-screen]').dataset.screen, t.dataset.pick);
  if (t.hasAttribute('data-tip')) {
    const tip = document.getElementById('tip');
    tip.hidden = !tip.hidden;
    t.setAttribute('aria-expanded', String(!tip.hidden));
    return;
  }
  if (t.hasAttribute('data-print')) return window.print();
  if (t.hasAttribute('data-save-reflection')) {
    const text = document.getElementById('reflection').value.trim();
    if (!text) { document.getElementById('saved').textContent = 'Write a line first.'; return; }
    SCORM.set('cmi.comments', text);
    SCORM.commit();
    document.getElementById('saved').textContent = SCORM.isLive() ? 'Saved.' : 'Noted. (Only saved when this runs in a course system.)';
  }
});

app.addEventListener('change', (ev) => {
  const t = ev.target;
  if (t.type !== 'radio') return;
  const i = state.nInteraction++;
  const pre = 'cmi.interactions.' + i + '.';
  SCORM.set(pre + 'id', 'survey_' + t.name);
  SCORM.set(pre + 'type', 'likert');
  SCORM.set(pre + 'student_response', t.value);
  SCORM.set(pre + 'result', 'neutral');
  SCORM.commit();
});

zhBtn.addEventListener('click', () => {
  state.zh = !state.zh;
  zhBtn.setAttribute('aria-pressed', String(state.zh));
  for (const z of app.querySelectorAll('.bubble .zh')) z.hidden = !state.zh;
});

function exit() {
  SCORM.set('cmi.core.session_time', SCORM.timespan(Date.now() - state.started));
  if (!state.ended && state.path.length) SCORM.set('cmi.core.exit', 'suspend');
  SCORM.commit();
  SCORM.finish();
}
// Some LMS players drop the frame without a clean pagehide, so listen to both; finish() runs once.
window.addEventListener('pagehide', exit);
window.addEventListener('beforeunload', exit);

/* ---------- Start ---------- */

(function start() {
  if (!SCORM.init()) return screenIntro(); // standalone mode
  state.nInteraction = parseInt(SCORM.get('cmi.interactions._count'), 10) || 0;
  const status = SCORM.get('cmi.core.lesson_status');
  const prev = SCORM.get('cmi.core.score.raw');
  if ((status === 'passed' || status === 'failed') && prev !== '') state.best = Number(prev);
  if (status === 'not attempted' || status === '') SCORM.set('cmi.core.lesson_status', 'incomplete');
  const saved = SCORM.get('cmi.suspend_data');
  const path = saved ? loadSuspend(saved) : [];
  SCORM.commit();
  if (path.length) {
    state.path = path;
    return screenIntro(nextNode());
  }
  screenIntro();
})();
