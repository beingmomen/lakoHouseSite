(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{803:function(t,e,o){"use strict";o.r(e);o(34);var l=o(780),n={props:{label:String,module:String,storeKey:String,required:{type:Boolean,default:!1},type:{type:String,default:"text"},rule:{type:String,default:"required"},disabled:{type:Boolean,default:!1},lg:{type:String,default:"6"},md:{type:String,default:"6"},sm:{type:String,default:"12"}},computed:{getContent:{get:function(){return this.$store.getters["".concat(this.module,"/").concat(this.storeKey)]},set:function(t){this.$store.commit("".concat(this.module,"/").concat(this.storeKey),{key:this.storeKey,value:t})}},list:function(){return this.$store.getters["global/colorsList"]}},components:{LvColorpicker:l.a}},r=o(46),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("b-col",{staticClass:"mb-1 custom-form",attrs:{lg:t.lg,md:t.md,sm:t.sm}},[o("LvColorpicker",{attrs:{label:t.label,colors:t.list,clearable:""},model:{value:t.getContent,callback:function(e){t.getContent=e},expression:"getContent"}})],1)}),[],!1,null,"40389dd2",null);e.default=component.exports}}]);