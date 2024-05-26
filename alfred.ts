// Subtypes
type Connections = {
  [key: string]: Array<ConnectionNode>;
  icon: Array<IconNode>;
};

// connections.<UID>
type ConnectionNode = {
  // connections.<UID>.<INDEX>.destinationuid
  destinationuid: string;
  // connections.<UID>.<INDEX>.disabled
  disabled: boolean;
  // connections.<UID>.<INDEX>.modifiers
  modifiers: number;
  // connections.<UID>.<INDEX>.modifiersubtext
  modifiersubtext: string;
  // connections.<UID>.<INDEX>.sourceoutputuid
  sourceoutputuid: string;
  // connections.<UID>.<INDEX>.vitoclose
  vitoclose: boolean;
};

// connections.icon.<INDEX>
type IconNode = {
  // connections.icon.<INDEX>.destinationuid
  destinationuid: string;
  // connections.icon.<INDEX>.modifiers
  modifiers: number;
  // connections.icon.<INDEX>.modifiersubtext
  modifiersubtext: string;
  // connections.icon.<INDEX>.vitoclose
  vitoclose: boolean;
};

type ObjectConfigItem = {
  title: string;
  imagefile: string;
  arg: string;
  subtitle: string;
}

// objects.<INDEX>.config
type ObjectConfig = {
  // objects.<INDEX>.config.acceptsfiles
  acceptsfiles: boolean;
  // objects.<INDEX>.config.acceptsmulti
  acceptsmulti: 0 | 1;
  // objects.<INDEX>.config.acceptstext
  acceptstext: boolean;
  // objects.<INDEX>.config.acceptsurls
  acceptsurls: boolean;
  // objects.<INDEX>.config.action
  action: 0 | 1;
  // objects.<INDEX>.config.addfilestobuffer
  addfilestobuffer: boolean;
  // objects.<INDEX>.config.adduuid
  adduuid: boolean;
  // objects.<INDEX>.config.alfredfiltersresults
  alfredfiltersresults: boolean;
  // objects.<INDEX>.config.alfredfiltersresultsmatchmode
  alfredfiltersresultsmatchmode: 0 | 1 | 2;
  // objects.<INDEX>.config.alignment
  alignment: 0;
  // objects.<INDEX>.config.allowemptyfiles
  allowemptyfiles: boolean;
  // objects.<INDEX>.config.anchorfields
  anchorfields: boolean;
  // objects.<INDEX>.config.applescript
  applescript: unknown;
  // objects.<INDEX>.config.argument
  // 3 | '{var:plist_path}' | 1 | '{query}' | 0 | 'timer {query}' | 'Apple TV' | 'Replace this text with your rich snippet’s name' | '{variables}' | '' | '{var:trimmedQuery}' | '{var:theInput}' | 'x-apple.systempreferences:com.apple.wifi-settings-extension' | '{var:timer_id}' | ''{query}', {variables}' | '{var:query}' | '{clipboard:1}⑅{clipboard:0}' | '{var:theText}' | '9{query}'
  argument: string;

  // objects.<INDEX>.config.argumenttext
  argumenttext: string;
  // objects.<INDEX>.config.argumenttreatemptyqueryasnil
  argumenttreatemptyqueryasnil: boolean;
  // objects.<INDEX>.config.argumenttrimmode
  argumenttrimmode: 0 | 1;
  // objects.<INDEX>.config.argumenttype
  argumenttype: 0 | 1 | 2 | 3;
  // objects.<INDEX>.config.autopaste
  autopaste: boolean;
  // objects.<INDEX>.config.availableviaurlhandler
  availableviaurlhandler: boolean;
  // objects.<INDEX>.config.backgroundcolor
  backgroundcolor: string;
  // objects.<INDEX>.config.behaviour
  behaviour: unknown;
  // objects.<INDEX>.config.browser
  // '' | 'org.mozilla.firefox' bundle indentifier
  browser: string;
  // objects.<INDEX>.config.button1
  button1: string;
  // objects.<INDEX>.config.button2
  button2: string;
  // objects.<INDEX>.config.button3
  button3: string;
  // objects.<INDEX>.config.cachescript
  cachescript: boolean;
  // objects.<INDEX>.config.clearbuffer
  clearbuffer: boolean;
  // objects.<INDEX>.config.cleardebuggertext
  cleardebuggertext: boolean;
  // objects.<INDEX>.config.clipboardtext
  // '{var:url}' | '{query}' | '' | '{var:myTextOutput}
  clipboardtext: string;
  // objects.<INDEX>.config.columncount
  columncount: number;
  // objects.<INDEX>.config.command
  command: string;
  // objects.<INDEX>.config.concurrently
  concurrently: boolean;
  // objects.<INDEX>.config.conditions.<INDEX>
  conditions: Array<Condition>;
  // objects.<INDEX>.config.confirm
  confirm: string;
  // objects.<INDEX>.config.count
  count: number;
  // objects.<INDEX>.config.createintermediatefolders
  createintermediatefolders: boolean;
  // objects.<INDEX>.config.daterange
  daterange: string;
  // objects.<INDEX>.config.delimiter
  delimiter: string;
  // objects.<INDEX>.config.description
  description: string;
  // objects.<INDEX>.config.discardemptyarguments
  discardemptyarguments: boolean;
  // objects.<INDEX>.config.displaymode
  displaymode: string;
  // objects.<INDEX>.config.elselabel
  elselabel: string;
  // objects.<INDEX>.config.escaping
  escaping: 68 | 102 | 0 | 127 | 63 | 126 | 36;
  // objects.<INDEX>.config.expression
  expression: string;
  // objects.<INDEX>.config.externaltriggerid
  externaltriggerid: 'new_from_action' | 'notify' | 'file_list' | 'copy_url';
  // objects.<INDEX>.config.fadespeed
  fadespeed: number;
  // objects.<INDEX>.config.fields.<INDEX>
  fields: Array<Field>;
  // objects.<INDEX>.config.filename
  filename: string;
  // objects.<INDEX>.config.filetext
  filetext: string;
  // objects.<INDEX>.config.filetypes.<INDEX>
  filetypes: Array<string>;
  // objects.<INDEX>.config.fileutivariablename
  fileutivariablename: string;
  // objects.<INDEX>.config.fillmode
  fillmode: 0;
  // objects.<INDEX>.config.filterable
  filterable: boolean;
  // objects.<INDEX>.config.fixedorder
  fixedorder: boolean;
  // objects.<INDEX>.config.focusedappvariable
  focusedappvariable: boolean;
  // objects.<INDEX>.config.focusedappvariablename
  focusedappvariablename: string;
  // objects.<INDEX>.config.font
  font: string;
  // objects.<INDEX>.config.fontmode
  fontmode: unknown;
  // objects.<INDEX>.config.fontsizing
  fontsizing: unknown;
  // objects.<INDEX>.config.footertext
  footertext: string;
  // objects.<INDEX>.config.hideelse
  hideelse: boolean;
  // objects.<INDEX>.config.hotkey
  hotkey: 0 | 35 | 1 | 29;
  // objects.<INDEX>.config.hotmod
  hotmod: 0 | 524288 | 1835008 | 786432;
  // objects.<INDEX>.config.hotstring
  hotstring: '' | 'P' | 'S' | '0';
  // objects.<INDEX>.config.ignoredynamicplaceholders
  ignoredynamicplaceholders: boolean;
  // objects.<INDEX>.config.imageaspect
  imageaspect: unknown;
  // objects.<INDEX>.config.imageresizemode
  imageresizemode: unknown;
  // objects.<INDEX>.config.includesystem
  includesystem: boolean;
  // objects.<INDEX>.config.inputfile
  inputfile: unknown;
  // objects.<INDEX>.config.inputmode
  inputmode: 0 | 1;
  // objects.<INDEX>.config.inputstring
  inputstring: string;
  // objects.<INDEX>.config.inputtype
  inputtype: string;
  // objects.<INDEX>.config.items
  items: Array<ObjectConfigItem>;
  // objects.<INDEX>.config.json
  json: unknown;
  // objects.<INDEX>.config.jumpto
  jumpto: string;
  // objects.<INDEX>.config.keychar
  keychar: string;
  // objects.<INDEX>.config.keycode
  keycode: unknown;
  // objects.<INDEX>.config.keymod
  keymod: string;
  // objects.<INDEX>.config.keyword
  keyword: string;
  // objects.<INDEX>.config.language
  language: string;
  // objects.<INDEX>.config.largetypetext
  largetypetext: string;
  // objects.<INDEX>.config.lastpathcomponent
  lastpathcomponent: boolean;
  // objects.<INDEX>.config.leftcursor
  leftcursor: boolean;
  // objects.<INDEX>.config.limit
  limit: number;
  // objects.<INDEX>.config.loadingtext
  loadingtext: string;
  // objects.<INDEX>.config.matchcasesensitive
  matchcasesensitive: boolean;
  // objects.<INDEX>.config.matchmode
  matchmode: 0 | 1;
  // objects.<INDEX>.config.matchstring
  // regex
  matchstring: string;
  // objects.<INDEX>.config.modsmode
  modsmode: 0;
  // objects.<INDEX>.config.name
  name: string;
  // objects.<INDEX>.config.onlyshowifquerypopulated
  onlyshowifquerypopulated: boolean;
  // objects.<INDEX>.config.openwith
  openwith: string;
  // objects.<INDEX>.config.outputas
  outputas: 0;
  // objects.<INDEX>.config.outputfileuti
  outputfileuti: string;
  // objects.<INDEX>.config.outputmode
  outputmode: 0 | 1;
  // objects.<INDEX>.config.outputtype
  outputtype: unknown;
  // objects.<INDEX>.config.overridewithargument
  overridewithargument: unknown;
  // objects.<INDEX>.config.passinputasargument
  passinputasargument: boolean;
  // objects.<INDEX>.config.passthroughargument
  passthroughargument: boolean;
  // objects.<INDEX>.config.passvariables
  passvariables: boolean;
  // objects.<INDEX>.config.path
  path: string;
  // objects.<INDEX>.config.paths.<INDEX>
  paths: Array<string>;
  // objects.<INDEX>.config.processoutputs
  processoutputs: boolean;
  // objects.<INDEX>.config.queuedelaycustom
  queuedelaycustom: 1 | 3;
  // objects.<INDEX>.config.queuedelayimmediatelyinitially
  queuedelayimmediatelyinitially: boolean;
  // objects.<INDEX>.config.queuedelaymode
  queuedelaymode: 0 | 1;
  // objects.<INDEX>.config.queuemode
  queuemode: 1 | 2;
  // objects.<INDEX>.config.regexcaseinsensitive
  regexcaseinsensitive: boolean;
  // objects.<INDEX>.config.regexmultiline
  regexmultiline: boolean;
  // objects.<INDEX>.config.relatedApps.<INDEX>
  relatedApps: Array<string>;
  // objects.<INDEX>.config.relatedAppsMode
  relatedAppsMode: 0 | 1;
  // objects.<INDEX>.config.relativepathmode
  relativepathmode: -1;
  // objects.<INDEX>.config.removeextension
  removeextension: boolean;
  // objects.<INDEX>.config.replacestring
  replacestring: string;
  // objects.<INDEX>.config.runningsubtext
  runningsubtext: string;
  // objects.<INDEX>.config.scopes.<INDEX>
  scopes: Array<string>;
  // objects.<INDEX>.config.script
  script: string;
  // objects.<INDEX>.config.scriptargtype
  scriptargtype: 0 | 1;
  // objects.<INDEX>.config.scriptfile
  scriptfile: string;
  // objects.<INDEX>.config.scriptinput
  scriptinput: string;
  // objects.<INDEX>.config.searcher
  searcher: number;
  // objects.<INDEX>.config.seconds
  // '1.5' | '{query}'
  seconds: string;
  // objects.<INDEX>.config.shortcut
  shortcut: string;
  // objects.<INDEX>.config.showallwords
  showallwords: boolean;
  // objects.<INDEX>.config.showsubtitles
  showsubtitles: boolean;
  // objects.<INDEX>.config.showtitles
  showtitles: boolean;
  // objects.<INDEX>.config.skipqueryencode
  skipqueryencode: boolean;
  // objects.<INDEX>.config.skipuniversalaction
  skipuniversalaction: boolean;
  // objects.<INDEX>.config.skipvarencode
  skipvarencode: boolean;
  // objects.<INDEX>.config.sortBy
  sortBy: 0;
  // objects.<INDEX>.config.sortDirection
  sortDirection: 0;
  // objects.<INDEX>.config.sortFoldersAtTop
  sortFoldersAtTop: boolean;
  // objects.<INDEX>.config.sortOverride
  sortOverride: boolean;
  // objects.<INDEX>.config.sortmode
  sortmode: 0;
  // objects.<INDEX>.config.soundname
  soundname: string;
  // objects.<INDEX>.config.sourcefile
  sourcefile: string;
  // objects.<INDEX>.config.spaces
  spaces: boolean;
  // objects.<INDEX>.config.spellchecking
  spellchecking: unknown;
  // objects.<INDEX>.config.stackBrowserView
  stackBrowserView: boolean;
  // objects.<INDEX>.config.stackview
  stackview: boolean;
  // objects.<INDEX>.config.subtext
  subtext: string;
  // objects.<INDEX>.config.subtitlesinfooter
  subtitlesinfooter: unknown;
  // objects.<INDEX>.config.systemsound
  systemsound: boolean;
  // objects.<INDEX>.config.tasksettings
  tasksettings: TaskSettings;
  // objects.<INDEX>.config.taskuid
  taskuid: string;
  // objects.<INDEX>.config.text
  text: string;
  // objects.<INDEX>.config.textcolor
  textcolor: string;
  // objects.<INDEX>.config.title
  title: string;
  // objects.<INDEX>.config.titlesinfooter
  titlesinfooter: unknown;
  // objects.<INDEX>.config.toggle
  toggle: unknown;
  // objects.<INDEX>.config.transient
  transient: boolean;
  // objects.<INDEX>.config.triggerid
  triggerid: string;
  // objects.<INDEX>.config.triggername
  triggername: string;
  // objects.<INDEX>.config.trimarguments
  trimarguments: boolean;
  // objects.<INDEX>.config.type
  type: 0 | 5 | 2 | 8 | 7 | 6 | 11 | 1 | 3;
  // objects.<INDEX>.config.types.<INDEX>
  types: Array<number>;
  // objects.<INDEX>.config.unstackview
  unstackview: unknown;
  // objects.<INDEX>.config.url
  url: string;
  // objects.<INDEX>.config.usevoiceover
  usevoiceover: boolean;
  // objects.<INDEX>.config.utf8
  utf8: unknown;
  // objects.<INDEX>.config.variableprefix
  variableprefix: string;
  // objects.<INDEX>.config.variables.<VARIABLE>
  variables: { [variableKey: string]: any };
  // objects.<INDEX>.config.withspace
  withspace: boolean;
  // objects.<INDEX>.config.words
  words: string;
  // objects.<INDEX>.config.wordseparatortype
  wordseparatortype: 1;
  // objects.<INDEX>.config.workflowbundleid
  workflowbundleid: string;
  // objects.<INDEX>.config.workflowonly
  workflowonly: boolean;
  // objects.<INDEX>.config.wrapat
  wrapat: number;
};

