(()=>{"use strict";var e={257:(e,n)=>{n.Ll=function(e){const n=null==e?void 0:e.kind;return"string"==typeof n&&o.has(n)};class t{constructor(e,n,t){this.start=e.start,this.end=n.end,this.startToken=e,this.endToken=n,this.source=t}get[Symbol.toStringTag](){return"Location"}toJSON(){return{start:this.start,end:this.end}}}class i{constructor(e,n,t,i,r,o){this.kind=e,this.start=n,this.end=t,this.line=i,this.column=r,this.value=o,this.prev=null,this.next=null}get[Symbol.toStringTag](){return"Token"}toJSON(){return{kind:this.kind,value:this.value,line:this.line,column:this.column}}}const r={Name:[],Document:["definitions"],OperationDefinition:["name","variableDefinitions","directives","selectionSet"],VariableDefinition:["variable","type","defaultValue","directives"],Variable:["name"],SelectionSet:["selections"],Field:["alias","name","arguments","directives","selectionSet"],Argument:["name","value"],FragmentSpread:["name","directives"],InlineFragment:["typeCondition","directives","selectionSet"],FragmentDefinition:["name","variableDefinitions","typeCondition","directives","selectionSet"],IntValue:[],FloatValue:[],StringValue:[],BooleanValue:[],NullValue:[],EnumValue:[],ListValue:["values"],ObjectValue:["fields"],ObjectField:["name","value"],Directive:["name","arguments"],NamedType:["name"],ListType:["type"],NonNullType:["type"],SchemaDefinition:["description","directives","operationTypes"],OperationTypeDefinition:["type"],ScalarTypeDefinition:["description","name","directives"],ObjectTypeDefinition:["description","name","interfaces","directives","fields"],FieldDefinition:["description","name","arguments","type","directives"],InputValueDefinition:["description","name","type","defaultValue","directives"],InterfaceTypeDefinition:["description","name","interfaces","directives","fields"],UnionTypeDefinition:["description","name","directives","types"],EnumTypeDefinition:["description","name","directives","values"],EnumValueDefinition:["description","name","directives"],InputObjectTypeDefinition:["description","name","directives","fields"],DirectiveDefinition:["description","name","arguments","locations"],SchemaExtension:["directives","operationTypes"],ScalarTypeExtension:["name","directives"],ObjectTypeExtension:["name","interfaces","directives","fields"],InterfaceTypeExtension:["name","interfaces","directives","fields"],UnionTypeExtension:["name","directives","types"],EnumTypeExtension:["name","directives","values"],InputObjectTypeExtension:["name","directives","fields"]};const o=new Set(Object.keys(r));var s;!function(e){e.QUERY="query",e.MUTATION="mutation",e.SUBSCRIPTION="subscription"}(s||(s={}))}},n={};const t=require("express"),i=(require("colors"),require("graphql-yoga")),r=require("@graphql-tools/load-files"),o=require("graphql");let s={};function a(){s={}}function c(e){const n=e.name?.value;if(null!=n)switch(u(e,n),e.kind){case"EnumTypeDefinition":if(e.values)for(const t of e.values)u(t,n,t.name.value);break;case"ObjectTypeDefinition":case"InputObjectTypeDefinition":case"InterfaceTypeDefinition":if(e.fields)for(const t of e.fields)if(u(t,n,t.name.value),T(t)&&t.arguments)for(const e of t.arguments)u(e,n,t.name.value,e.name.value)}}function u(e,n,t,i){const r=N(e);if("string"!=typeof r||0===r.length)return;const o=[n];t&&(o.push(t),i&&o.push(i));const a=o.join(".");s[a]||(s[a]=[]),s[a].push(r)}function l(e){return"\n# "+e.replace(/\n/g,"\n# ")}function d(e,n){return e?e.filter((e=>e)).join(n||""):""}function f(e){return e?.some((e=>e.includes("\n")))??!1}function p(e){return e&&`  ${e.replace(/\n/g,"\n  ")}`}function v(e){return e&&0!==e.length?`{\n${p(d(e,"\n"))}\n}`:""}function m(e,n,t){return n?e+n+(t||""):""}const y={Name:{leave:e=>e.value},Variable:{leave:e=>"$"+e.name},Document:{leave:e=>d(e.definitions,"\n\n")},OperationDefinition:{leave:e=>{const n=m("(",d(e.variableDefinitions,", "),")");return d([e.operation,d([e.name,n]),d(e.directives," ")]," ")+" "+e.selectionSet}},VariableDefinition:{leave:({variable:e,type:n,defaultValue:t,directives:i})=>e+": "+n+m(" = ",t)+m(" ",d(i," "))},SelectionSet:{leave:({selections:e})=>v(e)},Field:{leave({alias:e,name:n,arguments:t,directives:i,selectionSet:r}){const o=m("",e,": ")+n;let s=o+m("(",d(t,", "),")");return s.length>80&&(s=o+m("(\n",p(d(t,"\n")),"\n)")),d([s,d(i," "),r]," ")}},Argument:{leave:({name:e,value:n})=>e+": "+n},FragmentSpread:{leave:({name:e,directives:n})=>"..."+e+m(" ",d(n," "))},InlineFragment:{leave:({typeCondition:e,directives:n,selectionSet:t})=>d(["...",m("on ",e),d(n," "),t]," ")},FragmentDefinition:{leave:({name:e,typeCondition:n,variableDefinitions:t,directives:i,selectionSet:r})=>`fragment ${e}${m("(",d(t,", "),")")} on ${n} ${m("",d(i," ")," ")}`+r},IntValue:{leave:({value:e})=>e},FloatValue:{leave:({value:e})=>e},StringValue:{leave:({value:e,block:n})=>n?function(e,n=!1){const t=e.replace(/"""/g,'\\"""');return" "!==e[0]&&"\t"!==e[0]||-1!==e.indexOf("\n")?`"""\n${n?t:p(t)}\n"""`:`"""${t.replace(/"$/,'"\n')}"""`}(e):JSON.stringify(e)},BooleanValue:{leave:({value:e})=>e?"true":"false"},NullValue:{leave:()=>"null"},EnumValue:{leave:({value:e})=>e},ListValue:{leave:({values:e})=>"["+d(e,", ")+"]"},ObjectValue:{leave:({fields:e})=>"{"+d(e,", ")+"}"},ObjectField:{leave:({name:e,value:n})=>e+": "+n},Directive:{leave:({name:e,arguments:n})=>"@"+e+m("(",d(n,", "),")")},NamedType:{leave:({name:e})=>e},ListType:{leave:({type:e})=>"["+e+"]"},NonNullType:{leave:({type:e})=>e+"!"},SchemaDefinition:{leave:({directives:e,operationTypes:n})=>d(["schema",d(e," "),v(n)]," ")},OperationTypeDefinition:{leave:({operation:e,type:n})=>e+": "+n},ScalarTypeDefinition:{leave:({name:e,directives:n})=>d(["scalar",e,d(n," ")]," ")},ObjectTypeDefinition:{leave:({name:e,interfaces:n,directives:t,fields:i})=>d(["type",e,m("implements ",d(n," & ")),d(t," "),v(i)]," ")},FieldDefinition:{leave:({name:e,arguments:n,type:t,directives:i})=>e+(f(n)?m("(\n",p(d(n,"\n")),"\n)"):m("(",d(n,", "),")"))+": "+t+m(" ",d(i," "))},InputValueDefinition:{leave:({name:e,type:n,defaultValue:t,directives:i})=>d([e+": "+n,m("= ",t),d(i," ")]," ")},InterfaceTypeDefinition:{leave:({name:e,interfaces:n,directives:t,fields:i})=>d(["interface",e,m("implements ",d(n," & ")),d(t," "),v(i)]," ")},UnionTypeDefinition:{leave:({name:e,directives:n,types:t})=>d(["union",e,d(n," "),m("= ",d(t," | "))]," ")},EnumTypeDefinition:{leave:({name:e,directives:n,values:t})=>d(["enum",e,d(n," "),v(t)]," ")},EnumValueDefinition:{leave:({name:e,directives:n})=>d([e,d(n," ")]," ")},InputObjectTypeDefinition:{leave:({name:e,directives:n,fields:t})=>d(["input",e,d(n," "),v(t)]," ")},DirectiveDefinition:{leave:({name:e,arguments:n,repeatable:t,locations:i})=>"directive @"+e+(f(n)?m("(\n",p(d(n,"\n")),"\n)"):m("(",d(n,", "),")"))+(t?" repeatable":"")+" on "+d(i," | ")},SchemaExtension:{leave:({directives:e,operationTypes:n})=>d(["extend schema",d(e," "),v(n)]," ")},ScalarTypeExtension:{leave:({name:e,directives:n})=>d(["extend scalar",e,d(n," ")]," ")},ObjectTypeExtension:{leave:({name:e,interfaces:n,directives:t,fields:i})=>d(["extend type",e,m("implements ",d(n," & ")),d(t," "),v(i)]," ")},InterfaceTypeExtension:{leave:({name:e,interfaces:n,directives:t,fields:i})=>d(["extend interface",e,m("implements ",d(n," & ")),d(t," "),v(i)]," ")},UnionTypeExtension:{leave:({name:e,directives:n,types:t})=>d(["extend union",e,d(n," "),m("= ",d(t," | "))]," ")},EnumTypeExtension:{leave:({name:e,directives:n,values:t})=>d(["extend enum",e,d(n," "),v(t)]," ")},InputObjectTypeExtension:{leave:({name:e,directives:n,fields:t})=>d(["extend input",e,d(n," "),v(t)]," ")}},E=Object.keys(y).reduce(((e,n)=>{return{...e,[n]:{leave:(t=y[n].leave,(e,n,i,r,o)=>{const a=[],c=r.reduce(((e,n)=>(["fields","arguments","values"].includes(n)&&e.name&&a.push(e.name.value),e[n])),o[0]),u=[...a,c?.name?.value].filter(Boolean).join("."),f=[];return e.kind.includes("Definition")&&s[u]&&f.push(...s[u]),d([...f.map(l),e.description,t(e,n,i,r,o)],"\n")})}};var t}),{});function T(e){return"FieldDefinition"===e.kind}function N(e){const n=function(e){const n=e.loc;if(!n)return;const t=[];let i=n.startToken.prev;for(;null!=i&&i.kind===o.TokenKind.COMMENT&&null!=i.next&&null!=i.prev&&i.line+1===i.next.line&&i.line!==i.prev.line;){const e=String(i.value);t.push(e),i=i.prev}return t.length>0?t.reverse().join("\n"):void 0}(e);if(void 0!==n)return function(e){const n=e.split(/\r\n|[\n\r]/g),t=function(e){let n=null;for(let t=1;t<e.length;t++){const i=e[t],r=I(i);if(r!==i.length&&((null===n||r<n)&&(n=r,0===n)))break}return null===n?0:n}(n);if(0!==t)for(let e=1;e<n.length;e++)n[e]=n[e].slice(t);for(;n.length>0&&g(n[0]);)n.shift();for(;n.length>0&&g(n[n.length-1]);)n.pop();return n.join("\n")}(`\n${n}`)}function I(e){let n=0;for(;n<e.length&&(" "===e[n]||"\t"===e[n]);)n++;return n}function g(e){return I(e)===e.length}const O=3;function h(e){return b(e,[])}function b(e,n){switch(typeof e){case"string":return JSON.stringify(e);case"function":return e.name?`[function ${e.name}]`:"[function]";case"object":return function(e,n){if(null===e)return"null";if(e instanceof Error)return"AggregateError"===e.name?D(e)+"\n"+S(e.errors,n):D(e);if(n.includes(e))return"[Circular]";const t=[...n,e];if(function(e){return"function"==typeof e.toJSON}(e)){const n=e.toJSON();if(n!==e)return"string"==typeof n?n:b(n,t)}else if(Array.isArray(e))return S(e,t);return function(e,n){const t=Object.entries(e);if(0===t.length)return"{}";if(n.length>O)return"["+function(e){const n=Object.prototype.toString.call(e).replace(/^\[object /,"").replace(/]$/,"");if("Object"===n&&"function"==typeof e.constructor){const n=e.constructor.name;if("string"==typeof n&&""!==n)return n}return n}(e)+"]";const i=t.map((([e,t])=>e+": "+b(t,n)));return"{ "+i.join(", ")+" }"}(e,t)}(e,n);default:return String(e)}}function D(e){return(e.name="GraphQLError")?e.toString():`${e.name}: ${e.message};\n ${e.stack}`}function S(e,n){if(0===e.length)return"[]";if(n.length>O)return"[Array]";const t=e.length,i=[];for(let r=0;r<t;++r)i.push(b(e[r],n));return"["+i.join(", ")+"]"}function k(e){if((0,o.isNonNullType)(e)){const n=k(e.ofType);if(n.kind===o.Kind.NON_NULL_TYPE)throw new Error(`Invalid type node ${h(e)}. Inner type of non-null type cannot be a non-null type.`);return{kind:o.Kind.NON_NULL_TYPE,type:n}}return(0,o.isListType)(e)?{kind:o.Kind.LIST_TYPE,type:k(e.ofType)}:{kind:o.Kind.NAMED_TYPE,name:{kind:o.Kind.NAME,value:e.name}}}function _(e){if(null===e)return{kind:o.Kind.NULL};if(void 0===e)return null;if(Array.isArray(e)){const n=[];for(const t of e){const e=_(t);null!=e&&n.push(e)}return{kind:o.Kind.LIST,values:n}}if("object"==typeof e){if(e?.toJSON)return _(e.toJSON());const n=[];for(const t in e){const i=_(e[t]);i&&n.push({kind:o.Kind.OBJECT_FIELD,name:{kind:o.Kind.NAME,value:t},value:i})}return{kind:o.Kind.OBJECT,fields:n}}if("boolean"==typeof e)return{kind:o.Kind.BOOLEAN,value:e};if("bigint"==typeof e)return{kind:o.Kind.INT,value:String(e)};if("number"==typeof e&&isFinite(e)){const n=String(e);return A.test(n)?{kind:o.Kind.INT,value:n}:{kind:o.Kind.FLOAT,value:n}}if("string"==typeof e)return{kind:o.Kind.STRING,value:e};throw new TypeError(`Cannot convert value to AST: ${e}.`)}const A=/^-?(?:0|[1-9][0-9]*)$/;function K(e,n){if((0,o.isNonNullType)(n)){const t=K(e,n.ofType);return t?.kind===o.Kind.NULL?null:t}if(null===e)return{kind:o.Kind.NULL};if(void 0===e)return null;if((0,o.isListType)(n)){const t=n.ofType;if(function(e){return null!=e&&"object"==typeof e&&Symbol.iterator in e}(e)){const n=[];for(const i of e){const e=K(i,t);null!=e&&n.push(e)}return{kind:o.Kind.LIST,values:n}}return K(e,t)}if((0,o.isInputObjectType)(n)){if(!function(e){return"object"==typeof e&&null!==e}(e))return null;const t=[];for(const i of Object.values(n.getFields())){const n=K(e[i.name],i.type);n&&t.push({kind:o.Kind.OBJECT_FIELD,name:{kind:o.Kind.NAME,value:i.name},value:n})}return{kind:o.Kind.OBJECT,fields:t}}if((0,o.isLeafType)(n)){const t=n.serialize(e);return null==t?null:(0,o.isEnumType)(n)?{kind:o.Kind.ENUM,value:t}:"ID"===n.name&&"string"==typeof t&&j.test(t)?{kind:o.Kind.INT,value:t}:_(t)}console.assert(!1,"Unexpected input type: "+h(n))}const j=/^-?(?:0|[1-9][0-9]*)$/;function F(e){return e.astNode?.description?{...e.astNode.description,block:!0}:e.description?{kind:o.Kind.STRING,value:e.description,block:!0}:void 0}function P(e,n=["directives"]){return n.reduce(((e,n)=>null==e?e:e[n]),e?.extensions)}function x(e){let n;return"alias"in e&&(n=e.alias?.value),null==n&&"name"in e&&(n=e.name?.value),null==n&&(n=e.kind),n}function M(e,n,t){const i=x(e),r=x(n);return"function"==typeof t?t(i,r):function(e,n){return String(e)<String(n)?-1:String(e)>String(n)?1:0}(i,r)}function U(e){return null!=e}function L(e){const n=new WeakMap;return function(t){const i=n.get(t);if(void 0===i){const i=e(t);return n.set(t,i),i}return i}}L((function(e){const n=w(e);return new Set([...n].map((e=>e.name)))}));const w=L((function(e){const n=C(e);return new Set(n.values())})),C=L((function(e){const n=new Map,t=e.getQueryType();t&&n.set("query",t);const i=e.getMutationType();i&&n.set("mutation",i);const r=e.getSubscriptionType();return r&&n.set("subscription",r),n}));function V(e,n={}){const t=n.pathToDirectivesInExtensions,i=e.getTypeMap(),r=function(e,n){const t=new Map([["query",void 0],["mutation",void 0],["subscription",void 0]]),i=[];null!=e.astNode&&i.push(e.astNode);if(null!=e.extensionASTNodes)for(const n of e.extensionASTNodes)i.push(n);for(const e of i)if(e.operationTypes)for(const n of e.operationTypes)t.set(n.operation,n);const r=C(e);for(const[e,n]of t){const i=r.get(e);if(null!=i){const r=k(i);null!=n?n.type=r:t.set(e,{kind:o.Kind.OPERATION_TYPE_DEFINITION,operation:e,type:r})}}const s=[...t.values()].filter(U),a=R(e,e,n);if(!s.length&&!a.length)return null;const c={kind:null!=s?o.Kind.SCHEMA_DEFINITION:o.Kind.SCHEMA_EXTENSION,operationTypes:s,directives:a},u=F(e);u&&(c.description=u);return c}(e,t),s=null!=r?[r]:[],a=e.getDirectives();for(const n of a)(0,o.isSpecifiedDirective)(n)||s.push(Y(n,e,t));for(const n in i){const r=i[n],a=(0,o.isSpecifiedScalarType)(r),c=(0,o.isIntrospectionType)(r);if(!a&&!c)if((0,o.isObjectType)(r))s.push(q(r,e,t));else if((0,o.isInterfaceType)(r))s.push(J(r,e,t));else if((0,o.isUnionType)(r))s.push(H(r,e,t));else if((0,o.isInputObjectType)(r))s.push(Q(r,e,t));else if((0,o.isEnumType)(r))s.push(G(r,e,t));else{if(!(0,o.isScalarType)(r))throw new Error(`Unknown type ${r}.`);s.push(X(r,e,t))}}return{kind:o.Kind.DOCUMENT,definitions:s}}function Y(e,n,t){return{kind:o.Kind.DIRECTIVE_DEFINITION,description:F(e),name:{kind:o.Kind.NAME,value:e.name},arguments:e.args?.map((e=>B(e,n,t))),repeatable:e.isRepeatable,locations:e.locations?.map((e=>({kind:o.Kind.NAME,value:e})))||[]}}function R(e,n,t){const i=P(e,t);let r,o=[];if(null!=e.astNode&&o.push(e.astNode),"extensionASTNodes"in e&&null!=e.extensionASTNodes&&(o=o.concat(e.extensionASTNodes)),null!=i)r=Z(n,i);else{r=[];for(const e of o)e.directives&&r.push(...e.directives)}return r}function $(e,n,t){let i=[],r=null;const s=P(e,t);let a;return a=null!=s?Z(n,s):e.astNode?.directives,null!=a&&(i=a.filter((e=>"deprecated"!==e.name.value)),null!=e.deprecationReason&&(r=a.filter((e=>"deprecated"===e.name.value))?.[0])),null!=e.deprecationReason&&null==r&&(r=z("deprecated",{reason:e.deprecationReason},o.GraphQLDeprecatedDirective)),null==r?i:[r].concat(i)}function B(e,n,t){return{kind:o.Kind.INPUT_VALUE_DEFINITION,description:F(e),name:{kind:o.Kind.NAME,value:e.name},type:k(e.type),defaultValue:void 0!==e.defaultValue?K(e.defaultValue,e.type)??void 0:void 0,directives:$(e,n,t)}}function q(e,n,t){return{kind:o.Kind.OBJECT_TYPE_DEFINITION,description:F(e),name:{kind:o.Kind.NAME,value:e.name},fields:Object.values(e.getFields()).map((e=>W(e,n,t))),interfaces:Object.values(e.getInterfaces()).map((e=>k(e))),directives:R(e,n,t)}}function J(e,n,t){const i={kind:o.Kind.INTERFACE_TYPE_DEFINITION,description:F(e),name:{kind:o.Kind.NAME,value:e.name},fields:Object.values(e.getFields()).map((e=>W(e,n,t))),directives:R(e,n,t)};return"getInterfaces"in e&&(i.interfaces=Object.values(e.getInterfaces()).map((e=>k(e)))),i}function H(e,n,t){return{kind:o.Kind.UNION_TYPE_DEFINITION,description:F(e),name:{kind:o.Kind.NAME,value:e.name},directives:R(e,n,t),types:e.getTypes().map((e=>k(e)))}}function Q(e,n,t){return{kind:o.Kind.INPUT_OBJECT_TYPE_DEFINITION,description:F(e),name:{kind:o.Kind.NAME,value:e.name},fields:Object.values(e.getFields()).map((e=>function(e,n,t){return{kind:o.Kind.INPUT_VALUE_DEFINITION,description:F(e),name:{kind:o.Kind.NAME,value:e.name},type:k(e.type),directives:$(e,n,t),defaultValue:K(e.defaultValue,e.type)??void 0}}(e,n,t))),directives:R(e,n,t)}}function G(e,n,t){return{kind:o.Kind.ENUM_TYPE_DEFINITION,description:F(e),name:{kind:o.Kind.NAME,value:e.name},values:Object.values(e.getValues()).map((e=>function(e,n,t){return{kind:o.Kind.ENUM_VALUE_DEFINITION,description:F(e),name:{kind:o.Kind.NAME,value:e.name},directives:$(e,n,t)}}(e,n,t))),directives:R(e,n,t)}}function X(e,n,t){const i=P(e,t),r=i?Z(n,i):e.astNode?.directives||[],s=e.specifiedByUrl||e.specifiedByURL;if(s&&!r.some((e=>"specifiedBy"===e.name.value))){const e={url:s};r.push(z("specifiedBy",e))}return{kind:o.Kind.SCALAR_TYPE_DEFINITION,description:F(e),name:{kind:o.Kind.NAME,value:e.name},directives:r}}function W(e,n,t){return{kind:o.Kind.FIELD_DEFINITION,description:F(e),name:{kind:o.Kind.NAME,value:e.name},arguments:e.args.map((e=>B(e,n,t))),type:k(e.type),directives:$(e,n,t)}}function z(e,n,t){const i=[];if(null!=t)for(const e of t.args){const t=e.name,r=n[t];if(void 0!==r){const n=K(r,e.type);n&&i.push({kind:o.Kind.ARGUMENT,name:{kind:o.Kind.NAME,value:t},value:n})}}else for(const e in n){const t=_(n[e]);t&&i.push({kind:o.Kind.ARGUMENT,name:{kind:o.Kind.NAME,value:e},value:t})}return{kind:o.Kind.DIRECTIVE,name:{kind:o.Kind.NAME,value:e},arguments:i}}function Z(e,n){const t=[];for(const i in n){const r=n[i],o=e?.getDirective(i);if(Array.isArray(r))for(const e of r)t.push(z(i,e,o));else t.push(z(i,r,o))}return t}var ee,ne=function t(i){var r=n[i];if(void 0!==r)return r.exports;var o=n[i]={exports:{}};return e[i](o,o.exports,t),o.exports}(257);function te(e,n){return!!e.find((e=>e.name.value===n.name.value))}function ie(e,n){return!!n?.[e.name.value]?.repeatable}function re(e,n){return n.some((({value:n})=>n===e.value))}function oe(e,n){const t=[...n];for(const n of e){const e=t.findIndex((e=>e.name.value===n.name.value));if(e>-1){const i=t[e];if("ListValue"===i.value.kind){const e=i.value.values,t=n.value.values;i.value.values=ce(e,t,((e,n)=>{const t=e.value;return!t||!n.some((e=>e.value===t))}))}else i.value=n.value}else t.push(n)}return t}function se(e=[],n=[],t,i){const r=t&&t.reverseDirectives,o=r?n:e,s=function(e,n){return e.map(((e,t,i)=>{const r=i.findIndex((n=>n.name.value===e.name.value));if(r!==t&&!ie(e,n)){const n=i[r];return e.arguments=oe(e.arguments,n.arguments),null}return e})).filter(U)}([...r?e:n],i);for(const e of o)if(te(s,e)&&!ie(e,i)){const n=s.findIndex((n=>n.name.value===e.name.value)),t=s[n];s[n].arguments=oe(e.arguments||[],t.arguments||[])}else s.push(e);return s}function ae(e,n){return n?{...e,arguments:ce(n.arguments||[],e.arguments||[],((e,n)=>!re(e.name,n.map((e=>e.name))))),locations:[...n.locations,...e.locations.filter((e=>!re(e,n.locations)))]}:e}function ce(e,n,t){return e.concat(n.filter((n=>t(n,e))))}function ue(e,n,t,i){if(t?.consistentEnumMerge){const t=[];e&&t.push(...e),e=n,n=t}const r=new Map;if(e)for(const n of e)r.set(n.name.value,n);if(n)for(const e of n){const n=e.name.value;if(r.has(n)){const t=r.get(n);t.description=e.description||t.description,t.directives=se(e.directives,t.directives,i)}else r.set(n,e)}const o=[...r.values()];return t&&t.sort&&o.sort(M),o}function le(e,n,t,i){return n?{name:e.name,description:e.description||n.description,kind:t?.convertExtensions||"EnumTypeDefinition"===e.kind||"EnumTypeDefinition"===n.kind?"EnumTypeDefinition":"EnumTypeExtension",loc:e.loc,directives:se(e.directives,n.directives,t,i),values:ue(e.values,n.values,t)}:t?.convertExtensions?{...e,kind:o.Kind.ENUM_TYPE_DEFINITION}:e}function de(e,n,t){const i=function(e,n){return e.reduce(((e,t)=>{const i=e.findIndex((e=>e.name.value===t.name.value));return-1===i?e.concat([t]):(n?.reverseArguments||(e[i]=t),e)}),[])}([...n,...e].filter(U),t);return t&&t.sort&&i.sort(M),i}function fe(e){let n=e;for(;n.kind===o.Kind.LIST_TYPE||"NonNullType"===n.kind;)n=n.type;return n}function pe(e){return e.kind!==o.Kind.NAMED_TYPE}function ve(e){return e.kind===o.Kind.LIST_TYPE}function me(e){return e.kind===o.Kind.NON_NULL_TYPE}function ye(e){return ve(e)?`[${ye(e.type)}]`:me(e)?`${ye(e.type)}!`:e.name.value}function Ee(e,n){return null==e&&null==n?ee.A_EQUALS_B:null==e?ee.A_SMALLER_THAN_B:null==n?ee.A_GREATER_THAN_B:e<n?ee.A_SMALLER_THAN_B:e>n?ee.A_GREATER_THAN_B:ee.A_EQUALS_B}function Te(e,n){const t=e.findIndex((e=>e.name.value===n.name.value));return[t>-1?e[t]:null,t]}function Ne(e,n,t,i,r){const o=[];if(null!=t&&o.push(...t),null!=n)for(const t of n){const[n,s]=Te(o,t);if(n&&!i?.ignoreFieldConflicts){const a=i?.onFieldTypeConflict&&i.onFieldTypeConflict(n,t,e,i?.throwOnConflict)||Ie(e,n,t,i?.throwOnConflict);a.arguments=de(t.arguments||[],n.arguments||[],i),a.directives=se(t.directives,n.directives,i,r),a.description=t.description||n.description,o[s]=a}else o.push(t)}if(i&&i.sort&&o.sort(M),i&&i.exclusions){const n=i.exclusions;return o.filter((t=>!n.includes(`${e.name.value}.${t.name.value}`)))}return o}function Ie(e,n,t,i=!1){const r=ye(n.type),o=ye(t.type);if(r!==o){const s=fe(n.type),a=fe(t.type);if(s.name.value!==a.name.value)throw new Error(`Field "${t.name.value}" already defined with a different type. Declared as "${s.name.value}", but you tried to override with "${a.name.value}"`);if(!ge(n.type,t.type,!i))throw new Error(`Field '${e.name.value}.${n.name.value}' changed type from '${r}' to '${o}'`)}return me(t.type)&&!me(n.type)&&(n.type=t.type),n}function ge(e,n,t=!1){if(!pe(e)&&!pe(n))return e.toString()===n.toString();if(me(n)){return ge(me(e)?e.type:e,n.type)}return me(e)?ge(n,e,t):!!ve(e)&&(ve(n)&&ge(e.type,n.type)||me(n)&&ge(e,n.type))}function Oe(e,n,t,i){if(n)try{return{name:e.name,description:e.description||n.description,kind:t?.convertExtensions||"InputObjectTypeDefinition"===e.kind||"InputObjectTypeDefinition"===n.kind?"InputObjectTypeDefinition":"InputObjectTypeExtension",loc:e.loc,fields:Ne(e,e.fields,n.fields,t),directives:se(e.directives,n.directives,t,i)}}catch(n){throw new Error(`Unable to merge GraphQL input type "${e.name.value}": ${n.message}`)}return t?.convertExtensions?{...e,kind:o.Kind.INPUT_OBJECT_TYPE_DEFINITION}:e}function he(e=[],n=[],t={}){const i=[...n,...e.filter((e=>{return t=e,!n.find((e=>e.name.value===t.name.value));var t}))];return t&&t.sort&&i.sort(M),i}function be(e,n,t,i){if(n)try{return{name:e.name,description:e.description||n.description,kind:t?.convertExtensions||"InterfaceTypeDefinition"===e.kind||"InterfaceTypeDefinition"===n.kind?"InterfaceTypeDefinition":"InterfaceTypeExtension",loc:e.loc,fields:Ne(e,e.fields,n.fields,t),directives:se(e.directives,n.directives,t,i),interfaces:e.interfaces?he(e.interfaces,n.interfaces,t):void 0}}catch(n){throw new Error(`Unable to merge GraphQL interface "${e.name.value}": ${n.message}`)}return t?.convertExtensions?{...e,kind:o.Kind.INTERFACE_TYPE_DEFINITION}:e}function De(e,n,t,i){return n?{name:e.name,description:e.description||n.description,kind:t?.convertExtensions||"ScalarTypeDefinition"===e.kind||"ScalarTypeDefinition"===n.kind?"ScalarTypeDefinition":"ScalarTypeExtension",loc:e.loc,directives:se(e.directives,n.directives,t,i)}:t?.convertExtensions?{...e,kind:o.Kind.SCALAR_TYPE_DEFINITION}:e}!function(e){e[e.A_SMALLER_THAN_B=-1]="A_SMALLER_THAN_B",e[e.A_EQUALS_B=0]="A_EQUALS_B",e[e.A_GREATER_THAN_B=1]="A_GREATER_THAN_B"}(ee||(ee={}));const Se={query:"Query",mutation:"Mutation",subscription:"Subscription"};function ke(e=[],n=[]){const t=[];for(const i in Se){const r=e.find((e=>e.operation===i))||n.find((e=>e.operation===i));r&&t.push(r)}return t}function _e(e,n,t,i){return n?{kind:e.kind===o.Kind.SCHEMA_DEFINITION||n.kind===o.Kind.SCHEMA_DEFINITION?o.Kind.SCHEMA_DEFINITION:o.Kind.SCHEMA_EXTENSION,description:e.description||n.description,directives:se(e.directives,n.directives,t,i),operationTypes:ke(e.operationTypes,n.operationTypes)}:t?.convertExtensions?{...e,kind:o.Kind.SCHEMA_DEFINITION}:e}function Ae(e,n,t,i){if(n)try{return{name:e.name,description:e.description||n.description,kind:t?.convertExtensions||"ObjectTypeDefinition"===e.kind||"ObjectTypeDefinition"===n.kind?"ObjectTypeDefinition":"ObjectTypeExtension",loc:e.loc,fields:Ne(e,e.fields,n.fields,t),directives:se(e.directives,n.directives,t,i),interfaces:he(e.interfaces,n.interfaces,t)}}catch(n){throw new Error(`Unable to merge GraphQL type "${e.name.value}": ${n.message}`)}return t?.convertExtensions?{...e,kind:o.Kind.OBJECT_TYPE_DEFINITION}:e}function Ke(e,n,t,i){return n?{name:e.name,description:e.description||n.description,directives:se(e.directives,n.directives,t,i),kind:t?.convertExtensions||"UnionTypeDefinition"===e.kind||"UnionTypeDefinition"===n.kind?o.Kind.UNION_TYPE_DEFINITION:o.Kind.UNION_TYPE_EXTENSION,loc:e.loc,types:he(e.types,n.types,t)}:t?.convertExtensions?{...e,kind:o.Kind.UNION_TYPE_DEFINITION}:e}const je="SCHEMA_DEF_SYMBOL";function Fe(e,n,t={}){const i=t;for(const r of e)if("name"in r){const e=r.name?.value;if(n?.commentDescriptions&&c(r),null==e)continue;if(n?.exclusions?.includes(e+".*")||n?.exclusions?.includes(e))delete i[e];else switch(r.kind){case o.Kind.OBJECT_TYPE_DEFINITION:case o.Kind.OBJECT_TYPE_EXTENSION:i[e]=Ae(r,i[e],n,t);break;case o.Kind.ENUM_TYPE_DEFINITION:case o.Kind.ENUM_TYPE_EXTENSION:i[e]=le(r,i[e],n,t);break;case o.Kind.UNION_TYPE_DEFINITION:case o.Kind.UNION_TYPE_EXTENSION:i[e]=Ke(r,i[e],n,t);break;case o.Kind.SCALAR_TYPE_DEFINITION:case o.Kind.SCALAR_TYPE_EXTENSION:i[e]=De(r,i[e],n,t);break;case o.Kind.INPUT_OBJECT_TYPE_DEFINITION:case o.Kind.INPUT_OBJECT_TYPE_EXTENSION:i[e]=Oe(r,i[e],n,t);break;case o.Kind.INTERFACE_TYPE_DEFINITION:case o.Kind.INTERFACE_TYPE_EXTENSION:i[e]=be(r,i[e],n,t);break;case o.Kind.DIRECTIVE_DEFINITION:if(i[e]){e in{}&&((0,ne.Ll)(i[e])||(i[e]=void 0))}i[e]=ae(r,i[e])}}else r.kind!==o.Kind.SCHEMA_DEFINITION&&r.kind!==o.Kind.SCHEMA_EXTENSION||(i[je]=_e(r,i[je],n));return i}function Pe(e,n,t=[],i=[],r=new Set){if(e&&!r.has(e))if(r.add(e),"function"==typeof e)Pe(e(),n,t,i,r);else if(Array.isArray(e))for(const o of e)Pe(o,n,t,i,r);else if((0,o.isSchema)(e)){Pe(V(e,n).definitions,n,t,i,r)}else if("string"==typeof e||function(e){return e instanceof o.Source}(e)){Pe((0,o.parse)(e,n).definitions,n,t,i,r)}else if("object"==typeof e&&(0,o.isDefinitionNode)(e))e.kind===o.Kind.DIRECTIVE_DEFINITION?t.push(e):i.push(e);else{if(!(s=e)||"object"!=typeof s||!("kind"in s)||s.kind!==o.Kind.DOCUMENT)throw new Error("typeDefs must contain only strings, documents, schemas, or functions, got "+typeof e);Pe(e.definitions,n,t,i,r)}var s;return{allDirectives:t,allNodes:i}}function xe(e,n){a();const{allDirectives:t,allNodes:i}=Pe(e,n),r=Fe(t,n),s=Fe(i,n,r);if(n?.useSchemaDefinition){const e=s[je]||{kind:o.Kind.SCHEMA_DEFINITION,operationTypes:[]},n=e.operationTypes;for(const e in Se){if(!n.find((n=>n.operation===e))){const t=s[Se[e]];null!=t&&null!=t.name&&n.push({kind:o.Kind.OPERATION_TYPE_DEFINITION,type:{kind:o.Kind.NAMED_TYPE,name:t.name},operation:e})}}null!=e?.operationTypes?.length&&e.operationTypes.length>0&&(s[je]=e)}n?.forceSchemaDefinition&&!s[je]?.operationTypes?.length&&(s[je]={kind:o.Kind.SCHEMA_DEFINITION,operationTypes:[{kind:o.Kind.OPERATION_TYPE_DEFINITION,operation:"query",type:{kind:o.Kind.NAMED_TYPE,name:{kind:o.Kind.NAME,value:"Query"}}}]});const c=Object.values(s);if(n?.sort){const e="function"==typeof n.sort?n.sort:Ee;c.sort(((n,t)=>e(n.name?.value,t.name?.value)))}return c}var Me=[{id:"1",name:"John Doe",email:"john@example.com"},{id:"2",name:"Jane Smith",email:"jane@example.com"}],Ue={Query:{hello:function(){return"world"},users:function(){return Me},user:function(e,n){var t=n.id;return Me.find((function(e){return e.id===t}))}}};function Le(e){return Le="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Le(e)}function we(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function Ce(e,n,t){return(n=function(e){var n=function(e,n){if("object"!=Le(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var i=t.call(e,n||"default");if("object"!=Le(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(e)}(e,"string");return"symbol"==Le(n)?n:n+""}(n))in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var Ve={Mutation:{createUser:function(e,n){var t=n.input,i=function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?we(Object(t),!0).forEach((function(n){Ce(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):we(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}({id:String(Me.length+1)},t);return Me.push(i),{user:i,msg:"user added successfully"}},updateUser:function(e,n){var t=n.id,i=n.input,r=Me.findIndex((function(e){return e.id===t}));return-1!==r?(i.name&&(Me[r].name=i.name),i.email&&(Me[r].email=i.email),{user:Me[r],msg:"User updated successfully "}):{msg:"Invalid userID"}},deleteUser:function(e,n){var t=n.id,i=Me.findIndex((function(e){return e.id===t}));return-1!==i?{id:Me.splice(i,1)[0].id,success:!0,message:"user deleted successfully"}:{id:t,success:!1,message:"User not found"}}}};const Ye=require("url"),Re=require("path");function $e(e){return $e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},$e(e)}function Be(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function qe(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?Be(Object(t),!0).forEach((function(n){Je(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):Be(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function Je(e,n,t){return(n=function(e){var n=function(e,n){if("object"!=$e(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var i=t.call(e,n||"default");if("object"!=$e(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(e)}(e,"string");return"symbol"==$e(n)?n:n+""}(n))in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var He=function(e,n){a();const t={kind:o.Kind.DOCUMENT,definitions:xe(e,{useSchemaDefinition:!0,forceSchemaDefinition:!1,throwOnConflict:!1,commentDescriptions:!1,...n})};let i;return i=n?.commentDescriptions?function(e){return(0,o.visit)(e,E)}(t):t,a(),i}((0,r.loadFilesSync)("./schema/typeDefs",{extensions:["gql","graphql"]})),Qe=qe(qe({},Ue),Ve),Ge=(0,i.createSchema)({typeDefs:He,resolvers:Qe}),Xe=(0,i.createYoga)({graphqlEndpoint:"/graphql",schema:Ge,graphiql:!0}),We=t(),ze=(0,Ye.fileURLToPath)("file:///D:/mental/unique/app.js"),Ze=(0,Re.dirname)(ze),en=(0,Re.join)(Ze,"./client/dist");We.use(t.static(en)),We.get("*",(function(e,n,t){if(e.path.startsWith("/graphql")||"/restapi"===e.path)return t();n.sendFile((0,Re.join)(en,"index.html"))})),We.use("/graphql",Xe),We.get("/restapi",(function(e,n){n.status(200).json({users:Me})})),We.delete("/restapi/:id",(function(e,n){var t=e.params.id,i=Me.findIndex((function(e){return e.id===t}));return-1!==i?(Me.splice(i,1),n.json({msg:"User with id ".concat(t," deleted successfully")})):n.status(404).json({msg:"User with id ".concat(t," not found")})}));var nn=process.env.PORT||4e3;We.listen(nn,(function(){console.log("Server is running on http://localhost:".concat(nn,"/graphql").america)}))})();
//# sourceMappingURL=bundle.js.map