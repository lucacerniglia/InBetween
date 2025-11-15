const { useState, useEffect } = React;
const { Globe, BookOpen, Info, Heart, ArrowLeft, Save, SkipForward } = lucide;

const translations = {
  it: {
    welcomeTitle: 'InBetween',
    welcomeSubtitle: 'Uno spazio per osservare ciò che accade quando non accade nulla.',
    welcomeText: 'InBetween non serve per distrarsi, ma per restare. Ti accompagna a esplorare la noia come spazio di pensiero e creatività. Prenditi un momento. Quando sei pronto, inizia.',
    startButton: 'Inizia il momento IB',
    checkInTitle: 'Come ti senti in questo momento?',
    checkInIntro: 'Rispondi intuitivamente. Non devi riflettere troppo: lasciati guidare da ciò che senti ora.',
    question1: 'Ti senti stimolato o svuotato?',
    question1Min: 'Svuotato',
    question1Max: 'Stimolato',
    question2: 'Hai cercato qualcosa da fare senza trovarlo?',
    question2Min: 'Mai',
    question2Max: 'Continuamente',
    question3: 'Quanto senti che il tempo si è fermato?',
    question3Min: 'Per nulla',
    question3Max: 'Completamente',
    discoverState: 'Scopri il tuo stato IB',
    insightTitle: 'Ecco il tuo stato IB',
    insightIntro: 'Questo momento ti parla attraverso la noia. Ascoltala.',
    writeThought: 'Annota ciò che ti è venuto in mente',
    skip: 'Salta',
    diaryTitle: 'Annota un frammento',
    diaryIntro: 'Scrivi una parola, una frase, o un\'immagine che ti è venuta in mente ora. Non serve che abbia senso.',
    diaryPlaceholder: 'Il tuo frammento...',
    save: 'Salva il pensiero',
    savedMessage: 'Ogni pensiero è una piccola traccia della tua presenza.',
    goToArchive: 'Vai alle tue tracce',
    archiveTitle: 'Le tue tracce IB',
    noThoughts: 'Nessuna traccia ancora. Inizia il tuo primo momento IB.',
    newMoment: 'Nuovo momento IB',
    supportTitle: 'Sostieni il progetto',
    supportText: 'InBetween è gratuito e sempre lo sarà. Se vuoi sostenere lo sviluppo del progetto, puoi fare una piccola donazione simbolica tramite PayPal. Ogni contributo serve a mantenere viva la ricerca e la creatività di questo spazio.',
    supportButton: 'Sostieni InBetween',
    thanksMessage: 'Grazie. Anche un piccolo gesto tiene vivo lo spazio tra.',
    infoTitle: 'Info',
    infoText: 'InBetween (IB) è un esperimento digitale per esplorare la noia come spazio creativo e riflessivo. Tutti i dati restano privati sul tuo dispositivo. Non è un\'app terapeutica.',
    home: 'Home',
    back: 'Indietro',
    saved: 'Salvato.',
  },
  en: {
    welcomeTitle: 'InBetween',
    welcomeSubtitle: 'A space to observe what happens when nothing happens.',
    welcomeText: 'InBetween is not meant for distraction, but for staying. It helps you explore boredom as a space of thought and creativity. Take a moment. When you\'re ready, begin.',
    startButton: 'Start your IB moment',
    checkInTitle: 'How do you feel right now?',
    checkInIntro: 'Answer intuitively. Don\'t think too much—just follow what you feel now.',
    question1: 'Do you feel stimulated or drained?',
    question1Min: 'Drained',
    question1Max: 'Stimulated',
    question2: 'Have you been looking for something to do without finding it?',
    question2Min: 'Never',
    question2Max: 'Constantly',
    question3: 'How much do you feel that time has stopped?',
    question3Min: 'Not at all',
    question3Max: 'Completely',
    discoverState: 'See your IB state',
    insightTitle: 'Here\'s your IB state',
    insightIntro: 'This moment speaks through your boredom. Listen to it.',
    writeThought: 'Write down what came to mind',
    skip: 'Skip',
    diaryTitle: 'Write a fragment',
    diaryIntro: 'Write a word, a phrase, or an image that came to you now. It doesn\'t have to make sense.',
    diaryPlaceholder: 'Your fragment...',
    save: 'Save thought',
    savedMessage: 'Every thought is a small trace of your presence.',
    goToArchive: 'Go to your traces',
    archiveTitle: 'Your IB traces',
    noThoughts: 'No traces yet. Start your first IB moment.',
    newMoment: 'New IB moment',
    supportTitle: 'Support the project',
    supportText: 'InBetween is free and always will be. If you want to support the development of the project, you can make a small symbolic donation via PayPal. Every contribution helps keep the research and creativity of this space alive.',
    supportButton: 'Support InBetween',
    thanksMessage: 'Thank you. Even a small gesture keeps the space between alive.',
    infoTitle: 'Info',
    infoText: 'InBetween (IB) is a digital experiment to explore boredom as a creative and reflective space. All data remains private on your device. This is not a therapeutic app.',
    home: 'Home',
    back: 'Back',
    saved: 'Saved.',
  }
};

