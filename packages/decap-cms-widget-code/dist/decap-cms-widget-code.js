/*! For license information please see decap-cms-widget-code.js.LICENSE.txt */
                ${M()};
                ${I()};
                ${"\n  padding: 0;\n"};
              `)},!o&&(0,h.jsx)(on,{onClick:this.showSettings}),o&&(0,h.jsx)(pn,{hideSettings:this.hideSettings,forID:t,modes:xn,mode:bn(u||yn),theme:kn.find((e=>e===l)),themes:kn,keyMap:{value:a,label:a},keyMaps:this.getKeyMapOptions(),allowLanguageSelection:this.allowLanguageSelection,onChangeLang:e=>this.setState({lang:e}),onChangeTheme:e=>this.setState({theme:e}),onChangeKeyMap:e=>this.setState({keyMap:e})}),(0,h.jsx)(S.wN,{key:s,id:t,className:i`
                height: 100%;
                border-radius: 0 3px 3px;
                overflow: hidden;

                .CodeMirror {
                  height: auto !important;
                  cursor: text;
                  min-height: 300px;
                }

                .CodeMirror-scroll {
                  min-height: 300px;
                }
              `,options:hn(hn({lineNumbers:!0},n.codeMirrorConfig),{},{extraKeys:hn({"Shift-Tab":"indentLess",Tab:"indentMore"},n.codeMirrorConfig.extraKeys||{}),theme:l,mode:d,keyMap:a,viewportMargin:1/0}),detach:!0,editorDidMount:e=>{this.cm=e,r&&this.handleFocus()},value:c,onChange:(e,t,n)=>this.handleChange(n),onFocus:this.handleFocus,onBlur:this.handleBlur}))))}}gn(wn,"propTypes",{field:m().map.isRequired,onChange:f().func.isRequired,value:f().node,forID:f().string.isRequired,classNameWrapper:f().string.isRequired,widget:f().object.isRequired,isParentListCollapsed:f().bool});var Sn=a(8138),Cn=a.n(Sn);function An(e){return(0,h.jsx)(nn.WidgetPreviewContainer,null,(0,h.jsx)("pre",null,(0,h.jsx)("code",null,(t=e.value,n=e.field,Cn()(t)?t:g.Map.isMap(t)?t.get(n.getIn(["keys","code"],"code"),""):""))));var t,n}An.propTypes={value:f().node};const En=An,Mn={properties:{default_language:{type:"string"},allow_language_selection:{type:"boolean"},output_code_only:{type:"boolean"},keys:{type:"object",properties:{code:{type:"string"},lang:{type:"string"}}}}};function Tn(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}const In={Widget:function(e={}){return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Tn(Object(n),!0).forEach((function(t){var r,i,o;r=e,i=t,o=n[t],i=function(e){var t=function(e){if("object"!=typeof e||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var n=t.call(e,"string");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==typeof t?t:String(t)}(i),i in r?Object.defineProperty(r,i,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[i]=o})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Tn(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({name:"code",controlComponent:wn,previewComponent:En,schema:Mn,allowMapValue:!0,codeMirrorConfig:{}},e)},controlComponent:wn,previewComponent:An}})(),s.DecapCmsWidgetCode})()));
//# sourceMappingURL=decap-cms-widget-code.js.map