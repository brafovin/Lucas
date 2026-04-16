# Der Fall im Haus

Ein atmosphärisches Top-Down-Detektiv-Spiel im Browser. Du bist ein Polizist
und läufst selbst durch ein leeres, dunkles Haus — mit Taschenlampe, Waffe
und einer unheimlichen Ahnung.

## Spielen

`index.html` im Browser öffnen.

## Steuerung

| Taste | Aktion |
|-------|--------|
| WASD / Pfeiltasten | Laufen |
| E / Leertaste | Interagieren (untersuchen, Tür eintreten, verstecken) |

## Ablauf

1. Fahre mit dem Streifenwagen zum Haus und betritt es durch die Haustür.
2. Durchsuche Wohnzimmer, Küche und den Flur.
3. Finde am Ende des Flurs die verschlossene Tür — und die Blutspur davor.
4. Tritt die Tür ein und werde Zeuge des Mordes.
5. Fliehe in den Kleiderschrank, bevor der Killer dich erwischt.
6. Halte still, bis er das Haus verlassen hat.
7. Renne zum Streifenwagen und rufe Verstärkung.

## Features

- Top-Down-Ansicht mit Kollision und Taschenlampen-Effekt (Fog of War)
- Freies Erkunden mehrerer Zimmer
- Echte Versteck-Mechanik mit Timer
- Killer-KI mit Patrouillen- und Verfolgungsmodus
- Mehrere mögliche Enden (Überleben oder Game Over)

## Dateien

- `index.html` — HTML-Grundgerüst mit Canvas
- `style.css` — Dark-Krimi-Design
- `game.js` — Spiellogik (Bewegung, KI, Story, Rendering)