type TaskSettings = {
  // objects.<INDEX>.config.tasksettings.allow_empty
  allow_empty: boolean;
  // objects.<INDEX>.config.tasksettings.app_list
  app_list: Array<string>;
  // objects.<INDEX>.config.tasksettings.arguments_number
  arguments_number: number;
  // objects.<INDEX>.config.tasksettings.height
  height: number;
  // objects.<INDEX>.config.tasksettings.javascript_code
  javascript_code: string;
  // objects.<INDEX>.config.tasksettings.match_string
  match_string: string;
  // objects.<INDEX>.config.tasksettings.max_size
  max_size: number;
  // objects.<INDEX>.config.tasksettings.menubar_items
  menubar_items: Array<string>;
  // objects.<INDEX>.config.tasksettings.metric
  metric: string;
  // objects.<INDEX>.config.tasksettings.new_tags
  new_tags: Array<string>;
  // objects.<INDEX>.config.tasksettings.no_extension
  no_extension: boolean;
  // objects.<INDEX>.config.tasksettings.out_format
  out_format: string;
  // objects.<INDEX>.config.tasksettings.overwrite
  overwrite: boolean;
  // objects.<INDEX>.config.tasksettings.percentage
  percentage: number;
  // objects.<INDEX>.config.tasksettings.period
  period: string;
  // objects.<INDEX>.config.tasksettings.preset
  preset: string;
  // objects.<INDEX>.config.tasksettings.recursive
  recursive: boolean;
  // objects.<INDEX>.config.tasksettings.regex
  regex: string;
  // objects.<INDEX>.config.tasksettings.save_in
  save_in: string;
  // objects.<INDEX>.config.tasksettings.sort_order
  sort_order: string;
  // objects.<INDEX>.config.tasksettings.target_app
  target_app: string;
  // objects.<INDEX>.config.tasksettings.target_mode
  target_mode: string;
  // objects.<INDEX>.config.tasksettings.target_path
  target_path: string;
  // objects.<INDEX>.config.tasksettings.target_screen
  target_screen: string;
  // objects.<INDEX>.config.tasksettings.target_shortcut
  target_shortcut: string;
  // objects.<INDEX>.config.tasksettings.trailing
  trailing: boolean;
  // objects.<INDEX>.config.tasksettings.unit
  unit: string;
  // objects.<INDEX>.config.tasksettings.use_finder
  use_finder: boolean;
  // objects.<INDEX>.config.tasksettings.width
  width: number;
  // objects.<INDEX>.config.tasksettings.x
  x: number;
  // objects.<INDEX>.config.tasksettings.y
  y: number;
};

