"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const uk = {
  auth: {
    login: 'Увійти',
    loggingIn: 'Вхід...',
    loginWithNetlifyIdentity: 'Увійти через Netlify Identity',
    loginWithAzure: 'Увійти через Azure',
    loginWithBitbucket: 'Увійти через Bitbucket',
    loginWithGitHub: 'Увійти через GitHub',
    loginWithGitLab: 'Увійти через GitLab',
    loginWithGitea: 'Увійти через Gitea',
    errors: {
      email: 'Введіть email.',
      password: 'Введіть пароль.',
      identitySettings: 'Немає доступу до налаштувань. Якщо використовуєте git-gateway, переконайтеся, що включили Identity service та Git Gateway.'
    }
  },
  app: {
    header: {
      content: 'Зміст',
      workflow: 'Робочий процес',
      media: 'Медіафайли',
      quickAdd: 'Додати'
    },
    app: {
      errorHeader: 'Помилка завантаження конфігурації',
      configErrors: 'Помилка конфігурації',
      checkConfigYml: 'Перевірте config.yml файл.',
      loadingConfig: 'Завантаження конфігурації...',
      waitingBackend: 'Очікування серверу...'
    },
    notFoundPage: {
      header: 'Сторінку не знайдено '
    }
  },
  collection: {
    sidebar: {
      collections: 'Колекції',
      allCollections: 'Всі колекції',
      searchAll: 'Пошук всюди',
      searchIn: 'Шукати в'
    },
    collectionTop: {
      viewAs: 'Змінити вигляд',
      newButton: 'Створити %{collectionLabel}',
      ascending: 'За зростанням',
      descending: 'За спаданням',
      searchResults: 'Результати по запиту "%{searchTerm}"',
      searchResultsInCollection: 'Результати по запиту "%{searchTerm}" в %{collection}',
      sortBy: 'Сортувати за',
      filterBy: 'Фільтрувати за',
      groupBy: 'Групувати за'
    },
    entries: {
      loadingEntries: 'Завантаження записів...',
      cachingEntries: 'Кешування записів...',
      longerLoading: 'Це може зайняти певний час',
      noEntries: 'Немає записів'
    }
  },
  editor: {
    editorControl: {
      field: {
        optional: 'необов’язково'
      }
    },
    editorControlPane: {
      widget: {
        required: "Поле %{fieldLabel} є обов'язковим.",
        regexPattern: '%{fieldLabel} не задовільняє умові: %{pattern}.',
        processing: 'Обробляється %{fieldLabel}...',
        range: 'Значення %{fieldLabel} повинне бути від %{minValue} до %{maxValue}.',
        min: 'Значення %{fieldLabel} має бути від %{minValue}.',
        max: 'Значення %{fieldLabel} має бути %{maxValue} та менше.',
        rangeCount: '%{fieldLabel} повинно містити від %{minCount} до %{maxCount} елементів.',
        rangeCountExact: '%{fieldLabel} повинно містити чітко %{count} елементів.',
        rangeMin: '%{fieldLabel} повинно містити не менше %{minCount} елементів.',
        rangeMax: '%{fieldLabel} повинно містити %{maxCount} або менше елементів.',
        invalidPath: `Шлях '%{path}' містить помилки.`,
        pathExists: `Шлях '%{path}' вже існує.`
      },
      i18n: {
        writingInLocale: 'Мова запису %{locale}',
        copyFromLocale: 'Заповнити з іншої мови',
        copyFromLocaleConfirm: 'Дійсно бажаєте заповнити дані з мови %{locale}?\nУсі наявні дані буде перезаписано.'
      }
    },
    editor: {
      onLeavePage: 'Ви дійсно бажаєте залишити сторінку?',
      onUpdatingWithUnsavedChanges: 'Присутні незбережені зміни, будь ласка збережіть перед зміною статусу.',
      onPublishingNotReady: 'Будь ласка, встановіть статус "Готово" перед публікацією.',
      onPublishingWithUnsavedChanges: 'Присутні незбережені зміни, будь ласка збережіть їх перед публікацією.',
      onPublishing: 'Ви дійсно бажаєте опублікувати запис?',
      onDeleteWithUnsavedChanges: 'Ви дійсно бажаєте видалити опублікований запис, як і всі незбережені зміни під час поточної сесії?',
      onDeletePublishedEntry: 'Ви дійсно бажаєте видалити опублікований запис?',
      onDeleteUnpublishedChangesWithUnsavedChanges: 'Видаляться всі неопубліковані зміни до цього запису, а також всі незбережені зміни під час поточної сесії. Бажаєте продовжити?',
      onDeleteUnpublishedChanges: 'Всі незбережені зміни до цього запису буде видалено. Бажаєте продовжити?',
      loadingEntry: 'Завантаження...',
      confirmLoadBackup: 'Відновлено резервну копію, бажаєте її використати?'
    },
    editorInterface: {
      toggleI18n: 'Порівняння записів',
      togglePreview: 'Попередній перегляд',
      toggleScrollSync: 'Синхронна прокрутка'
    },
    editorToolbar: {
      publishing: 'Публікація...',
      publish: 'Опублікувати',
      published: 'Опубліковано',
      unpublish: 'Скасувати публікацію',
      duplicate: 'Продублювати',
      unpublishing: 'Скасування публікації...',
      publishAndCreateNew: 'Опублікувати та створити нову',
      publishAndDuplicate: 'Опублікувати та продублювати',
      deleteUnpublishedChanges: 'Видалити неопубліковані зміни',
      deleteUnpublishedEntry: 'Видалити неопубліковану сторінку',
      deletePublishedEntry: 'Видалити опубліковану сторінку',
      deleteEntry: 'Видалити',
      saving: 'Збереження...',
      save: 'Зберегти',
      deleting: 'Видалення...',
      updating: 'Оновлення...',
      status: 'Cтан: %{status}',
      backCollection: 'Колекція %{collectionLabel}',
      unsavedChanges: 'Незбережені зміни',
      changesSaved: 'Зміни збережено',
      draft: 'В роботі',
      inReview: 'На розгляді',
      ready: 'Готово',
      publishNow: 'Опублікувати',
      deployPreviewPendingButtonLabel: 'Перевірити оновлення',
      deployPreviewButtonLabel: 'Попередній перегляд',
      deployButtonLabel: 'Переглянути наживо'
    },
    editorWidgets: {
      markdown: {
        bold: 'Напівжирний',
        italic: 'Курсив',
        code: 'Код',
        link: 'Посилання',
        linkPrompt: 'Введіть URL посилання',
        headings: 'Заголовки',
        quote: 'Цитата',
        bulletedList: 'Маркований список',
        numberedList: 'Нумерований список',
        addComponent: 'Додати компонент',
        richText: 'RichText',
        markdown: 'Markdown'
      },
      image: {
        choose: 'Вибрати зображення',
        chooseMultiple: 'Вибрати зображення',
        chooseUrl: 'Вставити з URL',
        replaceUrl: 'Замінити на URL',
        promptUrl: 'Введіть URL зображення',
        chooseDifferent: 'Обрати інше зображення',
        addMore: 'Додати більше зображень',
        remove: 'Видалити',
        removeAll: 'Видалити всі'
      },
      file: {
        choose: 'Вибрати файл',
        chooseUrl: 'Вставити з URL',
        chooseMultiple: 'Вибрати файли',
        replaceUrl: 'Замінити на URL',
        promptUrl: 'Введіть URL файлу',
        chooseDifferent: 'Виберіть інший файл',
        addMore: 'Додати більше',
        remove: 'Видалити',
        removeAll: 'Видалити всі'
      },
      unknownControl: {
        noControl: "Відсутній модуль для '%{widget}'."
      },
      unknownPreview: {
        noPreview: "Відсутній перегляд для '%{widget}'."
      },
      headingOptions: {
        headingOne: 'Заголовок 1',
        headingTwo: 'Заголовок 2',
        headingThree: 'Заголовок 3',
        headingFour: 'Заголовок 4',
        headingFive: 'Заголовок 5',
        headingSix: 'Заголовок 6'
      },
      datetime: {
        now: 'Зараз',
        clear: 'Скинути'
      },
      list: {
        add: 'Додати %{item}',
        addType: 'Додати %{item}'
      }
    }
  },
  mediaLibrary: {
    mediaLibraryCard: {
      draft: 'В роботі',
      copy: 'Копіювати',
      copyUrl: 'Копіювати URL',
      copyPath: 'Копіювати шлях',
      copyName: 'Копіювати ім’я',
      copied: 'Скопійовано'
    },
    mediaLibrary: {
      onDelete: 'Ви дійсно бажаєте видалити обрані матеріали?',
      fileTooLarge: 'Файл занадто великий.\nНалаштування не дозволяють зберігати файли більше %{size} kB.'
    },
    mediaLibraryModal: {
      loading: 'Завантаження...',
      noResults: 'Результати відсутні.',
      noAssetsFound: 'Матеріали відсутні.',
      noImagesFound: 'Зображення відсутні.',
      private: 'Приватні ',
      images: 'Зображення',
      mediaAssets: 'Медіафайли',
      search: 'Пошук...',
      uploading: 'Завантаження...',
      upload: 'Завантажити',
      download: 'Отримати',
      deleting: 'Видалення...',
      deleteSelected: 'Видалити',
      chooseSelected: 'Обрати виділені'
    }
  },
  ui: {
    default: {
      goBackToSite: 'Повернутися на сайт'
    },
    errorBoundary: {
      title: 'Помилка',
      details: 'Сталася помилка. Будь ласка, ',
      reportIt: 'повідомте про неї.',
      detailsHeading: 'Деталі',
      privacyWarning: 'При відкритті тікету автоматично заповнюється повідомленням про помилку та відлагоджувальною інформацією.\nБудь ласка, перевірте, що дані є вірними та не містять конфіденційної інформації.',
      recoveredEntry: {
        heading: 'Відновлено документ',
        warning: 'Будь ласка, скопіюйте це повідомлення кудись, перед тим як залишити сторінку!',
        copyButtonLabel: 'Скопіювати в буфер'
      }
    },
    settingsDropdown: {
      logOut: 'Вийти'
    },
    toast: {
      onFailToLoadEntries: 'Не вдалося завантажити запис: %{details}',
      onFailToLoadDeployPreview: 'Не вдалося завантажити попередній перегляд: %{details}',
      onFailToPersist: 'Не вдалося зберегти запис: %{details}',
      onFailToDelete: 'Не вдалося видалити запис: %{details}',
      onFailToUpdateStatus: 'Не вдалося оновити статус: %{details}',
      missingRequiredField: "На жаль, ви пропустили обов'язкове поле. Будь ласка, заповніть перед збереженням.",
      entrySaved: 'Запис збережений',
      entryPublished: 'Запис опублікований',
      entryUnpublished: 'Публікація запису скасована',
      onFailToPublishEntry: 'Не вдалося опублікувати запис: %{details}',
      onFailToUnpublishEntry: 'Не вдалося скасувати публікацію запису: %{details}',
      entryUpdated: 'Статус запису оновлено',
      onDeleteUnpublishedChanges: 'Неопубліковані зміни видалені',
      onFailToAuth: '%{details}',
      onLoggedOut: 'Ви вийшли. Будь ласка, збережіть усі дані та увійдіть знову',
      onBackendDown: 'Трапився збій у роботі серверу. Див. %{details}'
    }
  },
  workflow: {
    workflow: {
      loading: 'Завантаження редакційних матеріалів',
      workflowHeading: 'Редакція',
      newPost: 'Новий запис',
      description: '%{smart_count} запис очікує розгляду, %{readyCount} до публікації. |||| %{smart_count} записи очікують розгляду, %{readyCount} до публікації. |||| %{smart_count} записів очікують розгляду, %{readyCount} до публікації.',
      dateFormat: 'MMMM D'
    },
    workflowCard: {
      lastChange: '%{date}, %{author}',
      lastChangeNoAuthor: '%{date}',
      lastChangeNoDate: '— %{author}',
      deleteChanges: 'Видалити зміни',
      deleteNewEntry: 'Видалити запис',
      publishChanges: 'Опублікувати зміни',
      publishNewEntry: 'Опублікувати запис'
    },
    workflowList: {
      onDeleteEntry: 'Ви дійсно бажаєте видалити запис?',
      onPublishingNotReadyEntry: 'Лише елементи зі статусом "Готово" можуть бути опубліковані. Перетягніть картку в стовпчик "Готово", щоб дозволити публікацію.',
      onPublishEntry: 'Дійсно бажаєте опублікувати запис?',
      draftHeader: 'В роботі',
      inReviewHeader: 'На розгляді',
      readyHeader: 'Готово',
      currentEntries: '%{smart_count} запис |||| %{smart_count} записи |||| %{smart_count} записів'
    }
  }
};
var _default = exports.default = uk;