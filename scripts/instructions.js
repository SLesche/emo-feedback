var welcome_screen = {
    type: jsPsychInstructions,
    pages: [
     '<div class = "normal-text">Willkommen bei der Studie „Face to Face“!</br>Im Folgenden werden Sie vor Studienbeginn über die Inhalte und Datenschutzhinweise informiert</div>',
     '<div class = "normal-text">Im Rahmen des Empras möchten wir Reaktionszeiten bei emotionalen Gesichtern genauer untersuchen.</br>Die Bearbeitung wird ca. BEARBEITUNGSDAUER in Anspruch nehmen. Sofern Sie an der Universität Heidelberg studieren, können Sie für die Teilnahme VERGÜTUNG bescheinigt bekommen.</div>',
     '<div class = "normal-text"><i>Bitte lesen Sie sich die folgenden Informationen sorgfältig durch.</i></br>Die Teilnahme an dieser Studie erfolgt freiwillig und ist mit keinen Risiken verbunden. Es steht Ihnen jederzeit frei, Ihre Teilnahme zu widerrufen oder abzubrechen, ohne dass hierdurch ein Nachteil für Sie entsteht. Die Studie dient rein wissenschaftlichen Zwecken und hat keinerlei kommerziellen Hintergrund. Ihre Daten werden anonym erfasst und gespeichert, sodass kein Rückschluss auf Ihre Person möglich ist.</br>Wenn Sie Fragen zu dieser Erhebung haben, wenden Sie sich gerne an die Versuchsleiterin vor Ort.</div>',
    ],
    show_clickable_nav: true, 
    data: {type: 'instructions'},
    button_label_next: "Weiter",
    button_label_previous: "Zurück",
}

var consent = {
    type: jsPsychHtmlButtonResponse,
    stimulus: '<div class = "normal-text"><b>Teilnahmebestätigung</b></br>Ich habe die Einverständniserklärung gelesen, verstanden und erkläre mich mit den Bedingungen der Teilnahme einverstanden.</div>',
    choices: ['Ja', 'Nein'],
    data: {type: 'instructions'},
    on_finish: function(data){
        if(data.response == 1){
          jsPsych.endExperiment("Das Experiment wurde erfolgreich abgebrochen");
        }
      }
}

const survey_trial = {
    type: jsPsychSurvey,
    pages: [
        [
        {
            type: 'text',
            prompt: "Alter",
            name: 'age',
            textbox_columns: 5,
            required: true,
        },
        {
            type: 'multi-choice',
            prompt: "Geschlecht",
            options: ['weiblich', 'männlich', 'divers', 'sonstige'],
            name: 'gender',
            required: true,
        },
        {
            type: 'text',
            prompt: "Tätigkeit",
            name: 'occupation',
            required: true,
        },
    /*
        {
            type: 'multi-choice',
            prompt: "Tätigkeit",
            options: ['Schüler*in'],
            name: 'occupation',
            required: true,
        },
    */
        {
            type: 'text',
            prompt: "Studienfach (bei Studierenden)",
            name: 'subject',
            required: false,
        },
        ]
    ],
    title: 'Demographische Daten',
    button_label_next: 'Weiter',
    button_label_back: 'Zurück',
    button_label_finish: 'Weiter',
    show_question_numbers: 'onPage',
    data: {type: 'demographics'},
};

var instructions = {
    type: jsPsychInstructions,
    pages: [
     `<div class = "normal-text">Im Folgenden wirst du mehrere Blöcke einer <i>Line Judgement Task</i> bearbeiten.</br>Dabei siehst du für ${stim_duration}ms ein rotes Kreuz in der Mitte des Bildschirms, bestehend aus einer vertikalen und einer horizontalen Linie.</br>Hinter dem roten Kreuz wird ein Gesicht zu sehen sein. Dieses gibt allerdings <b>keinen</b> Aufschluss über die Länge der Linien und ist somit <b>irrelevant</b> für die Bearbeitung der Aufgabe.</br>Im Anschluss wird für weitere ${mask_duration}ms eine Maske zu sehen sein.</div>`,
     `<div class = "normal-text">Deine Aufgabe ist es, im Anschluss zu entscheiden, welche der beiden Linie länger war und die entsprechende Taste zu drücken:</br>Entscheidest du dich dafür, dass die horizontale Linie länger ist, drücke die Taste „H“. Entschiedest du dich dafür, dass die vertikale Linie länger ist, drücke die Taste „V“.</br></br>Versuch bitte, so <b>schnell und akkurat</b> wie möglich zu antworten.</div>`,
     `<img src = "img/instructions.png">`,
    ],
    show_clickable_nav: true, 
    data: {type: 'instructions'},
    button_label_next: "Weiter",
    button_label_previous: "Zurück",
}