const phrasesDB = {
  it: [
    { id: 1, frase: "La quiete è la forma più sottile di curiosità.", livello_noia: "bassa" },
    { id: 2, frase: "Ogni pausa è una soglia invisibile.", livello_noia: "bassa" },
    { id: 3, frase: "Forse non ti annoi: stai solo osservando meglio il mondo.", livello_noia: "bassa" },
    { id: 4, frase: "Respirare è già un atto di presenza.", livello_noia: "bassa" },
    { id: 5, frase: "L'attesa non è vuota, è piena di silenzio.", livello_noia: "bassa" },
    { id: 6, frase: "Il vuoto non è assenza, è disponibilità.", livello_noia: "bassa" },
    { id: 7, frase: "Il tempo che non riempi ti riempie.", livello_noia: "media" },
    { id: 8, frase: "L'immaginazione comincia dove finisce la necessità.", livello_noia: "media" },
    { id: 9, frase: "L'assenza di stimolo è un invito alla scoperta.", livello_noia: "media" },
    { id: 10, frase: "Tra un pensiero e l'altro, c'è tutto lo spazio del mondo.", livello_noia: "media" },
    { id: 11, frase: "La noia è il sussurro dell'anima che chiede attenzione.", livello_noia: "media" },
    { id: 12, frase: "I momenti vuoti sono i più pieni di possibilità.", livello_noia: "media" },
    { id: 13, frase: "Quando non accade nulla, accade tutto ciò che non vedi.", livello_noia: "media" },
    { id: 14, frase: "Forse la tua mente sta solo cercando spazio.", livello_noia: "alta" },
    { id: 15, frase: "Resta nel vuoto: è un laboratorio invisibile.", livello_noia: "alta" },
    { id: 16, frase: "La tua noia è il confine tra ciò che conosci e ciò che puoi inventare.", livello_noia: "alta" },
    { id: 17, frase: "Il vuoto è solo una forma diversa di attenzione.", livello_noia: "alta" },
    { id: 18, frase: "Nel mezzo di niente, tutto può accadere.", livello_noia: "alta" },
    { id: 19, frase: "Il tempo si ferma solo per chi sa guardare.", livello_noia: "alta" },
    { id: 20, frase: "La noia profonda è la porta verso l'inatteso.", livello_noia: "alta" },
  ],
  en: [
    { id: 1, frase: "Stillness is the subtlest form of curiosity.", livello_noia: "bassa" },
    { id: 2, frase: "Every pause is an invisible threshold.", livello_noia: "bassa" },
    { id: 3, frase: "Maybe you're not bored—you're just seeing better.", livello_noia: "bassa" },
    { id: 4, frase: "Breathing is already an act of presence.", livello_noia: "bassa" },
    { id: 5, frase: "Waiting is not empty, it's full of silence.", livello_noia: "bassa" },
    { id: 6, frase: "Emptiness is not absence, it's availability.", livello_noia: "bassa" },
    { id: 7, frase: "The time you don't fill, fills you.", livello_noia: "media" },
    { id: 8, frase: "Imagination begins where necessity ends.", livello_noia: "media" },
    { id: 9, frase: "The absence of stimulus is an invitation to discovery.", livello_noia: "media" },
    { id: 10, frase: "Between one thought and another, there's all the space in the world.", livello_noia: "media" },
    { id: 11, frase: "Boredom is the soul's whisper asking for attention.", livello_noia: "media" },
    { id: 12, frase: "Empty moments are the fullest of possibilities.", livello_noia: "media" },
    { id: 13, frase: "When nothing happens, everything you don't see happens.", livello_noia: "media" },
    { id: 14, frase: "Your mind might just be looking for space.", livello_noia: "alta" },
    { id: 15, frase: "Stay in the void: it's an invisible workshop.", livello_noia: "alta" },
    { id: 16, frase: "Your boredom is the boundary between what you know and what you can invent.", livello_noia: "alta" },
    { id: 17, frase: "Emptiness is just another form of attention.", livello_noia: "alta" },
    { id: 18, frase: "In the middle of nothing, everything can happen.", livello_noia: "alta" },
    { id: 19, frase: "Time stops only for those who know how to look.", livello_noia: "alta" },
    { id: 20, frase: "Deep boredom is the door to the unexpected.", livello_noia: "alta" },
  ]
};

