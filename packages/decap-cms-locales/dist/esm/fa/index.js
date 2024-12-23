"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const fa = {
  auth: {
    login: 'وارد شدن',
    loggingIn: 'ورود به سیستم در...',
    loginWithNetlifyIdentity: 'با Netlify Identity وارد شوید',
    loginWithAzure: 'با Azure وارد شوید',
    loginWithBitbucket: 'با Bitbucket وارد شوید',
    loginWithGitHub: 'با GitHub وارد شوید',
    loginWithGitLab: 'با GitLab وارد شوید',
    loginWithGitea: 'با Gitea وارد شوید',
    errors: {
      email: 'ایمیل خود را حتما وارد کنید.',
      password: 'لطفا رمز عبور خود را وارد کنید.',
      identitySettings: 'دسترسی به تنظیمات هویت امکان پذیر نیست. هنگام استفاده از باطن git-gateway، حتماً سرویس Identity و Git Gateway را فعال کنید.'
    }
  },
  app: {
    header: {
      content: 'فهرست',
      workflow: 'جریان کار',
      media: 'رسانه ها',
      quickAdd: 'اضافه کردن سریع'
    },
    app: {
      errorHeader: 'خطا در بارگیری پیکربندی CMS',
      configErrors: 'خطاهای پیکربندی',
      checkConfigYml: 'فایل config.yml خود را بررسی کنید.',
      loadingConfig: 'در حال بارگیری پیکربندی...',
      waitingBackend: 'در انتظار باطن...'
    },
    notFoundPage: {
      header: 'پیدا نشد'
    }
  },
  collection: {
    sidebar: {
      collections: 'مجموعه ها',
      allCollections: 'همه مجموعه ها',
      searchAll: 'جستجو در همه',
      searchIn: 'جستجو در'
    },
    collectionTop: {
      sortBy: 'مرتب سازی بر اساس',
      viewAs: 'نمایش به صورت',
      newButton: '%{collectionLabel} جدید',
      ascending: 'صعودی',
      descending: 'نزولی',
      searchResults: 'نتایج جستجو برای "%{searchTerm}"',
      searchResultsInCollection: 'نتایج جستجو برای "%{searchTerm}" در %{collection}',
      filterBy: 'محدود شده توسط',
      groupBy: 'دسته بندی بر اساس'
    },
    entries: {
      loadingEntries: 'در حال بارگیری ورودی ها...',
      cachingEntries: 'ذخیره ورودی ها...',
      longerLoading: 'این ممکن است چند دقیقه طول بکشد',
      noEntries: 'بدون ورودی'
    },
    groups: {
      other: 'دیگر',
      negateLabel: 'نه %{label}'
    },
    defaultFields: {
      author: {
        label: 'نویسنده'
      },
      updatedOn: {
        label: 'به روز شد'
      }
    }
  },
  editor: {
    editorControl: {
      field: {
        optional: 'اختیاری'
      }
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel} مورد نیاز است.',
        regexPattern: '%{fieldLabel} با الگوی %{pattern} مطابقت نداشت.',
        processing: '%{fieldLabel} در حال پردازش است.',
        range: '%{fieldLabel} باید بین %{minValue} و %{maxValue} باشد.',
        min: '%{fieldLabel} باید حداقل %{minValue} باشد.',
        max: '%{fieldLabel} باید %{maxValue} یا کمتر باشد.',
        rangeCount: '%{fieldLabel} باید بین %{minCount} و %{maxCount} مورد (ها) داشته باشد.',
        rangeCountExact: '%{fieldLabel} باید دقیقا %{count} مورد(ها) داشته باشد.',
        rangeMin: '%{fieldLabel} باید حداقل %{minCount} مورد(ها) باشد.',
        rangeMax: '%{fieldLabel} باید %{maxCount} یا کمتر از موارد باشد.',
        invalidPath: "'%{path}' یک مسیر معتبر نیست",
        pathExists: "مسیر '%{path}' از قبل وجود دارد"
      },
      i18n: {
        writingInLocale: 'نوشتن به %{locale}',
        copyFromLocale: 'از محلی دیگر پر کنید',
        copyFromLocaleConfirm: 'آیا می خواهید داده ها را از %{locale} محلی پر کنید؟\nتمام محتوای موجود رونویسی خواهد شد.'
      }
    },
    editor: {
      onLeavePage: 'آیا مطمئن هستید که می خواهید این صفحه را ترک کنید؟',
      onUpdatingWithUnsavedChanges: 'شما تغییرات ذخیره نشده ای دارید، لطفا قبل از به روز رسانی وضعیت را ذخیره کنید.',
      onPublishingNotReady: 'لطفاً قبل از انتشار وضعیت را به "آماده" به روز کنید.',
      onPublishingWithUnsavedChanges: 'شما تغییرات ذخیره نشده ای دارید، لطفاً قبل از انتشار ذخیره کنید.',
      onPublishing: 'آیا شما مطمئن هستید که می خواهید این مطلب را منتشر کنید؟',
      onUnpublishing: 'آیا مطمئن هستید که می خواهید این ورودی را لغو انتشار کنید؟',
      onDeleteWithUnsavedChanges: 'آیا مطمئن هستید که می خواهید این ورودی منتشر شده و همچنین تغییرات ذخیره نشده خود را از جلسه فعلی حذف کنید؟',
      onDeletePublishedEntry: 'آیا مطمئنید که می خواهید این ورودی منتشر شده را حذف کنید؟',
      onDeleteUnpublishedChangesWithUnsavedChanges: 'با این کار همه تغییرات منتشر نشده در این ورودی و همچنین تغییرات ذخیره نشده شما از جلسه فعلی حذف می شود. آیا هنوز می خواهید حذف کنید؟',
      onDeleteUnpublishedChanges: 'همه تغییرات منتشر نشده در این ورودی حذف خواهند شد. آیا هنوز می خواهید حذف کنید؟',
      loadingEntry: 'در حال بارگیری ورودی...',
      confirmLoadBackup: 'یک نسخه پشتیبان محلی برای این ورودی بازیابی شد، آیا می خواهید از آن استفاده کنید؟'
    },
    editorInterface: {
      toggleI18n: 'i18n را تغییر دهید',
      togglePreview: 'پیش نمایش را تغییر دهید',
      toggleScrollSync: 'همگام سازی پیمایش'
    },
    editorToolbar: {
      publishing: 'در حال انتشار...',
      publish: 'انتشار',
      published: 'منتشر شده',
      unpublish: 'لغو انتشار',
      duplicate: 'تکراری',
      unpublishing: 'در حال لغو انتشار...',
      publishAndCreateNew: 'انتشار و ایجاد جدید',
      publishAndDuplicate: 'انتشار و تکثیر',
      deleteUnpublishedChanges: 'حذف تغییرات منتشر نشده',
      deleteUnpublishedEntry: 'حذف ورودی منتشر نشده',
      deletePublishedEntry: 'حذف ورودی منتشر شده',
      deleteEntry: 'حذف ورودی',
      saving: 'صرفه جویی در...',
      save: 'صرفه جویی',
      statusInfoTooltipDraft: 'وضعیت ورودی روی پیش نویس تنظیم شده است. برای نهایی کردن و ارسال آن برای بررسی، وضعیت را روی «در حال بررسی» تنظیم کنید',
      statusInfoTooltipInReview: 'ورودی در حال بررسی است، هیچ اقدام دیگری لازم نیست. با این حال، همچنان می‌توانید در حین بررسی، تغییرات بیشتری ایجاد کنید.',
      deleting: 'در حال حذف...',
      updating: 'در حال بروز رسانی...',
      status: 'وضعیت: %{status}',
      backCollection: 'نوشتن در مجموعه %{collectionLabel}',
      unsavedChanges: 'تغییرات ذخیره نشده',
      changesSaved: 'تغییرات ذخیره شد',
      draft: 'پیش نویس',
      inReview: 'در بررسی',
      ready: 'آماده',
      publishNow: 'اکنون منتشر کنید',
      deployPreviewPendingButtonLabel: 'پیش نمایش را بررسی کنید',
      deployPreviewButtonLabel: 'مشاهده پیش نمایش',
      deployButtonLabel: 'مشاهده زنده'
    },
    editorWidgets: {
      markdown: {
        bold: 'پررنگ',
        italic: 'کج',
        code: 'کد',
        link: 'ارتباط دادن',
        linkPrompt: 'آدرس لینک را وارد کنید',
        headings: 'سرفصل ها',
        quote: 'نقل قول',
        bulletedList: 'لیست گلوله شده',
        numberedList: 'لیست شماره گذاری شده',
        addComponent: 'افزودن کامپوننت',
        richText: 'متن غنی',
        markdown: 'مارک داون'
      },
      image: {
        choose: 'یک تصویر را انتخاب کنید',
        chooseMultiple: 'تصاویر را انتخاب کنید',
        chooseUrl: 'درج از URL',
        replaceUrl: 'با URL جایگزین کنید',
        promptUrl: 'آدرس تصویر را وارد کنید',
        chooseDifferent: 'تصویر متفاوت را انتخاب کنید',
        addMore: 'تصاویر بیشتری اضافه کنید',
        remove: 'حذف تصویر',
        removeAll: 'حذف همه تصاویر'
      },
      file: {
        choose: 'یک فایل را انتخاب کنید',
        chooseUrl: 'درج از URL',
        chooseMultiple: 'فایل ها را انتخاب کنید',
        replaceUrl: 'با URL جایگزین کنید',
        promptUrl: 'آدرس فایل را وارد کنید',
        chooseDifferent: 'فایل های مختلف را انتخاب کنید',
        addMore: 'فایل های بیشتری اضافه کنید',
        remove: 'حذف فایل',
        removeAll: 'تمام فایل ها را حذف کنید'
      },
      unknownControl: {
        noControl: 'هیچ کنترلی برای ویجت "%{widget}" وجود ندارد.'
      },
      unknownPreview: {
        noPreview: 'هیچ پیش نمایشی برای ویجت "%{widget}" وجود ندارد.'
      },
      headingOptions: {
        headingOne: 'سرفصل 1',
        headingTwo: 'سرفصل 2',
        headingThree: 'سرفصل 3',
        headingFour: 'سرفصل 4',
        headingFive: 'سرفصل 5',
        headingSix: 'سرفصل 6'
      },
      datetime: {
        now: 'اکنون'
      },
      list: {
        add: 'این مورد را اضافه کنید}',
        addType: 'این مورد را اضافه کنید}'
      }
    }
  },
  mediaLibrary: {
    mediaLibraryCard: {
      draft: 'پیش نویس',
      copy: 'کپی',
      copyUrl: 'URL را کپی کنید',
      copyPath: 'مسیر را کپی کنید',
      copyName: 'کپی نام',
      copied: 'کپی شده است'
    },
    mediaLibrary: {
      onDelete: 'آیا مطمئن هستید که می خواهید رسانه انتخابی را حذف کنید؟',
      fileTooLarge: 'فایل خیلی بزرگ است.\nپیکربندی شده است تا فایل های بزرگتر از %{size} کیلوبایت مجاز نباشد.'
    },
    mediaLibraryModal: {
      loading: 'بارگذاری...',
      noResults: 'هیچ نتیجه ای.',
      noAssetsFound: 'هیچ دارایی یافت نشد.',
      noImagesFound: 'هیچ تصویری یافت نشد',
      private: 'خصوصی',
      images: 'تصاویر',
      mediaAssets: 'دارایی های رسانه ای',
      search: 'جستجو کردن...',
      uploading: 'در حال آپلود...',
      upload: 'بارگذاری',
      download: 'دانلود',
      deleting: 'در حال حذف...',
      deleteSelected: 'انتخاب شده را پاک کن',
      chooseSelected: 'انتخاب شده را انتخاب کنید'
    }
  },
  ui: {
    default: {
      goBackToSite: 'به سایت برگردید'
    },
    errorBoundary: {
      title: 'خطا',
      details: 'خطایی رخ داده است - لطفا',
      reportIt: 'یک مسئله را در GitHub باز کنید.',
      detailsHeading: 'جزئیات',
      privacyWarning: 'باز کردن یک مشکل، آن را با پیام خطا و داده‌های اشکال‌زدایی از قبل پر می‌کند.\nلطفاً صحت اطلاعات را تأیید کنید و در صورت وجود داده های حساس را حذف کنید.',
      recoveredEntry: {
        heading: 'سند بازیابی شده',
        warning: 'لطفاً قبل از حرکت، این را در جایی کپی/پیست کنید!',
        copyButtonLabel: 'کپی به کلیپ بورد'
      }
    },
    settingsDropdown: {
      logOut: 'خروج'
    },
    toast: {
      onFailToLoadEntries: 'ورودی بارگیری نشد: %{details}',
      onFailToLoadDeployPreview: 'پیش نمایش بارگیری نشد: %{details}',
      onFailToPersist: 'ادامه ورود ناموفق بود: %{details}',
      onFailToDelete: 'ورودی حذف نشد: %{details}',
      onFailToUpdateStatus: 'وضعیت به‌روزرسانی نشد: %{details}',
      missingRequiredField: 'اوه، شما یک قسمت الزامی را از دست داده اید. لطفاً قبل از ذخیره تکمیل کنید.',
      entrySaved: 'ورودی ذخیره شد',
      entryPublished: 'مدخل منتشر شد',
      entryUnpublished: 'ورودی منتشر نشده است',
      onFailToPublishEntry: 'منتشر نشد: %{details}',
      onFailToUnpublishEntry: 'لغو انتشار ورودی انجام نشد: %{details}',
      entryUpdated: 'وضعیت ورودی به روز شد',
      onDeleteUnpublishedChanges: 'تغییرات منتشر نشده حذف شد',
      onFailToAuth: '%{details}',
      onLoggedOut: 'شما از سیستم خارج شده اید، لطفاً از داده ها نسخه پشتیبان تهیه کنید و دوباره وارد شوید',
      onBackendDown: 'سرویس باطن در حال تجربه قطعی است. جهت اطلاعات بیشتر جزئیات را ببینید'
    }
  },
  workflow: {
    workflow: {
      loading: 'در حال بارگیری ورودی های گردش کار ویرایشی',
      workflowHeading: 'گردش کار تحریریه',
      newPost: 'مطلب جدید',
      description: '%{smart_count} ورودی در انتظار بررسی، %{readyCount} آماده انتشار است. |||| %{smart_count} ورودی در انتظار بازبینی، %{readyCount} آماده انتشار است.',
      dateFormat: 'MMMM D'
    },
    workflowCard: {
      lastChange: '%{date} توسط %{author}',
      lastChangeNoAuthor: '%{date}',
      lastChangeNoDate: 'توسط %{author}',
      deleteChanges: 'حذف تغییرات',
      deleteNewEntry: 'حذف ورودی جدید',
      publishChanges: 'انتشار تغییرات',
      publishNewEntry: 'مطلب جدید را منتشر کنید'
    },
    workflowList: {
      onDeleteEntry: 'آیا مطمئن هستید که می خواهید این ورودی را حذف کنید؟',
      onPublishingNotReadyEntry: 'فقط مواردی با وضعیت "آماده" قابل انتشار هستند. لطفاً کارت را به ستون "آماده" بکشید تا انتشار فعال شود.',
      onPublishEntry: 'آیا شما مطمئن هستید که می خواهید این مطلب را منتشر کنید؟',
      draftHeader: 'پیش نویس',
      inReviewHeader: 'در بررسی',
      readyHeader: 'آماده',
      currentEntries: '%{smart_count} ورودی |||| %{smart_count} ورودی'
    }
  }
};
var _default = exports.default = fa;