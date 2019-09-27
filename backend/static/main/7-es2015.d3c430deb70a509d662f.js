(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"+8ai":function(l,n,u){"use strict";u.r(n);var t=u("8Y7J"),e=u("LIMc"),o=u("7dP1"),r=u("FFoR"),s=u("4xmj");class i{constructor(l,n,u){this.profileService=l,this.authService=n,this.snackbarService=u,this.profile=new e.a}onSubmit(){this.doUpdate()}doUpdate(){this.errors=void 0,this.profile.password===this.profile.confirm_password?this.profileService.update(this.profile).subscribe(l=>{this.profile=l,this.snackbarService.message={text:"Profile updated!"},this.authService.setMeToStorage(this.profile)},l=>{this.errors=l.error,l.error.details&&(this.errors.otherError=l.error.details)}):this.errors={confirm_password:["Password and confirm password must be equal"]}}doDelete(){confirm("Do you want to delete this account?")&&this.profileService.destroy(this.profile.id).subscribe(()=>{this.authService.logout(),this.snackbarService.message={text:"Account deleted!"}},l=>{this.errors=l.error&&l.error.details?l.error.details:l})}ngOnInit(){this.profile=this.authService.getMeFromStorage()}}class a{}var b=u("pMnS"),c=u("s7LF"),d=u("SVse"),g=u("TSSN"),p=t.nb({encapsulation:0,styles:[[".settings-page_not-logged[_ngcontent-%COMP%]{text-align:center}"]],data:{}});function h(l){return t.Jb(0,[(l()(),t.pb(0,0,null,null,1,"div",[["class","alert alert-danger"]],null,null,null,null,null)),(l()(),t.Hb(1,null,["",""]))],null,function(l,n){l(n,1,0,n.component.errors.otherError)})}function m(l){return t.Jb(0,[(l()(),t.pb(0,0,null,null,1,"div",[["class","alert alert-danger"]],null,null,null,null,null)),(l()(),t.Hb(1,null,["",""]))],null,function(l,n){l(n,1,0,n.component.errors.email[0])})}function f(l){return t.Jb(0,[(l()(),t.pb(0,0,null,null,1,"div",[["class","alert alert-danger"]],null,null,null,null,null)),(l()(),t.Hb(1,null,["",""]))],null,function(l,n){l(n,1,0,n.component.errors.password[0])})}function A(l){return t.Jb(0,[(l()(),t.pb(0,0,null,null,1,"div",[["class","alert alert-danger"]],null,null,null,null,null)),(l()(),t.Hb(1,null,["",""]))],null,function(l,n){l(n,1,0,n.component.errors.confirm_password[0])})}function v(l){return t.Jb(0,[(l()(),t.pb(0,0,null,null,1,"div",[["class","alert alert-danger"]],null,null,null,null,null)),(l()(),t.Hb(1,null,["",""]))],null,function(l,n){l(n,1,0,n.component.errors.tagline[0])})}function C(l){return t.Jb(0,[(l()(),t.pb(0,0,null,null,71,"div",[["class","well"]],null,null,null,null,null)),(l()(),t.pb(1,0,null,null,70,"form",[["class","settings"],["novalidate",""],["role","form"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngSubmit"],[null,"submit"],[null,"reset"]],function(l,n,u){var e=!0,o=l.component;return"submit"===n&&(e=!1!==t.Ab(l,3).onSubmit(u)&&e),"reset"===n&&(e=!1!==t.Ab(l,3).onReset()&&e),"ngSubmit"===n&&(e=!1!==o.onSubmit()&&e),e},null,null)),t.ob(2,16384,null,0,c.p,[],null,null),t.ob(3,4210688,[["settingsForm",4]],0,c.k,[[8,null],[8,null]],null,{ngSubmit:"ngSubmit"}),t.Eb(2048,null,c.b,null,[c.k]),t.ob(5,16384,null,0,c.j,[[4,c.b]],null,null),(l()(),t.eb(16777216,null,null,1,null,h)),t.ob(7,16384,null,0,d.j,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(l()(),t.eb(16777216,null,null,1,null,m)),t.ob(9,16384,null,0,d.j,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(l()(),t.pb(10,0,null,null,12,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),t.pb(11,0,null,null,2,"label",[["for","settings__email"]],null,null,null,null,null)),t.ob(12,8536064,null,0,g.e,[g.k,t.k,t.h],{translate:[0,"translate"]},null),(l()(),t.Hb(-1,null,["Email"])),(l()(),t.pb(14,0,null,null,8,"input",[["class","form-control"],["id","settings__email"],["maxlength","40"],["name","email"],["style","text-transform: lowercase;"],["type","email"]],[[8,"placeholder",0],[1,"maxlength",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var e=!0,o=l.component;return"input"===n&&(e=!1!==t.Ab(l,15)._handleInput(u.target.value)&&e),"blur"===n&&(e=!1!==t.Ab(l,15).onTouched()&&e),"compositionstart"===n&&(e=!1!==t.Ab(l,15)._compositionStart()&&e),"compositionend"===n&&(e=!1!==t.Ab(l,15)._compositionEnd(u.target.value)&&e),"ngModelChange"===n&&(e=!1!==(o.profile.email=u)&&e),e},null,null)),t.ob(15,16384,null,0,c.c,[t.B,t.k,[2,c.a]],null,null),t.ob(16,540672,null,0,c.e,[],{maxlength:[0,"maxlength"]},null),t.Eb(1024,null,c.f,function(l){return[l]},[c.e]),t.Eb(1024,null,c.g,function(l){return[l]},[c.c]),t.ob(19,671744,null,0,c.l,[[2,c.b],[6,c.f],[8,null],[6,c.g]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t.Eb(2048,null,c.h,null,[c.l]),t.ob(21,16384,null,0,c.i,[[4,c.h]],null,null),t.Bb(131072,g.j,[g.k,t.h]),(l()(),t.eb(16777216,null,null,1,null,f)),t.ob(24,16384,null,0,d.j,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(l()(),t.pb(25,0,null,null,9,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),t.pb(26,0,null,null,2,"label",[["for","settings__password"]],null,null,null,null,null)),t.ob(27,8536064,null,0,g.e,[g.k,t.k,t.h],{translate:[0,"translate"]},null),(l()(),t.Hb(-1,null,["New Password"])),(l()(),t.pb(29,0,null,null,5,"input",[["class","form-control"],["id","settings__password"],["name","password"],["type","password"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var e=!0,o=l.component;return"input"===n&&(e=!1!==t.Ab(l,30)._handleInput(u.target.value)&&e),"blur"===n&&(e=!1!==t.Ab(l,30).onTouched()&&e),"compositionstart"===n&&(e=!1!==t.Ab(l,30)._compositionStart()&&e),"compositionend"===n&&(e=!1!==t.Ab(l,30)._compositionEnd(u.target.value)&&e),"ngModelChange"===n&&(e=!1!==(o.profile.password=u)&&e),e},null,null)),t.ob(30,16384,null,0,c.c,[t.B,t.k,[2,c.a]],null,null),t.Eb(1024,null,c.g,function(l){return[l]},[c.c]),t.ob(32,671744,null,0,c.l,[[2,c.b],[8,null],[8,null],[6,c.g]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t.Eb(2048,null,c.h,null,[c.l]),t.ob(34,16384,null,0,c.i,[[4,c.h]],null,null),(l()(),t.eb(16777216,null,null,1,null,A)),t.ob(36,16384,null,0,d.j,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(l()(),t.pb(37,0,null,null,9,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),t.pb(38,0,null,null,2,"label",[["for","settings__confirm-password"]],null,null,null,null,null)),t.ob(39,8536064,null,0,g.e,[g.k,t.k,t.h],{translate:[0,"translate"]},null),(l()(),t.Hb(-1,null,["Confirm Password"])),(l()(),t.pb(41,0,null,null,5,"input",[["class","form-control"],["id","settings__confirm-password"],["name","confirm_password"],["type","password"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var e=!0,o=l.component;return"input"===n&&(e=!1!==t.Ab(l,42)._handleInput(u.target.value)&&e),"blur"===n&&(e=!1!==t.Ab(l,42).onTouched()&&e),"compositionstart"===n&&(e=!1!==t.Ab(l,42)._compositionStart()&&e),"compositionend"===n&&(e=!1!==t.Ab(l,42)._compositionEnd(u.target.value)&&e),"ngModelChange"===n&&(e=!1!==(o.profile.confirm_password=u)&&e),e},null,null)),t.ob(42,16384,null,0,c.c,[t.B,t.k,[2,c.a]],null,null),t.Eb(1024,null,c.g,function(l){return[l]},[c.c]),t.ob(44,671744,null,0,c.l,[[2,c.b],[8,null],[8,null],[6,c.g]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t.Eb(2048,null,c.h,null,[c.l]),t.ob(46,16384,null,0,c.i,[[4,c.h]],null,null),(l()(),t.eb(16777216,null,null,1,null,v)),t.ob(48,16384,null,0,d.j,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(l()(),t.pb(49,0,null,null,12,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),t.pb(50,0,null,null,2,"label",[["for","settings__tagline"]],null,null,null,null,null)),t.ob(51,8536064,null,0,g.e,[g.k,t.k,t.h],{translate:[0,"translate"]},null),(l()(),t.Hb(-1,null,["Tagline"])),(l()(),t.pb(53,0,null,null,8,"input",[["class","form-control"],["id","settings__tagline"],["maxlength","140"],["name","tagline"]],[[8,"placeholder",0],[1,"maxlength",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var e=!0,o=l.component;return"input"===n&&(e=!1!==t.Ab(l,54)._handleInput(u.target.value)&&e),"blur"===n&&(e=!1!==t.Ab(l,54).onTouched()&&e),"compositionstart"===n&&(e=!1!==t.Ab(l,54)._compositionStart()&&e),"compositionend"===n&&(e=!1!==t.Ab(l,54)._compositionEnd(u.target.value)&&e),"ngModelChange"===n&&(e=!1!==(o.profile.tagline=u)&&e),e},null,null)),t.ob(54,16384,null,0,c.c,[t.B,t.k,[2,c.a]],null,null),t.ob(55,540672,null,0,c.e,[],{maxlength:[0,"maxlength"]},null),t.Eb(1024,null,c.f,function(l){return[l]},[c.e]),t.Eb(1024,null,c.g,function(l){return[l]},[c.c]),t.ob(58,671744,null,0,c.l,[[2,c.b],[6,c.f],[8,null],[6,c.g]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t.Eb(2048,null,c.h,null,[c.l]),t.ob(60,16384,null,0,c.i,[[4,c.h]],null,null),t.Bb(131072,g.j,[g.k,t.h]),(l()(),t.pb(62,0,null,null,9,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),t.pb(63,0,null,null,3,"button",[["class","btn btn-primary"],["type","submit"]],[[8,"disabled",0]],null,null,null,null)),(l()(),t.pb(64,0,null,null,2,"span",[],null,null,null,null,null)),t.ob(65,8536064,null,0,g.e,[g.k,t.k,t.h],{translate:[0,"translate"]},null),(l()(),t.Hb(-1,null,["Submit"])),(l()(),t.pb(67,0,null,null,3,"button",[["class","btn btn-danger float-right"],["type","button"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.doDelete()&&t),t},null,null)),(l()(),t.pb(68,0,null,null,2,"span",[],null,null,null,null,null)),t.ob(69,8536064,null,0,g.e,[g.k,t.k,t.h],{translate:[0,"translate"]},null),(l()(),t.Hb(-1,null,["Delete Account"])),(l()(),t.pb(71,0,null,null,0,"div",[["class","clear-both"]],null,null,null,null,null))],function(l,n){var u=n.component;l(n,7,0,u.errors&&u.errors.otherError),l(n,9,0,u.errors&&u.errors.email),l(n,12,0,"SETTINGSPAGE.FORM.EMAIL"),l(n,16,0,"40"),l(n,19,0,"email",u.profile.email),l(n,24,0,u.errors&&u.errors.password),l(n,27,0,"SETTINGSPAGE.FORM.PASSWORD"),l(n,32,0,"password",u.profile.password),l(n,36,0,u.errors&&u.errors.confirm_password),l(n,39,0,"SETTINGSPAGE.FORM.CONFIRMPASSWORD"),l(n,44,0,"confirm_password",u.profile.confirm_password),l(n,48,0,u.errors&&u.errors.tagline),l(n,51,0,"SETTINGSPAGE.FORM.TAGLINE"),l(n,55,0,"140"),l(n,58,0,"tagline",u.profile.tagline),l(n,65,0,"BUTTON.SUBMIT"),l(n,69,0,"BUTTON.DELETEACCOUNT")},function(l,n){l(n,1,0,t.Ab(n,5).ngClassUntouched,t.Ab(n,5).ngClassTouched,t.Ab(n,5).ngClassPristine,t.Ab(n,5).ngClassDirty,t.Ab(n,5).ngClassValid,t.Ab(n,5).ngClassInvalid,t.Ab(n,5).ngClassPending),l(n,14,0,t.tb(1,"",t.Ib(n,14,0,t.Ab(n,22).transform("PLACEHOLDER.EMAIL")),""),t.Ab(n,16).maxlength?t.Ab(n,16).maxlength:null,t.Ab(n,21).ngClassUntouched,t.Ab(n,21).ngClassTouched,t.Ab(n,21).ngClassPristine,t.Ab(n,21).ngClassDirty,t.Ab(n,21).ngClassValid,t.Ab(n,21).ngClassInvalid,t.Ab(n,21).ngClassPending),l(n,29,0,t.Ab(n,34).ngClassUntouched,t.Ab(n,34).ngClassTouched,t.Ab(n,34).ngClassPristine,t.Ab(n,34).ngClassDirty,t.Ab(n,34).ngClassValid,t.Ab(n,34).ngClassInvalid,t.Ab(n,34).ngClassPending),l(n,41,0,t.Ab(n,46).ngClassUntouched,t.Ab(n,46).ngClassTouched,t.Ab(n,46).ngClassPristine,t.Ab(n,46).ngClassDirty,t.Ab(n,46).ngClassValid,t.Ab(n,46).ngClassInvalid,t.Ab(n,46).ngClassPending),l(n,53,0,t.tb(1,"",t.Ib(n,53,0,t.Ab(n,61).transform("PLACEHOLDER.TAGLINE")),""),t.Ab(n,55).maxlength?t.Ab(n,55).maxlength:null,t.Ab(n,60).ngClassUntouched,t.Ab(n,60).ngClassTouched,t.Ab(n,60).ngClassPristine,t.Ab(n,60).ngClassDirty,t.Ab(n,60).ngClassValid,t.Ab(n,60).ngClassInvalid,t.Ab(n,60).ngClassPending),l(n,63,0,!t.Ab(n,3).form.valid)})}function S(l){return t.Jb(0,[(l()(),t.pb(0,0,null,null,1,"div",[["class","settings-page_not-logged"]],null,null,null,null,null)),(l()(),t.Hb(-1,null,["You must login"]))],null,null)}function I(l){return t.Jb(0,[(l()(),t.pb(0,0,null,null,7,"div",[["class","col-md-4 col-md-offset-4"]],null,null,null,null,null)),(l()(),t.pb(1,0,null,null,2,"h1",[],null,null,null,null,null)),t.ob(2,8536064,null,0,g.e,[g.k,t.k,t.h],{translate:[0,"translate"]},null),(l()(),t.Hb(-1,null,["Settings"])),(l()(),t.eb(16777216,null,null,1,null,C)),t.ob(5,16384,null,0,d.j,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(l()(),t.eb(16777216,null,null,1,null,S)),t.ob(7,16384,null,0,d.j,[t.M,t.J],{ngIf:[0,"ngIf"]},null)],function(l,n){var u=n.component;l(n,2,0,"SETTINGSPAGE.TITLE"),l(n,5,0,u.profile),l(n,7,0,!u.profile)},null)}function w(l){return t.Jb(0,[(l()(),t.pb(0,0,null,null,1,"profile-set-form",[],null,null,null,I,p)),t.ob(1,114688,null,0,i,[r.a,o.a,s.a],null,null)],function(l,n){l(n,1,0)},null)}var E=t.lb("profile-set-form",i,w,{},{},[]),_=u("Xu7E"),k=u("IheW"),M=u("iInd"),T=u("PCNd");u.d(n,"SettingsModuleNgFactory",function(){return P});var P=t.mb(a,[],function(l){return t.yb([t.zb(512,t.j,t.X,[[8,[b.a,E]],[3,t.j],t.v]),t.zb(4608,d.l,d.k,[t.s,[2,d.x]]),t.zb(4608,c.o,c.o,[]),t.zb(5120,g.g,_.a,[k.c]),t.zb(4608,g.c,g.f,[]),t.zb(4608,g.i,g.d,[]),t.zb(4608,g.b,g.a,[]),t.zb(4608,g.k,g.k,[g.l,g.g,g.c,g.i,g.b,g.m,g.n]),t.zb(1073742336,d.b,d.b,[]),t.zb(1073742336,M.m,M.m,[[2,M.r],[2,M.k]]),t.zb(1073742336,c.n,c.n,[]),t.zb(1073742336,c.d,c.d,[]),t.zb(1073742336,g.h,g.h,[]),t.zb(1073742336,_.b,_.b,[]),t.zb(1073742336,T.a,T.a,[]),t.zb(1073742336,a,a,[]),t.zb(256,g.n,void 0,[]),t.zb(256,g.m,void 0,[]),t.zb(1024,M.i,function(){return[[{path:"",component:i}]]},[])])})},FFoR:function(l,n,u){"use strict";u.d(n,"a",function(){return i});var t=u("IheW"),e=(u("JQBr"),u("52Ma")),o=u("OiFK"),r=(u("LIMc"),u("8Y7J")),s=u("jmvC");let i=(()=>{class l{constructor(l,n,u,t){this.http=l,this.cookieService=n,this.utils=u,this.config=t,this.apiUrl=this.config.getApiUrl(),this.authorUrl=this.apiUrl+"/accounts",this.avatarUrl=this.apiUrl+"/avatars"}getAuthor(l){return this.http.get(`${this.authorUrl}/${l}/`)}getAuthors(){return this.http.get(`${this.authorUrl}/`)}update(l){const n=`${this.authorUrl}/${l.username}/`;let u=JSON.parse(JSON.stringify(l));return u.password||delete u.password,u.confirm_password||delete u.confirm_password,delete u.picture,this.http.put(n,u,{headers:this.utils.makeCSRFandContentHeader()})}destroy(l){return this.http.delete(`${this.authorUrl}/${l}/`,{headers:this.utils.makeCSRFHeader()})}updateAvatar(l){const n=`${this.avatarUrl}/`;let u=new FormData;u.append("picture",l,l.name);const e=new t.i("POST",n,u,{reportProgress:!0,headers:this.utils.makeCSRFHeader()});return this.http.request(e)}}return l.ngInjectableDef=r.Nb({factory:function(){return new l(r.Ob(t.c),r.Ob(s.a),r.Ob(o.a),r.Ob(e.a))},token:l,providedIn:"root"}),l})()},PCNd:function(l,n,u){"use strict";u.d(n,"a",function(){return t});class t{}}}]);