"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _trimStart2 = _interopRequireDefault(require("lodash/trimStart"));
var _trim2 = _interopRequireDefault(require("lodash/trim"));
var _apolloClient = require("apollo-client");
var _apolloCacheInmemory = require("apollo-cache-inmemory");
var _apolloLinkHttp = require("apollo-link-http");
var _apolloLinkContext = require("apollo-link-context");
var _decapCmsLibUtil = require("decap-cms-lib-util");
var _fragmentTypes = _interopRequireDefault(require("./fragmentTypes"));
var _API = _interopRequireWildcard(require("./API"));
var queries = _interopRequireWildcard(require("./queries"));
var mutations = _interopRequireWildcard(require("./mutations"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const NO_CACHE = 'no-cache';
const CACHE_FIRST = 'cache-first';
const fragmentMatcher = new _apolloCacheInmemory.IntrospectionFragmentMatcher({
  introspectionQueryResultData: _fragmentTypes.default
});
function transformPullRequest(pr) {
  return _objectSpread(_objectSpread({}, pr), {}, {
    labels: pr.labels.nodes,
    head: {
      ref: pr.headRefName,
      sha: pr.headRefOid,
      repo: {
        fork: pr.repository.isFork
      }
    },
    base: {
      ref: pr.baseRefName,
      sha: pr.baseRefOid
    }
  });
}
class GraphQLAPI extends _API.default {
  constructor(config) {
    super(config);
    _defineProperty(this, "client", void 0);
    this.client = this.getApolloClient();
  }
  getApolloClient() {
    const authLink = (0, _apolloLinkContext.setContext)((_, {
      headers
    }) => {
      return {
        headers: _objectSpread(_objectSpread({
          'Content-Type': 'application/json; charset=utf-8'
        }, headers), {}, {
          authorization: this.token ? `${this.tokenKeyword} ${this.token}` : ''
        })
      };
    });
    const httpLink = (0, _apolloLinkHttp.createHttpLink)({
      uri: `${this.apiRoot}/graphql`
    });
    return new _apolloClient.ApolloClient({
      link: authLink.concat(httpLink),
      cache: new _apolloCacheInmemory.InMemoryCache({
        fragmentMatcher
      }),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: NO_CACHE,
          errorPolicy: 'ignore'
        },
        query: {
          fetchPolicy: NO_CACHE,
          errorPolicy: 'all'
        }
      }
    });
  }
  reset() {
    return this.client.resetStore();
  }
  async getRepository(owner, name) {
    const {
      data
    } = await this.query({
      query: queries.repository,
      variables: {
        owner,
        name
      },
      fetchPolicy: CACHE_FIRST // repository id doesn't change
    });
    return data.repository;
  }
  query(options) {
    return this.client.query(options).catch(error => {
      throw new _decapCmsLibUtil.APIError(error.message, 500, 'GitHub');
    });
  }
  async mutate(options) {
    try {
      const result = await this.client.mutate(options);
      return result;
    } catch (error) {
      const errors = error.graphQLErrors;
      if (Array.isArray(errors) && errors.some(e => e.message === 'Ref cannot be created.')) {
        var _options$variables, _options$variables$cr;
        const refName = (options === null || options === void 0 ? void 0 : (_options$variables = options.variables) === null || _options$variables === void 0 ? void 0 : (_options$variables$cr = _options$variables.createRefInput) === null || _options$variables$cr === void 0 ? void 0 : _options$variables$cr.name) || '';
        const branchName = (0, _trimStart2.default)(refName, 'refs/heads/');
        if (branchName) {
          await (0, _decapCmsLibUtil.throwOnConflictingBranches)(branchName, name => this.getBranch(name), _API.API_NAME);
        }
      } else if (Array.isArray(errors) && errors.some(e => new RegExp(`A ref named "refs/heads/${_decapCmsLibUtil.CMS_BRANCH_PREFIX}/.+?" already exists in the repository.`).test(e.message))) {
        var _options$variables2, _options$variables2$c, _options$variables3, _options$variables3$c;
        const refName = (options === null || options === void 0 ? void 0 : (_options$variables2 = options.variables) === null || _options$variables2 === void 0 ? void 0 : (_options$variables2$c = _options$variables2.createRefInput) === null || _options$variables2$c === void 0 ? void 0 : _options$variables2$c.name) || '';
        const sha = (options === null || options === void 0 ? void 0 : (_options$variables3 = options.variables) === null || _options$variables3 === void 0 ? void 0 : (_options$variables3$c = _options$variables3.createRefInput) === null || _options$variables3$c === void 0 ? void 0 : _options$variables3$c.oid) || '';
        const branchName = (0, _trimStart2.default)(refName, 'refs/heads/');
        if (branchName && branchName.startsWith(`${_decapCmsLibUtil.CMS_BRANCH_PREFIX}/`) && sha) {
          try {
            // this can happen if the branch wasn't deleted when the PR was merged
            // we backup the existing branch just in case an re-run the mutation
            await this.backupBranch(branchName);
            await this.deleteBranch(branchName);
            const result = await this.client.mutate(options);
            return result;
          } catch (e) {
            console.log(e);
          }
        }
      }
      throw new _decapCmsLibUtil.APIError(error.message, 500, 'GitHub');
    }
  }
  async hasWriteAccess() {
    const {
      repoOwner: owner,
      repoName: name
    } = this;
    try {
      const {
        data
      } = await this.query({
        query: queries.repoPermission,
        variables: {
          owner,
          name
        },
        fetchPolicy: CACHE_FIRST // we can assume permission doesn't change often
      });
      // https://developer.github.com/v4/enum/repositorypermission/
      const {
        viewerPermission
      } = data.repository;
      return ['ADMIN', 'MAINTAIN', 'WRITE'].includes(viewerPermission);
    } catch (error) {
      console.error('Problem fetching repo data from GitHub');
      throw error;
    }
  }
  async user() {
    const {
      data
    } = await this.query({
      query: queries.user,
      fetchPolicy: CACHE_FIRST // we can assume user details don't change often
    });
    return data.viewer;
  }
  async retrieveBlobObject(owner, name, expression, options = {}) {
    const {
      data
    } = await this.query(_objectSpread({
      query: queries.blob,
      variables: {
        owner,
        name,
        expression
      }
    }, options));
    // https://developer.github.com/v4/object/blob/
    if (data.repository.object) {
      const {
        is_binary: isBinary,
        text
      } = data.repository.object;
      return {
        isNull: false,
        isBinary,
        text
      };
    } else {
      return {
        isNull: true
      };
    }
  }
  getOwnerAndNameFromRepoUrl(repoURL) {
    let {
      repoOwner: owner,
      repoName: name
    } = this;
    if (repoURL === this.originRepoURL) {
      ({
        originRepoOwner: owner,
        originRepoName: name
      } = this);
    }
    return {
      owner,
      name
    };
  }
  async readFile(path, sha, {
    branch = this.branch,
    repoURL = this.repoURL,
    parseText = true
  } = {}) {
    if (!sha) {
      sha = await this.getFileSha(path, {
        repoURL,
        branch
      });
    }
    const fetchContent = () => this.fetchBlobContent({
      sha: sha,
      repoURL,
      parseText
    });
    const content = await (0, _decapCmsLibUtil.readFile)(sha, fetchContent, _decapCmsLibUtil.localForage, parseText);
    return content;
  }
  async fetchBlobContent({
    sha,
    repoURL,
    parseText
  }) {
    if (!parseText) {
      return super.fetchBlobContent({
        sha,
        repoURL,
        parseText
      });
    }
    const {
      owner,
      name
    } = this.getOwnerAndNameFromRepoUrl(repoURL);
    const {
      isNull,
      isBinary,
      text
    } = await this.retrieveBlobObject(owner, name, sha, {
      fetchPolicy: CACHE_FIRST
    } // blob sha is derived from file content
    );
    if (isNull) {
      throw new _decapCmsLibUtil.APIError('Not Found', 404, 'GitHub');
    } else if (!isBinary) {
      return text;
    } else {
      return super.fetchBlobContent({
        sha,
        repoURL,
        parseText
      });
    }
  }
  async getPullRequestAuthor(pullRequest) {
    const user = pullRequest.user;
    return (user === null || user === void 0 ? void 0 : user.name) || (user === null || user === void 0 ? void 0 : user.login);
  }
  async getPullRequests(head, state, predicate) {
    const {
      originRepoOwner: owner,
      originRepoName: name
    } = this;
    let states;
    if (state === _API.PullRequestState.Open) {
      states = ['OPEN'];
    } else if (state === _API.PullRequestState.Closed) {
      states = ['CLOSED', 'MERGED'];
    } else {
      states = ['OPEN', 'CLOSED', 'MERGED'];
    }
    const {
      data
    } = await this.query({
      query: queries.pullRequests,
      variables: _objectSpread(_objectSpread({
        owner,
        name
      }, head ? {
        head
      } : {}), {}, {
        states
      })
    });
    const {
      pullRequests
    } = data.repository;
    const mapped = pullRequests.nodes.map(transformPullRequest);
    return mapped.filter(pr => pr.head.ref.startsWith(`${_decapCmsLibUtil.CMS_BRANCH_PREFIX}/`) && predicate(pr));
  }
  async getOpenAuthoringBranches() {
    const {
      repoOwner: owner,
      repoName: name
    } = this;
    const {
      data
    } = await this.query({
      query: queries.openAuthoringBranches,
      variables: {
        owner,
        name,
        refPrefix: `refs/heads/cms/${this.repo}/`
      }
    });
    return data.repository.refs.nodes.map(({
      name,
      prefix
    }) => ({
      ref: `${prefix}${name}`
    }));
  }
  async getStatuses(collectionName, slug) {
    const contentKey = this.generateContentKey(collectionName, slug);
    const branch = (0, _decapCmsLibUtil.branchFromContentKey)(contentKey);
    const pullRequest = await this.getBranchPullRequest(branch);
    const sha = pullRequest.head.sha;
    const {
      originRepoOwner: owner,
      originRepoName: name
    } = this;
    const {
      data
    } = await this.query({
      query: queries.statues,
      variables: {
        owner,
        name,
        sha
      }
    });
    if (data.repository.object) {
      const {
        status
      } = data.repository.object;
      const {
        contexts
      } = status || {
        contexts: []
      };
      return contexts;
    } else {
      return [];
    }
  }
  getAllFiles(entries, path) {
    const allFiles = entries.reduce((acc, item) => {
      if (item.type === 'tree') {
        var _item$object;
        const entries = ((_item$object = item.object) === null || _item$object === void 0 ? void 0 : _item$object.entries) || [];
        return [...acc, ...this.getAllFiles(entries, `${path}/${item.name}`)];
      } else if (item.type === 'blob') {
        return [...acc, {
          name: item.name,
          type: item.type,
          id: item.sha,
          path: `${path}/${item.name}`,
          size: item.blob ? item.blob.size : 0
        }];
      }
      return acc;
    }, []);
    return allFiles;
  }
  async listFiles(path, {
    repoURL = this.repoURL,
    branch = this.branch,
    depth = 1
  } = {}) {
    const {
      owner,
      name
    } = this.getOwnerAndNameFromRepoUrl(repoURL);
    const folder = (0, _trim2.default)(path, '/');
    const {
      data
    } = await this.query({
      query: queries.files(depth),
      variables: {
        owner,
        name,
        expression: `${branch}:${folder}`
      }
    });
    if (data.repository.object) {
      const allFiles = this.getAllFiles(data.repository.object.entries, folder);
      return allFiles;
    } else {
      return [];
    }
  }
  getBranchQualifiedName(branch) {
    return `refs/heads/${branch}`;
  }
  getBranchQuery(branch, owner, name) {
    return {
      query: queries.branch,
      variables: {
        owner,
        name,
        qualifiedName: this.getBranchQualifiedName(branch)
      }
    };
  }
  async getDefaultBranch() {
    const {
      data
    } = await this.query(_objectSpread({}, this.getBranchQuery(this.branch, this.originRepoOwner, this.originRepoName)));
    return data.repository.branch;
  }
  async getBranch(branch) {
    const {
      data
    } = await this.query(_objectSpread(_objectSpread({}, this.getBranchQuery(branch, this.repoOwner, this.repoName)), {}, {
      fetchPolicy: CACHE_FIRST
    }));
    if (!data.repository.branch) {
      throw new _decapCmsLibUtil.APIError('Branch not found', 404, _API.API_NAME);
    }
    return data.repository.branch;
  }
  async patchRef(type, name, sha, opts = {}) {
    if (type !== 'heads') {
      return super.patchRef(type, name, sha, opts);
    }
    const force = opts.force || false;
    const branch = await this.getBranch(name);
    const {
      data
    } = await this.mutate({
      mutation: mutations.updateBranch,
      variables: {
        input: {
          oid: sha,
          refId: branch.id,
          force
        }
      }
    });
    return data.updateRef.branch;
  }
  async deleteBranch(branchName) {
    const branch = await this.getBranch(branchName);
    const {
      data
    } = await this.mutate({
      mutation: mutations.deleteBranch,
      variables: {
        deleteRefInput: {
          refId: branch.id
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      update: store => store.data.delete((0, _apolloCacheInmemory.defaultDataIdFromObject)(branch))
    });
    return data.deleteRef;
  }
  getPullRequestQuery(number) {
    const {
      originRepoOwner: owner,
      originRepoName: name
    } = this;
    return {
      query: queries.pullRequest,
      variables: {
        owner,
        name,
        number
      }
    };
  }
  async getPullRequest(number) {
    const {
      data
    } = await this.query(_objectSpread(_objectSpread({}, this.getPullRequestQuery(number)), {}, {
      fetchPolicy: CACHE_FIRST
    }));

    // https://developer.github.com/v4/enum/pullrequeststate/
    // GraphQL state: [CLOSED, MERGED, OPEN]
    // REST API state: [closed, open]
    const state = data.repository.pullRequest.state === 'OPEN' ? _API.PullRequestState.Open : _API.PullRequestState.Closed;
    return _objectSpread(_objectSpread({}, data.repository.pullRequest), {}, {
      state
    });
  }
  getPullRequestAndBranchQuery(branch, number) {
    const {
      repoOwner: owner,
      repoName: name
    } = this;
    const {
      originRepoOwner,
      originRepoName
    } = this;
    return {
      query: queries.pullRequestAndBranch,
      variables: {
        owner,
        name,
        originRepoOwner,
        originRepoName,
        number,
        qualifiedName: this.getBranchQualifiedName(branch)
      }
    };
  }
  async getPullRequestAndBranch(branch, number) {
    const {
      data
    } = await this.query(_objectSpread(_objectSpread({}, this.getPullRequestAndBranchQuery(branch, number)), {}, {
      fetchPolicy: CACHE_FIRST
    }));
    const {
      repository,
      origin
    } = data;
    return {
      branch: repository.branch,
      pullRequest: origin.pullRequest
    };
  }
  async openPR(number) {
    const pullRequest = await this.getPullRequest(number);
    const {
      data
    } = await this.mutate({
      mutation: mutations.reopenPullRequest,
      variables: {
        reopenPullRequestInput: {
          pullRequestId: pullRequest.id
        }
      },
      update: (store, {
        data: mutationResult
      }) => {
        const {
          pullRequest
        } = mutationResult.reopenPullRequest;
        const pullRequestData = {
          repository: _objectSpread(_objectSpread({}, pullRequest.repository), {}, {
            pullRequest
          })
        };
        store.writeQuery(_objectSpread(_objectSpread({}, this.getPullRequestQuery(pullRequest.number)), {}, {
          data: pullRequestData
        }));
      }
    });
    return data.reopenPullRequest;
  }
  async closePR(number) {
    const pullRequest = await this.getPullRequest(number);
    const {
      data
    } = await this.mutate({
      mutation: mutations.closePullRequest,
      variables: {
        closePullRequestInput: {
          pullRequestId: pullRequest.id
        }
      },
      update: (store, {
        data: mutationResult
      }) => {
        const {
          pullRequest
        } = mutationResult.closePullRequest;
        const pullRequestData = {
          repository: _objectSpread(_objectSpread({}, pullRequest.repository), {}, {
            pullRequest
          })
        };
        store.writeQuery(_objectSpread(_objectSpread({}, this.getPullRequestQuery(pullRequest.number)), {}, {
          data: pullRequestData
        }));
      }
    });
    return data.closePullRequest;
  }
  async deleteUnpublishedEntry(collectionName, slug) {
    try {
      const contentKey = this.generateContentKey(collectionName, slug);
      const branchName = (0, _decapCmsLibUtil.branchFromContentKey)(contentKey);
      const pr = await this.getBranchPullRequest(branchName);
      if (pr.number !== _API.MOCK_PULL_REQUEST) {
        const {
          branch,
          pullRequest
        } = await this.getPullRequestAndBranch(branchName, pr.number);
        const {
          data
        } = await this.mutate({
          mutation: mutations.closePullRequestAndDeleteBranch,
          variables: {
            deleteRefInput: {
              refId: branch.id
            },
            closePullRequestInput: {
              pullRequestId: pullRequest.id
            }
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          update: store => {
            store.data.delete((0, _apolloCacheInmemory.defaultDataIdFromObject)(branch));
            store.data.delete((0, _apolloCacheInmemory.defaultDataIdFromObject)(pullRequest));
          }
        });
        return data.closePullRequest;
      } else {
        return await this.deleteBranch(branchName);
      }
    } catch (e) {
      const {
        graphQLErrors
      } = e;
      if (graphQLErrors && graphQLErrors.length > 0) {
        const branchNotFound = graphQLErrors.some(e => e.type === 'NOT_FOUND');
        if (branchNotFound) {
          return;
        }
      }
      throw e;
    }
  }
  async createPR(title, head) {
    const [repository, headReference] = await Promise.all([this.getRepository(this.originRepoOwner, this.originRepoName), this.useOpenAuthoring ? `${(await this.user()).login}:${head}` : head]);
    const {
      data
    } = await this.mutate({
      mutation: mutations.createPullRequest,
      variables: {
        createPullRequestInput: {
          baseRefName: this.branch,
          body: _decapCmsLibUtil.DEFAULT_PR_BODY,
          title,
          headRefName: headReference,
          repositoryId: repository.id
        }
      },
      update: (store, {
        data: mutationResult
      }) => {
        const {
          pullRequest
        } = mutationResult.createPullRequest;
        const pullRequestData = {
          repository: _objectSpread(_objectSpread({}, pullRequest.repository), {}, {
            pullRequest
          })
        };
        store.writeQuery(_objectSpread(_objectSpread({}, this.getPullRequestQuery(pullRequest.number)), {}, {
          data: pullRequestData
        }));
      }
    });
    const {
      pullRequest
    } = data.createPullRequest;
    return _objectSpread(_objectSpread({}, pullRequest), {}, {
      head: {
        sha: pullRequest.headRefOid
      }
    });
  }
  async createBranch(branchName, sha) {
    const owner = this.repoOwner;
    const name = this.repoName;
    const repository = await this.getRepository(owner, name);
    const {
      data
    } = await this.mutate({
      mutation: mutations.createBranch,
      variables: {
        createRefInput: {
          name: this.getBranchQualifiedName(branchName),
          oid: sha,
          repositoryId: repository.id
        }
      },
      update: (store, {
        data: mutationResult
      }) => {
        const {
          branch
        } = mutationResult.createRef;
        const branchData = {
          repository: _objectSpread(_objectSpread({}, branch.repository), {}, {
            branch
          })
        };
        store.writeQuery(_objectSpread(_objectSpread({}, this.getBranchQuery(branchName, owner, name)), {}, {
          data: branchData
        }));
      }
    });
    const {
      branch
    } = data.createRef;
    return _objectSpread(_objectSpread({}, branch), {}, {
      ref: `${branch.prefix}${branch.name}`
    });
  }
  async createBranchAndPullRequest(branchName, sha, title) {
    const owner = this.originRepoOwner;
    const name = this.originRepoName;
    const repository = await this.getRepository(owner, name);
    const {
      data
    } = await this.mutate({
      mutation: mutations.createBranchAndPullRequest,
      variables: {
        createRefInput: {
          name: this.getBranchQualifiedName(branchName),
          oid: sha,
          repositoryId: repository.id
        },
        createPullRequestInput: {
          baseRefName: this.branch,
          body: _decapCmsLibUtil.DEFAULT_PR_BODY,
          title,
          headRefName: branchName,
          repositoryId: repository.id
        }
      },
      update: (store, {
        data: mutationResult
      }) => {
        const {
          branch
        } = mutationResult.createRef;
        const {
          pullRequest
        } = mutationResult.createPullRequest;
        const branchData = {
          repository: _objectSpread(_objectSpread({}, branch.repository), {}, {
            branch
          })
        };
        const pullRequestData = {
          repository: _objectSpread(_objectSpread({}, pullRequest.repository), {}, {
            branch
          }),
          origin: _objectSpread(_objectSpread({}, pullRequest.repository), {}, {
            pullRequest
          })
        };
        store.writeQuery(_objectSpread(_objectSpread({}, this.getBranchQuery(branchName, owner, name)), {}, {
          data: branchData
        }));
        store.writeQuery(_objectSpread(_objectSpread({}, this.getPullRequestAndBranchQuery(branchName, pullRequest.number)), {}, {
          data: pullRequestData
        }));
      }
    });
    const {
      pullRequest
    } = data.createPullRequest;
    return transformPullRequest(pullRequest);
  }
  async getFileSha(path, {
    repoURL = this.repoURL,
    branch = this.branch
  } = {}) {
    const {
      owner,
      name
    } = this.getOwnerAndNameFromRepoUrl(repoURL);
    const {
      data
    } = await this.query({
      query: queries.fileSha,
      variables: {
        owner,
        name,
        expression: `${branch}:${path}`
      }
    });
    if (data.repository.file) {
      return data.repository.file.sha;
    }
    throw new _decapCmsLibUtil.APIError('Not Found', 404, _API.API_NAME);
  }
}
exports.default = GraphQLAPI;