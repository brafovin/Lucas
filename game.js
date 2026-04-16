const scenes = {
  start: {
    title: "Einsatz",
    icon: "🚓",
    bg: "night",
    text: "22:47 Uhr. Ein anonymer Notruf aus der Lindenstraße 13. Du parkst deinen Streifenwagen vor einem dunklen, zweistöckigen Haus. Kein Licht, keine Bewegung. Der Regen trommelt auf das Dach. Der Disponent sagt, die Person am Telefon habe geflüstert: 'Er ist im Haus.' Dann Stille.",
    choices: [
      { text: "Zum Eingang gehen und klingeln", next: "door" },
      { text: "Sofort Verstärkung anfordern", next: "early_backup" },
      { text: "Das Haus von außen umrunden", next: "outside" }
    ]
  },
  early_backup: {
    title: "Zu vorsichtig",
    icon: "📻",
    bg: "night",
    text: "Du greifst zum Funk. 'Einheit 7 an Zentrale, ich brauche Verstärkung.' — 'Negativ, Einheit 7. Alle Einheiten im Einsatz. ETA 25 Minuten. Erkunden Sie die Lage.' Du legst den Hörer weg. 25 Minuten. Zu lang, wenn da drin jemand stirbt.",
    choices: [
      { text: "Allein zum Eingang gehen", next: "door" },
      { text: "Haus umrunden", next: "outside" }
    ]
  },
  outside: {
    title: "Umrundung",
    icon: "🏚️",
    bg: "house",
    text: "Du schleichst um das Haus. Alle Fenster sind dunkel. An der Rückseite bemerkst du ein offenes Kellerfenster und eine angelehnte Hintertür. Auf dem Boden — Fußabdrücke im Matsch. Frisch.",
    choices: [
      { text: "Durch die Hintertür eintreten", next: "enter" },
      { text: "Zur Vordertür zurückgehen", next: "door" }
    ]
  },
  door: {
    title: "Vordertür",
    icon: "🚪",
    bg: "house",
    text: "Du klingelst. Keine Antwort. Du klopfst. 'Polizei! Ist jemand zu Hause?' Stille. Du drückst die Klinke — die Tür ist unverschlossen. Sie schwingt mit einem Knarren auf. Warme, stickige Luft strömt dir entgegen.",
    choices: [
      { text: "Mit gezogener Waffe eintreten", next: "enter" },
      { text: "Noch einmal laut rufen", next: "shout" }
    ]
  },
  shout: {
    title: "Ruf in die Dunkelheit",
    icon: "🗣️",
    bg: "house",
    text: "'POLIZEI! Hallo?!' Deine Stimme verhallt im Flur. Dann — ein dumpfes Geräusch aus dem oberen Stockwerk. Wie etwas, das über den Boden gezogen wird. Dann Stille.",
    choices: [
      { text: "Jetzt eintreten", next: "enter" }
    ]
  },
  enter: {
    title: "Im Haus",
    icon: "🔦",
    bg: "house",
    text: "Du betrittst den Flur. Die Taschenlampe wirft einen kalten Lichtkegel über die Wände. Familienfotos. Ein umgekippter Stuhl. Eine Tasse Kaffee auf dem Tisch — noch lauwarm. Jemand war eben noch hier.",
    choices: [
      { text: "Das Wohnzimmer untersuchen", next: "livingroom" },
      { text: "In die Küche gehen", next: "kitchen" },
      { text: "Die Treppe nach oben", next: "upstairs" }
    ]
  },
  livingroom: {
    title: "Wohnzimmer",
    icon: "🛋️",
    bg: "house",
    text: "Das Wohnzimmer ist leer. Fernseher an, ohne Ton. Ein Buch liegt aufgeschlagen auf dem Sofa. Auf dem Teppich — eine einzelne, zertretene Brille.",
    choices: [
      { text: "Zurück in den Flur", next: "hallway" }
    ]
  },
  kitchen: {
    title: "Küche",
    icon: "🍽️",
    bg: "house",
    text: "Die Küche ist leer. Auf dem Herd köchelt noch Wasser. Ein Messerblock — eine Klinge fehlt. Du spürst, wie dein Puls schneller wird.",
    choices: [
      { text: "Zurück in den Flur", next: "hallway" }
    ]
  },
  hallway: {
    title: "Flur",
    icon: "🚪",
    bg: "house",
    text: "Du stehst wieder im Flur. Die Treppe nach oben wartet. Und am Ende des Flurs — eine weitere Tür, die du vorher nicht bemerkt hast.",
    choices: [
      { text: "Treppe hinauf", next: "upstairs" },
      { text: "Zur Tür am Ende des Flurs", next: "locked_door" }
    ]
  },
  upstairs: {
    title: "Obergeschoss",
    icon: "🪜",
    bg: "house",
    text: "Die Stufen knarren unter deinen Füßen. Im Obergeschoss: drei offene Türen. Alle Zimmer leer. Betten ungemacht. In einem Kinderzimmer ein umgeworfener Teddybär. Keine Person. Nirgendwo.",
    choices: [
      { text: "Nach unten zurückkehren", next: "hallway" }
    ]
  },
  locked_door: {
    title: "Die verschlossene Tür",
    icon: "🔒",
    bg: "house",
    text: "Eine schwere Holztür. Du drückst die Klinke — abgeschlossen. Du willst dich schon umdrehen, als dein Lichtkegel den Boden streift. Dein Atem stockt.\n\nEin dunkler, verschmierter Blutstreifen führt unter der Tür hindurch. Frisch. Glänzend.",
    bgChange: "blood",
    choices: [
      { text: "Die Tür eintreten!", next: "break_door", danger: true },
      { text: "Schulter gegen die Tür werfen", next: "break_door", danger: true },
      { text: "Kurz zurückweichen und horchen", next: "listen" }
    ]
  },
  listen: {
    title: "Horchen",
    icon: "👂",
    bg: "blood",
    text: "Du presst dein Ohr an die Tür. Zuerst nichts. Dann — ein schwaches, gurgelndes Atmen. Und darüber... ruhige, gleichmäßige Schritte. Jemand lebt noch. Und jemand anderes ist bei ihm.",
    choices: [
      { text: "TÜR EINTRETEN!", next: "break_door", danger: true }
    ]
  },
  break_door: {
    title: "Die Tür bricht",
    icon: "💥",
    bg: "blood",
    text: "Du trittst mit aller Kraft. Einmal. Zweimal. Beim dritten Mal splittert das Holz. Die Tür kracht nach innen.\n\nIm Zimmer: eine Gestalt am Boden. Über ihr — eine zweite Person, reglos, eine blutige Klinge in der Hand. Der Killer dreht langsam den Kopf. Eure Blicke treffen sich.\n\nDu bist zu spät. Das Opfer hat aufgehört zu atmen.",
    choices: [
      { text: "Waffe ziehen und 'STEHEN BLEIBEN!' rufen", next: "confront", danger: true },
      { text: "Zurückweichen und verstecken", next: "flee" },
      { text: "Sofort Funkgerät benutzen", next: "radio_caught", danger: true }
    ]
  },
  confront: {
    title: "Konfrontation",
    icon: "🔫",
    bg: "blood",
    text: "'POLIZEI! WAFFE FALLEN LASSEN!' Deine Stimme zittert. Der Killer starrt dich an — dann stürzt er mit unheimlicher Geschwindigkeit auf dich zu. Du hast keine Zeit zu zielen. Die Klinge blitzt im Taschenlampenlicht.",
    choices: [
      { text: "Schießen", next: "shoot" },
      { text: "Ausweichen", next: "dodge" }
    ]
  },
  shoot: {
    title: "Schuss ins Leere",
    icon: "💀",
    bg: "blood",
    text: "Dein Finger zuckt. Der Schuss kracht durch den Flur — und verfehlt. Der Killer ist schon über dir. Du spürst den eiskalten Stahl.\n\nDu hast den wichtigsten Moment verschenkt: die Deckung.",
    gameOver: true,
    ending: "Gestorben bei der Konfrontation."
  },
  dodge: {
    title: "Ausweichen",
    icon: "💀",
    bg: "blood",
    text: "Du wirfst dich zur Seite, aber der Flur ist zu eng. Die Klinge trifft dich an der Schulter. Du gehst zu Boden. Der Killer steht über dir — und lächelt.",
    gameOver: true,
    ending: "Die Konfrontation war tödlich."
  },
  radio_caught: {
    title: "Zu laut",
    icon: "💀",
    bg: "blood",
    text: "'Einheit 7 an Zen—' Das Funkgerät piept. Der Killer hört es sofort. Bevor du reagieren kannst, ist er bei dir.",
    gameOver: true,
    ending: "Das Funkgerät hat dich verraten."
  },
  flee: {
    title: "Rückzug",
    icon: "🏃",
    bg: "house",
    text: "Instinkt übernimmt. Du weichst rückwärts aus dem Türrahmen, hältst den Atem an. Der Killer hat dich gesehen — aber hat er dein Gesicht erkannt? Schritte. Er kommt.\n\nDu musst dich JETZT verstecken.",
    choices: [
      { text: "In den großen Kleiderschrank im Flur", next: "closet" },
      { text: "Unter die Treppe", next: "stairs_hide", danger: true },
      { text: "Zur Haustür rennen", next: "run_door", danger: true }
    ]
  },
  run_door: {
    title: "Zu langsam",
    icon: "💀",
    bg: "blood",
    text: "Du rennst den Flur hinunter. Der Killer ist schneller. Fünf Meter vor der Haustür packt dich eine Hand im Nacken.",
    gameOver: true,
    ending: "Die Tür war zu weit."
  },
  stairs_hide: {
    title: "Unter der Treppe",
    icon: "💀",
    bg: "blood",
    text: "Du zwängst dich unter die Treppe. Zu offen. Der Killer sieht dich sofort, als er die Ecke erreicht.",
    gameOver: true,
    ending: "Kein gutes Versteck."
  },
  closet: {
    title: "Im Schrank",
    icon: "🚪",
    bg: "closet",
    text: "Du reißt den Schrank auf und quetschst dich zwischen die Mäntel. Du ziehst die Tür zu — ein Spalt bleibt. Du zwingst dich, flach zu atmen. Dein Herz dröhnt so laut, dass du sicher bist, es zu verraten.\n\nSchritte. Langsam. Näher. Sie stoppen direkt vor dem Schrank.",
    tense: true,
    choices: [
      { text: "Den Atem anhalten und warten", next: "wait" },
      { text: "Waffe in Position bringen", next: "ready_gun", danger: true },
      { text: "Handy stummschalten", next: "silence_phone" }
    ]
  },
  ready_gun: {
    title: "Die Waffe zuckt",
    icon: "💀",
    bg: "blood",
    text: "Du versuchst, deine Waffe zu heben. Ein Mantelbügel klirrt leise gegen das Metall.\n\nDer Schrank wird aufgerissen.",
    gameOver: true,
    ending: "Ein falsches Geräusch hat dich verraten."
  },
  silence_phone: {
    title: "Kluger Schritt",
    icon: "📱",
    bg: "closet",
    text: "Du schaltest mit zitternden Fingern dein Handy stumm. Eine Sekunde später — Vibration. Ein Anruf deiner Kollegin. Sie hätte dich beinahe verraten.\n\nDu hörst, wie der Killer vor dem Schrank atmet. Dann — er dreht sich um.",
    choices: [
      { text: "Warten", next: "wait" }
    ]
  },
  wait: {
    title: "Warten",
    icon: "⏳",
    bg: "closet",
    text: "Sekunden dehnen sich zu Minuten. Du hörst ihn durch das Haus gehen. Etwas wird geschleppt. Ein Reißverschluss. Schritte Richtung Haustür.\n\nDie Haustür öffnet sich. Schließt sich. Stille.\n\nDu wartest weitere fünf Minuten. Dann zehn. Nichts.",
    tense: true,
    choices: [
      { text: "Aus dem Schrank kommen", next: "emerge" },
      { text: "Noch länger warten", next: "wait_longer" }
    ]
  },
  wait_longer: {
    title: "Vorsicht",
    icon: "⏳",
    bg: "closet",
    text: "Du wartest weitere zehn Minuten. Absolute Stille. Kein Risiko. Du hast richtig entschieden — jede Sekunde, die du lebst, ist ein Sieg.",
    choices: [
      { text: "Vorsichtig heraustreten", next: "emerge" }
    ]
  },
  emerge: {
    title: "Heraus",
    icon: "🚪",
    bg: "house",
    text: "Du öffnest die Schranktür zentimeterweise. Waffe zuerst. Der Flur ist leer. Kalt. Die Haustür steht einen Spalt offen. Du schleichst hinaus in den Regen, überquerst die Straße, bis du sicher bist, allein zu sein.",
    choices: [
      { text: "Funkgerät: VERSTÄRKUNG!", next: "backup" }
    ]
  },
  backup: {
    title: "Verstärkung",
    icon: "🚨",
    bg: "escape",
    text: "'Einheit 7 an Zentrale! Mord in der Lindenstraße 13! Täter auf der Flucht, bewaffnet, blutverschmiert, männlich! ALLE EINHEITEN!'\n\nBlaulicht färbt den Regen. Drei Streifenwagen. Ein SEK-Transporter. Gemeinsam durchsucht ihr jedes Zimmer, jede Ecke. Keller. Dachboden. Garten.",
    choices: [
      { text: "Die Spuren auswerten", next: "ending" }
    ]
  },
  ending: {
    title: "Er ist weg",
    icon: "🕵️",
    bg: "night",
    text: "Das Opfer: weiblich, 34, die Anruferin. Todesursache: Stichwunden. Der Killer: spurlos verschwunden. Fußabdrücke enden an der Hinterstraße — er hatte ein Fluchtfahrzeug.\n\nDu überlebst diese Nacht. Aber du weißt: Er ist noch da draußen. Irgendwo. Und er weiß jetzt, wie du aussiehst.\n\nDer Fall wird geöffnet. Dein Fall.",
    victory: true,
    ending: "Du hast überlebt — aber der Jäger läuft noch frei herum."
  }
};

