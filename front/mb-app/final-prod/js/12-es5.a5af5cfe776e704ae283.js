(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{bakg:function(l,n,t){"use strict";t.r(n);var e=t("8Y7J"),u=t("IheW"),o=t("LIMc"),i=t("PWx8"),s=t("7dP1"),r=t("OiFK"),a=t("4xmj"),c=function(){function l(l,n,t,u){this.postsService=l,this.utils=n,this.authService=t,this.snackbarService=u,this.post=new o.f,this.futureId=void 0,this.images=[],this.postCreatingState="not created",this.postCreated=new e.m,this.visible=!1,this.visibleAnimate=!1}var n=l.prototype;return n.ngOnInit=function(){this.loggedAuthor=this.authService.getMeFromStorage()},n.show=function(){var l=this;this.error="",this.post=new o.f,this.futureId=void 0,this.images=[],this.visible=!0,setTimeout(function(){l.visibleAnimate=!0,l.input.nativeElement.focus()})},n.hide=function(){var l=this;this.post=new o.f,this.images=[],this.visibleAnimate=!1,setTimeout(function(){return l.visible=!1},300),"empty prepared"===this.postCreatingState&&this.postsService.destroy(this.futureId).subscribe(function(){l.futureId=void 0},function(n){l.error=l.utils.handleErrorDetails(n)})},n.createPost=function(){var l=this;this.post.content&&(this.futureId?(this.post.id=this.futureId,this.post.draft=!1,this.postsService.update(this.post).subscribe(function(n){l.error="",l.postCreated.emit(n),l.postCreatingState="completed",l.hide()},function(n){l.error=l.utils.handleErrorDetails(n)})):this.postsService.create(this.post.content,!1).subscribe(function(n){l.postCreated.emit(n),l.postCreatingState="completed",l.hide(),l.snackbarService.message={text:"Post created!"}},function(n){l.error=l.utils.handleErrorDetails(n)}))},n.startUploadImages=function(l){var n=this;this.futureId?this.uploadImages(l):this.postsService.create("_",!0).subscribe(function(t){n.futureId=t.id,n.postCreatingState="empty prepared",n.uploadImages(l)},function(l){n.error=n.utils.handleErrorDetails(l)})},n.uploadImages=function(l){var n=this,t=l.target.files;if(t&&t.length){var e=t,o=Array.isArray(e),i=0;for(e=o?e:e[Symbol.iterator]();;){var s;if(o){if(i>=e.length)break;s=e[i++]}else{if((i=e.next()).done)break;s=i.value}var r=s,a=r.name.toLowerCase();-1!=a.lastIndexOf("jpg")||-1!=a.lastIndexOf("jpeg")||-1!=a.lastIndexOf("gif")||-1!=a.lastIndexOf("png")?r.size&&r.size>5242880?(this.error="File is too big (> 5 MB), not added",console.log(r,"File is too big (> 5 MB), not added")):this.createImageSub=this.postsService.createImage("parent_post",this.futureId,r).subscribe(function(l){if(l.type===u.f.UploadProgress)Math.round(100*l.loaded/l.total);else if(l instanceof u.j)if(201==l.status)n.images.push(l.body);else try{n.error=l.body.error.error}catch(t){n.error="Error!"}},function(l){n.error="Error!"},function(){n.createImageSub.unsubscribe(),console.log("finished!")}):(this.error="Wrong file type! JPG, GIF, PNG only",console.log("Wrong file type! JPG, GIF, PNG only"))}}},n.deleteImage=function(l){var n=this;l&&this.postsService.destroyImage(l).subscribe(function(){var t=n.images.findIndex(function(n){return n.id===l});n.images.splice(t,1),n.error=""},function(l){n.error=n.utils.handleErrorDetails(l)})},n.ngOnDestroy=function(){this.createImageSub&&this.createImageSub.unsubscribe()},l}(),b=t("VSxx"),p=function(){function l(l,n,t,e){this.postsService=l,this.authService=n,this.router=t,this.windowRef=e,this.nextPage=0}var n=l.prototype;return n.windowFocusChanged=function(){!this.windowRef.document.hidden&&this.authService.windowFocusTimeExpired()&&(this.ngOnDestroy(),this.ngOnInit())},n.onPostCreated=function(l){var n;(n=this.layoutPosts.slice(0)).unshift(l),this.layoutPosts=n},n.loadMore=function(){var l=this;this.postsService.getPosts(this.nextPage).subscribe(function(n){var t;t=(t=l.layoutPosts.slice()).concat(n.results),l.layoutPosts=t,l.nextPage=+n.next},function(l){return console.log("error!",l)})},n.ngAfterViewInit=function(){var l=this;this.postsService.getPosts(this.nextPage).subscribe(function(n){l.layoutPosts=n.results,l.loaded=!0,l.nextPage=+n.next},function(l){return console.log("error!",l)}),setTimeout(function(){l.loggedSubscription=l.authService.loggedAuthor$.subscribe(function(n){l.loggedAuthor=n})}),this.postsSubscription=this.postsService.onePost$.subscribe(function(n){if(null!=n&&l.layoutPosts.hasOwnProperty("length"))for(var t=0;l.layoutPosts.length;t++)if(n.id==l.layoutPosts[t].id){var e=l.layoutPosts.slice(0);return e.splice(t,1),l.layoutPosts=e,void(l.postsService.onePost=null)}})},n.ngOnInit=function(){this.loggedAuthor=this.authService.getMeFromStorage(),this.nextPage=0},n.ngOnDestroy=function(){this.layoutPosts=[],this.postsSubscription.unsubscribe(),this.loggedSubscription.unsubscribe()},l}(),d=function(){},g=t("pMnS"),h=t("TSSN"),f=t("zLBW"),m=t("lYM4"),v=t("SVse"),y=t("s7LF"),P=e.nb({encapsulation:0,styles:[[".create-post-component_content[_ngcontent-%COMP%]{position:relative;padding:20px}.create-post-component_images-outer[_ngcontent-%COMP%]{display:block;max-height:100px;overflow:auto;white-space:nowrap}.create-post-component_images-list[_ngcontent-%COMP%]{position:relative;display:inline-block}.create-post-component_images-list[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{display:inline-block;width:80px;height:80px;opacity:.5}.create-post-component_image-remove[_ngcontent-%COMP%]{position:absolute;top:30px;left:30px;z-index:11}.create-post-component_input[_ngcontent-%COMP%]{position:relative;display:block;width:100%;height:30px;margin-bottom:10px}"]],data:{}});function C(l){return e.Jb(0,[(l()(),e.pb(0,0,null,null,3,"div",[],null,null,null,null,null)),(l()(),e.pb(1,0,null,null,2,"h6",[],null,null,null,null,null)),e.ob(2,8536064,null,0,h.e,[h.k,e.k,e.h],{translate:[0,"translate"]},null),(l()(),e.Hb(-1,null,["Added images:"]))],function(l,n){l(n,2,0,"COMPONENT.CREATEPOST.ADDEDIMAGES")},null)}function S(l){return e.Jb(0,[(l()(),e.pb(0,0,null,null,3,"div",[["class","create-post-component_images-list"]],null,null,null,null,null)),(l()(),e.pb(1,0,null,null,0,"img",[],[[8,"src",4]],null,null,null,null)),(l()(),e.pb(2,0,null,null,1,"i",[["class","material-icons close create-post-component_image-remove"]],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.deleteImage(l.context.$implicit.id)&&e),e},null,null)),(l()(),e.Hb(-1,null,["clear"]))],null,function(l,n){l(n,1,0,e.tb(1,"",n.context.$implicit.picture_for_preview,""))})}function k(l){return e.Jb(0,[e.Fb(671088640,1,{input:0}),(l()(),e.pb(1,0,null,null,49,"div",[["class","modal fade"],["tabindex","-1"]],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.hide()&&e),e},null,null)),e.Eb(512,null,v.s,v.t,[e.q,e.r,e.k,e.B]),e.ob(3,278528,null,0,v.h,[v.s],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),e.Cb(4,{in:0}),e.Eb(512,null,v.u,v.v,[e.k,e.r,e.B]),e.ob(6,278528,null,0,v.m,[v.u],{ngStyle:[0,"ngStyle"]},null),e.Cb(7,{display:0,opacity:1}),(l()(),e.pb(8,0,null,null,42,"div",[["class","modal-dialog"]],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==t.stopPropagation()&&e),e},null,null)),(l()(),e.pb(9,0,null,null,41,"div",[["class","modal-content"]],null,null,null,null,null)),(l()(),e.pb(10,0,null,null,40,"div",[["class","create-post-component_content"]],null,null,null,null,null)),(l()(),e.pb(11,0,null,null,19,"form",[["novalidate",""],["role","form"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],function(l,n,t){var u=!0;return"submit"===n&&(u=!1!==e.Ab(l,13).onSubmit(t)&&u),"reset"===n&&(u=!1!==e.Ab(l,13).onReset()&&u),u},null,null)),e.ob(12,16384,null,0,y.p,[],null,null),e.ob(13,4210688,[["postForm",4]],0,y.k,[[8,null],[8,null]],null,null),e.Eb(2048,null,y.b,null,[y.k]),e.ob(15,16384,null,0,y.j,[[4,y.b]],null,null),(l()(),e.pb(16,0,null,null,1,"div",[["class","alert alert-danger"]],[[8,"hidden",0]],null,null,null,null)),(l()(),e.Hb(17,null,["",""])),(l()(),e.pb(18,0,null,null,12,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e.pb(19,0,null,null,2,"label",[["for","post__content"]],null,null,null,null,null)),e.ob(20,8536064,null,0,h.e,[h.k,e.k,e.h],{translate:[0,"translate"]},null),(l()(),e.Hb(-1,null,["New post"])),(l()(),e.pb(22,0,[[1,0],["textInput",1]],null,8,"textarea",[["class","form-control post-form-field"],["id","post__content"],["name","content"],["required",""],["rows","5"],["type","text"]],[[8,"placeholder",0],[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,t){var u=!0,o=l.component;return"input"===n&&(u=!1!==e.Ab(l,23)._handleInput(t.target.value)&&u),"blur"===n&&(u=!1!==e.Ab(l,23).onTouched()&&u),"compositionstart"===n&&(u=!1!==e.Ab(l,23)._compositionStart()&&u),"compositionend"===n&&(u=!1!==e.Ab(l,23)._compositionEnd(t.target.value)&&u),"ngModelChange"===n&&(u=!1!==(o.post.content=t)&&u),u},null,null)),e.ob(23,16384,null,0,y.c,[e.B,e.k,[2,y.a]],null,null),e.ob(24,16384,null,0,y.m,[],{required:[0,"required"]},null),e.Eb(1024,null,y.f,function(l){return[l]},[y.m]),e.Eb(1024,null,y.g,function(l){return[l]},[y.c]),e.ob(27,671744,null,0,y.l,[[2,y.b],[6,y.f],[8,null],[6,y.g]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e.Eb(2048,null,y.h,null,[y.l]),e.ob(29,16384,null,0,y.i,[[4,y.h]],null,null),e.Bb(131072,h.j,[h.k,e.h]),(l()(),e.pb(31,0,null,null,5,"div",[["class","create-post-component_input"]],null,null,null,null,null)),(l()(),e.pb(32,0,null,null,4,"div",[["class","btn btn-xs btn-file pull-right"]],null,null,null,null,null)),(l()(),e.pb(33,0,null,null,2,"span",[],null,null,null,null,null)),e.ob(34,8536064,null,0,h.e,[h.k,e.k,e.h],{translate:[0,"translate"]},null),(l()(),e.Hb(-1,null,["Add images"])),(l()(),e.pb(36,0,null,null,0,"input",[["accept","images/*"],["multiple","multiple"],["type","file"]],null,[[null,"change"]],function(l,n,t){var e=!0;return"change"===n&&(e=!1!==l.component.startUploadImages(t)&&e),e},null,null)),(l()(),e.eb(16777216,null,null,1,null,C)),e.ob(38,16384,null,0,v.j,[e.M,e.J],{ngIf:[0,"ngIf"]},null),(l()(),e.pb(39,0,null,null,2,"div",[["class","post-create-component_images-outer"]],null,null,null,null,null)),(l()(),e.eb(16777216,null,null,1,null,S)),e.ob(41,278528,null,0,v.i,[e.M,e.J,e.q],{ngForOf:[0,"ngForOf"]},null),(l()(),e.pb(42,0,null,null,8,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e.pb(43,0,null,null,3,"button",[["class","btn btn-default"],["type","button"]],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.hide()&&e),e},null,null)),(l()(),e.pb(44,0,null,null,2,"span",[],null,null,null,null,null)),e.ob(45,8536064,null,0,h.e,[h.k,e.k,e.h],{translate:[0,"translate"]},null),(l()(),e.Hb(-1,null,["Close"])),(l()(),e.pb(47,0,null,null,3,"button",[["class","btn btn-primary"],["type","button"]],[[8,"disabled",0]],[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.createPost()&&e),e},null,null)),(l()(),e.pb(48,0,null,null,2,"span",[],null,null,null,null,null)),e.ob(49,8536064,null,0,h.e,[h.k,e.k,e.h],{translate:[0,"translate"]},null),(l()(),e.Hb(-1,null,["Submit"]))],function(l,n){var t=n.component,e=l(n,4,0,t.visibleAnimate);l(n,3,0,"modal fade",e);var u=l(n,7,0,t.visible?"block":"none",t.visibleAnimate?1:0);l(n,6,0,u),l(n,20,0,"COMPONENT.CREATEPOST.TITLE"),l(n,24,0,""),l(n,27,0,"content",t.post.content),l(n,34,0,"BUTTON.ADDIMAGES"),l(n,38,0,t.images&&t.images.length),l(n,41,0,t.images),l(n,45,0,"BUTTON.CLOSE"),l(n,49,0,"BUTTON.SUBMIT")},function(l,n){var t=n.component;l(n,11,0,e.Ab(n,15).ngClassUntouched,e.Ab(n,15).ngClassTouched,e.Ab(n,15).ngClassPristine,e.Ab(n,15).ngClassDirty,e.Ab(n,15).ngClassValid,e.Ab(n,15).ngClassInvalid,e.Ab(n,15).ngClassPending),l(n,16,0,!t.error),l(n,17,0,t.error),l(n,22,0,e.tb(1,"",e.Ib(n,22,0,e.Ab(n,30).transform("PLACEHOLDER.ENTERPOST")),""),e.Ab(n,24).required?"":null,e.Ab(n,29).ngClassUntouched,e.Ab(n,29).ngClassTouched,e.Ab(n,29).ngClassPristine,e.Ab(n,29).ngClassDirty,e.Ab(n,29).ngClassValid,e.Ab(n,29).ngClassInvalid,e.Ab(n,29).ngClassPending),l(n,47,0,!e.Ab(n,13).form.valid)})}var A=t("iInd"),I=e.nb({encapsulation:0,styles:[[".layout-component_button[_ngcontent-%COMP%], .layout-component_no-posts-here[_ngcontent-%COMP%]{text-align:center}.layout-component_button_inner[_ngcontent-%COMP%]{margin:auto}.layout-component_create-post-button[_ngcontent-%COMP%]{position:fixed;bottom:20px;right:20px}"]],data:{}});function x(l){return e.Jb(0,[(l()(),e.pb(0,0,null,null,3,"button",[["class","btn btn-raised layout-component_button-inner"],["type","button"]],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.loadMore()&&e),e},null,null)),(l()(),e.pb(1,0,null,null,2,"span",[],null,null,null,null,null)),e.ob(2,8536064,null,0,h.e,[h.k,e.k,e.h],{translate:[0,"translate"]},null),(l()(),e.Hb(-1,null,["Load more"]))],function(l,n){l(n,2,0,"BUTTON.LOADMORE")},null)}function O(l){return e.Jb(0,[(l()(),e.pb(0,0,null,null,3,"div",[["class","layout-component_create-post-button"]],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.createPostDialog.show()&&e),e},null,null)),(l()(),e.pb(1,0,null,null,2,"div",[["class","btn btn-primary btn-fab btn-raised"]],null,null,null,null,null)),(l()(),e.pb(2,0,null,null,1,"i",[["class","material-icons"]],null,null,null,null,null)),(l()(),e.Hb(-1,null,["create"]))],null,null)}function _(l){return e.Jb(0,[e.Fb(671088640,1,{createPostDialog:0}),(l()(),e.pb(1,0,null,null,3,"div",[["class","layout-component_no-posts-here"]],[[8,"hidden",0]],null,null,null,null)),(l()(),e.pb(2,0,null,null,2,"span",[],null,null,null,null,null)),e.ob(3,8536064,null,0,h.e,[h.k,e.k,e.h],{translate:[0,"translate"]},null),(l()(),e.Hb(-1,null,["Loading posts..."])),(l()(),e.pb(5,0,null,null,2,"span",[],[[8,"hidden",0]],null,null,null,null)),(l()(),e.pb(6,0,null,null,1,"posts",[],null,null,null,f.b,f.a)),e.ob(7,573440,null,0,m.a,[b.a,i.a,s.a],{loggedAuthor:[0,"loggedAuthor"],posts:[1,"posts"]},null),(l()(),e.pb(8,0,null,null,2,"div",[["class","layout-component_button"]],null,null,null,null,null)),(l()(),e.eb(16777216,null,null,1,null,x)),e.ob(10,16384,null,0,v.j,[e.M,e.J],{ngIf:[0,"ngIf"]},null),(l()(),e.eb(16777216,null,null,1,null,O)),e.ob(12,16384,null,0,v.j,[e.M,e.J],{ngIf:[0,"ngIf"]},null),(l()(),e.pb(13,0,null,null,1,"create-post-dialog",[],null,[[null,"postCreated"]],function(l,n,t){var e=!0;return"postCreated"===n&&(e=!1!==l.component.onPostCreated(t)&&e),e},k,P)),e.ob(14,245760,[[1,4]],0,c,[i.a,r.a,s.a,a.a],null,{postCreated:"postCreated"})],function(l,n){var t=n.component;l(n,3,0,"LAYOUTPAGE.LOADING.POSTS"),l(n,7,0,t.loggedAuthor,t.layoutPosts),l(n,10,0,t.nextPage),l(n,12,0,t.loggedAuthor),l(n,14,0)},function(l,n){var t=n.component;l(n,1,0,t.loaded),l(n,5,0,!t.loaded)})}var M=e.lb("layout",p,function(l){return e.Jb(0,[(l()(),e.pb(0,0,null,null,1,"layout",[],null,null,null,_,I)),e.ob(1,4440064,null,0,p,[i.a,s.a,A.k,b.a],null,null)],function(l,n){l(n,1,0)},null)},{},{},[]),E=t("Xu7E"),w=t("PCNd");t.d(n,"LayoutModuleNgFactory",function(){return T});var T=e.mb(d,[],function(l){return e.yb([e.zb(512,e.j,e.X,[[8,[g.a,M]],[3,e.j],e.v]),e.zb(4608,v.l,v.k,[e.s,[2,v.x]]),e.zb(4608,y.o,y.o,[]),e.zb(5120,h.g,E.a,[u.c]),e.zb(4608,h.c,h.f,[]),e.zb(4608,h.i,h.d,[]),e.zb(4608,h.b,h.a,[]),e.zb(4608,h.k,h.k,[h.l,h.g,h.c,h.i,h.b,h.m,h.n]),e.zb(1073742336,v.b,v.b,[]),e.zb(1073742336,A.m,A.m,[[2,A.r],[2,A.k]]),e.zb(1073742336,y.n,y.n,[]),e.zb(1073742336,y.d,y.d,[]),e.zb(1073742336,h.h,h.h,[]),e.zb(1073742336,E.b,E.b,[]),e.zb(1073742336,w.a,w.a,[]),e.zb(1073742336,d,d,[]),e.zb(256,h.n,void 0,[]),e.zb(256,h.m,void 0,[]),e.zb(1024,A.i,function(){return[[{path:"",component:p}]]},[])])})}}]);