function InBetween() {
  const [lang, setLang] = useState('it');
  const [screen, setScreen] = useState('welcome');
  const [score1, setScore1] = useState(5);
  const [score2, setScore2] = useState(5);
  const [score3, setScore3] = useState(5);
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [diaryText, setDiaryText] = useState('');
  const [thoughts, setThoughts] = useState([]);
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  const t = translations[lang];

  useEffect(() => {
    lucide.createIcons();
    const saved = localStorage.getItem('inbetween_thoughts');
    if (saved) {
      try {
        setThoughts(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading thoughts');
      }
    }
  }, []);

  useEffect(() => {
    lucide.createIcons();
  });

  const calculateScore = () => {
    const avg = (score1 + score2 + score3) / 3;
    let level = 'bassa';
    if (avg > 7) level = 'alta';
    else if (avg > 3) level = 'media';
    
    const levelPhrases = phrasesDB[lang].filter(p => p.livello_noia === level);
    const randomPhrase = levelPhrases[Math.floor(Math.random() * levelPhrases.length)];
    setCurrentPhrase(randomPhrase.frase);
    setScreen('insight');
  };

  const saveThought = async () => {
    if (diaryText.trim()) {
      setIsSaving(true);
      
      try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1000,
            messages: [{
              role: "user",
              content: `Sei l'anima contemplativa di InBetween. Un utente ha scritto: "${diaryText}". Rispondi con UNA frase breve (max 15 parole) poetica e contemplativa in ${lang === 'it' ? 'italiano' : 'inglese'}. SOLO la frase, senza virgolette.`
            }],
          })
        });

        const data = await response.json();
        const feedback = data.content.map(i => i.type === "text" ? i.text : "").join("").trim();
        setFeedbackMessage(feedback || t.savedMessage);
      } catch (error) {
        setFeedbackMessage(t.savedMessage);
      }
      
      const newThought = {
        id: Date.now(),
        data: new Date().toISOString(),
        testo: diaryText,
      };
      
      const updated = [newThought, ...thoughts];
      setThoughts(updated);
      localStorage.setItem('inbetween_thoughts', JSON.stringify(updated));
      
      setDiaryText('');
      setIsSaving(false);
      setShowSavedMessage(true);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-US', {
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F3EFE8', fontFamily: 'Lato, sans-serif' }}>
      {screen !== 'welcome' && (
        <header className="border-b" style={{ borderColor: '#E0D9D0' }}>
          <nav className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
            <button onClick={() => setScreen('welcome')} className="flex items-center space-x-3">
              <div className="flex flex-col items-center">
                <div className="text-2xl tracking-widest" style={{ color: '#748B97' }}>| |</div>
                <div className="text-xs font-bold tracking-wider mt-1" style={{ color: '#748B97' }}>IB</div>
              </div>
            </button>
            <div className="flex items-center space-x-4">
              <button onClick={() => setScreen('archive')} style={{ color: '#748B97' }}><i data-lucide="book-open"></i></button>
              <button onClick={() => setScreen('support')} style={{ color: '#748B97' }}><i data-lucide="heart"></i></button>
              <button onClick={() => setScreen('info')} style={{ color: '#748B97' }}><i data-lucide="info"></i></button>
              <button onClick={() => setLang(lang === 'it' ? 'en' : 'it')} className="px-4 py-2 rounded-lg flex items-center space-x-2" style={{ backgroundColor: '#748B97', color: '#F3EFE8' }}>
                <i data-lucide="globe"></i><span>{lang === 'it' ? 'EN' : 'IT'}</span>
              </button>
            </div>
          </nav>
        </header>
      )}

      {screen === 'welcome' && (
        <div className="absolute top-6 right-6">
          <button onClick={() => setLang(lang === 'it' ? 'en' : 'it')} className="px-4 py-2 rounded-lg flex items-center space-x-2" style={{ backgroundColor: '#748B97', color: '#F3EFE8' }}>
            <i data-lucide="globe"></i><span>{lang === 'it' ? 'EN' : 'IT'}</span>
          </button>
        </div>
      )}

      <main className="min-h-[calc(100vh-100px)] py-8">
        {screen === 'welcome' && (
          <div className="max-w-2xl mx-auto px-6 py-16 text-center space-y-8">
            <div className="flex justify-center mb-8">
              <div className="flex flex-col items-center">
                <div className="text-6xl tracking-widest mb-2" style={{ color: '#748B97' }}>| |</div>
                <div className="text-sm font-bold tracking-wider" style={{ color: '#748B97' }}>IB</div>
              </div>
            </div>
            <h1 className="text-5xl font-light" style={{ color: '#333333' }}>{t.welcomeTitle}</h1>
            <p className="text-2xl font-light" style={{ color: '#555555' }}>{t.welcomeSubtitle}</p>
            <div className="bg-white rounded-lg p-8" style={{ border: '1px solid #E0D9D0' }}>
              <p className="text-lg font-light leading-relaxed" style={{ color: '#555555' }}>{t.welcomeText}</p>
            </div>
            <button onClick={() => setScreen('checkin')} className="px-8 py-4 rounded-lg text-lg" style={{ backgroundColor: '#748B97', color: '#F3EFE8' }}>
              {t.startButton}
            </button>
          </div>
        )}

        {screen === 'checkin' && (
          <div className="max-w-2xl mx-auto px-6 py-8">
            <button onClick={() => setScreen('welcome')} className="mb-6 flex items-center space-x-2 text-sm" style={{ color: '#748B97' }}>
              <i data-lucide="arrow-left"></i><span>{t.back}</span>
            </button>
            <h2 className="text-3xl font-light mb-6 text-center" style={{ color: '#333333' }}>{t.checkInTitle}</h2>
            <p className="text-center mb-12" style={{ color: '#555555' }}>{t.checkInIntro}</p>
            
            {[
              { val: score1, set: setScore1, q: t.question1, min: t.question1Min, max: t.question1Max },
              { val: score2, set: setScore2, q: t.question2, min: t.question2Min, max: t.question2Max },
              { val: score3, set: setScore3, q: t.question3, min: t.question3Min, max: t.question3Max },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-lg p-6 mb-8" style={{ border: '1px solid #E0D9D0' }}>
                <label className="block text-lg font-light mb-4" style={{ color: '#333333' }}>{item.q}</label>
                <div className="flex justify-between text-xs mb-2" style={{ color: '#999999' }}>
                  <span>{item.min}</span><span>{item.max}</span>
                </div>
                <input type="range" min="0" max="10" value={item.val} onChange={(e) => item.set(Number(e.target.value))} className="w-full" style={{ accentColor: '#748B97' }} />
                <div className="text-center mt-2 text-2xl font-light" style={{ color: '#748B97' }}>{item.val}</div>
              </div>
            ))}
            
            <div className="text-center mt-12">
              <button onClick={calculateScore} className="px-8 py-4 rounded-lg text-lg" style={{ backgroundColor: '#748B97', color: '#F3EFE8' }}>
                {t.discoverState}
              </button>
            </div>
          </div>
        )}

        {screen === 'insight' && (
          <div className="max-w-2xl mx-auto px-6 py-8">
            <button onClick={() => setScreen('checkin')} className="mb-6 flex items-center space-x-2 text-sm" style={{ color: '#748B97' }}>
              <i data-lucide="arrow-left"></i><span>{t.back}</span>
            </button>
            <h2 className="text-3xl font-light mb-8 text-center" style={{ color: '#333333' }}>{t.insightTitle}</h2>
            <div className="bg-white rounded-lg p-12 shadow-sm mb-8" style={{ border: '1px solid #E0D9D0' }}>
              <p className="text-2xl font-light text-center leading-relaxed italic" style={{ color: '#333333' }}>"{currentPhrase}"</p>
            </div>
            <div className="space-y-6">
              <button onClick={() => setScreen('diary')} className="w-full px-6 py-4 rounded-lg" style={{ backgroundColor: '#748B97', color: '#F3EFE8' }}>
                {t.writeThought}
              </button>
              <p className="text-center text-sm font-light italic" style={{ color: '#999999' }}>{t.insightIntro}</p>
              <div className="text-center">
                <button onClick={() => setScreen('welcome')} className="inline-flex items-center space-x-1 px-3 py-1 text-xs" style={{ color: '#AAAAAA' }}>
                  <span>{t.skip}</span><i data-lucide="skip-forward"></i>
                </button>
              </div>
            </div>
          </div>
        )}

        {screen === 'diary' && (
          <div className="max-w-2xl mx-auto px-6 py-8">
            <button onClick={() => setScreen('insight')} className="mb-6 flex items-center space-x-2 text-sm" style={{ color: '#748B97' }}>
              <i data-lucide="arrow-left"></i><span>{t.back}</span>
            </button>
            <h2 className="text-3xl font-light mb-4 text-center" style={{ color: '#333333' }}>{t.diaryTitle}</h2>
            <p className="text-center mb-8" style={{ color: '#555555' }}>{t.diaryIntro}</p>

            {showSavedMessage ? (
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-12 text-center" style={{ border: '1px solid #E0D9D0' }}>
                  <p className="text-sm font-light mb-3" style={{ color: '#748B97' }}>{t.saved}</p>
                  <p className="text-xl font-light leading-relaxed italic" style={{ color: '#333333' }}>{feedbackMessage}</p>
                </div>
                <button onClick={() => { setShowSavedMessage(false); setScreen('archive'); }} className="w-full px-6 py-4 rounded-lg" style={{ backgroundColor: '#748B97', color: '#F3EFE8' }}>
                  {t.goToArchive}
                </button>
              </div>
            ) : (
              <>
                <textarea value={diaryText} onChange={(e) => setDiaryText(e.target.value)} placeholder={t.diaryPlaceholder} rows="10" disabled={isSaving} className="w-full bg-white rounded-lg p-6 mb-6 font-light text-lg" style={{ border: '1px solid #E0D9D0', color: '#333333', resize: 'vertical' }} />
                <div className="space-y-6">
                  <button onClick={saveThought} disabled={isSaving || !diaryText.trim()} className="w-full px-6 py-4 rounded-lg flex items-center justify-center space-x-2 disabled:opacity-50" style={{ backgroundColor: '#748B97', color: '#F3EFE8' }}>
                    {isSaving ? <><span className="animate-pulse">●</span><span>{lang === 'it' ? 'Salvando...' : 'Saving...'}</span></> : <><i data-lucide="save"></i><span>{t.save}</span></>}
                  </button>
                  <div className="text-center">
                    <button onClick={() => setScreen('welcome')} disabled={isSaving} className="inline-flex items-center space-x-1 px-3 py-1 text-xs" style={{ color: '#AAAAAA' }}>
                      <span>{t.skip}</span><i data-lucide="skip-forward"></i>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {screen === 'archive' && (
          <div className="max-w-3xl mx-auto px-6 py-8">
            <button onClick={() => setScreen('welcome')} className="mb-6 flex items-center space-x-2 text-sm" style={{ color: '#748B97' }}>
              <i data-lucide="arrow-left"></i><span>{t.home}</span>
            </button>
            <h2 className="text-3xl font-light mb-8 text-center" style={{ color: '#333333' }}>{t.archiveTitle}</h2>
            {thoughts.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center mb-8" style={{ border: '1px solid #E0D9D0' }}>
                <p className="text-lg font-light" style={{ color: '#999999' }}>{t.noThoughts}</p>
              </div>
            ) : (
              <div className="space-y-4 mb-8">
                {thoughts.map(th => (
                  <div key={th.id} className="bg-white rounded-lg p-6" style={{ border: '1px solid #E0D9D0' }}>
                    <div className="text-xs font-light mb-3" style={{ color: '#999999' }}>{formatDate(th.data || th.date)}</div>
                    <p className="font-light" style={{ color: '#333333' }}>{th.testo || th.text}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="text-center">
              <button onClick={() => { setScore1(5); setScore2(5); setScore3(5); setScreen('checkin'); }} className="px-6 py-4 rounded-lg" style={{ backgroundColor: '#748B97', color: '#F3EFE8' }}>
                {t.newMoment}
              </button>
            </div>
          </div>
        )}

        {screen === 'support' && (
          <div className="max-w-2xl mx-auto px-6 py-8">
            <button onClick={() => setScreen('welcome')} className="mb-6 flex items-center space-x-2 text-sm" style={{ color: '#748B97' }}>
              <i data-lucide="arrow-left"></i><span>{t.home}</span>
            </button>
            <h2 className="text-3xl font-light mb-8 text-center" style={{ color: '#333333' }}>{t.supportTitle}</h2>
            <div className="bg-white rounded-lg p-8 mb-6" style={{ border: '1px solid #E0D9D0' }}>
              <p className="text-base font-light leading-relaxed mb-8" style={{ color: '#555555' }}>{t.supportText}</p>
              <div className="text-center">
                <a href="https://www.paypal.com/donate/?hosted_button_id=lucacerniglia@gmail.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 px-6 py-4 rounded-lg" style={{ backgroundColor: '#748B97', color: '#F3EFE8' }}>
                  <i data-lucide="heart"></i><span>{t.supportButton}</span>
                </a>
              </div>
              <p className="text-center text-sm font-light mt-8 italic" style={{ color: '#999999' }}>{t.thanksMessage}</p>
            </div>
          </div>
        )}

        {screen === 'info' && (
          <div className="max-w-2xl mx-auto px-6 py-8">
            <button onClick={() => setScreen('welcome')} className="mb-6 flex items-center space-x-2 text-sm" style={{ color: '#748B97' }}>
              <i data-lucide="arrow-left"></i><span>{t.home}</span>
            </button>
            <h2 className="text-3xl font-light mb-8 text-center" style={{ color: '#333333' }}>{
          javascriptt.infoTitle}</h2>
            <div className="bg-white rounded-lg p-8" style={{ border: '1px solid #E0D9D0' }}>
              <p className="text-base font-light leading-relaxed" style={{ color: '#555555' }}>{t.infoText}</p>
            </div>
          </div>
        )}
      </main>

      <footer className="py-6 border-t" style={{ borderColor: '#E0D9D0' }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm font-light" style={{ color: '#999999' }}>© 2025 InBetween</p>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.render(
  React.createElement(InBetween),
  document.getElementById('root')
);
