"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const sl = {
  auth: {
    login: 'Vpiši se',
    loggingIn: 'Prijavljanje...',
    loginWithNetlifyIdentity: 'Prijavi se z Netlify Identity',
    loginWithAzure: 'Prijavi se z Azure računom',
    loginWithBitbucket: 'Prijavi se z BitBucket računom',
    loginWithGitHub: 'Prijavi se z GitHub računom',
    loginWithGitLab: 'Prijavi se z Gitlab računom',
    errors: {
      email: 'Vnesi svoj pravi e-poštni naslov.',
      password: 'Vnesi svoje geslo.',
      identitySettings: 'Ni mogoče dostopati do nastavitev identitete. Ko uporabljate Git-Gateway zaledje, se prepričajte, da omogočite Identity Service in Git Gateway.'
    }
  },
  app: {
    header: {
      content: 'Vsebina',
      workflow: 'Potek dela',
      media: 'Media',
      quickAdd: 'Hitro dodajanje'
    },
    app: {
      errorHeader: 'Napaka pri nalaganju CMS konfiguracije',
      configErrors: 'Konfiguracijske napake',
      checkConfigYml: 'Preverite svojo datoteko config.yml.',
      loadingConfig: 'Nalaganje konfiguracije ...',
      waitingBackend: 'Čakanje na zaledje ...'
    },
    notFoundPage: {
      header: 'Ni najdeno'
    }
  },
  collection: {
    sidebar: {
      collections: 'Zbirke',
      allCollections: 'Vse zbirke',
      searchAll: 'Išči vse',
      searchIn: 'Išči v'
    },
    collectionTop: {
      sortBy: 'Razvrsti po',
      viewAs: 'Poglej kot',
      newButton: 'Nov %{collectionLabel}',
      ascending: 'Naraščajoče',
      descending: 'Padajoče',
      searchResults: 'Rezultati iskanja za "%{searchTerm}"',
      searchResultsInCollection: 'Rezultati iskanja za "%{searchTerm}" v %{collection}',
      filterBy: 'Filtriraj po',
      groupBy: 'Grupiraj po'
    },
    entries: {
      loadingEntries: 'Nalaganje vnosov ...',
      cachingEntries: 'Predpomnjenje vnosov ...',
      longerLoading: 'To lahko traja nekaj minut',
      noEntries: 'Ni vnosov'
    },
    groups: {
      other: 'Drugo',
      negateLabel: 'Ne %{label}'
    },
    defaultFields: {
      author: {
        label: 'Avtor'
      },
      updatedOn: {
        label: 'Nazadnje posodobljeno'
      }
    }
  },
  editor: {
    editorControl: {
      field: {
        optional: 'opcijsko'
      }
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel} je obvezen.',
        regexPattern: '%{fieldLabel} se ni ujemal z vzorcem: %{pattern}.',
        processing: '%{fieldLabel} je v obdelavi.',
        range: '%{fieldLabel} mora biti med %{minValue} in %{maxValue}.',
        min: '%{fieldLabel} mora biti vsaj %{minValue}.',
        max: '%{fieldLabel} mora biti %{maxValue} ali manj.',
        rangeCount: '%{fieldLabel} mora imeti med %{minCount} in %{maxCount} elementov.',
        rangeCountExact: '%{fieldLabel} mora imeti točno %{count} elemente.',
        rangeMin: '%{fieldLabel} mora imeti vsaj %{minCount} elementov.',
        rangeMax: '%{fieldLabel} mora imeti %{maxCount} ali manj elementov.',
        invalidPath: `'%{path}' ni veljavna pot`,
        pathExists: `Pot '%{path}' že obstaja`
      },
      i18n: {
        writingInLocale: 'Pisanje v %{locale}',
        copyFromLocale: 'Izpolnite iz drugega jezika',
        copyFromLocaleConfirm: 'Ali želiš izpolniti podatke iz %{locale} jezika?\nVsa obstoječa vsebina bo prepisana.'
      }
    },
    editor: {
      onLeavePage: 'Ste prepričani, da želite zapustiti to stran?',
      onUpdatingWithUnsavedChanges: 'Imaš neshranjene spremembe. Shrani pred posodobitvijo stanja.',
      onPublishingNotReady: 'Pred objavo posodobi status na "pripravljen".',
      onPublishingWithUnsavedChanges: 'Imaš neshranjene spremembe. Shrani pred objavo.',
      onPublishing: 'Ste prepričani, da želite objaviti ta vnos?',
      onUnpublishing: 'Ste prepričani, da želite preklicati objavo tega vnosa?',
      onDeleteWithUnsavedChanges: 'Ste prepričani, da želite izbrisati ta objavljen vnos, pa tudi neshrannjene spremembe iz trenutne seje?',
      onDeletePublishedEntry: 'Ste prepričani, da želite izbrisati ta objavljeni vnos?',
      onDeleteUnpublishedChangesWithUnsavedChanges: 'To bo izbrisalo vse neobjavljene spremembe tega vnosa, pa tudi neshranjene spremembe iz trenutne seje. Ali še vedno želiš izbrisati?',
      onDeleteUnpublishedChanges: 'Vse neobjavljene spremembe tega vnosa bodo izbrisane. Ali še vedno želiš izbrisati?',
      loadingEntry: 'Nalaganje vnosa ...',
      confirmLoadBackup: 'Za ta vnos je bila povrnjena lokalna varnostna kopija, ali bi jo radi uporabili?'
    },
    editorInterface: {
      toggleI18n: 'Preklopi i18n',
      togglePreview: 'Preklopi predogled',
      toggleScrollSync: 'Sinhroniziraj drsenje'
    },
    editorToolbar: {
      publishing: 'Objavljanje ...',
      publish: 'Objavi',
      published: 'Objavljeno',
      unpublish: 'Prekliči objavo',
      duplicate: 'Podvoji',
      unpublishing: 'Preklicevanje objave ...',
      publishAndCreateNew: 'Objavi in ustvari novo',
      publishAndDuplicate: 'Objavi in podvoji',
      deleteUnpublishedChanges: 'Izbriši neobjavljene spremembe',
      deleteUnpublishedEntry: 'Izbriši neobjavljen vnos',
      deletePublishedEntry: 'Izbriši objavljen vnos',
      deleteEntry: 'Izbriši vnos',
      saving: 'Shranjevanje ...',
      save: 'Shrani',
      statusInfoTooltipDraft: 'Status vnosa je nastavljen na osnutek. Če ga želiš dokončati in predložiti v pregled, nastavi stanje na „v pregledu“',
      statusInfoTooltipInReview: 'Vnos je v pregledu, nadaljnja dejanja niso potrebna. Vendar lahko med pregledovanjem še vedno narediš spremembe.',
      deleting: 'Brisanje ...',
      updating: 'Posodabljanje ...',
      status: 'status: %{status}',
      backCollection: ' Pisanje v %{collectionLabel} zbirko',
      unsavedChanges: 'Neshranjene spremembe',
      changesSaved: 'Spremembe shranjene',
      draft: 'Osnutek',
      inReview: 'V pregledu',
      ready: 'Pripravljen',
      publishNow: 'Objavi zdaj',
      deployPreviewPendingButtonLabel: 'Preveri za predogled',
      deployPreviewButtonLabel: 'Ogled predogleda',
      deployButtonLabel: 'Pogled v živo'
    },
    editorWidgets: {
      markdown: {
        bold: 'Debelo',
        italic: 'Poševno',
        code: 'Koda',
        link: 'Povezava',
        linkPrompt: 'Vnesite URL povezave',
        headings: 'Naslovi',
        quote: 'Citat',
        bulletedList: 'Seznam z oznakami',
        numberedList: 'Oštevilčen seznam',
        addComponent: 'Dodaj komponento',
        richText: 'Bogato besedilo',
        markdown: 'Markdown'
      },
      image: {
        choose: 'Izberi sliko',
        chooseMultiple: 'Izberi slike',
        chooseUrl: 'Vstavi iz URL-ja',
        replaceUrl: 'Zamenjaj z URL',
        promptUrl: 'Vnesi URL slike',
        chooseDifferent: 'Izberi drugo sliko',
        addMore: 'Dodaj več slik',
        remove: 'Odstrani sliko',
        removeAll: 'Odstrani vse slike'
      },
      file: {
        choose: 'Izberi datoteko',
        chooseUrl: 'Vstavi iz URL-ja',
        chooseMultiple: 'Izberi datoteke',
        replaceUrl: 'Zamenjaj z URL',
        promptUrl: 'Vnesi URL datoteke',
        chooseDifferent: 'Izberi drugo datoteko',
        addMore: 'Dodaj več datotek',
        remove: 'Odstrani datoteko',
        removeAll: 'Odstrani vse datoteke'
      },
      unknownControl: {
        noControl: "Ni kontrole za gradnik '%{widget}'."
      },
      unknownPreview: {
        noPreview: "Nipredogleda za widget '%{widget}'."
      },
      headingOptions: {
        headingOne: 'Naslov 1',
        headingTwo: 'Naslov 2',
        headingThree: 'Naslov 3',
        headingFour: 'Naslov 4',
        headingFive: 'Naslov 5',
        headingSix: 'Naslov 6'
      },
      datetime: {
        now: 'Zdaj',
        clear: 'Počisti'
      },
      list: {
        add: 'Dodaj %{item}',
        addType: 'Dodaj %{item}'
      }
    }
  },
  mediaLibrary: {
    mediaLibraryCard: {
      draft: 'Osnutek',
      copy: 'Kopiraj',
      copyUrl: 'Kopiraj URL',
      copyPath: 'Kopiraj pot',
      copyName: 'Kopiraj ime',
      copied: 'Kopirano'
    },
    mediaLibrary: {
      onDelete: 'Ste prepričani, da želite izbrisati izbrane medije?',
      fileTooLarge: 'Datoteka je prevelika.\n Ne sme biti večja od %{size} kb.'
    },
    mediaLibraryModal: {
      loading: 'Nalaganje...',
      noResults: 'Ni rezultatov.',
      noAssetsFound: 'Ni najdenih sredstev.',
      noImagesFound: 'Ni najdenih slik.',
      private: 'Private',
      images: 'Slike',
      mediaAssets: 'Multimedijska sredstva',
      search: 'Iskanje ...',
      uploading: 'Nalaganje ...',
      upload: 'Naloži',
      download: 'Prenesi',
      deleting: 'Brisanje ...',
      deleteSelected: 'Izbriši izbrano',
      chooseSelected: 'Dodaj izbrano'
    }
  },
  ui: {
    default: {
      goBackToSite: 'Vrni se na spletno mesto'
    },
    errorBoundary: {
      title: 'Napaka',
      details: 'Prišlo je do napake.',
      reportIt: 'Odprite težavo na GitHubu.',
      detailsHeading: 'Podrobnosti',
      privacyWarning: 'Odpiranje Github Issue bo javno objavilo vašo napako. Ne vključujte osebnih podatkov v vaši napaki.',
      recoveredEntry: {
        heading: 'Obnovljen dokument',
        warning: 'Prosimo, tole kopirajte/prilepite nekam, preden navigirate drugam!',
        copyButtonLabel: 'Kopiraj v odložišče'
      }
    },
    settingsDropdown: {
      logOut: 'Odjava'
    },
    toast: {
      onFailToLoadEntries: 'Ni naložilo vnosa: %{details}',
      onFailToLoadDeployPreview: 'Ni naložilo predogleda: %{details}',
      onFailToPersist: 'Ni uspelo vztrajati: %{details}',
      onFailToDelete: 'Ni uspelo izbrisati vnosa: %{details}',
      onFailToUpdateStatus: 'Ni uspelo posodobiti stanja: %{details}',
      missingRequiredField: 'Ups, zgrešili ste obvezno polje. Pred shranjevanjem izpolnite.',
      entrySaved: 'Vnos shranjen',
      entryPublished: 'Vnos objavljen',
      entryUnpublished: 'Objava vnosa preklicana',
      onFailToPublishEntry: 'Vnosa ni uspelo objaviti: %{details}',
      onFailToUnpublishEntry: 'Preklicanje objave vnosa ni uspelo: %{details}',
      entryUpdated: 'Status vnosa posodobljen',
      onDeleteUnpublishedChanges: 'Neobjavljene spremembe izbrisane',
      onFailToAuth: '%{details}',
      onLoggedOut: 'Bili ste odjavljeni, varnostno kopirate vse podatke in se ponovno prijavite',
      onBackendDown: 'Zaledna storitev doživlja izpad. Glejte %{details} za več informacij'
    }
  },
  workflow: {
    workflow: {
      loading: 'Nalaganje uredniških vnosov',
      workflowHeading: 'Uredniški potek dela',
      newPost: 'Nov vnos',
      description: '%{smart_count} vnos čaka na pregled, %{readyCount} pripravljen za objavo. |||| %{smart_count} vnosov čaka na pregled, %{readyCount} pripravljenih za objavo.',
      dateFormat: 'DD. MM. YYYY'
    },
    workflowCard: {
      lastChange: '%{date} by %{author}',
      lastChangeNoAuthor: '%{date}',
      lastChangeNoDate: 'by %{author}',
      deleteChanges: 'Izbriši spremembe',
      deleteNewEntry: 'Izbriši nov vnos',
      publishChanges: 'Objavi spremembe',
      publishNewEntry: 'Objavi nov vnos'
    },
    workflowList: {
      onDeleteEntry: 'Ali ste prepričani, da želite izbrisati ta vnos?',
      onPublishingNotReadyEntry: 'Objavijo se lahko samo elementi s statusom "pripravljen". Prosimo, povlecite kartico v stolpec "pripravljen", da omogočite objavo.',
      onPublishEntry: 'Ste prepričani, da želite objaviti ta vnos?',
      draftHeader: 'Osnutki',
      inReviewHeader: 'V pregledu',
      readyHeader: 'Pripravljen',
      currentEntries: '%{smart_count} vnos |||| %{smart_count} vnosov'
    }
  }
};
var _default = exports.default = sl;