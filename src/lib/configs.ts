export const siteColumns = {
    messergebnisse: [
        { sql_name: 'ArtikelNr', display_name: 'Artikel Nummer', visible: true, filterable: true, type: 'string', range: false },
        { sql_name: 'ArtikelIndexNr', display_name: 'Artikel Index', visible: true, filterable: true, type: 'string', range: false },
        { sql_name: 'AuftragNr', display_name: 'Auftrag Nummer', visible: true, filterable: true, type: 'string', range: false },
        { sql_name: 'SerienNrTemporaer', display_name: 'Serien Nr Temp.', visible: true, filterable: false, type: 'string', range: true },
        { sql_name: 'BremseNrText', display_name: 'Serien Nr', visible: true, filterable: true, type: 'string', range: true },
        { sql_name: 'BremseNr', display_name: 'Bremse Nr', visible: true, filterable: false, type: 'number', range: true },
        { sql_name: 'chtime', display_name: 'Zeit', visible: true, filterable: true, type: 'datetime', range: true },

        { sql_name: 'Pruefstandkennung', display_name: 'Prüfstand', visible: true, filterable: false, type: 'string', range: false },
        { sql_name: 'PruefArt', display_name: 'Bez. DE', visible: true, filterable: false, type: 'string', range: false },
        { sql_name: 'PruefArtSub', display_name: 'Prüfprogramm', visible: true, filterable: false, type: 'string', range: false },
        { sql_name: 'PruefEinheit', display_name: 'Prüfeinheit', visible: true, filterable: false, type: 'string', range: false },
        { sql_name: 'PruefWert', display_name: 'Prüfwert', visible: true, filterable: false, type: 'number', range: false },
        { sql_name: 'SollWert', display_name: 'SollWert', visible: true, filterable: false, type: 'number', range: false },
        { sql_name: 'ToleranzMinus', display_name: 'Toleranz +', visible: true, filterable: false, type: 'number', range: false },
        { sql_name: 'ToleranzPlus', display_name: 'Toleranz -', visible: true, filterable: false, type: 'number', range: false },
        { sql_name: 'status', display_name: 'IO', visible: true, filterable: false, type: 'string', range: false }
    ],

    messwerte_bts: [
        { sql_name: 'ID', display_name: 'ID', visible: true, filterable: true, type: 'number', range: true },
        { sql_name: 'Datum', display_name: 'Datum', visible: true, filterable: true, type: 'date', range: false },
        { sql_name: 'Art_Nummer', display_name: 'ArtikelNr', visible: true, filterable: true, type: 'string', range: false },
        { sql_name: 'Auftrags_Nummer', display_name: 'AuftragsNr', visible: true, filterable: true, type: 'string', range: false },
        { sql_name: 'Pos_Nummer', display_name: 'Positionsnummer', visible: true, filterable: true, type: 'number', range: false },
        { sql_name: 'Zn_Index', display_name: 'ZN Index', visible: true, filterable: true, type: 'number', range: false },
        { sql_name: 'IO', display_name: 'IO', visible: true, filterable: false, type: 'string', range: false },
        { sql_name: 'Spreizkraft_in_N', display_name: 'Spreizkraft [N]', visible: true, filterable: false, type: 'number', range: false },
        {
            sql_name: 'Parallelitaet_ungespreizt',
            display_name: 'Parallelität \n unges',
            visible: true,
            filterable: false,
            type: 'number',
            range: false
        },
        { sql_name: 'Para_unges_Max', display_name: 'Parallelität unges max', visible: true, filterable: true, type: 'number', range: false },
        {
            sql_name: 'Parallelitaet_gespreizt',
            display_name: 'Parallelität ges',
            visible: true,
            filterable: false,
            type: 'number',
            range: false
        },
        { sql_name: 'Pa_ges_Max', display_name: 'Parallelität ges Max', visible: true, filterable: false, type: 'number', range: false }
    ],

    messwerte_stabikupplung: [
        { sql_name: 'ARTNR', display_name: 'Artikelnummer', visible: true, filterable: true, type: 'string', range: false },
        { sql_name: 'INDEX', display_name: 'Index', visible: true, filterable: true, type: 'string', range: false },
        { sql_name: 'PROGRAMM_NR', display_name: 'Auftragsnummer', visible: true, filterable: true, type: 'string', range: true },
        { sql_name: 'JAHR', display_name: 'Jahr', visible: true, filterable: true, type: 'string', range: false },
        { sql_name: 'TAG_DES_JAHRES', display_name: 'Tag', visible: true, filterable: true, type: 'string', range: false },
        { sql_name: 'FORTLAUFENDE_NR', display_name: 'Nummer', visible: true, filterable: true, type: 'string', range: true },
        { sql_name: 'DATUM', display_name: 'Datum', visible: true, filterable: true, type: 'date', range: true },
        { sql_name: 'PROGRAMM', display_name: 'Programm', visible: true, filterable: true, type: 'string', range: true },
        { sql_name: 'MESSWERT_LINKS', display_name: 'Messwert L', visible: true, filterable: false, type: 'number', range: false },
        { sql_name: 'MESSWERT_LINKS', display_name: 'Messwert R', visible: true, filterable: false, type: 'number', range: false },
        {
            sql_name: 'MESSWERT_MITTELWERT',
            display_name: 'Messwert Mittelwert',
            visible: true,
            filterable: false,
            type: 'number',
            range: false
        },
        { sql_name: 'SOLLWERT', display_name: 'Sollwert', visible: true, filterable: false, type: 'string', range: false },
        { sql_name: 'TOLERANZWERT_MINUS', display_name: 'Toleranz (+)', visible: true, filterable: false, type: 'string', range: false },
        { sql_name: 'TOLERANZWERT_PLUS', display_name: 'Toleranz (-)', visible: true, filterable: false, type: 'string', range: false },
        { sql_name: 'KUGELUEBERWACHUNG', display_name: 'Kugelüberwachung', visible: true, filterable: false, type: 'bool', range: false },
        {
            sql_name: 'MESSWERT_KUGELUEBERWACHUNG',
            display_name: 'Kugelüberwachung',
            visible: true,
            filterable: false,
            type: 'number',
            range: false
        },
        { sql_name: 'VERSCHLEISANZEIGE', display_name: 'Verschleißanzeige', visible: true, filterable: false, type: 'bool', range: false },
        {
            sql_name: 'MESSWERT_VERSCHLEISANZEIGE',
            display_name: 'Verschleißanzeige',
            visible: true,
            filterable: false,
            type: 'number',
            range: false
        },
        { sql_name: 'STOPFEN', display_name: 'Stopfen', visible: true, filterable: false, type: 'bool', range: false },
        { sql_name: 'MESSWERT_STOPFEN', display_name: 'Stopfen', visible: true, filterable: false, type: 'number', range: false },
        { sql_name: 'PRUEFUNG_GUT', display_name: 'Prüfung gut', visible: true, filterable: false, type: 'bool', range: false },
        { sql_name: 'ZYKLEN', display_name: 'Zyklen', visible: true, filterable: false, type: 'number', range: false },
        { sql_name: 'ZEITSTEMPEL', display_name: 'Zeitstempel', visible: true, filterable: false, type: 'datetime', range: false },
        { sql_name: 'SERIENNUMMER', display_name: 'Seriennummer', visible: true, filterable: true, type: 'string', range: true }
    ]
};
