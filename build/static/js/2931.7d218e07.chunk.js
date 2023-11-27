"use strict";(self.webpackChunkmantis_material_react=self.webpackChunkmantis_material_react||[]).push([[2931],{72931:function(e,n,r){r.r(n),r.d(n,{NumberFormatCell:function(){return Pe},default:function(){return Fe}});var t=r(1413),s=r(47313),i=r(19860),l=r(42832),a=r(69099),o=r(9019),c=r(77970),d=r(94469),u=r(62870),x=r(89688),h=r(73842),Z=r(43909),j=r(7519),p=r(71325),m=r(45738),g=r(88298),f=r(85554),v=r(96467),b=r(61113),C=r(72495),S=r(26446),w=r(46417);function y(e){var n=e.title,r=e.open,t=e.handleClose;return(0,w.jsx)(d.Z,{open:r,onClose:function(){return t(!1)},keepMounted:!0,TransitionComponent:Z.S,maxWidth:"xs","aria-labelledby":"column-delete-title","aria-describedby":"column-delete-description",children:(0,w.jsx)(v.Z,{sx:{mt:2,my:1},children:(0,w.jsxs)(l.Z,{alignItems:"center",spacing:3.5,children:[(0,w.jsx)(C.Z,{color:"error",sx:{width:72,height:72,fontSize:"1.75rem"},children:(0,w.jsx)(S.Z,{})}),(0,w.jsxs)(l.Z,{spacing:2,children:[(0,w.jsx)(b.Z,{variant:"h4",align:"center",children:(0,w.jsx)(p.Z,{id:"confirm-delete"})}),(0,w.jsxs)(b.Z,{align:"center",children:[(0,w.jsx)(p.Z,{id:"by-delete"}),(0,w.jsxs)(b.Z,{variant:"subtitle1",component:"span",children:[" ",'"',n,'"'," "]}),(0,w.jsx)(p.Z,{id:"by-delete-description"})]})]}),(0,w.jsxs)(l.Z,{direction:"row",spacing:2,sx:{width:1},children:[(0,w.jsx)(a.Z,{fullWidth:!0,onClick:function(){return t(!1)},color:"secondary",variant:"outlined",children:(0,w.jsx)(p.Z,{id:"cancel"})}),(0,w.jsx)(a.Z,{fullWidth:!0,color:"error",variant:"contained",onClick:function(){return t(!0)},autoFocus:!0,children:(0,w.jsx)(p.Z,{id:"delete"})})]})]})})})}var P=r(29439),F=r(33604),k=r(19536),D=r(5178),_=r(15103),H=r(24631),I=r(1550),R=r(6159),T=r(49914),E=r(51405),A=r(83213),M=r(15480),B=r(70024),G=r(4117),N=r(47305),V=r(23208),W=r(67898),z=r(21933),J=r(35604),q=r(94044),Y=r(49125),O=r(76564),U=r(36287),Q=r(18530),K=function(e){var n=e.setValues,r=e.user,t=e.page,i=(0,f.v9)((function(e){return e.account.create})),l=i.createStatus,a=i.createError,o=(0,f.v9)((function(e){return e.account.edit})),c=o.editStatus,d=o.editError,u=(0,f.v9)((function(e){return e.role.list})).roleTab,x=(0,f.I0)();return(0,s.useEffect)((function(){l==g.J_.succeed&&(x((0,Q.ss)({open:!0,message:(0,w.jsx)(p.Z,{id:"add-user-succeed"}),variant:"alert",alert:{color:"success"},close:!1})),x((0,m.t)({page:t,nb:U.iS})),x((0,Y.gG)())),l==g.J_.error&&(x((0,Q.ss)({open:!0,message:(0,w.jsx)(p.Z,{id:a}),variant:"alert",alert:{color:"error"},close:!1})),x((0,Y.gG)()))}),[l]),(0,s.useEffect)((function(){c==g.J_.succeed&&(x((0,Q.ss)({open:!0,message:(0,w.jsx)(p.Z,{id:"edit-user-succeed"}),variant:"alert",alert:{color:"success"},close:!1})),x((0,m.t)({page:t,nb:U.iS})),x((0,O.Ms)())),c==g.J_.error&&(x((0,Q.ss)({open:!0,message:(0,w.jsx)(p.Z,{id:d}),variant:"alert",alert:{color:"error"},close:!1})),x((0,O.Ms)()))}),[c]),(0,s.useEffect)((function(){var e=function(e,n){var r={username:"",email:"",role:null,phone:"",active:!0};if(e&&(r.username=e.username||"",r.email=e.email||"",r.phone=e.phone||"",r.active=e.is_block,e.role)){var t=n.find((function(n){return n.libelle===e.role}));r.role=t||null}return r}(r,u);n(e)}),[r,n]),null},L=r(1955),X=r(5242),$=function(e){var n,r=e.user,i=e.onCancel,c=e.page,d=(0,f.I0)(),u=(0,s.useState)(!1),x=(0,P.Z)(u,2),h=x[0],Z=x[1],j=(0,f.v9)((function(e){return e.role.list})).roleTab,m=!r,g=z.Z_().matches(/^6[5798]\d{7}$/,(0,w.jsx)(p.Z,{id:"invalid-phone"})).required((0,w.jsx)(p.Z,{id:"phone-required"})),U=z.Ry().shape({username:z.Z_().max(255).required((0,w.jsx)(p.Z,{id:"name-required"})),role:z.Ry().required((0,w.jsx)(p.Z,{id:"role-required"})),phone:g,active:z.O7(),email:z.Z_().max(255).email((0,w.jsx)(p.Z,{id:"email-invalid"}))}),Q=(0,J.TA)({validationSchema:U,onSubmit:function(e,n){var t=n.setSubmitting,s=n.resetForm;try{if(r){var l={username:e.username,email:e.email,phone:e.phone,role_pk:e.role.id,pk:r.id,is_block:e.active};d((0,O.Xe)(l))}else{var a={username:e.username,email:e.email,phone:e.phone,role_pk:e.role.id,is_block:e.active};d((0,Y.ig)(a))}s(),t(!1),i()}catch(o){console.error(o)}}}),$=Q.errors,ee=Q.touched,ne=Q.handleSubmit,re=Q.isSubmitting,te=Q.getFieldProps,se=Q.setFieldValue,ie=Q.setValues;return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(J.Hy,{value:Q,children:[(0,w.jsx)(V._,{dateAdapter:W.H,children:(0,w.jsxs)(J.l0,{autoComplete:"off",onSubmit:ne,children:[(0,w.jsx)(F.Z,{children:r?(0,w.jsx)(p.Z,{id:"edit-user"}):(0,w.jsx)(p.Z,{id:"new-user"})}),(0,w.jsx)(k.Z,{}),(0,w.jsx)(v.Z,{sx:{p:2.5},children:(0,w.jsxs)(o.ZP,{container:!0,spacing:3,children:[(0,w.jsxs)(o.ZP,{item:!0,xs:12,md:3,children:[(0,w.jsx)(l.Z,{direction:"row",justifyContent:"center",sx:{mt:3},children:(0,w.jsx)(D.Z,{htmlFor:"change-avtar",sx:{position:"relative",borderRadius:"50%",overflow:"hidden","&:hover .MuiBox-root":{opacity:1},cursor:"pointer"},children:(0,w.jsx)(C.Z,{alt:"Avatar 1",src:X("./avatar-".concat(2,".png")),sx:{width:72,height:72,border:"1px dashed"}})})}),(0,w.jsxs)(o.ZP,{container:!0,alignItems:"center",justifyContent:"center",children:[(0,w.jsx)(o.ZP,{item:!0,sx:{display:"flex",marginRight:1},children:(0,w.jsx)(L.Z,{color:"success",size:10})}),(0,w.jsx)(b.Z,{variant:"subtitle1",children:null===r||void 0===r?void 0:r.role})]})]}),(0,w.jsx)(o.ZP,{item:!0,xs:12,md:8,children:(0,w.jsxs)(o.ZP,{container:!0,spacing:3,children:[(0,w.jsx)(o.ZP,{item:!0,xs:12,children:(0,w.jsxs)(l.Z,{spacing:1.25,children:[(0,w.jsx)(_.Z,{htmlFor:"username",children:(0,w.jsx)(p.Z,{id:"name"})}),(0,w.jsx)(H.Z,(0,t.Z)((0,t.Z)({fullWidth:!0,id:"username"},te("username")),{},{error:Boolean(ee.username&&$.username),helperText:ee.username&&$.username}))]})}),(0,w.jsx)(o.ZP,{item:!0,xs:12,children:(0,w.jsxs)(l.Z,{spacing:1.25,children:[(0,w.jsx)(_.Z,{htmlFor:"email",children:(0,w.jsx)(p.Z,{id:"email"})}),(0,w.jsx)(H.Z,(0,t.Z)((0,t.Z)({fullWidth:!0,id:"email",placeholder:"Enter Customer Email"},te("email")),{},{error:Boolean(ee.email&&$.email),helperText:ee.email&&$.email}))]})}),(0,w.jsx)(o.ZP,{item:!0,xs:12,children:(0,w.jsxs)(l.Z,{spacing:1.25,children:[(0,w.jsx)(_.Z,{htmlFor:"phone",children:(0,w.jsx)(p.Z,{id:"phone"})}),(0,w.jsx)(H.Z,(0,t.Z)((0,t.Z)({fullWidth:!0,id:"phone",type:"number",placeholder:"Enter Customer Number"},te("phone")),{},{error:Boolean(ee.phone&&$.phone),helperText:ee.phone&&$.phone}))]})}),(0,w.jsx)(o.ZP,{item:!0,xs:12,children:(0,w.jsxs)(l.Z,{spacing:1.25,children:[(0,w.jsx)(_.Z,{htmlFor:"role",children:(0,w.jsx)(p.Z,{id:"role"})}),(0,w.jsx)(I.Z,{fullWidth:!0,children:(0,w.jsx)(R.Z,(0,t.Z)((0,t.Z)({id:"column-hiding",displayEmpty:!0},te("role")),{},{onChange:function(e){console.log("Selected role:",e.target.value),se("role",e.target.value)},input:(0,w.jsx)(T.Z,{id:"select-column-hiding",placeholder:"Sort by"}),renderValue:function(e){return e?(0,w.jsx)(b.Z,{variant:"subtitle2",children:e.libelle}):(0,w.jsx)(b.Z,{variant:"subtitle1",children:(0,w.jsx)(p.Z,{id:"select-role"})})},children:j.map((function(e){return(0,w.jsx)(E.Z,{value:e,children:(0,w.jsx)(A.Z,{primary:e.libelle})},e.id)}))}))}),ee.role&&$.role&&(0,w.jsx)(M.Z,{error:!0,id:"standard-weight-helper-text-email-login",sx:{pl:1.75},children:$.role})]})}),r&&(0,w.jsx)(o.ZP,{item:!0,xs:12,children:(0,w.jsxs)(l.Z,{spacing:1.25,children:[(0,w.jsx)(_.Z,{htmlFor:"active",children:(0,w.jsx)(p.Z,{id:"status"})}),(0,w.jsxs)(o.ZP,{container:!0,justifyContent:"space-between",alignItems:"center",children:[(0,w.jsx)(b.Z,{variant:"subtitle2",children:(0,w.jsx)(p.Z,{id:"active-account"})}),(0,w.jsx)(B.Z,{edge:"end",onChange:function(e,n){return function(){n.setFieldValue(e,!n.values[e])}}("active",Q),checked:!(null!==(n=Q.values)&&void 0!==n&&n.active),inputProps:{"aria-labelledby":"switch-list-label-sctp"}})]})]})})]})})]})}),(0,w.jsx)(k.Z,{}),(0,w.jsx)(G.Z,{sx:{p:2.5},children:(0,w.jsxs)(o.ZP,{container:!0,justifyContent:"space-between",alignItems:"center",children:[(0,w.jsx)(o.ZP,{item:!0,children:!m&&(0,w.jsx)(N.Z,{title:"Delete Customer",placement:"top",children:(0,w.jsx)(q.Z,{onClick:function(){return Z(!0)},size:"large",color:"error",disabled:!0,children:(0,w.jsx)(S.Z,{})})})}),(0,w.jsx)(o.ZP,{item:!0,children:(0,w.jsxs)(l.Z,{direction:"row",spacing:2,alignItems:"center",children:[(0,w.jsx)(a.Z,{color:"error",onClick:i,children:(0,w.jsx)(p.Z,{id:"cancel"})}),(0,w.jsx)(a.Z,{type:"submit",variant:"contained",disabled:re,children:r?(0,w.jsx)(p.Z,{id:"edit"}):(0,w.jsx)(p.Z,{id:"create"})})]})})]})})]})}),(0,w.jsx)(K,{setValues:ie,user:r,page:c,isCreating:m})]}),!m&&(0,w.jsx)(y,{title:r.username,open:h,handleClose:function(){Z(!h),i()}})]})},ee=r(24813),ne=r(24076),re=r(67478),te=r(48310),se=r(67216),ie=function(e){var n=e.data,r=(0,i.Z)(),t=(0,ee.Z)(r.breakpoints.down("md"));return(0,w.jsx)(ne.Z,{sx:{"&:hover":{bgcolor:"transparent !important"},overflow:"hidden"},children:(0,w.jsx)(re.Z,{colSpan:8,sx:{p:2.5,overflow:"hidden"},children:(0,w.jsx)(Z.Z,{type:"slide",direction:"down",in:!0,children:(0,w.jsx)(o.ZP,{container:!0,spacing:2.5,sx:{pl:{xs:0,sm:5,md:6,lg:10,xl:12}},children:(0,w.jsx)(o.ZP,{item:!0,xs:12,sm:7,md:8,lg:8,xl:9,children:(0,w.jsxs)(l.Z,{spacing:2.5,children:[(0,w.jsx)(x.Z,{title:"Personal Details",children:(0,w.jsxs)(te.Z,{sx:{py:0},children:[(0,w.jsx)(se.ZP,{divider:!t,children:(0,w.jsx)(o.ZP,{container:!0,spacing:3,children:(0,w.jsx)(o.ZP,{item:!0,xs:12,md:6,children:(0,w.jsxs)(l.Z,{spacing:.5,children:[(0,w.jsx)(b.Z,{color:"secondary",children:"Full Name"}),(0,w.jsx)(b.Z,{children:n.username})]})})})}),(0,w.jsx)(se.ZP,{divider:!t,children:(0,w.jsxs)(o.ZP,{container:!0,spacing:3,children:[(0,w.jsx)(o.ZP,{item:!0,xs:12,md:6,children:(0,w.jsxs)(l.Z,{spacing:.5,children:[(0,w.jsx)(b.Z,{color:"secondary",children:"Country"}),(0,w.jsx)(b.Z,{children:n.role})]})}),(0,w.jsx)(o.ZP,{item:!0,xs:12,md:6,children:(0,w.jsxs)(l.Z,{spacing:.5,children:[(0,w.jsx)(b.Z,{color:"secondary",children:"Zip Code"}),(0,w.jsx)(b.Z,{children:(0,w.jsx)(u.HH,{displayType:"text",format:"+237 # ## ## ## ##",mask:"_",defaultValue:n.phone})})]})})]})}),(0,w.jsx)(se.ZP,{children:(0,w.jsxs)(l.Z,{spacing:.5,children:[(0,w.jsx)(b.Z,{color:"secondary",children:"Address"}),(0,w.jsx)(b.Z,{children:n.address})]})})]})}),(0,w.jsx)(x.Z,{title:"About me",children:(0,w.jsxs)(b.Z,{color:"secondary",children:["Hello, I\u2019m ",n.username," ",n.role," based in international company"]})})]})})})})})})},le=r(2244),ae=r(27937),oe=r(66835),ce=r(23477),de=r(57861),ue=r(17551),xe=r(45110),he=r(35397),Ze=r(82138);var je=function(e){var n=e.columns,r=e.data,o=e.getHeaderProps,c=e.renderRowSubComponent,d=e.handleAdd,u=(0,i.Z)(),x=(0,ee.Z)(u.breakpoints.down("sm")),h=(0,s.useMemo)((function(){return he.KR}),[]),Z=(0,xe.useTable)({columns:n,data:r,filterTypes:h,initialState:{pageIndex:0,pageSize:10}},xe.useGlobalFilter,xe.useFilters,xe.useSortBy,xe.useExpanded,xe.usePagination,xe.useRowSelect),m=Z.getTableProps,g=Z.getTableBodyProps,f=Z.headerGroups,v=Z.prepareRow,b=Z.setHiddenColumns,C=Z.visibleColumns,S=Z.page,y=Z.state,P=y.globalFilter,F=y.selectedRowIds,k=y.expanded,D=Z.preGlobalFilteredRows,_=Z.setGlobalFilter,H=Z.selectedFlatRows;return(0,s.useEffect)((function(){x&&b(["phone","visits","email","active"])}),[x]),(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(j.c,{selected:Object.keys(F).length}),(0,w.jsxs)(l.Z,{spacing:3,children:[(0,w.jsxs)(l.Z,{direction:x?"column":"row",spacing:1,justifyContent:"space-between",alignItems:"center",sx:{p:3,pb:0},children:[(0,w.jsx)(he.KO,{preGlobalFilteredRows:D,globalFilter:P,setGlobalFilter:_,size:"small"}),(0,w.jsxs)(l.Z,{direction:x?"column":"row",alignItems:"center",spacing:1,children:[(0,w.jsx)(a.Z,{variant:"contained",startIcon:(0,w.jsx)(Ze.Z,{}),onClick:d,size:"small",children:(0,w.jsx)(p.Z,{id:"add-user"})}),(0,w.jsx)(j.ZZ,{data:H.length>0?H.map((function(e){return e.original})):r,filename:"user-list.csv"})]})]}),(0,w.jsxs)(oe.Z,(0,t.Z)((0,t.Z)({},m()),{},{children:[(0,w.jsx)(ce.Z,{children:f.map((function(e,n){return(0,w.jsx)(ne.Z,(0,t.Z)((0,t.Z)({},e.getHeaderGroupProps()),{},{sx:{"& > th:first-of-type":{width:"58px"}},children:null===e||void 0===e?void 0:e.headers.map((function(e,n){return(0,w.jsx)(re.Z,(0,t.Z)((0,t.Z)({},e.getHeaderProps([{className:e.className},o(e)])),{},{children:(0,w.jsx)(j.RL,{column:e})}),n)}))}),n)}))}),(0,w.jsx)(de.Z,(0,t.Z)((0,t.Z)({},g()),{},{children:S.map((function(e,n){v(e);var r=e.getRowProps();return(0,w.jsxs)(s.Fragment,{children:[(0,w.jsx)(ne.Z,(0,t.Z)((0,t.Z)({},e.getRowProps()),{},{onClick:function(){e.toggleRowSelected()},sx:{cursor:"pointer",bgcolor:e.isSelected?(0,ue.Fq)(u.palette.primary.lighter,.35):"inherit"},children:e.cells.map((function(e,n){return(0,w.jsx)(re.Z,(0,t.Z)((0,t.Z)({},e.getCellProps([{className:e.column.className}])),{},{children:e.render("Cell")}),n)}))})),e.isExpanded&&c({row:e,rowProps:r,visibleColumns:C,expanded:k})]},n)}))}))]}))]})]})},pe=r(47131),me=r(41627),ge=r(45460),fe=function(e){var n=e.row,r=e.setCustomer,t=e.setCustomerDeleteId,s=e.handleAdd,i=e.handleClose,a=e.theme;return(0,w.jsxs)(l.Z,{direction:"row",alignItems:"center",justifyContent:"center",spacing:0,children:[(0,w.jsx)(N.Z,{title:"Edit",children:(0,w.jsx)(pe.Z,{color:"primary",onClick:function(e){e.stopPropagation(),r(n.values),s()},children:(0,w.jsx)(me.Z,{twoToneColor:a.palette.primary.main})})}),(0,w.jsx)(N.Z,{title:"Delete",children:(0,w.jsx)(pe.Z,{color:"error",disabled:!1,onClick:function(e){e.stopPropagation(),i(),t(n.values.username)},children:(0,w.jsx)(ge.Z,{twoToneColor:a.palette.error.main})})})]})},ve=r(66212),be=function(e){var n=e.value;return(0,w.jsx)(ve.Z,{color:n?"error":"success",label:(0,w.jsx)(p.Z,{id:n?"inactive":"active"}),size:"small",variant:"light"})},Ce=function(){var e=(0,s.useState)(!1),n=(0,P.Z)(e,2),r=n[0],t=n[1],i=(0,s.useState)(!1),l=(0,P.Z)(i,2),a=l[0],o=l[1],c=(0,s.useState)(null),d=(0,P.Z)(c,2),u=d[0],x=d[1],h=(0,s.useState)(),Z=(0,P.Z)(h,2),j=Z[0],p=Z[1],m=(0,s.useState)(1),g=(0,P.Z)(m,2),f=g[0],v=g[1];return{add:r,setAdd:t,open:a,setOpen:o,user:u,setUser:x,userDeleteId:j,setUserDeleteId:p,currentPage:f,setCurrentPage:v,handleAdd:function(){t(!r),u&&!r&&x(null)},handleClose:function(){o(!a)}}},Se=r(49998),we=function(e){var n=e.row;return(0,w.jsx)(j.YQ,(0,t.Z)({},n.getToggleRowSelectedProps()))},ye=function(e){var n=e.getToggleAllPageRowsSelectedProps;return(0,w.jsx)(j.YQ,(0,t.Z)({indeterminate:!0},n()))},Pe=function(e){var n=e.value;return(0,w.jsx)(u.HH,{displayType:"text",format:"+237 # ## ## ## ##",mask:"_",defaultValue:n})},Fe=function(){var e=(0,i.Z)(),n=(0,f.I0)(),r=Ce(),t=r.add,u=r.open,j=r.user,v=r.setUser,b=r.userDeleteId,C=r.setUserDeleteId,S=r.currentPage,P=r.setCurrentPage,F=r.handleAdd,k=r.handleClose,D=(0,f.v9)((function(e){return e.account.list})),_=D.listStatus,H=D.accountsTab,I=D.nbPages,R=D.listError,T=(0,f.v9)((function(e){return e.account.create})).createStatus,E=(0,f.v9)((function(e){return e.account.edit})).editStatus,A=(0,s.useMemo)((function(){return[{title:"Row Selection",Header:ye,accessor:"selection",Cell:we,disableSortBy:!0},{Header:"#",accessor:"id",className:"cell-center"},{Header:(0,w.jsx)(p.Z,{id:"name"}),accessor:"username"},{Header:(0,w.jsx)(p.Z,{id:"role"}),accessor:"role"},{Header:(0,w.jsx)(p.Z,{id:"email"}),accessor:"email"},{Header:(0,w.jsx)(p.Z,{id:"phone"}),accessor:"phone",Cell:Pe},{Header:(0,w.jsx)(p.Z,{id:"created"}),accessor:"created_at",Cell:function(e){var n=e.value;return(0,Se.o0)(n)}},{Header:(0,w.jsx)(p.Z,{id:"status"}),accessor:"is_block",Cell:be},{Header:"Actions",className:"cell-center",disableSortBy:!0,Cell:function(n){var r=n.row;return(0,w.jsx)(fe,{row:r,setCustomer:v,setCustomerDeleteId:C,handleAdd:F,handleClose:k,theme:e})}}]}),[e]);console.log(A),(0,s.useEffect)((function(){n((0,m.t)({page:S,nb:U.iS}))}),[S]),(0,s.useEffect)((function(){n((0,ae.j)({page:1}))}),[]);var M=(0,s.useCallback)((function(e){var n=e.row;return(0,w.jsx)(ie,{data:H[n.id]})}),[H]);return _==g.J_.loading||T==g.J_.loading||E==g.J_.loading?(0,w.jsx)(le.Z,{title:(0,w.jsx)(p.Z,{id:"loading"})}):_==g.J_.error?(0,w.jsx)(le.Z,{title:(0,w.jsx)(p.Z,{id:R})}):(0,w.jsxs)(x.Z,{content:!1,children:[(0,w.jsx)(h.Z,{children:H.length>0?(0,w.jsx)(je,{columns:A,data:H,handleAdd:F,getHeaderProps:function(e){return e.getSortByToggleProps()},renderRowSubComponent:M}):(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(l.Z,{direction:"row",justifyContent:"flex-end",spacing:1,sx:{p:2},children:(0,w.jsx)(a.Z,{variant:"contained",startIcon:(0,w.jsx)(Ze.Z,{}),onClick:F,size:"small",children:(0,w.jsx)(p.Z,{id:"add-user"})})}),(0,w.jsx)(le.Z,{title:(0,w.jsx)(p.Z,{id:"no-user"})})]})}),(0,w.jsx)(o.ZP,{sx:{p:2,py:3},colSpan:9,children:(0,w.jsx)(o.ZP,{item:!0,sx:{mt:{xs:2,sm:0}},children:(0,w.jsx)(c.Z,{count:I,page:S,onChange:function(e,n){P(n)},color:"primary",variant:"combined"})})}),(0,w.jsx)(y,{title:b,open:u,handleClose:k}),(0,w.jsx)(d.Z,{maxWidth:"sm",TransitionComponent:Z.S,keepMounted:!0,fullWidth:!0,onClose:F,open:t,sx:{"& .MuiDialog-paper":{p:0},transition:"transform 225ms"},"aria-describedby":"alert-dialog-slide-description",children:(0,w.jsx)($,{user:j,onCancel:F,page:S})})]})}},49998:function(e,n,r){r.d(n,{IS:function(){return s},V7:function(){return l},_Q:function(){return a},bm:function(){return t},o0:function(){return i}});var t=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date,n=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),t=String(e.getDate()).padStart(2,"0");return"".concat(n,"-").concat(r,"-").concat(t)};function s(){var e=new Date,n=e.getDay(),r=e.getDate()-n+(0===n?-6:1);return new Date(e.setDate(r))}function i(e){var n=new Date(e),r=n.getDate().toString().padStart(2,"0"),t=(n.getMonth()+1).toString().padStart(2,"0"),s=n.getFullYear(),i=n.getHours().toString().padStart(2,"0"),l=n.getMinutes().toString().padStart(2,"0");return"".concat(r,"/").concat(t,"/").concat(s," ").concat(i,":").concat(l)}function l(){var e=new Date,n=new Date(e),r=7-e.getDay();return n.setDate(e.getDate()+r),n.setHours(23,59,59,999),n}function a(e){var n=new Date(e.debut),r=new Date(e.fin),t=n.getDate().toString().padStart(2,"0"),s=r.getDate().toString().padStart(2,"0");return"".concat(t," - ").concat(s,"/").concat(r.getMonth()+1,"/").concat(r.getFullYear())}}}]);