// objects.<INDEX>.config.conditions.<INDEX>
type Condition = {
  // objects.<INDEX>.config.conditions.<INDEX>.inputstring
  inputstring: string;
  // objects.<INDEX>.config.conditions.<INDEX>.matchcasesensitive
  matchcasesensitive: boolean;
  // objects.<INDEX>.config.conditions.<INDEX>.matchmode
  matchmode: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  // objects.<INDEX>.config.conditions.<INDEX>.matchstring
  matchstring: string;
  // objects.<INDEX>.config.conditions.<INDEX>.outputlabel
  outputlabel: string;
  // objects.<INDEX>.config.conditions.<INDEX>.uid
  uid: string;
};

// objects.<INDEX>.config.fields.<INDEX>
type Field = {
  // objects.<INDEX>.config.fields.<INDEX ```typescript
  field: string;
  // objects.<INDEX>.config.fields.<INDEX>.not
  not: boolean;
  // objects.<INDEX>.config.fields.<INDEX>.split
  split: boolean;
  // objects.<INDEX>.config.fields.<INDEX>.value
  value: string;
  // objects.<INDEX>.config.fields.<INDEX>.words
  words: boolean;
};

// objects.<INDEX>.inboundconfig
type InboundConfig = {
  // objects.<INDEX>.inboundconfig.custominputarg
  custominputarg: string;
  // objects.<INDEX>.inboundconfig.externalid
  externalid: string;
  // objects.<INDEX>.inboundconfig.inputmode
  inputmode: string;
  // objects.<INDEX>.inboundconfig.usecustominputarg
  usecustominputarg: boolean;
};

