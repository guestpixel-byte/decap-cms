"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const zh_Hans = {
  auth: {
    login: '登录',
    loggingIn: '正在登录...',
    loginWithNetlifyIdentity: '使用 Netlify Identity 登录',
    loginWithAzure: '使用 Azure 登录',
    loginWithBitbucket: '使用 Bitbucket 登录',
    loginWithGitHub: '使用 GitHub 登录',
    loginWithGitLab: '使用 GitLab 登录',
    loginWithGitea: '使用 Gitea 登录',
    errors: {
      email: '请输入电子邮箱',
      password: '请输入密码',
      identitySettings: '无法连接账户认证系统（如果正在使用 git-gateway 作为 backend，请确保已经开启 Netlify Identity 服务以及 Git Gateway）'
    }
  },
  app: {
    header: {
      content: '内容',
      workflow: '工作流',
      media: '媒体',
      quickAdd: '快速新建'
    },
    app: {
      errorHeader: '加载 CMS 配置时发生错误',
      configErrors: '配置错误',
      checkConfigYml: '请检查 config.yml 文件是否配置正确',
      loadingConfig: '正在加载配置...',
      waitingBackend: '等待 backend 数据...'
    },
    notFoundPage: {
      header: '页面不存在'
    }
  },
  collection: {
    sidebar: {
      collections: '集合',
      allCollections: '所有集合',
      searchAll: '查找所有...',
      searchIn: '查找'
    },
    collectionTop: {
      sortBy: '排序',
      viewAs: '查看',
      newButton: '新建%{collectionLabel}',
      ascending: '升序',
      descending: '降序',
      searchResults: '有关“%{searchTerm}”的搜索结果',
      searchResultsInCollection: '在%{collection}中有关“%{searchTerm}”的搜索结果',
      filterBy: '筛选',
      groupBy: '分组'
    },
    entries: {
      loadingEntries: '正在加载内容...',
      cachingEntries: '正在缓存内容...',
      longerLoading: '这可能需要花费几分钟时间',
      noEntries: '暂无内容'
    },
    groups: {
      other: '其他',
      negateLabel: '非%{label}'
    },
    defaultFields: {
      author: {
        label: '作者'
      },
      updatedOn: {
        label: '更新于'
      }
    }
  },
  editor: {
    editorControl: {
      field: {
        optional: '可选'
      }
    },
    editorControlPane: {
      widget: {
        required: '“%{fieldLabel}”是必填项',
        regexPattern: '“%{fieldLabel}”不满足模式%{pattern}',
        processing: '“%{fieldLabel}”正在处理中',
        range: '“%{fieldLabel}”必须位于 %{minValue} 和 %{maxValue} 之间',
        min: '“%{fieldLabel}”必须至少为 %{minValue}',
        max: '“%{fieldLabel}”必须小于等于 %{maxValue}',
        rangeCount: '“%{fieldLabel}”必须包含 %{minCount} 到 %{maxCount} 个项目',
        rangeCountExact: '“%{fieldLabel}”必须且只能包含 %{count} 个项目',
        minCount: '“%{fieldLabel}”必须为至少 %{minCount} 个项目',
        maxCount: '“%{fieldLabel}”必须为小于等于 %{maxCount} 个项目',
        invalidPath: `“%{path}”为无效路径`,
        pathExists: `路径“%{path}”已经存在`
      },
      i18n: {
        writingInLocale: '正在使用%{locale}撰写',
        copyFromLocale: '用其他语言进行填充',
        copyFromLocaleConfirm: '你确定要用“%{locale}”进行填充吗？\n这将会覆盖所有现有的内容。'
      }
    },
    editor: {
      onLeavePage: '你确定要离开此页面吗？',
      onUpdatingWithUnsavedChanges: '你有尚未保存的修改，请在更新状态前进行保存',
      onPublishingNotReady: '请在发布之前将状态更新为“就绪”',
      onPublishingWithUnsavedChanges: '你有尚未保存的修改，请在发布前进行保存',
      onPublishing: '你确定要发布此内容吗？',
      onUnpublishing: '你确定要撤销发布此内容吗？',
      onDeleteWithUnsavedChanges: '你确定要删除这个已经发布的内容，以及当前尚未保存的修改吗？',
      onDeletePublishedEntry: '你确定要删除这个已经发布的内容吗？',
      onDeleteUnpublishedChangesWithUnsavedChanges: '此内容所有未被发布的修改，以及当前尚未保存的修改都将被删除，你确定吗？',
      onDeleteUnpublishedChanges: '此内容所有未被发布的修改都将被删除，你确定吗？',
      loadingEntry: '正在加载内容...',
      confirmLoadBackup: '发现了一个对应此内容的本地备份，你要加载它吗？'
    },
    editorInterface: {
      toggleI18n: '打开/关闭国际化',
      togglePreview: '打开/关闭预览',
      toggleScrollSync: '同步滚动'
    },
    editorToolbar: {
      publishing: '正在发布...',
      publish: '发布',
      published: '已发布',
      unpublish: '撤销发布',
      duplicate: '复制',
      unpublishing: '正在撤销发布...',
      publishAndCreateNew: '发布，然后新建内容',
      publishAndDuplicate: '发布，然后复制内容',
      deleteUnpublishedChanges: '删除未发布的修改',
      deleteUnpublishedEntry: '删除未发布的内容',
      deletePublishedEntry: '删除已发布的内容',
      deleteEntry: '删除内容',
      saving: '正在保存...',
      save: '保存',
      deleting: '正在删除...',
      updating: '正在更新...',
      status: '状态: %{status}',
      backCollection: '正在集合“%{collectionLabel}”中编写',
      unsavedChanges: '含未保存的修改',
      changesSaved: '修改已保存',
      draft: '草稿',
      inReview: '审核中',
      ready: '就绪',
      publishNow: '立即发布',
      deployPreviewPendingButtonLabel: '点击以预览',
      deployPreviewButtonLabel: '查看预览',
      deployButtonLabel: '查看发布'
    },
    editorWidgets: {
      markdown: {
        bold: '粗体',
        italic: '斜体',
        code: '代码',
        link: '链接',
        linkPrompt: '输入链接的 URL',
        headings: '标题',
        quote: '引用',
        bulletedList: '无序列表',
        numberedList: '有序列表',
        addComponent: '添加组件',
        richText: '富文本',
        markdown: 'Markdown'
      },
      image: {
        choose: '选择图片',
        chooseUrl: '从 URL 插入',
        replaceUrl: '用 URL 替代',
        promptUrl: '输入图片的 URL',
        chooseDifferent: '选择其他图片',
        remove: '移除图片'
      },
      file: {
        choose: '选择文件',
        chooseUrl: '从 URL 插入',
        replaceUrl: '用 URL 替代',
        promptUrl: '输入文件的 URL',
        chooseDifferent: '选择其他文件',
        remove: '移除文件'
      },
      unknownControl: {
        noControl: "'%{widget}'的控件不存在"
      },
      unknownPreview: {
        noPreview: "'%{widget}'无法预览"
      },
      headingOptions: {
        headingOne: '标题 1',
        headingTwo: '标题 2',
        headingThree: '标题 3',
        headingFour: '标题 4',
        headingFive: '标题 5',
        headingSix: '标题 6'
      },
      datetime: {
        now: '现在',
        clear: '清除'
      },
      list: {
        add: '新增%{item}'
      }
    }
  },
  mediaLibrary: {
    mediaLibraryCard: {
      draft: '草稿',
      copy: '复制',
      copyUrl: '复制 URL',
      copyPath: '复制路径',
      copyName: '复制名称',
      copied: '已复制'
    },
    mediaLibrary: {
      onDelete: '你确定要删除此媒体项目吗？',
      fileTooLarge: '文件体积过大\n目前的配置中不允许文件体积超过 %{size} kB'
    },
    mediaLibraryModal: {
      loading: '正在加载...',
      noResults: '暂无结果',
      noAssetsFound: '未找到资源',
      noImagesFound: '未找到图片',
      private: '私有',
      images: '图片',
      mediaAssets: '媒体资源',
      search: '搜索...',
      uploading: '正在上传...',
      upload: '上传',
      download: '下载',
      deleting: '正在下载...',
      deleteSelected: '删除已选中项目',
      chooseSelected: '选用已选中项目'
    }
  },
  ui: {
    default: {
      goBackToSite: '返回主页'
    },
    errorBoundary: {
      title: '错误',
      details: '程序发生了一个错误，请',
      reportIt: '在 Github 上发布一个 Issue',
      detailsHeading: '详情',
      privacyWarning: '发布一个 Issue 会将错误信息和调试数据预置其中\n请确保这些信息是正确的，同时移除那些敏感数据',
      recoveredEntry: {
        heading: '已恢复的文档',
        warning: '请在切换至其他页面之前，将它复制并粘贴到某个地方',
        copyButtonLabel: '复制到剪贴板'
      }
    },
    settingsDropdown: {
      logOut: '注销'
    },
    toast: {
      onFailToLoadEntries: '加载内容失败: %{details}',
      onFailToLoadDeployPreview: '加载预览失败: %{details}',
      onFailToPersist: '保存内容失败: %{details}',
      onFailToDelete: '删除内容失败: %{details}',
      onFailToUpdateStatus: '更新状态失败: %{details}',
      missingRequiredField: '你漏掉了一个必填项，请在保存之前将它填写好',
      entrySaved: '内容已保存',
      entryPublished: '内容已发布',
      entryUnpublished: '内容已撤销发布',
      onFailToPublishEntry: '发布失败: %{details}',
      onFailToUnpublishEntry: '撤销发布失败: %{details}',
      entryUpdated: '内容状态已更新',
      onDeleteUnpublishedChanges: '未发布的修改已删除',
      onFailToAuth: '%{details}',
      onLoggedOut: '你已注销，请先保存好数据然后再次登录',
      onBackendDown: 'Backend 服务已中断，欲知详情请查看：%{details}'
    }
  },
  workflow: {
    workflow: {
      loading: '正在加载编辑工作流项目',
      workflowHeading: '编辑工作流',
      newPost: '新建帖子',
      description: '%{smart_count} 个待审查的内容、%{readyCount} 个已就绪的内容 |||| %{smart_count} 个待检查的内容、%{readyCount} 个已就绪的内容',
      dateFormat: 'MMMM D'
    },
    workflowCard: {
      lastChange: '%{date} 由 %{author} 修改',
      lastChangeNoAuthor: '%{date}',
      lastChangeNoDate: '由 %{author} 修改',
      deleteChanges: '删除修改',
      deleteNewEntry: '删除新内容',
      publishChanges: '发布修改',
      publishNewEntry: '发布新内容'
    },
    workflowList: {
      onDeleteEntry: '你确定要删除此内容吗？',
      onPublishingNotReadyEntry: '只有状态为“就绪”的项目才能被发布。需要先将卡片拖动到“就绪”一列才能发布',
      onPublishEntry: '你确定要发布此内容吗？',
      draftHeader: '草稿',
      inReviewHeader: '审查中',
      readyHeader: '就绪',
      currentEntries: '%{smart_count} 个内容 |||| %{smart_count} 个内容'
    }
  }
};
var _default = exports.default = zh_Hans;