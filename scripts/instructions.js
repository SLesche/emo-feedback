var welcome_screen = {
    type: jsPsychInstructions,
    pages: [
     '<div class = "normal-text">Herzlich Willkommen und vielen Dank für Ihr Interesse an dieser Studie!</br>Im Folgenden werden Sie vor Studienbeginn über die Inhalte und Datenschutzhinweise informiert</div>',
     '<div class = "normal-text">Im Rahmen des PROJEKTES möchten wir UNTERSUCHUNGSGRUND.</br>Die Bearbeitung wird ca. BEARBEITUNGSDAUER in Anspruch nehmen. Sofern Sie an der Universität Heidelberg studieren, können Sie für die Teilnahme VERGÜTUNG bescheinigt bekommen.</div>',
     '<div class = "normal-text"><i>Bitte lesen Sie sich die folgenden Informationen sorgfältig durch.</i></br>Die Teilnahme an dieser Studie erfolgt freiwillig und ist mit keinen Risiken verbunden. Es steht Ihnen jederzeit frei, Ihre Teilnahme zu widerrufen oder abzubrechen, ohne dass hierdurch ein Nachteil für Sie entsteht. Die Studie dient rein wissenschaftlichen Zwecken und hat keinerlei kommerziellen Hintergrund. Ihre Daten werden anonym erfasst und gespeichert, sodass kein Rückschluss auf Ihre Person möglich ist.</br>Wenn Sie Fragen zu dieser Erhebung haben, wenden Sie sich gerne an die Versuchsleiterin vor Ort.</div>',
    ],
    show_clickable_nav: true, 
    data: {type: 'instructions'},
    on_finish: function(data){
        // after instructions, the conditions start
        current_condition = conditions[0];
        icondition = 1;
    },
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
     '<div class = "normal-text">Task Instructions!</div>',
     `<div class = "normal-text">More task instructions!</div>`,

    ],
    show_clickable_nav: true, 
    data: {type: 'instructions'},
    on_finish: function(data){
        // after instructions, the conditions start
        current_condition = conditions[0];
        icondition = 1;
    },
    button_label_next: "Weiter",
    button_label_previous: "Zurück",
}