let currentScene = "start";
let health = 100;
let timeCounter = { h: 22, m: 47 };
let typingInterval = null;

function updateTime(minutes) {
  timeCounter.m += minutes;
  while (timeCounter.m >= 60) { timeCounter.m -= 60; timeCounter.h = (timeCounter.h + 1) % 24; }
  document.getElementById("time-value").textContent =
    String(timeCounter.h).padStart(2, "0") + ":" + String(timeCounter.m).padStart(2, "0");
}

function typeText(element, text, speed = 18) {
  if (typingInterval) clearInterval(typingInterval);
  element.textContent = "";
  element.classList.add("typing");
  let i = 0;
  typingInterval = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typingInterval);
      element.classList.remove("typing");
    }
  }, speed);
}

function renderScene(key) {
  const scene = scenes[key];
  if (!scene) return;
  currentScene = key;

  document.getElementById("scene-title").textContent = scene.title;
  document.getElementById("location-value").textContent = scene.title;

  const img = document.getElementById("scene-image");
  img.className = "scene-image " + (scene.bg || "house");
  img.textContent = scene.icon || "🏠";

  const storyEl = document.getElementById("story-text");
  storyEl.className = scene.tense ? "tense" : "";
  typeText(storyEl, scene.text);

  updateTime(Math.floor(Math.random() * 3) + 1);

  const choicesEl = document.getElementById("choices");
  choicesEl.innerHTML = "";

  if (scene.gameOver || scene.victory) {
    const endMsg = document.createElement("div");
    endMsg.className = scene.victory ? "victory" : "game-over";
    endMsg.textContent = (scene.victory ? "★ FALL OFFEN ★\n" : "✖ DU BIST TOT ✖\n") + (scene.ending || "");
    choicesEl.appendChild(endMsg);
    document.getElementById("restart-btn").style.display = "inline-block";
    return;
  }

  document.getElementById("restart-btn").style.display = "none";

  setTimeout(() => {
    (scene.choices || []).forEach((c) => {
      const btn = document.createElement("button");
      btn.className = "choice-btn" + (c.danger ? " danger" : "");
      btn.textContent = c.text;
      btn.onclick = () => renderScene(c.next);
      choicesEl.appendChild(btn);
    });
  }, Math.min(scene.text.length * 18, 2500));
}

function restartGame() {
  health = 100;
  timeCounter = { h: 22, m: 47 };
  document.getElementById("health-value").textContent = "100";
  renderScene("start");
}

window.addEventListener("DOMContentLoaded", () => {
  renderScene("start");
});
