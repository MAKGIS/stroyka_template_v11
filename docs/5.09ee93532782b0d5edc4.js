(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{X6tI:function(t,e,i){"use strict";i.r(e),i.d(e,"BlogModule",function(){return rt});var s=i("ofXK"),a=i("tyNb"),o=i("XNiG"),c=i("1G5W"),n=i("Z6UY"),r=i("fXoL"),l=i("tgey"),b=i("NhFE");const u=[{author:"Emma Williams",postTitle:"Nullam at varius sapien sed sit amet condimentum elit",text:"In one general sense, philosophy is associated with wisdom, intellectual culture and a search for knowledge...",date:"3 minutes ago"},{author:"Airic Ford",postTitle:"Integer efficitur efficitur velit non pulvinar pellentesque dictum viverra",text:"In one general sense, philosophy is associated with wisdom, intellectual culture and a search for knowledge...",date:"25 minutes ago"},{author:"Loyd Walker",postTitle:"Curabitur quam augue vestibulum in mauris fermentum pellentesque libero",text:"In one general sense, philosophy is associated with wisdom, intellectual culture and a search for knowledge...",date:"2 hours ago"},{author:"Jessica Moore",postTitle:"Vestibulum leo sapien sollicitudin at magna eu interdum congue feugiat",text:"In one general sense, philosophy is associated with wisdom, intellectual culture and a search for knowledge...",date:"3 days ago"}];var d=i("vkgz"),m=i("3E0/"),p=(i("YT3J"),i("tk/3"));let g=(()=>{class t{constructor(t){this.http=t}getCategories(t=null,e=0){return this.http.get("assets/api/blog/categories.json").pipe(Object(d.a)(t=>{console.log("BlogService getCategories delayTest -> %o",0)}),Object(m.a)(0))}}return t.\u0275fac=function(e){return new(e||t)(r.Tb(p.a))},t.\u0275prov=r.Fb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var P=i("3Pt+"),v=i("0njA");let O=(()=>{class t{constructor(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=r.Db({type:t,selectors:[["app-widget-search"]],decls:5,vars:0,consts:[[1,"widget-search"],[1,"widget-search__body"],["placeholder","Blog search...","type","text","autocomplete","off","spellcheck","false",1,"widget-search__input"],["type","submit",1,"widget-search__button"],["name","search-20","size","20"]],template:function(t,e){1&t&&(r.Pb(0,"div",0),r.Pb(1,"form",1),r.Kb(2,"input",2),r.Pb(3,"button",3),r.Kb(4,"app-icon",4),r.Ob(),r.Ob(),r.Ob())},directives:[P.t,P.l,P.m,v.a],styles:[""]}),t})();var f=i("5at8"),h=i("6c6k");let _=(()=>{class t{constructor(){this.theme=f.a}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=r.Db({type:t,selectors:[["app-widget-aboutus"]],decls:6,vars:0,consts:[[1,"widget-aboutus","widget"],[1,"widget__title"],[1,"widget-aboutus__text"],["shape","rounded",1,"widget-aboutus__socials"]],template:function(t,e){1&t&&(r.Pb(0,"div",0),r.Pb(1,"h4",1),r.Hc(2,"About Blog"),r.Ob(),r.Pb(3,"div",2),r.Hc(4," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, erat in malesuada aliquam, est erat faucibus purus, eget viverra nulla sem vitae neque. Quisque id sodales libero. "),r.Ob(),r.Kb(5,"app-social-links",3),r.Ob())},directives:[h.a],styles:[""]}),t})();var w=i("HgAd"),y=i("imTr");function H(t,e){if(1&t&&(r.Pb(0,"div",4),r.Pb(1,"div",5),r.Pb(2,"a",6),r.Kb(3,"img",7),r.Ob(),r.Ob(),r.Pb(4,"div",8),r.Pb(5,"div",9),r.Pb(6,"a",6),r.Hc(7),r.Ob(),r.Ob(),r.Pb(8,"div",10),r.Hc(9),r.Ob(),r.Ob(),r.Ob()),2&t){const t=e.$implicit,i=r.ac();r.xb(2),r.hc("routerLink",i.root.post()),r.xb(1),r.hc("src",i.postImage(t),r.yc),r.xb(3),r.hc("routerLink",i.root.post()),r.xb(1),r.Ic(t.title),r.xb(2),r.Ic(t.date)}}let x=(()=>{class t{constructor(t){this.root=t,this.posts=[]}postImage(t){return t.image.replace(/^\.jpg$/,"-thumbnail.jpg")}}return t.\u0275fac=function(e){return new(e||t)(r.Jb(y.a))},t.\u0275cmp=r.Db({type:t,selectors:[["app-widget-posts"]],inputs:{posts:"posts"},decls:5,vars:1,consts:[[1,"widget-posts","widget"],[1,"widget__title"],[1,"widget-posts__list"],["class","widget-posts__item",4,"ngFor","ngForOf"],[1,"widget-posts__item"],[1,"widget-posts__image"],[3,"routerLink"],["alt","",3,"src"],[1,"widget-posts__info"],[1,"widget-posts__name"],[1,"widget-posts__date"]],template:function(t,e){1&t&&(r.Pb(0,"div",0),r.Pb(1,"h4",1),r.Hc(2,"Latest Posts"),r.Ob(),r.Pb(3,"div",2),r.Fc(4,H,10,5,"div",3),r.Ob(),r.Ob()),2&t&&(r.xb(4),r.hc("ngForOf",e.posts))},directives:[s.k,a.h],styles:[""]}),t})(),q=(()=>{class t{constructor(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=r.Db({type:t,selectors:[["app-widget-newsletter"]],decls:11,vars:0,consts:[[1,"widget-newsletter","widget"],[1,"widget-newsletter__title"],[1,"widget-newsletter__text"],["action","",1,"widget-newsletter__form"],["for","widget-newsletter-email",1,"sr-only"],["id","widget-newsletter-email","type","text","placeholder","Email Address",1,"form-control"],["type","submit",1,"btn","btn-primary","mt-3"]],template:function(t,e){1&t&&(r.Pb(0,"div",0),r.Pb(1,"h4",1),r.Hc(2,"Our Newsletter"),r.Ob(),r.Pb(3,"div",2),r.Hc(4," Phasellus eleifend sapien felis, at sollicitudin arcu semper mattis. Mauris quis mi quis ipsum tristique lobortis. Nulla vitae est blandit rutrum. "),r.Ob(),r.Pb(5,"form",3),r.Pb(6,"label",4),r.Hc(7,"Email Address"),r.Ob(),r.Kb(8,"input",5),r.Pb(9,"button",6),r.Hc(10,"Subscribe"),r.Ob(),r.Ob(),r.Ob())},directives:[P.t,P.l,P.m],styles:[""]}),t})();function k(t,e){if(1&t&&(r.Pb(0,"li",4),r.Pb(1,"div",5),r.Pb(2,"a",6),r.Hc(3),r.Ob(),r.Ob(),r.Pb(4,"div",7),r.Hc(5),r.Ob(),r.Pb(6,"div",8),r.Pb(7,"div",9),r.Hc(8),r.Ob(),r.Pb(9,"div",10),r.Hc(10,"On "),r.Pb(11,"a",11),r.Hc(12),r.Ob(),r.Ob(),r.Ob(),r.Ob()),2&t){const t=e.$implicit;r.xb(3),r.Ic(t.author),r.xb(2),r.Ic(t.text),r.xb(3),r.Ic(t.date),r.xb(3),r.ic("title",t.postTitle),r.xb(1),r.Ic(t.postTitle)}}let I=(()=>{class t{constructor(){this.comments=[]}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=r.Db({type:t,selectors:[["app-widget-comments"]],inputs:{comments:"comments"},decls:5,vars:1,consts:[[1,"widget-comments","widget"],[1,"widget__title"],[1,"widget-comments__list"],["class","widget-comments__item",4,"ngFor","ngForOf"],[1,"widget-comments__item"],[1,"widget-comments__author"],["routerLink","./"],[1,"widget-comments__content"],[1,"widget-comments__meta"],[1,"widget-comments__date"],[1,"widget-comments__name"],["routerLink","./",3,"title"]],template:function(t,e){1&t&&(r.Pb(0,"div",0),r.Pb(1,"h4",1),r.Hc(2,"Latest Comments"),r.Ob(),r.Pb(3,"ul",2),r.Fc(4,k,13,5,"li",3),r.Ob(),r.Ob()),2&t&&(r.xb(4),r.hc("ngForOf",e.comments))},directives:[s.k,a.h],styles:[""]}),t})(),K=(()=>{class t{constructor(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=r.Db({type:t,selectors:[["app-widget-tags"]],decls:29,vars:0,consts:[[1,"widget-tags","widget"],[1,"widget__title"],[1,"tags","tags--lg"],[1,"tags__list"],["routerLink","./"]],template:function(t,e){1&t&&(r.Pb(0,"div",0),r.Pb(1,"h4",1),r.Hc(2,"Tags Cloud"),r.Ob(),r.Pb(3,"div",2),r.Pb(4,"div",3),r.Pb(5,"a",4),r.Hc(6,"Promotion"),r.Ob(),r.Pb(7,"a",4),r.Hc(8,"Power Tool"),r.Ob(),r.Pb(9,"a",4),r.Hc(10,"New Arrivals"),r.Ob(),r.Pb(11,"a",4),r.Hc(12,"Screwdriver"),r.Ob(),r.Pb(13,"a",4),r.Hc(14,"Wrench"),r.Ob(),r.Pb(15,"a",4),r.Hc(16,"Mounts"),r.Ob(),r.Pb(17,"a",4),r.Hc(18,"Electrodes"),r.Ob(),r.Pb(19,"a",4),r.Hc(20,"Chainsaws"),r.Ob(),r.Pb(21,"a",4),r.Hc(22,"Manometers"),r.Ob(),r.Pb(23,"a",4),r.Hc(24,"Nails"),r.Ob(),r.Pb(25,"a",4),r.Hc(26,"Air Guns"),r.Ob(),r.Pb(27,"a",4),r.Hc(28,"Cutting Discs"),r.Ob(),r.Ob(),r.Ob(),r.Ob())},directives:[a.h],styles:[""]}),t})(),F=(()=>{class t{constructor(t){this.blog=t,this.position="start",this.posts=n.a,this.categories=[],this.latestComments=u}ngOnInit(){this.blog.getCategories(null,1).subscribe(t=>this.categories=t)}}return t.\u0275fac=function(e){return new(e||t)(r.Jb(g))},t.\u0275cmp=r.Db({type:t,selectors:[["app-sidebar"]],inputs:{position:"position"},decls:17,vars:14,consts:[[1,"block-sidebar__item"],[3,"categories"],[3,"posts"],[3,"comments"]],template:function(t,e){1&t&&(r.Pb(0,"div"),r.Pb(1,"div",0),r.Kb(2,"app-widget-search"),r.Ob(),r.Pb(3,"div",0),r.Kb(4,"app-widget-aboutus"),r.Ob(),r.Pb(5,"div",0),r.Kb(6,"app-widget-categories",1),r.Ob(),r.Pb(7,"div",0),r.Kb(8,"app-widget-posts",2),r.bc(9,"slice"),r.Ob(),r.Pb(10,"div",0),r.Kb(11,"app-widget-newsletter"),r.Ob(),r.Pb(12,"div",0),r.Kb(13,"app-widget-comments",3),r.bc(14,"slice"),r.Ob(),r.Pb(15,"div",0),r.Kb(16,"app-widget-tags"),r.Ob(),r.Ob()),2&t&&(r.Ab("block block-sidebar block-sidebar--position--",e.position,""),r.xb(6),r.hc("categories",e.categories),r.xb(2),r.hc("posts",r.ec(9,6,e.posts,0,3)),r.xb(5),r.hc("comments",r.ec(14,10,e.latestComments,0,3)))},directives:[O,_,w.a,x,q,I,K],pipes:[s.q],styles:[""]}),t})();var N=i("37O+");function D(t,e){1&t&&(r.Pb(0,"div",12),r.Kb(1,"app-sidebar",13),r.Ob())}const C=function(){return{classic:"grid-lg",grid:"grid-nl",list:"list-nl"}};function M(t,e){if(1&t&&(r.Pb(0,"div",14),r.Kb(1,"app-post-card",15),r.Ob()),2&t){const t=e.$implicit,i=r.ac();r.xb(1),r.hc("post",t)("layout",r.kc(2,C)[i.layout])}}function L(t,e){1&t&&(r.Pb(0,"div",16),r.Kb(1,"app-sidebar",17),r.Ob())}const j=function(){return{label:"Home",url:"../../"}},A=function(){return{label:"Blog",url:"../"}},T=function(){return{label:"Latest News",url:""}},$=function(t,e,i){return[t,e,i]};let J=(()=>{class t{constructor(t){this.route=t,this.destroy$=new o.a,this.sidebarPosition="end",this.layout="classic",this.posts=n.a,this.route.data.pipe(Object(c.a)(this.destroy$)).subscribe(t=>{this.sidebarPosition=t.sidebarPosition,this.layout=t.layout})}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}}return t.\u0275fac=function(e){return new(e||t)(r.Jb(a.a))},t.\u0275cmp=r.Db({type:t,selectors:[["app-category"]],decls:13,vars:18,consts:[[3,"header","breadcrumbs"],[1,"container"],[1,"row"],["class","col-12 col-lg-4 order-1 order-lg-0",4,"ngIf"],[1,"col-12","col-lg-8"],[1,"block"],[1,"posts-view"],[1,"posts-list__body"],["class","posts-list__item",4,"ngFor","ngForOf"],[1,"posts-view__pagination"],[3,"current","siblings","total"],["class","col-12 col-lg-4",4,"ngIf"],[1,"col-12","col-lg-4","order-1","order-lg-0"],["position","start"],[1,"posts-list__item"],[3,"post","layout"],[1,"col-12","col-lg-4"],["position","end"]],template:function(t,e){1&t&&(r.Kb(0,"app-page-header",0),r.Pb(1,"div",1),r.Pb(2,"div",2),r.Fc(3,D,2,0,"div",3),r.Pb(4,"div",4),r.Pb(5,"div",5),r.Pb(6,"div",6),r.Pb(7,"div"),r.Pb(8,"div",7),r.Fc(9,M,2,3,"div",8),r.Ob(),r.Ob(),r.Pb(10,"div",9),r.Kb(11,"app-pagination",10),r.Ob(),r.Ob(),r.Ob(),r.Ob(),r.Fc(12,L,2,0,"div",11),r.Ob(),r.Ob()),2&t&&(r.hc("header","Latest News")("breadcrumbs",r.nc(14,$,r.kc(11,j),r.kc(12,A),r.kc(13,T))),r.xb(3),r.hc("ngIf","start"===e.sidebarPosition),r.xb(4),r.Ab("posts-view__list posts-list posts-list--layout--",e.layout,""),r.xb(2),r.hc("ngForOf",e.posts),r.xb(2),r.hc("current",1)("siblings",2)("total",10),r.xb(1),r.hc("ngIf","end"===e.sidebarPosition))},directives:[l.a,s.l,s.k,b.a,F,N.a],styles:[""]}),t})();const E={count:4,items:[{avatar:"assets/images/avatars/avatar-1",author:"Jessica Moore",date:"November 30, 2018",text:"Aliquam ullamcorper elementum sagittis. Etiam lacus lacus, mollis in mattis in, vehicula eu nulla. Nulla nec tellus pellentesque.",children:[{avatar:"assets/images/avatars/avatar-2",author:"Adam Taylor",date:"December 4, 2018",text:"Ut vitae finibus nisl, suscipit porttitor urna. Integer efficitur efficitur velit non pulvinar. Aliquam blandit volutpat arcu vel tristique. Integer commodo ligula id augue tincidunt faucibus."},{avatar:"assets/images/avatars/avatar-3",author:"Helena Garcia",date:"December 12, 2018",text:"Suspendisse dignissim luctus metus vitae aliquam. Vestibulum sem odio, ullamcorper a imperdiet a, tincidunt sed lacus. Sed magna felis, consequat a erat ut, rutrum finibus odio."}]},{avatar:"assets/images/avatars/avatar-4",author:"Ryan Ford",date:"December 5, 2018",text:"Nullam at varius sapien. Sed sit amet condimentum elit."}]};var S=i("g+fx");function V(t,e){if(1&t&&(r.Pb(0,"div",14),r.Kb(1,"app-comments-list",15),r.Ob()),2&t){const t=r.ac().$implicit,e=r.ac();r.xb(1),r.hc("comments",t.children)("level",e.level+1)}}function B(t,e){if(1&t&&(r.Pb(0,"li",1),r.Pb(1,"div",2),r.Pb(2,"div",3),r.Pb(3,"a",4),r.Kb(4,"img",5),r.Ob(),r.Ob(),r.Pb(5,"div",6),r.Pb(6,"div",7),r.Pb(7,"div",8),r.Pb(8,"a",4),r.Hc(9),r.Ob(),r.Ob(),r.Pb(10,"div",9),r.Pb(11,"button",10),r.Hc(12,"Reply"),r.Ob(),r.Ob(),r.Ob(),r.Pb(13,"div",11),r.Hc(14),r.Ob(),r.Pb(15,"div",12),r.Hc(16),r.Ob(),r.Ob(),r.Ob(),r.Fc(17,V,2,2,"div",13),r.Ob()),2&t){const t=e.$implicit;r.xb(4),r.hc("src",t.avatar+".jpg",r.yc),r.xb(5),r.Ic(t.author),r.xb(5),r.Ic(t.text),r.xb(2),r.Ic(t.date),r.xb(1),r.hc("ngIf",null==t.children?null:t.children.length)}}let G=(()=>{class t{constructor(){this.comments=[],this.level=0}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=r.Db({type:t,selectors:[["app-comments-list"]],inputs:{comments:"comments",level:"level"},decls:2,vars:4,consts:[["class","comments-list__item",4,"ngFor","ngForOf"],[1,"comments-list__item"],[1,"comment"],[1,"comment__avatar"],["href",""],["alt","",3,"src"],[1,"comment__content"],[1,"comment__header"],[1,"comment__author"],[1,"comment__reply"],["type","button",1,"btn","btn-xs","btn-light"],[1,"comment__text"],[1,"comment__date"],["class","comment-list__children",4,"ngIf"],[1,"comment-list__children"],[3,"comments","level"]],template:function(t,e){1&t&&(r.Pb(0,"ol"),r.Fc(1,B,18,5,"li",0),r.Ob()),2&t&&(r.Ab("comments-list comments-list--level--",e.level,""),r.xb(1),r.hc("ngForOf",e.comments))},directives:[s.k,s.l,t],styles:[""]}),t})();function Q(t,e){if(1&t&&(r.Pb(0,"div",40),r.Pb(1,"div",41),r.Pb(2,"a",42),r.Kb(3,"img",43),r.Ob(),r.Ob(),r.Pb(4,"div",44),r.Pb(5,"div",45),r.Pb(6,"a",42),r.Hc(7),r.Ob(),r.Ob(),r.Pb(8,"div",46),r.Hc(9),r.Ob(),r.Ob(),r.Ob()),2&t){const t=e.$implicit;r.xb(3),r.hc("src",t.image,r.yc),r.xb(4),r.Ic(t.title),r.xb(2),r.Ic(t.date)}}const W=function(t){return{"typography--expanded":t}};let U=(()=>{class t{constructor(){this.layout="classic",this.posts=n.a,this.comments=E}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=r.Db({type:t,selectors:[["app-post-details"]],inputs:{layout:"layout"},decls:142,vars:16,consts:[[1,"post-header__categories"],["routerLink","../"],[1,"post-header__title"],[1,"post-header__meta"],[1,"post-header__meta-item"],["href",""],[1,"post__featured"],["src","assets/images/posts/post-featured.jpg","alt",""],[1,"post__content","typography",3,"ngClass"],["href","#"],[1,"post__footer"],[1,"post__tags-share-buttons"],[1,"post__tags","tags"],[1,"tags__list"],["buttons","facebook,twitter,pinterest",1,"post__share-buttons"],[1,"post-author"],[1,"post-author__avatar"],["src","assets/images/avatars/avatar-1.jpg","alt",""],[1,"post-author__info"],[1,"post-author__name"],[1,"post-author__about"],[1,"post__section"],[1,"post__section-title"],[1,"related-posts"],[1,"related-posts__list"],["class","related-posts__item post-card post-card--layout--related",4,"ngFor","ngForOf"],[3,"comments"],[1,"form-row"],[1,"form-group","col-md-4"],["for","comment-first-name"],["type","text","id","comment-first-name","placeholder","First Name",1,"form-control"],["for","comment-last-name"],["type","text","id","comment-last-name","placeholder","Last Name",1,"form-control"],["for","comment-email"],["type","email","id","comment-email","placeholder","Email Address",1,"form-control"],[1,"form-group"],["for","comment-content"],["id","comment-content","rows","6",1,"form-control"],[1,"form-group","mt-4"],["type","submit",1,"btn","btn-primary","btn-lg"],[1,"related-posts__item","post-card","post-card--layout--related"],[1,"post-card__image"],["routerLink","./"],["alt","",3,"src"],[1,"post-card__info"],[1,"post-card__name"],[1,"post-card__date"]],template:function(t,e){1&t&&(r.Pb(0,"div"),r.Pb(1,"div"),r.Pb(2,"div",0),r.Pb(3,"a",1),r.Hc(4,"Latest news"),r.Ob(),r.Ob(),r.Pb(5,"h1",2),r.Hc(6,"Morbi Interdum Velit Quis Magna Placerat Lobortis Eget"),r.Ob(),r.Pb(7,"div",3),r.Pb(8,"div",4),r.Hc(9,"By "),r.Pb(10,"a",5),r.Hc(11,"Jessica Moore"),r.Ob(),r.Ob(),r.Pb(12,"div",4),r.Pb(13,"a",5),r.Hc(14,"November 30, 2018"),r.Ob(),r.Ob(),r.Pb(15,"div",4),r.Pb(16,"a",5),r.Hc(17,"4 Comments"),r.Ob(),r.Ob(),r.Ob(),r.Ob(),r.Pb(18,"div",6),r.Pb(19,"a",5),r.Kb(20,"img",7),r.Ob(),r.Ob(),r.Pb(21,"div",8),r.Pb(22,"p"),r.Hc(23," Vestibulum sagittis justo sit amet nisl semper, et pulvinar elit maximus. Morbi interdum velit quis magna placerat lobortis eget pharetra magna. Nulla tristique sollicitudin turpis, eget maximus risus faucibus non. Nulla vestibulum ipsum risus, vitae maximus nunc bibendum quis. "),r.Ob(),r.Pb(24,"p"),r.Hc(25," raesent eu consequat nibh. Quisque "),r.Pb(26,"i"),r.Hc(27,"ullamcorper"),r.Ob(),r.Hc(28,", augue eu fringilla sodales, leo metus volutpat risus, at suscipit ipsum diam eget sem. Maecenas dictum elit in enim molestie, "),r.Pb(29,"a",5),r.Hc(30,"vel sollicitudin erat ultricies"),r.Ob(),r.Hc(31,". Sed risus tellus, molestie finibus dui quis, suscipit consequat ex. "),r.Ob(),r.Pb(32,"blockquote"),r.Pb(33,"p"),r.Hc(34," Sed a dictum elit. In iaculis porttitor luctus. Maecenas ultricies dolor et semper placerat. Proin at lectus felis. "),r.Ob(),r.Pb(35,"p"),r.Pb(36,"cite"),r.Hc(37,"John Mcarthy"),r.Ob(),r.Ob(),r.Ob(),r.Pb(38,"p"),r.Hc(39," Vivamus in nisi at turpis rhoncus feugiat. Mauris scelerisque non ante et ultrices. Donec sit amet sem lobortis, ullamcorper felis at, finibus sem. Curabitur tincidunt neque nunc. "),r.Ob(),r.Pb(40,"h3"),r.Hc(41,"Nam Eget Blandit Diam"),r.Ob(),r.Pb(42,"p"),r.Hc(43," Quisque semper magna eget libero maximus, a sollicitudin nunc hendrerit. Cras efficitur, ante vitae fringilla rutrum, mi tortor dapibus metus, in egestas metus erat sit amet orci. Ut faucibus non ante dapibus efficitur. Nam eget blandit diam, imperdiet condimentum neque. Donec risus nisi, aliquet a commodo ac, elementum vitae leo. "),r.Ob(),r.Pb(44,"p"),r.Hc(45," Vestibulum sagittis justo sit amet nisl semper, et pulvinar elit maximus. Morbi interdum velit quis magna placerat lobortis eget pharetra magna. "),r.Ob(),r.Pb(46,"p"),r.Pb(47,"strong"),r.Hc(48,"Nulla fringilla:"),r.Ob(),r.Pb(49,"a",9),r.Hc(50,"Donec aliquet at felis et dignissim"),r.Ob(),r.Ob(),r.Pb(51,"figure"),r.Pb(52,"a",5),r.Kb(53,"img",7),r.Ob(),r.Pb(54,"figcaption"),r.Hc(55,"Nunc viverra, dui nec commodo dignissim, libero arcu."),r.Ob(),r.Ob(),r.Pb(56,"p"),r.Hc(57," Vestibulum non varius lectus. Cras vel elit id ligula laoreet imperdiet. Mauris quis laoreet velit. Suspendisse sed velit nec ante facilisis pharetra. "),r.Ob(),r.Pb(58,"p"),r.Hc(59," Phasellus ut elit vestibulum, dignissim mi non, suscipit ex. Praesent eu consequat nibh. Quisque ullamcorper, augue eu fringilla sodales, leo metus volutpat risus, "),r.Pb(60,"a",9),r.Hc(61,"at suscipit ipsum diam eget sem"),r.Ob(),r.Hc(62,". Maecenas dictum elit in enim molestie, vel sollicitudin erat ultricies. Sed risus tellus, molestie finibus dui quis, suscipit consequat ex. "),r.Ob(),r.Kb(63,"hr"),r.Pb(64,"h2"),r.Hc(65,"Nunc Dapibus Varius Ligula"),r.Ob(),r.Pb(66,"p"),r.Hc(67," Maecenas ultrices arcu ut feugiat semper. Praesent dictum tincidunt justo, ac tincidunt ante fermentum at. Vestibulum non varius lectus. Cras vel elit id ligula laoreet imperdiet. Mauris quis laoreet velit. Suspendisse sed velit nec ante facilisis pharetra. Duis vitae fermentum elit. Integer ac mattis elit. "),r.Ob(),r.Pb(68,"p"),r.Hc(69," Mauris scelerisque non ante et ultrices. Donec sit amet sem lobortis: "),r.Ob(),r.Pb(70,"ol"),r.Pb(71,"li"),r.Hc(72,"Duis "),r.Pb(73,"strong"),r.Hc(74,"finibus imperdiet ultricies"),r.Ob(),r.Hc(75,". Donec vel pretium turpis. In auctor euismod posuere."),r.Ob(),r.Pb(76,"li"),r.Hc(77,"Praesent dictum tincidunt justo, ac tincidunt ante fermentum at. Vestibulum non varius lectus. Cras vel elit id ligula laoreet imperdiet."),r.Ob(),r.Pb(78,"li"),r.Pb(79,"strong"),r.Hc(80,"In iaculis porttitor luctus"),r.Ob(),r.Hc(81,". Maecenas ultricies dolor et semper placerat. Proin at lectus felis. Quisque dapibus auctor justo id dictum."),r.Ob(),r.Ob(),r.Pb(82,"p"),r.Hc(83," Ut faucibus non ante dapibus efficitur. Nam eget blandit diam, imperdiet condimentum neque. Donec risus nisi, aliquet a commodo ac, elementum vitae leo. "),r.Ob(),r.Ob(),r.Pb(84,"div",10),r.Pb(85,"div",11),r.Pb(86,"div",12),r.Pb(87,"div",13),r.Pb(88,"a",5),r.Hc(89,"Promotion"),r.Ob(),r.Pb(90,"a",5),r.Hc(91,"Power Tool"),r.Ob(),r.Pb(92,"a",5),r.Hc(93,"Wrench"),r.Ob(),r.Pb(94,"a",5),r.Hc(95,"Electrodes"),r.Ob(),r.Ob(),r.Ob(),r.Kb(96,"app-share-buttons",14),r.Ob(),r.Pb(97,"div",15),r.Pb(98,"div",16),r.Pb(99,"a",5),r.Kb(100,"img",17),r.Ob(),r.Ob(),r.Pb(101,"div",18),r.Pb(102,"div",19),r.Pb(103,"a",5),r.Hc(104,"Jessica Moore"),r.Ob(),r.Ob(),r.Pb(105,"div",20),r.Hc(106," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur suscipit suscipit mi, non tempor nulla finibus eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. "),r.Ob(),r.Ob(),r.Ob(),r.Ob(),r.Pb(107,"section",21),r.Pb(108,"h4",22),r.Hc(109,"Related Posts"),r.Ob(),r.Pb(110,"div",23),r.Pb(111,"div",24),r.Fc(112,Q,10,3,"div",25),r.bc(113,"slice"),r.Ob(),r.Ob(),r.Ob(),r.Pb(114,"section",21),r.Pb(115,"h4",22),r.Hc(116),r.Ob(),r.Kb(117,"app-comments-list",26),r.Ob(),r.Pb(118,"section",21),r.Pb(119,"h4",22),r.Hc(120,"Write A Comment"),r.Ob(),r.Pb(121,"form"),r.Pb(122,"div",27),r.Pb(123,"div",28),r.Pb(124,"label",29),r.Hc(125,"First Name"),r.Ob(),r.Kb(126,"input",30),r.Ob(),r.Pb(127,"div",28),r.Pb(128,"label",31),r.Hc(129,"Last Name"),r.Ob(),r.Kb(130,"input",32),r.Ob(),r.Pb(131,"div",28),r.Pb(132,"label",33),r.Hc(133,"Email Address"),r.Ob(),r.Kb(134,"input",34),r.Ob(),r.Ob(),r.Pb(135,"div",35),r.Pb(136,"label",36),r.Hc(137,"Comment"),r.Ob(),r.Kb(138,"textarea",37),r.Ob(),r.Pb(139,"div",38),r.Pb(140,"button",39),r.Hc(141,"Post Comment"),r.Ob(),r.Ob(),r.Ob(),r.Ob(),r.Ob()),2&t&&(r.Ab("block post post--layout--",e.layout,""),r.xb(1),r.Ab("post__header post-header post-header--layout--",e.layout,""),r.xb(20),r.hc("ngClass",r.lc(14,W,"full"===e.layout)),r.xb(91),r.hc("ngForOf",r.ec(113,10,e.posts,0,2)),r.xb(4),r.Jc("Comments (",e.comments.count,")"),r.xb(1),r.hc("comments",e.comments.items))},directives:[a.h,s.j,S.a,s.k,G],pipes:[s.q],styles:[""]}),t})();function X(t,e){1&t&&(r.Pb(0,"div",8),r.Kb(1,"app-sidebar",9),r.Ob())}function R(t,e){1&t&&(r.Pb(0,"div",10),r.Kb(1,"app-sidebar",11),r.Ob())}function z(t,e){if(1&t&&(r.Nb(0),r.Pb(1,"div",3),r.Fc(2,X,2,0,"div",4),r.Pb(3,"div",5),r.Kb(4,"app-post-details",6),r.Ob(),r.Fc(5,R,2,0,"div",7),r.Ob(),r.Mb()),2&t){const t=r.ac();r.xb(2),r.hc("ngIf","start"===t.sidebarPosition),r.xb(3),r.hc("ngIf","end"===t.sidebarPosition)}}function Y(t,e){1&t&&(r.Nb(0),r.Pb(1,"div",12),r.Pb(2,"div",13),r.Kb(3,"app-post-details",14),r.Ob(),r.Ob(),r.Mb())}const Z=function(){return{label:"Home",url:"../../"}},tt=function(){return{label:"Blog",url:"../"}},et=function(){return{label:"Latest News",url:""}},it=function(t,e,i){return[t,e,i]};let st=(()=>{class t{constructor(t){this.route=t,this.destroy$=new o.a,this.sidebarPosition="end",this.layout="classic",this.route.data.pipe(Object(c.a)(this.destroy$)).subscribe(t=>{this.sidebarPosition=t.sidebarPosition,this.layout=t.layout})}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}}return t.\u0275fac=function(e){return new(e||t)(r.Jb(a.a))},t.\u0275cmp=r.Db({type:t,selectors:[["app-post"]],decls:4,vars:10,consts:[[3,"breadcrumbs"],[1,"container"],[4,"ngIf"],[1,"row"],["class","col-12 col-lg-4 order-1 order-lg-0",4,"ngIf"],[1,"col-12","col-lg-8"],["layout","classic"],["class","col-12 col-lg-4",4,"ngIf"],[1,"col-12","col-lg-4","order-1","order-lg-0"],["position","start"],[1,"col-12","col-lg-4"],["position","end"],[1,"row","justify-content-center"],[1,"col-md-12","col-lg-9","col-xl-8"],["layout","full"]],template:function(t,e){1&t&&(r.Kb(0,"app-page-header",0),r.Pb(1,"div",1),r.Fc(2,z,6,2,"ng-container",2),r.Fc(3,Y,4,0,"ng-container",2),r.Ob()),2&t&&(r.hc("breadcrumbs",r.nc(6,it,r.kc(3,Z),r.kc(4,tt),r.kc(5,et))),r.xb(2),r.hc("ngIf","classic"===e.layout),r.xb(1),r.hc("ngIf","full"===e.layout))},directives:[l.a,s.l,U,F],styles:[""]}),t})();const at=[{path:"",pathMatch:"full",redirectTo:"category-classic"},{path:"category-classic",component:J,data:{sidebarPosition:"end",layout:"classic"}},{path:"category-grid",component:J,data:{sidebarPosition:"end",layout:"grid"}},{path:"category-list",component:J,data:{sidebarPosition:"end",layout:"list"}},{path:"category-left-sidebar",component:J,data:{sidebarPosition:"start",layout:"classic"}},{path:"post-classic",component:st,data:{sidebarPosition:"end",layout:"classic"}},{path:"post-full",component:st,data:{layout:"full"}}];let ot=(()=>{class t{}return t.\u0275mod=r.Hb({type:t}),t.\u0275inj=r.Gb({factory:function(e){return new(e||t)},imports:[[a.i.forChild(at)],a.i]}),t})();var ct=i("PCNd"),nt=i("6t2i");let rt=(()=>{class t{}return t.\u0275mod=r.Hb({type:t}),t.\u0275inj=r.Gb({factory:function(e){return new(e||t)},imports:[[s.c,ot,ct.a,nt.a]]}),t})()}}]);