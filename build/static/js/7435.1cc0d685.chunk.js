"use strict";(self.webpackChunkmantis_material_react=self.webpackChunkmantis_material_react||[]).push([[7435],{67435:function(s,e,r){r.r(e),r.d(e,{default:function(){return Q}});var n=r(74165),i=r(15861),t=r(29439),a=r(47313),o=r(9019),d=r(42832),c=r(15103),l=r(49914),u=r(41727),x=r(15480),p=r(57829),Z=r(61113),m=r(48310),h=r(67216),j=r(74748),w=r(83213),f=r(69099),g=r(89688),v=r(94044),b=r(18530);function y(s){return new RegExp("^(?=.*[0-9]).+$").test(s)}function C(s){return new RegExp("^(?=.*[a-z]).+$").test(s)}function P(s){return new RegExp("^(?=.*[A-Z]).+$").test(s)}function S(s){return new RegExp("^(?=.*[-+_!@#$%^&*.,?]).+$").test(s)}function z(s){return s.length>7}var E=r(21933),k=r(35604),_=r(31741),q=r(44874),M=r(1413),R={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"}}]},name:"check",theme:"outlined"},B=r(20262),L=function(s,e){return a.createElement(B.Z,(0,M.Z)((0,M.Z)({},s),{},{ref:e,icon:R}))};L.displayName="CheckOutlined";var $=a.forwardRef(L),A=r(9751),F=r(71325),O=r(88298),D=r(54285),N=r(18682),I=r(46417),J=function(s){var e=s.setStatus,r=s.setSubmitting,n=s.setErrors,i=s.resetForm,t=(0,D.Z)(),o=t.updateStatus,d=t.updateError,c=t.initUpdatePassword;return(0,a.useEffect)((function(){o==O.J_.succeed?((0,N.WI)((0,b.ss)({open:!0,message:(0,I.jsx)(F.Z,{id:"password-update-success"}),variant:"alert",alert:{color:"success"},close:!1})),i(),e({success:!0}),r(!0),c()):o==O.J_.error&&(e({success:!1}),n({submit:(0,I.jsx)(F.Z,{id:d})}),r(!1))}),[o]),null},Q=function(){var s=(0,a.useState)(!1),e=(0,t.Z)(s,2),r=e[0],b=e[1],M=(0,a.useState)(!1),R=(0,t.Z)(M,2),B=R[0],L=R[1],O=(0,a.useState)(!1),N=(0,t.Z)(O,2),Q=N[0],H=N[1],V=function(){b(!r)},U=function(){L(!B)},W=function(){H(!Q)},G=function(s){s.preventDefault()},K=(0,D.Z)().updatePassword;return(0,I.jsx)(g.Z,{title:(0,I.jsx)(F.Z,{id:"change-password"}),children:(0,I.jsx)(k.J9,{initialValues:{old:"",password:"",confirm:"",submit:null},validationSchema:E.Ry().shape({old:E.Z_().required((0,I.jsx)(F.Z,{id:"old-password-required"})),password:E.Z_().required((0,I.jsx)(F.Z,{id:"new-password-required"})).matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,(0,I.jsx)(F.Z,{id:"password-criteria"})),confirm:E.Z_().required((0,I.jsx)(F.Z,{id:"confirmed-password-required"})).test("confirm",(0,I.jsx)(F.Z,{id:"password-match"}),(function(s,e){return e.parent.password===s}))}),onSubmit:function(){var s=(0,i.Z)((0,n.Z)().mark((function s(e,r){var i,t,a;return(0,n.Z)().wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return i=r.setErrors,t=r.setStatus,a=r.setSubmitting,s.prev=1,s.next=4,K(e.old,e.password);case 4:s.next=11;break;case 6:s.prev=6,s.t0=s.catch(1),t({success:!1}),i({submit:s.t0.message}),a(!1);case 11:case"end":return s.stop()}}),s,null,[[1,6]])})));return function(e,r){return s.apply(this,arguments)}}(),children:function(s){var e=s.errors,n=s.handleBlur,i=s.handleChange,t=s.handleSubmit,a=s.resetForm,g=s.setErrors,b=s.setStatus,E=s.setSubmitting,k=s.isSubmitting,M=s.touched,R=s.values;return(0,I.jsxs)("form",{noValidate:!0,onSubmit:t,children:[(0,I.jsxs)(o.ZP,{container:!0,spacing:3,children:[(0,I.jsxs)(o.ZP,{item:!0,container:!0,spacing:3,xs:12,sm:6,children:[(0,I.jsx)(o.ZP,{item:!0,xs:12,children:(0,I.jsxs)(d.Z,{spacing:1.25,children:[(0,I.jsx)(c.Z,{htmlFor:"password-old",children:(0,I.jsx)(F.Z,{id:"old-password"})}),(0,I.jsx)(l.Z,{id:"password-old",type:r?"text":"password",value:R.old,name:"old",onBlur:n,onChange:i,endAdornment:(0,I.jsx)(u.Z,{position:"end",children:(0,I.jsx)(v.Z,{"aria-label":"toggle password visibility",onClick:V,onMouseDown:G,edge:"end",size:"large",color:"secondary",children:r?(0,I.jsx)(_.Z,{}):(0,I.jsx)(q.Z,{})})}),inputProps:{}}),M.old&&e.old&&(0,I.jsx)(x.Z,{error:!0,id:"password-old-helper",children:e.old})]})}),(0,I.jsx)(o.ZP,{item:!0,xs:12,children:(0,I.jsxs)(d.Z,{spacing:1.25,children:[(0,I.jsx)(c.Z,{htmlFor:"password-password",children:(0,I.jsx)(F.Z,{id:"new-password"})}),(0,I.jsx)(l.Z,{id:"password-password",type:B?"text":"password",value:R.password,name:"password",onBlur:n,onChange:i,endAdornment:(0,I.jsx)(u.Z,{position:"end",children:(0,I.jsx)(v.Z,{"aria-label":"toggle password visibility",onClick:U,onMouseDown:G,edge:"end",size:"large",color:"secondary",children:B?(0,I.jsx)(_.Z,{}):(0,I.jsx)(q.Z,{})})}),inputProps:{}}),M.password&&e.password&&(0,I.jsx)(x.Z,{error:!0,id:"password-password-helper",children:e.password})]})}),(0,I.jsx)(o.ZP,{item:!0,xs:12,children:(0,I.jsxs)(d.Z,{spacing:1.25,children:[(0,I.jsx)(c.Z,{htmlFor:"password-confirm",children:(0,I.jsx)(F.Z,{id:"confirmed-password"})}),(0,I.jsx)(l.Z,{id:"password-confirm",type:Q?"text":"password",value:R.confirm,name:"confirm",onBlur:n,onChange:i,endAdornment:(0,I.jsx)(u.Z,{position:"end",children:(0,I.jsx)(v.Z,{"aria-label":"toggle password visibility",onClick:W,onMouseDown:G,edge:"end",size:"large",color:"secondary",children:Q?(0,I.jsx)(_.Z,{}):(0,I.jsx)(q.Z,{})})}),inputProps:{}}),M.confirm&&e.confirm&&(0,I.jsx)(x.Z,{error:!0,id:"password-confirm-helper",children:e.confirm})]})})]}),(0,I.jsx)(o.ZP,{item:!0,xs:12,sm:6,children:(0,I.jsxs)(p.Z,{sx:{p:{xs:0,sm:2,md:4,lg:5}},children:[(0,I.jsx)(Z.Z,{variant:"h5",children:(0,I.jsx)(F.Z,{id:"new-password-contains"})}),(0,I.jsxs)(m.Z,{sx:{p:0,mt:1},children:[(0,I.jsxs)(h.ZP,{divider:!0,children:[(0,I.jsx)(j.Z,{sx:{color:z(R.password)?"success.main":"inherit"},children:z(R.password)?(0,I.jsx)($,{}):(0,I.jsx)(A.Z,{})}),(0,I.jsx)(w.Z,{primary:(0,I.jsx)(F.Z,{id:"criteria-caracter-number"})})]}),(0,I.jsxs)(h.ZP,{divider:!0,children:[(0,I.jsx)(j.Z,{sx:{color:C(R.password)?"success.main":"inherit"},children:C(R.password)?(0,I.jsx)($,{}):(0,I.jsx)(A.Z,{})}),(0,I.jsx)(w.Z,{primary:(0,I.jsx)(F.Z,{id:"criteria-lower-caracter"})})]}),(0,I.jsxs)(h.ZP,{divider:!0,children:[(0,I.jsx)(j.Z,{sx:{color:P(R.password)?"success.main":"inherit"},children:P(R.password)?(0,I.jsx)($,{}):(0,I.jsx)(A.Z,{})}),(0,I.jsx)(w.Z,{primary:(0,I.jsx)(F.Z,{id:"criteria-upper-caracter"})})]}),(0,I.jsxs)(h.ZP,{divider:!0,children:[(0,I.jsx)(j.Z,{sx:{color:y(R.password)?"success.main":"inherit"},children:y(R.password)?(0,I.jsx)($,{}):(0,I.jsx)(A.Z,{})}),(0,I.jsx)(w.Z,{primary:(0,I.jsx)(F.Z,{id:"criteria-number"})})]}),(0,I.jsxs)(h.ZP,{children:[(0,I.jsx)(j.Z,{sx:{color:S(R.password)?"success.main":"inherit"},children:S(R.password)?(0,I.jsx)($,{}):(0,I.jsx)(A.Z,{})}),(0,I.jsx)(w.Z,{primary:(0,I.jsx)(F.Z,{id:"criteria-special-caracter"})})]})]})]})}),e.submit&&(0,I.jsx)(o.ZP,{item:!0,xs:12,children:(0,I.jsx)(x.Z,{error:!0,children:e.submit})}),(0,I.jsx)(o.ZP,{item:!0,xs:12,children:(0,I.jsx)(d.Z,{direction:"row",justifyContent:"flex-end",alignItems:"center",spacing:2,children:(0,I.jsx)(f.Z,{disabled:k||0!==Object.keys(e).length,type:"submit",variant:"contained",children:(0,I.jsx)(F.Z,{id:"save"})})})})]}),(0,I.jsx)(J,{setSubmitting:E,setErrors:g,setStatus:b,resetForm:a})]})}})})}},44874:function(s,e,r){r.d(e,{Z:function(){return d}});var n=r(1413),i=r(47313),t={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"}},{tag:"path",attrs:{d:"M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"}}]},name:"eye-invisible",theme:"outlined"},a=r(20262),o=function(s,e){return i.createElement(a.Z,(0,n.Z)((0,n.Z)({},s),{},{ref:e,icon:t}))};o.displayName="EyeInvisibleOutlined";var d=i.forwardRef(o)},31741:function(s,e,r){r.d(e,{Z:function(){return d}});var n=r(1413),i=r(47313),t={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"}}]},name:"eye",theme:"outlined"},a=r(20262),o=function(s,e){return i.createElement(a.Z,(0,n.Z)((0,n.Z)({},s),{},{ref:e,icon:t}))};o.displayName="EyeOutlined";var d=i.forwardRef(o)},9751:function(s,e,r){r.d(e,{Z:function(){return d}});var n=r(1413),i=r(47313),t={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M904 476H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"}}]},name:"line",theme:"outlined"},a=r(20262),o=function(s,e){return i.createElement(a.Z,(0,n.Z)((0,n.Z)({},s),{},{ref:e,icon:t}))};o.displayName="LineOutlined";var d=i.forwardRef(o)}}]);