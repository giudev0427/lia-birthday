(function () {
  "use strict";

  const translations = {
    "Para Lía Linda — Un pequeño mundo de magia": ["Para Lía Linda — Un pequeño mundo de magia", "For Lía Linda — A Little World of Magic", "Per Lía Linda — Un piccolo mondo di magia"],
    "Un libro digital para Lía Linda, Lia, creado con cariño para celebrar sus 21 años el 28 de noviembre de 2026.": ["Un libro digital para Lía Linda, Lia, creado con cariño para celebrar sus 21 años el 28 de noviembre de 2026.", "A digital book for Lía Linda, Lia, lovingly created to celebrate her 21st birthday on November 28, 2026.", "Un libro digitale per Lía Linda, Lia, creato con affetto per festeggiare i suoi 21 anni il 28 novembre 2026."],
    "Saltar al libro": ["Saltar al libro", "Skip to the book", "Vai al libro"],
    "Controles de experiencia": ["Controles de experiencia", "Experience controls", "Controlli dell’esperienza"],
    "Seleccionar idioma": ["Seleccionar idioma", "Select language", "Seleziona lingua"],
    "Cambiar idioma a español": ["Cambiar idioma a español", "Switch language to Spanish", "Cambia lingua in spagnolo"],
    "Cambiar idioma a inglés": ["Cambiar idioma a inglés", "Switch language to English", "Cambia lingua in inglese"],
    "Cambiar idioma a italiano": ["Cambiar idioma a italiano", "Switch language to Italian", "Cambia lingua in italiano"],
    "Reproducir música": ["Reproducir música", "Play music", "Riproduci musica"],
    "Pausar música": ["Pausar música", "Pause music", "Metti in pausa la musica"],
    "Reproducir música ambiental": ["Reproducir música ambiental", "Play ambient music", "Riproduci musica d’atmosfera"],
    "Pausar música ambiental": ["Pausar música ambiental", "Pause ambient music", "Metti in pausa la musica d’atmosfera"],
    "Música": ["Música", "Music", "Musica"],
    "Lía Linda, hay un pequeño universo preparado para ti": ["Lía Linda, hay un pequeño universo preparado para ti", "Lía Linda, a little universe is waiting for you", "Lía Linda, c’è un piccolo universo preparato per te"],
    "Libro de cumpleaños de Lia": ["Libro de cumpleaños de Lia", "Lia’s birthday book", "Libro di compleanno di Lia"],
    "Abrir el libro de Lia": ["Abrir el libro de Lia", "Open Lia’s book", "Apri il libro di Lia"],
    "Para Lía Linda": ["Para Lía Linda", "For Lía Linda", "Per Lía Linda"],
    "A Little World of Magic": ["Un pequeño mundo de magia", "A Little World of Magic", "Un piccolo mondo di magia"],
    "Toca para abrir": ["Toca para abrir", "Tap to open", "Tocca per aprire"],
    "Una canción para comenzar": ["Una canción para comenzar", "A song to begin", "Una canzone per iniziare"],
    "Eres la herida más bonita — Mr. Yeff": ["Eres la herida más bonita — Mr. Yeff", "Eres la herida más bonita — Mr. Yeff", "Eres la herida más bonita — Mr. Yeff"],
    "Un regalo hecho con el corazón": ["Un regalo hecho con el corazón", "A gift made from the heart", "Un regalo fatto con il cuore"],
    "Un pequeño universo de rosas, Snoopy, canciones y magia para celebrar tu vida.": ["Un pequeño universo de rosas, Snoopy, canciones y magia para celebrar tu vida.", "A little universe of roses, Snoopy, songs, and magic to celebrate your life.", "Un piccolo universo di rose, Snoopy, canzoni e magia per celebrare la tua vita."],
    "28 de noviembre": ["28 de noviembre", "November 28", "28 novembre"],
    "Capítulo I: Jardín nocturno": ["Capítulo I: Jardín nocturno", "Chapter I: Night Garden", "Capitolo I: Giardino notturno"],
    "Capítulo I": ["Capítulo I", "Chapter I", "Capitolo I"],
    "Un jardín que florece de noche": ["Un jardín que florece de noche", "A garden that blooms at night", "Un giardino che fiorisce di notte"],
    "Lia, entre rosas rojas y luces tímidas, el aire guarda secretos suaves que preparé solo para ti.": ["Lia, entre rosas rojas y luces tímidas, el aire guarda secretos suaves que preparé solo para ti.", "Lia, among red roses and gentle lights, the air holds tender secrets I prepared just for you.", "Lia, tra rose rosse e luci delicate, l’aria custodisce dolci segreti che ho preparato solo per te."],
    "“Donde hay rosas, Lia, hay magia que se queda contigo.”": ["“Donde hay rosas, Lia, hay magia que se queda contigo.”", "“Where there are roses, Lia, there is magic that stays with you.”", "“Dove ci sono rose, Lia, c’è una magia che resta con te.”"],
    "Lia sonriendo con dulzura en un instante mágico": ["Lia sonriendo con dulzura en un instante mágico", "Lia smiling sweetly in a magical moment", "Lia sorride dolcemente in un momento magico"],
    "Un recuerdo entre rosas": ["Un recuerdo entre rosas", "A memory among roses", "Un ricordo tra le rose"],
    "Una pausa cálida": ["Una pausa cálida", "A warm pause", "Una pausa calda"],
    "Café, cariño y buenos recuerdos": ["Café, cariño y buenos recuerdos", "Coffee, affection, and beautiful memories", "Caffè, affetto e bei ricordi"],
    "Como una taza servida con calma, este rincón guarda conversaciones bonitas, aromas dulces y momentos para compartir contigo.": ["Como una taza servida con calma, este rincón guarda conversaciones bonitas, aromas dulces y momentos para compartir contigo.", "Like a cup served slowly, this corner holds lovely conversations, sweet aromas, and moments to share with you.", "Come una tazza servita con calma, questo angolo custodisce belle conversazioni, dolci aromi e momenti da condividere con te."],
    "Ilustración de una taza de café sobre una mesa clara, acompañada de flores": ["Ilustración de una taza de café sobre una mesa clara, acompañada de flores", "Illustration of a coffee cup on a light table, accompanied by flowers", "Illustrazione di una tazza di caffè su un tavolo chiaro, accompagnata da fiori"],
    "Una taza llena de cariño": ["Una taza llena de cariño", "A cup filled with affection", "Una tazza piena d’affetto"],
    "Ilustración de granos de café, una rama y una taza vista desde arriba": ["Ilustración de granos de café, una rama y una taza vista desde arriba", "Illustration of coffee beans, a branch, and a cup viewed from above", "Illustrazione di chicchi di caffè, un ramo e una tazza vista dall’alto"],
    "Aromas que abrazan": ["Aromas que abrazan", "Aromas that embrace", "Aromi che abbracciano"],
    "Un regalo para escuchar": ["Un regalo para escuchar", "A gift to listen to", "Un regalo da ascoltare"],
    "Canciones para ti": ["Canciones para ti", "Songs for you", "Canzoni per te"],
    "Algunas de las canciones que me hiciste escuchar, Lía": ["Algunas de las canciones que me hiciste escuchar, Lía", "Some of the songs you introduced me to, Lía", "Alcune delle canzoni che mi hai fatto ascoltare, Lía"],
    "Cinco canciones que acompañan este pequeño universo de cariño. La música ambiental intentará comenzar al entrar; si el navegador la bloquea, usa el control superior.": ["Cinco canciones que acompañan este pequeño universo de cariño. La música ambiental intentará comenzar al entrar; si el navegador la bloquea, usa el control superior.", "Five songs accompany this little universe of affection. The ambient music will try to start when you enter; if the browser blocks it, use the control above.", "Cinque canzoni accompagnano questo piccolo universo d’affetto. La musica d’atmosfera proverà ad avviarsi all’ingresso; se il browser la blocca, usa il controllo in alto."],
    "Buscar Por Ti de 3AM en Spotify": ["Buscar Por Ti de 3AM en Spotify", "Search for Por Ti by 3AM on Spotify", "Cerca Por Ti dei 3AM su Spotify"],
    "Buscar San Cipriano de La Santa en Spotify": ["Buscar San Cipriano de La Santa en Spotify", "Search for San Cipriano by La Santa on Spotify", "Cerca San Cipriano di La Santa su Spotify"],
    "Buscar EL CIELO de Rels B en Spotify": ["Buscar EL CIELO de Rels B en Spotify", "Search for EL CIELO by Rels B on Spotify", "Cerca EL CIELO di Rels B su Spotify"],
    "Canción elegida": ["Canción elegida", "Selected song", "Canzone scelta"],
    "Buscar Eres la herida más bonita de Mr. Yeff en Spotify": ["Buscar Eres la herida más bonita de Mr. Yeff en Spotify", "Search for Eres la herida más bonita by Mr. Yeff on Spotify", "Cerca Eres la herida más bonita di Mr. Yeff su Spotify"],
    "Abrir Eres la herida más bonita de Mr. Yeff en Spotify": ["Abrir Eres la herida más bonita de Mr. Yeff en Spotify", "Open Eres la herida más bonita by Mr. Yeff on Spotify", "Apri Eres la herida más bonita di Mr. Yeff su Spotify"],
    "Buscar Eres mi más hermosa canción de Mr. Yeff en Spotify": ["Buscar Eres mi más hermosa canción de Mr. Yeff en Spotify", "Search for Eres mi más hermosa canción by Mr. Yeff on Spotify", "Cerca Eres mi más hermosa canción di Mr. Yeff su Spotify"],
    "Escuchar en Spotify": ["Escuchar en Spotify", "Listen on Spotify", "Ascolta su Spotify"],
    "Reproductor de Spotify para Eres la herida más bonita de Mr. Yeff": ["Reproductor de Spotify para Eres la herida más bonita de Mr. Yeff", "Spotify player for Eres la herida más bonita by Mr. Yeff", "Lettore Spotify per Eres la herida más bonita di Mr. Yeff"],
    "Canción destacada: Eres la herida más bonita — Mr. Yeff": ["Canción destacada: Eres la herida más bonita — Mr. Yeff", "Featured song: Eres la herida más bonita — Mr. Yeff", "Canzone in evidenza: Eres la herida más bonita — Mr. Yeff"],
    "Abrir Eres la herida más bonita en Spotify": ["Abrir Eres la herida más bonita en Spotify", "Open Eres la herida más bonita on Spotify", "Apri Eres la herida más bonita su Spotify"],
    "Pulsa reproducir en Spotify. Al comenzar la canción, la música ambiental se pausará.": ["Pulsa reproducir en Spotify. Al comenzar la canción, la música ambiental se pausará.", "Press play in Spotify. When the song starts, the ambient music will pause.", "Premi play su Spotify. Quando inizia la canzone, la musica d’atmosfera verrà messa in pausa."],
    "No se pudo cargar el reproductor. Abrir Eres la herida más bonita en Spotify": ["No se pudo cargar el reproductor. Abrir Eres la herida más bonita en Spotify", "The player could not load. Open Eres la herida más bonita on Spotify", "Impossibile caricare il lettore. Apri Eres la herida más bonita su Spotify"],
    "Los demás botones abren una búsqueda del tema en Spotify.": ["Los demás botones abren una búsqueda del tema en Spotify.", "The other buttons open a search for the song on Spotify.", "Gli altri pulsanti aprono una ricerca del brano su Spotify."],
    "Capítulo II: Rincón de cariño": ["Capítulo II: Rincón de cariño", "Chapter II: A Corner of Affection", "Capitolo II: Un angolo d’affetto"],
    "Capítulo II": ["Capítulo II", "Chapter II", "Capitolo II"],
    "Tu rincón de cariño": ["Tu rincón de cariño", "Your corner of affection", "Il tuo angolo d’affetto"],
    "Lia, este rincón está lleno de Snoopy, amistad y rosas que florecen para celebrar todo lo bonito que eres.": ["Lia, este rincón está lleno de Snoopy, amistad y rosas que florecen para celebrar todo lo bonito que eres.", "Lia, this corner is filled with Snoopy, friendship, and roses blooming to celebrate everything beautiful about you.", "Lia, questo angolo è pieno di Snoopy, amicizia e rose che sbocciano per celebrare tutto ciò che c’è di bello in te."],
    "Un poquito de Snoopy para ti": ["Un poquito de Snoopy para ti", "A little Snoopy for you", "Un po’ di Snoopy per te"],
    "Una colección dulce para acompañar tus momentos felices.": ["Una colección dulce para acompañar tus momentos felices.", "A sweet collection to accompany your happiest moments.", "Una dolce collezione per accompagnare i tuoi momenti felici."],
    "Snoopy sostiene una flor rosada": ["Snoopy sostiene una flor rosada", "Snoopy holds a pink flower", "Snoopy tiene un fiore rosa"],
    "Un detalle para ti": ["Un detalle para ti", "A little gift for you", "Un pensiero per te"],
    "Snoopy abraza un corazón bajo un diente de león": ["Snoopy abraza un corazón bajo un diente de león", "Snoopy hugs a heart beneath a dandelion", "Snoopy abbraccia un cuore sotto un soffione"],
    "Un abrazo sincero": ["Un abrazo sincero", "A heartfelt hug", "Un abbraccio sincero"],
    "Snoopy y Woodstock sentados juntos": ["Snoopy y Woodstock sentados juntos", "Snoopy and Woodstock sitting together", "Snoopy e Woodstock seduti insieme"],
    "Amigos inseparables": ["Amigos inseparables", "Inseparable friends", "Amici inseparabili"],
    "Snoopy descansa sobre su casita roja": ["Snoopy descansa sobre su casita roja", "Snoopy rests on his red doghouse", "Snoopy riposa sulla sua cuccia rossa"],
    "Soñando a gusto": ["Soñando a gusto", "Dreaming peacefully", "Sognando serenamente"],
    "Imágenes inspiradas en el": ["Imágenes inspiradas en el", "Images inspired by the", "Immagini ispirate alla"],
    "tablero «Snupy» de Jenna en Pinterest": ["tablero «Snupy» de Jenna en Pinterest", "Jenna’s “Snupy” board on Pinterest", "bacheca “Snupy” di Jenna su Pinterest"],
    "Rosas reales para Lia": ["Rosas reales para Lia", "Real roses for Lia", "Rose vere per Lia"],
    "Un ramo de colores y cariño, elegido para ti.": ["Un ramo de colores y cariño, elegido para ti.", "A bouquet of color and affection, chosen for you.", "Un bouquet di colori e affetto, scelto per te."],
    "Rosa roja abierta, fotografiada de cerca": ["Rosa roja abierta, fotografiada de cerca", "Open red rose photographed up close", "Rosa rossa aperta fotografata da vicino"],
    "Una rosa, solo para ti": ["Una rosa, solo para ti", "A rose, just for you", "Una rosa, solo per te"],
    "Foto:": ["Foto:", "Photo:", "Foto:"],
    "(redimensionada)": ["(redimensionada)", "(resized)", "(ridimensionata)"],
    "Primer plano de una rosa en flor": ["Primer plano de una rosa en flor", "Close-up of a rose in bloom", "Primo piano di una rosa in fiore"],
    "La belleza de cada pétalo": ["La belleza de cada pétalo", "The beauty of every petal", "La bellezza di ogni petalo"],
    "Rosa roja en un jardín de rosas": ["Rosa roja en un jardín de rosas", "Red rose in a rose garden", "Rosa rossa in un roseto"],
    "Que siempre florezca tu alegría": ["Que siempre florezca tu alegría", "May your joy always bloom", "Che la tua gioia fiorisca sempre"],
    "Lia iluminada por una mirada llena de ternura": ["Lia iluminada por una mirada llena de ternura", "Lia lit by a gaze full of tenderness", "Lia illuminata da uno sguardo pieno di tenerezza"],
    "Tu luz suave": ["Tu luz suave", "Your gentle light", "La tua luce delicata"],
    "Lia en un momento sereno y lleno de paz": ["Lia en un momento sereno y lleno de paz", "Lia in a serene and peaceful moment", "Lia in un momento sereno e pieno di pace"],
    "Instantes de paz": ["Instantes de paz", "Moments of peace", "Istanti di pace"],
    "La sonrisa espontánea y hermosa de Lia": ["La sonrisa espontánea y hermosa de Lia", "Lia’s beautiful, spontaneous smile", "Il sorriso spontaneo e meraviglioso di Lia"],
    "Tu sonrisa bonita": ["Tu sonrisa bonita", "Your beautiful smile", "Il tuo bel sorriso"],
    "Capítulo III: Una carta para ti": ["Capítulo III: Una carta para ti", "Chapter III: A Letter for You", "Capitolo III: Una lettera per te"],
    "Capítulo III": ["Capítulo III", "Chapter III", "Capitolo III"],
    "Una carta para ti": ["Una carta para ti", "A letter for you", "Una lettera per te"],
    "Toca el sobre. Déjalo abrirse. Lee despacio.": ["Toca el sobre. Déjalo abrirse. Lee despacio.", "Tap the envelope. Let it open. Read slowly.", "Tocca la busta. Lasciala aprire. Leggi lentamente."],
    "Abrir carta de cumpleaños para Lia": ["Abrir carta de cumpleaños para Lia", "Open Lia’s birthday letter", "Apri la lettera di compleanno per Lia"],
    "Abrir carta de cumpleaños": ["Abrir carta de cumpleaños", "Open birthday letter", "Apri la lettera di compleanno"],
    "Mensaje de cumpleaños para Lia": ["Mensaje de cumpleaños para Lia", "Birthday message for Lia", "Messaggio di compleanno per Lia"],
    "28 de noviembre de 2026": ["28 de noviembre de 2026", "November 28, 2026", "28 novembre 2026"],
    "Para mi Lía Linda": ["Para mi Lía Linda", "For my Lía Linda", "Per la mia Lía Linda"],
    "¡Felices 21, querida Lia!": ["¡Felices 21, querida Lia!", "Happy 21st, dear Lia!", "Buon 21° compleanno, cara Lia!"],
    "Hay días que brillan distinto. Hoy es uno de ellos: el día en que el mundo se detiene un segundo para celebrarte.": ["Hay días que brillan distinto. Hoy es uno de ellos: el día en que el mundo se detiene un segundo para celebrarte.", "Some days shine differently. Today is one of them: the day the world pauses for a moment to celebrate you.", "Ci sono giorni che brillano in modo diverso. Oggi è uno di quelli: il giorno in cui il mondo si ferma un istante per festeggiarti."],
    "Que este pequeño universo te recuerde lo valiosa que eres: tu ternura, tu magia y la forma en que llenas de luz lo cotidiano.": ["Que este pequeño universo te recuerde lo valiosa que eres: tu ternura, tu magia y la forma en que llenas de luz lo cotidiano.", "May this little universe remind you how precious you are: your tenderness, your magic, and the way you fill everyday life with light.", "Che questo piccolo universo ti ricordi quanto sei preziosa: la tua dolcezza, la tua magia e il modo in cui riempi di luce la quotidianità."],
    "Que tu año nuevo personal traiga rosas, risas, abrazos suaves y todas las sorpresas bonitas que mereces.": ["Que tu año nuevo personal traiga rosas, risas, abrazos suaves y todas las sorpresas bonitas que mereces.", "May your new year of life bring roses, laughter, gentle hugs, and every beautiful surprise you deserve.", "Che il tuo nuovo anno di vita porti rose, risate, dolci abbracci e tutte le belle sorprese che meriti."],
    "Con mucho cariño, Giussepe": ["Con mucho cariño, Giussepe", "With lots of love, Giussepe", "Con tanto affetto, Giussepe"],
    "Capítulo IV: 28 de noviembre de 2026": ["Capítulo IV: 28 de noviembre de 2026", "Chapter IV: November 28, 2026", "Capitolo IV: 28 novembre 2026"],
    "Capítulo IV": ["Capítulo IV", "Chapter IV", "Capitolo IV"],
    "El día marcado en oro": ["El día marcado en oro", "The day marked in gold", "Il giorno segnato in oro"],
    "noviembre": ["noviembre", "November", "novembre"],
    "El día en que Lia hace magia con solo existir.": ["El día en que Lia hace magia con solo existir.", "The day Lia creates magic simply by existing.", "Il giorno in cui Lia crea magia semplicemente esistendo."],
    "Cuenta regresiva para el cumpleaños de Lia": ["Cuenta regresiva para el cumpleaños de Lia", "Countdown to Lia’s birthday", "Conto alla rovescia per il compleanno di Lia"],
    "Cuenta atrás": ["Cuenta atrás", "Countdown", "Conto alla rovescia"],
    "Cuenta regresiva al 28 de noviembre de 2026": ["Cuenta regresiva al 28 de noviembre de 2026", "Countdown to November 28, 2026", "Conto alla rovescia fino al 28 novembre 2026"],
    "Días": ["Días", "Days", "Giorni"],
    "Horas": ["Horas", "Hours", "Ore"],
    "Min": ["Min", "Min", "Min"],
    "¡Feliz cumpleaños, Natalia Greys Terraza Taipe!": ["¡Feliz cumpleaños, Natalia Greys Terraza Taipe!", "Happy birthday, Natalia Greys Terraza Taipe!", "Buon compleanno, Natalia Greys Terraza Taipe!"],
    "La cuenta regresiva termina el 28 de noviembre de 2026.": ["La cuenta regresiva termina el 28 de noviembre de 2026.", "The countdown ends on November 28, 2026.", "Il conto alla rovescia termina il 28 novembre 2026."],
    "21 años llenos de magia y cariño": ["21 años llenos de magia y cariño", "21 years filled with magic and affection", "21 anni pieni di magia e affetto"],
    "Última página: Celebración y felicitaciones": ["Última página: Celebración y felicitaciones", "Final page: Celebration and wishes", "Ultima pagina: Festa e auguri"],
    "Última página": ["Última página", "Final page", "Ultima pagina"],
    "Para una persona muy especial": ["Para una persona muy especial", "For a very special person", "Per una persona davvero speciale"],
    "Feliz cumpleaños, Lía Linda": ["Feliz cumpleaños, Lía Linda", "Happy birthday, Lía Linda", "Buon compleanno, Lía Linda"],
    "Que tu mundo siempre esté lleno de magia": ["Que tu mundo siempre esté lleno de magia", "May your world always be filled with magic", "Che il tuo mondo sia sempre pieno di magia"],
    "Dedicatoria de Giussepe para Lía Linda": ["Dedicatoria de Giussepe para Lía Linda", "Giussepe’s dedication to Lía Linda", "Dedica di Giussepe a Lía Linda"],
    "Lía Linda, deseo que este nuevo año de vida te regale alegría, salud, sueños cumplidos y muchos momentos hermosos. Gracias por ser una persona tan especial y por llenar de cariño la vida de quienes te rodean.": ["Lía Linda, deseo que este nuevo año de vida te regale alegría, salud, sueños cumplidos y muchos momentos hermosos. Gracias por ser una persona tan especial y por llenar de cariño la vida de quienes te rodean.", "Lía Linda, I hope this new year of your life brings you joy, health, dreams fulfilled, and many beautiful moments. Thank you for being such a special person and for filling the lives of those around you with affection.", "Lía Linda, spero che questo nuovo anno della tua vita ti regali gioia, salute, sogni realizzati e tanti momenti meravigliosi. Grazie per essere una persona così speciale e per riempire d’affetto la vita di chi ti circonda."],
    "Felicitaciones para Lia en español, inglés e italiano": ["Felicitaciones para Lia en español, inglés e italiano", "Birthday wishes for Lia in Spanish, English, and Italian", "Auguri per Lia in spagnolo, inglese e italiano"],
    "En español": ["En español", "In Spanish", "In spagnolo"],
    "¡Feliz cumpleaños, Lia! Que tus 21 estén llenos de momentos que te hagan sonreír, sueños que se vuelvan realidad y todo el amor que mereces. Gracias por iluminar el mundo con tu forma tan única de ser. Hoy y siempre, que la vida te regale cosas tan bonitas como tú.": ["¡Feliz cumpleaños, Lia! Que tus 21 estén llenos de momentos que te hagan sonreír, sueños que se vuelvan realidad y todo el amor que mereces. Gracias por iluminar el mundo con tu forma tan única de ser. Hoy y siempre, que la vida te regale cosas tan bonitas como tú.", "Happy birthday, Lia! May your 21st year be filled with moments that make you smile, dreams coming true, and all the love you deserve. Thank you for brightening the world in your own unique way. Today and always, may life bring you things as lovely as you are.", "Buon compleanno, Lia! Che i tuoi 21 anni siano pieni di momenti che ti facciano sorridere, sogni che diventano realtà e tutto l’amore che meriti. Grazie per illuminare il mondo con il tuo modo unico di essere. Oggi e sempre, che la vita ti regali cose belle proprio come te."],
    "In English": ["En inglés", "In English", "In inglese"],
    "Happy birthday, Lia! May your 21st year be filled with moments that make you smile, dreams coming true, and all the love you deserve. Thank you for brightening the world in your own special way. Today and always, may life bring you things as lovely as you are.": ["¡Feliz cumpleaños, Lia! Que tus 21 años estén llenos de momentos que te hagan sonreír, sueños cumplidos y todo el amor que mereces. Gracias por iluminar el mundo con tu forma especial de ser. Hoy y siempre, que la vida te regale cosas tan bonitas como tú.", "Happy birthday, Lia! May your 21st year be filled with moments that make you smile, dreams coming true, and all the love you deserve. Thank you for brightening the world in your own special way. Today and always, may life bring you things as lovely as you are.", "Buon compleanno, Lia! Che i tuoi 21 anni siano pieni di momenti che ti facciano sorridere, sogni realizzati e tutto l’amore che meriti. Grazie per illuminare il mondo con il tuo modo speciale di essere. Oggi e sempre, che la vita ti regali cose belle proprio come te."],
    "In italiano": ["En italiano", "In Italian", "In italiano"],
    "Buon compleanno, Lia! Che i tuoi 21 anni siano pieni di momenti capaci di farti sorridere, sogni che diventano realtà e tutto l’amore che meriti. Grazie per illuminare il mondo con il tuo modo speciale di essere. Oggi e sempre, che la vita ti regali cose belle proprio come te.": ["¡Feliz cumpleaños, Lia! Que tus 21 años estén llenos de momentos que te hagan sonreír, sueños que se vuelvan realidad y todo el amor que mereces. Gracias por iluminar el mundo con tu forma especial de ser. Hoy y siempre, que la vida te regale cosas tan bonitas como tú.", "Happy birthday, Lia! May your 21st year be filled with moments that make you smile, dreams coming true, and all the love you deserve. Thank you for brightening the world in your own special way. Today and always, may life bring you things as lovely as you are.", "Buon compleanno, Lia! Che i tuoi 21 anni siano pieni di momenti capaci di farti sorridere, sogni che diventano realtà e tutto l’amore che meriti. Grazie per illuminare il mondo con il tuo modo speciale di essere. Oggi e sempre, che la vita ti regali cose belle proprio come te."],
    "Lia compartiendo un momento radiante": ["Lia compartiendo un momento radiante", "Lia sharing a radiant moment", "Lia condivide un momento radioso"],
    "Siempre radiante": ["Siempre radiante", "Always radiant", "Sempre radiosa"],
    "La mirada cómplice y cariñosa de Lia": ["La mirada cómplice y cariñosa de Lia", "Lia’s warm, knowing gaze", "Lo sguardo complice e affettuoso di Lia"],
    "Un abrazo al corazón": ["Un abrazo al corazón", "A hug for the heart", "Un abbraccio al cuore"],
    "Cerrar y volver a abrir": ["Cerrar y volver a abrir", "Close and open again", "Chiudi e riapri"],
    "Abrir el libro": ["Abrir el libro", "Open the book", "Apri il libro"],
    "Páginas del libro": ["Páginas del libro", "Book pages", "Pagine del libro"],
    "Página anterior": ["Página anterior", "Previous page", "Pagina precedente"],
    "Anterior": ["Anterior", "Previous", "Indietro"],
    "Capítulo 1": ["Capítulo 1", "Chapter 1", "Capitolo 1"],
    "Capítulo 2": ["Capítulo 2", "Chapter 2", "Capitolo 2"],
    "Capítulo 3": ["Capítulo 3", "Chapter 3", "Capitolo 3"],
    "Capítulo 4": ["Capítulo 4", "Chapter 4", "Capitolo 4"],
    "Página siguiente": ["Página siguiente", "Next page", "Pagina successiva"],
    "Siguiente": ["Siguiente", "Next", "Avanti"],
    "Fin": ["Fin", "End", "Fine"]
  };

  const languages = ["es", "en", "it"];
  const textBindings = [];
  const attributeBindings = [];
  let currentLanguage = "es";

  function languageIndex(language) {
    return Math.max(0, languages.indexOf(language));
  }

  function translate(source, language = currentLanguage) {
    const entry = translations[source];
    return entry ? entry[languageIndex(language)] : source;
  }

  function bindStaticContent() {
    const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.parentElement || node.parentElement.closest("script, style")) return NodeFilter.FILTER_REJECT;
        const source = node.nodeValue.trim();
        return translations[source] ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });

    let node;
    while ((node = walker.nextNode())) {
      textBindings.push({ node, source: node.nodeValue.trim() });
    }

    document.querySelectorAll("[aria-label], [title], [alt], meta[name='description']").forEach((element) => {
      ["aria-label", "title", "alt", "content"].forEach((attribute) => {
        const source = element.getAttribute(attribute);
        if (source && translations[source]) attributeBindings.push({ element, attribute, source });
      });
    });
  }

  function applyLanguage(language) {
    if (!languages.includes(language)) return;
    currentLanguage = language;
    document.documentElement.lang = language;

    textBindings.forEach(({ node, source }) => {
      const leading = node.nodeValue.match(/^\s*/)?.[0] || "";
      const trailing = node.nodeValue.match(/\s*$/)?.[0] || "";
      node.nodeValue = `${leading}${translate(source, language)}${trailing}`;
    });
    attributeBindings.forEach(({ element, attribute, source }) => {
      element.setAttribute(attribute, translate(source, language));
    });

    document.querySelectorAll(".language-switcher__btn").forEach((button) => {
      const active = button.dataset.language === language;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll(".birthday-tribute[lang]").forEach((element) => {
      element.lang = language;
    });

    window.dispatchEvent(new CustomEvent("lia:languagechange", { detail: { language } }));
  }

  function init() {
    bindStaticContent();
    document.querySelectorAll(".language-switcher__btn").forEach((button) => {
      button.addEventListener("click", () => applyLanguage(button.dataset.language));
    });
    applyLanguage("es");
  }

  window.LiaI18n = {
    get language() { return currentLanguage; },
    t: translate,
    setLanguage: applyLanguage
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
