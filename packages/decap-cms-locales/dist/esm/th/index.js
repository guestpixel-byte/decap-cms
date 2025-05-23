"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const th = {
  auth: {
    login: 'เข้าสู่ระบบ',
    loggingIn: 'กำลังเข้าสู่ระบบ...',
    loginWithNetlifyIdentity: 'เข้าสู่ระบบด้วย Netlify Identity',
    loginWithAzure: 'เข้าสู่ระบบด้วย Azure',
    loginWithBitbucket: 'เข้าสู่ระบบด้วย Bitbucket',
    loginWithGitHub: 'เข้าสู่ระบบด้วย GitHub',
    loginWithGitLab: 'เข้าสู่ระบบด้วย GitLab',
    loginWithGitea: 'เข้าสู่ระบบด้วย Gitea',
    errors: {
      email: 'ตรวจสอบให้แน่ใจว่าได้ใส่อีเมลแล้ว',
      password: 'โปรดใส่รหัสผ่านของคุณ',
      identitySettings: 'ไม่สามารถเข้าถึงการตั้งค่าส่วนตัว เมื่อใช้ git-gateway backend ตรวจสอบให้แน่ใจว่าได้เปิดใช้งานระบบยืนยันตัวตนและ Git Gateway แล้ว'
    }
  },
  app: {
    header: {
      content: 'เนื้อหา',
      workflow: 'กระแสงาน',
      media: 'ไฟล์สื่อ',
      quickAdd: 'เพิ่มเนื้อหาด่วน'
    },
    app: {
      errorHeader: 'เกิดข้อผิดพลาดในการโหลดการตั้งค่า CMS',
      configErrors: 'คอนฟิกมีข้อผิดพลาด',
      checkConfigYml: 'กรุณาตรวจสอบไฟล์ config.yml ของคุณ',
      loadingConfig: 'กำลังโหลดการตั้งค่า...',
      waitingBackend: 'กำลังรอการตอบกลับจาก backend...'
    },
    notFoundPage: {
      header: 'ไม่พบหน้านี้'
    }
  },
  collection: {
    sidebar: {
      collections: 'กลุ่ม',
      allCollections: 'ทุกกลุ่ม',
      searchAll: 'ค้นหาทั้งหมด',
      searchIn: 'ค้าหาใน'
    },
    collectionTop: {
      sortBy: 'จัดเรียงตาม',
      viewAs: 'ดูในฐานะ',
      newButton: 'สร้าง %{collectionLabel}',
      ascending: 'น้อยไปมาก',
      descending: 'มากไปน้อย',
      searchResults: 'ผลลัพธ์การค้นหา "%{searchTerm}"',
      searchResultsInCollection: 'ผลลัพธ์การค้นหา "%{searchTerm}" ในกลุ่ม %{collection}',
      filterBy: 'กรองตาม',
      groupBy: 'จัดกลุ่มตาม'
    },
    entries: {
      loadingEntries: 'กำลังโหลดเนิ้อหา...',
      cachingEntries: 'กำลังแคชข้อมูลเนื้อหา...',
      longerLoading: 'อาจจะโหลดนานหลายนาที',
      noEntries: 'ไม่มีเนื้อหา'
    },
    groups: {
      other: 'อื่น ๆ',
      negateLabel: 'ไม่ใช่ %{label}'
    },
    defaultFields: {
      author: {
        label: 'ผู้เขียน'
      },
      updatedOn: {
        label: 'เวลาที่อัปเดต'
      }
    }
  },
  editor: {
    editorControl: {
      field: {
        optional: 'ทางเลือก'
      }
    },
    editorControlPane: {
      widget: {
        required: 'จำเป็นต้องระบุ %{fieldLabel}',
        regexPattern: '%{fieldLabel} ไม่ตรงกับรูปแบบ: %{pattern}',
        processing: '%{fieldLabel} กำลังประมวลผล',
        range: '%{fieldLabel} ต้องอยู่ระหว่าง %{minValue} และ %{maxValue}',
        min: '%{fieldLabel} จะต้องมีค่าไม่ต่ำกว่า %{minValue}',
        max: '%{fieldLabel} จะต้องมีค่าไม่มากกว่า %{maxValue}',
        rangeCount: '%{fieldLabel} จะต้องอยู่ระหว่าง %{minCount} และ %{maxCount} รายการ',
        rangeCountExact: '%{fieldLabel} จะต้องมี %{count} รายการ',
        rangeMin: '%{fieldLabel} จะต้องมีไม่ต่ำกว่า %{minCount} รายการ',
        rangeMax: '%{fieldLabel} จะต้องมีไม่มากกว่า %{maxCount} รายการ',
        invalidPath: `'%{path}' ไม่ใช่พาทที่ถูกต้อง`,
        pathExists: `พาท '%{path}' มีอยู่แล้ว`
      },
      i18n: {
        writingInLocale: 'กำลังเขียนด้วยภาษา %{locale}',
        copyFromLocale: 'คัดลอกจากภาษาอื่น',
        copyFromLocaleConfirm: 'คุณต้องการคัดลอกข้อมูลจากภาษา %{locale} หรือไม่?\nเนื้อหาทั้งหมดจะถูกแทนที่'
      }
    },
    editor: {
      onLeavePage: 'คุณแน่ใจหรือว่าจะออกจากหน้านี้?',
      onUpdatingWithUnsavedChanges: 'คุณมีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก โปรดบันทึกก่อนอัปเดตสถานะ',
      onPublishingNotReady: 'โปรดอัปเดตสถานะเป็น "พร้อม" ก่อนจะเผยแพร่',
      onPublishingWithUnsavedChanges: 'คุณมีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก โปรดบันทึกก่อนจะเผยแพร่',
      onPublishing: 'คุณแน่ใจหรือว่าจะเผยแพร่เนื้อหานี้?',
      onUnpublishing: 'คุณแน่ใจหรือว่าจะไม่ต้องการเผยแพร่เนื้อหานี้?',
      onDeleteWithUnsavedChanges: 'คุณแน่ใจหรือว่าจะต้องการลบการเผยแพร่เนื้อหานี้ รวมถึงการเปลี่ยนแปลงที่ยังไม่ได้บันทึก?',
      onDeletePublishedEntry: 'คุณแน่ใจหรือว่าจะต้องการลบการเผยแพร่เนื้อหานี้?',
      onDeleteUnpublishedChangesWithUnsavedChanges: 'คุณแน่ใจหรือว่าจะต้องการลบเนื้อหาที่ยังไม่ได้เผยแพร่ทั้งหมดนี้ รวมถึงการเปลี่ยนแปลงที่ยังไม่ได้บันทึก?',
      onDeleteUnpublishedChanges: 'คุณแน่ใจหรือว่าจะต้องการลบเนื้อหาที่ยังไม่ได้เผยแพร่ทั้งหมดนี้?',
      loadingEntry: 'กำลังโหลดเนื้อหา...',
      confirmLoadBackup: 'มีการกู้คืนข้อมูลสำรองสำหรับเนื้อหานี้ คุณต้องการใช้มันหรือไม่?'
    },
    editorInterface: {
      toggleI18n: 'เปิด/ปิด i18n',
      togglePreview: 'เปิด/ปิดการแสดงตัวอย่าง',
      toggleScrollSync: 'เปิด/ปิดการเลื่อนพร้อมกัน'
    },
    editorToolbar: {
      publishing: 'กำลังเผยแพร่...',
      publish: 'เผยแพร่',
      published: 'เผยแพร่แล้ว',
      unpublish: 'ไม่ได้เผยแพร่',
      duplicate: 'ทำซ้ำ',
      unpublishing: 'กำยังยกเลิกการเผยแพร่...',
      publishAndCreateNew: 'เผยแพร่ และสร้างใหม่',
      publishAndDuplicate: 'เผยแพร่ และทำซ้ำ',
      deleteUnpublishedChanges: 'ลบการเปลี่ยแปลงเนื้อหาที่ยังไม่ได้เผยแพร่',
      deleteUnpublishedEntry: 'ลบเนื้อหาที่ยังไม่ได้เผยแพร่',
      deletePublishedEntry: 'ลบเนื้อหาที่เผยแพร่แล้ว',
      deleteEntry: 'ลบเนื้อหา',
      saving: 'กำลังบันทึก...',
      save: 'บันทึก',
      statusInfoTooltipDraft: 'เนื้อหาอยู่ในสถานะร่าง หากเนื้อหาเสร็จสมบูรณ์แล้วและต้องการส่งเพื่อตรวจสอบ ให้ปรับเปลี่ยนสถานะเป็น ‘อยู่ระหว่างการตรวจสอบ’',
      statusInfoTooltipInReview: 'เนื้อหาอยู่ระหว่างการตรวจสอบ ไม่จำเป็นต้องทำอะไรเพิ่มเติม อย่างไรก็ตาม คุณสามารถแก้ไขเนื้อหาเพิ่มเติมได้ระหว่างการตรวจสอบ',
      deleting: 'กำลังลบ...',
      updating: 'กำลังอัปเดต...',
      status: 'สถานะ: %{status}',
      backCollection: ' เขียนในกลุ่ม %{collectionLabel}',
      unsavedChanges: 'การเปลี่ยนแปลงยังไม่ได้บันทึก',
      changesSaved: 'การเปลี่ยนเปลงถูกบันทึกแล้ว',
      draft: 'ร่าง',
      inReview: 'อยู่ระหว่างการตรวจสอบ',
      ready: 'พร้อม',
      publishNow: 'เผยแพร่ตอนนี้',
      deployPreviewPendingButtonLabel: 'ตรวจสอบตัวอย่าง',
      deployPreviewButtonLabel: 'ดูตัวอย่าง',
      deployButtonLabel: 'ดูตัวอย่างจากหน้าจริง'
    },
    editorWidgets: {
      markdown: {
        bold: 'ตัวหนา',
        italic: 'ตัวเอียง',
        code: 'โคด',
        link: 'ลิงก์',
        linkPrompt: 'ระบุ URL ของลิงก์',
        headings: 'หัวข้อ',
        quote: 'ยกคำพูดมา',
        bulletedList: 'รายการแบบไม่มีหมายเลข',
        numberedList: 'รายการแบบมีหมายเลข',
        addComponent: 'เพิ่มองค์ประกอบ',
        richText: 'ข้อความฟอร์แมต',
        markdown: 'มาร์คดาวน์'
      },
      image: {
        choose: 'เลือกรูปภาพ',
        chooseMultiple: 'เลือกรูปภาพหลายรูป',
        chooseUrl: 'แทรกจาก URL',
        replaceUrl: 'แทนที่ด้วย URL',
        promptUrl: 'ระบุ URL ของรูปภาพ',
        chooseDifferent: 'เลือกรูปภาพอื่น',
        addMore: 'เพิ่มรูปภาพ',
        remove: 'เอารูปภาพออก',
        removeAll: 'เอารูปภาพออกทั้งหมด'
      },
      file: {
        choose: 'เลือกไฟล์',
        chooseUrl: 'แทรกจาก URL',
        chooseMultiple: 'เลือกหลายไฟล์',
        replaceUrl: 'แทนที่ด้วย URL',
        promptUrl: 'ระบุ URL ของไฟล์',
        chooseDifferent: 'เลือกไฟล์อื่น',
        addMore: 'เพิ่มไฟล์',
        remove: 'เอาไฟล์ออก',
        removeAll: 'เอาไฟล์ออกทั้งหมด'
      },
      unknownControl: {
        noControl: "ไม่มีการควบคุม widget '%{widget}'."
      },
      unknownPreview: {
        noPreview: "ไม่มีตัวอย่างสำหรับ widget '%{widget}'."
      },
      headingOptions: {
        headingOne: 'หัวข้อ 1',
        headingTwo: 'หัวข้อ 2',
        headingThree: 'หัวข้อ 3',
        headingFour: 'หัวข้อ 4',
        headingFive: 'หัวข้อ 5',
        headingSix: 'หัวข้อ 6'
      },
      datetime: {
        now: 'เวลาตอนนี้',
        clear: 'ล้าง'
      },
      list: {
        add: 'เพิ่ม %{item}',
        addType: 'เพิ่ม %{item}'
      }
    }
  },
  mediaLibrary: {
    mediaLibraryCard: {
      draft: 'ร่าง',
      copy: 'คัดลอก',
      copyUrl: 'คัดลอก URL',
      copyPath: 'คัดลอกพาท',
      copyName: 'คัดลอกชื่อ',
      copied: 'คัดลอกแล้ว'
    },
    mediaLibrary: {
      onDelete: 'คุณแน่ใจหรือว่าจะลบไฟล์สื่อที่ถูกเลือก?',
      fileTooLarge: 'ไฟล์ใหญ่เกินไป\n ค่าที่ตั้งไว้ไม่ยอมรับไฟล์ที่ใหญ่กว่า %{size} kB.'
    },
    mediaLibraryModal: {
      loading: 'กำลังโหลด...',
      noResults: 'ไม่มีผลลัพธ์',
      noAssetsFound: 'ไม่พบข้อมูล',
      noImagesFound: 'ไม่พบรูปภาพ',
      private: 'ส่วนตัว ',
      images: 'รูปภาพ',
      mediaAssets: 'ข้อมูลไฟล์สื่อ',
      search: 'ค้นหา...',
      uploading: 'กำลังอัปโหลด...',
      upload: 'อัปโหลด',
      download: 'ดาวน์โหลด',
      deleting: 'กำลังลบ...',
      deleteSelected: 'ลบข้อมูลที่เลือก',
      chooseSelected: 'เลือกข้อมูลที่ถูกเลือก'
    }
  },
  ui: {
    default: {
      goBackToSite: 'กลับไปยังเว็บไซต์'
    },
    errorBoundary: {
      title: 'มีข้อผิดพลาด',
      details: 'มีข้อผิดพลาดเกิดขึ้น',
      reportIt: 'แจ้งข้อผิดพลาดบน GitHub',
      detailsHeading: 'รายละเอียด',
      privacyWarning: 'การแจ้งปัญหาจะเติมข้อมูลล่วงหน้าด้วยข้อความแสดงข้อผิดพลาดและข้อมูลการดีบัก\nโปรดตรวจสอบข้อมูลว่าถูกต้องและลบข้อมูลที่สำคัญหากมีอยู่',
      recoveredEntry: {
        heading: 'เอกสารถูกกู้คืน',
        warning: 'โปรด คัดลอก/วาง ที่ใดที่หนึ่งก่อนจะทำอย่างอื่น!',
        copyButtonLabel: 'คัดลอกไปที่คลิปบอร์ด'
      }
    },
    settingsDropdown: {
      logOut: 'ออกจากระบบ'
    },
    toast: {
      onFailToLoadEntries: 'ล้มเหลวในการโหลดเนื้อหา: %{details}',
      onFailToLoadDeployPreview: 'ล้มเหลวในการโหลดตัวอย่าง: %{details}',
      onFailToPersist: 'ล้มเหลวในการยืนยันเนื้อหา: %{details}',
      onFailToDelete: 'ล้มเหลวในการลบเนื้อหา: %{details}',
      onFailToUpdateStatus: 'ล้มเหลวในการอัปเดตสถานะ: %{details}',
      missingRequiredField: 'คุณไม่ได้ใส่ข้อมูลในช่องที่จำเป็น กรุณาใส่ข้อมูลก่อนบันทึก',
      entrySaved: 'เนื้อหาถูกบันทึก',
      entryPublished: 'เนื้อหาถูกเผยแพร่',
      entryUnpublished: 'เนื้อหาถูกยกเลิกการเผยแพร่',
      onFailToPublishEntry: 'ล้มเหลวในการเผยแพร่เนื้อหา: %{details}',
      onFailToUnpublishEntry: 'ล้มเหลวในการยกเลิกการเผยแพร่เนื้อหา: %{details}',
      entryUpdated: 'สถานะเนื้อหาถูกอัปเดต',
      onDeleteUnpublishedChanges: 'การเปลี่ยนแปลงเนื้อหาไม่ถูกเผยแพร่ได้ถูกลบ',
      onFailToAuth: '%{details}',
      onLoggedOut: 'คุณได้ออกจากระบบ โปรดสำรองข้อมูลแล้วเข้าสู่ระบบอีกครั้ง',
      onBackendDown: 'บริการแบ็กเอนด์เกิดการขัดข้อง ดู %{details} สำหรับข้อมูลเพิ่มเติม'
    }
  },
  workflow: {
    workflow: {
      loading: 'กำลังโหลดเนื้อหากระแสงานของบรรณาธิการ',
      workflowHeading: 'กระแสงานของบรรณาธิการ',
      newPost: 'สร้างโพสต์ใหม่',
      description: 'เนื้อหา %{smart_count} รายการอยู่ระหว่างการตรวจสอบ, %{readyCount} รายการพร้อมที่จะเผยแพร่',
      dateFormat: 'MMMM D'
    },
    workflowCard: {
      lastChange: '%{date} โดย %{author}',
      lastChangeNoAuthor: '%{date}',
      lastChangeNoDate: 'โดย %{author}',
      deleteChanges: 'ลบการเปลี่ยนแปลง',
      deleteNewEntry: 'ลบเนื้อหาใหม่',
      publishChanges: 'เผยแพร่การเปลี่ยนแปลง',
      publishNewEntry: 'เผยแพร่เนื้อหาใหม่'
    },
    workflowList: {
      onDeleteEntry: 'คุณแน่ใจหรือว่าจะต้องการลบเนื้อหานี้?',
      onPublishingNotReadyEntry: 'สามารถเผยแพร่เฉพาะรายการที่มีสถานะ "พร้อม" โปรดลากเนื้อหาไปยังช่อง "พร้อม" เพื่อให้เผยแพร่ได้',
      onPublishEntry: 'คุณแน่ใจหรือว่าจะต้องการเผยแพร่เนื้อหานี้?',
      draftHeader: 'ร่าง',
      inReviewHeader: 'อยู่ระหว่างการตรวจสอบ',
      readyHeader: 'พร้อม',
      currentEntries: 'เนื้อหา %{smart_count} รายการ'
    }
  }
};
var _default = exports.default = th;