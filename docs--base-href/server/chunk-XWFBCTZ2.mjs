import './polyfills.server.mjs';
import{a as y}from"./chunk-YCH5PPUM.mjs";import{Aa as f,Ba as b,Ca as r,Da as o,Ea as g,F as l,I as p,Ra as d,Sa as m,Ya as h,_a as x,ac as S,ea as u,ha as i,qa as v,ua as c}from"./chunk-XQOF6UTV.mjs";import"./chunk-VVCT4QZE.mjs";var B=(t,e)=>e._id,k=t=>["/details",t];function C(t,e){if(t&1&&(r(0,"div",3)(1,"div",4),g(2,"img",5),r(3,"div",6)(4,"h2",7),d(5),o(),r(6,"p"),d(7),o()()()()),t&2){let a=e.$implicit;i(),c("routerLink",x(5,k,a._id)),i(),c("src",a.image,u)("alt",a.name),i(3),m(a.name),i(2),m(a.slug)}}var T=(()=>{let e=class e{constructor(){this._BrandsService=l(y),this.brands=v([])}ngOnInit(){this.brandsUnsub=this._BrandsService.getBrands().subscribe({next:n=>{console.log(n.data),this.brands.set(n.data)},error:n=>{console.log(n)}})}ngOnDestroy(){this.brandsUnsub?.unsubscribe()}};e.\u0275fac=function(s){return new(s||e)},e.\u0275cmp=p({type:e,selectors:[["app-brands"]],standalone:!0,features:[h],decls:6,vars:0,consts:[[1,"my-2"],[1,"h2","text-main"],[1,"row","g-3"],[1,"col-md-4"],[1,"cr","card",3,"routerLink"],[1,"card-mg",3,"src","alt"],[1,"card-body"],[1,"h3","text-main"]],template:function(s,_){s&1&&(r(0,"section",0)(1,"h1",1),d(2,"Popular Brands:"),o(),r(3,"div",2),f(4,C,8,7,"div",3,B),o()()),s&2&&(i(4),b(_.brands()))},dependencies:[S]});let t=e;return t})();export{T as BrandsComponent};