// Main Type
export type AlfredWorkflow = {
  // version
  version: string;
  // webaddress
  webaddress: string;
  // bundleid
  bundleid: string;
  // category
  category: 'myWorkflows' | 'Tools' | 'Productivity' | 'Internet' | 'Docs' | '⭐️' | 'Universal Action' | 'Self-Dev' | 'Dev' | 'Utilities' | 'ThoughtAsylum' | 'zbrl' | 'Search' | 'Mine' | 'Development';
  // connections
  connections: Connections;
  // createdby
  createdby: string;
  // description
  description: string;
  // disabled
  disabled: boolean;
  // name
  name: string;
  // objects
  objects: Array<{
    // objects.<INDEX>.config
    config: ObjectConfig;
    // objects.<INDEX>.inboundconfig
    inboundconfig: InboundConfig;
    // objects.<INDEX>.type
    type: string;
    // objects.<INDEX>.uid
    uid: string;
    // objects.<INDEX>.version
    version: string;
  }>;
  // readme
  readme: string;
  // uidata
  uidata: {
    [key: string]: {
      // uidata.<UID>.colorindex
      colorindex: number;
      // uidata.<UID>.note
      note: string;
      // uidata.<UID>.xpos
      xpos: number;
      // uidata.<UID>.ypos
      ypos: number;
      // uidata.icon
      icon?: {
        // uidata.icon.xpos
        xpos: number;
        // uidata.icon.ypos
        ypos: number;
      };
    };
  };
  // userconfigurationconfig
  userconfigurationconfig: Array<{
    // userconfigurationconfig.<INDEX>.config
    config: {
      // userconfigurationconfig.<INDEX>.config.default
      default: any;
      // userconfigurationconfig.<INDEX>.config.defaultvalue
      defaultvalue: any;
      // userconfigurationconfig.<INDEX>.config.filtermode
      filtermode: string;
      // userconfigurationconfig.<INDEX>.config.markercount
      markercount: number;
      // userconfigurationconfig.<INDEX>.config.maxvalue
      maxvalue: number;
      // userconfigurationconfig.<INDEX>.config.minvalue
      minvalue: number;
      // userconfigurationconfig.<INDEX>.config.onlystoponmarkers
      onlystoponmarkers: boolean;
      // userconfigurationconfig.<INDEX>.config.pairs.<INDEX>
      pairs: Array<{ [key: string]: any }>;
      // userconfigurationconfig.<INDEX>.config.placeholder
      placeholder: string;
      // userconfigurationconfig.<INDEX>.config.required
      required: boolean;
      // userconfigurationconfig.<INDEX>.config.showmarkers
      showmarkers: boolean;
      // userconfigurationconfig.<INDEX>.config.text
      text: string;
      // userconfigurationconfig.<INDEX>.config.trim
      trim: boolean;
      // userconfigurationconfig.<INDEX>.config.verticalsize
      verticalsize: number;
    };
    // userconfigurationconfig.<INDEX>.description
    description: string;
    // userconfigurationconfig.<INDEX>.label
    label: string;
    // userconfigurationconfig.<INDEX>.type
    type: string;
    // userconfigurationconfig.<INDEX>.variable
    variable: string;
  }>;
  // variables
  variables: { [variableKey: string]: any };
  // variablesdontexport.<INDEX>
  variablesdontexport: Array<any>;
};
