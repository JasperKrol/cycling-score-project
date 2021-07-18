# The StravaScore App :bicyclist::dash:

### Inleiding

Wil jij weten wat je dit jaar al gepresteerd hebt en ook maandelijks de strijd aangaan met je vrienden? CyclingScore
houd alles bij :bicyclist::dash:!

Wat kun je van de app verwachten?:

- **Scores en klassementen:** De APP kijkt naar de gemiddelde snelheid, de afgelegde kilometers en hoogtemeters.
- **Jaaroverzicht:** Deze pagina weergeeft jouw scores van het huidige jaar.
- **Leaderboard Climbing:** Wie heeft de beste klimbenen? Bekijk hier jouw positie en die van je vrienden.
- **Leaderboard Distance:** Wie heeft de meeste kilometers gegeten? Bekijk hier jouw positie en die van je vrienden.
- **Leaderboard Speed:** Wie heeft het snelste gereden deze maand? Bekijk hier jouw positie en die van je vrienden.
- **Eenvoudige registratie met email:** Wachtwoord vergeten? Geen probleem, vraag hem opnieuw aan.
- **Strava authentication met oAuth2.0:** Veilig je gegevens delen.
- **Tips, Tops of vragen?:** Stel ze via de contactpagina.

### Installatie handleiding:

##### Deze applicatie heeft gebruik gemaakt van de volgende dependencies:

- **Axios**
- **React Hook From**
- **React Router DOM**
- **Firebase**
- **Fontawesome**
- **React Scroll**

**1.** Clone het project.

**2.** Installeer de node_modules door **npm install** te draaien in de terminal.

**3.** Deze app maakt gebruikt van Firebase en Firestore, hierdoor zijn er bestanden met privégegevens die ik hier niet
kan delen. Het ENV-bestand dient dan ook nog handmatig toegevoegd te worden. Deze informatie is te vinden in het
aangeleverde ZIP-bestand en zijn ook toegevoegd in het verslag.

```javascript
    REACT_APP_API_KEY=
    REACT_APP_FIREBASE_API_KEY=
    REACT_APP_AUTH_DOMAIN=
    REACT_APP_PROJECT_ID=
    REACT_APP_STORAGE_BUCKET=
    REACT_APP_MESSAGING_SENDER_ID=
    REACT_APP_APP_ID=
```

**4.** Het project kan gestart worden door **npm start** in de terminal te draaien.

**5.** Login en registratie.
* Registratie kan eenvoudig door een email/wachtwoord combinatie. Na een succesvolle registratie kom je gelijk op de Strava Authorization pagina.
* Ben je uitgelogd en wil je weer gebruik maken van de APP? Gebruik dan je opgegeven email en wachtwoord op de Login pagina.

**6.** Strava Authenticatie.
* Na het inloggen heeft *CycleScore* toestemming van jouw Strava account nodig om de ritten en profielgegevens op te halen.
* Heb je al een account dan kun je autorisatie knop volgen en de voorwaarden accepteren.

* In de functie van het beoordelen of de app werkt heb ik een Strava account gemaakt met wat ritten:
  - Applicatie gegevens: test@test.com / 123123
  - Strava gegevens: jasper.krol@novi-education / test123123
  
**7.** Mocht je het wachtwoord vergeten zijn, kan je deze makkelijk opvragen door middel van de Forgot Your Password link. Dan wordt er een e-mail verstuurd met een activatie-link.

**8.** Ook zijn er testscenario's geschreven, deze zijn terug te vinden in de map: *testscripts*. Deze testen kunnen gedraaid worden volgens de volgende stappen in de terminal:
*  npm test


**9.** Succes en vergeet niet een stukje te fietsen!️

### Belangrijke screenshots:

#### Login
![Login](https://github.com/JasperKrol/cycling-score-project/blob/main/src/assets/Login.PNG)

##### Registreer
![Registreer](https://github.com/JasperKrol/cycling-score-project/blob/main/src/assets/registreer.PNG)


#### Your scores
![Your scores](https://github.com/JasperKrol/cycling-score-project/blob/main/src/assets/yourscores.PNG)

#### Leaderboard voorbeeld
![Leaderboard voorbeeld](https://github.com/JasperKrol/cycling-score-project/blob/main/src/assets/speed%20leaderboard.PNG)


#### Heb je nog vragen, wil je in contact of heb je tips voor het project? :incoming_envelope:
- [LinkedIn](www.linkedin.com/in/jasper-paul-krol)
- Of neem contact via mijn GitHub pagina :computer:

